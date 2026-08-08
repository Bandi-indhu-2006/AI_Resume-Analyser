import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { InterviewPrep } from '../types/resume';

interface InterviewPrepCardProps {
  interviewPrep?: InterviewPrep;
  targetRole?: string;
}

export const InterviewPrepCard: React.FC<InterviewPrepCardProps> = ({
  interviewPrep,
  targetRole = 'Software Engineer',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const questions = interviewPrep?.questions || [];
  const areasToPrepare = interviewPrep?.areasToPrepare || [];

  if (questions.length === 0) {
    return null;
  }

  const categories = ['all', ...Array.from(new Set(questions.map((q) => q.category)))];

  const filteredQuestions =
    activeCategory === 'all'
      ? questions
      : questions.filter((q) => q.category === activeCategory);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Personalized Interview Preparation</h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Targeted questions generated specifically from your projects, resume statements, and target role skill gaps.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer ${
              activeCategory === cat
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                : 'bg-black/30 hover:bg-black/50 text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions Accordion / Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-extrabold text-[10px] uppercase tracking-wider">
                      {q.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-relaxed">{q.question}</h3>
                </div>

                <div className="text-slate-400 shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-white/5 space-y-3 text-xs">
                  {q.context && (
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
                      <span className="font-bold">Why this question is asked: </span>
                      <span>{q.context}</span>
                    </div>
                  )}

                  {q.keyPointsToCover && q.keyPointsToCover.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                        Key Points to Highlight in Your Answer:
                      </p>
                      <ul className="space-y-1.5 pl-2">
                        {q.keyPointsToCover.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Areas to Prepare Before Interview */}
      {areasToPrepare.length > 0 && (
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
          <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Priority Areas to Review Before Interviews</span>
          </h3>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-200/90">
            {areasToPrepare.map((area, aIdx) => (
              <li key={aIdx} className="flex items-center gap-2 bg-black/30 p-2.5 rounded-xl border border-amber-500/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
