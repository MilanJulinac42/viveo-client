/**
 * @fileoverview Animated floating decorative elements for visual richness.
 * CSS-only animations for stars, circles, and sparkles that float around sections.
 *
 * @example
 * ```tsx
 * <FloatingElements variant="stars" />
 * <FloatingElements variant="circles" />
 * ```
 */

import { cn } from "@/lib/utils";

type FloatingVariant = "stars" | "circles" | "sparkles";

interface FloatingElementsProps {
  /** Type of floating elements */
  variant?: FloatingVariant;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Decorative animated floating elements to add visual life to sections.
 * Uses pure CSS animations — no JavaScript runtime cost.
 *
 * @param props - Configuration for floating element type and position
 * @returns Absolutely positioned container with animated elements
 */
export default function FloatingElements({
  variant = "stars",
  className,
}: FloatingElementsProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {variant === "stars" && <Stars />}
      {variant === "circles" && <Circles />}
      {variant === "sparkles" && <Sparkles />}
    </div>
  );
}

function Stars() {
  return (
    <>
      <span className="absolute left-[10%] top-[20%] text-2xl opacity-20 animate-bounce" style={{ animationDuration: "3s" }}>⭐</span>
      <span className="absolute right-[15%] top-[15%] text-lg opacity-15 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }}>✨</span>
      <span className="absolute left-[70%] top-[60%] text-xl opacity-10 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>⭐</span>
      <span className="absolute left-[25%] bottom-[20%] text-sm opacity-20 animate-bounce" style={{ animationDuration: "4.5s", animationDelay: "2s" }}>✨</span>
      <span className="absolute right-[8%] bottom-[30%] text-2xl opacity-10 animate-bounce" style={{ animationDuration: "5s", animationDelay: "1.5s" }}>🌟</span>
    </>
  );
}

function Circles() {
  return (
    <>
      <div className="absolute -left-10 top-[30%] h-40 w-40 rounded-full bg-primary-400/5 animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute -right-10 top-[10%] h-32 w-32 rounded-full bg-secondary-400/5 animate-pulse" style={{ animationDuration: "5s", animationDelay: "1s" }} />
      <div className="absolute left-[50%] bottom-[10%] h-24 w-24 rounded-full bg-accent-400/5 animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }} />
      <div className="absolute left-[20%] top-[60%] h-16 w-16 rounded-full border-2 border-primary-200/20 animate-spin" style={{ animationDuration: "20s" }} />
      <div className="absolute right-[25%] bottom-[25%] h-20 w-20 rounded-full border-2 border-secondary-200/15 animate-spin" style={{ animationDuration: "25s" }} />
    </>
  );
}

function Sparkles() {
  return (
    <>
      <div className="absolute left-[5%] top-[25%] h-2 w-2 rounded-full bg-secondary-400 opacity-30 animate-ping" style={{ animationDuration: "2s" }} />
      <div className="absolute right-[10%] top-[35%] h-1.5 w-1.5 rounded-full bg-primary-400 opacity-25 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
      <div className="absolute left-[40%] top-[15%] h-2 w-2 rounded-full bg-accent-400 opacity-20 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "1s" }} />
      <div className="absolute right-[30%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-secondary-300 opacity-30 animate-ping" style={{ animationDuration: "3.5s", animationDelay: "1.5s" }} />
      <div className="absolute left-[65%] bottom-[35%] h-2.5 w-2.5 rounded-full bg-primary-300 opacity-20 animate-ping" style={{ animationDuration: "4s", animationDelay: "2s" }} />
      <div className="absolute left-[85%] top-[55%] h-1 w-1 rounded-full bg-accent-300 opacity-35 animate-ping" style={{ animationDuration: "2.8s", animationDelay: "0.8s" }} />
    </>
  );
}
