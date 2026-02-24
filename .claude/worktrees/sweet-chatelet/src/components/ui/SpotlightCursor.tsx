/**
 * @fileoverview Radial gradient spotlight that follows the mouse cursor.
 * Designed for dark sections (Hero, Categories, CTA) to add depth.
 * Automatically disabled on touch devices.
 *
 * @example
 * ```tsx
 * <section className="relative">
 *   <SpotlightCursor />
 *   {/* section content *\/}
 * </section>
 * ```
 */

"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCursorProps {
  /** Radius of the spotlight in pixels. Default 200 */
  radius?: number;
  /** Opacity of the spotlight (0-1). Default 0.04 */
  opacity?: number;
  /** Spotlight color. Default "255,255,255" (white) */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Overlay that renders a soft radial gradient spotlight
 * following the user's cursor. Hidden on touch devices.
 *
 * Must be placed inside a `position: relative` parent.
 *
 * @param props - Spotlight configuration
 * @returns Cursor-following spotlight overlay
 */
export default function SpotlightCursor({
  radius = 200,
  opacity = 0.04,
  color = "255,255,255",
  className,
}: SpotlightCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [],
  );

  const handleEnter = useCallback(() => setIsVisible(true), []);
  const handleLeave = useCallback(() => setIsVisible(false), []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        "pointer-events-auto absolute inset-0 z-[1] hidden lg:block",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute h-full w-full transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, rgba(${color}, ${opacity}), transparent 80%)`,
        }}
      />
    </div>
  );
}
