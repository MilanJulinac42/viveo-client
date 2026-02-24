/**
 * @fileoverview Categories API service functions.
 */

import { get } from "./client";
import type { Category } from "../types";

/** Fetch all categories */
export async function getCategories() {
  const res = await get<Category[]>("/categories");
  return res.data;
}
