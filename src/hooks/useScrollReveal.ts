/**
 * @fileoverview Hook for scroll-triggered reveal animations.
 * Uses Framer Motion's useInView to detect when an element enters the viewport,
 * then returns animation props for a fade-in + slide-up effect.
 */

"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealOptions {
  /** How far the element slides up from (in pixels). Default 40 */
  offset?: number;
  /** Animation duration in seconds. Default 0.6 */
  duration?: number;
  /** Delay before animation starts in seconds. Default 0 */
  delay?: number;
  /** Whether the animation should repeat when scrolling back. Default false */
  once?: boolean;
  /** Viewport margin to trigger earlier/later. Default "-100px" */
  margin?: string;
}

/**
 * Returns a ref and CSS style object for scroll-triggered reveal animations.
 * Attach the ref to the element you want to animate.
 *
 * @param options - Configuration for the reveal animation
 * @returns Tuple of [ref, isInView] — attach ref to the element
 *
 * @example
 * ```tsx
 * const [ref, isInView] = useScrollReveal({ delay: 0.2 });
 * <div ref={ref} style={{ opacity: isInView ? 1 : 0 }}>...</div>
 * ```
 */
export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { once = true, margin = "-100px" } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });

  return [ref, isInView] as const;
}
