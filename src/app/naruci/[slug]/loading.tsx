/**
 * @fileoverview Loading state for order page.
 */

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

export default function OrderLoading() {
  return (
    <>
      <Header />
      <main>
        {/* Hero skeleton */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-8 sm:py-10">
          <Container size="md">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 animate-pulse rounded-full bg-white/10" />
              <div className="flex-1 space-y-3">
                <div className="h-6 w-40 animate-pulse rounded-lg bg-white/10" />
                <div className="h-4 w-56 animate-pulse rounded-lg bg-white/10" />
              </div>
              <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10" />
            </div>
          </Container>
        </section>

        {/* Form skeleton */}
        <Container size="md" className="py-12">
          <div className="space-y-6">
            <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-100" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 animate-pulse rounded-2xl bg-slate-100" />
              ))}
            </div>
            <div className="space-y-4">
              <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-32 animate-pulse rounded-xl bg-slate-100" />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
