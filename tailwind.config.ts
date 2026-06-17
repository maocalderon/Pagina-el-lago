import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/config/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        lago: {
          navy: "#061d35",
          deep: "#0a355d",
          blue: "#0f8fc7",
          aqua: "#7bdff2",
          ice: "#edfaff",
          pearl: "#f8fbfd",
          ink: "#102030"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(6, 29, 53, 0.18)",
        soft: "0 14px 40px rgba(6, 29, 53, 0.1)"
      },
      backgroundImage: {
        "lago-radial": "radial-gradient(circle at 15% 20%, rgba(123, 223, 242, 0.22), transparent 28%), linear-gradient(135deg, #061d35 0%, #0a355d 52%, #0f8fc7 100%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
