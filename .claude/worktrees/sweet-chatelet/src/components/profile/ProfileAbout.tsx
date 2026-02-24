/**
 * @fileoverview ProfileAbout — Server component that renders the celebrity's
 * extended biography and associated tags. Displays a decorated section title,
 * the bio text, and a list of Badge-wrapped tags with staggered scroll-reveal
 * animations.
 */

import Container from "@/components/layout/Container";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Celebrity } from "@/lib/types";

interface ProfileAboutProps {
  celebrity: Celebrity;
}

export default function ProfileAbout({ celebrity }: ProfileAboutProps) {
  const bio = celebrity.extendedBio || celebrity.bio;
  const tags = celebrity.tags || [];

  return (
    <section className="py-12 sm:py-16">
      <Container size="md">
        <ScrollReveal>
          {/* Section title with decorative underline */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              O {celebrity.name}
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            {bio}
          </p>
        </ScrollReveal>

        {tags.length > 0 && (
          <ScrollReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="primary" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollReveal>
        )}
      </Container>
    </section>
  );
}
