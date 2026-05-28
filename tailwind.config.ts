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
          bg: '#F7F5EF',
          ink: '#0F0F0E',
          mid: '#6A6A5E',
          muted: '#A4A498',
          faint: '#C4C0B6',
          green: '#2A7A4A',
          'green-dark': '#1D5C36',
          border: '#D8D4CA',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
