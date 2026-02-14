/**
 * @fileoverview Type definitions for the Viveo client application.
 * Contains all shared TypeScript interfaces used across components.
 */

/** Celebrity/talent profile available on the platform */
export interface Celebrity {
  /** Unique identifier */
  id: string;
  /** Full display name */
  name: string;
  /** URL-safe identifier */
  slug: string;
  /** Profile image URL */
  image: string;
  /** Category this celebrity belongs to */
  category: string;
  /** Price per video message in RSD */
  price: number;
  /** Average rating (1-5) */
  rating: number;
  /** Total number of reviews */
  reviewCount: number;
  /** Whether the profile is verified */
  verified: boolean;
  /** Short biography */
  bio: string;
  /** Average response time in hours */
  responseTime: number;
}

/** Browsable category for filtering celebrities */
export interface Category {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** URL-safe identifier */
  slug: string;
  /** Emoji or icon identifier */
  icon: string;
  /** Number of celebrities in this category */
  celebrityCount: number;
}

/** Customer testimonial/review */
export interface Testimonial {
  /** Unique identifier */
  id: string;
  /** Name of the person who wrote the review */
  author: string;
  /** Author avatar image URL */
  avatar: string;
  /** Rating given (1-5) */
  rating: number;
  /** Review text content */
  text: string;
  /** Name of the celebrity the video was from */
  celebrityName: string;
  /** Date the review was posted */
  date: string;
}

/** Navigation link item */
export interface NavLink {
  /** Display text */
  label: string;
  /** Target URL */
  href: string;
}

/** How-it-works step item */
export interface HowItWorksStep {
  /** Step number */
  step: number;
  /** Step icon (emoji) */
  icon: string;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
}

/** FOMO notification for social proof */
export interface FomoNotification {
  /** Unique identifier */
  id: string;
  /** Buyer name */
  buyer: string;
  /** Celebrity name they ordered from */
  celebrityName: string;
  /** Time ago text (e.g., "pre 2 min") */
  timeAgo: string;
  /** Emoji for the notification */
  emoji: string;
}

/** FAQ item for accordion */
export interface FAQItem {
  /** Unique identifier */
  id: string;
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}

/** Video showcase item */
export interface VideoShowcaseItem {
  /** Unique identifier */
  id: string;
  /** Showcase title */
  title: string;
  /** Occasion type */
  occasion: string;
  /** Emoji for the occasion */
  emoji: string;
  /** Celebrity name in the mockup */
  celebrityName: string;
  /** Category label */
  category: string;
  /** Accent color class for gradient */
  accentFrom: string;
  /** Accent color class for gradient */
  accentTo: string;
  /** Message preview text */
  message: string;
}

/** Press/media logo item */
export interface PressLogo {
  /** Unique identifier */
  id: string;
  /** Media outlet name */
  name: string;
}

/** Hero statistics item */
export interface HeroStat {
  /** Statistic value (e.g., "500+") */
  value: string;
  /** Statistic label (e.g., "Zvezda") */
  label: string;
  /** Numeric target for animated counter */
  numericValue: number;
  /** Number of decimal places for animated counter */
  decimals?: number;
  /** Suffix text (e.g., "+") */
  suffix?: string;
}
