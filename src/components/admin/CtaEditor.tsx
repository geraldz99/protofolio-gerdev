"use client";

import { CtaData } from "@/context/PortfolioContext";

interface CtaEditorProps {
  data: CtaData;
  onChange: (data: CtaData) => void;
}

export default function CtaEditor({ data, onChange }: CtaEditorProps) {
  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            14 / Seksi Kontak & Hubungi Saya (CTA)
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Kontak</span>
        </div>

        <div className="space-y-4">
          {/* Judul Seksi */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Judul Seksi Kontak (Title)
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="e.g. Hubungi Saya"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] font-bold"
            />
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Deskripsi / Pesan Ajak Kolaborasi
            </label>
            <textarea
              rows={3}
              value={data.description}
              onChange={(e) => onChange({ ...data, description: e.target.value })}
              placeholder="e.g. Tertarik berkolaborasi atau memiliki pertanyaan seputar rekayasa sistem back-end & aplikasi? Mari terhubung..."
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] leading-relaxed"
            />
          </div>

          {/* Email Kontak */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Alamat Email Utama (Tombol Email Me)
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              placeholder="e.g. geraldinefirdaus99@gmail.com"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
            />
          </div>

          {/* Grid Social Media Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                URL Profil LinkedIn
              </label>
              <input
                type="text"
                value={data.linkedinUrl}
                onChange={(e) => onChange({ ...data, linkedinUrl: e.target.value })}
                placeholder="e.g. https://linkedin.com"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                URL Profil GitHub
              </label>
              <input
                type="text"
                value={data.githubUrl}
                onChange={(e) => onChange({ ...data, githubUrl: e.target.value })}
                placeholder="e.g. https://github.com/geraldz99"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
