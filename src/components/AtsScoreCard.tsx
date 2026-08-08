import React from 'react';
import { Award, Info, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { AtsBreakdown } from '../types/resume';

interface AtsScoreCardProps {
  score: number;
  breakdown: AtsBreakdown;
  explanation: string;
}

export const AtsScoreCard: React.FC<AtsScoreCardProps> = ({
  score,
  breakdown,
  explanation,
}) => {
  // Score color helper
  const getScoreColor = (val: number) => {
    if (val >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
    if (val >= 65) return { text: 'text-amber-400', bg: 'bg-amber-500', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' };
    return { text: 'text-rose-400', bg: 'bg-rose-500', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  };

  const color = getScoreColor(score);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Estimated ATS Compatibility Score</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calculated across keyword coverage, technical skills, structure, and readability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${color.badge}`}>
            {score >= 80 ? 'Excellent Match' : score >= 65 ? 'Good Match' : 'Needs Optimization'}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Score Gauge Circle */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-black/30 rounded-2xl border border-white/5 text-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG Ring Gauge */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-white/10 stroke-current"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className={`${color.text} stroke-current transition-all duration-1000 ease-out`}
                strokeWidth="10"
                strokeDasharray={263.89}
                strokeDashoffset={263.89 - (263.89 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-3xl sm:text-4xl font-extrabold ${color.text}`}>{score}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">out of 100</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-300 font-medium">Estimated ATS Score</p>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Score Component Breakdown</h3>

          {/* Keyword Match 25% */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Keyword Match</span>
              <span className="text-slate-400">{breakdown.keywordMatch} / 25 pts</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(breakdown.keywordMatch / 25) * 100}%` }}
              />
            </div>
          </div>

          {/* Skills Match 25% */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Skills Match</span>
              <span className="text-slate-400">{breakdown.skillsMatch} / 25 pts</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(breakdown.skillsMatch / 25) * 100}%` }}
              />
            </div>
          </div>

          {/* Experience Relevance 20% */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Experience Relevance</span>
              <span className="text-slate-400">{breakdown.experienceRelevance} / 20 pts</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-violet-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(breakdown.experienceRelevance / 20) * 100}%` }}
              />
            </div>
          </div>

          {/* Project Relevance 15% */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Project Relevance</span>
              <span className="text-slate-400">{breakdown.projectRelevance} / 15 pts</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-violet-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(breakdown.projectRelevance / 15) * 100}%` }}
              />
            </div>
          </div>

          {/* Resume Structure 10% */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Resume Structure</span>
              <span className="text-slate-400">{breakdown.resumeStructure} / 10 pts</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(breakdown.resumeStructure / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Formatting/Readability 5% */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
              <span>Formatting & Readability</span>
              <span className="text-slate-400">{breakdown.formattingReadability} / 5 pts</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(breakdown.formattingReadability / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Score Explanation & Disclaimer */}
      <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
        <div className="p-4 rounded-xl bg-black/30 border border-white/5 text-xs sm:text-sm text-slate-300">
          <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-400" />
            <span>Score Justification</span>
          </p>
          <p className="leading-relaxed">{explanation}</p>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          * Note: This score is an <strong>Estimated ATS Compatibility Score</strong> calculated using parsing heuristics and keyword density logic. Actual applicant tracking software rules vary across corporate platforms.
        </p>
      </div>
    </div>
  );
};
