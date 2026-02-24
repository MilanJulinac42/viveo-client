/**
 * @fileoverview Loading state for celebrity profile page.
 * Shows skeleton UI while data is being fetched.
 */

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

export default function CelebrityProfileLoading() {
  return (
    <>
      <Header />
      <main>
        {/* Hero skeleton */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <Container className="relative z-10">
            <div className="py-10 sm:py-16 lg:py-20">
              <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
                <div className="h-32 w-32 animate-pulse rounded-full bg-white/10 lg:h-40 lg:w-40" />
                <div className="flex-1 space-y-4">
                  <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-white/10 lg:mx-0" />
                  <div className="mx-auto h-4 w-64 animate-pulse rounded-lg bg-white/10 lg:mx-0" />
                  <div className="flex justify-center gap-3 lg:justify-start">
                    <div className="h-8 w-20 animate-pulse rounded-full bg-white/10" />
                    <div className="h-8 w-24 animate-pulse rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Content skeleton */}
        <Container className="py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-6 w-32 animate-pulse rounded-lg bg-slate-100" />
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded-lg bg-slate-100" />
                <div className="h-4 w-5/6 animate-pulse rounded-lg bg-slate-100" />
                <div className="h-4 w-4/6 animate-pulse rounded-lg bg-slate-100" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 animate-pulse rounded-2xl bg-slate-100" />
              <div className="h-32 animate-pulse rounded-2xl bg-slate-100" />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
