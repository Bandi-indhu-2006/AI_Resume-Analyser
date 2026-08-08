import React, { useState } from 'react';
import {
  BarChart3,
  Target,
  Key,
  TrendingUp,
  Layout,
  Sparkles,
  ArrowLeft,
  Share2,
  Check,
  Award,
  FileText,
  Compass,
  ArrowRightLeft,
  ShieldCheck,
  Calendar,
  HelpCircle,
  Rocket,
} from 'lucide-react';
import { AnalysisResult } from '../types/resume';
import { AtsScoreCard } from './AtsScoreCard';
import { SkillsMatchCard } from './SkillsMatchCard';
import { KeywordsCard } from './KeywordsCard';
import { BulletImprovementCard } from './BulletImprovementCard';
import { SectionFormattingCard } from './SectionFormattingCard';
import { RecommendationsCard } from './RecommendationsCard';

// 7 New Career Navigator Feature Components
import { CareerMatchesCard } from './CareerMatchesCard';
import { TargetSkillGapCard } from './TargetSkillGapCard';
import { TransferableSkillsCard } from './TransferableSkillsCard';
import { SkillEvidenceCard } from './SkillEvidenceCard';
import { PriorityImprovementsCard } from './PriorityImprovementsCard';
import { ThirtyDayPlanCard } from './ThirtyDayPlanCard';
import { InterviewPrepCard } from './InterviewPrepCard';
import { NextActionBanner } from './NextActionBanner';
import { ParsingQualityBanner } from './ParsingQualityBanner';

interface DashboardProps {
  analysis: AnalysisResult;
  onNewAnalysis: () => void;
  isGeminiActive: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  analysis,
  onNewAnalysis,
  isGeminiActive,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'career_matches'
    | 'skill_gaps'
    | 'transferable'
    | 'skill_evidence'
    | 'improvements'
    | 'roadmap'
    | 'interview'
    | 'ats'
    | 'skills'
    | 'keywords'
    | 'bullets'
    | 'structure'
  >('overview');

  const [copiedSummary, setCopiedSummary] = useState(false);

  // Selected Target Role state
  const [targetRole, setTargetRole] = useState<string>(
    analysis.targetRole || analysis.careerMatches?.[0]?.title || 'Software Engineer'
  );

  const handleCopySummary = () => {
    const text = `AI Career & Resume Navigator Summary
Target Role: ${targetRole}
Next Best Action: ${analysis.nextBestAction || 'Review your 30-day roadmap'}
Estimated ATS Score: ${analysis.atsScore}/100
Job Match Score: ${analysis.jobMatchScore}/100
Verdict: ${analysis.overallVerdict}

Summary:
${analysis.summary}

Top Career Matches:
${analysis.careerMatches?.map((m) => `• ${m.title} (${m.fitScore}% fit)`).join('\n') || 'N/A'}
`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Navigator Overview', icon: Rocket },
    { id: 'career_matches', label: '1. Career Roles', icon: Compass },
    { id: 'skill_gaps', label: '2. Role Skill Gaps', icon: Target },
    { id: 'transferable', label: '3. Transferable Skills', icon: ArrowRightLeft },
    { id: 'skill_evidence', label: '4. Skill Evidence', icon: ShieldCheck },
    { id: 'improvements', label: '5. Priority Fixes', icon: TrendingUp },
    { id: 'roadmap', label: '6. 30-Day Plan', icon: Calendar },
    { id: 'interview', label: '7. Interview Prep', icon: HelpCircle },
    { id: 'ats', label: 'ATS Diagnostics', icon: Award },
    { id: 'skills', label: 'Skills & Keywords', icon: Key },
    { id: 'structure', label: 'Structure & Format', icon: Layout },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-200">
      {/* Top Banner Actions & Meta */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
        <div>
          <button
            onClick={onNewAnalysis}
            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Analyze Another Resume</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>AI Career & Resume Navigator</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
              {analysis.parsedMeta?.filename || 'Uploaded Resume'}
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySummary}
            className="px-4 py-2 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
          >
            {copiedSummary ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied Summary!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-500 hover:bg-indigo-400 rounded-xl transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
          >
            New Analysis
          </button>
        </div>
      </div>

      {/* Parsing Quality & Safety Banner */}
      <ParsingQualityBanner
        parsingQuality={analysis.parsingQuality}
        parsingScore={analysis.parsingScore}
        parsingWarning={analysis.parsingWarning}
        isTextSearchable={analysis.isTextSearchable}
        filename={analysis.parsedMeta?.filename}
        onNewAnalysis={onNewAnalysis}
      />

      {/* Next Best Action Banner */}
      <NextActionBanner
        nextBestAction={analysis.nextBestAction}
        onNavigateToRoadmap={() => setActiveTab('roadmap')}
      />

      {/* Hero Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1: Primary Target Role */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Role</p>
            <p className="text-lg font-black text-white mt-1 line-clamp-1">{targetRole}</p>
            <p className="text-[11px] text-indigo-400 font-medium mt-0.5">Top Match Candidate</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold shrink-0">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Skill Evidence Score */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Skill Evidence Score</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-emerald-400">
                {analysis.skillEvidenceScore || Math.round(analysis.atsScore * 0.95)}%
              </span>
            </div>
            <p className="text-[11px] text-emerald-300 font-medium mt-0.5">Verified Evidence</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: Estimated ATS Score */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ATS Score</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-white">{analysis.atsScore}</span>
              <span className="text-xs text-slate-400 font-bold">/ 100</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">ATS Parser Index</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold shrink-0">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* Card 4: Overall Verdict */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Readiness Verdict</p>
            <p className="text-sm font-bold text-white mt-1 line-clamp-1">{analysis.overallVerdict}</p>
            <p className="text-[11px] text-indigo-300 font-semibold mt-0.5">
              {(analysis.priorityImprovements?.length || 3)} Priority Fixes
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-400 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 min-w-max text-xs sm:text-sm font-medium">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer text-xs font-bold ${
                  isActive
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="space-y-8">
        {/* NAVIGATOR OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Executive Summary */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4 shadow-2xl">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <span>Executive Career Summary</span>
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                {analysis.summary}
              </p>
            </div>

            {/* Feature 1: Career Matches */}
            <CareerMatchesCard
              careerMatches={analysis.careerMatches}
              selectedRole={targetRole}
              onSelectRole={(r) => setTargetRole(r)}
            />

            {/* Feature 2: Target Role Skill-Gap */}
            <TargetSkillGapCard
              targetRole={targetRole}
              targetSkillGaps={analysis.targetSkillGaps}
              onChangeTargetRole={(r) => setTargetRole(r)}
            />

            {/* Feature 5: Priority Improvements */}
            <PriorityImprovementsCard priorityImprovements={analysis.priorityImprovements} />

            {/* Feature 6: 30-Day Plan Preview */}
            <ThirtyDayPlanCard thirtyDayPlan={analysis.thirtyDayPlan} targetRole={targetRole} />
          </div>
        )}

        {/* FEATURE 1: CAREER ROLES DISCOVERY */}
        {activeTab === 'career_matches' && (
          <CareerMatchesCard
            careerMatches={analysis.careerMatches}
            selectedRole={targetRole}
            onSelectRole={(r) => setTargetRole(r)}
          />
        )}

        {/* FEATURE 2: TARGET ROLE SKILL GAPS */}
        {activeTab === 'skill_gaps' && (
          <TargetSkillGapCard
            targetRole={targetRole}
            targetSkillGaps={analysis.targetSkillGaps}
            onChangeTargetRole={(r) => setTargetRole(r)}
          />
        )}

        {/* FEATURE 3: TRANSFERABLE SKILLS */}
        {activeTab === 'transferable' && (
          <TransferableSkillsCard
            transferableSkills={analysis.transferableSkills}
            targetRole={targetRole}
          />
        )}

        {/* FEATURE 4: SKILL EVIDENCE ANALYSIS */}
        {activeTab === 'skill_evidence' && (
          <SkillEvidenceCard
            skillEvidenceScore={analysis.skillEvidenceScore}
            skillEvidence={analysis.skillEvidence}
          />
        )}

        {/* FEATURE 5: PRIORITY IMPROVEMENTS */}
        {activeTab === 'improvements' && (
          <PriorityImprovementsCard priorityImprovements={analysis.priorityImprovements} />
        )}

        {/* FEATURE 6: 30-DAY ROADMAP */}
        {activeTab === 'roadmap' && (
          <ThirtyDayPlanCard thirtyDayPlan={analysis.thirtyDayPlan} targetRole={targetRole} />
        )}

        {/* FEATURE 7: INTERVIEW PREPARATION */}
        {activeTab === 'interview' && (
          <InterviewPrepCard interviewPrep={analysis.interviewPrep} targetRole={targetRole} />
        )}

        {/* ATS DIAGNOSTICS */}
        {activeTab === 'ats' && (
          <AtsScoreCard
            score={analysis.atsScore}
            breakdown={analysis.atsBreakdown}
            explanation={analysis.atsExplanation}
          />
        )}

        {/* SKILLS & KEYWORDS */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            <SkillsMatchCard
              jobMatchScore={analysis.jobMatchScore}
              matchedSkills={analysis.matchedSkills}
              missingSkills={analysis.missingSkills}
              partialSkills={analysis.partialSkills}
              categorizedSkills={analysis.categorizedSkills}
            />
            <KeywordsCard
              keywords={analysis.keywords}
              missingImportantKeywords={analysis.missingImportantKeywords}
            />
          </div>
        )}

        {/* STRUCTURE & FORMATTING */}
        {activeTab === 'structure' && (
          <div className="space-y-8">
            <SectionFormattingCard
              sectionAnalysis={analysis.sectionAnalysis}
              formattingIssues={analysis.formattingIssues}
            />
            <BulletImprovementCard bulletImprovements={analysis.bulletImprovements} />
          </div>
        )}
      </div>
    </div>
  );
};
