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
    <section id="faq" className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-[#2b211b]">
      <hr className="border-[#2b211b]/20 mb-8" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[#2b211b]">
          {faq.titleMain || "Pertanyaan"}{" "}
          <span className="text-[#c85628]">{faq.titleHighlight || "Populer"}</span>
        </h1>
        <span className="px-3.5 py-1 rounded-full border border-[#2b211b]/20 bg-[#ebd0b5]/80 font-mono text-xs font-bold text-[#c85628] uppercase tracking-wider self-start md:self-auto">
          {faq.sectionBadge || "08 // TANYA JAWAB"}
        </span>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, i) => (
          <div
            key={item.id || i}
            className={`group border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
              activeIndex === i
                ? "bg-[#ebd0b5] border-[#c85628]/50 shadow-sm"
                : "bg-[#ebd0b5]/60 border-[#2b211b]/20 hover:border-[#2b211b]/40"
            }`}
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <div className="p-5 flex items-center justify-between gap-4">
              <h4
                className={`text-sm md:text-base font-bold font-serif transition-colors ${
                  activeIndex === i ? "text-[#c85628]" : "text-[#2b211b]"
                }`}
              >
                {item.question}
              </h4>
              <ChevronDown
                size={18}
                className={`text-[#2b211b]/60 transition-transform duration-300 shrink-0 ${
                  activeIndex === i ? "rotate-180 text-[#c85628]" : ""
                }`}
              />
            </div>

            {activeIndex === i && (
              <div className="px-5 pb-5 pt-0 border-t border-[#2b211b]/10 text-xs md:text-sm text-[#2b211b]/80 leading-relaxed font-medium">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
