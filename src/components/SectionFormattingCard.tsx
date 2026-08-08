import React from 'react';
import { Layout, CheckCircle2, XCircle, AlertTriangle, HelpCircle, FileCheck } from 'lucide-react';
import { SectionAnalysis, FormattingIssue } from '../types/resume';

interface SectionFormattingCardProps {
  sectionAnalysis: SectionAnalysis[];
  formattingIssues: FormattingIssue[];
}

export const SectionFormattingCard: React.FC<SectionFormattingCardProps> = ({
  sectionAnalysis,
  formattingIssues,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8">
      {/* 1. Resume Structure Checklist */}
      <div>
        <div className="pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Resume Structure Audit</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Verification of standard resume sections expected by ATS parsers and recruiters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sectionAnalysis.map((sec, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                sec.present
                  ? 'bg-emerald-500/10 border-emerald-500/20'
                  : sec.status === 'optional'
                  ? 'bg-white/5 border-white/10'
                  : 'bg-rose-500/10 border-rose-500/20'
              }`}
            >
              {sec.present ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : sec.status === 'optional' ? (
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between font-bold text-white mb-0.5">
                  <span>{sec.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded-md font-semibold border ${
                      sec.present
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : sec.status === 'optional'
                        ? 'bg-white/10 text-slate-300 border-white/10'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}
                  >
                    {sec.present ? 'Present ✓' : sec.status === 'optional' ? 'Optional' : 'Missing ✗'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">{sec.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Formatting & ATS Parsing Issues */}
      <div className="pt-4 border-t border-white/10">
        <div className="pb-4 mb-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Formatting & ATS Parser Readability</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Analysis of potential formatting hazards that can impede mechanical PDF/DOCX text extraction.
          </p>
        </div>

        {formattingIssues.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">No High-Risk Formatting Hazards Detected!</p>
              <p className="text-emerald-300/80 text-[11px] mt-0.5">
                Your resume text extracted cleanly with clear section headings and single-column layout flow.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {formattingIssues.map((issue, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-amber-300">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>{issue.issue}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      issue.risk === 'high'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {issue.risk} Risk
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed pl-6">{issue.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <p className="mt-4 text-[11px] text-slate-500 italic">
          * Note: Formatting checks identify potential compatibility concerns based on standard mechanical parsers (such as PDF text stream layout). They are intended as preventative warnings rather than guaranteed ATS failures.
        </p>
      </div>
    </div>
  );
};
