import React from 'react';
import { TrendingUp, AlertOctagon, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { PriorityImprovement } from '../types/resume';

interface PriorityImprovementsCardProps {
  priorityImprovements?: PriorityImprovement[];
}

export const PriorityImprovementsCard: React.FC<PriorityImprovementsCardProps> = ({
  priorityImprovements = [],
}) => {
  if (!priorityImprovements || priorityImprovements.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Top Priority Resume Improvements</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          High-impact fixes designed to maximize callback rates for your target role without inventing fake metrics or experiences.
        </p>
      </div>

      <div className="space-y-5">
        {priorityImprovements.map((item, idx) => {
          const isHigh = item.impact === 'HIGH';
          const isMed = item.impact === 'MEDIUM';

          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all text-xs space-y-4 ${
                isHigh
                  ? 'bg-rose-500/10 border-rose-500/20'
                  : isMed
                  ? 'bg-amber-500/10 border-amber-500/20'
                  : 'bg-indigo-500/10 border-indigo-500/20'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isHigh ? (
                    <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                  ) : isMed ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                  )}
                  <span className="font-extrabold text-sm text-white">
                    Improvement #{idx + 1}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    isHigh
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : isMed
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                  }`}
                >
                  {item.impact} IMPACT
                </span>
              </div>

              {/* Problem */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-rose-300">Problem Identified</p>
                <p className="text-white text-sm font-semibold">{item.problem}</p>
              </div>

              {/* Why it matters */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Why It Matters for Target Role</p>
                <p className="text-slate-300 leading-relaxed">{item.whyItMatters}</p>
              </div>

              {/* Exact Action */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Exact Action Step</p>
                <p className="text-indigo-200 font-medium leading-relaxed">{item.exactAction}</p>
              </div>

              {/* Example Rewrite */}
              {item.exampleRewrite && (
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Recommended Example Rewrite (Using Real Resume Info)</span>
                  </p>
                  <p className="text-xs font-mono text-emerald-200 leading-relaxed">
                    "{item.exampleRewrite}"
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
