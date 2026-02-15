/**
 * @fileoverview Registration page with gradient hero and centered register form.
 *
 * @example
 * ```
 * Route: /registracija
 * ```
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = {
  title: "Registracija — Viveo",
  description:
    "Kreirajte besplatan Viveo nalog i naručite personalizovane video poruke od omiljenih zvezda.",
  openGraph: {
    title: "Registracija — Viveo",
    description:
      "Kreirajte besplatan Viveo nalog i naručite personalizovane video poruke od omiljenih zvezda.",
    type: "website",
  },
};

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          {/* Decorative blur orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary-500/10 blur-3xl" />
          </div>

          <Container className="relative z-10">
            <div className="py-16 text-center sm:py-20">
              <ScrollReveal>
                <span className="inline-block text-5xl sm:text-6xl">
                  {"\u{1F680}"}
                </span>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Kreirajte nalog
                </h1>
                {/* Decorative underline */}
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                  <span className="h-1 w-12 rounded-full bg-secondary-400" />
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                </div>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-200">
                  Registrujte se besplatno i započnite Viveo avanturu
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Register form */}
        <section className="py-16 sm:py-20">
          <Container size="sm">
            <ScrollReveal>
              <div className="mx-auto max-w-md">
                <RegisterForm />
              </div>
            </ScrollReveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
