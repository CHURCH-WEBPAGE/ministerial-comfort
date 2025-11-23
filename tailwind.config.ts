import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#2867AE",
          red: "#DC2626",
        },
        blue: {
          500: "#2867AE",
          600: "#2867AE",
          700: "#1e4d7a",
        },
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'news-ticker': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 1.2s ease-out',
        'news-ticker': 'news-ticker 10s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;

