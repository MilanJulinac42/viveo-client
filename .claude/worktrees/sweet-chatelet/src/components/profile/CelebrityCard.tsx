/**
 * CelebrityCard — Reusable celebrity card for catalog grids and "Similar celebrities" sections.
 *
 * Server Component (no "use client" directive).
 * Renders a glassmorphic, hoverable card linking to the celebrity's profile page.
 * Displays avatar, name, category badge, star rating, truncated bio, price, and a CTA.
 */

import Link from "next/link";
import { Card, CardBody, CardFooter } from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import Button from "@/components/ui/Button";
import { formatPrice, truncate } from "@/lib/utils";
import type { Celebrity } from "@/lib/types";

interface CelebrityCardProps {
  celebrity: Celebrity;
}

export default function CelebrityCard({ celebrity }: CelebrityCardProps) {
  return (
    <Link href={`/zvezda/${celebrity.slug}`} className="block group">
      <Card glass hoverable>
        {/* Gradient accent strip */}
        <div className="h-1 bg-gradient-to-r from-primary-500 to-secondary-500" />

        <CardBody className="flex flex-col items-center text-center gap-3 py-5">
          <Avatar
            src={celebrity.image}
            alt={celebrity.name}
            size="xl"
            verified={celebrity.verified}
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900">{celebrity.name}</h3>
            <Badge variant="primary" size="sm" className="mt-1">
              {celebrity.category}
            </Badge>
          </div>
          <StarRating rating={celebrity.rating} size="sm" showValue />
          <p className="text-sm text-slate-500 leading-relaxed">
            {truncate(celebrity.bio, 80)}
          </p>
        </CardBody>

        <CardFooter className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(celebrity.price)}
          </span>
          <Button variant="outline" size="sm">
            Pogledaj
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
