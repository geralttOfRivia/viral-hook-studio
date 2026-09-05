/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        candy: {
          bg: "#FAF8F5",
          card: "#FFFFFF",
          border: "#F3EBE1",
          pink: {
            DEFAULT: "#FF5E8E",
            light: "#FFA3BC",
            pale: "#FFF1F5",
            glow: "#FF2A6D",
          },
          mint: {
            DEFAULT: "#10B981",
            light: "#6EE7B7",
            pale: "#ECFDF5",
            glow: "#059669",
          },
          yellow: {
            DEFAULT: "#F59E0B",
            light: "#FCD34D",
            pale: "#FFFBEB",
            glow: "#D97706",
          },
          purple: {
            DEFAULT: "#8B5CF6",
            light: "#C4B5FD",
            pale: "#F5F3FF",
          },
        },
      },
      boxShadow: {
        'candy-sm': '0 4px 14px 0 rgba(0, 0, 0, 0.04)',
        'candy': '0 10px 25px -5px rgba(255, 94, 142, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'candy-mint': '0 10px 25px -5px rgba(16, 185, 129, 0.15)',
        'candy-yellow': '0 10px 25px -5px rgba(245, 158, 11, 0.15)',
        'candy-pink-glow': '0 0 35px 8px rgba(255, 42, 109, 0.35)',
        'candy-3d': '0 20px 30px -10px rgba(0, 0, 0, 0.08), 0 6px 10px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'candy': '1.25rem',
        'candy-lg': '1.75rem',
      },
    },
  },
  plugins: [],
};
