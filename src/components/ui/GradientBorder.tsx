/**
 * @fileoverview Animated rotating conic-gradient border wrapper.
 * Creates a visually striking border effect that rotates continuously.
 *
 * @example
 * ```tsx
 * <GradientBorder>
 *   <div className="p-6">Content inside</div>
 * </GradientBorder>
 * ```
 */

import { cn } from "@/lib/utils";

interface GradientBorderProps {
  /** Content to wrap with the gradient border */
  children: React.ReactNode;
  /** Border width in pixels. Default 2 */
  borderWidth?: number;
  /** Border radius class. Default "rounded-2xl" */
  rounded?: string;
  /** Animation speed in seconds. Default 3 */
  speed?: number;
  /** Only show animation on hover. Default false */
  onlyOnHover?: boolean;
  /** Background color class for inner container. Default "bg-white" */
  bgClass?: string;
  /** Additional classes on the outer wrapper */
  className?: string;
}

/**
 * Wraps children with a rotating conic-gradient border effect.
 * Uses CSS `@property` animation for smooth angle interpolation.
 *
 * @param props - Gradient border configuration
 * @returns Wrapper with animated gradient border
 */
export default function GradientBorder({
  children,
  borderWidth = 2,
  rounded = "rounded-2xl",
  speed = 3,
  onlyOnHover = false,
  bgClass = "bg-white",
  className,
}: GradientBorderProps) {
  return (
    <div
      className={cn(
        "group/gb relative",
        rounded,
        "animate-gradient-border",
        onlyOnHover && "[animation-play-state:paused] hover:[animation-play-state:running]",
        className,
      )}
      style={
        {
          padding: `${borderWidth}px`,
          animationDuration: `${speed}s`,
          background:
            "conic-gradient(from var(--border-angle, 0deg), var(--primary-400), var(--secondary-400), var(--accent-400), var(--primary-400))",
        } as React.CSSProperties
      }
    >
      <div className={cn("relative h-full w-full", rounded, bgClass)}>
        {children}
      </div>
    </div>
  );
}
