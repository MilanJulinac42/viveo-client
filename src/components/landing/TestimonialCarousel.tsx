/**
 * @fileoverview Embla-based testimonial carousel with autoplay.
 * Shows 1 testimonial on mobile, 2 side-by-side on tablet+.
 *
 * Client component — extracted so the parent section can stay server-side.
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardBody } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import StarRating from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

/**
 * Testimonial carousel showing 2 cards at a time on desktop.
 * Autoplay with 5s interval, dot navigation, smooth transitions.
 */
export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: false,
    },
    [
      Autoplay({
        delay: 5000,
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
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%]"
            >
              <Card padding="none" hoverable glass className="h-full">
                {/* Top gradient accent */}
                <div className="h-1 bg-gradient-to-r from-primary-400 to-secondary-400" />

                <CardBody className="relative flex flex-col gap-4 p-6 sm:p-8">
                  {/* Large decorative quote mark */}
                  <svg
                    className="absolute right-6 top-4 h-16 w-16 text-primary-100/60"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                  </svg>

                  {/* Star rating */}
                  <StarRating rating={testimonial.rating} size="sm" showValue />

                  {/* Review text */}
                  <p className="relative z-10 text-base leading-relaxed text-slate-700">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      size="md"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {testimonial.author}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <span className="text-secondary-500">★</span>
                        Video od: {testimonial.celebrityName}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
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
            aria-label={`Idi na utisak ${i + 1}`}
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
