"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";

export default function WorkProcess() {
  const { state } = usePortfolio();
  const { process } = state;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".process-block");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const processItems = process.items || [];

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-[#2b211b]"
    >
      <hr className="border-[#2b211b]/20 mb-8" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[#2b211b]">
          {process.titleMain || "Langkah"}{" "}
          <span className="text-[#c85628]">{process.titleHighlight || "Eksekusi"}</span>
        </h1>
        <span className="px-3.5 py-1 rounded-full border border-[#2b211b]/20 bg-[#ebd0b5]/80 font-mono text-xs font-bold text-[#c85628] uppercase tracking-wider self-start md:self-auto">
          {process.sectionBadge || "05 // PROSES KERJA"}
        </span>
      </div>

      {process.subText && (
        <p className="text-sm md:text-base text-[#2b211b]/80 font-medium max-w-2xl mb-8 leading-relaxed">
          {process.subText}
        </p>
      )}

      {/* Process Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processItems.map((step) => (
          <div
            key={step.id}
            className="process-block p-6 rounded-3xl bg-[#ebd0b5]/80 border border-[#2b211b]/20 hover:border-[#c85628] transition-all space-y-3 shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#c85628]">
                {step.phase}
              </span>
              <span className="w-7 h-7 rounded-full bg-[#f6d4b1] border border-[#2b211b]/20 flex items-center justify-center font-mono text-xs font-bold text-[#2b211b]">
                {step.num}
              </span>
            </div>
            <h3 className="text-lg font-bold font-serif text-[#2b211b] group-hover:text-[#c85628] transition-colors">
              {step.title}
            </h3>
            <p className="text-xs md:text-sm text-[#2b211b]/80 leading-relaxed font-medium">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
