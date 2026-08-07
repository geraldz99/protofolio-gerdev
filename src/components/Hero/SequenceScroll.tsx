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
      className="relative min-h-[92vh] w-full bg-transparent text-[var(--text-main)] flex flex-col items-center justify-center pt-24 pb-12 px-6 overflow-hidden"
    >
      {/* Background Dot Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(var(--dot-color)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Giant Watermark Text */}
      <div className="hero-fade absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-9xl md:text-[14rem] font-bold font-serif text-[var(--text-main)]/[0.05] tracking-widest select-none pointer-events-none uppercase whitespace-nowrap z-0">
        {hero.bgText || "DEVELOPER"}
      </div>

      {/* Main Centered Content Frame */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-6">
        {/* Header Block */}
        <div className="space-y-2">
          <h3 className="hero-fade text-xl md:text-3xl font-serif italic text-[var(--text-muted)]">
            {hero.prefixText || "Hi there, I’m"}
          </h3>
          <h1 className="hero-fade text-5xl sm:text-7xl md:text-8xl font-bold font-serif tracking-tight text-[var(--text-main)] leading-none">
            {hero.highlightText || "Geraldine"}
          </h1>
        </div>

        {/* Hero Image Showcase Box */}
        <div
          ref={heroImageRef}
          className="relative w-full max-w-xl md:max-w-2xl aspect-[4/3] md:aspect-[16/10] my-2 flex items-center justify-center group"
        >
          {/* Ambient Warm Halo Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-[var(--accent-light)] rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Soft Grounding Floor Shadow */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-56 sm:w-72 md:w-80 h-5 bg-black/20 rounded-[100%] blur-md pointer-events-none -z-10" />

          {/* Floating Glassmorphism Badge 1 - Left Top */}
          <div className="absolute top-6 left-0 sm:left-2 md:left-4 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-subtle)] shadow-lg backdrop-blur-md hidden sm:flex items-center gap-2 text-[11px] font-mono font-bold text-[var(--text-main)] transition-transform duration-500 group-hover:-translate-y-1 z-10">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>Backend Developer</span>
          </div>

          {/* Floating Glassmorphism Badge 2 - Right Top */}
          <div className="absolute top-12 right-0 sm:right-2 md:right-4 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-subtle)] shadow-lg backdrop-blur-md hidden sm:flex items-center gap-2 text-[11px] font-mono font-bold text-[var(--text-main)] transition-transform duration-500 group-hover:translate-y-1 z-10">
            <span className="text-[var(--accent)]">⚡</span>
            <span>Fullstack Developer</span>
          </div>

          {/* Floating Glassmorphism Badge 3 - Left Bottom */}
          <div className="absolute bottom-10 left-2 sm:left-6 md:left-8 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)]/90 border border-[var(--border-subtle)] shadow-lg backdrop-blur-md hidden sm:flex items-center gap-2 text-[11px] font-mono font-bold text-[var(--text-main)] transition-transform duration-500 group-hover:-translate-y-1 z-10">
            <span className="text-[var(--accent)]">💻</span>
            <span>Software Engineer</span>
          </div>

          {/* Person Avatar with Smooth Bottom Fade Mask */}
          <Image
            src={hero.heroImage || "/projects/ger2.png"}
            alt="Geraldine Firdaus Hero Showcase"
            fill
            className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.2)] group-hover:scale-[1.03] transition-transform duration-700"
            style={{
              maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
            }}
            priority
            unoptimized
          />
        </div>

        {/* CTA Button */}
        {hero.ctaText && (
          <div className="hero-fade pt-2">
            <Link
              href={hero.ctaLink || "/#contact"}
              className="px-6 py-3.5 bg-[var(--accent)] text-white hover:opacity-90 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>{hero.ctaText}</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}

        {/* Editorial Bottom Paragraphs Grid */}
        {(hero.bottomLeftText || hero.bottomRightText) && (
          <div className="hero-fade grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left border-t border-[var(--border-subtle)] text-xs font-mono text-[var(--text-muted)] leading-relaxed max-w-3xl w-full">
            {hero.bottomLeftText && (
              <div className="p-4 rounded-2xl bg-[var(--bg-card)]/50 border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--accent)] font-bold uppercase block mb-1">SPESIALISASI</span>
                {hero.bottomLeftText}
              </div>
            )}
            {hero.bottomRightText && (
              <div className="p-4 rounded-2xl bg-[var(--bg-card)]/50 border border-[var(--border-subtle)]">
                <span className="text-[10px] text-[var(--accent)] font-bold uppercase block mb-1">VISI & VALUE</span>
                {hero.bottomRightText}
              </div>
            )}
          </div>
        )}

        {/* Bottom Scroll Indicator */}
        <div className="hero-fade pt-6 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-muted)] animate-bounce">
          <span>Scroll</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}