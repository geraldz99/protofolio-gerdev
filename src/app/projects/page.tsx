"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { usePortfolio } from "@/context/PortfolioContext";

const ITEMS_PER_PAGE = 8;

export default function AllProjectsPage() {
  const { state } = usePortfolio();
  const allProjects = state.projects?.items?.length ? state.projects.items : PROJECTS;

  const containerRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("SEMUA");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = [
    "SEMUA",
    ...Array.from(new Set(allProjects.map((p) => p.category))),
  ];

  const filteredProjects = allProjects.filter((p) => {
    const matchesCat = selectedCategory === "SEMUA" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;

    const matchesTitle = p.title.toLowerCase().includes(q);
    const matchesDesc = p.description.toLowerCase().includes(q);
    const matchesClient = p.client.toLowerCase().includes(q);
    const matchesCategory = p.category.toLowerCase().includes(q);
    const matchesTech = p.tech.some((t) => t.toLowerCase().includes(q));

    return matchesCat && (matchesTitle || matchesDesc || matchesClient || matchesCategory || matchesTech);
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (projectsGridRef.current) {
      projectsGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card-archive",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCategory, currentPage]);

  return (
    <div
      ref={containerRef}
      className="bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen relative overflow-hidden transition-colors duration-300"
    >
      {/* Header Section */}
      <header className="pt-28 md:pt-33 px-6 md:px-24 max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-mono text-xs font-bold uppercase tracking-widest group hover:underline"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Kembali ke Beranda
          </Link>

          <div className="space-y-2">
            <span className="text-[var(--accent)] text-xs md:text-sm font-mono font-semibold uppercase tracking-[0.4em] block">
              ARSIP LENGKAP KARYA
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-semibold uppercase tracking-tight leading-none text-[var(--text-main)]">
              Eksplorasi & <span className="text-[var(--accent)]">Proyek Digital</span>
            </h1>
          </div>
        </div>

        {/* Category Filter Tabs (Scrollable on mobile, flex-wrap on desktop, with bottom border line) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-4 border-b border-[var(--border-subtle)] [scrollbar-width:none] [-ms-overflow-style:none] md:flex-wrap md:pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-[var(--text-main)] text-[var(--bg-main)] font-bold shadow-lg"
                  : "bg-[var(--bg-card)]/60 border border-[var(--border-subtle)] text-[var(--text-main)]/80 hover:text-[var(--accent)] hover:border-[var(--accent)]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Search Input (Di bawah category line, pojok kanan, tanpa garis pembatas bawah) */}
        <div className="flex justify-end pt-3 pb-0">
          <div className="relative max-w-xs md:max-w-sm w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari proyek, tech stack..."
              className="w-full pl-11 pr-10 py-2.5 bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] rounded-full text-xs font-mono text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--text-muted)] hover:text-[var(--text-main)] rounded-full cursor-pointer"
                title="Hapus pencarian"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Projects Showcase Grid */}
      <main ref={projectsGridRef} className="px-6 md:px-24 pt-4 pb-16 md:pt-6 md:pb-24 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {paginatedProjects.map((project, i) => {
            const itemNum = (currentPage - 1) * ITEMS_PER_PAGE + i + 1;
            const numStr = itemNum < 10 ? `0${itemNum}` : `${itemNum}`;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                data-cursor="view"
                className="project-card-archive group rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] hover:border-[var(--accent)]/50 transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_40px_rgba(200,86,40,0.12)] cursor-pointer"
              >
                {/* Image Box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--bg-main)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 500px"
                    loading="lazy"
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    unoptimized={typeof project.image === "string" && project.image.startsWith("http")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />

                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[var(--bg-main)]/90 backdrop-blur-md rounded-full border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-main)] font-semibold">
                    {project.category}
                  </div>

                  {/* Number */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--bg-main)]/90 backdrop-blur-md rounded-full border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-main)]/80 font-semibold">
                    {numStr}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors tracking-tight">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                    </div>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border-subtle)]">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 bg-[var(--bg-main)]/60 border border-[var(--border-subtle)] rounded-full text-xs font-mono text-[var(--text-main)]/80 group-hover:border-[var(--accent)]/40 group-hover:text-[var(--accent)] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination Bar (Only show if totalPages > 1) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-12 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-[var(--text-main)] text-[var(--bg-main)] shadow-lg"
                        : "bg-[var(--bg-card)]/60 border border-[var(--border-subtle)] text-[var(--text-main)]/80 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-main)] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-colors cursor-pointer"
              aria-label="Halaman Selanjutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </main>

      {/* Footer / Back to Home CTA */}
      <section className="py-24 md:py-36 px-6 bg-transparent border-t border-[var(--border-subtle)] text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] text-[var(--accent)] font-mono font-semibold block">
            TERIMA KASIH TELAH MENJELAJAH
          </span>
          <Link href="/" className="group inline-block">
            <h2 className="text-3xl md:text-6xl font-semibold uppercase tracking-tight text-[var(--text-main)] group-hover:text-[var(--accent)] transition-colors duration-500 flex items-center justify-center gap-4">
              <span>Kembali ke Halaman Utama</span>
              <ArrowLeft className="w-8 h-8 md:w-16 md:h-16 text-[var(--accent)] group-hover:-translate-x-2 transition-transform duration-300" />
            </h2>
          </Link>
        </div>
      </section>
    </div>
  );
}
