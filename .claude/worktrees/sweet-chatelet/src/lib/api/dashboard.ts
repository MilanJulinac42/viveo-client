/**
 * @fileoverview Dashboard (Star panel) API service functions.
 */

import { get, patch } from "./client";
import type {
  VideoRequest,
  EarningsSummary,
  AvailabilitySlot,
} from "../types";

/** Fetch star's video requests, optionally filtered by status */
export async function getDashboardRequests(status?: string) {
  const params = status && status !== "all" ? { status } : undefined;
  const res = await get<VideoRequest[]>("/dashboard/requests", params);
  return res.data;
}

/** Update a request's status (approve/complete/reject) */
export async function updateRequestStatus(
  id: string,
  status: "approved" | "completed" | "rejected"
) {
  const res = await patch<{ id: string; status: string }>(
    `/dashboard/requests/${id}`,
    { status }
  );
  return res.data;
}

/** Fetch earnings summary */
export async function getDashboardEarnings() {
  const res = await get<EarningsSummary>("/dashboard/earnings");
  return res.data;
}

/** Fetch availability slots */
export async function getDashboardAvailability() {
  const res = await get<AvailabilitySlot[]>("/dashboard/availability");
  return res.data;
}

export interface AvailabilityUpdate {
  dayOfWeek: number;
  available: boolean;
  maxRequests: number;
}

/** Update availability slots */
export async function updateDashboardAvailability(
  slots: AvailabilityUpdate[]
) {
  const res = await patch<{ message: string }>("/dashboard/availability", slots);
  return res.data;
}

export interface ProfileUpdate {
  name?: string;
  bio?: string;
  extendedBio?: string;
  price?: number;
  responseTime?: number;
  tags?: string[];
  acceptingRequests?: boolean;
}

/** Update star profile */
export async function updateDashboardProfile(data: ProfileUpdate) {
  const res = await patch<{ message: string }>("/dashboard/profile", data);
  return res.data;
}
