/**
 * @fileoverview Reusable debounced search input with magnifying glass icon and clear button.
 * Debounces user input by 300ms before propagating changes to parent.
 *
 * @example
 * ```tsx
 * <SearchInput value={query} onChange={setQuery} placeholder="Pretraži..." />
 * ```
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  /** Current search value (controlled) */
  value: string;
  /** Callback when debounced value changes */
  onChange: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Pretražite zvezde...",
  className,
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  // Sync from parent (e.g., when parent resets value)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce: propagate to parent after 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  const handleClear = useCallback(() => {
    setLocalValue("");
    onChange("");
  }, [onChange]);

  return (
    <div className={cn("relative", className)}>
      {/* Magnifying glass icon */}
      <svg
        className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-11 pr-10 text-sm text-slate-700 backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
      />

      {/* Clear button */}
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition-colors hover:text-slate-600"
          aria-label="Obriši pretragu"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
