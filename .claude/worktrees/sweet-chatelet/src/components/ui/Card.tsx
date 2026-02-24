/**
 * @fileoverview Composable Card component with sub-components.
 * Uses compound component pattern for flexible card layouts.
 *
 * @example
 * ```tsx
 * <Card hoverable>
 *   <CardImage src="/img.jpg" alt="Celebrity" aspectRatio="square" />
 *   <CardBody>
 *     <h3>Marko Nikolić</h3>
 *     <p>Glumac</p>
 *   </CardBody>
 *   <CardFooter>
 *     <span>3.500 RSD</span>
 *   </CardFooter>
 * </Card>
 * ```
 */

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Card (root)
// ---------------------------------------------------------------------------

/** Available card padding options */
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  /** Card content (use CardImage, CardBody, CardFooter) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to apply hover elevation effect */
  hoverable?: boolean;
  /** Internal padding size */
  padding?: CardPadding;
  /** Enable glassmorphism (frosted translucent appearance) */
  glass?: boolean;
}

/** Tailwind classes for card padding */
const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

/**
 * Root card container providing consistent styling, shadow, and optional hover effect.
 * Supports a `glass` prop for glassmorphism (frosted-glass) styling.
 *
 * @param props - Card container properties
 * @returns Styled card wrapper element
 */
export function Card({
  children,
  className,
  hoverable = false,
  padding = "none",
  glass = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        glass
          ? "border border-white/30 bg-white/60 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "border border-slate-100 bg-white",
        hoverable &&
          "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-100",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardImage
// ---------------------------------------------------------------------------

/** Aspect ratio presets for card images */
type AspectRatio = "video" | "square" | "portrait";

interface CardImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Aspect ratio preset */
  aspectRatio?: AspectRatio;
  /** Additional CSS classes */
  className?: string;
}

/** Tailwind aspect ratio classes */
const aspectStyles: Record<AspectRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
};

/**
 * Image section for the Card component with consistent aspect ratio handling.
 *
 * @param props - Image properties including source, alt, and aspect ratio
 * @returns Responsive image container
 */
export function CardImage({
  src,
  alt,
  aspectRatio = "video",
  className,
}: CardImageProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", aspectStyles[aspectRatio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        unoptimized
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardBody
// ---------------------------------------------------------------------------

interface CardBodyProps {
  /** Body content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Main content area of the Card component.
 *
 * @param props - Body content and optional styling
 * @returns Padded content container
 */
export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={cn("px-4 py-3", className)}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CardFooter
// ---------------------------------------------------------------------------

interface CardFooterProps {
  /** Footer content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Footer area of the Card, typically used for actions or pricing.
 * Separated from body with a top border.
 *
 * @param props - Footer content and optional styling
 * @returns Styled footer container
 */
export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "border-t border-slate-100 px-4 py-3",
        className
      )}
    >
      {children}
    </div>
  );
}
