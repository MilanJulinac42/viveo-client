/**
 * @fileoverview Utility functions for the Viveo client application.
 * Contains helper functions for class names, formatting, and common operations.
 */

/**
 * Merges and conditionally joins CSS class names.
 * Filters out falsy values (false, null, undefined, empty string).
 *
 * @param classes - Class names or conditional expressions to merge
 * @returns Merged class name string
 *
 * @example
 * ```tsx
 * cn("base-class", isActive && "active", className)
 * // → "base-class active custom-class"
 * ```
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formats a price amount in Serbian Dinar (RSD) format.
 *
 * @param amount - The price amount in RSD
 * @returns Formatted price string (e.g., "2.500 RSD")
 *
 * @example
 * ```ts
 * formatPrice(2500)  // → "2.500 RSD"
 * formatPrice(15000) // → "15.000 RSD"
 * ```
 */
export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("sr-RS")} RSD`;
}

/**
 * Generates a placeholder image URL using a deterministic color based on input string.
 * Useful for dummy/placeholder content during development.
 *
 * @param name - Name to generate initials from
 * @param size - Image size in pixels (square)
 * @returns Placeholder image URL string
 */
export function getPlaceholderImage(name: string, size: number = 200): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=6C3CE1&color=fff&bold=true`;
}

/**
 * Truncates a string to a maximum length with ellipsis.
 *
 * @param text - The text to truncate
 * @param maxLength - Maximum character length before truncation
 * @returns Truncated string with "..." appended if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Formats a response time in hours to a human-readable Serbian string.
 *
 * @param hours - Response time in hours
 * @returns Formatted string (e.g., "~12h", "~1 dan", "~3 dana")
 *
 * @example
 * ```ts
 * formatResponseTime(12)  // → "~12h"
 * formatResponseTime(24)  // → "~1 dan"
 * formatResponseTime(72)  // → "~3 dana"
 * ```
 */
export function formatResponseTime(hours: number): string {
  if (hours < 24) return `~${hours}h`;
  const days = Math.round(hours / 24);
  return `~${days} ${days === 1 ? "dan" : "dana"}`;
}
