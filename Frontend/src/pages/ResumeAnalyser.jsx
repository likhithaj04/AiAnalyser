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
      const res = await axios.post(`${import.meta.env.VITE_API_URL}`, formdata);
      dispatch({ type: "SET_RESULT", payload: res.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#40424b] via-[#151b3b] to-[#2e344e] p-6 flex flex-col items-center">

      {/* Header */}
      <div className="w-full max-w-xl text-center mb-8 mt-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-blue-200/60 mb-2">Career Tools</p>
        <h1 className="font-syne text-3xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-slate-100 to-blue-200/80">
          Resume Analyser
        </h1>
      </div>

      {/* Upload Card */}
      <div className="w-full max-w-xl rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-8 shadow-[0_20px_48px_rgba(0,0,0,0.4)]">
        <div className="flex flex-col gap-4">

          <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-white/15 rounded-xl p-6 cursor-pointer hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-center">
            <span className="text-2xl">📄</span>
            <span className="text-sm text-blue-100/60 font-light">
              {state.file ? state.file.name : "Click to upload your resume"}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-blue-200/30">PDF only</span>
            <input
              type="file"
              accept="application/pdf"
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
              Scanning your resume…
            </p>
          )}
          {state.error && (
            <p className="text-red-400/80 text-xs text-center">{state.error}</p>
          )}
        </div>
      </div>

      {/* Results */}
      {state.result && (
        <div className="mt-6 w-full max-w-4xl space-y-4">

          {/* ATS Score */}
          <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Overall Score</p>
              <p className="font-syne text-2xl font-bold text-slate-100">ATS Rating</p>
            </div>
            <div className="text-right">
              <span className="font-syne text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-br from-slate-100 to-blue-300">
                {state.result.score ?? "N/A"}
              </span>
              {state.result.score && <span className="text-blue-200/50 text-lg">/100</span>}
            </div>
          </div>

          {/* Section Scores */}
          {state.result.section_scores && (
            <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Breakdown</p>
              <h3 className="font-syne text-lg font-bold text-slate-100 mb-5">Section Scores</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(state.result.section_scores).map(([section, score]) => (
                  <div key={section} className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/50">{section}</p>
                    <span className="font-syne font-bold text-lg bg-clip-text text-transparent bg-linear-to-br from-slate-100 to-blue-300">
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {state.result.skills && (
            <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Extracted</p>
              <h3 className="font-syne text-lg font-bold text-slate-100 mb-5">Skills</h3>
              <div className="space-y-4">
                {Object.entries(state.result.skills).map(([category, skills]) => (
                  <div key={category}>
                    <p className="text-[10px] uppercase tracking-widest text-blue-300/60 mb-2">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(skills) && skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs border border-blue-400/20 bg-blue-400/10 text-blue-100/80 font-light tracking-wide"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {state.result.suggestions?.length > 0 && (
            <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Improvements</p>
              <h3 className="font-syne text-lg font-bold text-slate-100 mb-5">Suggestions</h3>
              <div className="space-y-3">
                {state.result.suggestions.map((s, i) => (
                  <div key={i} className="rounded-xl border border-white/8 bg-white/3 p-4">
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/50 mb-2">{s.section}</p>
                    <p className="text-sm text-blue-100/60 font-light mb-1">
                      <span className="text-red-300/70 font-medium">Issue: </span>{s.issue}
                    </p>
                    <p className="text-sm text-blue-100/60 font-light mb-1">
                      <span className="text-blue-300/70 font-medium">Why: </span>{s.why}
                    </p>
                    <p className="text-sm text-blue-100/70 font-light">
                      <span className="text-green-300/70 font-medium">Fix: </span>{s.example_fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {state.result.strengths?.length > 0 && (
            <div className="rounded-[20px] border border-white/8 bg-white/4 backdrop-blur-sm p-6 mb-8">
              <p className="text-[10px] uppercase tracking-[0.14em] text-blue-200/50 mb-1">Highlights</p>
              <h3 className="font-syne text-lg font-bold text-slate-100 mb-5">Strengths</h3>
              <ul className="space-y-2">
                {state.result.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-blue-100/70 font-light flex gap-2">
                    <span className="text-green-400/60 mt-0.5">·</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default ResumeAnalyser;