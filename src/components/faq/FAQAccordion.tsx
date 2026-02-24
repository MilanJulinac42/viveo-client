"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left cursor-pointer"
            >
              <span className="pr-4 text-base font-semibold text-slate-900">
                {item.question}
              </span>
              <span
                className={`shrink-0 text-xl text-primary-500 transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? "max-h-96 pb-4" : "max-h-0"
              }`}
            >
              <p className="px-6 text-sm leading-relaxed text-slate-600">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
