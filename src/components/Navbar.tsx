import React from 'react';
import { FileText, Sparkles, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'upload' | 'dashboard';
  setCurrentView: (view: 'landing' | 'upload' | 'dashboard') => void;
  isGeminiActive: boolean;
  onTrySample: () => void;
  hasAnalysis: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  isGeminiActive,
  onTrySample,
  hasAnalysis,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0c10]/70 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300 tracking-tight">
                ResumeAI
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 rounded-md border border-indigo-500/20">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">AI Career & Resume Navigator</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              currentView === 'landing'
                ? 'bg-white/10 text-white font-semibold border border-white/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentView('upload')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              currentView === 'upload'
                ? 'bg-white/10 text-white font-semibold border border-white/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Analyze Resume
          </button>

          {hasAnalysis && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30'
                  : 'text-indigo-400 hover:text-indigo-200 hover:bg-indigo-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Results</span>
            </button>
          )}
        </nav>

        {/* Right Action & API Status Badge */}
        <div className="flex items-center gap-3">
          {/* Status badge */}
          <div
            title={
              isGeminiActive
                ? 'Gemini 3.6 Flash API key loaded via process.env.GEMINI_API_KEY'
                : 'Demo Mode / Intelligent Local AI active'
            }
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              isGeminiActive
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isGeminiActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span>{isGeminiActive ? 'Gemini AI Active' : 'Demo / Local AI Mode'}</span>
          </div>

          <button
            onClick={onTrySample}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Try</span> Sample
          </button>

          <button
            onClick={() => setCurrentView('upload')}
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-400 rounded-lg transition-all shadow-lg shadow-indigo-500/25"
          >
            Analyze Now
          </button>
        </div>
      </div>
    </header>
  );
};
