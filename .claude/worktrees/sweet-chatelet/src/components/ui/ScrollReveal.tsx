/**
 * @fileoverview Scroll-triggered reveal wrapper component.
 * Wraps any content and animates it in (fade + slide up) when scrolling into view.
 * Uses Framer Motion for smooth, performant animations.
 *
 * @example
 * ```tsx
 * <ScrollReveal>
 *   <h2>This fades in!</h2>
 * </ScrollReveal>
 *
 * <ScrollReveal delay={0.2} direction="left">
 *   <Card>Slides in from left</Card>
 * </ScrollReveal>
 * ```
 */

"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  /** Content to reveal */
  children: ReactNode;
  /** Animation delay in seconds. Default 0 */
  delay?: number;
  /** Animation duration in seconds. Default 0.6 */
  duration?: number;
  /** Direction to slide in from. Default "up" */
  direction?: "up" | "down" | "left" | "right";
  /** Slide distance in pixels. Default 40 */
  offset?: number;
  /** Only animate once. Default true */
  once?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Viewport margin for earlier trigger. Default "-80px" */
  margin?: string;
}

/** Map direction to initial translate values */
const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

/**
 * Wrapper that reveals its children with a fade + slide animation
 * when they scroll into the viewport.
 *
 * @param props - Reveal animation configuration
 * @returns Animated wrapper div
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  offset = 40,
  once = true,
  className,
  margin = "-80px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });

  const dir = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x: dir.x * offset, y: dir.y * offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dir.x * offset, y: dir.y * offset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
