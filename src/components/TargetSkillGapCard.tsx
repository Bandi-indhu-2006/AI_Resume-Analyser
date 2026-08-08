import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle, Edit2, Check } from 'lucide-react';
import { TargetSkillGap } from '../types/resume';

interface TargetSkillGapCardProps {
  targetRole?: string;
  targetSkillGaps?: TargetSkillGap[];
  onChangeTargetRole?: (newRole: string) => void;
}

export const TargetSkillGapCard: React.FC<TargetSkillGapCardProps> = ({
  targetRole = 'Software Engineer',
  targetSkillGaps = [],
  onChangeTargetRole,
}) => {
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [customRoleInput, setCustomRoleInput] = useState(targetRole);

  const handleSaveRole = () => {
    if (customRoleInput.trim()) {
      onChangeTargetRole?.(customRoleInput.trim());
    }
    setIsEditingRole(false);
  };

  const strongGaps = targetSkillGaps.filter((g) => g.status === 'strong');
  const partialGaps = targetSkillGaps.filter((g) => g.status === 'partial');
  const missingGaps = targetSkillGaps.filter((g) => g.status === 'missing');

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8">
      {/* Target Role Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">Target Role Analysis</p>
            {isEditingRole ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={customRoleInput}
                  onChange={(e) => setCustomRoleInput(e.target.value)}
                  className="px-3 py-1 bg-black/50 border border-indigo-400 rounded-lg text-white font-bold text-sm focus:outline-none"
                  placeholder="Enter target role..."
                />
                <button
                  type="button"
                  onClick={handleSaveRole}
                  className="p-1.5 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-400"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span>{targetRole}</span>
                <button
                  type="button"
                  onClick={() => setIsEditingRole(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-200 p-1 transition-colors"
                  title="Change target role"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </h2>
            )}
          </div>
        </div>

        {/* Quick summary metrics */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{strongGaps.length} Strong</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{partialGaps.length} Partial</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>{missingGaps.length} Missing</span>
          </span>
        </div>
      </div>

      {/* Skill Gaps List */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>Skill-Gap Breakdown for {targetRole}</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {targetSkillGaps.map((item, idx) => {
            const isStrong = item.status === 'strong';
            const isPartial = item.status === 'partial';
            const isUnableToVerify = item.status === 'unable_to_verify';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                  isStrong
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : isPartial
                    ? 'bg-amber-500/5 border-amber-500/20'
                    : isUnableToVerify
                    ? 'bg-indigo-500/10 border-indigo-500/30'
                    : 'bg-rose-500/10 border-rose-500/20'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-2">
                    {isStrong ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isPartial ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : isUnableToVerify ? (
                      <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0" />
                    ) : (
                      <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="text-sm font-bold text-white">{item.skill}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                        isStrong
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : isPartial
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : isUnableToVerify
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {isUnableToVerify ? 'UNABLE TO VERIFY DUE TO PARSING' : item.status.toUpperCase()}
                    </span>

                    {item.priority && (
                      <span className="px-2 py-0.5 rounded-md bg-black/40 text-slate-400 border border-white/5 text-[10px]">
                        Priority: {item.priority}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed pl-6">{item.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
