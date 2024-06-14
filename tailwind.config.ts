import { Bebas_Neue, Notable } from "next/font/google";
import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    colors: {
      dark: {
        50: "#d9d9d9",
        100: "#f1f1f1",
        200: "#aaaaaa",
        300: "#3f3f3f",
        400: "#272727",
        500: "#282828",
        900: "#0f0f0f",
        950: "#121212"
      },
    accent: {
      500: "#314bcd"
    },
    }
    },

      fontFamily: {
        Bebas_Neue: ['Bebas Neue']
      },
  },
  plugins: [
    flowbite.plugin(),

  ],
  darkMode: "class"
};
export default config;
