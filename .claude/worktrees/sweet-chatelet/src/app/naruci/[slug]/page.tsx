/**
 * @fileoverview Order page for requesting a personalized video.
 * Fetches celebrity from API and displays order form.
 *
 * @route /naruci/[slug]
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCelebrity } from "@/lib/api/celebrities";
import { formatPrice, formatResponseTime } from "@/lib/utils";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { OrderForm } from "@/components/order";

// ---------------------------------------------------------------------------
// Dynamic metadata (SEO)
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const celebrity = await getCelebrity(slug);
    return {
      title: `Naruči video od ${celebrity.name} — Viveo`,
      description: `Naruči personalizovanu video poruku od ${celebrity.name}. Cena: ${formatPrice(celebrity.price)}. ${celebrity.bio}`,
      openGraph: {
        title: `Naruči video od ${celebrity.name} — Viveo`,
        description: `Personalizovana video poruka od ${celebrity.name} za ${formatPrice(celebrity.price)}`,
        type: "website",
      },
    };
  } catch {
    return { title: "Narudžbina nije pronađena — Viveo" };
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function OrderPage({ params }: PageProps) {
  const { slug } = await params;

  let celebrity;
  try {
    celebrity = await getCelebrity(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        {/* Celebrity mini-card hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary-500/10 blur-3xl" />
          </div>
          <Container size="md" className="relative z-10">
            <div className="py-8 sm:py-10">
              <ScrollReveal>
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left sm:gap-6">
                  {/* Avatar */}
                  <div className="shrink-0 rounded-full bg-gradient-to-br from-secondary-400 to-primary-300 p-0.5">
                    <Avatar
                      src={celebrity.image}
                      alt={celebrity.name}
                      size="xl"
                      verified={celebrity.verified}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                      {celebrity.name}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <Badge variant="secondary" size="sm">
                        {celebrity.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <StarRating rating={celebrity.rating} size="sm" showValue />
                      </div>
                      <span className="text-xs text-primary-200">
                        Rok: {formatResponseTime(celebrity.responseTime)}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-center">
                    <p className="text-xs text-primary-200">Cena</p>
                    <p className="text-2xl font-extrabold text-white">
                      {formatPrice(celebrity.price)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* Order form */}
        <section className="py-8 sm:py-12">
          <Container size="md">
            <OrderForm celebrity={celebrity} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
