/**
 * @fileoverview "Viđeno u medijima" press logo bar.
 * Text-based placeholder logos with optional marquee scroll.
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PRESS_LOGOS } from "@/lib/constants";

export default function PressLogoBar() {
  return (
    <section className="relative bg-white py-10 sm:py-12">
      <Container>
        <ScrollReveal>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Viđeno u medijima
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {PRESS_LOGOS.map((logo) => (
              <div
                key={logo.id}
                className="text-xl font-extrabold tracking-tight text-slate-300 transition-colors duration-300 hover:text-slate-500 sm:text-2xl"
              >
                {logo.name}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
