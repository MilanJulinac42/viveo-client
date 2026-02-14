/**
 * @fileoverview Calendar/availability section for the celebrity dashboard.
 * Allows setting daily availability and max request limits.
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SERBIAN_DAYS } from "@/lib/constants";
import { Card, CardBody } from "@/components/ui/Card";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { AvailabilitySlot } from "@/lib/types";

interface CalendarSectionProps {
  /** Availability data for each day */
  availability: AvailabilitySlot[];
}

/**
 * Dashboard section for managing weekly availability schedule.
 */
export default function CalendarSection({ availability: initialAvailability }: CalendarSectionProps) {
  const [slots, setSlots] = useState(initialAvailability);
  const [showSuccess, setShowSuccess] = useState(false);

  const availableDays = useMemo(() => slots.filter((s) => s.available).length, [slots]);
  const totalCapacity = useMemo(
    () => slots.reduce((sum, s) => sum + (s.available ? s.maxRequests : 0), 0),
    [slots]
  );

  const toggleDay = useCallback((dayOfWeek: number) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.dayOfWeek === dayOfWeek
          ? { ...s, available: !s.available, maxRequests: !s.available ? 5 : 0 }
          : s
      )
    );
  }, []);

  const setMaxRequests = useCallback((dayOfWeek: number, max: number) => {
    setSlots((prev) =>
      prev.map((s) =>
        s.dayOfWeek === dayOfWeek ? { ...s, maxRequests: Math.max(0, Math.min(20, max)) } : s
      )
    );
  }, []);

  const handleSave = useCallback(() => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  const handleReset = useCallback(() => {
    setSlots(initialAvailability);
  }, [initialAvailability]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Raspored dostupnosti</h2>
        <p className="mt-1 text-sm text-slate-500">
          Podesite dane i maksimalni broj zahteva po danu
        </p>
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl bg-accent-50 border border-accent-200 px-4 py-3 text-sm font-medium text-accent-700"
          >
            ✓ Raspored je uspešno sačuvan!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <ScrollReveal>
        <div className="grid grid-cols-2 gap-4">
          <Card glass>
            <CardBody className="py-5 text-center">
              <p className="text-3xl font-extrabold text-primary-600">
                <AnimatedCounter target={availableDays} />/7
              </p>
              <p className="mt-1 text-sm text-slate-500">Dostupni dana</p>
            </CardBody>
          </Card>
          <Card glass>
            <CardBody className="py-5 text-center">
              <p className="text-3xl font-extrabold text-primary-600">
                <AnimatedCounter target={totalCapacity} />
              </p>
              <p className="mt-1 text-sm text-slate-500">Zahteva nedeljno</p>
            </CardBody>
          </Card>
        </div>
      </ScrollReveal>

      {/* Weekly schedule */}
      <ScrollReveal delay={0.1}>
        <Card glass>
          <CardBody className="divide-y divide-slate-100 py-2">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={cn(
                  "flex items-center justify-between gap-4 px-2 py-4 transition-opacity duration-200",
                  !slot.available && "opacity-50"
                )}
              >
                {/* Day name */}
                <span className="w-28 shrink-0 text-sm font-semibold text-slate-700">
                  {SERBIAN_DAYS[slot.dayOfWeek]}
                </span>

                {/* Toggle */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={slot.available}
                  aria-label={`${SERBIAN_DAYS[slot.dayOfWeek]} dostupnost`}
                  onClick={() => toggleDay(slot.dayOfWeek)}
                  className={cn(
                    "relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200",
                    slot.available ? "bg-accent-500" : "bg-slate-300"
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-5 w-5 translate-y-1 rounded-full bg-white shadow-md transition-transform duration-200",
                      slot.available ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>

                {/* Max requests input */}
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-500 hidden sm:inline">Maks:</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={slot.maxRequests}
                    onChange={(e) => setMaxRequests(slot.dayOfWeek, Number(e.target.value))}
                    disabled={!slot.available}
                    className={cn(
                      "w-16 rounded-lg border border-slate-200 bg-white/80 px-2 py-1.5 text-center text-sm text-slate-700 transition-all duration-200 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
                      !slot.available && "cursor-not-allowed opacity-40"
                    )}
                  />
                </div>

                {/* Visual capacity dots */}
                <div className="hidden items-center gap-0.5 sm:flex">
                  {Array.from({ length: Math.min(slot.maxRequests, 10) }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-2 w-2 rounded-full",
                        slot.available ? "bg-accent-400" : "bg-slate-200"
                      )}
                    />
                  ))}
                  {slot.maxRequests > 10 && (
                    <span className="ml-1 text-xs text-slate-400">+{slot.maxRequests - 10}</span>
                  )}
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
      </ScrollReveal>

      {/* Save / Cancel */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="ghost" onClick={handleReset}>
          Poništi izmene
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Sačuvaj raspored
        </Button>
      </div>
    </div>
  );
}
