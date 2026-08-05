"use client";

import { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Project } from "@/data/projects";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Layers,
  Target,
  CheckCircle,
  Zap,
  AlertTriangle,
  X,
} from "lucide-react";

export interface ProjectsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  ctaText: string;
  ctaLink: string;
  items: Project[];
}

interface ProjectsEditorProps {
  data: ProjectsData;
  onChange: (data: ProjectsData) => void;
}

const emptySubscribe = () => () => {};

export default function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Accordion state
  const [expandedId, setExpandedId] = useState<string | null>(data.items[0]?.id || null);

  // Custom Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddProject = () => {
    const newId = Date.now().toString();
    const newProject: Project = {
      id: newId,
      slug: `proyek-baru-${newId}`,
      title: "Judul Proyek Baru",
      category: "Kategori Proyek",
      description: "Deskripsi ringkas proyek.",
      longDescription: "Deskripsi lengkap rincian mengenai latar belakang, fitur utama, dan tujuan dari proyek ini.",
      tech: ["Node.js", "TypeScript", "PostgreSQL"],
      image: "/projects/ikapa.jpg",
      year: new Date().getFullYear().toString(),
      client: "Nama Klien / Instansi",
      role: "Back-End Developer",
      challenges: ["Tantangan teknis pertama..."],
      solutions: ["Solusi dan pendekatan teknis..."],
      impact: ["Hasil dan dampak positif proyek..."],
      liveUrl: "https://example.com",
      githubUrl: "",
    };

    onChange({
      ...data,
      items: [newProject, ...data.items],
    });
    setExpandedId(newId);
  };

  const confirmDeleteProject = () => {
    if (!deleteTarget) return;
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== deleteTarget.id),
    });
    setDeleteTarget(null);
  };

  const handleUpdateField = (index: number, key: keyof Project, val: string | string[]) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  // Helper Array string field editor (Tech, Challenges, Solutions, Impact)
  const handleArrayItemChange = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact",
    itemIndex: number,
    val: string
  ) => {
    const updatedItems = [...data.items];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray[itemIndex] = val;
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  const handleAddArrayItem = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact"
  ) => {
    const updatedItems = [...data.items];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray.push(arrayKey === "tech" ? "Teknologi Baru" : "Poin item baru...");
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  const handleRemoveArrayItem = (
    projectIndex: number,
    arrayKey: "tech" | "challenges" | "solutions" | "impact",
    itemIndex: number
  ) => {
    const updatedItems = [...data.items];
    const currentArray = [...(updatedItems[projectIndex][arrayKey] || [])];
    currentArray.splice(itemIndex, 1);
    updatedItems[projectIndex] = { ...updatedItems[projectIndex], [arrayKey]: currentArray };
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-8 relative">
      {/* CUSTOM PROPER DELETE MODAL USING PORTAL TO BODY */}
      {deleteTarget &&
        isClient &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#2b211b]/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#ebd0b5] border border-[#2b211b]/20 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative z-[10000] text-[#2b211b]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-600 shrink-0">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#2b211b] font-mono">Konfirmasi Hapus</h4>
                    <p className="text-xs text-[#2b211b]/60 font-mono">Tindakan ini tidak dapat dibatalkan</p>
                  </div>
                </div>
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="text-[#2b211b]/50 hover:text-[#2b211b] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs md:text-sm text-[#2b211b]/80 font-mono leading-relaxed bg-[#f6d4b1] p-4 rounded-2xl border border-[#2b211b]/20">
                Apakah Anda yakin ingin menghapus proyek <span className="text-[#c85628] font-bold">&quot;{deleteTarget.title}&quot;</span>?
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2.5 bg-[#f6d4b1] hover:bg-[#f6d4b1]/80 border border-[#2b211b]/20 text-[#2b211b] rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteProject}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-[#f6d4b1] rounded-xl font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Ya, Hapus Proyek
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Seksi Header Konfigurasi General Projects */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            07 / Seksi Portofolio Proyek & Detail Page
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Projects</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Label Header Seksi (Section Badge)
            </label>
            <input
              type="text"
              value={data.sectionBadge}
              onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
              placeholder="e.g. 06 / KARYA TERPILIH"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Judul Utama (Main Title)
              </label>
              <input
                type="text"
                value={data.titleMain}
                onChange={(e) => onChange({ ...data, titleMain: e.target.value })}
                placeholder="e.g. Rekayasa"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Judul Highlight Terracotta (Highlight Title)
              </label>
              <input
                type="text"
                value={data.titleHighlight}
                onChange={(e) => onChange({ ...data, titleHighlight: e.target.value })}
                placeholder="e.g. Sistem & Aplikasi"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Teks Tombol Arsip (CTA Label)
              </label>
              <input
                type="text"
                value={data.ctaText}
                onChange={(e) => onChange({ ...data, ctaText: e.target.value })}
                placeholder="e.g. LIHAT SEMUA PROYEK"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Tautan Arsip (CTA Href)
              </label>
              <input
                type="text"
                value={data.ctaLink}
                onChange={(e) => onChange({ ...data, ctaLink: e.target.value })}
                placeholder="e.g. /projects"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* List Item Proyek (Smooth Accordion Expandable Cards) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-mono font-bold uppercase tracking-wider text-[#2b211b]">
              Daftar Proyek & Detail ({data.items.length})
            </h4>
            <p className="text-xs font-mono text-[#2b211b]/60">
              Kelola rincian lengkap proyek untuk halaman utama & halaman detail (`/projects/[slug]`).
            </p>
          </div>

          <button
            onClick={handleAddProject}
            className="px-4 py-2.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:bg-[#a8441c] active:scale-95"
          >
            <Plus size={16} />
            <span>Tambah Proyek Baru</span>
          </button>
        </div>

        <div className="space-y-4">
          {data.items.map((proj, idx) => {
            const isExpanded = expandedId === proj.id;

            return (
              <div
                key={proj.id}
                className={`rounded-3xl bg-[#ebd0b5] border transition-all duration-300 overflow-hidden shadow-sm ${
                  isExpanded ? "border-[#c85628]" : "border-[#2b211b]/20 hover:border-[#c85628]/60"
                }`}
              >
                {/* Accordion Header Bar */}
                <div
                  onClick={() => toggleExpand(proj.id)}
                  className="p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer select-none bg-[#ebd0b5] hover:bg-[#f6d4b1]/60 transition-colors"
                >
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <span className="w-8 h-8 rounded-xl bg-[#c85628] text-[#f6d4b1] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm md:text-base font-bold text-[#2b211b] font-mono truncate">
                          {proj.title || "Tanpa Judul"}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#f6d4b1] border border-[#2b211b]/20 text-[10px] font-mono text-[#c85628] font-bold">
                          {proj.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#2b211b]/60">
                          ({proj.year})
                        </span>
                      </div>
                      <p className="text-xs text-[#2b211b]/60 truncate font-mono mt-0.5">
                        Client: {proj.client || "-"} | Role: {proj.role || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget({ id: proj.id, title: proj.title });
                      }}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                      title="Hapus Proyek"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="p-2 text-[#2b211b]/60 group-hover:text-[#2b211b] transition-transform duration-300">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                </div>

                {/* Smooth Animated Accordion Dropdown Content */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 md:p-8 border-t border-[#2b211b]/20 bg-[#f6d4b1] space-y-8">
                      {/* BAGIAN 1: IDENTITAS & LINK PROYEK */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#2b211b]/20 pb-2">
                          <Layers size={16} className="text-[#c85628]" />
                          <h5 className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-wider">
                            1. Identitas & Meta Proyek
                          </h5>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1 md:col-span-2">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Judul Proyek</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => handleUpdateField(idx, "title", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Slug URL (Slug Rute Detail)</label>
                            <input
                              type="text"
                              value={proj.slug}
                              onChange={(e) => handleUpdateField(idx, "slug", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-1 md:col-span-2">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Kategori Proyek</label>
                            <input
                              type="text"
                              value={proj.category}
                              onChange={(e) => handleUpdateField(idx, "category", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Tahun Proyek</label>
                            <input
                              type="text"
                              value={proj.year}
                              onChange={(e) => handleUpdateField(idx, "year", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Peran (Role)</label>
                            <input
                              type="text"
                              value={proj.role}
                              onChange={(e) => handleUpdateField(idx, "role", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1 md:col-span-2">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Nama Klien / Instansi</label>
                            <input
                              type="text"
                              value={proj.client}
                              onChange={(e) => handleUpdateField(idx, "client", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Path / URL Gambar Showcase</label>
                            <input
                              type="text"
                              value={proj.image}
                              onChange={(e) => handleUpdateField(idx, "image", e.target.value)}
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">URL Demo Live (Live URL)</label>
                            <input
                              type="text"
                              value={proj.liveUrl || ""}
                              onChange={(e) => handleUpdateField(idx, "liveUrl", e.target.value)}
                              placeholder="e.g. https://domain.com"
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">URL GitHub Repository</label>
                            <input
                              type="text"
                              value={proj.githubUrl || ""}
                              onChange={(e) => handleUpdateField(idx, "githubUrl", e.target.value)}
                              placeholder="e.g. https://github.com/..."
                              className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* BAGIAN 2: DESKRIPSI RINGKAS & LENGKAP */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-2 border-b border-[#2b211b]/20 pb-2">
                          <Code2 size={16} className="text-[#c85628]" />
                          <h5 className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-wider">
                            2. Deskripsi Ringkas & Narasi Detail Proyek
                          </h5>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Deskripsi Ringkas (Homepage & Cards)</label>
                          <textarea
                            rows={2}
                            value={proj.description}
                            onChange={(e) => handleUpdateField(idx, "description", e.target.value)}
                            className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628] leading-relaxed"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] font-mono text-[#2b211b]/80 block font-semibold">Deskripsi Lengkap (Halaman Detail `/projects/[slug]`)</label>
                          <textarea
                            rows={4}
                            value={proj.longDescription}
                            onChange={(e) => handleUpdateField(idx, "longDescription", e.target.value)}
                            className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628] leading-relaxed"
                          />
                        </div>
                      </div>

                      {/* BAGIAN 3: TECH STACK PILLS */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-2">
                          <div className="flex items-center gap-2">
                            <Zap size={16} className="text-[#c85628]" />
                            <h5 className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-wider">
                              3. Teknologi & Tools (Tech Stack) ({proj.tech?.length || 0})
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem(idx, "tech")}
                            className="px-2.5 py-1 bg-[#c85628] hover:bg-[#a8441c] text-[#f6d4b1] rounded-lg font-mono text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={13} />
                            <span>Tambah Tech</span>
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {proj.tech?.map((t, tIdx) => (
                            <div key={tIdx} className="flex items-center gap-1 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl px-3 py-1">
                              <input
                                type="text"
                                value={t}
                                onChange={(e) => handleArrayItemChange(idx, "tech", tIdx, e.target.value)}
                                className="bg-transparent font-mono text-xs text-[#c85628] font-bold focus:outline-none w-24 md:w-32"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem(idx, "tech", tIdx)}
                                className="text-red-600 hover:text-red-700 p-0.5"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BAGIAN 4: TANTANGAN (CHALLENGES) */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-2">
                          <div className="flex items-center gap-2">
                            <Target size={16} className="text-[#c85628]" />
                            <h5 className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-wider">
                              4. Tantangan Proyek (Challenges) ({proj.challenges?.length || 0})
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem(idx, "challenges")}
                            className="px-2.5 py-1 bg-[#c85628] hover:bg-[#a8441c] text-[#f6d4b1] rounded-lg font-mono text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={13} />
                            <span>Tambah Tantangan</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {proj.challenges?.map((c, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-[#2b211b]/60 shrink-0">#{cIdx + 1}</span>
                              <input
                                type="text"
                                value={c}
                                onChange={(e) => handleArrayItemChange(idx, "challenges", cIdx, e.target.value)}
                                className="flex-1 px-3.5 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem(idx, "challenges", cIdx)}
                                className="text-red-600 hover:text-red-700 p-2 shrink-0"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BAGIAN 5: SOLUSI & PENDEKATAN (SOLUTIONS) */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-[#c85628]" />
                            <h5 className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-wider">
                              5. Solusi & Pendekatan Teknis (Solutions) ({proj.solutions?.length || 0})
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem(idx, "solutions")}
                            className="px-2.5 py-1 bg-[#c85628] hover:bg-[#a8441c] text-[#f6d4b1] rounded-lg font-mono text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={13} />
                            <span>Tambah Solusi</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {proj.solutions?.map((s, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-[#2b211b]/60 shrink-0">#{sIdx + 1}</span>
                              <input
                                type="text"
                                value={s}
                                onChange={(e) => handleArrayItemChange(idx, "solutions", sIdx, e.target.value)}
                                className="flex-1 px-3.5 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem(idx, "solutions", sIdx)}
                                className="text-red-600 hover:text-red-700 p-2 shrink-0"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BAGIAN 6: HASIL & DAMPAK (IMPACT) */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-2">
                          <div className="flex items-center gap-2">
                            <ExternalLink size={16} className="text-[#c85628]" />
                            <h5 className="text-xs font-mono font-bold text-[#c85628] uppercase tracking-wider">
                              6. Hasil & Dampak Positif (Impact) ({proj.impact?.length || 0})
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddArrayItem(idx, "impact")}
                            className="px-2.5 py-1 bg-[#c85628] hover:bg-[#a8441c] text-[#f6d4b1] rounded-lg font-mono text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={13} />
                            <span>Tambah Dampak</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {proj.impact?.map((imp, impIdx) => (
                            <div key={impIdx} className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-[#2b211b]/60 shrink-0">#{impIdx + 1}</span>
                              <input
                                type="text"
                                value={imp}
                                onChange={(e) => handleArrayItemChange(idx, "impact", impIdx, e.target.value)}
                                className="flex-1 px-3.5 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveArrayItem(idx, "impact", impIdx)}
                                className="text-red-600 hover:text-red-700 p-2 shrink-0"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
