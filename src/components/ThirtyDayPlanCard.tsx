import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Award, ExternalLink, Sparkles } from 'lucide-react';
import { ThirtyDayPlan } from '../types/resume';

interface ThirtyDayPlanCardProps {
  thirtyDayPlan?: ThirtyDayPlan;
  targetRole?: string;
}

export const ThirtyDayPlanCard: React.FC<ThirtyDayPlanCardProps> = ({
  thirtyDayPlan,
  targetRole = 'Software Engineer',
}) => {
  const [dailyHours, setDailyHours] = useState<'30 minutes' | '1 hour' | '2 hours' | '3+ hours'>(
    thirtyDayPlan?.dailyCommitment || '1 hour'
  );

  const weeks = thirtyDayPlan?.weeks || [];

  if (weeks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-8">
      {/* Top Banner & Daily Commitment Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Personalized 30-Day Improvement Roadmap</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Step-by-step 4-week roadmap focused on closing your top skill gaps and creating employer-ready Proof of Learning.
          </p>
        </div>

        {/* Daily Time Commitment Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/10">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 px-2">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Time / Day:</span>
          </span>

          <div className="flex flex-wrap gap-1">
            {(['30 minutes', '1 hour', '2 hours', '3+ hours'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setDailyHours(option)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dailyHours === option
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week Cards 1 through 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {weeks.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-black/30 border border-white/10 hover:border-indigo-500/30 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-black text-xs uppercase tracking-wider">
                  WEEK {item.week}
                </span>

                <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Focus: {item.focusSkill}</span>
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5 text-xs">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">1. Learning Task</p>
                  <p className="text-slate-200 mt-0.5">{item.learningTask}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">2. Practice Exercise</p>
                  <p className="text-indigo-200 font-medium mt-0.5">{item.practiceTask}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">3. Career & Application Task</p>
                  <p className="text-slate-300 mt-0.5">{item.careerTask}</p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Expected Outcome</p>
                  <p className="text-emerald-300 font-semibold mt-0.5">{item.expectedOutcome}</p>
                </div>
              </div>
            </div>

            {/* Proof of Learning Callout Box */}
            <div className="pt-3 border-t border-white/5">
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>PROOF OF LEARNING DELIVERABLE</span>
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {item.proofOfLearning}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
