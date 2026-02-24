"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { getDigitalProduct } from "@/lib/api/digital-products";
import { createDigitalOrder } from "@/lib/api/digital-orders";
import { formatPrice, getPlaceholderImage } from "@/lib/utils";
import type { DigitalProductDetail } from "@/lib/types";

export default function KupiDigitalniPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [product, setProduct] = useState<DigitalProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
  });

  useEffect(() => {
    if (!slug) return;
    getDigitalProduct(slug)
      .then((data) => setProduct(data))
      .catch(() => router.push("/digitalni-proizvodi"))
      .finally(() => setLoading(false));
  }, [slug, router]);

  // Auto-redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push(`/prijava?redirect=/kupi-digitalni/${slug}`);
    }
  }, [loading, user, slug, router]);

  // Pre-fill form from user data
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        buyerName: prev.buyerName || user.fullName || "",
        buyerEmail: prev.buyerEmail || user.email || "",
      }));
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;

    if (!user) {
      router.push(`/prijava?redirect=/kupi-digitalni/${slug}`);
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      await createDigitalOrder({
        digitalProductId: product.id,
        buyerName: form.buyerName,
        buyerEmail: form.buyerEmail,
        buyerPhone: form.buyerPhone || undefined,
      });
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Greska pri kupovini";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 py-8">
          <Container size="md">
            <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) return null;

  if (success) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Container size="sm">
            <div className="text-center py-16">
              <p className="text-6xl mb-6">🎉</p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Kupovina uspesno kreirana!
              </h1>
              <p className="mt-3 text-slate-500">
                Zvezda {product.celebrityName} ce potvrditi vasu kupovinu. Nakon potvrde dobicete link za preuzimanje putem email-a.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={() => router.push("/moje-porudzbine")}>
                  Moje porudzbine
                </Button>
                <Button variant="outline" onClick={() => router.push("/digitalni-proizvodi")}>
                  Nastavi kupovinu
                </Button>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const imageUrl = product.previewImageUrl || getPlaceholderImage(product.name, 200);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <Container size="md">
            <div className="py-8 sm:py-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20">
                <img src={imageUrl} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-sm text-primary-200">{product.celebrityName}</p>
                <h1 className="text-xl font-bold text-white sm:text-2xl">{product.name}</h1>
                <p className="text-sm text-primary-200 mt-1">Digitalni proizvod</p>
              </div>
              <div className="text-center shrink-0">
                <p className="text-xs text-primary-200">Cena</p>
                <p className="text-2xl font-extrabold text-white">{formatPrice(product.price)}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Order Form */}
        <section className="py-8 sm:py-12">
          <Container size="md">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Buyer Info */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Podaci o kupcu</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ime i prezime *</label>
                      <input
                        required
                        value={form.buyerName}
                        onChange={(e) => updateForm("buyerName", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                      <input
                        required
                        type="email"
                        value={form.buyerEmail}
                        onChange={(e) => updateForm("buyerEmail", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                      <input
                        value={form.buyerPhone}
                        onChange={(e) => updateForm("buyerPhone", e.target.value)}
                        placeholder="Opciono"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sticky top-24">
                  <h2 className="text-lg font-semibold text-slate-900 mb-4">Vasa narudzbina</h2>

                  <div className="flex gap-3 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                      <img src={imageUrl} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 line-clamp-2">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.celebrityName}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
                    <div className="flex justify-between font-semibold text-base pt-2">
                      <span className="text-slate-900">Ukupno</span>
                      <span className="text-primary-600">{formatPrice(product.price)}</span>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 rounded-xl bg-red-50 text-red-700 text-sm p-3">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    className="mt-6"
                    disabled={submitting}
                  >
                    {submitting ? "Kupovina..." : `Potvrdite kupovinu — ${formatPrice(product.price)}`}
                  </Button>

                  <p className="mt-3 text-xs text-slate-400 text-center">
                    Nakon potvrde od strane zvezde, dobicete link za preuzimanje
                  </p>
                </div>
              </div>
            </form>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
