"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FOMO_NOTIFICATIONS } from "@/lib/constants";

export default function FomoToast() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [currentNotif, setCurrentNotif] = useState<number | null>(null);
  const indexRef = useRef(0);

  const showNext = useCallback(() => {
    setCurrentNotif(indexRef.current);
    indexRef.current = (indexRef.current + 1) % FOMO_NOTIFICATIONS.length;
    // Auto-hide after 4 seconds
    setTimeout(() => setCurrentNotif(null), 4000);
  }, []);

  useEffect(() => {
    if (!isInView) return;

    // Show first one after a short delay
    const initialTimeout = setTimeout(showNext, 3000);

    // Then show periodically (random 8-12s)
    const interval = setInterval(() => {
      showNext();
    }, 8000 + Math.random() * 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isInView, showNext]);

  const notif = currentNotif !== null ? FOMO_NOTIFICATIONS[currentNotif] : null;

  return (
    <div ref={ref} className="pointer-events-none fixed bottom-4 left-4 right-4 z-50 sm:left-6 sm:right-auto">
      <AnimatePresence>
        {notif && (
          <motion.div
            key={notif.id + currentNotif}
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm sm:px-5"
          >
            <span className="text-2xl">{notif.emoji}</span>
            <div>
              <p className="text-sm font-medium text-slate-800">
                {notif.buyer} je naručio/la video od{" "}
                <span className="font-bold text-primary-600">{notif.celebrityName}</span>
              </p>
              <p className="text-xs text-slate-400">{notif.timeAgo}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
