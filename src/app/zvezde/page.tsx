/**
 * @fileoverview Celebrity catalog/search page.
 * Displays all celebrities with search, category filtering, sorting, and pagination.
 *
 * @route /zvezde
 */

import type { Metadata } from "next";
import { MOCK_CELEBRITIES, MOCK_CATEGORIES } from "@/lib/constants";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CatalogClient } from "@/components/catalog";

export const metadata: Metadata = {
  title: "Sve zvezde — Pretraži katalog | Viveo",
  description:
    "Pretraži sve zvezde na Viveo platformi. Glumci, muzičari, sportisti, influenseri — pronađi savršenu zvezdu za personalizovanu video poruku.",
  openGraph: {
    title: "Sve zvezde — Viveo",
    description:
      "Pretraži katalog poznatih ličnosti i naruči personalizovanu video poruku.",
    type: "website",
  },
};

export default function ZvezdePage() {
  return (
    <>
      <Header />
      <main>
        <CatalogClient
          celebrities={MOCK_CELEBRITIES}
          categories={MOCK_CATEGORIES}
        />
      </main>
      <Footer />
    </>
  );
}
