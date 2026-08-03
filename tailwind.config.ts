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
      screens: {
        // Playground shell (app/(marketing)/playground): the point where a
        // ~360px phone frame + a wider web-app frame + gap + page gutters
        // stop fitting --container-wide (1280px) comfortably. Not one of
        // the default sm/md/lg/xl steps, so it's named rather than an
        // arbitrary value repeated at every call site.
        pg: "980px",
      },
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
        // New brand tokens (styles/tokens.css), namespaced under `athlo` so
        // nothing above (navy/ink/lime/grey) is renamed or overridden.
        athlo: {
          "bg-base": "var(--color-bg-base)",
          "bg-raised": "var(--color-bg-raised)",
          "bg-overlay": "var(--color-bg-overlay)",
          "bg-inset": "var(--color-bg-inset)",
          "line-subtle": "var(--color-line-subtle)",
          "line-strong": "var(--color-line-strong)",
          lime: "var(--color-lime)",
          "lime-soft": "var(--color-lime-soft)",
          "lime-dim": "var(--color-lime-dim)",
          "text-primary": "var(--color-text-primary)",
          "text-body": "var(--color-text-body)",
          "text-secondary": "var(--color-text-secondary)",
          "text-disabled": "var(--color-text-disabled)",
          "text-on-lime": "var(--color-text-on-lime)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        // New brand tokens (styles/tokens.css) — additive, does not touch `sans` above.
        display: ["var(--font-family-display)"],
        body: ["var(--font-family-text)"],
      },
      fontSize: {
        "athlo-display-xl": [
          "var(--font-size-display-xl)",
          { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" },
        ],
        "athlo-display-l": [
          "var(--font-size-display-l)",
          { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" },
        ],
        "athlo-h1": [
          "var(--font-size-h1)",
          { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-heading)" },
        ],
        "athlo-h2": [
          "var(--font-size-h2)",
          { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-heading)" },
        ],
        "athlo-h3": [
          "var(--font-size-h3)",
          { lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)" },
        ],
        "athlo-body-lg": ["var(--font-size-body-lg)", { lineHeight: "var(--leading-body)" }],
        "athlo-body": ["var(--font-size-body)", { lineHeight: "var(--leading-body)" }],
        "athlo-label": [
          "var(--font-size-label)",
          { lineHeight: "var(--leading-none)", letterSpacing: "var(--tracking-label)" },
        ],
        "athlo-numeral": ["var(--font-size-numeral)", { lineHeight: "var(--leading-none)" }],
      },
      borderRadius: {
        "athlo-sm": "var(--radius-sm)",
        "athlo-md": "var(--radius-md)",
        "athlo-lg": "var(--radius-lg)",
        "athlo-xl": "var(--radius-xl)",
        "athlo-pill": "var(--radius-pill)",
      },
      boxShadow: {
        "athlo-card": "var(--shadow-card)",
        "athlo-pop": "var(--shadow-pop)",
        "athlo-lime": "var(--shadow-lime)",
      },
    },
  },
  plugins: [],
};
export default config;
