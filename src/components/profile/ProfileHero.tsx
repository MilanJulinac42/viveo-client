/**
 * ProfileHero — Hero section for the celebrity profile page.
 *
 * Server Component (no "use client" directive).
 * Renders a full-width gradient hero with the celebrity's avatar, name, category,
 * stats, bio, price, and a CTA button. Includes decorative background elements
 * and a right-side visual motif on desktop. Responsive: stacked on mobile,
 * side-by-side on lg breakpoint.
 */

import Container from "@/components/layout/Container";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProfileStats from "./ProfileStats";
import { formatPrice } from "@/lib/utils";
import type { Celebrity } from "@/lib/types";

interface ProfileHeroProps {
  celebrity: Celebrity;
}

export default function ProfileHero({ celebrity }: ProfileHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center py-12 sm:py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
          {/* Left: Info */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-1">
            <ScrollReveal>
              {/* Avatar with gradient border ring */}
              <div className="rounded-full bg-gradient-to-br from-secondary-400 to-primary-300 p-1">
                <Avatar
                  src={celebrity.image}
                  alt={celebrity.name}
                  size="2xl"
                  verified={celebrity.verified}
                  className="[&_img]:ring-4 [&_img]:ring-primary-700"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                {celebrity.name}
              </h1>
              <div className="mt-3">
                <Badge variant="secondary" size="md">
                  {celebrity.category}
                </Badge>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-4 overflow-x-auto">
                <ProfileStats
                  responseTime={celebrity.responseTime}
                  rating={celebrity.rating}
                  reviewCount={celebrity.reviewCount}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
                {celebrity.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-white/60">Cena video poruke</p>
                  <p className="text-2xl font-bold text-white">{formatPrice(celebrity.price)}</p>
                </div>
                <Button variant="secondary" size="lg" id="hero-cta">
                  Naruci video poruku
                </Button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Decorative element (desktop only) */}
          <div className="mt-12 hidden lg:mt-0 lg:block lg:flex-1">
            <ScrollReveal direction="right" delay={0.3}>
              <div className="relative mx-auto w-80">
                {/* Decorative stacked circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-72 w-72 rounded-full border border-white/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-56 w-56 rounded-full border border-white/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-40 w-40 rounded-full bg-white/5 backdrop-blur-sm" />
                </div>
                {/* Center content */}
                <div className="relative flex h-80 items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl">🎬</div>
                    <p className="mt-3 text-sm font-medium text-white/60">Video poruka</p>
                    <p className="text-xs text-white/40">Personalizovano za tebe</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
