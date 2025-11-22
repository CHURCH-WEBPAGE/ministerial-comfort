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
    },
  },
  plugins: [],
};
export default config;

