"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function FAQ() {
  const { state } = usePortfolio();
  const { faq } = state;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = faq.items || [];

  return (
    <section id="faq" className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-[var(--text-main)]">
      <hr className="border-[var(--border-subtle)] mb-8" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[var(--text-main)]">
          {faq.titleMain || "Pertanyaan"}{" "}
          <span className="text-[var(--accent)]">{faq.titleHighlight || "Populer"}</span>
        </h1>
        <span className="px-3.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider self-start md:self-auto">
          {faq.sectionBadge || "08 // TANYA JAWAB"}
        </span>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, i) => (
          <div
            key={item.id || i}
            className={`group border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
              activeIndex === i
                ? "bg-[var(--bg-card)] border-[var(--accent)]/50 shadow-sm"
                : "bg-[var(--bg-card)]/60 border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
            }`}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <div className="p-5 flex items-center justify-between gap-4">
              <h4
                className={`text-sm md:text-base font-bold font-serif transition-colors ${
                  activeIndex === i ? "text-[var(--accent)]" : "text-[var(--text-main)]"
                }`}
              >
                {item.question}
              </h4>
              <ChevronDown
                size={18}
                className={`text-[var(--text-muted)] transition-transform duration-300 shrink-0 ${
                  activeIndex === i ? "rotate-180 text-[var(--accent)]" : ""
                }`}
              />
            </div>

            {activeIndex === i && (
              <div className="px-5 pb-5 pt-0 border-t border-[var(--border-subtle)] text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
