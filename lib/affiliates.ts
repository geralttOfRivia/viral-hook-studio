export interface AffiliatePartner {
  id: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  cta: string;
  url: string;
  iconName: 'Headphones' | 'TrendingUp' | 'Mic' | 'Film' | 'Video';
  accentColor: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    btnHover: string;
  };
}

/**
 * Curated Affiliate & Partner Tools for YouTube Creators.
 * 
 * TO ACTIVATE YOUR AFFILIATE COMMISSIONS:
 * Simply replace the `url` values below with your custom referral/affiliate links
 * from each partner's affiliate program dashboard.
 */
export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  {
    id: 'epidemic-sound',
    name: 'Epidemic Sound',
    category: 'Music & Sound FX',
    headline: 'Epidemic Sound • 30-Day Free Pass',
    description: 'Elevate your 15-second hook with cinematic whooshes, risers, and 40,000+ royalty-free tracks.',
    cta: 'Claim 30-Day Pass',
    url: 'https://www.epidemicsound.com', // Replace with your Epidemic Sound referral link
    iconName: 'Headphones',
    accentColor: {
      bg: 'bg-rose-50/50',
      border: 'border-rose-100',
      text: 'text-rose-600',
      badgeBg: 'bg-rose-100/80',
      badgeText: 'text-rose-800',
      btnHover: 'hover:bg-rose-50',
    },
  },
  {
    id: 'vidiq',
    name: 'vidIQ',
    category: 'SEO & CTR Boost',
    headline: 'vidIQ • Free YouTube Growth Suite',
    description: 'Match your viral intro with high-CTR title predictions and competitor retention analytics.',
    cta: 'Try vidIQ Free',
    url: 'https://vidiq.com', // Replace with your vidIQ affiliate link
    iconName: 'TrendingUp',
    accentColor: {
      bg: 'bg-indigo-50/50',
      border: 'border-indigo-100',
      text: 'text-indigo-600',
      badgeBg: 'bg-indigo-100/80',
      badgeText: 'text-indigo-800',
      btnHover: 'hover:bg-indigo-50',
    },
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'AI Voice & Cadence',
    headline: 'ElevenLabs • Studio Voiceover AI',
    description: 'Test pacing, tone, and spoken rhythm for your hook script before recording in front of the camera.',
    cta: 'Generate Free Audio',
    url: 'https://elevenlabs.io', // Replace with your ElevenLabs affiliate link
    iconName: 'Mic',
    accentColor: {
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-100',
      text: 'text-emerald-600',
      badgeBg: 'bg-emerald-100/80',
      badgeText: 'text-emerald-800',
      btnHover: 'hover:bg-emerald-50',
    },
  },
  {
    id: 'descript',
    name: 'Descript',
    category: 'Fast Jump-Cuts & Trimming',
    headline: 'Descript • Edit Video Like a Doc',
    description: 'Eliminate pauses, "ums", and filler words in your opening 15 seconds with 1-click text trimming.',
    cta: 'Edit First 15s Free',
    url: 'https://www.descript.com', // Replace with your Descript affiliate link
    iconName: 'Film',
    accentColor: {
      bg: 'bg-amber-50/50',
      border: 'border-amber-100',
      text: 'text-amber-600',
      badgeBg: 'bg-amber-100/80',
      badgeText: 'text-amber-800',
      btnHover: 'hover:bg-amber-50',
    },
  },
  {
    id: 'opus-clip',
    name: 'Opus Clip',
    category: 'Viral Shorts Repurposing',
    headline: 'Opus Clip • 1 Long Video → 10 Viral Shorts',
    description: 'Auto-detect high-retention hooks in your long videos and reformat them into viral YouTube Shorts.',
    cta: 'Create Viral Clips',
    url: 'https://www.opus.pro', // Replace with your Opus Clip affiliate link
    iconName: 'Video',
    accentColor: {
      bg: 'bg-purple-50/50',
      border: 'border-purple-100',
      text: 'text-purple-600',
      badgeBg: 'bg-purple-100/80',
      badgeText: 'text-purple-800',
      btnHover: 'hover:bg-purple-50',
    },
  },
];
