/**
 * @fileoverview Auth API service functions.
 */

import { post, setTokens, clearTokens } from "./client";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: "fan" | "star" | "admin";
  avatarUrl?: string | null;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
  user: AuthUser;
  session: AuthSession;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  accountType: "fan" | "star";
}

export interface LoginPayload {
  email: string;
  password: string;
}

/** Register a new user */
export async function register(payload: RegisterPayload) {
  const res = await post<AuthResponse>("/auth/register", payload);
  setTokens(res.data.session.accessToken, res.data.session.refreshToken);
  return res.data;
}

/** Log in an existing user */
export async function login(payload: LoginPayload) {
  const res = await post<AuthResponse>("/auth/login", payload);
  setTokens(res.data.session.accessToken, res.data.session.refreshToken);
  return res.data;
}

/** Log out the current user */
export async function logout() {
  try {
    await post<{ message: string }>("/auth/logout");
  } finally {
    clearTokens();
  }
}
