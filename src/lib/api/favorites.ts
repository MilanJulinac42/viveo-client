/**
 * @fileoverview Favorites/Wishlist API service.
 */

import { get, post, del } from "./client";
import type { GlobalSearchResult } from "../types";

type ItemType = "celebrity" | "product" | "digital_product";

/** Add an item to favorites */
export async function addFavorite(itemType: ItemType, itemId: string) {
  const res = await post<{ message: string }>("/favorites", { itemType, itemId });
  return res.data;
}

/** Remove an item from favorites (uses fetch DELETE with body) */
export async function removeFavorite(itemType: ItemType, itemId: string) {
  // Custom fetch since our `del` helper doesn't support body
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const token = typeof window !== "undefined" ? localStorage.getItem("viveo_access_token") : null;

  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ itemType, itemId }),
  });

  const body = await response.json();
  if (!response.ok || !body.success) {
    throw new Error(body.error?.message || "Greška");
  }
  return body.data;
}

/** List all favorites for the current user */
export async function listFavorites(type?: ItemType) {
  const params: Record<string, string> = {};
  if (type) params.type = type;
  const res = await get<GlobalSearchResult>("/favorites", params);
  return res.data;
}

/** Check if a specific item is favorited */
export async function checkFavorite(itemType: ItemType, itemId: string) {
  const res = await get<{ isFavorite: boolean }>("/favorites/check", {
    itemType,
    itemId,
  });
  return res.data;
}
