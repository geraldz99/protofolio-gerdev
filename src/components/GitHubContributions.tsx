"use client";

import { useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { useTheme } from "@/context/ThemeContext";

export default function GitHubContributions() {
  const { state } = usePortfolio();
  const { github } = state;
  const { theme: currentTheme } = useTheme();
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".github-block");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
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

  const calendarTheme = {
    light: ["#ebd0b5", "#e0b38c", "#c88555", "#c85628", "#2b211b"],
    dark: ["#2a221c", "#6b3c22", "#ad5228", "#e06d3b", "#f6d4b1"],
  };

  return (
    <section
      id="github"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-[var(--text-main)]"
    >
      <hr className="border-[var(--border-subtle)] mb-8" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[var(--text-main)]">
          {github.titleMain || "Aktivitas &"}{" "}
          <span className="text-[var(--accent)]">{github.titleHighlight || "Kontribusi GitHub"}</span>
        </h1>
        <a
          href={github.profileUrl || "https://github.com/geraldz99"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono font-bold tracking-widest text-[var(--accent)] hover:underline uppercase self-start md:self-auto"
        >
          <span>@{github.username || "geraldz99"}</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="github-block p-6 rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] shadow-sm overflow-x-auto flex justify-center transition-colors duration-300">
        <GitHubCalendar
          username={github.username || "geraldz99"}
          colorScheme={currentTheme}
          theme={calendarTheme}
          fontSize={12}
          blockSize={11}
          blockMargin={4}
        />
      </div>
    </section>
  );
}
