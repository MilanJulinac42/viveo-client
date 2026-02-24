/**
 * @fileoverview Star dashboard product management API service functions.
 */

import { get, post, patch, postFormData } from "./client";
import type {
  StarProduct,
  StarMerchOrder,
  MerchEarningsSummary,
  ProductCategory,
} from "../types";

/** Fetch star's products */
export async function getDashboardProducts() {
  const res = await get<StarProduct[]>("/dashboard/products");
  return res.data;
}

/** Fetch a single product detail */
export async function getDashboardProduct(id: string) {
  const res = await get<StarProduct>(`/dashboard/products/${id}`);
  return res.data;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  productCategoryId?: string;
}

/** Create a new product */
export async function createDashboardProduct(payload: CreateProductPayload) {
  const res = await post<StarProduct>("/dashboard/products", payload);
  return res.data;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  productCategoryId?: string;
  isActive?: boolean;
}

/** Update a product */
export async function updateDashboardProduct(id: string, payload: UpdateProductPayload) {
  const res = await patch<StarProduct>(`/dashboard/products/${id}`, payload);
  return res.data;
}

/** Delete a product */
export async function deleteDashboardProduct(id: string) {
  const res = await post<{ message: string }>(`/dashboard/products/${id}`, undefined);
  // Actually uses DELETE method — but client.ts doesn't have del, use fetch directly
  const token = typeof window !== "undefined" ? localStorage.getItem("viveo_access_token") : null;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await fetch(`${API_BASE_URL}/dashboard/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return response.json();
}

/** Upload images to a product */
export async function uploadProductImages(
  productId: string,
  files: File[],
  onProgress?: (percent: number) => void
) {
  const formData = new FormData();
  files.forEach((f) => formData.append("images", f));
  const res = await postFormData<{ images: Array<{ id: string; imageUrl: string }> }>(
    `/dashboard/products/${productId}/images`,
    formData,
    onProgress
  );
  return res.data;
}

/** Delete a product image */
export async function deleteProductImage(productId: string, imageId: string) {
  const token = typeof window !== "undefined" ? localStorage.getItem("viveo_access_token") : null;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await fetch(`${API_BASE_URL}/dashboard/products/${productId}/images/${imageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return response.json();
}

export interface CreateVariantPayload {
  name: string;
  sku?: string;
  priceOverride?: number;
  stock: number;
}

/** Add a variant to a product */
export async function createProductVariant(productId: string, payload: CreateVariantPayload) {
  const res = await post<{ id: string }>(`/dashboard/products/${productId}/variants`, payload);
  return res.data;
}

/** Update a variant */
export async function updateProductVariant(
  productId: string,
  variantId: string,
  payload: Partial<CreateVariantPayload>
) {
  const res = await patch<{ id: string }>(`/dashboard/products/${productId}/variants/${variantId}`, payload);
  return res.data;
}

/** Delete a variant */
export async function deleteProductVariant(productId: string, variantId: string) {
  const token = typeof window !== "undefined" ? localStorage.getItem("viveo_access_token") : null;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await fetch(`${API_BASE_URL}/dashboard/products/${productId}/variants/${variantId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return response.json();
}

/** Fetch star's merch orders */
export async function getDashboardMerchOrders(status?: string) {
  const params = status && status !== "all" ? { status } : undefined;
  const res = await get<StarMerchOrder[]>("/dashboard/merch-orders", params);
  return res.data;
}

/** Update merch order status (confirm/ship/deliver/cancel) */
export async function updateDashboardMerchOrder(
  id: string,
  data: { status: string; trackingNumber?: string }
) {
  const res = await patch<StarMerchOrder>(`/dashboard/merch-orders/${id}`, data);
  return res.data;
}

/** Fetch merch earnings */
export async function getDashboardMerchEarnings() {
  const res = await get<MerchEarningsSummary>("/dashboard/merch-earnings");
  return res.data;
}

/** Fetch product categories (for product creation form) */
export async function getProductCategoriesForDashboard() {
  const res = await get<ProductCategory[]>("/products/categories");
  return res.data;
}
