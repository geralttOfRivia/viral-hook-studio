'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Zap, AlertCircle, Check, Copy } from 'lucide-react';

interface HypeMeterRingProps {
  score: number;
  grade: string;
  verdict: string;
  isLoading?: boolean;
}

export const HypeMeterRing: React.FC<HypeMeterRingProps> = ({
  score,
  grade,
  verdict,
  isLoading = false,
}) => {
  const lastScoreRef = useRef<number>(score);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Spring animation for the score value
  const springScore = useSpring(0, {
    stiffness: 70,
    damping: 15,
  });

  const displayScore = useTransform(springScore, (current) =>
    Math.round(current)
  );

  useEffect(() => {
    springScore.set(score);

    // Trigger confetti burst if score is >= 85 and it either just reached it or was tested
    if (score >= 85 && !isLoading) {
      triggerCandyConfetti();
    }
    lastScoreRef.current = score;
  }, [score, isLoading, springScore]);

  const triggerCandyConfetti = () => {
    try {
      // First cannon from left
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6, x: 0.3 },
        colors: ['#FF2A6D', '#FF7597', '#10B981', '#FBBF24', '#C084FC', '#FFFFFF'],
        ticks: 200,
        gravity: 1.1,
        scalar: 1.2,
      });

      // Second cannon from right
      setTimeout(() => {
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.6, x: 0.7 },
          colors: ['#FF2A6D', '#FF5E8E', '#34D399', '#FCD34D', '#A78BFA'],
          ticks: 220,
          gravity: 1.1,
          scalar: 1.1,
        });
      }, 150);
    } catch (e) {
      console.log('Confetti error:', e);
    }
  };

  const handleShareToTwitter = () => {
    const siteUrl = 'https://viral-hook-studio.vercel.app';
    const creatorHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@GeraltRiviaCode';
    let tweetText = '';
    if (score >= 85) {
      tweetText = `Just scored ${score}/100 (${grade}) on my 15-second YouTube intro script! 🍭🔥\n\nTested with ${creatorHandle}'s Viral Hook Studio before filming. Check your retention score:`;
    } else if (score >= 51) {
      tweetText = `Diagnosed my YouTube video intro on Viral Hook Studio (by ${creatorHandle}) — scored ${score}/100 (${grade})! 🍭\n\nFixing my first 15 seconds before filming. Test yours:`;
    } else {
      tweetText = `Testing my YouTube video intro on Viral Hook Studio (by ${creatorHandle}) to fix retention drop-offs! 🍭\n\nCheck your intro script against the PVSS framework:`;
    }
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(siteUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyScorecard = async () => {
    const siteUrl = 'https://viral-hook-studio.vercel.app';
    const text = `🍭 Viral Hook Studio Scorecard\n🎯 Retention Score: ${score}/100 (${grade})\n💡 Verdict: ${verdict}\n👉 Test your 15s intro: ${siteUrl}`;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // Color theme mapping
  // 0 - 50: Yellow
  // 51 - 84: Mint Green
  // 85 - 100: Glowing Bubblegum Pink
  const isGibberish = grade.toLowerCase().includes('gibberish') || grade.toLowerCase().includes('incoherent');
  const isPink = score >= 85 && !isGibberish;
  const isMint = score >= 51 && score < 85 && !isGibberish;
  const isYellow = score < 51 && !isGibberish;

  const colorConfig = isGibberish
    ? {
        name: 'Incoherent / Gibberish',
        gradientId: 'yellowGradient',
        from: '#EF4444',
        to: '#B91C1C',
        glowColor: 'rgba(239, 68, 68, 0.35)',
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-600',
        badgeBg: 'bg-gradient-to-r from-rose-500 to-red-600 text-white',
        icon: AlertCircle,
        ringGlowClass: 'shadow-rose-200',
      }
    : isPink
    ? {
        name: 'Bubblegum Pink',
        gradientId: 'pinkGradient',
        from: '#FF7597',
        to: '#FF1F6D',
        glowColor: 'rgba(255, 42, 109, 0.45)',
        bgColor: 'bg-pink-50',
        textColor: 'text-[#FF1F6D]',
        badgeBg: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
        icon: Trophy,
        ringGlowClass: 'animate-candy-pulse',
      }
    : isMint
    ? {
        name: 'Mint Green',
        gradientId: 'mintGradient',
        from: '#34D399',
        to: '#059669',
        glowColor: 'rgba(16, 185, 129, 0.35)',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-600',
        badgeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white',
        icon: Zap,
        ringGlowClass: 'shadow-candy-mint',
      }
    : {
        name: 'Sunshine Yellow',
        gradientId: 'yellowGradient',
        from: '#FCD34D',
        to: '#D97706',
        glowColor: 'rgba(245, 158, 11, 0.35)',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-600',
        badgeBg: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white',
        icon: AlertCircle,
        ringGlowClass: 'shadow-candy-yellow',
      };

  const IconComponent = colorConfig.icon;

  // SVG ring dimensions
  const size = 260;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Progress ratio from 0 to 1
  const progressRatio = Math.max(0, Math.min(100, score)) / 100;
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      {/* 3D Circular Progress Meter */}
      <div className="relative flex items-center justify-center">
        {/* Outer 3D glow & shadow */}
        <div
          className={`absolute rounded-full transition-all duration-700 ${
            isPink ? 'animate-candy-pulse' : ''
          }`}
          style={{
            width: size + 20,
            height: size + 20,
            background: `radial-gradient(circle, ${colorConfig.glowColor} 0%, rgba(255,255,255,0) 70%)`,
            filter: 'blur(10px)',
          }}
        />

        {/* The 3D SVG Circular Gauge */}
        <div className="relative rounded-full p-2 bg-gradient-to-b from-white via-[#FDFBF7] to-[#F1E8DC] shadow-[0_14px_28px_rgba(0,0,0,0.06),0_10px_10px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.9)] border border-white/60">
          <svg
            width={size}
            height={size}
            className="transform -rotate-90"
            viewBox={`0 0 ${size} ${size}`}
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA0BC" />
                <stop offset="50%" stopColor="#FF4A82" />
                <stop offset="100%" stopColor="#FF1867" />
              </linearGradient>

              <linearGradient id="mintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6EE7B7" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>

              <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>

              {/* 3D Drop shadow for active stroke */}
              <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* Inactive Track Ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#F0E5D8"
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />

            {/* Subtle bevel inner ring track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius - strokeWidth / 2}
              stroke="#E8DDD0"
              strokeWidth={1.5}
              fill="none"
              opacity={0.6}
            />

            {/* Active Progress Ring with Spring animation */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`url(#${colorConfig.gradientId})`}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              filter="url(#shadow3d)"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1], // bouncy spring
              }}
            />
          </svg>

          {/* Center Score Display with 3D Depth Card */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            role="meter"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="15-second intro hype score"
          >
            <div className="flex flex-col items-center">
              {isLoading ? (
                <div className="flex flex-col items-center gap-1.5 animate-pulse">
                  <span className="text-3xl" aria-hidden="true">🍬</span>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Analyzing Hook...
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-baseline">
                    <motion.span
                      className={`text-6xl font-black tracking-tight ${colorConfig.textColor} drop-shadow-sm font-sans`}
                    >
                      {displayScore}
                    </motion.span>
                    <span className="text-xl font-bold text-slate-500 ml-1">/100</span>
                  </div>

                  <div
                    className={`mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-sm tracking-wide ${colorConfig.badgeBg}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{grade}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Score Tier Explainer Bar */}
      <div className="w-full mt-6 flex items-center justify-between gap-1 text-[11px] font-bold text-slate-600 px-2">
        <div
          className={`flex-1 py-1.5 px-1 rounded-lg transition-all text-center border ${
            isYellow
              ? 'bg-amber-100/70 border-amber-300 text-amber-900 font-extrabold shadow-sm'
              : 'bg-white/60 border-slate-200/60'
          }`}
        >
          <span className="block text-[10px] text-amber-700 uppercase font-black">0–50</span>
          <span>Yellow (Flat)</span>
        </div>
        <div
          className={`flex-1 py-1.5 px-1 rounded-lg transition-all text-center border ${
            isMint
              ? 'bg-emerald-100/70 border-emerald-300 text-emerald-900 font-extrabold shadow-sm'
              : 'bg-white/60 border-slate-200/60'
          }`}
        >
          <span className="block text-[10px] text-emerald-700 uppercase font-black">51–84</span>
          <span>Mint (Solid)</span>
        </div>
        <div
          className={`flex-1 py-1.5 px-1 rounded-lg transition-all text-center border ${
            isPink
              ? 'bg-pink-100/70 border-pink-300 text-pink-900 font-extrabold shadow-sm'
              : 'bg-white/60 border-slate-200/60'
          }`}
        >
          <span className="block text-[10px] text-pink-700 uppercase font-black">85–100</span>
          <span>Pink (Viral 🎉)</span>
        </div>
      </div>

      {/* Actionable Verdict */}
      <p className="mt-3 text-xs text-slate-700 font-medium px-2 leading-relaxed">
        {verdict}
      </p>

      {/* Social Sharing & Action Bar (when evaluated) */}
      {score > 0 && !isLoading && (
        <div className="w-full mt-4 pt-4 border-t border-[#F4ECE4] flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            {/* 1-Click Share to X */}
            <button
              onClick={handleShareToTwitter}
              type="button"
              aria-label="Share hook score on X (Twitter)"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-black bg-black text-white hover:bg-slate-800 transition-all shadow-sm hover:shadow active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share Score to 𝕏</span>
            </button>

            {/* Copy Scorecard Button */}
            <button
              onClick={handleCopyScorecard}
              type="button"
              aria-label="Copy scorecard to clipboard"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-slate-900 border border-[#E8DDD0] hover:border-slate-400 hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                  <span className="text-emerald-700 font-extrabold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Celebration Confetti button when score is viral tier */}
          {isPink && (
            <button
              onClick={triggerCandyConfetti}
              type="button"
              aria-label="Shoot celebration confetti again"
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-pink-700 hover:text-pink-800 bg-pink-100/80 hover:bg-pink-100 py-1.5 rounded-xl transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Shoot Confetti Again 🎉</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
