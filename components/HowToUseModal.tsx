'use client';

import React from 'react';
import { X, Target, ShieldCheck, Zap, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pvss-guide-title"
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-[#EFE5DB] shadow-2xl p-6 sm:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F4ECE4] pb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 text-white flex items-center justify-center text-xl shadow-sm"
              aria-hidden="true"
            >
              📖
            </div>
            <div>
              <h2 id="pvss-guide-title" className="text-lg font-black text-slate-800 tracking-tight">
                How It Works & The PVSS Guide
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                The science of winning YouTube retention in the first 15 seconds.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close PVSS guide"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Section 1: The 15-Second Retention Cliff */}
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-4 flex flex-col gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <span>📉 The YouTube Retention Reality</span>
          </span>
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            YouTube data shows that <strong>up to 70% of viewers abandon videos within the first 10 to 15 seconds</strong>.
            If your opening is sluggish, generic, or begs for subscriptions early, viewers swipe away.
            Viral Hook Studio evaluates your opening lines against proven viewer psychology before you pick up the camera.
          </p>
        </div>

        {/* Section 2: The 4 PVSS Pillars */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            The PVSS Framework (0–100 Score)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Promise */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE5DB] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-500 text-white text-xs font-black flex items-center justify-center">
                  P
                </span>
                <span className="font-bold text-xs text-slate-800">Promise</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                What transformation, revelation, or curiosity gap are you pledging? Give the viewer an undeniable reason to watch the next 60 seconds.
              </p>
            </div>

            {/* Validation */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE5DB] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white text-xs font-black flex items-center justify-center">
                  V
                </span>
                <span className="font-bold text-xs text-slate-800">Validation</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Why believe you? Use empirical numbers, time spent, research, or credentials (e.g., <em>"I analyzed 4,000 channels over 6 months..."</em>).
              </p>
            </div>

            {/* Structure */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE5DB] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white text-xs font-black flex items-center justify-center">
                  S
                </span>
                <span className="font-bold text-xs text-slate-800">Structure</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Zero throat-clearing velocity. Delete all opening greetings (<em>"Hey guys, welcome back"</em>) and channel plugs. Start mid-action on word one.
              </p>
            </div>

            {/* Stakes */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#EFE5DB] flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-500 text-white text-xs font-black flex items-center justify-center">
                  S
                </span>
                <span className="font-bold text-xs text-slate-800">Stakes</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                What does the viewer lose by clicking away? Introduce tension, cost, or urgency so leaving feels costly.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Before & After Example */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Real Before & After Transformation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Weak Example */}
            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-rose-700 font-bold">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>Weak Hook (Score: 20/100)</span>
              </div>
              <p className="text-slate-700 italic text-[11px] leading-relaxed">
                "Hey guys, welcome back to my channel! Today we're going to talk about study tips that help you focus. Make sure to hit subscribe before we start..."
              </p>
              <span className="text-[10px] text-rose-600 font-medium">
                ❌ Throat-clearing, 0 proof tokens, 0 stakes, viewer clicks away.
              </span>
            </div>

            {/* Viral Example */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col gap-2">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Viral Hook (Score: 92/100)</span>
              </div>
              <p className="text-slate-700 italic text-[11px] leading-relaxed">
                "Most people study for 5 hours and forget 80% by morning. I spent 90 days testing the Feynman loop with medical students, and today I'll show you the 3-step fix that doubled their recall."
              </p>
              <span className="text-[10px] text-emerald-600 font-medium">
                ✅ Instant action, empirical numbers, high tension, clear payoff.
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Optimal Pacing Guide */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE5DB] flex flex-col gap-1.5">
          <h4 className="text-xs font-black text-slate-800">
            ⏱️ The 15-Second Sweet Spot: 30 to 45 Words
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Natural conversational speaking speed on YouTube is approximately <strong>150 words per minute (2.5 words per second)</strong>.
            To deliver your hook within 15 seconds, aim for <strong>30 to 45 words</strong>. The built-in pacing bar tracks this in real time as you type.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-2 border-t border-[#F4ECE4]">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-2.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Got it, Let's Write!</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
