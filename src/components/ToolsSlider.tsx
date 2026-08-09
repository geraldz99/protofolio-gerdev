"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ToolsSlider() {
  const { state } = usePortfolio();
  const { tools } = state;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".tool-block");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
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

  const toolItems = tools.items || [];

  return (
    <section
      id="tools"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-[var(--text-main)]"
    >
      <hr className="border-[var(--border-subtle)] mb-8" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[var(--text-main)]">
          {tools.titleMain || "Teknologi &"}{" "}
          <span className="text-[var(--accent)]">{tools.titleHighlight || "Perangkat Utama"}</span>
        </h1>
        <span className="px-3.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider self-start md:self-auto">
          {tools.sectionBadge || "04 // PERANGKAT"}
        </span>
      </div>

      {/* Tools Cards Grid Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {toolItems.map((tool) => (
          <div
            key={tool.id}
            className="tool-block p-5 rounded-2xl bg-[var(--bg-card)]/70 border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all flex items-center gap-4 shadow-sm group"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--bg-main)] border border-[var(--border-strong)] flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src={tool.logoSrc}
                alt={tool.name}
                width={28}
                height={28}
                className={`object-contain dark:invert ${tool.isMonochrome ? "opacity-90" : ""}`}
                unoptimized
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-bold font-serif text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors truncate">
                {tool.name}
              </h3>
              <p className="text-[11px] font-mono text-[var(--text-muted)] truncate mt-0.5">
                {tool.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
