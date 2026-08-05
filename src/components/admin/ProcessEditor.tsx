"use client";

import { Plus, Trash2 } from "lucide-react";

export interface ProcessStep {
  id: string;
  num: string;
  phase: string;
  title: string;
  desc: string;
}

export interface ProcessData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  subText: string;
  items: ProcessStep[];
}

interface ProcessEditorProps {
  data: ProcessData;
  onChange: (data: ProcessData) => void;
}

export default function ProcessEditor({ data, onChange }: ProcessEditorProps) {
  const handleAdd = () => {
    const nextNum = (data.items.length + 1).toString().padStart(2, "0");
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: `p-${Date.now()}`,
          num: nextNum,
          phase: `PHASE ${nextNum}`,
          title: "Tahap Baru",
          desc: "Penjelasan deskripsi tahapan kerja.",
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

  const handleItemUpdate = (index: number, key: keyof ProcessStep, val: string) => {
    const updatedItems = [...data.items];
    updatedItems[index][key] = val;
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            06 / Proses Kerja (Work Process Section)
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Process</span>
        </div>

        {/* Header Seksi Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Label Header Seksi (Section Badge)
            </label>
            <input
              type="text"
              value={data.sectionBadge}
              onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
              placeholder="e.g. 05 / PROSES KERJA"
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
                placeholder="e.g. Langkah"
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
                placeholder="e.g. Eksekusi"
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
              placeholder="Tahapan sistematis dari riset awal hingga..."
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] leading-relaxed"
            />
          </div>
        </div>

        {/* List Steps Proses Kerja */}
        <div className="pt-6 border-t border-[#2b211b]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#c85628]">
              Daftar Tahapan Proses ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
            >
              <Plus size={14} />
              <span>Tambah Tahap</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.items.map((step, idx) => (
              <div key={step.id} className="p-5 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#c85628] font-bold">
                    STEP #{step.num}
                  </span>
                  <button
                    onClick={() => handleRemove(step.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={step.num}
                    onChange={(e) => handleItemUpdate(idx, "num", e.target.value)}
                    placeholder="Nomor (e.g. 01)"
                    className="px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
                  />
                  <input
                    type="text"
                    value={step.phase}
                    onChange={(e) => handleItemUpdate(idx, "phase", e.target.value)}
                    placeholder="Fase (e.g. PHASE 01)"
                    className="px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b]/80 font-semibold focus:outline-none focus:border-[#c85628]"
                  />
                </div>

                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => handleItemUpdate(idx, "title", e.target.value)}
                  placeholder="Judul Tahapan"
                  className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
                />

                <textarea
                  rows={2}
                  value={step.desc}
                  onChange={(e) => handleItemUpdate(idx, "desc", e.target.value)}
                  placeholder="Penjelasan tahapan..."
                  className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b]/80 focus:outline-none focus:border-[#c85628]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
