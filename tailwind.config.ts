import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        primary: "var(--primary)",
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
  ],
  darkMode: "class",
  daisyui: {
    themes: false,
  },
} satisfies Config;
