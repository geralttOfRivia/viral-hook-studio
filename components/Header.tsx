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
        <div 
          className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 p-0.5 shadow-sm flex items-center justify-center text-white text-xl"
          aria-hidden="true"
        >
          🎯
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-black text-lg tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
              Viral Hook Studio
            </h1>
          </div>
          <p className="text-xs text-slate-600 font-medium hidden sm:block">
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
          aria-label="How it works and PVSS guide"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-white text-slate-700 hover:text-pink-700 hover:border-pink-300 border border-[#E8DDD0] shadow-xs transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-pink-600" aria-hidden="true" />
          <span>How It Works</span>
        </button>

        {/* Follow on X Link */}
        <a
          href={process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Viral Hook Studio on X"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 hover:text-black border border-[#E8DDD0] shadow-xs transition-all"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">Follow on 𝕏</span>
        </a>

        {/* Buy Me a Coffee Direct Link */}
        <a
          href="https://buymeacoffee.com/geraltofrivia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Support creator on Buy Me a Coffee"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs transition-all"
        >
          <Coffee className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
          <span>Buy Me a Coffee</span>
        </a>
      </div>
    </header>
  );
};
