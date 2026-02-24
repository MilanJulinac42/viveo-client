"use client";

import { useState, useEffect } from "react";
import { cn, formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  getDashboardProducts,
  createDashboardProduct,
  updateDashboardProduct,
  deleteDashboardProduct,
  createProductVariant,
  deleteProductVariant,
  uploadProductImages,
  deleteProductImage,
  getProductCategoriesForDashboard,
} from "@/lib/api/dashboard-products";
import type { StarProduct, ProductCategory } from "@/lib/types";

export default function ProductsSection() {
  const [products, setProducts] = useState<StarProduct[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StarProduct | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", productCategoryId: "" });
  const [saving, setSaving] = useState(false);

  // Variant form
  const [showVariantForm, setShowVariantForm] = useState<string | null>(null);
  const [variantForm, setVariantForm] = useState({ name: "", stock: "0", sku: "" });

  useEffect(() => {
    fetchProducts();
    getProductCategoriesForDashboard()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await getDashboardProducts();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setForm({ name: "", description: "", price: "", productCategoryId: "" });
    setEditingProduct(null);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingProduct) {
        await updateDashboardProduct(editingProduct.id, {
          name: form.name,
          description: form.description,
          price: parseInt(form.price, 10),
          productCategoryId: form.productCategoryId || undefined,
        });
      } else {
        await createDashboardProduct({
          name: form.name,
          description: form.description || undefined,
          price: parseInt(form.price, 10),
          productCategoryId: form.productCategoryId || undefined,
        });
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(p: StarProduct) {
    try {
      await updateDashboardProduct(p.id, { isActive: !p.isActive });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(p: StarProduct) {
    if (!confirm(`Obrisati proizvod "${p.name}"?`)) return;
    try {
      await deleteDashboardProduct(p.id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddVariant(productId: string) {
    try {
      await createProductVariant(productId, {
        name: variantForm.name,
        stock: parseInt(variantForm.stock, 10),
        sku: variantForm.sku || undefined,
      });
      setShowVariantForm(null);
      setVariantForm({ name: "", stock: "0", sku: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteVariant(productId: string, variantId: string) {
    try {
      await deleteProductVariant(productId, variantId);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleImageUpload(productId: string, files: FileList) {
    try {
      await uploadProductImages(productId, Array.from(files));
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteImage(productId: string, imageId: string) {
    try {
      await deleteProductImage(productId, imageId);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Moji proizvodi</h2>
          <p className="text-sm text-slate-500">Upravljanje merch proizvodima</p>
        </div>
        <Button size="sm" onClick={openCreate}>+ Novi proizvod</Button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {editingProduct ? "Izmeni proizvod" : "Novi proizvod"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Naziv *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Cena (RSD) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kategorija</label>
              <select
                value={form.productCategoryId}
                onChange={(e) => setForm({ ...form, productCategoryId: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="">Bez kategorije</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Opis</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3 justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Otkaži</Button>
            <Button size="sm" onClick={handleSave} disabled={saving || !form.name || !form.price}>
              {saving ? "Čuvanje..." : editingProduct ? "Sačuvaj" : "Kreiraj"}
            </Button>
          </div>
        </div>
      )}

      {/* Products List */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
          <p className="text-3xl mb-3">🛍️</p>
          <p className="text-slate-500">Nemate proizvode. Dodajte svoj prvi merch!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="rounded-2xl border border-slate-100 bg-white p-5">
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xl">🛍️</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{p.name}</h3>
                    {p.isActive ? (
                      <Badge variant="accent" size="sm">Aktivan</Badge>
                    ) : (
                      <Badge variant="default" size="sm">Neaktivan</Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">
                    {formatPrice(p.price)} · {p.variantCount} varijanti · {p.totalOrders} narudžbina · {formatPrice(p.totalRevenue)} prihod
                  </p>

                  {/* Variants */}
                  {p.variants.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.variants.map((v) => (
                        <span
                          key={v.id}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-50 text-slate-600"
                        >
                          {v.name} ({v.stock} kom)
                          <button
                            onClick={() => handleDeleteVariant(p.id, v.id)}
                            className="text-red-400 hover:text-red-600 ml-1 cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add variant form */}
                  {showVariantForm === p.id && (
                    <div className="mt-3 flex flex-wrap gap-2 items-end">
                      <input
                        placeholder="Naziv (npr. M / Crna)"
                        value={variantForm.name}
                        onChange={(e) => setVariantForm({ ...variantForm, name: e.target.value })}
                        className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Stanje"
                        value={variantForm.stock}
                        onChange={(e) => setVariantForm({ ...variantForm, stock: e.target.value })}
                        className="w-20 px-3 py-1.5 text-sm border border-slate-200 rounded-lg"
                      />
                      <Button size="sm" onClick={() => handleAddVariant(p.id)} disabled={!variantForm.name}>
                        Dodaj
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowVariantForm(null)}>
                        Otkaži
                      </Button>
                    </div>
                  )}

                  {/* Images */}
                  {p.images.length > 0 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto">
                      {p.images.map((img) => (
                        <div key={img.id} className="relative shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-slate-100 group">
                          <img src={img.imageUrl} alt="" className="h-full w-full object-cover" />
                          <button
                            onClick={() => handleDeleteImage(p.id, img.id)}
                            className="absolute inset-0 bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(p)}
                  >
                    {p.isActive ? "Deaktiviraj" : "Aktiviraj"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setShowVariantForm(p.id);
                      setVariantForm({ name: "", stock: "0", sku: "" });
                    }}
                  >
                    + Varijanta
                  </Button>
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer px-4 py-2.5 text-primary-500 hover:bg-primary-50">
                    + Slike
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={(e) => e.target.files && handleImageUpload(p.id, e.target.files)}
                    />
                  </label>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(p)}
                  >
                    Obriši
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
