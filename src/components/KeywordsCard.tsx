import React from 'react';
import { Key, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import { KeywordItem } from '../types/resume';

interface KeywordsCardProps {
  keywords: KeywordItem[];
  missingImportantKeywords: string[];
}

export const KeywordsCard: React.FC<KeywordsCardProps> = ({
  keywords,
  missingImportantKeywords,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Key className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Keyword & Term Frequency Analysis</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Comparison of essential keywords extracted from the job posting against occurrences in your resume.
        </p>
      </div>

      {/* Missing Important Keywords Highlight Banner */}
      {missingImportantKeywords.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Potentially Important Missing Keywords ({missingImportantKeywords.length})</span>
          </div>
          <p className="text-xs text-amber-300/80">
            Consider integrating these key terms into your project or experience descriptions if you have genuine experience with them:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {missingImportantKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30"
              >
                + {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Keyword Table Grid */}
      <div className="overflow-x-auto border border-white/10 bg-black/20 rounded-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-white/5 border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th className="py-3 px-4">Job Keyword</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Resume Occurrences</th>
              <th className="py-3 px-4 text-right">Importance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {keywords.map((kw, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-bold text-white">{kw.keyword}</td>
                <td className="py-3 px-4">
                  {kw.status === 'found' ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Found
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <XCircle className="w-3 h-3 text-rose-400" /> Missing
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-center font-mono font-bold text-slate-200">
                  {kw.frequency ?? (kw.status === 'found' ? 1 : 0)}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      kw.importance === 'high'
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        : kw.importance === 'medium'
                        ? 'bg-white/10 text-slate-300 border-white/10'
                        : 'bg-white/5 text-slate-400 border-white/5'
                    }`}
                  >
                    {kw.importance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
