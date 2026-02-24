/**
 * @fileoverview Animated number counter that counts up from 0.
 * Triggers when the element scrolls into view.
 *
 * @example
 * ```tsx
 * <AnimatedCounter target={500} suffix="+" />
 * <AnimatedCounter target={4.9} decimals={1} />
 * <AnimatedCounter target={10000} separator="." suffix="+" />
 * ```
 */

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Target number to count up to */
  target: number;
  /** Number of decimal places. Default 0 */
  decimals?: number;
  /** Thousands separator character. Default "." */
  separator?: string;
  /** Text to show after the number (e.g. "+", "%") */
  suffix?: string;
  /** Text to show before the number */
  prefix?: string;
  /** Animation duration in seconds. Default 2 */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Displays a number that animates from 0 to the target value
 * when the component scrolls into the viewport.
 *
 * @param props - Counter configuration
 * @returns Animated number display span
 */
export default function AnimatedCounter({
  target,
  decimals = 0,
  separator = ".",
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      const formatted = formatNumber(latest, decimals, separator);
      setDisplayValue(formatted);
    });

    return unsubscribe;
  }, [springValue, decimals, separator]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

/**
 * Formats a number with specified decimal places and thousands separator.
 *
 * @param value - Number to format
 * @param decimals - Decimal places
 * @param separator - Thousands separator
 * @returns Formatted string
 */
function formatNumber(value: number, decimals: number, separator: string): string {
  const fixed = value.toFixed(decimals);

  if (!separator) return fixed;

  const [intPart, decPart] = fixed.split(".");
  const withSeparator = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return decPart ? `${withSeparator},${decPart}` : withSeparator;
}
