/**
 * @fileoverview Reusable page section component with title, subtitle, and background variants.
 * Provides consistent vertical spacing, headings, and optional background colors.
 * Titles use gradient-accented styling for strong visual presence.
 *
 * @example
 * ```tsx
 * <Section title="Popularne zvezde" subtitle="Pogledaj najtraženije ličnosti">
 *   <CelebrityGrid />
 * </Section>
 *
 * <Section background="gray" title="Kako funkcioniše">
 *   <Steps />
 * </Section>
 * ```
 */

import { cn } from "@/lib/utils";
import Container from "./Container";
import type { ReactNode } from "react";

/** Background color presets for sections */
type SectionBackground = "white" | "gray" | "dark" | "primary";

interface SectionProps {
  /** Section heading text */
  title?: string;
  /** Section subheading text */
  subtitle?: string;
  /** Section content */
  children: ReactNode;
  /** Background color variant */
  background?: SectionBackground;
  /** HTML id attribute for anchor linking */
  id?: string;
  /** Additional CSS classes */
  className?: string;
}

/** Tailwind classes for each background variant */
const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white",
  gray: "bg-slate-50",
  dark: "bg-slate-900 text-white",
  primary: "bg-primary-500 text-white",
};

/** Title styles per background variant - strong, visible colors */
const titleStyles: Record<SectionBackground, string> = {
  white: "text-slate-900",
  gray: "text-slate-900",
  dark: "text-white",
  primary: "text-white",
};

/** Subtitle text color per background variant */
const subtitleStyles: Record<SectionBackground, string> = {
  white: "text-slate-500",
  gray: "text-slate-500",
  dark: "text-slate-300",
  primary: "text-primary-100",
};

/**
 * Full-width page section with optional heading, subheading, and background.
 * Wraps children in a Container for consistent max-width and padding.
 * Titles feature a decorative underline accent for visual impact.
 *
 * @param props - Section configuration including title, subtitle, and background
 * @returns Styled section element with centered content
 */
export default function Section({
  title,
  subtitle,
  children,
  background = "white",
  id,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-24",
        backgroundStyles[background],
        className
      )}
    >
      <Container>
        {(title || subtitle) && (
          <div className="mb-14 text-center">
            {title && (
              <>
                <h2
                  className={cn(
                    "text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
                    titleStyles[background]
                  )}
                >
                  {title}
                </h2>
                {/* Decorative underline */}
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-secondary-400" />
                  <span className="h-1 w-12 rounded-full bg-primary-500" />
                  <span className="h-1 w-6 rounded-full bg-secondary-400" />
                </div>
              </>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mx-auto mt-4 max-w-2xl text-lg",
                  subtitleStyles[background]
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
