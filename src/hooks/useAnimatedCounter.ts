/**
 * @fileoverview Hook for animated number counting.
 * Uses Framer Motion's useSpring and useMotionValue to smoothly
 * count from 0 to a target number when the element enters the viewport.
 */

"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, MotionValue } from "framer-motion";

interface UseAnimatedCounterOptions {
  /** Target number to count up to */
  target: number;
  /** Animation duration in seconds. Default 2 */
  duration?: number;
  /** Number of decimal places. Default 0 */
  decimals?: number;
  /** Whether to trigger only once. Default true */
  once?: boolean;
}

/**
 * Animates a number from 0 to target when the element enters the viewport.
 * Returns a ref (attach to container) and a MotionValue (read for display).
 *
 * @param options - Counter configuration
 * @returns Tuple of [ref, motionValue, isInView]
 *
 * @example
 * ```tsx
 * const [ref, value, isInView] = useAnimatedCounter({ target: 500 });
 * ```
 */
export function useAnimatedCounter(options: UseAnimatedCounterOptions) {
  const { target, duration = 2, decimals = 0, once = true } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  return [ref, springValue, isInView] as const;
}

export type { MotionValue };
