/**
 * @fileoverview Loading state for category page.
 */

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

export default function CategoryLoading() {
  return (
    <>
      <Header />
      <main>
        {/* Hero skeleton */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-12 sm:py-16">
          <Container className="text-center">
            <div className="mx-auto h-8 w-40 animate-pulse rounded-lg bg-white/10" />
            <div className="mx-auto mt-4 h-4 w-64 animate-pulse rounded-lg bg-white/10" />
          </Container>
        </section>

        {/* Grid skeleton */}
        <Container className="py-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100" />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
