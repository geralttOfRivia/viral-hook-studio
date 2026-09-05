'use client';

import React from 'react';
import { TokenUsage } from '@/lib/types';
import { Cpu, Zap, Activity } from 'lucide-react';

interface TokenUsageBadgeProps {
  tokenUsage?: TokenUsage;
  providerUsed: 'gemini' | 'openai' | 'simulator';
}

export const TokenUsageBadge: React.FC<TokenUsageBadgeProps> = ({
  tokenUsage,
}) => {
  if (!tokenUsage) return null;

  return (
    <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-medium px-3 py-1.5 bg-white/70 border border-[#EFE5DB] rounded-xl">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-semibold text-slate-600">PVSS Diagnostics Complete</span>
      </div>

      <div className="flex items-center gap-3">
        <span>
          In: <strong>{tokenUsage.promptTokens}</strong> &bull; Out: <strong>{tokenUsage.completionTokens}</strong>
        </span>
        <span className="flex items-center gap-1 font-bold text-slate-700">
          <Zap className="w-3 h-3 text-amber-500 fill-current" />
          <span>{tokenUsage.totalTokens} tokens</span>
        </span>
        <span className="hidden sm:inline-block border-l border-slate-200 pl-2 text-slate-400">
          {tokenUsage.latencyMs}ms
        </span>
      </div>
    </div>
  );
};
