"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function SequenceScroll() {
  const { state } = usePortfolio();
  const { hero } = state;

  const sectionRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline();

      tl.from(".hero-fade", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
      });

      tl.from(
        heroImageRef.current,
        {
          opacity: 0,
          scale: 0.92,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.8"
      );

      // Parallax image scroll
      gsap.to(heroImageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -60,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] w-full bg-transparent text-[#2b211b] flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden"
    >
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(43,33,27,0.08)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Giant Watermark Text (bgText from Admin) */}
      <div className="hero-fade absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-9xl md:text-[14rem] font-bold font-serif text-[#2b211b]/[0.05] tracking-widest select-none pointer-events-none uppercase whitespace-nowrap z-0">
        {hero.bgText || "DEVELOPER"}
      </div>

      {/* Main Centered Content Frame */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-6">
        {/* Retro Header Block */}
        <div className="space-y-2">
          <h3 className="hero-fade text-xl md:text-3xl font-serif italic text-[#2b211b]/80">
            {hero.prefixText || "Hi there, I’m"}
          </h3>
          <h1 className="hero-fade text-5xl sm:text-7xl md:text-8xl font-bold font-serif tracking-tight text-[#2b211b] leading-none">
            {hero.highlightText || "Geraldine"}
          </h1>
        </div>

        {/* Roles Bullet Pills List */}
        <div className="hero-fade flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="px-4 py-1.5 rounded-full border border-[#2b211b]/20 bg-[#ebd0b5]/70 text-xs font-mono font-bold text-[#c85628] tracking-wider uppercase shadow-sm">
            Back-End Developer
          </span>
          <span className="px-4 py-1.5 rounded-full border border-[#2b211b]/20 bg-[#ebd0b5]/70 text-xs font-mono font-bold text-[#2b211b] tracking-wider uppercase shadow-sm">
            Full-Stack Developer
          </span>
          <span className="px-4 py-1.5 rounded-full border border-[#2b211b]/20 bg-[#ebd0b5]/70 text-xs font-mono font-bold text-[#2b211b] tracking-wider uppercase shadow-sm">
            Software Engineer
          </span>
        </div>

        {/* Hero Image Showcase Box */}
        <div
          ref={heroImageRef}
          className="relative w-full max-w-lg aspect-[4/3] md:aspect-[16/10] mt-4 rounded-3xl border border-[#2b211b]/20 bg-[#ebd0b5]/60 p-4 md:p-6 shadow-2xl backdrop-blur-md overflow-hidden group"
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#f6d4b1]">
            <Image
              src={hero.heroImage || "/projects/ger2.png"}
              alt="Geraldine Firdaus Hero Showcase"
              fill
              className="object-contain filter drop-shadow-[0_10px_30px_rgba(43,33,27,0.15)] group-hover:scale-105 transition-transform duration-700"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* CTA Button (ctaText & ctaLink from Admin) */}
        {hero.ctaText && (
          <div className="hero-fade pt-2">
            <Link
              href={hero.ctaLink || "/#contact"}
              className="px-6 py-3.5 bg-[#c85628] text-[#f6d4b1] hover:bg-[#a8441c] rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>{hero.ctaText}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}

        {/* Editorial Bottom Paragraphs Grid (bottomLeftText & bottomRightText from Admin) */}
        {(hero.bottomLeftText || hero.bottomRightText) && (
          <div className="hero-fade grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left border-t border-[#2b211b]/15 text-xs font-mono text-[#2b211b]/80 leading-relaxed max-w-3xl w-full">
            {hero.bottomLeftText && (
              <div className="p-4 rounded-2xl bg-[#ebd0b5]/50 border border-[#2b211b]/15">
                <span className="text-[10px] text-[#c85628] font-bold uppercase block mb-1">SPESIALISASI</span>
                {hero.bottomLeftText}
              </div>
            )}
            {hero.bottomRightText && (
              <div className="p-4 rounded-2xl bg-[#ebd0b5]/50 border border-[#2b211b]/15">
                <span className="text-[10px] text-[#c85628] font-bold uppercase block mb-1">VISI & VALUE</span>
                {hero.bottomRightText}
              </div>
            )}
          </div>
        )}

        {/* Bottom Scroll Indicator */}
        <div className="hero-fade pt-6 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#2b211b]/70 animate-bounce">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}