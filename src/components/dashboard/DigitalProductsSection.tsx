"use client";

import { useState, useEffect } from "react";
import { cn, formatPrice, formatFileSize } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  getDashboardDigitalProducts,
  createDashboardDigitalProduct,
  updateDashboardDigitalProduct,
  deleteDashboardDigitalProduct,
  uploadDigitalFile,
  uploadDigitalPreview,
  getDigitalProductCategoriesForDashboard,
} from "@/lib/api/dashboard-digital";
import type { StarDigitalProduct, DigitalProductCategory } from "@/lib/types";

export default function DigitalProductsSection() {
  const [products, setProducts] = useState<StarDigitalProduct[]>([]);
  const [categories, setCategories] = useState<DigitalProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StarDigitalProduct | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", digitalProductCategoryId: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
    getDigitalProductCategoriesForDashboard()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const data = await getDashboardDigitalProducts();
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setForm({ name: "", description: "", price: "", digitalProductCategoryId: "" });
    setEditingProduct(null);
    setShowForm(true);
  }

  function openEdit(p: StarDigitalProduct) {
    setForm({
      name: p.name,
      description: p.description || "",
      price: String(p.price),
      digitalProductCategoryId: p.digitalProductCategoryId || "",
    });
    setEditingProduct(p);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editingProduct) {
        await updateDashboardDigitalProduct(editingProduct.id, {
          name: form.name,
          description: form.description,
          price: parseInt(form.price, 10),
          digitalProductCategoryId: form.digitalProductCategoryId || null,
        });
      } else {
        await createDashboardDigitalProduct({
          name: form.name,
          description: form.description || undefined,
          price: parseInt(form.price, 10),
          digitalProductCategoryId: form.digitalProductCategoryId || null,
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

  async function handleToggleActive(p: StarDigitalProduct) {
    try {
      await updateDashboardDigitalProduct(p.id, { isActive: !p.isActive });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(p: StarDigitalProduct) {
    if (!confirm(`Obrisati digitalni proizvod "${p.name}"?`)) return;
    try {
      await deleteDashboardDigitalProduct(p.id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleFileUpload(productId: string, file: File) {
    try {
      await uploadDigitalFile(productId, file);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePreviewUpload(productId: string, file: File) {
    try {
      await uploadDigitalPreview(productId, file);
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
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Digitalni proizvodi</h2>
          <p className="text-sm text-slate-500">Upravljanje digitalnim proizvodima</p>
        </div>
        <Button size="sm" onClick={openCreate}>+ Dodaj proizvod</Button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {editingProduct ? "Izmeni digitalni proizvod" : "Novi digitalni proizvod"}
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
                value={form.digitalProductCategoryId}
                onChange={(e) => setForm({ ...form, digitalProductCategoryId: e.target.value })}
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
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Otkazi</Button>
            <Button size="sm" onClick={handleSave} disabled={saving || !form.name || !form.price}>
              {saving ? "Cuvanje..." : editingProduct ? "Sacuvaj" : "Kreiraj"}
            </Button>
          </div>
        </div>
      )}

      {/* Products List */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
          <p className="text-3xl mb-3">📦</p>
          <p className="text-slate-500">Nemate digitalne proizvode. Dodajte svoj prvi!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p.id} className="rounded-2xl border border-slate-100 bg-white p-5">
              <div className="flex items-start gap-4">
                {/* Preview Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  {p.previewImageUrl ? (
                    <img src={p.previewImageUrl} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xl">📦</div>
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
                    <Badge variant="primary" size="sm">{p.fileType ? p.fileType.toUpperCase() : "N/A"}</Badge>
                  </div>
                  <p className="text-sm text-slate-500">
                    {formatPrice(p.price)}
                    {p.fileSize > 0 && ` · ${formatFileSize(p.fileSize)}`}
                    {` · ${p.downloadCount} preuzimanja`}
                  </p>
                  {p.fileName && (
                    <p className="text-xs text-slate-400 mt-1">Fajl: {p.fileName}</p>
                  )}
                  {p.categoryName && (
                    <div className="mt-2">
                      <Badge variant="default" size="sm">{p.categoryName}</Badge>
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
                    onClick={() => openEdit(p)}
                  >
                    Izmeni
                  </Button>
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer px-4 py-2.5 text-primary-500 hover:bg-primary-50">
                    + Fajl
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(p.id, file);
                      }}
                    />
                  </label>
                  <label className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer px-4 py-2.5 text-primary-500 hover:bg-primary-50">
                    + Slika
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handlePreviewUpload(p.id, file);
                      }}
                    />
                  </label>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(p)}
                  >
                    Obrisi
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
