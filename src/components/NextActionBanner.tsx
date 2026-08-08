import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';

interface NextActionBannerProps {
  nextBestAction?: string;
  onNavigateToRoadmap?: () => void;
}

export const NextActionBanner: React.FC<NextActionBannerProps> = ({
  nextBestAction,
  onNavigateToRoadmap,
}) => {
  if (!nextBestAction) return null;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-pink-600/20 border border-indigo-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-500/30">
          <Rocket className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300">Next Best Action</span>
          <p className="text-sm font-bold text-white mt-0.5 leading-snug">{nextBestAction}</p>
        </div>
      </div>

      {onNavigateToRoadmap && (
        <button
          type="button"
          onClick={onNavigateToRoadmap}
          className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2 shrink-0 shadow-lg shadow-white/10 cursor-pointer"
        >
          <span>View 30-Day Plan</span>
          <ArrowRight className="w-4 h-4 text-slate-900" />
        </button>
      )}
    </div>
  );
};
