"use client";

import { Plus, Trash2 } from "lucide-react";

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface ExperienceData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  subText: string;
  ctaText: string;
  ctaLink: string;
  items: ExperienceItem[];
}

interface ExperienceEditorProps {
  data: ExperienceData;
  onChange: (data: ExperienceData) => void;
}

export default function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
  const handleAdd = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: `exp-${Date.now()}`,
          year: "2026",
          role: "Peran Baru",
          company: "Perusahaan / Client",
          description: "Deskripsi tanggung jawab.",
        },
      ],
    });
  };

  const handleRemove = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const handleItemUpdate = (index: number, key: keyof ExperienceItem, val: string) => {
    const updatedItems = [...data.items];
    updatedItems[index][key] = val;
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 relative">
      {/* Main Header Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            03 / Rekam Jejak Karir (Experience Timeline)
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Experience</span>
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
              placeholder="e.g. 02 / REKAM JEJAK"
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
                placeholder="e.g. Pengalaman"
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
                placeholder="e.g. Kerja"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Teks Sub-Deskripsi (Sub Text)
            </label>
            <textarea
              rows={2}
              value={data.subText}
              onChange={(e) => onChange({ ...data, subText: e.target.value })}
              placeholder="Rekam jejak profesional dalam membangun..."
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Teks Tombol Kontak (CTA Label)
              </label>
              <input
                type="text"
                value={data.ctaText}
                onChange={(e) => onChange({ ...data, ctaText: e.target.value })}
                placeholder="e.g. HUBUNGI UNTUK KOLABORASI"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Tautan Kontak (CTA Href)
              </label>
              <input
                type="text"
                value={data.ctaLink}
                onChange={(e) => onChange({ ...data, ctaLink: e.target.value })}
                placeholder="e.g. mailto:geraldinefirdaus99@gmail.com"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Item List Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-[#2b211b]">
            Daftar Pengalaman Karir ({data.items.length})
          </h4>
          <button
            onClick={handleAdd}
            className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
          >
            <Plus size={14} />
            <span>Tambah Pengalaman</span>
          </button>
        </div>

        <div className="space-y-4">
          {data.items.map((exp, idx) => (
            <div key={exp.id} className="rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 overflow-hidden space-y-0 shadow-sm">
              <div className="p-4 md:p-5 flex items-center justify-between bg-[#ebd0b5] border-b border-[#2b211b]/20">
                <span className="text-xs font-mono text-[#c85628] font-bold">
                  PENGALAMAN #0{idx + 1} — {exp.role} @ {exp.company}
                </span>
                <button
                  onClick={() => handleRemove(exp.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-5 md:p-6 bg-[#f6d4b1] space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={exp.year}
                    onChange={(e) => handleItemUpdate(idx, "year", e.target.value)}
                    placeholder="Tahun (e.g. 2023 — SEKARANG)"
                    className="px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                  />
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleItemUpdate(idx, "role", e.target.value)}
                    placeholder="Peran / Jabatan"
                    className="px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleItemUpdate(idx, "company", e.target.value)}
                    placeholder="Perusahaan / Klien"
                    className="px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                  />
                </div>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => handleItemUpdate(idx, "description", e.target.value)}
                  placeholder="Deskripsi tugas dan pencapaian..."
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
