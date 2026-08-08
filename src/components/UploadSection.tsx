import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  FileCode,
  ArrowRight,
  AlignLeft,
} from 'lucide-react';
import { SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION } from '../data/sampleData';
import { extractTextFromPdfFile } from '../utils/pdfExtractor';

interface UploadSectionProps {
  onAnalyze: (resumeText: string, jobDescription: string, filename?: string) => Promise<void>;
  isLoading: boolean;
  loadingStep: string;
}

export const UploadSection: React.FC<UploadSectionProps> = ({
  onAnalyze,
  isLoading,
  loadingStep,
}) => {
  const [activeTab, setActiveTab] = useState<'file' | 'text'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate and handle file
  const handleFileChange = async (file: File) => {
    setErrorMessage(null);

    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const filename = file.name.toLowerCase();
    const isValidExt = validExtensions.some((ext) => filename.endsWith(ext));

    if (!isValidExt) {
      setErrorMessage('Unsupported file format. Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 10MB limit. Please upload a smaller file.');
      return;
    }

    setSelectedFile(file);
    setIsExtracting(true);

    try {
      let extractedText = '';

      // Client-side extraction for PDF files using pdfjs-dist
      if (filename.endsWith('.pdf')) {
        try {
          extractedText = await extractTextFromPdfFile(file);
        } catch (pdfErr) {
          console.warn('Client-side PDF extraction failed, falling back to server endpoint:', pdfErr);
        }
      }

      // If client extraction wasn't used or produced empty text, request server extraction
      if (!extractedText || extractedText.trim().length === 0) {
        const formData = new FormData();
        formData.append('resume', file);

        const response = await fetch('/api/extract-resume', {
          method: 'POST',
          body: formData,
        });

        const responseText = await response.text();
        let data: any;

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          try {
            data = JSON.parse(responseText);
          } catch (parseErr) {
            console.error('[UploadSection] Failed to parse JSON response:', parseErr);
          }
        }

        if (!data) {
          console.error('[UploadSection] Server returned non-JSON response:', responseText.slice(0, 300));
          throw new Error(`Server returned HTTP ${response.status} (${response.statusText || 'Error'}). Please check backend connection or paste text directly.`);
        }

        if (!response.ok || !data.success) {
          throw new Error(data.error || 'Failed to extract text from file.');
        }

        extractedText = data.text || '';
      }

      const cleanText = extractedText.trim();

      if (!cleanText || cleanText.length === 0) {
        setResumeText('');
        throw new Error('Could not extract readable text from this PDF. Please upload a text-searchable PDF or DOCX.');
      }

      setResumeText(cleanText);
    } catch (err: any) {
      console.error('File extraction error:', err);
      setErrorMessage(err.message || 'Error parsing file content. Try pasting text directly.');
    } finally {
      setIsExtracting(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setResumeText('');
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadSample = () => {
    setActiveTab('text');
    setSelectedFile(null);
    setResumeText(SAMPLE_RESUME_TEXT.trim());
    setJobDescription(SAMPLE_JOB_DESCRIPTION.trim());
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) {
      setErrorMessage('Please upload or paste a valid resume first.');
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMessage('Please enter or paste the target job description.');
      return;
    }

    setErrorMessage(null);
    await onAnalyze(
      resumeText,
      jobDescription,
      selectedFile ? selectedFile.name : 'Pasted_Resume.txt'
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isFormValid =
    (Boolean(resumeText.trim()) || Boolean(selectedFile)) &&
    !isExtracting &&
    !isLoading;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Title & Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Analyze Resume & Job Description
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Upload your resume and paste the target job description to generate your ATS score and skill gap analysis.
        </p>

        <div className="mt-4 inline-flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="px-3.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg border border-indigo-500/20 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Load Sample Software Engineer Resume & Job Description</span>
          </button>
        </div>
      </div>

      {/* Main Upload Form */}
      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Upload Notice</p>
              <p className="text-rose-300/80 text-xs mt-0.5">{errorMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Resume Input Header Tabs */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>1. Resume Input</span>
            </label>

            <div className="flex bg-black/30 p-1 rounded-lg text-xs font-medium text-slate-400 border border-white/5">
              <button
                type="button"
                onClick={() => setActiveTab('file')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'file' ? 'bg-white/10 text-white font-semibold' : 'hover:text-white'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'text' ? 'bg-white/10 text-white font-semibold' : 'hover:text-white'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {activeTab === 'file' ? (
            <div>
              {!selectedFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragOver
                      ? 'border-indigo-400 bg-indigo-500/10'
                      : 'border-white/15 hover:border-indigo-400/80 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                  />

                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Click to browse or drag & drop resume file
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports PDF, DOCX, or TXT (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatFileSize(selectedFile.size)}{' '}
                        {isExtracting ? (
                          <span className="text-indigo-400 font-medium ml-1 animate-pulse">
                            • Parsing text...
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-medium ml-1">
                            • Text extracted ({resumeText.length} chars)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    title="Remove file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste plain resume text here..."
                rows={8}
                className="w-full rounded-xl border border-white/10 bg-black/30 p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 font-mono text-xs leading-relaxed"
              />
              <p className="text-xs text-slate-400 mt-1 flex justify-between">
                <span>Direct text input active</span>
                <span>{resumeText.length} characters</span>
              </p>
            </div>
          )}
        </div>

        {/* Job Description TextArea */}
        <div>
          <label className="text-sm font-bold text-white mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-indigo-400" />
              <span>2. Target Job Description</span>
            </span>
            <span className="text-xs text-indigo-400 font-medium">Optional — Discover top roles without JD</span>
          </label>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={7}
            className="w-full rounded-xl border border-white/10 bg-black/30 p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 leading-relaxed"
          />
          <p className="text-xs text-slate-400 mt-1 flex justify-between">
            <span>Copy job duties, required skills, and qualifications from the posting</span>
            <span>{jobDescription.length} characters</span>
          </p>
        </div>

        {/* Action Button & Loading Progress */}
        <div className="pt-2">
          {isLoading ? (
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-3 border-indigo-400 border-t-transparent animate-spin mx-auto" />
              <div>
                <p className="font-semibold text-sm text-white">{loadingStep}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Parsing keywords, calculating estimated ATS score, and structuring skill gap metrics...
                </p>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
                isFormValid
                  ? 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/25 cursor-pointer'
                  : 'bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed shadow-none'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Analyze Resume</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
