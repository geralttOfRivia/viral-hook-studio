import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://viralhookstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Viral Hook Studio | 15-Second YouTube Intro Analyzer & Hype Meter',
    template: '%s | Viral Hook Studio',
  },
  description:
    'Test and optimize your 15-second YouTube video intro scripts before filming. Free audience retention diagnostics scored against the PVSS Framework (Promise, Validation, Structure, Stakes).',
  keywords: [
    'YouTube hook analyzer',
    'YouTube intro script tester',
    'video retention tool',
    'PVSS framework',
    'YouTube audience retention',
    'how to hook viewers in 15 seconds',
    'script pacing calculator',
    'video intro rating',
    'YouTube creator tools',
  ],
  authors: [{ name: 'Viral Hook Studio' }],
  creator: 'Viral Hook Studio',
  publisher: 'Viral Hook Studio',
  applicationName: 'Viral Hook Studio',
  generator: 'Next.js',
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Viral Hook Studio | 15-Second YouTube Intro Analyzer',
    description:
      'Score your YouTube video intro before you film. Fix 3-second drop-offs with the PVSS Framework and animated Hype Meter.',
    siteName: 'Viral Hook Studio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Viral Hook Studio 15-Second Intro Analyzer and Hype Meter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Viral Hook Studio | 15-Second YouTube Intro Analyzer',
    description:
      'Score your YouTube video hook before you film. Maximize audience retention with the PVSS Framework.',
    images: ['/og-image.png'],
    creator: '@viralhookstudio',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org structured data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Viral Hook Studio',
    url: siteUrl,
    description:
      'Free 15-second YouTube intro script analyzer that evaluates video hooks against the PVSS Framework for maximum viewer retention.',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      '15-Second YouTube Intro Diagnostics',
      'PVSS Framework Evaluation (Promise, Validation, Structure, Stakes)',
      '3D Circular Hype Meter Score (0-100)',
      'Real-Time Word Count & Speech Duration Calculator',
      'Actionable Director Notes and Hook Polish Recommendations',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-slate-800 antialiased selection:bg-pink-100 selection:text-pink-600 flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
