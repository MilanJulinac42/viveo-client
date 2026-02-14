/**
 * @fileoverview Hero section with two-column layout: text left, phone mockup right.
 * Gradient background with curved bottom edge flowing into HowItWorks.
 */

import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import FloatingElements from "@/components/ui/FloatingElements";
import CurvedDivider from "@/components/ui/WaveDivider";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SpotlightCursor from "@/components/ui/SpotlightCursor";
import HeroStats from "./HeroStats";
import HeroVideoMockup from "./HeroVideoMockup";
import { HERO_STATS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white">
      <SpotlightCursor />
      <FloatingElements variant="sparkles" />

      {/* Background blobs */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-secondary-500/10 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute right-1/3 top-1/4 h-64 w-64 rounded-full bg-accent-500/5 blur-3xl animate-pulse" style={{ animationDuration: "10s" }} />

      <Container>
        <div className="relative pb-28 pt-14 sm:pb-36 sm:pt-20 lg:pb-44 lg:pt-28">

          {/* Two-column: text left, phone right */}
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">

            {/* Left column — text content */}
            <div className="flex-1 text-center lg:text-left">
              {/* Badge — glassmorphism pill */}
              <ScrollReveal delay={0}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium shadow-lg shadow-black/5 backdrop-blur-xl">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary-400" />
                  </span>
                  <span>Platforma #1 za video poruke u Srbiji</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  Personalizovane video poruke od{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-secondary-300 to-secondary-500 bg-clip-text text-transparent">
                      omiljenih zvezda
                    </span>
                    <svg className="absolute -bottom-2 left-0 w-full text-secondary-400/60" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                      <path d="M1 8.5C60 2 120 2 150 5.5C180 9 240 11 299 3.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-primary-100 sm:text-xl lg:mx-0">
                  Iznenadi nekoga posebnom video porukom od poznatih ličnosti
                  iz Srbije. Savršen poklon za rođendan, godišnjicu ili bilo
                  koju priliku.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.45}>
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                  <Button variant="secondary" size="lg">🎬 Pronađi zvezdu</Button>
                  <Button variant="ghost" size="lg" className="border border-white/20 bg-white/10 text-white shadow-lg shadow-black/5 backdrop-blur-xl hover:bg-white/20">
                    Kako funkcioniše →
                  </Button>
                </div>
              </ScrollReveal>
            </div>

            {/* Right column — phone mockup */}
            <ScrollReveal delay={0.3} direction="right">
              <div className="flex-shrink-0">
                <HeroVideoMockup />
              </div>
            </ScrollReveal>
          </div>

          {/* Stats — full width below */}
          <ScrollReveal delay={0.5}>
            <HeroStats stats={HERO_STATS} />
          </ScrollReveal>
        </div>
      </Container>

      {/* Smooth curved bottom — flows into slate-50 HowItWorks */}
      <CurvedDivider position="bottom" fillColor="fill-slate-50" />
    </section>
  );
}
