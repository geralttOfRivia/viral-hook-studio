'use client';

import React, { useState } from 'react';
import { PvssEvaluationResult, PvssPillarScore } from '@/lib/types';
import {
  Target,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bot,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PVSS_PILLAR_DRILLDOWNS } from '@/lib/drilldowns';

interface PvssBreakdownProps {
  pillars: PvssEvaluationResult['pillars'];
}

export const PvssBreakdown: React.FC<PvssBreakdownProps> = ({ pillars }) => {
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);

  const togglePillar = (key: string) => {
    setExpandedPillar((prev) => (prev === key ? null : key));
  };

  const pillarList: {
    key: keyof typeof pillars;
    letter: string;
    title: string;
    sub: string;
    icon: React.ElementType;
    color: {
      letterBg: string;
      barColor: string;
      badge: string;
    };
    data: PvssPillarScore;
  }[] = [
    {
      key: 'promise',
      letter: 'P',
      title: 'Promise',
      sub: 'Curiosity gap & clear viewer transformation',
      icon: Target,
      color: {
        letterBg: 'bg-rose-500 text-white shadow-rose-200',
        barColor: 'bg-rose-500',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
      },
      data: pillars.promise,
    },
    {
      key: 'validation',
      letter: 'V',
      title: 'Validation',
      sub: 'Authority, research & proof tokens',
      icon: ShieldCheck,
      color: {
        letterBg: 'bg-emerald-500 text-white shadow-emerald-200',
        barColor: 'bg-emerald-500',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      },
      data: pillars.validation,
    },
    {
      key: 'structure',
      letter: 'S',
      title: 'Structure',
      sub: 'Pacing velocity & zero throat-clearing',
      icon: Zap,
      color: {
        letterBg: 'bg-amber-500 text-white shadow-amber-200',
        barColor: 'bg-amber-500',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
      },
      data: pillars.structure,
    },
    {
      key: 'stakes',
      letter: 'S',
      title: 'Stakes',
      sub: 'Tension & consequence of missing out',
      icon: AlertTriangle,
      color: {
        letterBg: 'bg-purple-500 text-white shadow-purple-200',
        barColor: 'bg-purple-500',
        badge: 'bg-purple-50 text-purple-700 border-purple-200',
      },
      data: pillars.stakes,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F4ECE4] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
              PVSS Framework Breakdown
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Click any pillar to view rules of thumb, benchmarks & checklists
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
            <Bot className="w-3 h-3" />
            <span>AI Scored (0–25)</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <Compass className="w-3 h-3 text-slate-500" />
            <span>Rules of Thumb</span>
          </span>
        </div>
      </div>

      {/* Clean Single-Column Accordion */}
      <div className="flex flex-col gap-2.5">
        {pillarList.map((item) => {
          const scorePercent = (item.data.score / item.data.weightMax) * 100;
          const isExpanded = expandedPillar === item.key;
          const drilldown = PVSS_PILLAR_DRILLDOWNS[item.title];

          return (
            <div
              key={item.key}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-white border-pink-300 ring-2 ring-pink-100/80 shadow-candy-sm'
                  : 'bg-white border-[#EFE5DB] shadow-2xs hover:border-pink-200'
              }`}
            >
              {/* Clickable Header Row */}
              <button
                type="button"
                onClick={() => togglePillar(item.key)}
                className="w-full p-3.5 sm:p-4 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center shadow-sm ${item.color.letterBg} flex-shrink-0`}
                  >
                    {item.letter}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-black text-slate-800">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium hidden xs:inline">
                        &bull; {item.sub}
                      </span>
                    </div>

                    {/* Compact Inline Progress Bar */}
                    <div className="w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${item.color.barColor}`}
                        style={{ width: `${scorePercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto flex-shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#F4ECE4]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-pink-50 text-pink-700 border border-pink-200 flex items-center gap-0.5">
                      <Bot className="w-2.5 h-2.5" />
                      <span>AI</span>
                    </span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm font-black text-slate-800">
                        {item.data.score}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">/25</span>
                    </div>
                  </div>

                  <span className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </span>
                </div>
              </button>

              {/* Always-visible AI Diagnosis for User's Script */}
              <div className="px-3.5 sm:px-4 pb-3 pt-0 flex items-start gap-1.5 text-[11px] text-slate-600 font-medium leading-relaxed">
                <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-pink-100 text-pink-800 flex-shrink-0 mt-0.5">
                  AI Finding:
                </span>
                <span>{item.data.critique}</span>
              </div>

              {/* Expandable Pillar Drilldown Drawer */}
              <AnimatePresence>
                {isExpanded && drilldown && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-[#F0E6DC] bg-[#FAF8F5] p-3.5 sm:p-4 flex flex-col gap-3 text-xs"
                  >
                    {/* YouTube Benchmark (Rule of Thumb) */}
                    <div className="bg-white p-3 rounded-xl border border-[#E8DDD0] shadow-2xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                          📈 YouTube Retention Benchmark
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          📐 Rule of Thumb
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-700 font-medium leading-relaxed">
                        {drilldown.benchmark}
                      </p>
                    </div>

                    {/* AI Recommendation Tailored to Script */}
                    {item.data.tip && (
                      <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-rose-900 block flex items-center gap-1">
                            <Lightbulb className="w-3.5 h-3.5 text-rose-600" />
                            <span>Script-Specific Recommendation</span>
                          </span>
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-pink-200/80 text-pink-900 flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5" />
                            <span>AI Tailored</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-rose-900 font-medium leading-relaxed">
                          {item.data.tip}
                        </p>
                      </div>
                    )}

                    {/* Perfection Checklist (Rule of Thumb) */}
                    <div className="bg-white p-3 rounded-xl border border-[#E8DDD0]">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          🎯 25/25 Checklist for {item.title}:
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          📐 Standard Checklist
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {drilldown.perfectionChecklist.map((check, cIdx) => (
                          <li
                            key={cIdx}
                            className="text-[11px] text-slate-600 flex items-start gap-1.5"
                          >
                            <span className="text-pink-500 font-bold mt-0.5">•</span>
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pro Formula (Rule of Thumb) */}
                    <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-800 block flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          <span>Winning Hook Formula</span>
                        </span>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          📐 Industry Pattern
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-purple-900 font-medium leading-relaxed">
                        {drilldown.proFormula}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
