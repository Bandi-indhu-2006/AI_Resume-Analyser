import React from 'react';
import { TrendingUp, AlertCircle, Sparkles, Check, Copy } from 'lucide-react';
import { BulletImprovement } from '../types/resume';

interface BulletImprovementCardProps {
  bulletImprovements: BulletImprovement[];
}

export const BulletImprovementCard: React.FC<BulletImprovementCardProps> = ({
  bulletImprovements,
}) => {
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Resume Bullet Improvements</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Action-oriented rewrites using strong verbs and impact focus without fabricated numbers.
          </p>
        </div>
      </div>

      {bulletImprovements.length === 0 ? (
        <div className="p-6 rounded-xl bg-black/30 border border-white/5 text-center text-xs text-slate-400">
          Your bullet points are already strong! Action verbs and tech metrics were well-represented.
        </div>
      ) : (
        <div className="space-y-6">
          {bulletImprovements.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 overflow-hidden bg-black/30 shadow-lg"
            >
              {/* Card Header */}
              <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Weak Bullet #{idx + 1}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider font-semibold">
                  Action Verb Upgrade
                </span>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                {/* BEFORE */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    BEFORE (Original Resume):
                  </span>
                  <p className="p-3 rounded-xl bg-black/20 border border-white/10 text-slate-200 font-mono text-xs leading-relaxed">
                    "{item.before}"
                  </p>
                </div>

                {/* PROBLEM */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-rose-400" />
                    PROBLEM DIAGNOSTIC:
                  </span>
                  <p className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                {/* AFTER */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      AFTER (Recruiter-Ready Recommendation):
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(item.after, idx)}
                      className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded-md border border-white/10 transition-colors cursor-pointer"
                    >
                      {copiedIdx === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Copy Rewritten Bullet</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-semibold text-xs leading-relaxed">
                    • {item.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
