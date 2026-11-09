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
        canvas: {
          DEFAULT: "#EDE8E0",
          light: "#F7F5F0",
          card: "#FFFFFF",
          muted: "#E2DDD4",
          border: "#D5CEC2",
        },
        blender: {
          dark: "#1E1E1E",
          panel: "#282828",
          gizmoX: "#DA251C",
          gizmoY: "#4A9460",
          gizmoZ: "#4565D6",
          orange: "#DB5F2D",
          yellow: "#E9C76A",
        },
      },
      fontFamily: {
        bagel: ["'Bagel Fat One'", "cursive", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        retro: "4px 4px 0px 0px #1A1A1A",
        retroSm: "2px 2px 0px 0px #1A1A1A",
        retroLg: "6px 6px 0px 0px #1A1A1A",
      },
    },
  },
  plugins: [],
};

export default config;
