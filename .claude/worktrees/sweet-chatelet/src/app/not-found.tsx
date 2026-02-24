/**
 * @fileoverview Custom 404 Not Found page.
 * Displays a friendly error message with navigation options.
 *
 * @route Catches all unmatched routes
 */

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Stranica nije pronađena — Viveo",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28 lg:py-36">
          <Container size="sm">
            <div className="text-center">
              {/* Large 404 */}
              <p className="text-8xl font-extrabold text-primary-500/20 sm:text-9xl">
                404
              </p>

              {/* Emoji */}
              <span className="-mt-4 block text-6xl">🎬</span>

              {/* Title */}
              <h1 className="mt-6 text-2xl font-bold text-slate-900 sm:text-3xl">
                Ova scena nije snimljena
              </h1>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-md text-base text-slate-500">
                Stranica koju tražite ne postoji ili je premeštena.
                Ali ne brinite — imamo mnogo zvezda koje čekaju da vam
                snime poruku!
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-600 hover:shadow-lg"
                >
                  Nazad na početnu
                </Link>
                <Link
                  href="/zvezde"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary-500 px-6 py-3 text-base font-semibold text-primary-500 transition-all duration-200 hover:bg-primary-50"
                >
                  Pretraži zvezde
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
