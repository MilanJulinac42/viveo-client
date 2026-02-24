/**
 * @fileoverview HTTP client wrapper for Viveo API.
 * Handles base URL, auth tokens, and response parsing.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

/** Standard API success response */
export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/** Standard API error response */
export interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
  };
}

/** Thrown when API returns an error response */
export class ApiRequestError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "ApiRequestError";
    this.code = code;
    this.status = status;
  }
}

/** Get stored access token */
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("viveo_access_token");
}

/** Store auth tokens */
export function setTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem("viveo_access_token", accessToken);
  localStorage.setItem("viveo_refresh_token", refreshToken);
}

/** Clear stored auth tokens */
export function clearTokens(): void {
  localStorage.removeItem("viveo_access_token");
  localStorage.removeItem("viveo_refresh_token");
}

/** Core fetch wrapper with auth and error handling */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const body = await response.json();

  if (!response.ok || !body.success) {
    const err = body as ApiError;
    throw new ApiRequestError(
      err.error?.message || "Došlo je do greške",
      err.error?.code || "UNKNOWN_ERROR",
      response.status
    );
  }

  return body as ApiResponse<T>;
}

/** HTTP GET */
export function get<T>(
  endpoint: string,
  params?: Record<string, string | number | undefined>
): Promise<ApiResponse<T>> {
  let url = endpoint;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }
  return request<T>(url);
}

/** HTTP POST */
export function post<T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/** HTTP PATCH */
export function patch<T>(
  endpoint: string,
  data?: unknown
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/** HTTP DELETE */
export function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: "DELETE" });
}

/** Upload file via FormData with progress tracking */
export function postFormData<T>(
  endpoint: string,
  formData: FormData,
  onProgress?: (percent: number) => void
): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}${endpoint}`);

    const token = getToken();
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100));
        }
      };
    }

    xhr.onload = () => {
      try {
        const body = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && body.success) {
          resolve(body as ApiResponse<T>);
        } else {
          const err = body as ApiError;
          reject(
            new ApiRequestError(
              err.error?.message || "Došlo je do greške",
              err.error?.code || "UNKNOWN_ERROR",
              xhr.status
            )
          );
        }
      } catch {
        reject(
          new ApiRequestError("Greška u odgovoru servera", "PARSE_ERROR", xhr.status)
        );
      }
    };

    xhr.onerror = () => {
      reject(new ApiRequestError("Mrežna greška", "NETWORK_ERROR", 0));
    };

    xhr.send(formData);
  });
}
