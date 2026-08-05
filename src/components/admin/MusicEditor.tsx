"use client";

export interface MusicData {
  sectionBadge: string;
  title: string;
  artist: string;
  audioUrl: string;
  subText: string;
  enabled: boolean;
}

interface MusicEditorProps {
  data: MusicData;
  onChange: (data: MusicData) => void;
}

export default function MusicEditor({ data, onChange }: MusicEditorProps) {
  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            08 / Music Player Widget
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama Music</span>
        </div>

        <div className="space-y-4">
          {/* Badge Seksi */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              Label Header Seksi (Section Badge)
            </label>
            <input
              type="text"
              value={data.sectionBadge}
              onChange={(e) => onChange({ ...data, sectionBadge: e.target.value })}
              placeholder="e.g. 08 / VIBE & MUSIC"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Judul Lagu */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">Judul Lagu (Song Title)</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => onChange({ ...data, title: e.target.value })}
                placeholder="e.g. Walking Back Home"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>

            {/* Penyanyi */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">Nama Penyanyi / Band (Artist)</label>
              <input
                type="text"
                value={data.artist}
                onChange={(e) => onChange({ ...data, artist: e.target.value })}
                placeholder="e.g. FUR"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>

          {/* URL Audio MP3 */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">URL Berkas Audio MP3 (Audio File Path)</label>
            <input
              type="text"
              value={data.audioUrl}
              onChange={(e) => onChange({ ...data, audioUrl: e.target.value })}
              placeholder="e.g. /audio/FUR - Walking Back Home.mp3"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
            />
          </div>

          {/* Sub Text */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">Teks Sub-Deskripsi Pembeda (Sub Text)</label>
            <textarea
              rows={2}
              value={data.subText}
              onChange={(e) => onChange({ ...data, subText: e.target.value })}
              placeholder="Sembari menjelajahi portofolio, nikmati..."
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
