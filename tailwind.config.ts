import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#22c55e',
        'neon-cyan': '#06b6d4',
        'neon-blue': '#3b82f6',
        'dark-bg': '#0a0a0a',
        'dark-card': '#18181b',
        'dark-border': '#27272a',
      },
      boxShadow: {
        'neon-green': '0 0 10px #22c55e',
        'neon-cyan': '0 0 10px #06b6d4',
        'neon-blue': '0 0 15px #3b82f6',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #22c55e' },
          '50%': { boxShadow: '0 0 20px #22c55e' },
        },
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
