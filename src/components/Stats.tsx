"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Stats() {
  const { state } = usePortfolio();
  const { stats } = state;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const statElements = gsap.utils.toArray(".stat-value");

    statElements.forEach((stat: any) => {
      const target = parseInt(stat.getAttribute("data-target") || "0");

      gsap.to(stat, {
        innerText: target,
        duration: 2.5,
        snap: { innerText: 1 },
        ease: "power4.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 95%",
        },
      });
    });
  }, [stats]);

  const statItems = stats || [];

  return (
    <section ref={containerRef} className="py-12 px-6 max-w-4xl mx-auto text-[#2b211b]">
      <hr className="border-[#2b211b]/20 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {statItems.map((stat) => (
          <div key={stat.id} className="p-6 rounded-2xl bg-[#ebd0b5]/80 border border-[#2b211b]/20 space-y-1 shadow-sm">
            <div className="flex items-baseline justify-center">
              <span
                className="stat-value text-5xl md:text-6xl font-bold font-serif text-[#2b211b]"
                data-target={stat.value}
              >
                0
              </span>
              <span className="text-3xl font-bold font-serif text-[#c85628]">
                {stat.suffix}
              </span>
            </div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#2b211b]/70">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
