/**
 * @fileoverview Embla-based celebrity carousel with autoplay,
 * drag-to-scroll, loop, and responsive slide counts.
 * Each card has a subtle 3D tilt effect on hover.
 *
 * Client component — extracted so the parent section can stay server-side.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardBody, CardFooter } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import type { Celebrity } from "@/lib/types";

interface CelebrityCarouselProps {
  celebrities: Celebrity[];
}

/** Single celebrity card with 3D tilt effect on hover */
function TiltCelebrityCard({ celebrity }: { celebrity: Celebrity }) {
  const tilt = useTilt({ maxAngle: 12 });

  return (
    <div
      ref={tilt.ref}
      className="h-full rounded-2xl transition-transform duration-300 ease-out"
      {...tilt.handlers}
    >
      <Card glass className="h-full transition-all duration-300 hover:shadow-xl hover:border-primary-100">
        <div className="h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-400" />
        <CardBody className="flex flex-col items-center pt-5 text-center">
          <Avatar src={celebrity.image} alt={celebrity.name} size="xl" verified={celebrity.verified} />
          <h3 className="mt-4 text-lg font-bold text-slate-900">{celebrity.name}</h3>
          <Badge variant="primary" size="sm" className="mt-2">{celebrity.category}</Badge>
          <div className="mt-3 flex items-center gap-2">
            <StarRating rating={celebrity.rating} size="sm" />
            <span className="text-xs text-slate-500">({celebrity.reviewCount})</span>
          </div>
          <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Odgovara za ~{celebrity.responseTime}h
          </p>
        </CardBody>
        <CardFooter className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">od</p>
            <p className="text-lg font-bold text-primary-600">{formatPrice(celebrity.price)}</p>
          </div>
          <Button size="sm" variant="outline">Naruči</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/**
 * Horizontally scrollable celebrity carousel.
 * Shows 1 card on mobile, 2 on tablet, 4 on desktop.
 * Autoplay with 3s interval, loops, pauses on hover.
 */
export default function CelebrityCarousel({ celebrities }: CelebrityCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return (
    <div>
      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4">
          {celebrities.map((celebrity) => (
            <div
              key={celebrity.id}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
            >
              <TiltCelebrityCard celebrity={celebrity} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Idi na slajd ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === selectedIndex
                ? "w-8 bg-primary-500"
                : "w-2.5 bg-slate-300 hover:bg-slate-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}
