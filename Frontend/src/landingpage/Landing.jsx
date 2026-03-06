import React from "react";
import Home from "./Home";
import Cards from "./Cards";

export default function Landing() {

  const cardData = [
    {
      title: "Resume ATS Analysis",
      description:
        "Evaluate your resume against ATS standards and improve keyword optimization."
    },
    {
      title: "LinkedIn Profile Review",
      description:
        "Analyze your LinkedIn profile strength and enhance visibility to recruiters."
    },
    {
      title: "Performance Score",
      description:
        "Get a detailed scoring system based on formatting, skills, and impact."
    },
    {
      title: "Accuracy Insights",
      description:
        "Smart AI ensures precise feedback tailored to industry standards."
    },
    {
      title: "Trust & Reliability",
      description:
        "Your data is secure and processed with high trust and privacy standards."
    },
    {
      title: "Instant Feedback",
      description:
        "Receive actionable suggestions in seconds to improve your profile."
    }
  ];

  return (
    <>
      <Home />
      <div className="bg-blue-200 py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {cardData.map((card, index) => (
            <Cards
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}

        </div>
      </div>
    </>
  );
}