"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight, ExternalLink, Maximize2 } from "lucide-react";
import { Project, PROJECTS } from "@/data/projects";
import ImageLightbox from "@/components/ImageLightbox";
import { usePortfolio } from "@/context/PortfolioContext";

interface ProjectDetailClientProps {
  project?: Project;
}

export default function ProjectDetailClient({ project: initialProject }: ProjectDetailClientProps) {
  const router = useRouter();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { state } = usePortfolio();

  const allProjects = state.projects?.items?.length ? state.projects.items : PROJECTS;
  const project =
    allProjects.find((p) => (initialProject ? p.slug === initialProject.slug || p.id === initialProject.id : false)) ||
    initialProject;

  useEffect(() => {
    if (!project) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".edh-detail-block");
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
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
  }, [project]);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
        <h1 className="text-3xl font-bold font-serif mb-4">Proyek Tidak Ditemukan</h1>
        <Link href="/projects" className="text-[var(--accent)] underline font-mono text-sm font-bold">
          ← Kembali ke Semua Proyek
        </Link>
      </div>
    );
  }

  // Calculate Prev / Next Projects
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <div ref={containerRef} className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen relative py-20 md:py-28 px-6 transition-colors duration-300">
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <ImageLightbox
          src={project.image}
          alt={project.title}
          category={project.category}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Link */}
        <div className="edh-detail-block flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--text-main)] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Kembali</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] hover:bg-[var(--accent)] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Demo Langsung</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        <hr className="border-[var(--border-subtle)]" />

        {/* Title Header Block matching edh.dev */}
        <div className="edh-detail-block space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-7xl font-bold font-serif text-[var(--text-main)] tracking-tight leading-none">
              {project.title}
            </h1>
            <h3 className="text-xs md:text-sm font-mono font-semibold text-[var(--accent)] uppercase tracking-widest pt-2">
              {project.year} — {project.category} • {project.client}
            </h3>
          </div>

          {/* Tech Pills */}
          <ul className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="px-3.5 py-1 bg-[var(--bg-card)]/90 border border-[var(--border-strong)] rounded-full text-xs font-mono font-bold text-[var(--text-main)]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Image Showcase Box Frame */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="edh-detail-block relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 shadow-lg cursor-pointer group"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 90vw, 800px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
            unoptimized={typeof project.image === "string" && project.image.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--text-main)]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[var(--bg-main)]/90 backdrop-blur-md rounded-full border border-[var(--border-strong)] text-xs font-mono text-[var(--text-main)] font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            <Maximize2 size={13} />
            <span>Klik untuk memperbesar</span>
          </div>
        </div>

        {/* Project Meta Details Summary Grid */}
        <div className="edh-detail-block grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-[var(--border-subtle)] text-xs font-mono">
          <div>
            <span className="text-[var(--accent)] font-bold block mb-1 uppercase tracking-wider">Tahun</span>
            <span className="font-bold text-[var(--text-main)] uppercase text-sm">{project.year}</span>
          </div>
          <div>
            <span className="text-[var(--accent)] font-bold block mb-1 uppercase tracking-wider">Klien</span>
            <span className="font-bold text-[var(--text-main)] uppercase text-sm">{project.client}</span>
          </div>
          <div>
            <span className="text-[var(--accent)] font-bold block mb-1 uppercase tracking-wider">Peran</span>
            <span className="font-bold text-[var(--text-main)] uppercase text-sm">{project.role}</span>
          </div>
          <div>
            <span className="text-[var(--accent)] font-bold block mb-1 uppercase tracking-wider">Kategori</span>
            <span className="font-bold text-[var(--text-main)] uppercase text-sm">{project.category}</span>
          </div>
        </div>

        {/* Case Study Content Breakdown */}
        <div className="space-y-12">
          {/* Overview & Visi */}
          <div className="edh-detail-block space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--text-main)] tracking-tight">
              Tujuan & Visi Proyek
            </h2>
            <p className="text-base md:text-xl leading-relaxed text-[var(--text-muted)] font-medium">
              {project.longDescription}
            </p>
          </div>

          <hr className="border-[var(--border-subtle)]" />

          {/* Tantangan Utama */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="edh-detail-block space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-widest">
                  01 / PROBLEM STATEMENT
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--text-main)] tracking-tight">
                  Tantangan Utama
                </h2>
              </div>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[var(--text-muted)] font-medium leading-relaxed">
                    <span className="font-mono font-bold text-[var(--accent)]">0{idx + 1}.</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && <hr className="border-[var(--border-subtle)]" />}

          {/* Solusi & Pendekatan */}
          {project.solutions && project.solutions.length > 0 && (
            <div className="edh-detail-block space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-widest">
                  02 / APPROACH & SOLUTION
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--text-main)] tracking-tight">
                  Solusi & Pendekatan
                </h2>
              </div>
              <ul className="space-y-3">
                {project.solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[var(--text-muted)] font-medium leading-relaxed">
                    <span className="font-mono font-bold text-[var(--accent)]">—</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.solutions && <hr className="border-[var(--border-subtle)]" />}

          {/* Dampak Nyata */}
          {project.impact && project.impact.length > 0 && (
            <div className="edh-detail-block space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-widest">
                  03 / OUTCOMES & IMPACT
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--text-main)] tracking-tight">
                  Dampak & Hasil Nyata
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.impact.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] space-y-2 shadow-sm"
                  >
                    <span className="font-mono text-xs font-bold text-[var(--accent)] block uppercase">
                      RESULT // 0{idx + 1}
                    </span>
                    <p className="text-sm md:text-base font-bold text-[var(--text-main)] leading-snug">
                      {metric}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <hr className="border-[var(--border-subtle)] my-16" />

        {/* Next Project & Navigation Section */}
        <div className="edh-detail-block space-y-8 pt-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-widest">
              04 / EKSPLORASI PROYEK LAINNYA
            </span>
            <Link
              href="/projects"
              className="text-xs font-mono font-bold text-[var(--text-muted)] hover:text-[var(--accent)] uppercase underline"
            >
              Semua Proyek ({allProjects.length}) →
            </Link>
          </div>

          {/* Next Project Highlight Card */}
          {nextProject && (
            <div className="p-6 md:p-8 rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 hover:bg-[var(--bg-card)]/95 hover:border-[var(--accent)]/50 transition-all duration-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div className="space-y-3 flex-1">
                <span className="px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-main)] text-xs font-mono font-bold text-[var(--accent)] uppercase tracking-wider inline-block">
                  {nextProject.year} — {nextProject.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold font-serif text-[var(--text-main)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] font-medium leading-relaxed line-clamp-2">
                  {nextProject.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] hover:bg-[var(--accent)] hover:text-white font-mono text-xs font-bold uppercase transition-all shadow-sm"
                  >
                    <span>Jelajahi Proyek Ini</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Thumbnail Frame */}
              <div className="w-full md:w-64 aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-main)] relative shrink-0 shadow-md">
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 300px"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized={typeof nextProject.image === "string" && nextProject.image.startsWith("http")}
                />
              </div>
            </div>
          )}

          {/* Quick Prev / Next Navigation Buttons Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-subtle)] font-mono text-xs">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/50 hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-all flex items-center gap-3 group text-[var(--text-main)] shadow-sm"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform shrink-0 text-[var(--accent)] group-hover:text-[var(--bg-main)]" />
                <div className="truncate">
                  <span className="text-[10px] text-[var(--accent)] font-bold block uppercase group-hover:text-[var(--bg-main)]">← SEBELUMNYA</span>
                  <span className="font-bold truncate block">{prevProject.title}</span>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/50 hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-all flex items-center justify-between text-right group text-[var(--text-main)] shadow-sm"
              >
                <div className="truncate flex-1 pr-2">
                  <span className="text-[10px] text-[var(--accent)] font-bold block uppercase group-hover:text-[var(--bg-main)]">SELANJUTNYA →</span>
                  <span className="font-bold truncate block">{nextProject.title}</span>
                </div>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0 text-[var(--accent)] group-hover:text-[var(--bg-main)]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
