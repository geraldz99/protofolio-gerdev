"use client";

export interface HeroData {
  bgText: string;
  prefixText: string;
  highlightText: string;
  heroImage: string;
  ctaText: string;
  ctaLink: string;
  bottomLeftText: string;
  bottomRightText: string;
}

interface HeroEditorProps {
  data: HeroData;
  onChange: (data: HeroData) => void;
}

export default function HeroEditor({ data, onChange }: HeroEditorProps) {
  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            01 / Sequence Scroll & Hero Section
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Hero</span>
        </div>

        <div className="space-y-4">
          {/* Teks Raksasa Latar Belakang */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Teks Raksasa Latar Belakang (Giant Watermark)
            </label>
            <input
              type="text"
              value={data.bgText}
              onChange={(e) => onChange({ ...data, bgText: e.target.value })}
              placeholder="e.g. DEVELOPER"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
            />
          </div>

          {/* Intro Text: Prefix & Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Awalan Teks Intro (Prefix Text)
              </label>
              <input
                type="text"
                value={data.prefixText}
                onChange={(e) => onChange({ ...data, prefixText: e.target.value })}
                placeholder="e.g. I'm"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Teks Highlight Terracotta (Highlight Text)
              </label>
              <input
                type="text"
                value={data.highlightText}
                onChange={(e) => onChange({ ...data, highlightText: e.target.value })}
                placeholder="e.g. Back-End"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>

          {/* Gambar Hero */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Path / URL Gambar Hero Utama
            </label>
            <input
              type="text"
              value={data.heroImage}
              onChange={(e) => onChange({ ...data, heroImage: e.target.value })}
              placeholder="e.g. /projects/nats6.png"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
            />
          </div>

          {/* Tombol CTA: Label & Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Teks Tombol CTA (Label Button)
              </label>
              <input
                type="text"
                value={data.ctaText}
                onChange={(e) => onChange({ ...data, ctaText: e.target.value })}
                placeholder="e.g. Hire Me"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Tautan Tombol CTA (Href Link)
              </label>
              <input
                type="text"
                value={data.ctaLink}
                onChange={(e) => onChange({ ...data, ctaLink: e.target.value })}
                placeholder="e.g. /#contact"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>

          {/* Paragraf Bawah Kiri & Kanan */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Teks Paragraf Kiri Bawah (Spesialisasi)
            </label>
            <textarea
              rows={2}
              value={data.bottomLeftText}
              onChange={(e) => onChange({ ...data, bottomLeftText: e.target.value })}
              placeholder="Specialized in backend development..."
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Teks Paragraf Kanan Bawah (Visi & Nilai)
            </label>
            <textarea
              rows={2}
              value={data.bottomRightText}
              onChange={(e) => onChange({ ...data, bottomRightText: e.target.value })}
              placeholder="I build fast, interactive, and scalable web..."
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
