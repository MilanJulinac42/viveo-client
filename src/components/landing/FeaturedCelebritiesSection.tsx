/**
 * @fileoverview Featured celebrities section with filter tabs and autoplay carousel.
 * Clean slate background — neutral tone lets cards stand out.
 */

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import FloatingElements from "@/components/ui/FloatingElements";
import ScrollReveal from "@/components/ui/ScrollReveal";
import CelebrityFilterTabs from "./CelebrityFilterTabs";
import FomoToast from "./FomoToast";
import { MOCK_CELEBRITIES } from "@/lib/constants";

export default function FeaturedCelebritiesSection() {
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
            <CelebrityFilterTabs celebrities={MOCK_CELEBRITIES.slice(0, 8)} />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">Pogledaj sve zvezde →</Button>
            </div>
          </ScrollReveal>
        </Container>

        <FomoToast />
      </div>
    </section>
  );
}
