/**
 * @fileoverview Reusable stat card for dashboard metrics.
 * Displays a single metric with icon, animated counter, label, and optional trend.
 */

"use client";

import { cn } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/Card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import type { ReactNode } from "react";

interface StatCardProps {
  /** Stat label text */
  label: string;
  /** Numeric value to display */
  value: number;
  /** Suffix after number (e.g., "+", "%") */
  suffix?: string;
  /** Prefix before number */
  prefix?: string;
  /** Decimal places */
  decimals?: number;
  /** Icon element */
  icon: ReactNode;
  /** Trend indicator */
  trend?: { value: number; positive: boolean };
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dashboard metric card with animated counter and optional trend.
 */
export default function StatCard({
  label,
  value,
  suffix,
  prefix,
  decimals = 0,
  icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card glass className={cn(className)}>
      <CardBody className="flex items-start gap-4 py-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900">
            <AnimatedCounter
              target={value}
              suffix={suffix}
              prefix={prefix}
              decimals={decimals}
              separator="."
            />
          </p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trend.positive ? "text-accent-600" : "text-red-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}%{" "}
              <span className="text-slate-400">od prošle nedelje</span>
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
