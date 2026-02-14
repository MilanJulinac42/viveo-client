/**
 * @fileoverview Reusable max-width container with consistent padding.
 * Wraps page content with responsive horizontal padding and max-width constraint.
 *
 * @example
 * ```tsx
 * <Container>Content goes here</Container>
 * <Container size="sm">Narrow content</Container>
 * ```
 */

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Available container width constraints */
type ContainerSize = "sm" | "md" | "lg" | "full";

interface ContainerProps {
  /** Container content */
  children: ReactNode;
  /** Maximum width constraint */
  size?: ContainerSize;
  /** Additional CSS classes */
  className?: string;
}

/** Tailwind max-width classes for each size */
const sizeStyles: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-full",
};

/**
 * Centered container with responsive padding and configurable max-width.
 * Use as a wrapper for page sections to maintain consistent layout.
 *
 * @param props - Container properties including size constraint
 * @returns Centered, padded container element
 */
export default function Container({
  children,
  size = "lg",
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
}
