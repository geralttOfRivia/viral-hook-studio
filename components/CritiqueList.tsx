'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  Lightbulb,
  Bot,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDrilldownForPoint, PointDrilldown } from '@/lib/drilldowns';

interface CritiqueListProps {
  strengths: string[];
  improvements: string[];
}

export const CritiqueList: React.FC<CritiqueListProps> = ({
  strengths,
  improvements,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleCopyExample = (exampleText: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(exampleText);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Visual Legend Explaining AI vs Rules of Thumb */}
      <div className="flex items-center gap-2 text-[10px] font-bold pb-1 border-b border-[#F4ECE4]/80 flex-wrap">
        <span className="text-slate-400 font-semibold uppercase tracking-wider">Guide:</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
          <Bot className="w-3 h-3" />
          <span>AI Custom Analysis (Your Script)</span>
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          <Compass className="w-3 h-3 text-slate-500" />
          <span>Universal Rule of Thumb (Industry Standard)</span>
        </span>
      </div>

      {/* 1. HIGH-PRIORITY: Actionable Polish & Drilldowns */}
      {improvements.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>Priority Fixes to Reach 85+ (Click to drill down)</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">
              {improvements.length} suggestions
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {improvements.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              const drilldown: PointDrilldown = getDrilldownForPoint(item);

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'bg-rose-50/50 border-rose-300 ring-2 ring-rose-200/60 shadow-xs'
                      : 'bg-white border-[#EFE5DB] hover:border-rose-200 shadow-2xs'
                  }`}
                >
                  {/* Clickable Header */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(idx)}
                    className="w-full p-3.5 flex items-start justify-between gap-3 text-left transition-colors"
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-pink-100 text-pink-700 flex items-center gap-0.5">
                            <Bot className="w-2.5 h-2.5" />
                            <span>AI Finding</span>
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-800 leading-snug block">
                          {item}
                        </span>
                        {!isExpanded && (
                          <span className="text-[10px] font-semibold text-rose-600 mt-1 inline-flex items-center gap-1">
                            <Lightbulb className="w-3 h-3" />
                            <span>Click to view universal rule of thumb & rewrite example &rarr;</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="p-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {/* Expandable Drilldown Drawer */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-rose-200/80 bg-white/95 p-3.5 sm:p-4 flex flex-col gap-3"
                      >
                        {/* Retention Drop-Off Risk */}
                        <div className="flex items-start gap-2 text-xs bg-rose-50/60 border border-rose-100 rounded-xl p-2.5">
                          <span className="text-sm">⚠️</span>
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-black text-rose-900 text-[10px] uppercase tracking-wider">
                                Why Viewers Drop Off
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white text-rose-700 border border-rose-200">
                                📐 Rule of Thumb
                              </span>
                            </div>
                            <p className="text-[11px] text-rose-800 font-medium leading-relaxed">
                              {drilldown.retentionRisk}
                            </p>
                          </div>
                        </div>

                        {/* Creator Rule */}
                        <div className="flex items-start gap-2 text-xs bg-purple-50/60 border border-purple-100 rounded-xl p-2.5">
                          <span className="text-sm">💡</span>
                          <div>
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="font-black text-purple-900 text-[10px] uppercase tracking-wider">
                                The Proven YouTube Rule
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white text-purple-700 border border-purple-200">
                                📐 Industry Standard
                              </span>
                            </div>
                            <p className="text-[11px] text-purple-800 font-medium leading-relaxed">
                              {drilldown.creatorRule}
                            </p>
                          </div>
                        </div>

                        {/* Rewrite Formula & Example */}
                        <div className="bg-[#FAF8F5] border border-[#E8DDD0] rounded-xl p-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-pink-500" />
                                <span>Blueprint Rewrite Formula</span>
                              </span>
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-600">
                                📐 Template
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => handleCopyExample(drilldown.rewriteFormula.example, idx, e)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 hover:text-pink-600 transition-colors"
                              title="Copy rewrite example"
                            >
                              {copiedIndex === idx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-700 font-black">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Example</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="bg-white rounded-lg p-2.5 border border-[#F0E6DC] text-xs font-mono text-slate-700 whitespace-pre-line leading-relaxed shadow-2xs">
                            {drilldown.rewriteFormula.example}
                          </div>

                          <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                            <TrendingUp className="w-3 h-3" />
                            <span>{drilldown.retentionStat}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Retention Multipliers (Strengths) */}
      {strengths.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Validated Retention Multipliers</span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <Bot className="w-2.5 h-2.5" />
              <span>AI Detected</span>
            </span>
          </div>

          <ul className="flex flex-col gap-1.5">
            {strengths.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-700 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-3 flex items-start gap-2.5 font-medium leading-relaxed shadow-2xs"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-black text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="flex-1">
                  <span>{item}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
