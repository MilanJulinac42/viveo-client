/**
 * @fileoverview Shared review form component for merch and digital products.
 * Star rating selector + text input + submit.
 */

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { submitReview } from "@/lib/api/product-reviews";
import Button from "@/components/ui/Button";

interface ReviewFormProps {
  orderId: string;
  reviewType: "merch" | "digital";
  onSuccess?: () => void;
}

export default function ReviewForm({ orderId, reviewType, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (rating === 0) {
      setError("Izaberite ocenu");
      return;
    }
    if (text.trim().length < 3) {
      setError("Unesite tekst recenzije");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitReview({
        orderId,
        rating,
        text: text.trim(),
        reviewType,
      });
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Greška pri slanju recenzije");
    } finally {
      setSubmitting(false);
    }
  }, [rating, text, orderId, reviewType, onSuccess]);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center">
        <p className="text-lg font-semibold text-accent-700">Hvala na recenziji! ⭐</p>
        <p className="mt-1 text-sm text-accent-600">Vaša recenzija je uspešno sačuvana.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <h4 className="text-base font-semibold text-slate-900">Napišite recenziju</h4>

      {/* Star rating */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="text-3xl transition-transform duration-150 hover:scale-110"
          >
            <span
              className={cn(
                "transition-colors duration-150",
                (hoveredRating || rating) >= star ? "text-yellow-400" : "text-slate-200"
              )}
            >
              ★
            </span>
          </button>
        ))}
      </div>

      {/* Text input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Podelite vaše iskustvo..."
        rows={3}
        className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
      />

      {/* Error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Submit */}
      <Button variant="primary" size="sm" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Slanje..." : "Pošalji recenziju"}
      </Button>
    </div>
  );
}
