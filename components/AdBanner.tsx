'use client';

import React, { useState, useEffect } from 'react';
import {
  Headphones,
  TrendingUp,
  Mic,
  Film,
  Video,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AFFILIATE_PARTNERS, AffiliatePartner } from '@/lib/affiliates';

interface AdBannerProps {
  slot?: 'bottom-banner' | 'sidebar-card';
}

const ICON_MAP = {
  Headphones,
  TrendingUp,
  Mic,
  Film,
  Video,
};

export const AdBanner: React.FC<AdBannerProps> = ({ slot = 'bottom-banner' }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const currentPartner: AffiliatePartner = AFFILIATE_PARTNERS[currentIndex];
  const IconComponent = ICON_MAP[currentPartner.iconName] || Sparkles;

  // Auto-slide every 6 seconds unless paused by user hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AFFILIATE_PARTNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + AFFILIATE_PARTNERS.length) % AFFILIATE_PARTNERS.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % AFFILIATE_PARTNERS.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Sidebar Card Slot
  if (slot === 'sidebar-card') {
    return (
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="rounded-3xl bg-[#FAF8F5] border border-[#EFE5DB] p-4 flex flex-col gap-3 text-xs shadow-xs relative overflow-hidden"
      >
        {/* Top Header Row with Stable Right-Corner Navigation */}
        <div className="flex items-center justify-between gap-2 border-b border-[#F0E6DC] pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-white shadow-2xs">
              Ad
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Sponsored
            </span>
          </div>

          {/* Right Top Corner Controls */}
          <div className="flex items-center gap-1 bg-white border border-[#E8DDD0] rounded-xl px-1.5 py-0.5 shadow-2xs">
            <button
              onClick={handlePrev}
              type="button"
              className="p-1 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Previous partner"
            >
              <ChevronLeft className="w-3 h-3" aria-hidden="true" />
            </button>
            <span className="text-[10px] font-bold text-slate-600 select-none tabular-nums px-0.5">
              {currentIndex + 1}/{AFFILIATE_PARTNERS.length}
            </span>
            <button
              onClick={handleNext}
              type="button"
              className="p-1 rounded-md hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Next partner"
            >
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-[72px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPartner.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-2 rounded-2xl bg-white border border-[#E8DDD0] ${currentPartner.accentColor.text} shadow-2xs flex-shrink-0`}
                  aria-hidden="true"
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-600 block uppercase">
                    {currentPartner.category}
                  </span>
                  <span className="font-bold text-slate-800 text-xs block leading-tight">
                    {currentPartner.headline}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                {currentPartner.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <a
          href={currentPartner.url}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="w-full py-2 px-3 rounded-2xl bg-white hover:bg-pink-50/50 text-slate-800 hover:text-pink-700 font-bold text-[11px] border border-[#E8DDD0] hover:border-pink-200 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
        >
          <span>{currentPartner.cta}</span>
          <ExternalLink className="w-3 h-3 text-slate-500" aria-hidden="true" />
        </a>
      </div>
    );
  }

  // Bottom Banner Slot (Rock-Solid Top-Right Corner Navigation)
  return (
    <div className="w-full flex flex-col gap-1.5">
      {/* Demarcation Section Header */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-slate-800 text-white shadow-2xs">
          Ad
        </span>
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
          Sponsored Creator Recommendations
        </span>
        <div className="flex-1 h-px bg-[#EAE0D4]" />
      </div>

      {/* Main Banner Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full rounded-3xl bg-gradient-to-r from-amber-50/30 via-white to-pink-50/30 border border-[#EFE5DB] p-3.5 sm:p-4 shadow-xs relative overflow-hidden transition-all group"
      >
        {/* Top Header Row: Badges on Left, Fixed Rock-Solid Navigation on Top-Right Corner */}
        <div className="flex items-center justify-between gap-2 border-b border-[#F0E6DC]/70 pb-2.5 mb-2.5">
          {/* Left Badges */}
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-white shadow-2xs flex-shrink-0">
              Ad
            </span>
            <span
              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${currentPartner.accentColor.badgeBg} ${currentPartner.accentColor.badgeText} flex-shrink-0`}
            >
              {currentPartner.category}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-600 hidden xs:inline flex-shrink-0">
              Affiliate Spotlight
            </span>
          </div>

          {/* Right Top Corner: Rock-Solid Fixed Navigation (Zero Fluctuation) */}
          <div className="flex items-center gap-1.5 bg-white/95 border border-[#E8DDD0] rounded-xl px-2 py-1 shadow-2xs flex-shrink-0">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              type="button"
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Previous offer"
              title="Previous offer"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            {/* Fixed-Width Dots Container: Each dot has exact w-3 h-3 slot so width NEVER jitters */}
            <div className="flex items-center gap-0.5 px-0.5">
              {AFFILIATE_PARTNERS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDotClick(idx)}
                  className="w-2.5 h-3 flex items-center justify-center"
                  aria-label={`Slide ${idx + 1} of ${AFFILIATE_PARTNERS.length}`}
                  title={`${idx + 1} of ${AFFILIATE_PARTNERS.length}`}
                >
                  <span
                    className={`h-1.5 rounded-full transition-all block ${
                      idx === currentIndex
                        ? 'w-2.5 bg-pink-500 shadow-2xs'
                        : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Stable Tabular Numerical Indicator */}
            <span className="text-[10px] font-bold text-slate-600 select-none tabular-nums pl-0.5 min-w-[24px] text-center">
              {currentIndex + 1}/{AFFILIATE_PARTNERS.length}
            </span>

            {/* Next Button */}
            <button
              onClick={handleNext}
              type="button"
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Next offer"
              title="Next offer"
            >
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Content Row: Icon + Copy + Outbound CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Left / Center: Icon + Copy (Stable Fixed Min-Height so height NEVER jumps) */}
          <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
            <div
              className={`w-10 h-10 rounded-2xl bg-white ${currentPartner.accentColor.text} border border-[#EAE0D4] flex items-center justify-center flex-shrink-0 shadow-2xs transition-colors`}
              aria-hidden="true"
            >
              <IconComponent className="w-5 h-5" />
            </div>

            <div className="min-w-0 flex-1 min-h-[44px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPartner.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex flex-col gap-0.5"
                >
                  <div className="font-black text-xs sm:text-sm text-slate-800 tracking-tight truncate">
                    {currentPartner.headline}
                  </div>
                  <p className="text-[11px] text-slate-700 font-medium line-clamp-1 sm:line-clamp-none">
                    {currentPartner.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Primary CTA Outbound Link (Steady Position) */}
          <div className="flex items-center justify-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F2E8DC]">
            <a
              href={currentPartner.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-2xl text-xs font-black text-slate-800 bg-white hover:bg-pink-50 border border-[#E8DDD0] hover:border-pink-200 shadow-2xs flex items-center justify-center gap-1.5 transition-all group/btn"
            >
              <span className="text-pink-600 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true">
                ✨
              </span>
              <span>{currentPartner.cta}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/btn:text-pink-500 transition-colors" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
