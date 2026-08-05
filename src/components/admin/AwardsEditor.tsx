"use client";

import { Plus, Trash2 } from "lucide-react";

export interface AwardItem {
  id: string;
  title: string;
}

interface AwardsEditorProps {
  items: AwardItem[];
  onChange: (items: AwardItem[]) => void;
}

export default function AwardsEditor({ items, onChange }: AwardsEditorProps) {
  const handleAdd = () => {
    onChange([
      ...items,
      { id: `aw-${Date.now()}`, title: "TEKS RUNNING BARU 2026" },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleUpdate = (index: number, val: string) => {
    const updated = [...items];
    updated[index].title = val;
    onChange(updated);
  };

  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            12 / Running Text Marquee ({items.length})
          </h3>
          <button
            onClick={handleAdd}
            className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
          >
            <Plus size={15} />
            <span>Tambah Teks</span>
          </button>
        </div>

        <div className="space-y-3">
          {items.map((award, idx) => (
            <div key={award.id} className="flex items-center gap-3 p-4 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 shadow-sm">
              <span className="text-xs font-mono text-[#c85628] font-bold shrink-0">
                #{idx + 1}
              </span>
              <input
                type="text"
                value={award.title}
                onChange={(e) => handleUpdate(idx, e.target.value)}
                className="flex-1 px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold focus:outline-none focus:border-[#c85628]"
              />
              <button
                onClick={() => handleRemove(award.id)}
                className="text-red-600 hover:text-red-700 p-2 shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
