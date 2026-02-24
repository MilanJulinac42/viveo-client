/**
 * @fileoverview Global search API service.
 */

import { get } from "./client";
import type { GlobalSearchResult } from "../types";

/** Search across celebrities, merch products, and digital products */
export async function globalSearch(query: string) {
  const res = await get<GlobalSearchResult>("/search", { q: query });
  return res.data;
}
