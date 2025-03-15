import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import daisyui from "daisyui";
import scrollbarHide from "tailwind-scrollbar-hide";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          dark: "var(--background-dark)",
        },
        text: {
          DEFAULT: "var(--text)",
          dark: "var(--text-dark)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        border: "var(--border)",
        card: {
          DEFAULT: "var(--card)",
          hover: "var(--card-hover)",
        },
      },
      scrollbar: {
        thin: "thin",
        thumb: "rounded-full bg-gray-300 hover:bg-gray-400",
        track: "rounded-full bg-gray-100",
      },
      container: {
        screens: {
          DEFAULT: "1500px",
        },
        center: true,
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate))" },
          "50%": { transform: "translateY(-20px) rotate(var(--tw-rotate))" },
        },
        glow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.8)" },
        },
      },
      fadeIn: {
        "0%": { opacity: "0", transform: "scale(0.95)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },

      float: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-20px)" },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        fadeIn: "fadeIn 1s ease-in forwards",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        "glow-delayed": "glow 4s ease-in-out 2s infinite",
      },
    },
  },
  plugins: [
    daisyui,
    plugin(function ({ addBase }) {
      addBase({
        "input:-webkit-autofill": {
          "background-clip": "text !important",
          "-webkit-background-clip": "text !important",
          "-webkit-text-fill-color": "var(--text) !important",
          "-webkit-box-shadow":
            "0 0 0px 1000px var(--background) inset !important",
        },
        "input:-webkit-autofill:focus": {
          "-webkit-box-shadow":
            "0 0 0px 1000px var(--background) inset !important",
        },
      });
    }),
    scrollbarHide,
    typography,
  ],
  darkMode: "class",
  daisyui: {
    themes: false,
  },
} satisfies Config;
