import React from 'react';
import { FileText, Github, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 border-t border-white/10 mt-20 text-xs text-slate-400 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-500/20">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white">ResumeAI</span>
          <span className="text-slate-400">— AI Resume Analyzer & Job Matcher</span>
        </div>

        <p className="flex items-center gap-1 text-center sm:text-right text-slate-400">
          <span>Crafted for Student Developers & Technical Job Seekers with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </p>
      </div>
    </footer>
  );
};
