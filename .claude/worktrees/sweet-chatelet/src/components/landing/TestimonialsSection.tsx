/**
 * @fileoverview Customer testimonials section with mini mockups and social proof.
 * Features phone mockups, testimonial carousel, and statistics marquee.
 */

import Container from "@/components/layout/Container";
import FloatingElements from "@/components/ui/FloatingElements";
import Marquee from "@/components/ui/Marquee";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TestimonialCarousel from "./TestimonialCarousel";
import MiniPhoneMockup from "./MiniPhoneMockup";
import { MOCK_TESTIMONIALS, SOCIAL_PROOF_STATS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section id="utisci" className="relative bg-slate-50">
      <div className="relative py-16 sm:py-20 lg:py-24">
        <FloatingElements variant="sparkles" />

        <Container>
          {/* Section header */}
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Šta kažu naši korisnici
              </h2>
              <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                <span className="h-1 w-6 rounded-full bg-secondary-400" />
                <span className="h-1 w-12 rounded-full bg-primary-500" />
                <span className="h-1 w-6 rounded-full bg-secondary-400" />
              </div>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
                Hiljade zadovoljnih korisnika širom Srbije
              </p>
            </div>
          </ScrollReveal>

          {/* Mini phone mockups — hidden on mobile */}
          <ScrollReveal delay={0.1}>
            <div className="mb-10 hidden items-end justify-center gap-6 sm:flex">
              <MiniPhoneMockup name="Marko N." category="Glumac" accentClass="from-primary-500 to-primary-700" delay={0} />
              <MiniPhoneMockup name="Jelena P." category="Muzičarka" accentClass="from-secondary-500 to-amber-600" delay={0.5} />
              <MiniPhoneMockup name="Stefan J." category="Sportista" accentClass="from-accent-500 to-emerald-600" delay={1} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <TestimonialCarousel testimonials={MOCK_TESTIMONIALS} />
          </ScrollReveal>

          {/* Social proof ticker */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12">
              <Marquee speed={50} className="from-slate-50">
                {SOCIAL_PROOF_STATS.map((stat, i) => (
                  <span
                    key={i}
                    className="flex shrink-0 items-center gap-3 text-sm font-medium text-slate-400"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    <span className="whitespace-nowrap">{stat}</span>
                  </span>
                ))}
              </Marquee>
            </div>
          </ScrollReveal>
        </Container>
      </div>
    </section>
  );
}
