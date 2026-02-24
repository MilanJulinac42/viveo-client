/**
 * @fileoverview Earnings statistics section for the celebrity dashboard.
 * Displays revenue metrics with CSS-based bar charts and progress bars.
 */

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn, formatPrice } from "@/lib/utils";
import { Card, CardBody } from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import StarRating from "@/components/ui/StarRating";
import StatCard from "./StatCard";
import type { Celebrity, EarningsSummary } from "@/lib/types";

interface EarningsSectionProps {
  /** Earnings data */
  earnings: EarningsSummary;
  /** Celebrity data for context */
  celebrity: Celebrity;
}

/**
 * Dashboard section for revenue analytics and earnings breakdown.
 */
export default function EarningsSection({ earnings, celebrity }: EarningsSectionProps) {
  const maxWeekly = useMemo(
    () => Math.max(...earnings.weeklyEarnings.map((d) => d.amount)),
    [earnings.weeklyEarnings]
  );

  const maxMonthly = useMemo(
    () => Math.max(...earnings.monthlyEarnings.map((d) => d.amount)),
    [earnings.monthlyEarnings]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Statistika zarade</h2>
        <p className="mt-1 text-sm text-slate-500">
          Pregled vaše zarade i performansi
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <ScrollReveal>
          <StatCard
            label="Ukupna zarada"
            value={earnings.totalEarnings}
            suffix=" RSD"
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
            }
            trend={{ value: 12, positive: true }}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <StatCard
            label="Završeni zahtevi"
            value={earnings.completedRequests}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend={{ value: 8, positive: true }}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <StatCard
            label="Na čekanju"
            value={earnings.pendingRequests}
            icon={
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <Card glass>
            <CardBody className="flex items-start gap-4 py-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-500">Prosečna ocena</p>
                <div className="mt-1">
                  <StarRating rating={earnings.averageRating} size="sm" showValue />
                </div>
              </div>
            </CardBody>
          </Card>
        </ScrollReveal>
      </div>

      {/* Weekly bar chart */}
      <ScrollReveal>
        <Card glass>
          <CardBody className="py-6">
            <h3 className="text-lg font-bold text-slate-900">Zarada ove nedelje</h3>
            <div className="mt-6 flex items-end justify-between gap-2" style={{ height: 200 }}>
              {earnings.weeklyEarnings.map((day, i) => {
                const heightPct = maxWeekly > 0 ? (day.amount / maxWeekly) * 100 : 0;
                return (
                  <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      {formatPrice(day.amount)}
                    </span>
                    <motion.div
                      className="w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" as const }}
                      style={{ maxHeight: "100%", minHeight: heightPct > 0 ? 8 : 0 }}
                    />
                    <span className="text-xs font-medium text-slate-600">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </ScrollReveal>

      {/* Monthly trend (horizontal bars) */}
      <ScrollReveal>
        <Card glass>
          <CardBody className="py-6">
            <h3 className="text-lg font-bold text-slate-900">Mesečni trend</h3>
            <div className="mt-6 space-y-4">
              {earnings.monthlyEarnings.map((month, i) => {
                const widthPct = maxMonthly > 0 ? (month.amount / maxMonthly) * 100 : 0;
                return (
                  <div key={month.month} className="flex items-center gap-3">
                    <span className="w-10 shrink-0 text-sm font-medium text-slate-600">
                      {month.month}
                    </span>
                    <div className="flex-1">
                      <div className="h-8 w-full overflow-hidden rounded-lg bg-slate-100">
                        <motion.div
                          className="h-full rounded-lg bg-gradient-to-r from-primary-400 to-primary-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${widthPct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" as const }}
                        />
                      </div>
                    </div>
                    <span className="w-24 shrink-0 text-right text-sm font-semibold text-slate-700">
                      {formatPrice(month.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </ScrollReveal>

      {/* Earnings by video type */}
      <ScrollReveal>
        <Card glass>
          <CardBody className="py-6">
            <h3 className="text-lg font-bold text-slate-900">Zarada po tipu videa</h3>
            <div className="mt-6 space-y-5">
              {earnings.earningsByType.map((type, i) => {
                const pct = earnings.totalEarnings > 0
                  ? (type.amount / earnings.totalEarnings) * 100
                  : 0;
                return (
                  <div key={type.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700">{type.type}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                          {type.count} videa
                        </span>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {formatPrice(type.amount)}
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-secondary-400 to-secondary-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" as const }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </ScrollReveal>
    </div>
  );
}
