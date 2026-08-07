"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Sparkles, Code2, Layers, Server } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const ICON_MAP = [Sparkles, Server, Code2, Layers];

export default function About() {
  const { state } = usePortfolio();
  const { about } = state;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".about-item");
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

  const highlights = about.highlights || [];
  const coreTechStack = about.coreTechStack || [];
  const values = about.values || [];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-[var(--text-main)]"
    >
      <hr className="border-[var(--border-subtle)] mb-8" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <h1 id="aboutMe" className="about-item text-4xl md:text-6xl font-bold font-serif tracking-tight text-[var(--text-main)]">
          {about.titleMain || "Arsitektur Sistem &"}{" "}
          <span className="text-[var(--accent)]">{about.titleHighlight || "Rekayasa Back-End"}</span>
        </h1>
        <span className="about-item px-3.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider self-start md:self-auto">
          {about.sectionBadge || "01 // TENTANG SAYA"}
        </span>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="about-item lg:col-span-5 space-y-4">
          <div className="p-4 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 shadow-sm space-y-4 group">
            {/* Image Box Frame */}
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-main)]">
              <Image
                src={about.profileImage || "/projects/gerdev.png"}
                alt="Geraldine Firdaus Portrait"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter drop-shadow-md"
                priority
                unoptimized
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-[var(--bg-main)]/90 backdrop-blur-md rounded-full border border-[var(--border-subtle)] font-mono text-[10px] font-bold text-[var(--accent)]">
                {about.profileBadge || "GERALDINE FIRDAUS"}
              </div>
            </div>

            {/* Quick Meta Highlights */}
            <div className="space-y-2 pt-1">
              {highlights.map((item, idx) => {
                const Icon = ICON_MAP[idx % ICON_MAP.length];
                return (
                  <div
                    key={item.id || idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--bg-main)]/70 border border-[var(--border-subtle)] text-xs font-mono"
                  >
                    <div className="flex items-center gap-2 text-[var(--text-muted)]">
                      <Icon size={14} className="text-[var(--accent)]" />
                      <span>{item.label}</span>
                    </div>
                    <span className="font-bold text-[var(--text-main)] truncate max-w-[170px]">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Text Content & Bio */}
        <div className="about-item lg:col-span-7 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 shadow-sm space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--text-main)] leading-tight">
              Profil & Biografi <span className="text-[var(--accent)]">Geraldine Firdaus</span>
            </h2>

            <div className="space-y-4 text-sm md:text-base leading-relaxed text-[var(--text-muted)] font-medium">
              <p>{about.bioText}</p>
            </div>

            {/* Core Tech Stack Tag Pills */}
            <div className="pt-2 border-t border-[var(--border-subtle)] space-y-3">
              <span className="font-mono text-xs font-bold text-[var(--accent)] uppercase tracking-wider block">
                CORE TECH STACK:
              </span>
              <div className="flex flex-wrap gap-2">
                {coreTechStack.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[var(--bg-main)] border border-[var(--border-strong)] rounded-full text-xs font-mono font-bold text-[var(--text-main)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principles & Values List */}
      <div className="mt-12 space-y-6">
        <hr className="border-[var(--border-subtle)] mb-8" />
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-bold font-serif tracking-tight text-[var(--text-main)]">
            Nilai & Prinsip Kerja
          </h2>
          <span className="font-mono text-xs font-bold text-[var(--accent)]">02 // CORE VALUES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((item) => (
            <div
              key={item.id || item.num}
              className="about-item p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:-translate-y-1 transition-all space-y-3 shadow-sm group"
            >
              <span className="text-xs font-mono text-[var(--accent)] font-bold tracking-widest block">
                {item.num} //
              </span>
              <h3 className="text-base md:text-lg font-bold font-serif text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
