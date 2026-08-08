import express from 'express';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { extractTextFromBuffer } from './server/extractors.js';
import { analyzeResumeWithGemini, isGeminiConfigured } from './server/geminiService.js';

dotenv.config();

const app = express();
const PORT = 3000;

// Configure body parser and multer file upload in memory
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMime = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
    ];
    const lowerName = file.originalname.toLowerCase();
    if (
      allowedMime.includes(file.mimetype) ||
      lowerName.endsWith('.pdf') ||
      lowerName.endsWith('.docx') ||
      lowerName.endsWith('.doc') ||
      lowerName.endsWith('.txt')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file format. Please upload a PDF, DOCX, or TXT file.'));
    }
  },
});

// API Routes FIRST

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'ResumeAI — AI Resume Analyzer & Job Matcher',
    geminiConfigured: isGeminiConfigured(),
    timestamp: new Date().toISOString(),
  });
});

// Catch invalid methods on /api/extract-resume and /api/analyze to avoid falling through to Vite SPA html
const handleUnsupportedMethod = (req: express.Request, res: express.Response) => {
  res.status(405).json({
    success: false,
    error: `Method ${req.method} not allowed on ${req.path}. Use POST instead.`,
  });
};

// 2. Extract text from uploaded resume document (PDF, DOCX, TXT)
app.post('/api/extract-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No resume file uploaded.' });
      return;
    }

    const { buffer, mimetype, originalname, size } = req.file;

    const extractionResult = await extractTextFromBuffer(buffer, mimetype, originalname);

    if (!extractionResult.text || extractionResult.text.trim().length === 0) {
      res.status(422).json({
        success: false,
        error: 'Could not extract readable text from the uploaded document. Please check the file content or try uploading a text-searchable PDF or DOCX file.',
        meta: extractionResult.meta,
      });
      return;
    }

    res.json({
      success: true,
      text: extractionResult.text,
      meta: extractionResult.meta,
    });
  } catch (error: any) {
    console.error('Error during file extraction:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Failed to extract text from the document.',
    });
  }
});
app.all('/api/extract-resume', handleUnsupportedMethod);

// 3. Analyze resume text against job description
app.post('/api/analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription, filename } = req.body;

    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Resume text is required for analysis.' });
      return;
    }

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Job description is required for analysis.' });
      return;
    }

    const analysis = await analyzeResumeWithGemini(
      resumeText.trim(),
      jobDescription.trim(),
      filename
    );

    res.json({
      success: true,
      data: analysis,
      isGeminiActive: isGeminiConfigured(),
    });
  } catch (error: any) {
    console.error('Error during resume analysis:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'An error occurred while analyzing the resume.',
    });
  }
});
app.all('/api/analyze', handleUnsupportedMethod);

// Any unhandled /api/* route returning 404 JSON instead of HTML SPA
app.all('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint ${req.path} not found.`,
  });
});

// Express error handler for Multer file size / format errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({
        success: false,
        error: 'File size exceeds maximum allowed limit of 10MB.',
      });
      return;
    }
    res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
    return;
  }
  if (err) {
    res.status(400).json({ success: false, error: err.message || 'Server error' });
    return;
  }
  next();
});

// Vite middleware for development / Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ResumeAI] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
