import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          900: "#020611",
          800: "#060E24",
          700: "#0F1A36",
          600: "#1A294A",
        },
        neon: {
          400: "#1DE9B6",
          500: "#00F260",
          600: "#00B849",
        },
        brand: {
          primary: "#00F260",
          accent: "#0080ff",
          blue: "#3b7ef8",
          "blue-bright": "#5b9aff",
        },
      },
      animation: {
        "scroll-left": "scrollLeft 28s linear infinite",
        "scroll-left-slow": "scrollLeft 48s linear infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "live-pulse": "livePulse 1.8s ease-in-out infinite",
        "flow-line": "flowLine 2.5s linear infinite",
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.65)" },
        },
        livePulse: {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(74,222,128,0.5)",
          },
          "60%": { opacity: "0.6", boxShadow: "0 0 0 8px rgba(74,222,128,0)" },
        },
        flowLine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(59,126,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,126,248,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
