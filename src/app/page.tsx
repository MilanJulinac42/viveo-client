/**
 * @fileoverview Landing page — the main entry point for the Viveo client portal.
 * Assembles all landing sections between the Header and Footer layout components.
 */

import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  HowItWorksSection,
  FeaturedCelebritiesSection,
  MarqueeTicker,
  CategoriesSection,
  TestimonialsSection,
  VideoShowcaseSection,
  FAQSection,
  PressLogoBar,
  CTASection,
} from "@/components/landing";

/**
 * Home/landing page component.
 * Renders the full marketing page with all sections in order.
 *
 * @returns Complete landing page
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <MarqueeTicker />
        <PressLogoBar />
        <FeaturedCelebritiesSection />
        <VideoShowcaseSection />
        <CategoriesSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
