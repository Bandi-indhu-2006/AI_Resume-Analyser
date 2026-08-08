import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, AlertOctagon, Search } from 'lucide-react';
import { SkillEvidenceItem } from '../types/resume';

interface SkillEvidenceCardProps {
  skillEvidenceScore?: number;
  skillEvidence?: SkillEvidenceItem[];
}

export const SkillEvidenceCard: React.FC<SkillEvidenceCardProps> = ({
  skillEvidenceScore = 80,
  skillEvidence = [],
}) => {
  const strongItems = skillEvidence.filter((s) => s.status === 'strong');
  const limitedItems = skillEvidence.filter((s) => s.status === 'limited');
  const noneItems = skillEvidence.filter((s) => s.status === 'none');

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8">
      {/* Header Banner & Score */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Evidence-Based Skill Analysis</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verifies whether claimed skills are backed by concrete project bullets or experience evidence.
          </p>
        </div>

        {/* Skill Evidence Score Badge */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skill Evidence Score</p>
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-3xl font-black text-indigo-400">{skillEvidenceScore}%</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-bold text-sm">
            <Search className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="space-y-4">
        {skillEvidence.map((item, idx) => {
          const isStrong = item.status === 'strong';
          const isLimited = item.status === 'limited';
          const isUnableToVerify = item.status === 'unable_to_verify';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                isStrong
                  ? 'bg-emerald-500/5 border-emerald-500/20'
                  : isLimited
                  ? 'bg-amber-500/5 border-amber-500/20'
                  : isUnableToVerify
                  ? 'bg-indigo-500/10 border-indigo-500/30'
                  : 'bg-rose-500/10 border-rose-500/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  {isStrong ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isLimited ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : isUnableToVerify ? (
                    <Search className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{item.skill}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/40 text-slate-300 border border-white/10">
                    Location: {item.evidenceLocation}
                  </span>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                      isStrong
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : isLimited
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : isUnableToVerify
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {isStrong
                      ? 'Strong Evidence'
                      : isLimited
                      ? 'Limited Evidence'
                      : isUnableToVerify
                      ? 'Unable to Verify Due to Parsing'
                      : 'No Evidence'}
                  </span>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed pl-6">{item.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
