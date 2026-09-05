'use client';

import React, { useState, useCallback } from 'react';
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
import { PRESET_HOOKS } from '@/lib/presets';
import { PvssEvaluationResult, PacingMetrics } from '@/lib/types';
import { calculatePacing } from '@/lib/evaluator';
import { getDailyUsage, incrementDailyUsage, DailyUsageState } from '@/lib/usageLimit';
import { AlertCircle, Coffee, BookOpen } from 'lucide-react';

export default function HomePage() {
  const [script, setScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<PvssEvaluationResult | null>(null);
  const [usage, setUsage] = useState<DailyUsageState>(() => getDailyUsage());

  React.useEffect(() => {
    setUsage(getDailyUsage());
  }, []);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);

  // Live client-side pacing metrics calculated on keystroke
  const [pacing, setPacing] = useState<PacingMetrics>(() => calculatePacing(''));

  const handleScriptChange = (newScript: string) => {
    setScript(newScript);
    setPacing(calculatePacing(newScript));
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
      // Decrement daily free quota on success
      setUsage(incrementDailyUsage());
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
      />

      {/* Main Studio Body */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5 flex-1">
        {/* Clean 3-Step Quick Onboarding Bar */}
        <OnboardingBar onOpenGuide={() => setIsGuideOpen(true)} />

        {/* Error Alert if any */}
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

        {/* Notion-Style Split Layout: Editor on Left, Smart Sidebar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT AREA: Clean Distraction-free Script Editor (7 cols) */}
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

          {/* RIGHT AREA: Dynamic Candy Pop Smart Sidebar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 3D Hype Meter Card */}
            <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm overflow-hidden">
              <div className="border-b border-[#F4ECE4] px-6 py-4 flex items-center justify-between bg-gradient-to-r from-white via-white to-pink-50/30">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍭</span>
                  <span className="font-black text-sm text-slate-800 tracking-tight">
                    The Hype Meter
                  </span>
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
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

            {/* PVSS Pillar Breakdown Cards (only when evaluation exists) */}
            {evaluation && (
              <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm p-6 flex flex-col gap-4">
                <PvssBreakdown pillars={evaluation.pillars} />
              </div>
            )}

            {/* Bulleted Critique (only when evaluation exists) */}
            {evaluation && (
              <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-1.5">
                    <span>💡 Director's Notes</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Retention Diagnostics
                  </span>
                </div>
                <CritiqueList
                  strengths={evaluation.critique.strengths}
                  improvements={evaluation.critique.improvements}
                />
              </div>
            )}

            {/* When no evaluation yet, show clean welcoming guidance */}
            {!evaluation && !isLoading && (
              <div className="bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm p-6 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center text-lg">
                  ✨
                </div>
                <h3 className="font-black text-sm text-slate-800">
                  Ready to Test Retention
                </h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                  Choose an intro preset on the left or write your own, then click{' '}
                  <strong>"Test Hook"</strong> to evaluate against the PVSS framework.
                </p>
                <button
                  onClick={() => setIsGuideOpen(true)}
                  type="button"
                  className="text-xs font-bold text-pink-600 hover:underline"
                >
                  Read the 15-second PVSS guide &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

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
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Viral Hook Studio</span>
            <span>&bull;</span>
            <span>15-second intro & retention diagnostics for YouTube creators</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              type="button"
              className="hover:text-pink-600 transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>PVSS Guide</span>
            </button>
            <a
              href="https://buymeacoffee.com/geraltofrivia"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-700 font-bold text-amber-800 transition-colors flex items-center gap-1"
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Buy Me a Coffee</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HowToUseModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
