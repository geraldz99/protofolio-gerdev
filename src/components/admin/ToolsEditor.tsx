"use client";

import { Plus, Trash2 } from "lucide-react";

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  logoSrc: string;
  isMonochrome?: boolean;
}

export interface ToolsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: ToolItem[];
}

interface ToolsEditorProps {
  data: ToolsData;
  onChange: (data: ToolsData) => void;
}

export default function ToolsEditor({ data, onChange }: ToolsEditorProps) {
  const handleAdd = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        {
          id: `t-${Date.now()}`,
          name: "Perangkat Baru",
          category: "Kategori Perangkat",
          logoSrc: "/logo/React-icon.svg",
          isMonochrome: false,
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

  const handleItemUpdate = (index: number, key: keyof ToolItem, val: string | boolean) => {
    const updatedItems = [...data.items];
    updatedItems[index] = { ...updatedItems[index], [key]: val };
    onChange({ ...data, items: updatedItems });
  };

  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            05 / Tools & Perangkat (Tools Section)
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Tools</span>
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
              placeholder="e.g. 04 / PERANGKAT"
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
                placeholder="e.g. Teknologi &"
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
                placeholder="e.g. Perangkat Utama"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>
        </div>

        {/* List Perangkat / Tools */}
        <div className="pt-6 border-t border-[#2b211b]/20 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#c85628]">
              Daftar Tools & Perangkat ({data.items.length})
            </h4>
            <button
              onClick={handleAdd}
              className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
            >
              <Plus size={14} />
              <span>Tambah Tool</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.items.map((tool, idx) => (
              <div key={tool.id} className="p-5 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#c85628] font-bold">
                    TOOL #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleRemove(tool.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={tool.name}
                    onChange={(e) => handleItemUpdate(idx, "name", e.target.value)}
                    placeholder="Nama Perangkat (e.g. Next.js)"
                    className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
                  />
                  <input
                    type="text"
                    value={tool.category}
                    onChange={(e) => handleItemUpdate(idx, "category", e.target.value)}
                    placeholder="Kategori (e.g. High Performance Microservices)"
                    className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b]/80 focus:outline-none focus:border-[#c85628]"
                  />
                  <input
                    type="text"
                    value={tool.logoSrc}
                    onChange={(e) => handleItemUpdate(idx, "logoSrc", e.target.value)}
                    placeholder="Path Logo SVG (e.g. /logo/React-icon.svg)"
                    className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b]/60 focus:outline-none focus:border-[#c85628]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
