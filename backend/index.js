const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const pdfParse = require("pdf-parse");
require("dotenv").config();
const Tesseract=require('tesseract.js')

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const upload = multer({
  storage: multer.memoryStorage(),
 limits: { fileSize: 5 * 1024 * 1024 }
});

app.post("/", upload.single("resume"), async (req, res) => {
  try {
    console.log("Upload hit");

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text || "";

    const MAX_CHARS = 6000;
    const trimmedResumeText = resumeText.slice(0, MAX_CHARS);
   
    const response = await axios.post(
      process.env.AI_URL,
      {
        model: "llama-3.1-8b-instant",

        messages: [
          {
  role: "system",
  content: `
You are a professional ATS Resume Analyzer.

Return ONLY valid JSON. No markdown. No explanation.
`
},
{
  role: "user",
  content: `

Analyze the resume and return ONLY valid JSON in the format below.

{
  "score": number,

  "section_scores": {
    "summary": number,
    "projects": number,
    "skills": number,
    "education": number,
    "experience": number,
    "formatting": number
  },

  "suggestions": [
    {
      "section": "summary | projects | skills | education | experience | formatting",
      "issue": string,
      "why": string,
      "example_fix": string
    }
  ],

  "strengths": [string],

  "resume_sections": {
    "summary": string,
    "projects": string,
    "skills": string,
    "education": string,
    "experience": string
  }
}

Rules:
- All scores must be out of 100
- Provide minimum 5 suggestions
- Suggestions must reference correct section
- Extract resume content into appropriate sections
- If a section is missing, return empty string
- Be realistic like a real ATS system
- Return ONLY JSON

Resume:
${trimmedResumeText}
`
}
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

   const raw = response.data.choices[0].message.content;

let parsed;

try {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  parsed = JSON.parse(cleaned);
} catch (error) {

  console.log("AI JSON parse failed. Returning raw text.");

  parsed = {
    error: "Invalid AI JSON",
    raw_response: raw
  };
}

res.json(parsed);

  } catch (err) {
    console.error("Server Error:", err.message);

    res.status(500).json({
      error: "Resume analysis failed",
      details: err.response?.data || err.message,
    });
  }
});

app.post("/linkedin", upload.single("linkedin"), async (req, res) => {
  console.log("linkedin hit")
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file detected" });
    }
 const ocr = await Tesseract.recognize(req.file.buffer, "eng");
    const extractedText = ocr.data.text
if (!extractedText.trim()) {
  return res.status(400).json({
    message: "Could not extract text from screenshot"
  });
}
    const prompt = `
Analyze this LinkedIn profile screenshot and return ONLY valid JSON:

{
  "profile_score": number,
  "summary_analysis": {
    "issues": [string],
    "suggestions": [string],
    "improved_summary_example": string
  },
  "section_optimization": [
    {
      "section": string,
      "issue": string,
      "fix": string
    }
  ],
  "engagement_strategy": {
    "posting_tips": [string],
    "network_growth_tips": [string],
    "content_strategy": [string]
  },
  "visibility_improvement": [string]
}

Rules:
- Score out of 100
- Recruiter focused
- Return ONLY JSON

Here is extracted text from LinkedIn screenshot:
${extractedText}
`;

    const response = await axios.post(
      process.env.AI_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a LinkedIn profile optimization expert."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText=response.data.choices[0].message.content
    const cleaned = aiText.replace(/```json|```/g, "").trim();

   let parsed
    try{
     parsed=JSON.parse(cleaned)
    }catch(err){
            console.log(err)
 return res.status(500).send({
        message: "AI returned invalid JSON",
      });
    }
    res.status(200).json(parsed);

  } catch (err) {
    console.log("Error:", err.response?.data || err.message);
    res.status(500).send("Error analyzing LinkedIn profile");
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
