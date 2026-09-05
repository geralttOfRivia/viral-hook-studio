'use client';

import React from 'react';
import { PvssEvaluationResult, PvssPillarScore } from '@/lib/types';
import { Target, ShieldCheck, Zap, AlertTriangle, Lightbulb } from 'lucide-react';

interface PvssBreakdownProps {
  pillars: PvssEvaluationResult['pillars'];
}

export const PvssBreakdown: React.FC<PvssBreakdownProps> = ({ pillars }) => {
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
      sub: 'Curiosity gap & clear viewer payoff',
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
      sub: 'Pacing velocity & zero fluff',
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
      sub: 'Tension & urgency to not click away',
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
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-1.5">
          <span>📊 PVSS Framework Breakdown</span>
        </h3>
        <span className="text-[11px] font-semibold text-slate-400">
          Max 25 pts each
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {pillarList.map((item) => {
          const scorePercent = (item.data.score / item.data.weightMax) * 100;
          return (
            <div
              key={item.key}
              className="p-3.5 rounded-2xl bg-white border border-[#EFE5DB] shadow-sm hover:border-pink-200 transition-all flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shadow-sm ${item.color.letterBg}`}
                  >
                    {item.letter}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {item.sub}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-slate-800">
                    {item.data.score}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">/25</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${item.color.barColor}`}
                  style={{ width: `${scorePercent}%` }}
                />
              </div>

              {/* Critique & Tip */}
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {item.data.critique}
              </p>

              {item.data.tip && (
                <div className="flex items-start gap-1 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 font-medium">
                  <Lightbulb className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-700">Pro Tip:</strong> {item.data.tip}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
