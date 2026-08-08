export interface SkillMatchItem {
  name: string;
  category: string;
  explanation: string;
}

export interface CategorizedSkills {
  programming: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  frontend: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  backend: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  databases: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  cloud: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  devops: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  ai_ml: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  tools: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  soft_skills: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
  other: { resume: string[]; required: string[]; missing: string[]; weak: string[] };
}

export interface KeywordItem {
  keyword: string;
  status: 'found' | 'missing';
  frequency?: number;
  importance: 'high' | 'medium' | 'low';
}

export interface FormattingIssue {
  issue: string;
  risk: 'high' | 'medium' | 'low';
  explanation: string;
}

export interface SectionAnalysis {
  name: string;
  present: boolean;
  status: 'present' | 'missing' | 'optional';
  feedback: string;
}

export interface BulletImprovement {
  before: string;
  problem: string;
  after: string;
}

export interface RecommendationItem {
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  title: string;
  detail: string;
}

// --- 7 Core Career Navigator Feature Interfaces ---

export interface CareerMatch {
  title: string;
  fitScore: number; // e.g. 86
  whyFit: string;
  existingSkills: string[];
  missingSkills: string[];
}

export interface TargetSkillGap {
  skill: string;
  status: 'strong' | 'partial' | 'missing' | 'unable_to_verify';
  explanation: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface TransferableSkill {
  originalExperience: string;
  transferableSkill: string;
  relevanceToTargetRole: string;
}

export interface SkillEvidenceItem {
  skill: string;
  status: 'strong' | 'limited' | 'none' | 'unable_to_verify';
  evidenceLocation: string;
  details: string;
}

export interface PriorityImprovement {
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  problem: string;
  whyItMatters: string;
  exactAction: string;
  exampleRewrite: string;
}

export interface WeeklyPlanItem {
  week: number;
  focusSkill: string;
  learningTask: string;
  practiceTask: string;
  careerTask: string;
  expectedOutcome: string;
  proofOfLearning: string;
}

export interface ThirtyDayPlan {
  dailyCommitment: '30 minutes' | '1 hour' | '2 hours' | '3+ hours';
  weeks: WeeklyPlanItem[];
}

export interface InterviewQuestion {
  category: 'Technical' | 'Project-based' | 'Resume-based' | 'Role-specific' | 'Behavioral';
  question: string;
  context: string;
  keyPointsToCover: string[];
}

export interface InterviewPrep {
  questions: InterviewQuestion[];
  areasToPrepare: string[];
}

export interface AtsBreakdown {
  keywordMatch: number;      // 25% max
  skillsMatch: number;       // 25% max
  experienceRelevance: number; // 20% max
  projectRelevance: number;  // 15% max
  resumeStructure: number;   // 10% max
  formattingReadability: number; // 5% max
}

export interface AnalysisResult {
  atsScore: number; // 0-100
  atsBreakdown: AtsBreakdown;
  atsExplanation: string;
  jobMatchScore: number; // 0-100
  summary: string;
  overallVerdict: string;
  matchedSkills: SkillMatchItem[];
  missingSkills: SkillMatchItem[];
  partialSkills: SkillMatchItem[];
  categorizedSkills: CategorizedSkills;
  keywords: KeywordItem[];
  missingImportantKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  formattingIssues: FormattingIssue[];
  sectionAnalysis: SectionAnalysis[];
  bulletImprovements: BulletImprovement[];
  recommendations: RecommendationItem[];
  
  // New 7 Core Career Navigator Fields
  careerMatches?: CareerMatch[];
  targetRole?: string;
  targetSkillGaps?: TargetSkillGap[];
  transferableSkills?: TransferableSkill[];
  skillEvidence?: SkillEvidenceItem[];
  skillEvidenceScore?: number; // 0-100
  priorityImprovements?: PriorityImprovement[];
  thirtyDayPlan?: ThirtyDayPlan;
  interviewPrep?: InterviewPrep;
  nextBestAction?: string;

  // Parsing Quality & Reliability Metadata
  parsingQuality?: 'Excellent' | 'Good' | 'Poor' | 'Failed';
  parsingScore?: number; // 0-100
  parsingWarning?: string;
  isTextSearchable?: boolean;

  parsedMeta?: {
    charCount: number;
    wordCount: number;
    pageEstimate: number;
    filename?: string;
  };
}

export interface ExtractResponse {
  success: boolean;
  text?: string;
  error?: string;
  meta?: {
    filename: string;
    size: number;
    mimeType: string;
    charCount: number;
    wordCount: number;
    parsingQuality: 'Excellent' | 'Good' | 'Poor' | 'Failed';
    parsingScore: number;
    parsingWarning?: string;
    isTextSearchable: boolean;
    detectedSections: string[];
    detectedLinks: string[];
  };
}
