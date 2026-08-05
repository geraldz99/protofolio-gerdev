"use client";

import { Plus, Trash2 } from "lucide-react";
import { HighlightItem, ValueItem } from "@/context/PortfolioContext";

export interface AboutData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  bioText: string;
  profileImage: string;
  profileBadge: string;
  highlights: HighlightItem[];
  coreTechStack: string[];
  values: ValueItem[];
}

interface AboutEditorProps {
  data: AboutData;
  onChange: (data: AboutData) => void;
}

export default function AboutEditor({ data, onChange }: AboutEditorProps) {
  const handleValueUpdate = (index: number, key: keyof ValueItem, val: string) => {
    const updatedValues = [...(data.values || [])];
    updatedValues[index][key] = val;
    onChange({ ...data, values: updatedValues });
  };

  const handleAddValue = () => {
    onChange({
      ...data,
      values: [
        ...(data.values || []),
        {
          id: `v-${Date.now()}`,
          num: `0${(data.values?.length || 0) + 1}`,
          title: "PRINSIP BARU",
          desc: "Deskripsi filosofi baru.",
        },
      ],
    });
  };

  const handleRemoveValue = (id: string) => {
    onChange({
      ...data,
      values: (data.values || []).filter((v) => v.id !== id),
    });
  };

  // HIGHLIGHTS HANDLERS (Meta Quick Info Card)
  const handleHighlightUpdate = (index: number, key: keyof HighlightItem, val: string) => {
    const updated = [...(data.highlights || [])];
    updated[index][key] = val;
    onChange({ ...data, highlights: updated });
  };

  const handleAddHighlight = () => {
    onChange({
      ...data,
      highlights: [
        ...(data.highlights || []),
        {
          id: `h-${Date.now()}`,
          label: "Label Info",
          value: "Nilai Info",
        },
      ],
    });
  };

  const handleRemoveHighlight = (id: string) => {
    onChange({
      ...data,
      highlights: (data.highlights || []).filter((h) => h.id !== id),
    });
  };

  // CORE TECH STACK HANDLERS
  const handleTechChange = (index: number, val: string) => {
    const updatedTech = [...(data.coreTechStack || [])];
    updatedTech[index] = val;
    onChange({ ...data, coreTechStack: updatedTech });
  };

  const handleAddTech = () => {
    onChange({
      ...data,
      coreTechStack: [...(data.coreTechStack || []), "Teknologi Baru"],
    });
  };

  const handleRemoveTech = (index: number) => {
    const updatedTech = [...(data.coreTechStack || [])];
    updatedTech.splice(index, 1);
    onChange({ ...data, coreTechStack: updatedTech });
  };

  return (
    <div className="w-full space-y-8 relative">
      {/* Main Header & Bio Editor Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            02 / Seksi About (Profil, Media & Tech Stack)
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama About</span>
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
              placeholder="e.g. 01 // BIOGRAFI & PROFIL"
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
                placeholder="e.g. Arsitektur Sistem &"
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
                placeholder="e.g. Rekayasa Back-End"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Paragraf Editorial Utama (Biografi)
            </label>
            <textarea
              rows={4}
              value={data.bioText}
              onChange={(e) => onChange({ ...data, bioText: e.target.value })}
              placeholder="Saya Geraldine Firdaus. Seorang Back-End Developer..."
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Profile Card Media & Quick Meta Highlights Editor */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            Kartu Profil & Quick Highlights Meta
          </h3>
          <p className="text-xs font-mono text-[#2b211b]/60">
            Kelola gambar foto profil, badge nama overlay, dan rincian info ringkas pada kartu profil sebelah kiri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Path / URL Foto Profil (Profile Image)
            </label>
            <input
              type="text"
              value={data.profileImage || ""}
              onChange={(e) => onChange({ ...data, profileImage: e.target.value })}
              placeholder="e.g. /projects/gerdev.png"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Teks Badge Overlay Foto (Badge Overlay Name)
            </label>
            <input
              type="text"
              value={data.profileBadge || ""}
              onChange={(e) => onChange({ ...data, profileBadge: e.target.value })}
              placeholder="e.g. GERALDINE FIRDAUS"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
            />
          </div>
        </div>

        {/* Highlights List Form */}
        <div className="pt-4 border-t border-[#2b211b]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#c85628]">
              Rincian Quick Highlights ({data.highlights?.length || 0})
            </h4>
            <button
              onClick={handleAddHighlight}
              className="px-3 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1 cursor-pointer shadow-sm hover:bg-[#a8441c]"
            >
              <Plus size={13} />
              <span>Tambah Info</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.highlights?.map((hl, idx) => (
              <div key={hl.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3.5 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 items-center">
                <input
                  type="text"
                  value={hl.label}
                  onChange={(e) => handleHighlightUpdate(idx, "label", e.target.value)}
                  placeholder="Label (e.g. Nama)"
                  className="md:col-span-4 px-3 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
                />
                <input
                  type="text"
                  value={hl.value}
                  onChange={(e) => handleHighlightUpdate(idx, "value", e.target.value)}
                  placeholder="Nilai (e.g. Geraldine Firdaus)"
                  className="md:col-span-7 px-3 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                />
                <div className="md:col-span-1 flex justify-end">
                  <button
                    onClick={() => handleRemoveHighlight(hl.id)}
                    className="text-red-600 hover:text-red-700 p-1.5"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Tech Stack Pills Form */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <div>
            <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
              Core Tech Stack Pills ({data.coreTechStack?.length || 0})
            </h3>
            <p className="text-xs font-mono text-[#2b211b]/60">
              Kelola tag/pills teknologi utama yang ditampilkan di bagian bawah box biografi.
            </p>
          </div>
          <button
            onClick={handleAddTech}
            className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
          >
            <Plus size={14} />
            <span>Tambah Tag Tech</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {data.coreTechStack?.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl shadow-sm">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechChange(idx, e.target.value)}
                className="bg-transparent text-xs font-mono font-bold text-[#2b211b] focus:outline-none w-36 md:w-48"
              />
              <button
                onClick={() => handleRemoveTech(idx)}
                className="text-red-600 hover:text-red-700 p-0.5"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Item List Values/Principles Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#2b211b]">
            Pilar Filosofi Desain & Nilai ({data.values?.length || 0})
          </h4>
          <button
            onClick={handleAddValue}
            className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
          >
            <Plus size={14} />
            <span>Tambah Pilar</span>
          </button>
        </div>

        <div className="space-y-4">
          {data.values?.map((item, idx) => (
            <div key={item.id} className="rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 overflow-hidden space-y-0 shadow-sm">
              <div className="p-4 md:p-5 flex items-center justify-between bg-[#ebd0b5] border-b border-[#2b211b]/20">
                <span className="text-xs font-mono text-[#c85628] font-bold">
                  PILAR #{item.num} — {item.title || "Untitled"}
                </span>
                <button
                  onClick={() => handleRemoveValue(item.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-5 md:p-6 bg-[#f6d4b1] space-y-3">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleValueUpdate(idx, "title", e.target.value)}
                  placeholder="Judul Pilar Filosofi"
                  className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
                />
                <textarea
                  rows={2}
                  value={item.desc}
                  onChange={(e) => handleValueUpdate(idx, "desc", e.target.value)}
                  placeholder="Penjelasan ringkas pilar..."
                  className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b]/80 focus:outline-none focus:border-[#c85628]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
