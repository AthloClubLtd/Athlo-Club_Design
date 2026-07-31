/**
 * Maps Tailwind utilities onto the tokens defined in tokens.css.
 * Every value below is `var(--token-name)` — never a literal hex/px — so
 * tokens.css stays the single source of truth (see ARCHITECTURE.md §1).
 *
 * Note on spacing: Tailwind's default 4px-based numeric spacing scale
 * (p-1=4px … p-32=128px) already lands on every value in the --space-*
 * scale (space-5=24px is Tailwind's `6`, space-9=96px is `24`, etc.), so
 * spacing intentionally has no override here — use Tailwind's native
 * numeric utilities directly.
 *
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--color-bg-base)",
          raised: "var(--color-bg-raised)",
          overlay: "var(--color-bg-overlay)",
          inset: "var(--color-bg-inset)",
        },
        line: {
          subtle: "var(--color-line-subtle)",
          strong: "var(--color-line-strong)",
        },
        lime: {
          DEFAULT: "var(--color-lime)",
          soft: "var(--color-lime-soft)",
          dim: "var(--color-lime-dim)",
          glow: "var(--color-lime-glow)",
          tint: "var(--color-lime-tint)",
        },
        ink: {
          primary: "var(--color-text-primary)",
          body: "var(--color-text-body)",
          secondary: "var(--color-text-secondary)",
          disabled: "var(--color-text-disabled)",
          onlime: "var(--color-text-on-lime)",
        },
      },
      fontFamily: {
        display: ["var(--font-family-display)"],
        text: ["var(--font-geist-sans)", "var(--font-family-text)"],
      },
      fontSize: {
        "display-xl": ["var(--font-size-display-xl)", { lineHeight: "var(--leading-none)" }],
        "display-l": ["var(--font-size-display-l)", { lineHeight: "var(--leading-none)" }],
        h1: ["var(--font-size-h1)", { lineHeight: "var(--leading-tight)" }],
        h2: ["var(--font-size-h2)", { lineHeight: "var(--leading-tight)" }],
        h3: ["var(--font-size-h3)", { lineHeight: "var(--leading-tight)" }],
        "body-lg": ["var(--font-size-body-lg)", { lineHeight: "var(--leading-body)" }],
        body: ["var(--font-size-body)", { lineHeight: "var(--leading-body)" }],
        label: ["var(--font-size-label)", { lineHeight: "var(--leading-none)" }],
        numeral: ["var(--font-size-numeral)", { lineHeight: "var(--leading-none)" }],
      },
      letterSpacing: {
        display: "var(--tracking-display)",
        heading: "var(--tracking-heading)",
        tight: "var(--tracking-tight)",
        label: "var(--tracking-label)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        pop: "var(--shadow-pop)",
        lime: "var(--shadow-lime)",
      },
      maxWidth: {
        container: "var(--container-max)",
        "container-wide": "var(--container-wide)",
      },
      padding: {
        gutter: "var(--gutter)",
      },
      backdropBlur: {
        nav: "14px",
      },
    },
  },
  plugins: [],
};
