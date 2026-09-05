'use client';

import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface CritiqueListProps {
  strengths: string[];
  improvements: string[];
}

export const CritiqueList: React.FC<CritiqueListProps> = ({
  strengths,
  improvements,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Retention Multipliers</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {strengths.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-700 bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-2.5 flex items-start gap-2 font-medium leading-relaxed"
              >
                <span className="text-emerald-500 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actionable Improvements */}
      {improvements.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>Actionable Polish</span>
          </div>
          <ul className="flex flex-col gap-1.5">
            {improvements.map((item, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-700 bg-rose-50/70 border border-rose-200/70 rounded-xl p-2.5 flex items-start gap-2 font-medium leading-relaxed"
              >
                <span className="text-rose-500 font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
