'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { OnboardingBar } from '@/components/OnboardingBar';
import { Editor } from '@/components/Editor';
import { HypeMeterRing } from '@/components/HypeMeterRing';
import { PvssBreakdown } from '@/components/PvssBreakdown';
import { CritiqueList } from '@/components/CritiqueList';
import { TokenUsageBadge } from '@/components/TokenUsageBadge';
import { AdBanner } from '@/components/AdBanner';
import { SeoFaqSection } from '@/components/SeoFaqSection';
import { HowToUseModal } from '@/components/HowToUseModal';
import { SupportModal } from '@/components/SupportModal';
import { FeedbackModal } from '@/components/FeedbackModal';
import { PRESET_HOOKS } from '@/lib/presets';
import { PvssEvaluationResult, PacingMetrics } from '@/lib/types';
import { calculatePacing } from '@/lib/evaluator';
import { getDailyUsage, incrementDailyUsage, DailyUsageState } from '@/lib/usageLimit';
import { AlertCircle, Coffee, BookOpen, MessageSquarePlus } from 'lucide-react';

export default function HomePage() {
  const [script, setScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<PvssEvaluationResult | null>(null);
  const [usage, setUsage] = useState<DailyUsageState>(() => getDailyUsage());
  const [isEditorCollapsed, setIsEditorCollapsed] = useState<boolean>(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Refresh client usage on mount to ensure accurate hydration
  React.useEffect(() => {
    setUsage(getDailyUsage());
  }, []);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  // Live client-side pacing metrics calculated on keystroke
  const [pacing, setPacing] = useState<PacingMetrics>(() => calculatePacing(''));

  const handleScriptChange = (newScript: string) => {
    setScript(newScript);
    setPacing(calculatePacing(newScript));
    if (newScript.trim() === '') {
      setIsEditorCollapsed(false);
    }
    if (error) setError(null);
  };

  const runEvaluation = useCallback(async () => {
    if (!script.trim()) {
      setError('Please enter a script or select a preset to evaluate.');
      return;
    }

    if (usage.isLimitReached) {
      setError("You have reached today's 5 free evaluations. Your quota resets at midnight!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/evaluate-hook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setUsage(getDailyUsage());
        }
        throw new Error(data.error || `Server error (${res.status})`);
      }

      setEvaluation(data as PvssEvaluationResult);
      // Auto-collapse script editor so results & director notes are instantly in view
      setIsEditorCollapsed(true);
      // Decrement daily free quota on success
      setUsage(incrementDailyUsage());

      // Smoothly scroll to results dashboard
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Evaluation failed:', err);
      setError(err?.message || 'Failed to evaluate hook. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [script, usage.isLimitReached]);

  const currentScore = evaluation?.overallScore ?? 0;
  const currentGrade = evaluation?.grade ?? (isLoading ? 'Evaluating...' : 'Ready to Test 🎯');
  const currentVerdict =
    evaluation?.verdict ??
    (isLoading
      ? 'Analyzing hook retention velocity and PVSS structure...'
      : 'Click "Test Hook" to diagnose your 15-second intro.');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <Header
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      {/* Main Studio Body */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5 flex-1">
        {/* Clean 3-Step Quick Onboarding Bar */}
        <OnboardingBar onOpenGuide={() => setIsGuideOpen(true)} />

        {/* Global Error Banner */}
        {error && (
          <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 flex items-center gap-3 text-rose-800 text-xs font-semibold">
            <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Gibberish Alert Banner */}
        {evaluation?.isGibberish && (
          <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex items-start gap-3 text-amber-900 text-xs font-medium">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-black text-sm text-amber-950">
                Incoherent Input Detected (Score: 0/100)
              </span>
              <p className="leading-relaxed">
                {evaluation.verdict}
              </p>
            </div>
          </div>
        )}

        {/* Script Editor Section (Full-width when collapsed, or 7-col when in initial state) */}
        {evaluation ? (
          /* POST-EVALUATION LAYOUT: Collapsible Editor Bar on Top */
          <div ref={resultsRef} className="flex flex-col gap-6">
            {/* 1. Compact Collapsible Script Bar */}
            <Editor
              script={script}
              onChange={handleScriptChange}
              onEvaluate={runEvaluation}
              isLoading={isLoading}
              pacing={pacing}
              usage={usage}
              isCollapsed={isEditorCollapsed}
              onToggleCollapse={() => setIsEditorCollapsed(!isEditorCollapsed)}
            />

            {/* 2. Hero Insights Row: Hype Meter on Left, Director's Notes on Right (Zero Scrolling Required!) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (5 cols): The Hype Meter Gauge */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm overflow-hidden">
                  <div className="border-b border-[#F4ECE4] px-6 py-4 flex items-center justify-between bg-gradient-to-r from-white via-white to-pink-50/30">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" aria-hidden="true">🍭</span>
                      <h2 className="font-black text-sm text-slate-800 tracking-tight">
                        The Hype Meter
                      </h2>
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      0–100 Scale
                    </span>
                  </div>

                  <HypeMeterRing
                    score={currentScore}
                    grade={currentGrade}
                    verdict={currentVerdict}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Right Column (7 cols): Director's Notes & Actionables Front-and-Center */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm p-5 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-[#F4ECE4] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg" aria-hidden="true">💡</span>
                      <div>
                        <h2 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                          Director's Actionable Notes
                        </h2>
                        <p className="text-[11px] text-slate-600 font-medium">
                          Click any point to view retention psychology & rewrite formula
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                      Interactive
                    </span>
                  </div>

                  <CritiqueList
                    strengths={evaluation.critique.strengths}
                    improvements={evaluation.critique.improvements}
                  />
                </div>
              </div>
            </div>

            {/* 3. PVSS Pillar Breakdown Cards with Interactive Drilldowns */}
            <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm p-6 flex flex-col gap-4">
              <PvssBreakdown pillars={evaluation.pillars} />
            </div>
          </div>
        ) : (
          /* INITIAL STATE LAYOUT (Editor on Left, Waiting Gauge on Right) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT AREA: Full Distraction-free Script Editor (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <Editor
                script={script}
                onChange={handleScriptChange}
                onEvaluate={runEvaluation}
                isLoading={isLoading}
                pacing={pacing}
                usage={usage}
              />
            </div>

            {/* RIGHT AREA: Welcoming Waiting Sidebar (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* 3D Hype Meter Card */}
              <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm overflow-hidden">
                <div className="border-b border-[#F4ECE4] px-6 py-4 flex items-center justify-between bg-gradient-to-r from-white via-white to-pink-50/30">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">🍭</span>
                    <h2 className="font-black text-sm text-slate-800 tracking-tight">
                      The Hype Meter
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    0–100 Scale
                  </span>
                </div>

                <HypeMeterRing
                  score={currentScore}
                  grade={currentGrade}
                  verdict={currentVerdict}
                  isLoading={isLoading}
                />
              </div>

              {/* Welcoming Guidance Card */}
              <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm p-6 flex flex-col items-center text-center gap-3">
                <div 
                  className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-700 flex items-center justify-center text-lg"
                  aria-hidden="true"
                >
                  ✨
                </div>
                <h2 className="font-black text-sm text-slate-800">
                  Ready to Test Retention
                </h2>
                <p className="text-xs text-slate-700 max-w-xs leading-relaxed">
                  Choose an intro preset on the left or write your own, then click{' '}
                  <strong>"Test Hook"</strong> to evaluate against the PVSS framework.
                </p>
                <button
                  onClick={() => setIsGuideOpen(true)}
                  type="button"
                  className="text-xs font-bold text-pink-700 hover:text-pink-800 hover:underline"
                >
                  Read the 15-second PVSS guide &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Minimal Bottom Telemetry (Only after test) */}
        {evaluation?.tokenUsage && (
          <div className="mt-2">
            <TokenUsageBadge
              tokenUsage={evaluation.tokenUsage}
              providerUsed={evaluation.providerUsed}
            />
          </div>
        )}

        {/* Non-Intrusive Creator Sponsor / Ad Banner */}
        <div className="mt-2">
          <AdBanner slot="bottom-banner" />
        </div>

        {/* Crawlable SEO FAQ Section */}
        <SeoFaqSection />
      </div>

      {/* Clean Creator Footer */}
      <footer className="w-full border-t border-[#F0E6DC] bg-white/70 py-6 px-4 sm:px-8 mt-auto">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Viral Hook Studio</span>
            <span aria-hidden="true">&bull;</span>
            <span>15-second intro & retention diagnostics for YouTube creators</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setIsGuideOpen(true)}
              type="button"
              className="hover:text-pink-700 transition-colors flex items-center gap-1 text-slate-600"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>PVSS Guide</span>
            </button>
            <button
              onClick={() => setIsFeedbackOpen(true)}
              type="button"
              className="hover:text-pink-700 transition-colors flex items-center gap-1 text-slate-600 font-semibold"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-pink-600" aria-hidden="true" />
              <span>Feedback & Ideas</span>
            </button>
            <a
              href={process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/GeraltRiviaCode"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black font-semibold text-slate-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Follow on 𝕏</span>
            </a>
            <a
              href="https://buymeacoffee.com/geraltofrivia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-900 font-bold text-amber-800 transition-colors flex items-center gap-1"
            >
              <Coffee className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Quick Feedback Pill (Bottom-Right) */}
      <button
        onClick={() => setIsFeedbackOpen(true)}
        type="button"
        aria-label="Suggest an improvement or share ideas"
        className="fixed bottom-5 right-5 z-40 px-3.5 py-2 rounded-full text-xs font-bold bg-white/95 hover:bg-pink-50 text-slate-800 hover:text-pink-700 border border-[#E8DDD0] hover:border-pink-300 shadow-md hover:shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 group"
      >
        <MessageSquarePlus className="w-3.5 h-3.5 text-pink-600 group-hover:scale-110 transition-transform" aria-hidden="true" />
        <span>Ideas & Feedback</span>
      </button>

      {/* Modals */}
      <HowToUseModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
}
