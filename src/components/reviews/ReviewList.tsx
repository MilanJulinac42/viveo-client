/**
 * @fileoverview Shared review list display component.
 * Renders a list of review items with star ratings, author info, and text.
 */

import type { ReviewItem } from "@/lib/api/product-reviews";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/utils";

interface ReviewListProps {
  reviews: ReviewItem[];
  loading: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "text-yellow-400" : "text-slate-200"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ReviewList({ reviews, loading }: ReviewListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-white border border-slate-100" />
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-10 text-center">
        <p className="text-slate-400">Još nema recenzija</p>
        <p className="mt-1 text-sm text-slate-300">Budite prvi koji će ostaviti recenziju!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-2xl border border-slate-100 bg-white p-5 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-start gap-4">
            {/* Author avatar */}
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-100">
              <Image
                src={review.authorAvatar || getPlaceholderImage(review.authorName)}
                alt={review.authorName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900">{review.authorName}</p>
                <time className="text-xs text-slate-400 shrink-0">{formatDate(review.createdAt)}</time>
              </div>

              {/* Rating */}
              <StarRating rating={review.rating} />

              {/* Text */}
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{review.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
