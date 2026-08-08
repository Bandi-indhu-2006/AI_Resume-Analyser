import React from 'react';
import {
  FileText,
  Sparkles,
  Target,
  BarChart3,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  TrendingUp,
  Award,
  Layers,
  Cpu,
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalyze: () => void;
  onTrySample: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAnalyze,
  onTrySample,
}) => {
  return (
    <div className="min-h-screen text-slate-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs sm:text-sm font-semibold mb-6 border border-indigo-500/20 shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>⚡ Powered by Gemini 3.6 Flash & AI Intelligence</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl mx-auto">
            Turn Your Resume Into an{' '}
            <span className="text-indigo-400">
              Interview-Ready
            </span>{' '}
            Asset
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            AI-powered resume analysis, ATS optimization and job matching — all in one place. Stop guessing and start getting noticed.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onStartAnalyze}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-indigo-500 hover:bg-indigo-400 rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <span>Analyze My Resume</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onTrySample}
              className="w-full sm:w-auto px-6 py-3.5 text-base font-bold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Try Sample Resume</span>
            </button>
          </div>

          {/* Metrics Row */}
          <div className="flex items-center justify-center space-x-8 sm:space-x-12 pt-12 mt-10 border-t border-white/10 text-slate-300">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">98%</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">ATS Success</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">15k+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">Resumes Analyzed</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-bold text-white">4.9/5</span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest mt-1">User Rating</span>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Private & In-Memory</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-indigo-400" />
              <span>PDF, DOCX & TXT Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span>Gemini 3.6 Flash Engine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Everything You Need to Beat the ATS Filter
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Get actionable, recruiter-grade diagnostics to tailor your resume for any target job description.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: ATS Score */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Estimated ATS Score</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Detailed breakdown across keyword match, skills alignment, experience relevance, and structural readability.
            </p>
          </div>

          {/* Card 2: Job Match */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Job Match Score</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Identify matched, missing, and partial skill overlaps to evaluate your overall fit for the target position.
            </p>
          </div>

          {/* Card 3: Skill Gap Analysis */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Skill Gap Analysis</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Categorizes your technical and soft skills across Languages, Frontend, Backend, Cloud, DevOps, and Tools.
            </p>
          </div>

          {/* Card 4: Resume Improvement */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Resume Improvement</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Upgrade weak bullet points with BEFORE vs AFTER comparisons using strong action verbs without fabricating metrics.
            </p>
          </div>

          {/* Card 5: AI Recommendations */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Recommendations</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Prioritized high, medium, and low impact suggestions tailored directly to recruiter preferences and ATS criteria.
            </p>
          </div>

          {/* Card 6: Formatting Check */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Formatting Check</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Detect potential parsing obstacles like multi-column layouts, missing section headers, or complex symbols.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How It Works in 3 Simple Steps
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Transform your resume from standard to recruiter-ready in under 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Upload Resume</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Drop your PDF, DOCX, or TXT resume file or paste plain text directly into our secure parser.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Add Job Description</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Paste the target job description or requirements from LinkedIn, Indeed, or company careers pages.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Get AI Analysis</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Receive instant ATS scores, missing keywords, bullet point upgrades, and prioritized recommendations.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onStartAnalyze}
              className="px-8 py-3.5 text-base font-bold text-white bg-indigo-500 hover:bg-indigo-400 rounded-xl transition-all shadow-lg shadow-indigo-500/25 inline-flex items-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
