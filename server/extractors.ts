import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParseModule = require('pdf-parse');
const pdfParse = typeof pdfParseModule === 'function' ? pdfParseModule : (pdfParseModule?.default || pdfParseModule);

const mammothModule = require('mammoth');
const mammoth = typeof mammothModule?.extractRawText === 'function' ? mammothModule : (mammothModule?.default || mammothModule);

import { parsePdf, calculateExtractionConfidence } from './src/services/resumeParser.js';

export interface ExtractionMeta {
  filename: string;
  size: number;
  mimeType: string;
  charCount: number;
  wordCount: number;
  parsingQuality: 'Excellent' | 'Good' | 'Poor' | 'Failed';
  parsingScore: number; // 0-100
  parsingWarning?: string;
  isTextSearchable: boolean;
  detectedSections: string[];
  detectedLinks: string[];
}

export interface ExtractionResult {
  text: string;
  meta: ExtractionMeta;
}

export function analyzeParsingQuality(text: string, filename: string): {
  parsingQuality: 'Excellent' | 'Good' | 'Poor' | 'Failed';
  parsingScore: number;
  parsingWarning?: string;
  isTextSearchable: boolean;
  detectedSections: string[];
  detectedLinks: string[];
} {
  const cleanText = text.trim();
  if (!cleanText || cleanText.length < 20) {
    return {
      parsingQuality: 'Failed',
      parsingScore: 0,
      parsingWarning: 'Resume text could not be extracted. The document appears empty, scanned, or unreadable.',
      isTextSearchable: false,
      detectedSections: [],
      detectedLinks: [],
    };
  }

  const charCount = cleanText.length;
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Alphanumeric ratio check
  const alphanumericChars = (cleanText.match(/[a-zA-Z0-9]/g) || []).length;
  const alphanumericRatio = charCount > 0 ? alphanumericChars / charCount : 0;

  // 2. Control/Garbage character check
  const garbageChars = (cleanText.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\uFFFD]/g) || []).length;
  const garbageRatio = charCount > 0 ? garbageChars / charCount : 0;

  // 3. Unspaced text detection (font encoding failure produces words like 'RawPDFencodingblockstextparsing')
  const totalWordChars = words.reduce((sum, w) => sum + w.length, 0);
  const avgWordLength = wordCount > 0 ? totalWordChars / wordCount : 0;
  const longWordsCount = words.filter((w) => w.length > 25).length;

  // 4. Detailed Section Headings check
  const sectionKeywords = [
    'experience', 'work', 'employment', 'education', 'skills', 'technical',
    'projects', 'summary', 'profile', 'certifications', 'contact', 'achievements',
    'languages', 'problem solving', 'interests', 'coursework'
  ];
  const lowerText = cleanText.toLowerCase();
  const detectedSections = sectionKeywords.filter((sec) => lowerText.includes(sec));

  // 5. Contact information check (Email, Phone, Links)
  const emailMatch = cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi);
  const phoneMatch = cleanText.match(/\+?\d[\d\s-]{8,}/gi);
  const linkRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|linkedin\.com\/in\/[^\s]+|leetcode\.com\/[^\s]+|hackerrank\.com\/[^\s]+)/gi;
  const detectedLinks = Array.from(new Set(cleanText.match(linkRegex) || []));

  // 6. Skills & Tech keywords check
  const techKeywords = [
    'java', 'python', 'c++', 'sql', 'javascript', 'typescript', 'react', 'node',
    'express', 'flask', 'mysql', 'mongodb', 'dsa', 'data structures', 'algorithms',
    'git', 'github', 'rest', 'api', 'html', 'css', 'aws', 'docker', 'postman'
  ];
  const detectedTech = techKeywords.filter((tech) => lowerText.includes(tech));

  // 7. Education & Experience keywords check
  const eduExpKeywords = ['b.tech', 'degree', 'bachelor', 'master', 'university', 'college', 'intern', 'developer', 'engineer', 'system'];
  const detectedEduExp = eduExpKeywords.filter((k) => lowerText.includes(k));

  // 8. Dynamic Quality Score Calculation
  let score = 50; // base score for readable text

  // Word count quality (+20 max)
  if (wordCount >= 150) score += 20;
  else if (wordCount >= 80) score += 12;
  else if (wordCount >= 40) score += 5;
  else score -= 25;

  // Alphanumeric ratio (+10 max)
  if (alphanumericRatio >= 0.70) score += 10;
  else if (alphanumericRatio < 0.50) score -= 25;

  // Garbage ratio penalties
  if (garbageRatio > 0.05) score -= 30;

  // Unspaced words penalties
  if (avgWordLength > 18 || longWordsCount > 5) score -= 35;

  // Section headings (+10 max)
  if (detectedSections.length >= 4) score += 10;
  else if (detectedSections.length >= 2) score += 6;
  else if (detectedSections.length === 0) score -= 15;

  // Technical skills detected (+10 max)
  if (detectedTech.length >= 4) score += 10;
  else if (detectedTech.length >= 2) score += 5;

  // Contact / Education / Links detected (+10 max)
  if (emailMatch || phoneMatch || detectedLinks.length > 0) score += 5;
  if (detectedEduExp.length > 0) score += 5;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let parsingQuality: 'Excellent' | 'Good' | 'Poor' | 'Failed';
  let isTextSearchable = true;
  let parsingWarning: string | undefined = undefined;

  if (score >= 80) {
    parsingQuality = 'Excellent';
  } else if (score >= 60) {
    parsingQuality = 'Good';
  } else if (score >= 35) {
    parsingQuality = 'Poor';
    isTextSearchable = false;
    parsingWarning = 'Resume text could not be reliably extracted. Headline, bullet point, or PDF font encoding issues were detected. Please upload a text-searchable PDF or DOCX file to get an accurate ATS score and skill gap analysis.';
  } else {
    parsingQuality = 'Failed';
    isTextSearchable = false;
    parsingWarning = 'Resume text could not be extracted. The file may be a scanned image or corrupted PDF. Please upload a text-searchable PDF or DOCX document.';
  }

  return {
    parsingQuality,
    parsingScore: score,
    parsingWarning,
    isTextSearchable,
    detectedSections,
    detectedLinks,
  };
}

export async function extractTextFromBuffer(
  buffer: Buffer,
  mimeType: string,
  filename: string
): Promise<ExtractionResult> {
  const lowerName = filename.toLowerCase();
  let rawText = '';

  try {
    // PDF processing
    if (mimeType.includes('pdf') || lowerName.endsWith('.pdf')) {
      rawText = await parsePdf(buffer);
    } else if (
      mimeType.includes('officedocument.wordprocessingml') ||
      mimeType.includes('msword') ||
      lowerName.endsWith('.docx') ||
      lowerName.endsWith('.doc')
    ) {
      // DOCX processing
      const extractFn = mammothModule?.extractRawText || mammoth?.extractRawText || mammoth;
      if (typeof extractFn === 'function') {
        const result = await extractFn({ buffer });
        rawText = result?.value || '';
      } else {
        rawText = buffer.toString('utf-8');
      }
    } else {
      // TXT / Plain Text processing
      rawText = buffer.toString('utf-8');
    }

    const cleanText = rawText.trim();

    // REQUIREMENT 4: Log the first ~1000 characters of extracted resume text on the server for debugging
    console.log(`\n==================================================`);
    console.log(`[SERVER EXTRACTION DEBUG] File: ${filename} | Size: ${buffer.length} bytes`);
    console.log(`[EXTRACTED TEXT PREVIEW (~1000 chars)]:\n${cleanText.slice(0, 1000)}`);
    console.log(`==================================================\n`);

    const quality = analyzeParsingQuality(cleanText, filename);

    return {
      text: cleanText,
      meta: {
        filename,
        size: buffer.length,
        mimeType,
        charCount: cleanText.length,
        wordCount: cleanText.split(/\s+/).filter(Boolean).length,
        ...quality,
      },
    };
  } catch (err: any) {
    console.error(`Error extracting text from file ${filename}:`, err);
    
    // Fallback plain text read attempt
    const fallbackText = buffer.toString('utf-8').trim();
    if (fallbackText.length > 50 && !fallbackText.startsWith('%PDF')) {
      const quality = analyzeParsingQuality(fallbackText, filename);
      return {
        text: fallbackText,
        meta: {
          filename,
          size: buffer.length,
          mimeType,
          charCount: fallbackText.length,
          wordCount: fallbackText.split(/\s+/).filter(Boolean).length,
          ...quality,
        },
      };
    }

    return {
      text: '',
      meta: {
        filename,
        size: buffer.length,
        mimeType,
        charCount: 0,
        wordCount: 0,
        parsingQuality: 'Failed',
        parsingScore: 0,
        parsingWarning: 'Resume text could not be extracted. Please upload a text-searchable PDF or DOCX file.',
        isTextSearchable: false,
        detectedSections: [],
        detectedLinks: [],
      },
    };
  }
}
