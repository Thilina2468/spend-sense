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
        'brand-green': '#4EA685',
        'brand-green-hover': '#3d8a6b',
        'brand-green-light': '#e8f5f0',
        'neon-green': '#22c55e',
        'neon-cyan': '#06b6d4',
        'neon-blue': '#3b82f6',
        'dark-bg': '#ffffff',
        'dark-card': '#ffffff',
        'dark-border': '#e5e7eb',
      },
      boxShadow: {
        'neon-green': '0 0 10px #22c55e',
        'neon-cyan': '0 0 10px #06b6d4',
        'neon-blue': '0 0 15px #3b82f6',
        'green-glow': '0 0 10px rgba(78, 166, 133, 0.3)',
        'green-strong': '0 4px 12px rgba(78, 166, 133, 0.2)',
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
