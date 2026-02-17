/**
 * @fileoverview Review submission modal for completed fan orders.
 * Allows rating (1-5 stars) and text review with API submission.
 */

"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { createReview } from "@/lib/api/reviews";
import { ApiRequestError } from "@/lib/api/client";
import Button from "@/components/ui/Button";

interface ReviewModalProps {
  /** Order ID to submit review for */
  orderId: string;
  /** Celebrity name for display */
  celebrityName: string;
  /** Close callback */
  onClose: () => void;
  /** Callback when review is submitted successfully */
  onSubmitted: () => void;
}

export default function ReviewModal({
  orderId,
  celebrityName,
  onClose,
  onSubmitted,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!text.trim()) {
      setError("Molimo unesite tekst recenzije.");
      return;
    }
    if (text.trim().length < 10) {
      setError("Recenzija mora imati najmanje 10 karaktera.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await createReview({ orderId, rating, text: text.trim() });
      setSuccess(true);
      setTimeout(() => {
        onSubmitted();
        onClose();
      }, 1500);
    } catch (err) {
      if (err instanceof ApiRequestError) {
        setError(err.message);
      } else {
        setError("Gre\u0161ka pri slanju recenzije. Poku\u0161ajte ponovo.");
      }
    } finally {
      setSubmitting(false);
    }
  }, [orderId, rating, text, onSubmitted, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {success ? (
            <div className="py-8 text-center">
              <span className="text-5xl">&#11088;</span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Hvala na recenziji!
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Va\u0161a ocena je uspe\u0161no sa\u010duvana.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  Ocenite iskustvo
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Kako biste ocenili video od {celebrityName}?
                </p>
              </div>

              {/* Star rating */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Ocena
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="text-3xl transition-transform duration-150 hover:scale-110"
                    >
                      <span
                        className={cn(
                          "transition-colors duration-150",
                          (hoveredStar || rating) >= star
                            ? "text-secondary-500"
                            : "text-slate-200"
                        )}
                      >
                        &#9733;
                      </span>
                    </button>
                  ))}
                  <span className="ml-2 self-center text-sm font-medium text-slate-500">
                    {rating}/5
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="mb-6">
                <label htmlFor="review-text" className="mb-2 block text-sm font-medium text-slate-700">
                  Va\u0161 utisak
                </label>
                <textarea
                  id="review-text"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Opi\u0161ite va\u0161e iskustvo sa video porukom..."
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                />
                <p className="mt-1 text-xs text-slate-400">
                  {text.length} karaktera (min. 10)
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <Button variant="ghost" onClick={onClose} disabled={submitting}>
                  Otka\u017ei
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "Slanje..." : "Po\u0161alji recenziju"}
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
