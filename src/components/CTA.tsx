"use client";

import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function CTA() {
  const { state } = usePortfolio();
  const { cta } = state;

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-[var(--text-main)] text-center"
    >
      <hr className="border-[var(--border-subtle)] mb-8" />

      <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[var(--text-main)] mb-6">
        {cta.title || "Hubungi Saya"}
      </h1>

      <p className="text-base md:text-xl text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed font-medium mb-8">
        {cta.description || "Interested in working together or have a question? Reach out via email or connect on social platforms below."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={`mailto:${cta.email || "geraldinefirdaus99@gmail.com"}`}
          className="px-6 py-3.5 rounded-full bg-[var(--accent)] text-white hover:opacity-90 font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md"
        >
          <Mail size={16} />
          <span>Email Me</span>
          <ArrowUpRight size={16} />
        </a>

        {cta.linkedinUrl && (
          <a
            href={cta.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
        )}

        {cta.githubUrl && (
          <a
            href={cta.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </section>
  );
}
