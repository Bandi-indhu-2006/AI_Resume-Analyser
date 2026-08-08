import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParseModule = require('pdf-parse');
const pdfParse = typeof pdfParseModule === 'function' ? pdfParseModule : (pdfParseModule?.default || pdfParseModule);

export interface ResumeSectionCheck {
  sectionName: string;
  found: boolean;
  aliases: string[];
}

export interface ConfidenceCheckResult {
  confidenceScore: number; // 0 - 100
  confidenceRating: 'High' | 'Medium' | 'Low' | 'Failed';
  hasEducationOrSkills: boolean;
  detectedSections: string[];
  missingSections: string[];
  checks: ResumeSectionCheck[];
  warning?: string;
  canProceedWithAI: boolean;
}

export interface ResumeExtractionResult {
  text: string;
  confidence: ConfidenceCheckResult;
  meta: {
    filename: string;
    size: number;
    mimeType: string;
    charCount: number;
    wordCount: number;
  };
}

/**
  * Parses PDF buffer using pdf-parse module reliably.
  */
export async function parsePdf(buffer: Buffer): Promise<string> {
  if (typeof pdfParseModule?.PDFParse === 'function') {
    const parser = new pdfParseModule.PDFParse({ data: buffer });
    await parser.load();
    const res = await parser.getText();
    return res?.text || '';
  } else if (typeof pdfParseModule === 'function') {
    const parsed = await pdfParseModule(buffer);
    return parsed?.text || '';
  } else if (typeof pdfParse === 'function') {
    const parsed = await pdfParse(buffer);
    return parsed?.text || '';
  }
  throw new Error('PDF parsing library (pdf-parse) could not be loaded as a class or function.');
}

/**
  * Performs an extraction confidence check verifying common resume sections
  * like 'Education', 'Skills', 'Experience', 'Projects', 'Contact', 'Summary'.
  */
export function calculateExtractionConfidence(text: string): ConfidenceCheckResult {
  const cleanText = text.trim();
  if (!cleanText || cleanText.length < 20) {
    return {
      confidenceScore: 0,
      confidenceRating: 'Failed',
      hasEducationOrSkills: false,
      detectedSections: [],
      missingSections: ['Education', 'Skills', 'Experience', 'Projects'],
      checks: [
        { sectionName: 'Education', found: false, aliases: ['education', 'qualification', 'academic'] },
        { sectionName: 'Skills', found: false, aliases: ['skills', 'technical', 'technologies', 'tools'] },
      ],
      warning: 'Resume text is empty or could not be extracted from PDF.',
      canProceedWithAI: false,
    };
  }

  const lowerText = cleanText.toLowerCase();

  const sectionDefinitions: { name: string; aliases: string[]; weight: number }[] = [
    { name: 'Education', aliases: ['education', 'qualification', 'academic', 'b.tech', 'degree', 'bachelor', 'university', 'college'], weight: 25 },
    { name: 'Skills', aliases: ['skills', 'technical', 'technologies', 'tools', 'languages', 'core competencies', 'competencies'], weight: 25 },
    { name: 'Experience', aliases: ['experience', 'work', 'employment', 'internship', 'intern', 'history', 'professional background'], weight: 20 },
    { name: 'Projects', aliases: ['project', 'projects', 'personal projects', 'key projects', 'academic projects'], weight: 15 },
    { name: 'Contact Info', aliases: ['email', '@', 'phone', 'mobile', 'github', 'linkedin'], weight: 15 },
  ];

  const checks: ResumeSectionCheck[] = [];
  const detectedSections: string[] = [];
  const missingSections: string[] = [];
  let score = 0;

  for (const def of sectionDefinitions) {
    const found = def.aliases.some((alias) => lowerText.includes(alias));
    checks.push({
      sectionName: def.name,
      found,
      aliases: def.aliases,
    });

    if (found) {
      detectedSections.push(def.name);
      score += def.weight;
    } else {
      missingSections.push(def.name);
    }
  }

  // Verify presence of Education or Skills specifically
  const hasEducation = checks.find((c) => c.sectionName === 'Education')?.found || false;
  const hasSkills = checks.find((c) => c.sectionName === 'Skills')?.found || false;
  const hasEducationOrSkills = hasEducation || hasSkills;

  // Bonus points for overall length and structure
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  if (wordCount > 100) score = Math.min(100, score + 10);

  let confidenceRating: 'High' | 'Medium' | 'Low' | 'Failed';
  if (score >= 75) {
    confidenceRating = 'High';
  } else if (score >= 50) {
    confidenceRating = 'Medium';
  } else if (score >= 30) {
    confidenceRating = 'Low';
  } else {
    confidenceRating = 'Failed';
  }

  const canProceedWithAI = confidenceRating !== 'Failed' && cleanText.length > 50;

  let warning: string | undefined = undefined;
  if (!hasEducationOrSkills) {
    warning = "Confidence Warning: Common resume sections like 'Education' or 'Skills' were not detected cleanly in the extracted text.";
  }

  return {
    confidenceScore: score,
    confidenceRating,
    hasEducationOrSkills,
    detectedSections,
    missingSections,
    checks,
    warning,
    canProceedWithAI,
  };
}

/**
  * Full extraction and confidence analysis for a resume file buffer
  */
export async function parseResumeService(
  buffer: Buffer,
  mimeType: string,
  filename: string
): Promise<ResumeExtractionResult> {
  const lowerName = filename.toLowerCase();
  let text = '';

  if (mimeType.includes('pdf') || lowerName.endsWith('.pdf')) {
    text = await parsePdf(buffer);
  } else {
    text = buffer.toString('utf-8');
  }

  const cleanText = text.trim();
  const confidence = calculateExtractionConfidence(cleanText);

  return {
    text: cleanText,
    confidence,
    meta: {
      filename,
      size: buffer.length,
      mimeType,
      charCount: cleanText.length,
      wordCount: cleanText.split(/\s+/).filter(Boolean).length,
    },
  };
}
