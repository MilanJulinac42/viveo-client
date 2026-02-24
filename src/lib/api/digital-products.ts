import { get } from "./client";
import type { DigitalProduct, DigitalProductDetail, DigitalProductCategory } from "../types";

export interface DigitalProductsParams {
  search?: string;
  category?: string;
  celebrity?: string;
  page?: number;
  pageSize?: number;
}

/** Fetch paginated list of active digital products */
export async function getDigitalProducts(params?: DigitalProductsParams) {
  return get<DigitalProduct[]>("/digital-products", params as Record<string, string | number | undefined>);
}

/** Fetch a single digital product by slug */
export async function getDigitalProduct(slug: string) {
  const res = await get<DigitalProductDetail>(`/digital-products/${slug}`);
  return res.data;
}

/** Fetch digital product categories */
export async function getDigitalProductCategories() {
  const res = await get<DigitalProductCategory[]>("/digital-products/categories");
  return res.data;
}

/** Fetch digital products for a specific celebrity */
export async function getCelebrityDigitalProducts(slug: string) {
  const res = await getDigitalProducts({ celebrity: slug });
  return res.data;
}
