/**
 * @fileoverview Reviews API service functions.
 */

import { post } from "./client";

export interface CreateReviewPayload {
  orderId: string;
  rating: number;
  text: string;
}

interface CreateReviewResponse {
  id: string;
  rating: number;
  text: string;
  createdAt: string;
}

/** Submit a review for a completed order */
export async function createReview(payload: CreateReviewPayload) {
  const res = await post<CreateReviewResponse>("/reviews", payload);
  return res.data;
}
