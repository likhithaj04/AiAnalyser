import { AnalyserContext } from "../context/AnalyserContext";
import { useContext } from "react";
import axios from "axios";

function LinkedinAnalyser() {
  const { state, dispatch } = useContext(AnalyserContext);

  const handleUpload = async () => {
    const formdata = new FormData();
    formdata.append("linkedin", state.file);

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/linkedin`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({ type: "SET_RESULT", payload: res.data });
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
          LinkedIn Profile Analyzer
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              dispatch({ type: "SET_FILE", payload: e.target.files[0] })
            }
            className="border p-2 rounded-lg cursor-pointer"
          />

          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition max-w-md mx-auto"
          >
            Upload Screenshot
          </button>

          {state.loading && (
            <p className="text-blue-600 font-medium text-center">
              Analyzing LinkedIn profile...
            </p>
          )}

          {state.error && (
            <p className="text-red-500 text-center">{state.error}</p>
          )}
        </div>
      </div>

      {state.file && (
        <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 border w-full max-w-3xl">
          <h3 className="font-semibold mb-4">Uploaded LinkedIn Screenshot</h3>
          <img
            src={URL.createObjectURL(state.file)}
            alt="LinkedIn Preview"
            className="rounded-lg w-full max-h-100 object-contain border"
          />
        </div>
      )}

      {state.result && (
        <div className="mt-8 w-full max-w-4xl space-y-6">

          <div className="bg-white shadow-lg rounded-2xl p-6 border">
            <h2 className="text-xl font-semibold">
              Profile Score:
              <span className="ml-2 text-green-600 font-bold">
                {state.result.profile_score}/100
              </span>
            </h2>
          </div>

          {state.result?.summary_analysis && (
            <div className="bg-white shadow-lg rounded-2xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">
                Profile Summary Analysis
              </h3>

              <h4 className="font-semibold">Issues</h4>
              <ul className="list-disc pl-5 mb-4">
                {state.result.summary_analysis.issues.map((s, index) => (
                  <li key={index}>{s}</li>
                ))}
              </ul>

              <h4 className="font-semibold">Suggestions</h4>
              <ul className="list-disc pl-5 mb-4">
                {state.result.summary_analysis.suggestions.map(
                  (suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  )
                )}
              </ul>

              <h4 className="font-semibold">Improved Example</h4>
              <p className="bg-gray-50 p-3 rounded-lg border">
                {state.result.summary_analysis.improved_summary_example}
              </p>
            </div>
          )}

          {state.result.section_optimization && (
            <div className="bg-white shadow-lg rounded-2xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">
                Section Optimization
              </h3>

              {state.result.section_optimization.map((opti, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-3 bg-yellow-50"
                >
                  <strong>{opti.section}</strong>
                  <p><b>Issue:</b> {opti.issue}</p>
                  <p><b>Fix:</b> {opti.fix}</p>
                </div>
              ))}
            </div>
          )}

          {state.result.engagement_strategy && (
            <div className="bg-white shadow-lg rounded-2xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">
                Engagement Strategy
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <h4 className="font-semibold">Content Strategy</h4>
                  <ul className="list-disc pl-5">
                    {state.result.engagement_strategy.content_strategy.map(
                      (eng, index) => (
                        <li key={index}>{eng}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Network Growth Tips</h4>
                  <ul className="list-disc pl-5">
                    {state.result.engagement_strategy.network_growth_tips?.map(
                      (net, index) => (
                        <li key={index}>{net}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Posting Tips</h4>
                  <ul className="list-disc pl-5">
                    {state.result.engagement_strategy.posting_tips.map(
                      (post, index) => (
                        <li key={index}>{post}</li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">Visibility Improvement</h4>
                  <ul className="list-disc pl-5">
                    {state.result.visibility_improvement?.map((v, index) => (
                      <li key={index}>{v}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default LinkedinAnalyser;