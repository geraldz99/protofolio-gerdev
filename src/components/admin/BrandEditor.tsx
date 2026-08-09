"use client";

import Image from "next/image";
import { BrandData } from "@/context/PortfolioContext";

interface BrandEditorProps {
  data: BrandData;
  onChange: (data: BrandData) => void;
}

export default function BrandEditor({ data, onChange }: BrandEditorProps) {
  const currentBrand = data || {
    logoText: "GF",
    brandName: "GERALDINE.DEV",
    logoImage: "/projects/logo-new.svg",
    faviconUrl: "/projects/logo-new.svg",
  };

  const activeFavicon = currentBrand.faviconUrl || currentBrand.logoImage || "/projects/logo-new.svg";

  return (
    <div className="w-full space-y-6 relative">
      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5] border border-[#2b211b]/20 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
          <h3 className="text-base font-bold text-[#2b211b] font-mono uppercase">
            00 / Logo, Icon Bar (Favicon) & Branding Navbar
          </h3>
          <span className="text-xs font-mono text-[#c85628] font-bold">Form Identitas Brand & Tab Icon</span>
        </div>

        <div className="space-y-5">
          {/* Live Preview Grid: Navbar & Tab Browser Favicon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Preview Navbar */}
            <div className="p-4 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c85628] block">
                PREVIEW BRAND NAVBAR:
              </span>
              <div className="flex items-center gap-3 p-2.5 rounded-full bg-[#ebd0b5] border border-[#2b211b]/20 w-fit">
                {currentBrand.logoImage ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[#2b211b]/30 bg-[#f6d4b1] shrink-0 flex items-center justify-center">
                    <Image
                      src={currentBrand.logoImage}
                      alt="Brand Logo"
                      width={32}
                      height={32}
                      className="object-contain w-full h-full p-1"
                      unoptimized={typeof currentBrand.logoImage === "string" && currentBrand.logoImage.startsWith("http")}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#2b211b] text-[#f6d4b1] flex items-center justify-center font-mono font-bold text-xs">
                    {currentBrand.logoText || "GF"}
                  </div>
                )}
                <span className="font-mono text-xs font-bold text-[#2b211b] tracking-wider uppercase pr-2">
                  {currentBrand.brandName || "GERALDINE.DEV"}
                </span>
              </div>
            </div>

            {/* Preview Browser Tab (Icon Bar) */}
            <div className="p-4 rounded-2xl bg-[#f6d4b1] border border-[#2b211b]/20 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#c85628] block">
                PREVIEW ICON BAR (TAB BROWSER):
              </span>
              <div className="flex items-center gap-2 p-2 rounded-t-xl bg-[#2b211b] text-[#f6d4b1] w-fit max-w-xs border border-[#2b211b]">
                <div className="w-4 h-4 relative shrink-0">
                  <Image
                    src={activeFavicon}
                    alt="Favicon Tab"
                    width={16}
                    height={16}
                    className="object-contain w-full h-full"
                    unoptimized={typeof activeFavicon === "string" && activeFavicon.startsWith("http")}
                  />
                </div>
                <span className="font-mono text-[11px] font-bold truncate">
                  {currentBrand.brandName || "Geraldine.dev"}
                </span>
                <span className="text-[10px] opacity-60 ml-auto pl-2">×</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Inisial Badge Logo */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Inisial Logo / Text Badge (Jika Tanpa Gambar)
              </label>
              <input
                type="text"
                value={currentBrand.logoText}
                onChange={(e) => onChange({ ...currentBrand, logoText: e.target.value })}
                placeholder="e.g. GF"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold focus:outline-none focus:border-[#c85628]"
              />
            </div>

            {/* Nama Brand Navbar */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
                Nama Brand / Teks Navbar Header
              </label>
              <input
                type="text"
                value={currentBrand.brandName}
                onChange={(e) => onChange({ ...currentBrand, brandName: e.target.value })}
                placeholder="e.g. GERALDINE.DEV"
                className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628] font-bold"
              />
            </div>
          </div>

          {/* URL Gambar Logo Navbar */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              URL Gambar Logo Header Navbar (Opsional)
            </label>
            <input
              type="text"
              value={currentBrand.logoImage || ""}
              onChange={(e) => onChange({ ...currentBrand, logoImage: e.target.value })}
              placeholder="e.g. /projects/logo-new.svg atau https://domain.com/logo.png"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
            />
          </div>

          {/* URL Favicon / Icon Bar Tab Browser */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-[#2b211b]/80 font-semibold block">
              URL Favicon / Icon Bar (Ikon Tab Browser)
            </label>
            <input
              type="text"
              value={currentBrand.faviconUrl || ""}
              onChange={(e) => onChange({ ...currentBrand, faviconUrl: e.target.value })}
              placeholder="e.g. /projects/logo-new.svg atau URL gambar icon baru (Kosongkan jika samakan dengan Logo Navbar)"
              className="w-full px-4 py-3 bg-[#f6d4b1] border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#c85628] font-bold placeholder-[#2b211b]/40 focus:outline-none focus:border-[#c85628]"
            />
            <p className="text-[11px] font-mono text-[#2b211b]/60">
              *Icon bar (favicon) di atas tab browser pengguna akan otomatis berganti mengikuti URL ikon ini secara real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
