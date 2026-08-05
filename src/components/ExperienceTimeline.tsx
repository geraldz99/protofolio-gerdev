"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ExperienceTimeline() {
  const { state } = usePortfolio();
  const { experience } = state;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".exp-block");
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

  const expItems = experience.items || [];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-[#2b211b]"
    >
      <hr className="border-[#2b211b]/20 mb-8" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[#2b211b]">
          {experience.titleMain || "Pengalaman"}{" "}
          <span className="text-[#c85628]">{experience.titleHighlight || "Kerja"}</span>
        </h1>
        <span className="px-3.5 py-1 rounded-full border border-[#2b211b]/20 bg-[#ebd0b5]/80 font-mono text-xs font-bold text-[#c85628] uppercase tracking-wider self-start md:self-auto">
          {experience.sectionBadge || "02 // REKAM JEJAK"}
        </span>
      </div>

      {experience.subText && (
        <p className="text-sm md:text-base text-[#2b211b]/80 font-medium max-w-2xl mb-8 leading-relaxed">
          {experience.subText}
        </p>
      )}

      {/* Timeline List Cards */}
      <div className="space-y-6">
        {expItems.map((exp) => (
          <div
            key={exp.id}
            className="exp-block p-6 md:p-8 rounded-3xl border border-[#2b211b]/20 bg-[#ebd0b5]/70 hover:bg-[#ebd0b5] transition-all space-y-4 shadow-sm group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2b211b]/15 pb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[#2b211b] group-hover:text-[#c85628] transition-colors">
                  {exp.role}
                </h3>
                <p className="text-xs font-mono text-[#c85628] font-bold mt-0.5">
                  @ {exp.company}
                </p>
              </div>

              <span className="px-3 py-1 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-full text-xs font-mono font-bold text-[#2b211b] shrink-0 self-start sm:self-auto">
                {exp.year}
              </span>
            </div>

            <p className="text-xs md:text-sm text-[#2b211b]/85 leading-relaxed font-medium">
              {exp.description}
            </p>
          </div>
        ))}
      </div>

      {experience.ctaText && (
        <div className="mt-8 text-center">
          <a
            href={experience.ctaLink || "mailto:geraldinefirdaus99@gmail.com"}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c85628] text-[#f6d4b1] font-mono text-xs font-bold rounded-xl uppercase tracking-wider hover:bg-[#a8441c] transition-colors shadow-md"
          >
            <span>{experience.ctaText}</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </section>
  );
}
