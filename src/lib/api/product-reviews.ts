/**
 * @fileoverview Reviews API service for merch and digital products.
 */

import { get, post } from "./client";

export interface ReviewItem {
  id: string;
  rating: number;
  text: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
}

/** Fetch reviews for a merch product (public) */
export async function getProductReviews(productId: string) {
  const res = await get<ReviewItem[]>(`/reviews/product/${productId}`);
  return res.data;
}

/** Fetch reviews for a digital product (public) */
export async function getDigitalProductReviews(productId: string) {
  const res = await get<ReviewItem[]>(`/reviews/digital-product/${productId}`);
  return res.data;
}

/** Submit a review (requires auth) */
export async function submitReview(data: {
  orderId: string;
  rating: number;
  text: string;
  reviewType: "video" | "merch" | "digital";
}) {
  const res = await post<{ id: string; rating: number; text: string; createdAt: string }>(
    "/reviews",
    data
  );
  return res.data;
}
