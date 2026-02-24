/**
 * @fileoverview Hook for 3D perspective tilt effect on hover.
 * Directly manipulates el.style.transform via DOM for zero CSS conflicts.
 * No inline React styles, no CSS classes needed — pure imperative DOM.
 */

"use client";

import { useCallback, useRef, type RefCallback, type MouseEvent as ReactMouseEvent } from "react";

interface UseTiltOptions {
  /** Maximum rotation angle in degrees. Default 5 */
  maxAngle?: number;
  /** Perspective distance in pixels. Default 1000 */
  perspective?: number;
}

/**
 * Provides a ref callback and mouse handlers for 3D tilt on hover.
 * Directly sets `el.style.transform` via DOM — no React state, no inline
 * style props, no CSS class conflicts.
 *
 * @example
 * ```tsx
 * const tilt = useTilt({ maxAngle: 8 });
 * <div ref={tilt.ref} {...tilt.handlers} className="transition-transform duration-300">
 *   Card content
 * </div>
 * ```
 */
export function useTilt(options: UseTiltOptions = {}) {
  const { maxAngle = 5, perspective = 1000 } = options;
  const elRef = useRef<HTMLElement | null>(null);

  const ref: RefCallback<HTMLElement> = useCallback((node) => {
    elRef.current = node;
  }, []);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      const el = elRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const rotateX = -y * maxAngle;
      const rotateY = x * maxAngle;

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    },
    [maxAngle, perspective],
  );

  const onMouseLeave = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return {
    ref,
    handlers: { onMouseMove, onMouseLeave },
  };
}
