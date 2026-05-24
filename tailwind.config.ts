import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fenris: {
          navy: '#0a0f1a',
          slate: '#111827',
          accent: '#c5a46e',      // Rich gold / bronze (premium gaming)
          'accent-2': '#3b82f6',  // Sky blue
          red: '#b91c1c',         // Crimson for Warhammer feel
          silver: '#cbd5e1',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
