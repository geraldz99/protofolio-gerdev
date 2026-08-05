"use client";

export interface GithubData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  username: string;
  profileUrl: string;
}

interface GithubEditorProps {
  data: GithubData;
  onChange: (data: GithubData) => void;
}

export default function GithubEditor({ data, onChange }: GithubEditorProps) {
  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            10 / Integration & Kontribusi GitHub
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Utama GitHub</span>
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
              placeholder="e.g. OPEN SOURCE & AKTIVITAS"
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
                placeholder="e.g. Aktivitas &"
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
                placeholder="e.g. Kontribusi GitHub"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Username GitHub (Dukungan Calendar Live)
              </label>
              <input
                type="text"
                value={data.username}
                onChange={(e) => onChange({ ...data, username: e.target.value })}
                placeholder="e.g. geraldz99"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Tautan Profil GitHub (Profile URL)
              </label>
              <input
                type="text"
                value={data.profileUrl}
                onChange={(e) => onChange({ ...data, profileUrl: e.target.value })}
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
