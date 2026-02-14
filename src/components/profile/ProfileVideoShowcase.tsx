/**
 * @fileoverview ProfileVideoShowcase — Server component that wraps the
 * ProfileVideoMockups client component with a section layout. Renders a
 * centered heading, decorative gradient underline, and a subtitle prompting
 * the user to choose a video message type. Returns null when the celebrity
 * has no video types configured.
 */

import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProfileVideoMockups from "./ProfileVideoMockups";
import type { Celebrity } from "@/lib/types";

interface ProfileVideoShowcaseProps {
  celebrity: Celebrity;
}

export default function ProfileVideoShowcase({ celebrity }: ProfileVideoShowcaseProps) {
  const videoTypes = celebrity.videoTypes || [];

  if (videoTypes.length === 0) return null;

  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <Container size="md">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Vrste video poruka
            </h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500" />
            <p className="mt-4 text-slate-500">
              Izaberite tip poruke koji želite da {celebrity.name} snimi za vas
            </p>
          </div>
        </ScrollReveal>

        <ProfileVideoMockups videoTypes={videoTypes} />
      </Container>
    </section>
  );
}
