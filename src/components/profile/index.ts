/**
 * @fileoverview Barrel exports for profile page components.
 * Provides a single import point for all celebrity profile components.
 *
 * @example
 * ```tsx
 * import {
 *   ProfileHero,
 *   ProfileAbout,
 *   ProfileTabs,
 *   ProfileReviews,
 *   SimilarCelebrities,
 *   StickyBottomCTA,
 *   CelebrityCard,
 * } from "@/components/profile";
 * ```
 */

export { default as ProfileHero } from "./ProfileHero";
export { default as ProfileStats } from "./ProfileStats";
export { default as ProfileAbout } from "./ProfileAbout";
export { default as ProfileTabs } from "./ProfileTabs";
export { default as ProfileTabsClient } from "./ProfileTabsClient";
export { default as ProfileVideoShowcase } from "./ProfileVideoShowcase";
export { default as ProfileVideoMockups } from "./ProfileVideoMockups";
export { default as EmptyTabState } from "./EmptyTabState";
export { default as ProfileReviews } from "./ProfileReviews";
export { default as ProfileReviewList } from "./ProfileReviewList";
export { default as SimilarCelebrities } from "./SimilarCelebrities";
export { default as CelebrityCard } from "./CelebrityCard";
export { default as StickyBottomCTA } from "./StickyBottomCTA";
