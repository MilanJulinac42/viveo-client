/**
 * @fileoverview Global search page for finding celebrities.
 * Reuses CatalogClient with auto-focused search input and custom hero.
 *
 * @route /pretraga
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { CatalogClient } from "@/components/catalog";

export const metadata: Metadata = {
  title: "Pretraži zvezde — Viveo",
  description:
    "Pronađite svoju omiljenu zvezdu i naručite personalizovanu video poruku na Viveo platformi.",
  openGraph: {
    title: "Pretraži zvezde — Viveo",
    description:
      "Pronađite zvezdu i naručite personalizovanu video poruku.",
    type: "website",
  },
};

export default function PretragaPage() {
  return (
    <>
      <Header />
      <main>
        {/* Search Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary-500/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />
          </div>

          <Container className="relative z-10">
            <div className="py-16 text-center sm:py-20">
              <ScrollReveal>
                <span className="inline-block text-6xl">🔍</span>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Pronađite svoju zvezdu
                </h1>
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                  <span className="h-1 w-12 rounded-full bg-secondary-400" />
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-200">
                  Pretražite po imenu, kategoriji ili opisu i pronađite savršenu
                  zvezdu za vašu personalizovanu video poruku
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        <CatalogClient showHeader={false} autoFocusSearch />
      </main>
      <Footer />
    </>
  );
}
