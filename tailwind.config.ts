import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          DEFAULT: "#0F1B22",
          800: "#13232C",
          700: "#182E38",
        },
        ink: "#0B1417",
        lime: {
          DEFAULT: "#C6FF3A",
          600: "#A6E619",
          700: "#8FC916",
        },
        grey: {
          400: "#8A97A0",
          300: "#B7C0C6",
          100: "#E7EBEC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
