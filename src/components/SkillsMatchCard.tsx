import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, MinusCircle, Layers, AlertCircle } from 'lucide-react';
import { SkillMatchItem, CategorizedSkills } from '../types/resume';

interface SkillsMatchCardProps {
  jobMatchScore: number;
  matchedSkills: SkillMatchItem[];
  missingSkills: SkillMatchItem[];
  partialSkills: SkillMatchItem[];
  categorizedSkills: CategorizedSkills;
}

export const SkillsMatchCard: React.FC<SkillsMatchCardProps> = ({
  jobMatchScore,
  matchedSkills,
  missingSkills,
  partialSkills,
  categorizedSkills,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'programming', label: 'Programming Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'databases', label: 'Databases' },
    { id: 'cloud', label: 'Cloud' },
    { id: 'devops', label: 'DevOps' },
    { id: 'tools', label: 'Tools & Testing' },
    { id: 'soft_skills', label: 'Soft Skills' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Job Match & Skill Gap Analysis</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Breakdown of skills identified in your resume versus requirements in the job description.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl">
          <span className="text-xs font-semibold text-slate-300">Job Match:</span>
          <span className="text-xl font-extrabold text-indigo-400">{jobMatchScore}/100</span>
        </div>
      </div>

      {/* Summary Chips: Matched / Missing / Partial */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Matched */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Matched Skills ({matchedSkills.length})</span>
          </div>
          <p className="text-xs text-emerald-300/80">Present in both resume and target job specs.</p>
        </div>

        {/* Missing */}
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1">
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Missing Skills ({missingSkills.length})</span>
          </div>
          <p className="text-xs text-rose-300/80">Required by job posting but missing from resume.</p>
        </div>

        {/* Partial */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
            <MinusCircle className="w-4 h-4 text-amber-400" />
            <span>Partially Matched ({partialSkills.length})</span>
          </div>
          <p className="text-xs text-amber-300/80">Mentioned indirectly or weakly demonstrated.</p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Detail List */}
      <div className="space-y-4">
        {selectedCategory === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Matched list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Matched Skills</span>
              </h4>
              <div className="space-y-2">
                {matchedSkills.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No exact skill matches detected.</p>
                ) : (
                  matchedSkills.map((sk, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs"
                    >
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span className="text-emerald-300 font-bold">✓ {sk.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-medium capitalize border border-emerald-500/30">
                          {sk.category}
                        </span>
                      </div>
                      <p className="text-slate-300 mt-1 text-[11px]">{sk.explanation}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Missing list */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2.5 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Missing Skills</span>
              </h4>
              <div className="space-y-2">
                {missingSkills.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No critical missing skills detected!</p>
                ) : (
                  missingSkills.map((sk, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs">
                      <div className="flex items-center justify-between font-semibold text-white">
                        <span className="text-rose-300 font-bold">✗ {sk.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 font-medium capitalize border border-rose-500/30">
                          {sk.category}
                        </span>
                      </div>
                      <p className="text-slate-300 mt-1 text-[11px]">{sk.explanation}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Filtered Category Specific View */
          <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
            <h4 className="text-sm font-bold text-white capitalize">
              Category: {selectedCategory.replace('_', ' ')}
            </h4>

            {(() => {
              const catKey = selectedCategory as keyof CategorizedSkills;
              const catData = categorizedSkills[catKey];
              if (!catData) {
                return <p className="text-xs text-slate-400">No skill data for this category.</p>;
              }
              return (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-slate-300 mb-1">Found in Resume:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {catData.resume.length === 0 ? (
                        <span className="text-slate-400 italic">None listed</span>
                      ) : (
                        catData.resume.map((s, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium"
                          >
                            ✓ {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-300 mb-1">Required by Job:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {catData.required.length === 0 ? (
                        <span className="text-slate-400 italic">None specifically required</span>
                      ) : (
                        catData.required.map((s, i) => (
                          <span
                            key={i}
                            className={`px-2 py-1 rounded-md font-medium border ${
                              catData.resume.includes(s)
                                ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                            }`}
                          >
                            {catData.resume.includes(s) ? '✓ ' : '✗ '} {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Honest Career Disclaimer Notice */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Recruiter Tip:</strong> Consider adding a skill to your resume <strong>only if you genuinely have experience with it</strong>. Never add unearned skills purely to game ATS filters.
        </p>
      </div>
    </div>
  );
};
