/**
 * @fileoverview ProfileReviewList — client component that renders a staggered,
 * animated grid of review cards for a celebrity profile page. Each card displays
 * the reviewer's avatar, name, star rating, review text, and date formatted in
 * Serbian locale. Uses framer-motion for viewport-triggered staggered fade-in
 * animations.
 */
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardBody } from "@/components/ui/Card";
import StarRating from "@/components/ui/StarRating";
import Avatar from "@/components/ui/Avatar";
import type { Testimonial } from "@/lib/types";

interface ProfileReviewListProps {
  reviews: Testimonial[];
}

export default function ProfileReviewList({ reviews }: ProfileReviewListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {reviews.map((review) => (
        <motion.div key={review.id} variants={itemVariants}>
          <Card glass hoverable>
            {/* Accent strip */}
            <div className="h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500" />
            <CardBody className="p-5">
              <div className="flex items-start gap-3">
                <Avatar src={review.avatar} alt={review.author} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-slate-900 truncate">{review.author}</h4>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {review.text}
                  </p>
                  <p className="mt-3 text-xs text-slate-400">
                    {new Date(review.date).toLocaleDateString("sr-RS", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
