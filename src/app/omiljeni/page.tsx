/**
 * @fileoverview Favorites / Wishlist page — "Moji omiljeni"
 * Protected route showing user's saved celebrities, merch products, and digital products.
 *
 * @route /omiljeni
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Moji omiljeni — Viveo",
  description:
    "Vaša lista omiljenih zvezda, proizvoda i digitalnog sadržaja na Viveo platformi.",
  robots: { index: false, follow: false },
};

export default function OmiljeniPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <ProtectedRoute>
          <Container>
            <FavoritesClient />
          </Container>
        </ProtectedRoute>
      </main>
      <Footer />
    </>
  );
}
