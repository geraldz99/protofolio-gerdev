"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Testimonials() {
  const { state } = usePortfolio();
  const { testimonials } = state;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".testimonial-block");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
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

  const testimonialItems = testimonials.items || [];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-[var(--text-main)]"
    >
      <hr className="border-[var(--border-subtle)] mb-8" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[var(--text-main)]">
          {testimonials.titleMain || "Kritik &"}{" "}
          <span className="text-[var(--accent)]">{testimonials.titleHighlight || "Apresiasi"}</span>
        </h1>
        <span className="px-3.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider self-start md:self-auto">
          {testimonials.sectionBadge || "09 // TESTIMONI"}
        </span>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonialItems.map((item) => (
          <div
            key={item.id}
            className="testimonial-block p-6 rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-all flex flex-col justify-between space-y-4 shadow-sm group"
          >
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium italic">
              &quot;{item.content}&quot;
            </p>

            <div className="pt-3 border-t border-[var(--border-subtle)] space-y-0.5">
              <h4 className="text-sm font-bold font-serif text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                {item.author}
              </h4>
              <p className="text-[11px] font-mono text-[var(--accent)] font-bold">
                {item.role} {item.company ? `@ ${item.company}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
