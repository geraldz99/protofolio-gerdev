"use client";

import { ArrowUpRight, Mail, Linkedin, Github } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function CTA() {
  const { state } = usePortfolio();
  const { cta } = state;

  return (
    <section
      id="contact"
      className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-[#2b211b] text-center"
    >
      <hr className="border-[#2b211b]/20 mb-8" />

      <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-tight text-[#2b211b] mb-6">
        {cta.title || "Hubungi Saya"}
      </h1>

      <p className="text-base md:text-xl text-[#2b211b]/80 max-w-xl mx-auto leading-relaxed font-medium mb-8">
        {cta.description || "Interested in working together or have a question? Reach out via email or connect on social platforms below."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={`mailto:${cta.email || "geraldinefirdaus99@gmail.com"}`}
          className="px-6 py-3.5 rounded-full bg-[#2b211b] text-[#f6d4b1] hover:bg-[#c85628] hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md"
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
            className="px-6 py-3.5 rounded-full border border-[#2b211b]/30 bg-[#ebd0b5]/90 text-[#2b211b] hover:bg-[#2b211b] hover:text-[#f6d4b1] font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
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
            className="px-6 py-3.5 rounded-full border border-[#2b211b]/30 bg-[#ebd0b5]/90 text-[#2b211b] hover:bg-[#2b211b] hover:text-[#f6d4b1] font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-sm"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </section>
  );
}
