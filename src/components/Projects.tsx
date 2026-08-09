"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { usePortfolio } from "@/context/PortfolioContext";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="edh-project-block h-full flex flex-col">
      {/* Retro Card Container */}
      <div className="p-5 md:p-6 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 hover:bg-[var(--bg-card)]/90 hover:border-[var(--accent)]/40 transition-all duration-300 shadow-sm flex flex-col justify-between h-full space-y-4 group">
        <div className="space-y-4">
          {/* Retro Browser Window Mockup Frame */}
          <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-main)] overflow-hidden shadow-sm">
            {/* Top Window Bar */}
            <div className="px-3.5 py-2 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-600/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-700/80" />
              </div>
              <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] truncate max-w-[130px] sm:max-w-[170px]">
                {project.liveUrl ? project.liveUrl.replace("https://", "") : `${project.slug}.app`}
              </span>
              <span className="text-[9px] font-mono font-bold text-[var(--accent)]">PREVIEW</span>
            </div>

            {/* Screenshot Image Container */}
            <Link href={`/projects/${project.slug}`}>
              <div className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
            </Link>
          </div>

          {/* Header Row */}
          <div className="space-y-1 pt-1">
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[var(--accent)]">0{index + 1}</span>
                <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--text-main)] tracking-tight line-clamp-1">
                  <Link href={`/projects/${project.slug}`} className="hover:text-[var(--accent)] transition-colors">
                    {project.title}
                  </Link>
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-main)] text-[10px] font-mono font-bold text-[var(--accent)] uppercase shrink-0">
                {project.year}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] font-mono">
              Client: <span className="text-[var(--text-main)] font-bold">{project.client}</span> | Role: <span className="text-[var(--text-main)] font-bold">{project.role}</span>
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech?.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg font-mono text-[11px] font-semibold text-[var(--text-main)]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Compact Summary Description */}
          <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium leading-relaxed">
            {project.description}
          </p>

          {/* Expandable Overview Drawer */}
          {isExpanded && (
            <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3 font-mono text-xs animate-in fade-in duration-300">
              <p className="text-[var(--text-muted)] leading-relaxed font-sans text-xs">
                {project.longDescription}
              </p>

              {project.challenges && project.challenges.length > 0 && (
                <div className="space-y-1">
                  <span className="font-bold text-[var(--accent)] text-[11px] uppercase block">Tantangan Utama:</span>
                  <ul className="list-disc list-inside text-[var(--text-muted)] space-y-0.5 text-[11px]">
                    {project.challenges.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-[var(--border-subtle)]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>{isExpanded ? "Ringkas" : "Rincian Teknis"}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[var(--accent)] text-white rounded-full font-mono text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Detail Proyek</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { state } = usePortfolio();
  const { projects } = state;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".edh-project-block");
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

  const projectItems = projects.items || [];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto text-[var(--text-main)]"
    >
      <hr className="border-[var(--border-subtle)] mb-8" />

      {/* Main Section Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[var(--text-main)]">
          {projects.titleMain || "Projects"} <span className="text-[var(--accent)]">{projects.titleHighlight}</span>
        </h1>
        <Link
          href={projects.ctaLink || "/projects"}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[var(--accent)] hover:underline uppercase"
        >
          <span>See All ({projectItems.length})</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Projects 2-Card Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectItems.slice(0, 6).map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>

      <hr className="border-[var(--border-subtle)] my-12" />

      <div className="text-center pt-2">
        <Link
          href={projects.ctaLink || "/projects"}
          className="px-8 py-3.5 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] hover:bg-[var(--accent)] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md"
        >
          <span>{projects.ctaText || "Browse Full Project Archive"}</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
