import React from 'react';
import { FileWarning, CheckCircle2, AlertTriangle, Upload, RefreshCw, FileText } from 'lucide-react';

interface ParsingQualityBannerProps {
  parsingQuality?: 'Excellent' | 'Good' | 'Poor' | 'Failed';
  parsingScore?: number;
  parsingWarning?: string;
  isTextSearchable?: boolean;
  filename?: string;
  onNewAnalysis?: () => void;
}

export const ParsingQualityBanner: React.FC<ParsingQualityBannerProps> = ({
  parsingQuality = 'Good',
  parsingScore = 80,
  parsingWarning,
  isTextSearchable = true,
  filename,
  onNewAnalysis,
}) => {
  const isPoorOrFailed = parsingQuality === 'Poor' || parsingQuality === 'Failed' || !isTextSearchable;

  const getQualityBadge = () => {
    switch (parsingQuality) {
      case 'Excellent':
        return {
          label: 'Excellent Parsing Quality',
          color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          dot: 'bg-emerald-400',
        };
      case 'Good':
        return {
          label: 'Good Parsing Quality',
          color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          dot: 'bg-indigo-400',
        };
      case 'Poor':
        return {
          label: 'Poor Extraction Quality',
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          dot: 'bg-amber-400',
        };
      case 'Failed':
      default:
        return {
          label: 'Parsing Failed',
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          dot: 'bg-rose-400',
        };
    }
  };

  const badge = getQualityBadge();

  if (isPoorOrFailed) {
    return (
      <div className="bg-rose-500/10 backdrop-blur-xl rounded-2xl border-2 border-rose-500/30 p-6 sm:p-8 space-y-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
              <FileWarning className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Resume text could not be reliably extracted.</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${badge.color}`}>
                  {parsingQuality} ({parsingScore}%)
                </span>
              </div>
              <p className="text-xs text-rose-200/80 mt-1">
                {filename ? `File: ${filename}` : 'Uploaded document stream unreadable'}
              </p>
            </div>
          </div>

          {onNewAnalysis && (
            <button
              type="button"
              onClick={onNewAnalysis}
              className="px-4 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-400 rounded-xl transition-all shadow-lg shadow-rose-500/20 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Upload Text-Searchable File</span>
            </button>
          )}
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-rose-500/20 text-xs text-slate-200 leading-relaxed space-y-2">
          <p className="font-semibold text-rose-300">
            ⚠ Safety Protection Active:
          </p>
          <p>
            {parsingWarning ||
              'We detected PDF text stream or font encoding issues. Generating an ATS score or claiming skills are missing based on garbled text creates misleading feedback.'}
          </p>
          <p className="text-slate-300 font-medium">
            To unlock an accurate ATS score and verified skill-gap analysis, please re-upload:
          </p>
          <ul className="list-disc pl-5 text-slate-300 space-y-1">
            <li>A <strong>text-searchable PDF</strong> (File → Save/Print to PDF in Word, Google Docs, or Canva)</li>
            <li>A <strong>DOCX document</strong> (.docx)</li>
            <li>Or paste your raw resume text directly</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold text-white">
            <span>Parsing Quality:</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${badge.color}`}>
              {parsingQuality} ({parsingScore}%)
            </span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Text searchability verified. Headings, skills, and bullet structures extracted cleanly.
          </p>
        </div>
      </div>

      <div className="text-slate-400 font-medium text-[11px] shrink-0">
        100% Text Searchable
      </div>
    </div>
  );
};
