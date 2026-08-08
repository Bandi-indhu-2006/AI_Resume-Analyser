import React from 'react';
import { ArrowRightLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { TransferableSkill } from '../types/resume';

interface TransferableSkillsCardProps {
  transferableSkills?: TransferableSkill[];
  targetRole?: string;
}

export const TransferableSkillsCard: React.FC<TransferableSkillsCardProps> = ({
  transferableSkills = [],
  targetRole = 'Software Engineer',
}) => {
  if (!transferableSkills || transferableSkills.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Transferable Skills Analysis</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Skills extracted beyond exact keyword matches from your leadership, projects, club activities, and work experience.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {transferableSkills.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-black/30 border border-white/10 hover:border-indigo-500/30 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Original Experience</p>
                <p className="text-sm font-semibold text-white mt-0.5">{item.originalExperience}</p>
              </div>

              <div className="px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold shrink-0 self-start sm:self-center">
                ✨ {item.transferableSkill}
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Relevance to {targetRole}:</span>
              </span>
              <p className="text-slate-200 leading-relaxed pl-5">{item.relevanceToTargetRole}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
