"use client";

import { LucideIcon } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface OverviewEditorProps {
  items: MenuItem[];
  onSelectTab: (tab: string) => void;
}

export default function OverviewEditor({ items, onSelectTab }: OverviewEditorProps) {
  return (
    <div className="w-full space-y-8">
      <div className="p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 shadow-sm space-y-4">
        <span className="text-xs font-mono text-[#c85628] font-bold uppercase tracking-widest block">
          SISTEM ADMINISTRASI DINAMIS
        </span>
        <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#2b211b] tracking-tight">
          Pengelolaan Seluruh 13 Seksi Landing Page
        </h2>
        <p className="text-xs md:text-sm text-[#2b211b]/80 leading-relaxed font-medium max-w-2xl">
          Pilih salah satu seksi di bawah ini atau melalui menu navigasi sebelah kiri untuk menyunting judul, teks, daftar item, dan media.
        </p>
      </div>

      {/* Grid Overview Section Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="p-6 rounded-2xl bg-[#ebd0b5]/90 border border-[#2b211b]/20 hover:border-[#c85628] hover:-translate-y-1 transition-all cursor-pointer space-y-4 group shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f6d4b1] border border-[#2b211b]/20 group-hover:border-[#c85628] flex items-center justify-center text-[#c85628] transition-colors">
                <Icon size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#2b211b] group-hover:text-[#c85628] transition-colors font-mono">
                  {item.label}
                </h3>
                <p className="text-[11px] text-[#2b211b]/60 font-mono">
                  Klik untuk kelola seksi ini
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
