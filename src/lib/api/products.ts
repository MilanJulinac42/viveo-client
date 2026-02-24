/**
 * @fileoverview Public products API service functions.
 */

import { get } from "./client";
import type { Product, ProductDetail, ProductCategory } from "../types";

export interface ProductsParams {
  search?: string;
  category?: string;
  celebrity?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
}

/** Fetch paginated list of active products */
export async function getProducts(params?: ProductsParams) {
  return get<Product[]>("/products", params as Record<string, string | number | undefined>);
}

/** Fetch a single product by slug */
export async function getProduct(slug: string) {
  const res = await get<ProductDetail>(`/products/${slug}`);
  return res.data;
}

/** Fetch product categories */
export async function getProductCategories() {
  const res = await get<ProductCategory[]>("/products/categories");
  return res.data;
}

/** Fetch products for a specific celebrity */
export async function getCelebrityProducts(slug: string) {
  const res = await get<Product[]>(`/celebrities/${slug}/products`);
  return res.data;
}
