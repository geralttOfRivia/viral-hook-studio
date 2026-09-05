'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

interface OnboardingBarProps {
  onOpenGuide: () => void;
}

export const OnboardingBar: React.FC<OnboardingBarProps> = ({ onOpenGuide }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('viral_hook_onboarding_dismissed');
      if (dismissed === 'true') {
        setIsVisible(false);
      }
    } catch (_) {}
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('viral_hook_onboarding_dismissed', 'true');
    } catch (_) {}
  };

  if (!isVisible) {
    return (
      <div className="flex justify-end">
        <button
          onClick={() => setIsVisible(true)}
          type="button"
          className="text-xs text-slate-500 hover:text-pink-600 font-semibold flex items-center gap-1 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Show 3-Step Quick Guide</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-pink-50/90 via-purple-50/70 to-amber-50/80 border border-[#F0E4D8] p-4 sm:p-5 shadow-sm animate-fade-in">
      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        type="button"
        title="Dismiss guide"
        className="absolute top-3.5 right-3.5 p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white/60 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex flex-col gap-3 pr-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-pink-100 text-pink-700">
            ⚡ Quick Start
          </span>
          <span className="text-xs font-bold text-slate-700">
            How to craft an 85+ retention hook in 3 steps:
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Step 1 */}
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-xl bg-pink-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <span className="block font-black text-xs text-slate-800">
                Draft 15-Sec Script
              </span>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Aim for <strong>30–45 words</strong>. Delete greetings like <em>"Hey guys"</em>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <span className="block font-black text-xs text-slate-800">
                Click "Test Hook"
              </span>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Instantly scores your <strong>Promise, Validation, Structure & Stakes</strong>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-white/80 shadow-xs flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <span className="block font-black text-xs text-slate-800">
                Aim for 85+ & Film!
              </span>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Fix Director's Notes, trigger pink confetti, then record with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onOpenGuide}
            type="button"
            className="text-xs font-bold text-pink-600 hover:text-pink-700 hover:underline flex items-center gap-1"
          >
            <span>Learn the complete PVSS Framework with before/after examples &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
