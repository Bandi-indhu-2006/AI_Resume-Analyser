# ResumeAI — AI Resume Analyzer & Job Matcher

A production-ready, full-stack AI web application that analyzes candidate resumes against job descriptions to provide actionable, recruiter-grade ATS diagnostics, skill gap analysis, and bullet point rewrites.

![ResumeAI Overview](https://ai-resume-analyser-nu-woad.vercel.app/)

---

## 🚀 Key Features

- **Multi-Format Resume Text Extraction**: Supports **PDF**, **DOCX**, and **TXT** files, as well as direct text input.
- **Estimated ATS Compatibility Score**: 0-100 score broken down by:
  - Keyword Match (25%)
  - Skills Match (25%)
  - Experience Relevance (20%)
  - Project Relevance (15%)
  - Resume Structure (10%)
  - Formatting & Readability (5%)
- **Job & Skill Matcher**:
  - Matched (✓), Missing (✗), and Partial (◐) skills categorized into Programming Languages, Frontend, Backend, Databases, Cloud, DevOps, Tools, and Soft Skills.
- **Resume Bullet Point Upgrade Engine**:
  - Analyzes weak bullets and provides BEFORE vs. PROBLEM vs. AFTER improvements using strong action verbs without fabricating metrics.
- **Keyword & Term Frequency Analysis**:
  - Highlights top job description keywords, count frequency in resume, and lists critical missing keywords.
- **Structure & Formatting Audit**:
  - Audits standard section headers (Contact, Summary, Experience, Education, Projects, Skills) and checks for PDF/DOCX mechanical parsing hazards.
- **Prioritized Action Plan**:
  - Categorizes suggestions by HIGH, MEDIUM, and LOW priority with actionable advice.
- **Instant Sample Resume Testing**:
  - Preloaded software engineer sample resume and job description to test the application instantly without uploading personal files.
- **Graceful Fallback Engine**:
  - If `GEMINI_API_KEY` is not present, the server automatically uses an intelligent local heuristic analysis engine so the app remains 100% functional without downtime.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion

### Backend
- **Server**: Node.js + Express
- **AI SDK**: `@google/genai` (Model: `gemini-3.6-flash`)
- **Document Extractors**: `pdf-parse`, `mammoth` (DOCX), `multer` (in-memory file upload)
- **Environment**: Dotenv

---

## 🏛️ Application Architecture

```
resume-ai/
├── server.ts                 # Main Express server & Vite integration
├── server/
│   ├── extractors.ts         # PDF, DOCX, and TXT document text extractors
│   └── geminiService.ts      # Gemini AI client & local fallback engine
├── src/
│   ├── components/           # UI components
│   │   ├── Navbar.tsx
│   │   ├── LandingPage.tsx
│   │   ├── UploadSection.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AtsScoreCard.tsx
│   │   ├── SkillsMatchCard.tsx
│   │   ├── KeywordsCard.tsx
│   │   ├── BulletImprovementCard.tsx
│   │   ├── SectionFormattingCard.tsx
│   │   ├── RecommendationsCard.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── sampleData.ts     # Sample resume and precomputed analysis
│   ├── types/
│   │   └── resume.ts         # TypeScript interfaces & API models
│   ├── App.tsx
│   └── main.tsx
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Installation & Setup

1. **Clone the repository and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env` (or configure secrets in AI Studio):
   ```env
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint and Gemini configuration status |
| `POST` | `/api/extract-resume` | Uploads PDF/DOCX/TXT file and returns extracted text |
| `POST` | `/api/analyze` | Accepts `{ resumeText, jobDescription, filename }` and returns structured JSON analysis |

---

## 🔒 Security & Best Practices

- **Zero Client Key Exposure**: Gemini API calls are strictly handled on the Node.js server.
- **In-Memory Storage**: Uploaded resume files are processed in memory and never persisted to disk.
- **Input Sanitization**: File formats and sizes (max 10MB) are strictly validated before extraction.

---

## 🔮 Future Improvements

- [ ] Export analysis report to downloadable PDF.
- [ ] Cover letter generator based on job description gap analysis.
- [ ] Multi-resume comparison side-by-side.
- [ ] Direct export to LinkedIn or JSON Resume format.

---

## 📄 License

Apache-2.0 License. Built for portfolio and educational use.
