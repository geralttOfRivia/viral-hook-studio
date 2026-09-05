'use client';

import React from 'react';
import { BookOpen, Coffee, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenGuide: () => void;
  onOpenSupport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGuide, onOpenSupport }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F0E6DC] bg-[#FAF8F5]/90 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-0.5 shadow-sm flex items-center justify-center text-white text-xl">
          🎯
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
              Viral Hook Studio
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium hidden sm:block">
            15-Second YouTube Intro & Retention Lab
          </p>
        </div>
      </div>

      {/* Navigation & Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* How It Works Button */}
        <button
          onClick={onOpenGuide}
          type="button"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-white text-slate-700 hover:text-pink-600 hover:border-pink-300 border border-[#E8DDD0] shadow-xs transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-pink-500" />
          <span>How It Works</span>
        </button>

        {/* Buy Me a Coffee Direct Link */}
        <a
          href="https://buymeacoffee.com/geraltofrivia"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 shadow-xs transition-all"
        >
          <Coffee className="w-3.5 h-3.5 text-amber-600" />
          <span>Buy Me a Coffee</span>
        </a>
      </div>
    </header>
  );
};
