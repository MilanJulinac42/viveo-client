/**
 * @fileoverview Dashboard (Star panel) API service functions.
 */

import { get, patch, postFormData } from "./client";
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

/** Update a request's status (approve/reject) */
export async function updateRequestStatus(
  id: string,
  status: "approved" | "rejected"
) {
  const res = await patch<{ id: string; status: string }>(
    `/dashboard/requests/${id}`,
    { status }
  );
  return res.data;
}

/** Upload video for a request (completes the order) */
export async function uploadVideo(
  requestId: string,
  file: File,
  onProgress?: (percent: number) => void
) {
  const formData = new FormData();
  formData.append("video", file);
  const res = await postFormData<{ id: string; status: string; videoUrl: string }>(
    `/dashboard/requests/${requestId}/video`,
    formData,
    onProgress
  );
  return res.data;
}

/** Upload avatar image for the star profile */
export async function uploadAvatar(
  file: File,
  onProgress?: (percent: number) => void
) {
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await postFormData<{ imageUrl: string }>(
    "/dashboard/profile/avatar",
    formData,
    onProgress
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
