import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { UploadSection } from './components/UploadSection';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { AnalysisResult } from './types/resume';
import { SAMPLE_ANALYSIS_RESULT, SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION } from './data/sampleData';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'upload' | 'dashboard'>('landing');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('Preparing document parser...');
  const [isGeminiActive, setIsGeminiActive] = useState<boolean>(false);

  // Check backend health on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.geminiConfigured === 'boolean') {
          setIsGeminiActive(data.geminiConfigured);
        }
      })
      .catch((err) => {
        console.warn('Backend health check warning:', err);
      });
  }, []);

  // Handle Analysis submit
  const handleAnalyze = async (
    resumeText: string,
    jobDescription: string,
    filename?: string
  ): Promise<void> => {
    setIsLoading(true);
    setLoadingStep('1/3: Extracting document text and keywords...');

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setLoadingStep('2/3: Running Gemini AI ATS compatibility engine...');

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription, filename }),
      });

      setLoadingStep('3/3: Formatting skill gap report & recommendations...');
      const responseText = await response.text();
      let data: any;

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          data = JSON.parse(responseText);
        } catch (parseErr) {
          console.error('[App] Failed to parse JSON response from /api/analyze:', parseErr);
        }
      }

      if (!data) {
        console.error('[App] Server returned non-JSON response from /api/analyze:', responseText.slice(0, 300));
        throw new Error(`Server returned HTTP ${response.status} (${response.statusText || 'Error'}). Please verify server configuration and try again.`);
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete resume analysis.');
      }

      setAnalysis(data.data);
      if (typeof data.isGeminiActive === 'boolean') {
        setIsGeminiActive(data.isGeminiActive);
      }
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis error:', err);
      alert(err.message || 'Analysis failed. Please check network connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Try Sample Resume
  const handleTrySample = () => {
    setIsLoading(true);
    setLoadingStep('Loading precalculated sample analysis...');

    setTimeout(() => {
      setAnalysis(SAMPLE_ANALYSIS_RESULT);
      setCurrentView('dashboard');
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0c10] text-slate-200 font-sans antialiased selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Background ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-indigo-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[15%] w-[25%] h-[25%] bg-emerald-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isGeminiActive={isGeminiActive}
          onTrySample={handleTrySample}
          hasAnalysis={Boolean(analysis)}
        />

        <main className="flex-1">
          {currentView === 'landing' && (
            <LandingPage
              onStartAnalyze={() => {
                setCurrentView('upload');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTrySample={handleTrySample}
            />
          )}

          {currentView === 'upload' && (
            <UploadSection
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              loadingStep={loadingStep}
            />
          )}

          {currentView === 'dashboard' && analysis && (
            <Dashboard
              analysis={analysis}
              onNewAnalysis={() => {
                setCurrentView('upload');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isGeminiActive={isGeminiActive}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
