import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "rounded-athlo-md bg-athlo-lime px-[var(--space-5)] py-[var(--space-3)] font-body font-semibold text-athlo-text-on-lime transition-all hover:-translate-y-px hover:shadow-athlo-lime",
  secondary:
    "rounded-athlo-md border border-athlo-line-strong px-[var(--space-5)] py-[var(--space-3)] font-body font-semibold text-athlo-text-primary transition-colors hover:border-athlo-text-secondary",
  ghost: "font-body font-medium text-athlo-lime transition-opacity hover:opacity-80",
};

export function Button({
  variant = "primary",
  className = "",
  href,
  children,
}: {
  variant?: Variant;
  className?: string;
  href: string;
  children: React.ReactNode;
}) {
  // External destinations (Typeforms etc.) open in a new tab — detected
  // from the href itself rather than a separate prop, so every current
  // and future external CTA gets this automatically.
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${variantClasses[variant]} ${className}`.trim()}
      >
        {children}
      </a>
    );
  }

  // mailto:/tel: aren't routes — next/link's client-side router doesn't
  // handle these schemes, so they need a plain anchor too. No target/rel
  // here: they don't open a new tab, they hand off to the OS mail/phone app.
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={`${variantClasses[variant]} ${className}`.trim()}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </Link>
  );
}

export function ButtonAsButton({
  variant = "primary",
  className = "",
  children,
  ...rest
}: {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button className={`${variantClasses[variant]} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
