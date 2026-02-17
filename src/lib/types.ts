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
  /** Extended biography for profile page */
  extendedBio?: string;
  /** Tag keywords for the celebrity */
  tags?: string[];
  /** Video types this celebrity offers */
  videoTypes?: VideoType[];
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

/** Video type available on a celebrity's profile */
export interface VideoType {
  /** Unique identifier */
  id: string;
  /** Display title (e.g., "Rođendanska čestitka") */
  title: string;
  /** Occasion label (e.g., "Rođendan") */
  occasion: string;
  /** Emoji icon for the occasion */
  emoji: string;
  /** Tailwind gradient start class */
  accentFrom: string;
  /** Tailwind gradient end class */
  accentTo: string;
  /** Preview message text */
  message: string;
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

// ---------------------------------------------------------------------------
// Dashboard Types
// ---------------------------------------------------------------------------

/** Status of a video request */
export type RequestStatus = "pending" | "approved" | "completed" | "rejected";

/** Dashboard tab identifiers */
export type DashboardTab = "requests" | "earnings" | "profile" | "calendar";

/** A video request from a fan to a celebrity */
export interface VideoRequest {
  /** Unique identifier */
  id: string;
  /** Name of the person who ordered */
  buyerName: string;
  /** Buyer avatar URL (empty string = placeholder) */
  buyerAvatar: string;
  /** Which video type was requested */
  videoType: string;
  /** Occasion (e.g., "Rođendan", "Motivacija") */
  occasion: string;
  /** The buyer's instructions/message */
  instructions: string;
  /** Name of the recipient (person the video is for) */
  recipientName: string;
  /** Price paid in RSD */
  price: number;
  /** Current status */
  status: RequestStatus;
  /** Date the request was placed (ISO string) */
  createdAt: string;
  /** Deadline to fulfill (ISO string) */
  deadline: string;
  /** URL to the uploaded video (set when status is completed) */
  videoUrl?: string | null;
}

/** Earnings summary for a time period */
export interface EarningsSummary {
  /** Total earnings in RSD for the period */
  totalEarnings: number;
  /** Number of completed requests */
  completedRequests: number;
  /** Number of pending requests */
  pendingRequests: number;
  /** Average rating received */
  averageRating: number;
  /** Earnings per day for the last 7 days */
  weeklyEarnings: { day: string; amount: number }[];
  /** Earnings per month for the last 6 months */
  monthlyEarnings: { month: string; amount: number }[];
  /** Breakdown by video type */
  earningsByType: { type: string; amount: number; count: number }[];
}

/** A single availability slot for the celebrity's calendar */
export interface AvailabilitySlot {
  /** Unique identifier */
  id: string;
  /** Day of the week (0=Ponedeljak ... 6=Nedelja) */
  dayOfWeek: number;
  /** Whether the celebrity is available on this day */
  available: boolean;
  /** Maximum number of requests they'll accept this day */
  maxRequests: number;
}

/** A fan's order (from the buyer/fan perspective) */
export interface FanOrder {
  /** Unique identifier */
  id: string;
  /** Celebrity who will record the video */
  celebrityName: string;
  /** Celebrity slug for linking */
  celebritySlug: string;
  /** Celebrity avatar URL */
  celebrityImage: string;
  /** Which video type was requested */
  videoType: string;
  /** Occasion (e.g., "Rođendan", "Motivacija") */
  occasion: string;
  /** The fan's instructions/message */
  instructions: string;
  /** Name of the recipient (person the video is for) */
  recipientName: string;
  /** Price paid in RSD */
  price: number;
  /** Current status */
  status: RequestStatus;
  /** Date the order was placed (ISO string) */
  createdAt: string;
  /** Deadline to fulfill (ISO string) */
  deadline: string;
  /** URL to the uploaded video (set when status is completed) */
  videoUrl?: string | null;
}

/** Celebrity profile settings (editable fields) */
export interface ProfileSettings {
  /** Display name */
  name: string;
  /** Short bio */
  bio: string;
  /** Extended bio for profile page */
  extendedBio: string;
  /** Price per video in RSD */
  price: number;
  /** Response time in hours */
  responseTime: number;
  /** Tag keywords */
  tags: string[];
  /** Whether currently accepting requests */
  acceptingRequests: boolean;
}
