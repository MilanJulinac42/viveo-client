/**
 * @fileoverview Final call-to-action section with split layout and celebrity mosaic.
 * Full-width gradient with curved edges.
 */

import Container from "@/components/layout/Container";
import CurvedDivider from "@/components/ui/WaveDivider";
import FloatingElements from "@/components/ui/FloatingElements";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCursor from "@/components/ui/SpotlightCursor";
import CelebrityMosaic from "./CelebrityMosaic";
import SplitCTA from "./SplitCTA";

export default function CTASection() {
  return (
    <section className="relative">
      {/* Curved top */}
      <CurvedDivider position="top" fillColor="fill-primary-700" />

      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-16 sm:py-20">
        <SpotlightCursor />
        <FloatingElements variant="sparkles" />
        <CelebrityMosaic />

        {/* Animated background blobs */}
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-primary-400/15 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />

        <Container>
          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl text-center text-white">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Spreman da iznenadiš nekoga?
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-primary-200">
                Naruči personalizovanu video poruku danas i napravi nečiji dan
                nezaboravnim. Brzo, jednostavno i potpuno jedinstveno.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative mx-auto mt-12 max-w-3xl">
              <SplitCTA />
            </div>
          </ScrollReveal>

          {/* Trust indicators */}
          <ScrollReveal delay={0.4}>
            <div className="relative mx-auto mt-10 max-w-2xl">
              <div className="inline-flex w-full flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/15 bg-white/10 px-8 py-4 text-sm text-primary-200 shadow-lg shadow-black/5 backdrop-blur-xl">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Bez skrivenih troškova
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Garancija isporuke
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Sigurno plaćanje
                </span>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Curved bottom */}
      <CurvedDivider position="bottom" fillColor="fill-slate-50" />
    </section>
  );
}
