/**
 * @fileoverview Star rating display component.
 * Renders filled, half, and empty stars based on a numeric rating value.
 *
 * @example
 * ```tsx
 * <StarRating rating={4.5} />
 * <StarRating rating={3} maxStars={5} showValue size="sm" />
 * ```
 */

import { cn } from "@/lib/utils";

/** Available star display sizes */
type StarSize = "sm" | "md";

interface StarRatingProps {
  /** Rating value (e.g., 4.5) */
  rating: number;
  /** Maximum number of stars to display */
  maxStars?: number;
  /** Size of the stars */
  size?: StarSize;
  /** Whether to show the numeric value next to stars */
  showValue?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Tailwind classes for star sizes */
const sizeStyles: Record<StarSize, { star: string; text: string }> = {
  sm: { star: "h-4 w-4", text: "text-xs" },
  md: { star: "h-5 w-5", text: "text-sm" },
};

/**
 * Renders a single star SVG icon.
 * Supports filled, half-filled, and empty states.
 */
function Star({ filled, half, className }: { filled: boolean; half: boolean; className: string }) {
  if (half) {
    return (
      <svg viewBox="0 0 20 20" className={className}>
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#halfGrad)"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        className={filled ? "" : "opacity-0"}
      />
      {!filled && (
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          fill="#e2e8f0"
        />
      )}
    </svg>
  );
}

/**
 * Displays a star-based rating visualization.
 * Supports fractional ratings by rendering half-filled stars.
 *
 * @param props - Star rating configuration
 * @returns Row of star icons with optional numeric value
 */
export default function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  showValue = false,
  className,
}: StarRatingProps) {
  const styles = sizeStyles[size];

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`Ocena: ${rating} od ${maxStars}`}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: maxStars }, (_, i) => {
          const filled = i < Math.floor(rating);
          const half = !filled && i < rating;
          return (
            <Star
              key={i}
              filled={filled}
              half={half}
              className={cn(
                styles.star,
                filled || half ? "text-secondary-500" : "text-slate-200"
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className={cn("font-semibold text-slate-700", styles.text)}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
