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

interface ProjectDetailClientProps {
  project?: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-[#f6d4b1] text-[#2b211b]">
        <h1 className="text-3xl font-bold font-serif mb-4">Proyek Tidak Ditemukan</h1>
        <Link href="/projects" className="text-[#c85628] underline font-mono text-sm font-bold">
          ← Kembali ke Semua Proyek
        </Link>
      </div>
    );
  }

  // Calculate Prev / Next Projects
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <div ref={containerRef} className="bg-[#f6d4b1] text-[#2b211b] min-h-screen relative py-20 md:py-28 px-6">
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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2b211b]/30 bg-[#ebd0b5]/90 text-[#2b211b] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#2b211b] hover:text-[#f6d4b1] transition-all shadow-sm cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Kembali</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2b211b] text-[#f6d4b1] hover:bg-[#c85628] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Demo Langsung</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        <hr className="border-[#2b211b]/20" />

        {/* Title Header Block matching edh.dev */}
        <div className="edh-detail-block space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-7xl font-bold font-serif text-[#2b211b] tracking-tight leading-none">
              {project.title}
            </h1>
            <h3 className="text-xs md:text-sm font-mono font-semibold text-[#c85628] uppercase tracking-widest pt-2">
              {project.year} — {project.category} • {project.client}
            </h3>
          </div>

          {/* Tech Pills */}
          <ul className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="px-3.5 py-1 bg-[#ebd0b5]/90 border border-[#2b211b]/30 rounded-full text-xs font-mono font-bold text-[#2b211b]"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero Image Showcase Box Frame */}
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="edh-detail-block relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-[#2b211b]/20 bg-[#ebd0b5]/60 shadow-lg cursor-pointer group"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b211b]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#f6d4b1]/90 backdrop-blur-md rounded-full border border-[#2b211b]/30 text-xs font-mono text-[#2b211b] font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
            <Maximize2 size={13} />
            <span>Klik untuk memperbesar</span>
          </div>
        </div>

        {/* Project Meta Details Summary Grid */}
        <div className="edh-detail-block grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-[#2b211b]/20 text-xs font-mono">
          <div>
            <span className="text-[#c85628] font-bold block mb-1 uppercase tracking-wider">Tahun</span>
            <span className="font-bold text-[#2b211b] uppercase text-sm">{project.year}</span>
          </div>
          <div>
            <span className="text-[#c85628] font-bold block mb-1 uppercase tracking-wider">Klien</span>
            <span className="font-bold text-[#2b211b] uppercase text-sm">{project.client}</span>
          </div>
          <div>
            <span className="text-[#c85628] font-bold block mb-1 uppercase tracking-wider">Peran</span>
            <span className="font-bold text-[#2b211b] uppercase text-sm">{project.role}</span>
          </div>
          <div>
            <span className="text-[#c85628] font-bold block mb-1 uppercase tracking-wider">Kategori</span>
            <span className="font-bold text-[#2b211b] uppercase text-sm">{project.category}</span>
          </div>
        </div>

        {/* Case Study Content Breakdown */}
        <div className="space-y-12">
          {/* Overview & Visi */}
          <div className="edh-detail-block space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2b211b] tracking-tight">
              Tujuan & Visi Proyek
            </h2>
            <p className="text-base md:text-xl leading-relaxed text-[#2b211b]/90 font-medium">
              {project.longDescription}
            </p>
          </div>

          <hr className="border-[#2b211b]/20" />

          {/* Tantangan Utama */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="edh-detail-block space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-widest">
                  01 / PROBLEM STATEMENT
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2b211b] tracking-tight">
                  Tantangan Utama
                </h2>
              </div>
              <ul className="space-y-3">
                {project.challenges.map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[#2b211b]/85 font-medium leading-relaxed">
                    <span className="font-mono font-bold text-[#c85628]">0{idx + 1}.</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges && <hr className="border-[#2b211b]/20" />}

          {/* Solusi & Pendekatan */}
          {project.solutions && project.solutions.length > 0 && (
            <div className="edh-detail-block space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-widest">
                  02 / APPROACH & SOLUTION
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2b211b] tracking-tight">
                  Solusi & Pendekatan
                </h2>
              </div>
              <ul className="space-y-3">
                {project.solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-[#2b211b]/85 font-medium leading-relaxed">
                    <span className="font-mono font-bold text-[#c85628]">—</span>
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.solutions && <hr className="border-[#2b211b]/20" />}

          {/* Dampak Nyata */}
          {project.impact && project.impact.length > 0 && (
            <div className="edh-detail-block space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-widest">
                  03 / OUTCOMES & IMPACT
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#2b211b] tracking-tight">
                  Dampak & Hasil Nyata
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.impact.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#ebd0b5]/80 border border-[#2b211b]/20 space-y-2 shadow-sm"
                  >
                    <span className="font-mono text-xs font-bold text-[#c85628] block uppercase">
                      RESULT // 0{idx + 1}
                    </span>
                    <p className="text-sm md:text-base font-bold text-[#2b211b] leading-snug">
                      {metric}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <hr className="border-[#2b211b]/20 my-16" />

        {/* Next Project & Navigation Section */}
        <div className="edh-detail-block space-y-8 pt-2">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-widest">
              04 / EKSPLORASI PROYEK LAINNYA
            </span>
            <Link
              href="/projects"
              className="text-xs font-mono font-bold text-[#2b211b]/70 hover:text-[#c85628] uppercase underline"
            >
              Semua Proyek ({PROJECTS.length}) →
            </Link>
          </div>

          {/* Next Project Highlight Card */}
          {nextProject && (
            <div className="p-6 md:p-8 rounded-3xl border border-[#2b211b]/20 bg-[#ebd0b5]/70 hover:bg-[#ebd0b5]/95 hover:border-[#c85628]/50 transition-all duration-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div className="space-y-3 flex-1">
                <span className="px-3 py-1 rounded-full border border-[#2b211b]/20 bg-[#f6d4b1] text-xs font-mono font-bold text-[#c85628] uppercase tracking-wider inline-block">
                  {nextProject.year} — {nextProject.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold font-serif text-[#2b211b] tracking-tight group-hover:text-[#c85628] transition-colors">
                  {nextProject.title}
                </h3>
                <p className="text-xs md:text-sm text-[#2b211b]/80 font-medium leading-relaxed line-clamp-2">
                  {nextProject.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2b211b] text-[#f6d4b1] hover:bg-[#c85628] hover:text-white font-mono text-xs font-bold uppercase transition-all shadow-sm"
                  >
                    <span>Jelajahi Proyek Ini</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Thumbnail Frame */}
              <div className="w-full md:w-64 aspect-[16/10] rounded-2xl overflow-hidden border border-[#2b211b]/20 bg-[#f6d4b1] relative shrink-0 shadow-md">
                <Image
                  src={nextProject.image}
                  alt={nextProject.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
            </div>
          )}

          {/* Quick Prev / Next Navigation Buttons Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#2b211b]/15 font-mono text-xs">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="p-4 rounded-2xl border border-[#2b211b]/20 bg-[#ebd0b5]/50 hover:bg-[#2b211b] hover:text-[#f6d4b1] transition-all flex items-center gap-3 group text-[#2b211b] shadow-sm"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform shrink-0 text-[#c85628] group-hover:text-[#f6d4b1]" />
                <div className="truncate">
                  <span className="text-[10px] text-[#c85628] font-bold block uppercase group-hover:text-[#f6d4b1]">← SEBELUMNYA</span>
                  <span className="font-bold truncate block">{prevProject.title}</span>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="p-4 rounded-2xl border border-[#2b211b]/20 bg-[#ebd0b5]/50 hover:bg-[#2b211b] hover:text-[#f6d4b1] transition-all flex items-center justify-between text-right group text-[#2b211b] shadow-sm"
              >
                <div className="truncate flex-1 pr-2">
                  <span className="text-[10px] text-[#c85628] font-bold block uppercase group-hover:text-[#f6d4b1]">SELANJUTNYA →</span>
                  <span className="font-bold truncate block">{nextProject.title}</span>
                </div>
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0 text-[#c85628] group-hover:text-[#f6d4b1]" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
