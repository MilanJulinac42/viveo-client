/**
 * @fileoverview ProfileReviews — server component that serves as the top-level
 * reviews section on a celebrity profile page. Renders a section title with a
 * decorative gradient underline, the review count, and either a grid of review
 * cards (via ProfileReviewList) or a friendly empty state with a CTA button
 * encouraging the user to be the first to order a video message.
 */
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";
import ProfileReviewList from "./ProfileReviewList";
import type { Testimonial } from "@/lib/types";

interface ProfileReviewsProps {
  reviews: Testimonial[];
  celebrityName: string;
}

export default function ProfileReviews({ reviews, celebrityName }: ProfileReviewsProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container size="md">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Utisci korisnika{reviews.length > 0 ? ` (${reviews.length})` : ""}
            </h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
          </div>
        </ScrollReveal>

        {reviews.length > 0 ? (
          <ProfileReviewList reviews={reviews} />
        ) : (
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <span className="text-4xl">💬</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-700">
                Još nema utisaka
              </h3>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Budi prvi koji će naručiti video poruku od {celebrityName} i
                podeliti svoje iskustvo!
              </p>
              <Button variant="primary" size="md" className="mt-6">
                Naruči video poruku
              </Button>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}
