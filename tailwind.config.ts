import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          yellow: '#F3C635',      // primary brand yellow (from screenshot)
          'yellow-light': '#F7D860', // lighter yellow for hover/accents
          cream: '#F4F1EB',
          ink: '#0F0F0E',
          dark: '#1A1A18',        // near-black from dark sections
          mid: '#7A7A6E',
          muted: '#A4A498',
          faint: '#C4C0B6',
          border: '#D8D4CA',
          green: '#2A7A4A',
          'green-dark': '#1C3D2A',
          'green-mid': '#4A9A6A',
          'green-pale': '#6DAF8A',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s ease-out both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
