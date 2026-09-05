'use client';

import React from 'react';
import { X, Coffee, Heart, ExternalLink, Sparkles, Share2 } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-dialog-title"
    >
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#EFE5DB] shadow-2xl p-6 sm:p-7 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F4ECE4] pb-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shadow-sm"
              aria-hidden="true"
            >
              ☕
            </div>
            <div>
              <h3 id="support-dialog-title" className="font-black text-slate-800 text-base">
                Support Viral Hook Studio
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Free & open for creators everywhere.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            aria-label="Close support dialog"
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Viral Hook Studio is completely free to use. If it helped you craft a viral intro, save watch time, or grow your channel, here are simple ways to support future development:
        </p>

        <div className="flex flex-col gap-2.5">
          {/* Buy Me a Coffee */}
          <a
            href="https://buymeacoffee.com/geraltofrivia"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-950 font-bold text-xs flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">☕</span>
              <div>
                <span className="block font-black text-slate-800">Buy Me a Coffee</span>
                <span className="text-[11px] font-normal text-slate-600">Tip to support hosting & ongoing updates</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Share with creators */}
          <button
            type="button"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Studio link copied to clipboard! Share it with your creator friends.');
              }
            }}
            className="p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-pink-50 border border-[#EFE5DB] hover:border-pink-200 text-slate-800 font-bold text-xs flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">📢</span>
              <div className="text-left">
                <span className="block font-black text-slate-800">Share with Fellow Creators</span>
                <span className="text-[11px] font-normal text-slate-600">Copy link to share on X, Discord, or YouTube</span>
              </div>
            </div>
            <Share2 className="w-4 h-4 text-slate-600 group-hover:text-pink-700 transition-colors" aria-hidden="true" />
          </button>
        </div>

        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-600 font-medium">
            Made with ❤️ for YouTube storytellers & video creators.
          </p>
        </div>
      </div>
    </div>
  );
};
