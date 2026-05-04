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
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch({ type: "SET_RESULT", payload: res.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#2a2c3a] via-[#151b3b] to-[#4b4d50] p-6 flex flex-col items-center">

      {/* Header */}
      <div className="w-full max-w-xl text-center mb-8 mt-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-blue-200/60 mb-2">Career Tools</p>
        <h1 className="font-syne text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-slate-100 to-blue-200/80">
          LinkedIn Analyser
        </h1>
      </div>

      {/* Upload Card */}
      <div className="w-full max-w-xl rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-8 shadow-[0_20px_48px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col gap-4">

          <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/15 rounded-xl p-6 cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-center">
            <span className="text-2xl">📎</span>
            <span className="text-sm text-blue-100/60 font-light">
              {state.file ? state.file.name : "Click to upload LinkedIn screenshot"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-blue-200/30">image files only</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => dispatch({ type: "SET_FILE", payload: e.target.files[0] })}
            />
          </label>

          <button
            onClick={handleUpload}
            disabled={!state.file || state.loading}
            className="w-full py-3 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm font-medium tracking-wide uppercase hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {state.loading ? "Analysing…" : "Upload & Analyse"}
          </button>

          {state.loading && (
            <p className="text-blue-300/70 text-xs text-center tracking-wide animate-pulse">
              Reading your LinkedIn profile…
            </p>
          )}
          {state.error && (
            <p className="text-red-400/80 text-xs text-center">{state.error}</p>
          )}
        </div>
      </div>

      {/* Image Preview */}
      {state.file && (
        <div className="mt-5 w-full max-w-xl rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6">
          <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-3">Preview</p>
          <img
            src={URL.createObjectURL(state.file)}
            alt="LinkedIn Preview"
            className="rounded-xl w-full max-h-80 object-contain border border-white/8"
          />
        </div>
      )}

      {/* Results */}
      {state.result && (
        <div className="mt-6 w-full max-w-4xl space-y-4">

          {/* Score */}
          <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Overall Score</p>
              <p className="font-syne text-2xl font-bold text-slate-100">Profile Rating</p>
            </div>
            <div className="text-right">
              <span className="font-syne text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-slate-100 to-blue-300">
                {state.result.profile_score}
              </span>
              <span className="text-blue-200/50 text-lg">/100</span>
            </div>
          </div>

          {/* Summary Analysis */}
          {state.result?.summary_analysis && (
            <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Summary Analysis</p>
              <h3 className="font-syne text-lg font-bold text-slate-100 mb-5">Profile Summary</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="rounded-xl border border-red-400/15 bg-red-400/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-red-300/60 mb-2">Issues</p>
                  <ul className="space-y-1.5">
                    {state.result.summary_analysis.issues.map((s, i) => (
                      <li key={i} className="text-sm text-blue-100/70 font-light flex gap-2">
                        <span className="text-red-400/60 mt-0.5">·</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-blue-400/15 bg-blue-400/5 p-4">
                  <p className="text-[10px] uppercase tracking-widest text-blue-300/60 mb-2">Suggestions</p>
                  <ul className="space-y-1.5">
                    {state.result.summary_analysis.suggestions.map((s, i) => (
                      <li key={i} className="text-sm text-blue-100/70 font-light flex gap-2">
                        <span className="text-blue-400/60 mt-0.5">·</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/3 p-4">
                <p className="text-[10px] uppercase tracking-widest text-blue-200/40 mb-2">Improved Example</p>
                <p className="text-sm text-blue-100/70 font-light leading-relaxed">
                  {state.result.summary_analysis.improved_summary_example}
                </p>
              </div>
            </div>
          )}

          {/* Section Optimization */}
          {state.result.section_optimization && (
            <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Optimisation</p>
              <h3 className="font-syne text-lg font-bold text-slate-100 mb-5">Section Fixes</h3>
              <div className="space-y-3">
                {state.result.section_optimization.map((opti, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-white/3 p-4">
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/50 mb-1">{opti.section}</p>
                    <p className="text-sm text-blue-100/60 font-light mb-1">
                      <span className="text-red-300/70 font-medium">Issue: </span>{opti.issue}
                    </p>
                    <p className="text-sm text-blue-100/70 font-light">
                      <span className="text-blue-300/70 font-medium">Fix: </span>{opti.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Engagement Strategy */}
          {state.result.engagement_strategy && (
            <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Growth</p>
              <h3 className="font-syne text-lg font-bold text-slate-100 mb-5">Engagement Strategy</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Content Strategy", items: state.result.engagement_strategy.content_strategy },
                  { label: "Network Growth", items: state.result.engagement_strategy.network_growth_tips },
                  { label: "Posting Tips", items: state.result.engagement_strategy.posting_tips },
                  { label: "Visibility", items: state.result.visibility_improvement },
                ].map(({ label, items }) => items?.length > 0 && (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-4">
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/50 mb-2">{label}</p>
                    <ul className="space-y-1.5">
                      {items.map((item, i) => (
                        <li key={i} className="text-sm text-blue-100/70 font-light flex gap-2">
                          <span className="text-blue-400/50 mt-0.5">·</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default LinkedinAnalyser;