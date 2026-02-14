/**
 * @fileoverview Reusable Avatar component for profile images.
 * Supports multiple sizes and an optional verified badge overlay.
 *
 * @example
 * ```tsx
 * <Avatar src="/img/profile.jpg" alt="Marko" size="lg" verified />
 * <Avatar src="" alt="Jelena" size="md" />
 * ```
 */

import { cn, getPlaceholderImage } from "@/lib/utils";
import Image from "next/image";

/** Available avatar size options */
type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  /** Image source URL. Falls back to placeholder if empty. */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Show verified badge overlay */
  verified?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Pixel dimensions and styles for each size */
const sizeConfig: Record<AvatarSize, { pixels: number; className: string }> = {
  sm: { pixels: 32, className: "h-8 w-8" },
  md: { pixels: 48, className: "h-12 w-12" },
  lg: { pixels: 64, className: "h-16 w-16" },
  xl: { pixels: 96, className: "h-24 w-24" },
};

/** Verified badge size relative to avatar */
const badgeSizeStyles: Record<AvatarSize, string> = {
  sm: "h-3 w-3 -bottom-0.5 -right-0.5",
  md: "h-4 w-4 -bottom-0.5 -right-0.5",
  lg: "h-5 w-5 -bottom-0.5 -right-0.5",
  xl: "h-6 w-6 -bottom-1 -right-1",
};

/**
 * Circular avatar image component with optional verification indicator.
 * Automatically generates a placeholder when no image source is provided.
 *
 * @param props - Avatar properties including source, size, and verification status
 * @returns Avatar element with optional verified badge
 */
export default function Avatar({
  src,
  alt,
  size = "md",
  verified = false,
  className,
}: AvatarProps) {
  const config = sizeConfig[size];
  const imageSrc = src || getPlaceholderImage(alt, config.pixels * 2);

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <Image
        src={imageSrc}
        alt={alt}
        width={config.pixels}
        height={config.pixels}
        className={cn(
          "rounded-full object-cover ring-2 ring-white",
          config.className
        )}
        unoptimized={!src}
      />
      {verified && (
        <span
          className={cn(
            "absolute flex items-center justify-center rounded-full bg-primary-500 text-white ring-2 ring-white",
            badgeSizeStyles[size]
          )}
          aria-label="Verifikovan profil"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-[60%] w-[60%]"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </div>
  );
}
