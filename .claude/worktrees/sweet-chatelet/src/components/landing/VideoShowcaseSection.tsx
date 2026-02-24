/**
 * @fileoverview "Kako izgleda video?" section with 3 phone mockups
 * showing different types of video messages.
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import VideoShowcaseMockup from "./VideoShowcaseMockup";
import { VIDEO_SHOWCASE_ITEMS } from "@/lib/constants";

export default function VideoShowcaseSection() {
  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(108,60,225,0.03),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(245,158,11,0.03),transparent_50%)]" />

      <Container>
        <ScrollReveal>
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Kako izgleda video poruka?
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
              <span className="h-1 w-12 rounded-full bg-primary-500" />
              <span className="h-1 w-6 rounded-full bg-secondary-400" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
              Svaka prilika zaslužuje posebnu poruku
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Phone mockups */}
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-6 lg:gap-10">
          {VIDEO_SHOWCASE_ITEMS.map((item, i) => (
            <div key={item.id} className="text-center">
              <VideoShowcaseMockup
                emoji={item.emoji}
                celebrityName={item.celebrityName}
                category={item.category}
                accentFrom={item.accentFrom}
                accentTo={item.accentTo}
                message={item.message}
                delay={i * 0.2}
              />
              <ScrollReveal delay={0.3 + i * 0.15}>
                <p className="mt-4 text-sm font-bold text-slate-700">{item.title}</p>
                <p className="text-xs text-slate-400">{item.occasion}</p>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
