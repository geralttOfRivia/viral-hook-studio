import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Viral Hook Studio',
    short_name: 'ViralHook',
    description: '15-Second YouTube Intro Script Analyzer & Hype Meter',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#FF3366',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
