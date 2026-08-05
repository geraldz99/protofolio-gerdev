"use client";

import { Plus, Trash2 } from "lucide-react";

export interface SkillItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

export interface SkillsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: SkillItem[];
}

interface SkillsEditorProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

export default function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const handleAddSkill = () => {
    const nextNum = (data.items.length + 1).toString().padStart(2, "0");
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: `s-${Date.now()}`,
          num: nextNum,
          title: "Keahlian Baru",
          desc: "Penjelasan deskripsi keahlian.",
        },
      ],
    });
  };

  const handleRemoveSkill = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const handleItemUpdate = (index: number, key: keyof SkillItem, val: string) => {
    const updatedItems = [...data.items];
    updatedItems[index][key] = val;
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            04 / Keahlian & Layanan (Skills Section)
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Skills</span>
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
              placeholder="e.g. 03 / KEAHLIAN & LAYANAN"
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
                placeholder="e.g. Solusi"
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
                placeholder="e.g. Rekayasa Perangkat Lunak"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>
        </div>

        {/* List Items Keahlian */}
        <div className="pt-6 border-t border-[#2b211b]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#c85628]">
              Daftar Layanan & Keahlian ({data.items.length})
            </h4>
            <button
              onClick={handleAddSkill}
              className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
            >
              <Plus size={14} />
              <span>Tambah Keahlian</span>
            </button>
          </div>

          <div className="space-y-4">
            {data.items.map((skill, idx) => (
              <div key={skill.id} className="p-5 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#c85628] font-bold">
                      #{skill.num}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={skill.num}
                    onChange={(e) => handleItemUpdate(idx, "num", e.target.value)}
                    placeholder="Nomor (e.g. 01)"
                    className="px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
                  />
                  <input
                    type="text"
                    value={skill.title}
                    onChange={(e) => handleItemUpdate(idx, "title", e.target.value)}
                    placeholder="Judul Keahlian"
                    className="md:col-span-2 px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
                  />
                </div>

                <textarea
                  rows={2}
                  value={skill.desc}
                  onChange={(e) => handleItemUpdate(idx, "desc", e.target.value)}
                  placeholder="Deskripsi keahlian..."
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
