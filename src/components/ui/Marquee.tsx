/**
 * @fileoverview CSS-only infinite horizontal scroll ticker.
 * Duplicates children for seamless looping.
 *
 * @example
 * ```tsx
 * <Marquee speed={30}>
 *   <span>Item 1</span>
 *   <span>Item 2</span>
 * </Marquee>
 * ```
 */

import { cn } from "@/lib/utils";

interface MarqueeProps {
  /** Content to scroll — will be duplicated for seamless loop */
  children: React.ReactNode;
  /** Speed in seconds for one full loop. Default 30 */
  speed?: number;
  /** Scroll direction. Default "left" */
  direction?: "left" | "right";
  /** Pause animation on hover. Default true */
  pauseOnHover?: boolean;
  /** Additional CSS classes for the outer wrapper */
  className?: string;
}

/**
 * Infinite horizontal scroll ticker using CSS animation.
 * Content is duplicated to create a seamless loop effect.
 *
 * @param props - Marquee configuration
 * @returns Animated horizontal ticker
 */
export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        className,
      )}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-inherit" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-inherit" />

      {/* Two identical strips side by side */}
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 items-center gap-8",
            direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{ animationDuration: `${speed}s` }}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
