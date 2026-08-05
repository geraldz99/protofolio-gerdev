"use client";

import { Plus, Trash2 } from "lucide-react";

export interface TestimonialItem {
  id: string;
  num: string;
  content: string;
  author: string;
  role: string;
  company: string;
}

export interface TestimonialsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: TestimonialItem[];
}

interface TestimonialsEditorProps {
  data: TestimonialsData;
  onChange: (data: TestimonialsData) => void;
}

export default function TestimonialsEditor({ data, onChange }: TestimonialsEditorProps) {
  const handleAdd = () => {
    const nextNum = (data.items.length + 1).toString().padStart(2, "0");
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: `ts-${Date.now()}`,
          num: nextNum,
          content: "Testimoni baru dari mitra atau klien.",
          author: "Nama Klien",
          role: "Jabatan",
          company: "Nama Perusahaan",
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

  const handleItemUpdate = (index: number, key: keyof TestimonialItem, val: string) => {
    const updatedItems = [...data.items];
    updatedItems[index][key] = val;
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            13 / Testimoni Klien & Mitra (Testimonials Section)
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Testimoni</span>
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
              placeholder="e.g. 09 / TESTIMONI"
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
                placeholder="e.g. Kritik &"
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
                placeholder="e.g. Apresiasi"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>
        </div>

        {/* List Testimoni */}
        <div className="pt-6 border-t border-[#2b211b]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#c85628]">
              Daftar Testimoni Klien ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
            >
              <Plus size={14} />
              <span>Tambah Testimoni</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.items.map((item, idx) => (
              <div key={item.id} className="p-5 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#c85628] font-bold">
                    TESTIMONI #{item.num}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-[#2b211b]/60 block font-semibold">Isi Kutipan Testimoni</label>
                  <textarea
                    rows={3}
                    value={item.content}
                    onChange={(e) => handleItemUpdate(idx, "content", e.target.value)}
                    placeholder="Geraldine sangat berfokus pada detail..."
                    className="w-full px-4 py-2.5 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#2b211b]/60 block font-semibold">Nama Pengirim</label>
                    <input
                      type="text"
                      value={item.author}
                      onChange={(e) => handleItemUpdate(idx, "author", e.target.value)}
                      placeholder="e.g. Klien Enterprise"
                      className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#2b211b]/60 block font-semibold">Jabatan</label>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleItemUpdate(idx, "role", e.target.value)}
                      placeholder="e.g. CTO"
                      className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#2b211b]/60 block font-semibold">Perusahaan / Instansi</label>
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleItemUpdate(idx, "company", e.target.value)}
                      placeholder="e.g. Enterprise Platform"
                      className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b]/80 focus:outline-none focus:border-[#c85628]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
