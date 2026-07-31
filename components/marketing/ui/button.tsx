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
