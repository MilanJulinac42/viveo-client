/**
 * @fileoverview Orders API service functions.
 */

import { get, post } from "./client";
import type { FanOrder } from "../types";

export interface CreateOrderPayload {
  celebritySlug: string;
  videoTypeId: string;
  recipientName: string;
  buyerName: string;
  buyerEmail: string;
  instructions: string;
}

interface CreateOrderResponse {
  id: string;
  price: number;
  status: string;
  deadline: string;
  createdAt: string;
}

/** Create a new order */
export async function createOrder(payload: CreateOrderPayload) {
  const res = await post<CreateOrderResponse>("/orders", payload);
  return res.data;
}

/** Fetch all orders for the logged-in user */
export async function getOrders() {
  const res = await get<FanOrder[]>("/orders");
  return res.data;
}

/** Fetch a single order by ID */
export async function getOrder(id: string) {
  const res = await get<FanOrder>(`/orders/${id}`);
  return res.data;
}
