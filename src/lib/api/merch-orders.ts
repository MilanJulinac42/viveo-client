/**
 * @fileoverview Fan merch orders API service functions.
 */

import { get, post } from "./client";
import type { FanMerchOrder } from "../types";

export interface CreateMerchOrderPayload {
  productId: string;
  productVariantId: string;
  quantity: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostal: string;
  shippingNote?: string;
}

/** Create a new merch order */
export async function createMerchOrder(payload: CreateMerchOrderPayload) {
  const res = await post<FanMerchOrder>("/merch-orders", payload);
  return res.data;
}

/** Fetch all merch orders for the logged-in user */
export async function getMerchOrders() {
  const res = await get<FanMerchOrder[]>("/merch-orders");
  return res.data;
}

/** Fetch a single merch order by ID */
export async function getMerchOrder(id: string) {
  const res = await get<FanMerchOrder>(`/merch-orders/${id}`);
  return res.data;
}
