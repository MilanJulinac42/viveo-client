/**
 * @fileoverview Celebrities API service functions.
 */

import { get } from "./client";
import type { Celebrity, Testimonial } from "../types";

export interface CelebritiesParams {
  search?: string;
  category?: string;
  sort?: "popularity" | "price-asc" | "price-desc" | "rating";
  page?: number;
  pageSize?: number;
}

/** Fetch paginated list of celebrities */
export async function getCelebrities(params?: CelebritiesParams) {
  return get<Celebrity[]>("/celebrities", params as Record<string, string | number | undefined>);
}

/** Fetch a single celebrity by slug */
export async function getCelebrity(slug: string) {
  const res = await get<Celebrity>(`/celebrities/${slug}`);
  return res.data;
}

/** Fetch reviews for a celebrity */
export async function getCelebrityReviews(slug: string) {
  const res = await get<Testimonial[]>(`/celebrities/${slug}/reviews`);
  return res.data;
}
