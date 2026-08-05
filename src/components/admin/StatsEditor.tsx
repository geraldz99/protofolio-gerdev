"use client";

import { Plus, Trash2 } from "lucide-react";

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

interface StatsEditorProps {
  items: StatItem[];
  onChange: (items: StatItem[]) => void;
}

export default function StatsEditor({ items, onChange }: StatsEditorProps) {
  const handleAdd = () => {
    onChange([
      ...items,
      {
        id: `st-${Date.now()}`,
        label: "Pencapaian Baru",
        value: 10,
        suffix: "+",
      },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const handleUpdate = (index: number, key: keyof StatItem, val: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: val };
    onChange(updated);
  };

  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            09 / Angka Statistik (Animated Counters)
          </h3>
          <button
            onClick={handleAdd}
            className="px-3.5 py-1.5 bg-[#c85628] text-[#f6d4b1] font-bold rounded-xl font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#a8441c]"
          >
            <Plus size={14} />
            <span>Tambah Counter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((stat, idx) => (
            <div key={stat.id} className="p-5 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#c85628] font-bold">
                  COUNTER #{idx + 1}
                </span>
                <button
                  onClick={() => handleRemove(stat.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-[#2b211b]/60 block mb-1 font-semibold">Target Angka</label>
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) => handleUpdate(idx, "value", Number(e.target.value))}
                    className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#2b211b]/60 block mb-1 font-semibold">Akhiran (Suffix)</label>
                  <input
                    type="text"
                    value={stat.suffix}
                    onChange={(e) => handleUpdate(idx, "suffix", e.target.value)}
                    placeholder="e.g. + or %"
                    className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#2b211b]/60 block mb-1 font-semibold">Label Keterangan</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleUpdate(idx, "label", e.target.value)}
                  placeholder="e.g. Proyek Selesai"
                  className="w-full px-4 py-2 bg-[#ebd0b5] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] focus:outline-none focus:border-[#c85628]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
