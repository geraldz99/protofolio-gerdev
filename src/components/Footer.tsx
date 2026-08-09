"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-6 max-w-4xl mx-auto text-[var(--text-muted)] text-xs font-mono text-center space-y-2">
      <hr className="border-[var(--border-subtle)] mb-8" />
      <div>Developed + Designed for Geraldine Firdaus.</div>
      <div>Built with PHP, Node.js, Golang, Android & Next.js.</div>
      <div>
        Specialized in Back-End Architecture, Microservices & Full-Stack Solutions.
      </div>
      <div className="pt-3 text-[var(--text-dim)] flex items-center justify-center gap-3 flex-wrap">
        <span>COPYRIGHT © 2022-2026 Geraldine Firdaus. All rights reserved.</span>
        <span>•</span>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-bold transition-all shadow-sm"
        >
          <Lock size={12} />
          <span>Panel Admin</span>
        </Link>
      </div>
    </footer>
  );
}
