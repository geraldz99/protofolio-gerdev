"use client";

import { useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function GitHubContributions() {
  const { state } = usePortfolio();
  const { github } = state;
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

  const theme = {
    light: ["#ebd0b5", "#e0b38c", "#c88555", "#c85628", "#2b211b"],
    dark: ["#ebd0b5", "#e0b38c", "#c88555", "#c85628", "#2b211b"],
  };

  return (
    <section
      id="github"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-[#2b211b]"
    >
      <hr className="border-[#2b211b]/20 mb-8" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[#2b211b]">
          {github.titleMain || "Aktivitas &"}{" "}
          <span className="text-[#c85628]">{github.titleHighlight || "Kontribusi GitHub"}</span>
        </h1>
        <a
          href={github.profileUrl || "https://github.com/geraldz99"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-mono font-bold tracking-widest text-[#c85628] hover:underline uppercase self-start md:self-auto"
        >
          <span>@{github.username || "geraldz99"}</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="github-block p-6 rounded-3xl bg-[#ebd0b5]/80 border border-[#2b211b]/20 shadow-sm overflow-x-auto flex justify-center">
        <GitHubCalendar
          username={github.username || "geraldz99"}
          colorScheme="light"
          theme={theme}
          fontSize={12}
          blockSize={11}
          blockMargin={4}
        />
      </div>
    </section>
  );
}
