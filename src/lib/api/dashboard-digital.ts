import { get, post, patch, del, postFormData } from "./client";
import type {
  StarDigitalProduct,
  StarDigitalOrder,
  DigitalEarningsSummary,
  DigitalProductCategory,
} from "../types";

/** Fetch star's digital products */
export async function getDashboardDigitalProducts() {
  const res = await get<StarDigitalProduct[]>("/dashboard/digital-products");
  return res.data;
}

/** Fetch a single digital product by ID (star dashboard) */
export async function getDashboardDigitalProduct(id: string) {
  const res = await get<StarDigitalProduct>(`/dashboard/digital-products/${id}`);
  return res.data;
}

export interface CreateDigitalProductPayload {
  name: string;
  description?: string;
  price: number;
  digitalProductCategoryId?: string | null;
}

/** Create a new digital product */
export async function createDashboardDigitalProduct(payload: CreateDigitalProductPayload) {
  const res = await post<StarDigitalProduct>("/dashboard/digital-products", payload);
  return res.data;
}

export interface UpdateDigitalProductPayload {
  name?: string;
  description?: string;
  price?: number;
  digitalProductCategoryId?: string | null;
  isActive?: boolean;
  featured?: boolean;
}

/** Update a digital product */
export async function updateDashboardDigitalProduct(id: string, payload: UpdateDigitalProductPayload) {
  const res = await patch<StarDigitalProduct>(`/dashboard/digital-products/${id}`, payload);
  return res.data;
}

/** Delete a digital product */
export async function deleteDashboardDigitalProduct(id: string) {
  const res = await del<{ message: string }>(`/dashboard/digital-products/${id}`);
  return res.data;
}

/** Upload the digital file */
export async function uploadDigitalFile(productId: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await postFormData<{ fileName: string; fileSize: number; fileType: string }>(
    `/dashboard/digital-products/${productId}/file`,
    formData
  );
  return res.data;
}

/** Upload the preview image */
export async function uploadDigitalPreview(productId: string, file: File) {
  const formData = new FormData();
  formData.append("preview", file);
  const res = await postFormData<{ previewImageUrl: string }>(
    `/dashboard/digital-products/${productId}/preview`,
    formData
  );
  return res.data;
}

/** Fetch star's digital orders */
export async function getDashboardDigitalOrders(status?: string) {
  const params = status && status !== "all" ? { status } : undefined;
  const res = await get<StarDigitalOrder[]>("/dashboard/digital-orders", params);
  return res.data;
}

/** Update a digital order status */
export async function updateDashboardDigitalOrderStatus(id: string, data: { status: string }) {
  const res = await patch<{ id: string; status: string }>(`/dashboard/digital-orders/${id}`, data);
  return res.data;
}

/** Fetch star's digital earnings */
export async function getDashboardDigitalEarnings() {
  const res = await get<DigitalEarningsSummary>("/dashboard/digital-earnings");
  return res.data;
}

/** Fetch digital product categories for star dashboard */
export async function getDigitalProductCategoriesForDashboard() {
  const res = await get<DigitalProductCategory[]>("/digital-products/categories");
  return res.data;
}
