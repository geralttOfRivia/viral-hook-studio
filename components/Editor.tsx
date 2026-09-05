'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PRESET_HOOKS } from '@/lib/presets';
import { PresetHook, PacingMetrics } from '@/lib/types';
import { DailyUsageState } from '@/lib/usageLimit';
import { Sparkles, RotateCcw, Clock, Flame, Edit3, Lock, Coffee } from 'lucide-react';

interface EditorProps {
  script: string;
  onChange: (val: string) => void;
  onEvaluate: () => void;
  isLoading: boolean;
  pacing: PacingMetrics;
  usage?: DailyUsageState;
}

export const Editor: React.FC<EditorProps> = ({
  script,
  onChange,
  onEvaluate,
  isLoading,
  pacing,
  usage,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isLimitReached = !!usage?.isLimitReached;

  // Keyboard shortcut: Cmd/Ctrl + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (script.trim().length > 0 && !isLoading && !isLimitReached) {
          onEvaluate();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [script, isLoading, isLimitReached, onEvaluate]);

  const handleSelectPreset = (preset: PresetHook) => {
    onChange(preset.script);
  };

  const handleClear = () => {
    onChange('');
    textareaRef.current?.focus();
  };

  const isEmpty = script.trim().length === 0;

  // 15-second sweet spot range (30 to 45 words)
  const maxWordsForGauge = 65;
  const progressPercent = Math.min(
    100,
    Math.round((pacing.wordCount / maxWordsForGauge) * 100)
  );

  const sweetSpotStartPercent = Math.round((30 / maxWordsForGauge) * 100); // ~46%
  const sweetSpotEndPercent = Math.round((45 / maxWordsForGauge) * 100); // ~69%
  const sweetSpotWidthPercent = sweetSpotEndPercent - sweetSpotStartPercent; // ~23%

  const getPacingBadge = () => {
    if (isEmpty) {
      return {
        label: 'Awaiting Script (Target 30–45 words)',
        bg: 'bg-slate-100 text-slate-600 border-slate-200',
      };
    }
    if (pacing.status === 'sweet_spot') {
      return {
        label: '✨ Optimal 15s Sweet Spot',
        bg: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-black',
      };
    }
    if (pacing.wordCount < 30) {
      return {
        label: 'Too Brief for 15s',
        bg: 'bg-amber-100 text-amber-800 border-amber-300',
      };
    }
    return {
      label: 'Exceeds 15s Cliff',
      bg: 'bg-rose-100 text-rose-800 border-rose-300',
    };
  };

  const pacingBadge = getPacingBadge();

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-[#EFE5DB] shadow-candy-sm p-5 sm:p-7 gap-5">
      {/* 1. Editor Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-black shadow-2xs">
            ✍️
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
              15-Second Intro Script
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Enter the exact words you will speak in the first 15 seconds.
            </p>
          </div>
        </div>

        {!isEmpty && (
          <button
            onClick={handleClear}
            type="button"
            className="p-1.5 px-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1 transition-all"
            title="Clear text"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 2. Prominent High-Contrast Textarea Container */}
      <div
        onClick={() => textareaRef.current?.focus()}
        className={`relative rounded-2xl border-2 transition-all p-4 cursor-text flex flex-col min-h-[220px] sm:min-h-[240px] ${
          isFocused
            ? 'border-pink-500 bg-white ring-4 ring-pink-100/70 shadow-candy-sm'
            : 'border-[#E5D7C9] bg-[#FAF8F5] hover:border-[#D4C3B2]'
        }`}
      >
        {/* Animated Typing Beacon when Empty */}
        {isEmpty && !isFocused && (
          <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold text-pink-600 bg-pink-100/80 px-3 py-1 rounded-full w-fit animate-pulse">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Start typing your hook here...</span>
            <span className="w-1.5 h-3.5 bg-pink-500 rounded-xs animate-bounce" />
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={script}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type or paste your first 15 seconds here...

Example:
'Apple just quietly killed the iPhone charging port, but nobody noticed because they hid the announcement inside a 900-page patent filing. In the next 10 minutes, I will show you the exact prototype...'"
          className="w-full flex-1 resize-none bg-transparent text-slate-800 placeholder-slate-400 text-base leading-relaxed focus:outline-none font-normal"
          rows={7}
        />
      </div>

      {/* 3. 15-Second Pacing Visual Bar */}
      <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EFE5DB] flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>
              <strong>{pacing.wordCount}</strong> words &bull; ~
              <strong>{pacing.estimatedSeconds}s</strong> spoken (15s Target)
            </span>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${pacingBadge.bg}`}
          >
            {pacingBadge.label}
          </span>
        </div>

        {/* Progress bar container */}
        <div className="relative w-full h-3 bg-slate-200/80 rounded-full overflow-hidden shadow-inner">
          {/* Moving progress fill */}
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isEmpty
                ? 'bg-transparent'
                : pacing.status === 'sweet_spot'
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-sm'
                : pacing.wordCount < 30
                ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                : 'bg-gradient-to-r from-rose-400 to-pink-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />

          {/* 15s Sweet Spot Zone (30–45 words) with subtle 1px dashed markers */}
          <div
            className="absolute top-0 bottom-0 border-x border-dashed border-slate-300 bg-emerald-400/20 pointer-events-none z-10"
            style={{
              left: `${sweetSpotStartPercent}%`,
              width: `${sweetSpotWidthPercent}%`,
            }}
            title="15s Sweet Spot Zone (30 to 45 words)"
          />
        </div>

        {/* Pacing Guidance Labels */}
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-0.5 -mt-0.5">
          <span>0w (0s)</span>
          <span className="text-emerald-700 font-extrabold bg-emerald-50/90 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <span>🎯 15s Window (30–45 words)</span>
          </span>
          <span>65w+ (25s+)</span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium">
          {pacing.statusMessage}
        </p>
      </div>

      {/* 4. Primary Action Button with Daily Free Quota Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Left: Keyboard shortcut & Daily Counter Chip */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-600">
              Ctrl
            </kbd>
            <span>+</span>
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono text-slate-600">
              Enter
            </kbd>
            <span className="hidden sm:inline">to test</span>
          </div>

          {/* Daily Usage Counter Badge */}
          {usage && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                usage.remaining >= 3
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : usage.remaining > 0
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
              title={`${usage.used} of ${usage.max} free tests used today. Resets at midnight.`}
            >
              <span>{isLimitReached ? '🔒' : '🎯'}</span>
              <span>
                {usage.remaining} / {usage.max} free tests today
              </span>
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onEvaluate}
          disabled={isLoading || isEmpty || isLimitReached}
          type="button"
          className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-candy ${
            isLoading || isEmpty || isLimitReached
              ? 'bg-slate-300 cursor-not-allowed opacity-70'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:opacity-95 hover:shadow-candy-pink-glow'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Hook...</span>
            </>
          ) : isLimitReached ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Daily Limit Reached (0/{usage?.max || 5})</span>
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 fill-current" />
              <span>Test Hook &bull; Ignite Hype Meter</span>
            </>
          )}
        </button>
      </div>

      {/* 4b. Friendly Daily Limit Alert Banner when 0 remaining */}
      {isLimitReached && (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50 to-pink-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xs animate-fade-in">
          <div className="flex items-center gap-2.5 text-slate-700">
            <span className="text-2xl">☕</span>
            <div>
              <span className="font-black text-slate-800 block text-xs">
                You've used all 5 free evaluations for today!
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Your quota resets at midnight. Enjoying Viral Hook Studio? Support us on Buy Me a Coffee to help keep community servers fast & free.
              </span>
            </div>
          </div>
          <a
            href="https://buymeacoffee.com/geraltofrivia"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0"
          >
            <span>Support with a Coffee</span>
            <Coffee className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* 5. BOTTOM: Preset Hook Samples Below Button */}
      <div className="border-t border-[#F4ECE4] pt-4 flex flex-col gap-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>Or load a sample hook preset to test:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_HOOKS.map((preset) => {
            const isSelected = script === preset.script;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                type="button"
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-pink-500 text-white border-pink-500 shadow-xs scale-[1.02]'
                    : 'bg-[#FAF8F5] text-slate-700 border-[#E8DDD0] hover:border-pink-300 hover:bg-pink-50/50'
                }`}
              >
                <span>{preset.title}</span>
                <span
                  className={`ml-1.5 text-[10px] opacity-80 ${
                    isSelected ? 'text-pink-100' : 'text-slate-500'
                  }`}
                >
                  ({preset.tag})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
