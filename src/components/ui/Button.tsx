/**
 * @fileoverview Reusable Button component with multiple variants and sizes.
 * Supports primary, secondary, outline, and ghost styles.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">Pronađi zvezdu</Button>
 * <Button variant="outline">Saznaj više</Button>
 * <Button variant="ghost" size="sm">Nazad</Button>
 * ```
 */

import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Available button visual variants */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

/** Available button size options */
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Button content */
  children: ReactNode;
}

/** Tailwind classes mapped to each variant */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-md hover:shadow-lg",
  secondary:
    "bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-md hover:shadow-lg",
  outline:
    "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
  ghost:
    "text-primary-500 hover:bg-primary-50 active:bg-primary-100",
};

/** Tailwind classes mapped to each size */
const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

/**
 * Primary UI button component.
 * Extends native HTML button with consistent styling and variants.
 *
 * @param props - Button properties including variant, size, and native button attributes
 * @returns Styled button element
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
