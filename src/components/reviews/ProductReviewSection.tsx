/**
 * @fileoverview Displays reviews for a merch product.
 * Shows existing reviews and optionally a review form if user has a delivered order.
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { getProductReviews, type ReviewItem } from "@/lib/api/product-reviews";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface ProductReviewSectionProps {
  productId: string;
  /** If the user has a delivered merch order for this product, pass the order ID */
  userOrderId?: string | null;
}

export default function ProductReviewSection({
  productId,
  userOrderId,
}: ProductReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const data = await getProductReviews(productId);
      setReviews(data);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900">
        Recenzije{" "}
        {!loading && reviews.length > 0 && (
          <span className="text-base font-normal text-slate-400">({reviews.length})</span>
        )}
      </h3>

      {/* Review form for eligible users */}
      {userOrderId && (
        <ReviewForm
          orderId={userOrderId}
          reviewType="merch"
          onSuccess={fetchReviews}
        />
      )}

      {/* Reviews list */}
      <ReviewList reviews={reviews} loading={loading} />
    </div>
  );
}
