/**
 * @fileoverview Subtle curved section dividers for seamless transitions.
 * Uses gentle curves that match the background colors of adjacent sections,
 * creating smooth, organic boundaries instead of hard lines.
 *
 * @example
 * ```tsx
 * {/* Place at top of a section to curve INTO it from previous section *\/}
 * <CurvedDivider position="top" fillColor="fill-slate-50" />
 *
 * {/* Place at bottom of a section to curve OUT of it *\/}
 * <CurvedDivider position="bottom" fillColor="fill-white" />
 * ```
 */

import { cn } from "@/lib/utils";

interface CurvedDividerProps {
  /** Whether this curve sits at the top or bottom of a section */
  position: "top" | "bottom";
  /** Tailwind fill class — should match the CURRENT section's background */
  fillColor?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Gentle elliptical curve that overlaps adjacent sections.
 * Place at the top or bottom edge of a section to replace hard borders
 * with organic, flowing shapes.
 *
 * @param props - Position, fill color, and optional className
 * @returns Absolutely positioned SVG curve
 */
export default function CurvedDivider({
  position,
  fillColor = "fill-white",
  className,
}: CurvedDividerProps) {
  const isTop = position === "top";

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 z-10 w-full overflow-hidden leading-[0]",
        isTop ? "-top-1" : "-bottom-1",
        isTop && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className={cn("relative block h-[80px] w-full sm:h-[100px] lg:h-[140px]", fillColor)}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="720" cy="100" rx="900" ry="100" />
      </svg>
    </div>
  );
}
