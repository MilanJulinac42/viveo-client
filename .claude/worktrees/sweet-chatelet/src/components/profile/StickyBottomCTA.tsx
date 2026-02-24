/**
 * @fileoverview Sticky bottom CTA bar for mobile devices.
 * Appears when the hero CTA button scrolls out of viewport.
 * Uses IntersectionObserver to detect hero CTA visibility.
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";

interface StickyBottomCTAProps {
  price: number;
  name: string;
  slug: string;
}

export default function StickyBottomCTA({ price, name, slug }: StickyBottomCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when hero CTA is NOT visible
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden"
        >
          <Container>
            <div className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-xs text-slate-500">Video od {name}</p>
                <p className="text-lg font-bold text-primary-600">
                  {formatPrice(price)}
                </p>
              </div>
              <Link href={`/naruci/${slug}`}>
                <Button variant="primary" size="md">
                  Naruči video
                </Button>
              </Link>
            </div>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
