import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Portofolio Geraldine Firdaus",
  description: "Panel Kontrol Manajemen Konten Portofolio & Landing Page",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6d4b1] text-[#2b211b] selection:bg-[#2b211b] selection:text-[#f6d4b1]">
      {children}
    </div>
  );
}
