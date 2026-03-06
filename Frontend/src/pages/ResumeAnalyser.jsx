import React, { useContext } from "react";
import { AnalyserContext } from "../context/AnalyserContext";
import axios from "axios";

function ResumeAnalyser() {
  const { state, dispatch } = useContext(AnalyserContext);

  const handleUpload = async () => {
    const formdata = new FormData();
    formdata.append("resume", state.file);

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await axios.post("http://localhost:3000", formdata);
      dispatch({ type: "SET_RESULT", payload: res.data });
      console.log(res.data);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl border">
        <h1 className="text-2xl font-bold text-center mb-6">
          Resume ATS Analyzer
        </h1>

        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              dispatch({ type: "SET_FILE", payload: e.target.files[0] })
            }
            className="border p-2 rounded-lg w-full cursor-pointer"
          />

          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium"
          >
            Upload Resume
          </button>

          {state.loading && (
            <p className="text-blue-600 font-medium">Analyzing resume...</p>
          )}

          {state.error && (
            <p className="text-red-500">{state.error}</p>
          )}
        </div>
      </div>

      {state.result && (
        <div className="mt-8 w-full max-w-4xl space-y-6">

          <div className="bg-white shadow-lg rounded-2xl p-6 border">
            <h2 className="text-xl font-semibold">
              ATS Score: 
              <span className="text-green-600 ml-2">
                {state.result.score ?? "N/A"}
              </span>
            </h2>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 border">
            <h3 className="text-lg font-semibold mb-3">Section Scores</h3>
            {state.result.section_scores ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(state.result.section_scores).map(
                  ([section, score]) => (
                    <div
                      key={section}
                      className="bg-gray-50 p-3 rounded-lg border"
                    >
                      <strong>{section}</strong>
                      <p className="text-blue-600 font-semibold">{score}</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>No section scores available</p>
            )}
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 border">
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            {state.result.skills ? (
              Object.entries(state.result.skills).map(([category, skills]) => (
                <div key={category} className="mb-4">
                  <strong className="text-blue-600">{category}</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Array.isArray(skills) &&
                      skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No skills extracted</p>
            )}
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 border">
            <h3 className="text-lg font-semibold mb-3">Suggestions</h3>
            {state.result.suggestions?.length > 0 ? (
              <div className="space-y-4">
                {state.result.suggestions.map((s, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-yellow-50"
                  >
                    <p><strong>Section:</strong> {s.section}</p>
                    <p><strong>Issue:</strong> {s.issue}</p>
                    <p><strong>Why:</strong> {s.why}</p>
                    <p><strong>Example Fix:</strong> {s.example_fix}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No suggestions available</p>
            )}
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 border">
            <h3 className="text-lg font-semibold mb-3">Strengths</h3>
            {state.result.strengths?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-2">
                {state.result.strengths.map((s, index) => (
                  <li key={index}>{s}</li>
                ))}
              </ul>
            ) : (
              <p>No strengths detected</p>
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default ResumeAnalyser;