"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatPrice, getPlaceholderImage } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/proizvod/${product.slug}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-100",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <img
            src={getPlaceholderImage(product.name, 400)}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        )}
        {product.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" size="sm">Istaknuto</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-slate-500 mb-1">{product.celebrityName}</p>
        <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        {product.categoryName && (
          <Badge variant="default" size="sm" className="mb-2">
            {product.categoryName}
          </Badge>
        )}
        <p className="text-lg font-bold text-primary-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
