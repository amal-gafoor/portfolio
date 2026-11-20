import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "solid" | "ghost";
  children: ReactNode;
};

export function Button({ variant = "solid", className = "", children, ...rest }: Props) {
  const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-300 active:scale-[0.98]";
  const styles =
    variant === "solid"
      ? "bg-fg text-bg hover:opacity-85"
      : "glass glass-hover text-fg";
  return (
    <a className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </a>
  );
}
