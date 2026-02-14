/**
 * @fileoverview Contact page with contact form and info.
 * Static page — form is presentational only (no backend yet).
 *
 * @route /kontakt
 */

import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Kontakt — Viveo",
  description:
    "Kontaktirajte Viveo tim. Imate pitanje, sugestiju ili želite da postanete zvezda na platformi? Pišite nam!",
  openGraph: {
    title: "Kontakt — Viveo",
    description: "Stupite u kontakt sa Viveo timom.",
    type: "website",
  },
};

/** Contact info items */
const CONTACT_INFO = [
  {
    icon: "📧",
    title: "Email",
    value: "info@viveo.rs",
    description: "Odgovaramo u roku od 24h",
  },
  {
    icon: "📱",
    title: "Telefon",
    value: "+381 11 123 4567",
    description: "Pon–Pet, 9:00–17:00",
  },
  {
    icon: "📍",
    title: "Adresa",
    value: "Beograd, Srbija",
    description: "Knez Mihailova 10",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />
          </div>
          <Container className="relative z-10">
            <div className="py-16 text-center sm:py-20">
              <ScrollReveal>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Kontaktirajte nas
                </h1>
                <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                  <span className="h-1 w-12 rounded-full bg-secondary-400" />
                  <span className="h-1 w-6 rounded-full bg-white/30" />
                </div>
                <p className="mx-auto mt-6 max-w-xl text-lg text-primary-200">
                  Imate pitanje, sugestiju ili želite da postanete zvezda?
                  Rado ćemo vam pomoći!
                </p>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Contact Info + Form */}
        <section className="py-16 sm:py-20">
          <Container size="md">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
              {/* Left: Contact info */}
              <div className="lg:col-span-2">
                <ScrollReveal>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Informacije
                  </h2>
                  <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
                </ScrollReveal>

                <div className="mt-8 space-y-6">
                  {CONTACT_INFO.map((item, i) => (
                    <ScrollReveal key={item.title} delay={0.1 * (i + 1)}>
                      <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-2xl">
                          {item.icon}
                        </span>
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {item.title}
                          </h3>
                          <p className="text-primary-600">{item.value}</p>
                          <p className="text-sm text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Right: Contact form */}
              <div className="lg:col-span-3">
                <ScrollReveal delay={0.1}>
                  <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                      Pošaljite poruku
                    </h2>
                    <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />

                    <form className="mt-8 space-y-5">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          Ime i prezime
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Vaše ime"
                          className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          Email adresa
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="vas@email.com"
                          className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          Tema
                        </label>
                        <select
                          id="subject"
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        >
                          <option value="">Izaberite temu</option>
                          <option value="general">Opšte pitanje</option>
                          <option value="order">Pitanje o narudžbini</option>
                          <option value="talent">Želim da postanem zvezda</option>
                          <option value="business">Poslovna saradnja</option>
                          <option value="other">Ostalo</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-1.5 block text-sm font-medium text-slate-700"
                        >
                          Poruka
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Opišite vaše pitanje ili sugestiju..."
                          className="w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-600 hover:shadow-lg active:bg-primary-700 sm:w-auto"
                      >
                        Pošalji poruku
                      </button>
                    </form>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
