import React from 'react';
import { Sparkles, AlertOctagon, AlertTriangle, Info, ArrowRight } from 'lucide-react';
import { RecommendationItem } from '../types/resume';

interface RecommendationsCardProps {
  recommendations: RecommendationItem[];
  strengths: string[];
  weaknesses: string[];
}

export const RecommendationsCard: React.FC<RecommendationsCardProps> = ({
  recommendations,
  strengths,
  weaknesses,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8">
      {/* Top Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Prioritized Action Plan & Insights</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          High, medium, and low priority recommendations to maximize your interview callback rate.
        </p>
      </div>

      {/* Strengths vs Weaknesses summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-3">
          <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Resume Strengths ({strengths.length})</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3">
          <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>Areas for Improvement ({weaknesses.length})</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {weaknesses.map((wk, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                <span className="leading-relaxed">{wk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actionable Recommendations List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Prioritized Optimization Steps
        </h3>

        {recommendations.map((rec, idx) => {
          const isHigh = rec.priority === 'HIGH';
          const isMed = rec.priority === 'MEDIUM';

          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all text-xs space-y-2 ${
                isHigh
                  ? 'bg-rose-500/10 border-rose-500/20'
                  : isMed
                  ? 'bg-amber-500/10 border-amber-500/20'
                  : 'bg-indigo-500/10 border-indigo-500/20'
              }`}
            >
              <div className="flex items-center justify-between font-bold text-white">
                <div className="flex items-center gap-2 text-sm">
                  {isHigh ? (
                    <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : isMed ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                  )}
                  <span>{rec.title}</span>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                    isHigh
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : isMed
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  }`}
                >
                  {rec.priority} PRIORITY
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed pl-6">{rec.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
