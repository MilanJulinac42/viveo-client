/**
 * @fileoverview Error boundary for order page.
 */

"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";

export default function OrderError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <Container className="py-20">
          <div className="mx-auto max-w-md text-center">
            <span className="text-6xl">&#9888;&#65039;</span>
            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Do&#353;lo je do gre&#353;ke
            </h1>
            <p className="mt-4 text-lg text-slate-500">
              Nismo mogli da u&#269;itamo stranicu za narud&#382;binu. Poku&#353;ajte ponovo.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={reset}>
                Poku&#353;aj ponovo
              </Button>
              <Link href="/zvezde">
                <Button variant="outline" size="lg">
                  Pretra&#382;i zvezde
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
