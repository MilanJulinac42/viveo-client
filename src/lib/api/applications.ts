/**
 * @fileoverview Applications API service functions (Become a Star).
 */

import { post } from "./client";

export interface CreateApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  category: string;
  socialMedia: string;
  followers: string;
  bio: string;
  motivation: string;
}

interface CreateApplicationResponse {
  id: string;
  message: string;
}

/** Submit a star application */
export async function createApplication(payload: CreateApplicationPayload) {
  const res = await post<CreateApplicationResponse>("/applications", payload);
  return res.data;
}
