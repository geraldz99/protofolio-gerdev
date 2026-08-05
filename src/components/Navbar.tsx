"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { num: "01", name: "Home", href: "/#home" },
  { num: "02", name: "About", href: "/#about" },
  { num: "03", name: "Projects", href: "/projects" },
  { num: "04", name: "Experience", href: "/#experience" },
  { num: "05", name: "Skills", href: "/#skills" },
  { num: "06", name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(".menu-overlay", {
        clipPath: "circle(150% at 90% 5%)",
        duration: 1,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        ".menu-link-item",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, delay: 0.3, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(".menu-overlay", {
        clipPath: "circle(0% at 90% 5%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Top Navbar Container matching edh.dev */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 pt-4 pointer-events-none">
        <nav className="max-w-5xl mx-auto w-full rounded-full border border-[#2b211b]/20 bg-[#ebd0b5]/90 backdrop-blur-md px-4 md:px-6 py-2.5 shadow-md flex items-center justify-between pointer-events-auto">
          {/* Left: Brand Logo Badge */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#2b211b] text-[#f6d4b1] flex items-center justify-center font-mono font-bold text-xs shadow-inner group-hover:bg-[#c85628] transition-colors">
              GF
            </div>
            <span className="font-mono text-xs font-bold text-[#2b211b] tracking-wider uppercase hidden sm:inline-block">
              GERALDINE.DEV
            </span>
          </Link>

          {/* Center: Desktop Quick Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-bold uppercase text-[#2b211b]">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#c85628] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#c85628] hover:after:w-full after:transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Quick Social Buttons & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/geraldz99"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-[#2b211b]/20 bg-[#f6d4b1] text-[#2b211b] hover:bg-[#2b211b] hover:text-[#f6d4b1] transition-all hidden sm:flex"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2b211b]/30 bg-[#2b211b] text-[#f6d4b1] hover:bg-[#c85628] hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
              aria-label="Toggle Menu"
            >
              <div className="flex flex-col gap-1 w-3.5">
                <div className={`h-0.5 bg-current transition-all ${isOpen ? "rotate-45 translate-y-1" : ""}`} />
                <div className={`h-0.5 bg-current transition-all ${isOpen ? "-rotate-45 -translate-y-0.5" : ""}`} />
              </div>
              <span>{isOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Retro Circle Overlay Menu */}
      <div
        className="menu-overlay fixed inset-0 z-40 bg-[#f6d4b1] flex flex-col justify-between p-8 md:p-16 pointer-events-auto"
        style={{ clipPath: "circle(0% at 90% 5%)" }}
      >
        <div className="pt-20 max-w-4xl mx-auto w-full flex flex-col space-y-8">
          <div className="flex items-center justify-between border-b border-[#2b211b]/20 pb-4">
            <span className="text-xs uppercase tracking-[0.4em] font-mono font-bold text-[#c85628]">
              NAVIGASI PORTOFOLIO
            </span>
            <span className="font-mono text-xs font-bold text-[#2b211b]/60 uppercase">
              EDH.DEV STYLE
            </span>
          </div>

          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="menu-link-item overflow-hidden">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-baseline gap-4 text-4xl md:text-7xl font-bold font-serif text-[#2b211b] hover:text-[#c85628] hover:translate-x-4 transition-all duration-300 tracking-tight"
                >
                  <span className="font-mono text-xs font-bold text-[#c85628] group-hover:text-[#2b211b] transition-colors">
                    {link.num} //
                  </span>
                  <span>{link.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info inside menu */}
        <div className="max-w-4xl mx-auto w-full border-t border-[#2b211b]/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#2b211b]/80">
          <p>© 2026 Geraldine Firdaus. Back-End Developer.</p>
          <div className="flex items-center gap-6 font-bold">
            <a href="https://github.com/geraldz99" target="_blank" rel="noreferrer" className="hover:text-[#c85628] inline-flex items-center gap-1">
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#c85628] inline-flex items-center gap-1">
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
            <a href="mailto:robihardinata25@gmail.com" className="hover:text-[#c85628] inline-flex items-center gap-1">
              <span>Email</span>
              <Mail size={12} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
