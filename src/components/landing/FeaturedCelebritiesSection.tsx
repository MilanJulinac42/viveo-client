/**
 * @fileoverview Featured celebrities section with filter tabs and autoplay carousel.
 * Fetches popular celebrities from API; falls back to mock data.
 */

import Link from "next/link";
import Container from "@/components/layout/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CelebrityFilterTabs from "./CelebrityFilterTabs";
import FomoToast from "./FomoToast";
import { getCelebrities } from "@/lib/api/celebrities";
import { MOCK_CELEBRITIES } from "@/lib/constants";

export default async function FeaturedCelebritiesSection() {
  let celebrities = MOCK_CELEBRITIES.slice(0, 8);
  try {
    const res = await getCelebrities({ sort: "popularity", pageSize: 8 });
    if (res.data.length > 0) {
      celebrities = res.data;
    }
  } catch {
    // Fallback to mock data if API is unavailable
  }

  return (
    <section id="zvezde" className="relative bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="relative py-16 sm:py-20 lg:py-24">
        <FloatingElements variant="stars" />

        <Container>
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Popularne zvezde
              </h2>
              <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                <span className="h-1 w-6 rounded-full bg-secondary-400" />
                <span className="h-1 w-12 rounded-full bg-primary-500" />
                <span className="h-1 w-6 rounded-full bg-secondary-400" />
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
                Pogledaj naše najtraženije ličnosti
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <CelebrityFilterTabs celebrities={celebrities} />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Link
                href="/zvezde"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary-500 px-8 py-3.5 text-lg font-semibold text-primary-500 transition-all duration-200 hover:bg-primary-50 active:bg-primary-100"
              >
                Pogledaj sve zvezde →
              </Link>
            </div>
          </ScrollReveal>
        </Container>

        <FomoToast />
      </div>
    </section>
  );
}
