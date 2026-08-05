"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AWARDS = [
  "Visual Authority",
  "Frontend Architecture",
  "Sub-Second Performance",
  "Next.js Specialist",
  "GSAP Motion Design",
  "Clean UX/UI Code",
];

export default function AwardsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loop = gsap.to(".marquee-content", {
      xPercent: -50,
      repeat: -1,
      duration: 25,
      ease: "none",
    });

    const marquee = marqueeRef.current;
    if (marquee) {
      marquee.addEventListener("mouseenter", () =>
        gsap.to(loop, { timeScale: 0.5, duration: 0.5 })
      );
      marquee.addEventListener("mouseleave", () =>
        gsap.to(loop, { timeScale: 1, duration: 0.5 })
      );
    }

    return () => {
      loop.kill();
    };
  }, []);

  return (
    <section className="py-16 bg-[#ebd0b5]/50 border-y border-[#2b211b]/15 overflow-hidden relative">
      <div
        ref={marqueeRef}
        className="relative flex whitespace-nowrap select-none group"
      >
        {[1, 2].map((i) => (
          <div key={i} className="marquee-content flex gap-12 items-center px-6">
            {AWARDS.map((award, index) => (
              <div
                key={index}
                className="flex items-center gap-12 group-hover:opacity-100 transition-opacity"
              >
                <span className="text-4xl md:text-8xl font-black text-[#2b211b]/40 hover:text-[#c85628] transition-colors uppercase tracking-tight">
                  {award}
                </span>
                <div className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#c85628] shadow-[0_0_12px_rgba(200,86,40,0.6)]" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

