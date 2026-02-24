/**
 * @fileoverview Reusable Badge component for tags, categories, and labels.
 *
 * @example
 * ```tsx
 * <Badge>Glumci</Badge>
 * <Badge variant="primary">Verifikovan</Badge>
 * <Badge variant="accent" size="sm">Novo</Badge>
 * ```
 */

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Available badge color variants */
type BadgeVariant = "default" | "primary" | "secondary" | "accent";

/** Available badge size options */
type BadgeSize = "sm" | "md";

interface BadgeProps {
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Additional CSS classes */
  className?: string;
  /** Badge content */
  children: ReactNode;
}

/** Tailwind classes mapped to each variant */
const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700",
  primary: "bg-primary-50 text-primary-700",
  secondary: "bg-secondary-50 text-secondary-700",
  accent: "bg-accent-50 text-accent-700",
};

/** Tailwind classes mapped to each size */
const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

/**
 * Small label component for categories, tags, and status indicators.
 *
 * @param props - Badge properties including variant, size, and content
 * @returns Styled badge/tag element
 */
export default function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
