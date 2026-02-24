import { get, post } from "./client";
import type { FanDigitalOrder } from "../types";

export interface CreateDigitalOrderPayload {
  digitalProductId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
}

/** Create a new digital order */
export async function createDigitalOrder(payload: CreateDigitalOrderPayload) {
  const res = await post<FanDigitalOrder>("/digital-orders", payload);
  return res.data;
}

/** Fetch all digital orders for the logged-in user */
export async function getDigitalOrders() {
  const res = await get<FanDigitalOrder[]>("/digital-orders");
  return res.data;
}

/** Fetch a single digital order by ID */
export async function getDigitalOrder(id: string) {
  const res = await get<FanDigitalOrder>(`/digital-orders/${id}`);
  return res.data;
}

/** Get download URL for a completed digital order */
export async function downloadDigitalProduct(id: string, token: string) {
  const res = await get<{ downloadUrl: string; fileName: string }>(`/digital-orders/${id}/download`, { token });
  return res.data;
}
