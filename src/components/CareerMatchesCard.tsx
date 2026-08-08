import React from 'react';
import { Compass, CheckCircle2, AlertTriangle, Info, Sparkles, ChevronRight } from 'lucide-react';
import { CareerMatch } from '../types/resume';

interface CareerMatchesCardProps {
  careerMatches?: CareerMatch[];
  selectedRole?: string;
  onSelectRole?: (roleTitle: string) => void;
}

export const CareerMatchesCard: React.FC<CareerMatchesCardProps> = ({
  careerMatches = [],
  selectedRole,
  onSelectRole,
}) => {
  if (!careerMatches || careerMatches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Career Role Discovery</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Top 5 suitable career roles matched directly against your education, skills, projects, and experience.
          </p>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Select any role to set as Target Role</span>
        </div>
      </div>

      {/* Top 5 Role Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {careerMatches.slice(0, 5).map((match, idx) => {
          const isSelected = selectedRole?.toLowerCase() === match.title.toLowerCase();
          
          return (
            <div
              key={idx}
              onClick={() => onSelectRole?.(match.title)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-transparent border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                  : 'bg-black/30 hover:bg-black/40 border-white/10 hover:border-white/20'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-xl shadow-md">
                  Active Target Role
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-extrabold text-xs flex items-center justify-center shrink-0">
                      #{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>{match.title}</span>
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed pl-9">
                    {match.whyFit}
                  </p>
                </div>

                {/* Score & Select Button */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Career Fit Score</p>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-2xl font-black text-emerald-400">{match.fitScore}%</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRole?.(match.title);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
                    }`}
                  >
                    <span>{isSelected ? 'Selected' : 'Target This Role'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-9 text-xs">
                <div>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Existing Relevant Skills ({match.existingSkills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {match.existingSkills.map((sk, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-rose-400 flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Missing Skills for Role ({match.missingSkills.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {match.missingSkills.map((sk, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[11px]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-slate-400 text-[11px] flex items-center gap-2">
        <Info className="w-4 h-4 text-indigo-400 shrink-0" />
        <span>
          <strong>Disclaimer:</strong> AI-generated fit estimate based on the information provided in your resume. It is not a hiring prediction.
        </span>
      </div>
    </div>
  );
};
