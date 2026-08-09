"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowUpRight, Lock } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { usePortfolio } from "@/context/PortfolioContext";

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
  const { state } = usePortfolio();
  const brand = state.brand || { logoText: "GF", brandName: "GERALDINE.DEV", logoImage: "/projects/logo-new.svg" };

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
      {/* Floating Top Navbar Container */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 pt-4 pointer-events-none">
        <nav className="max-w-5xl mx-auto w-full rounded-full border border-[var(--border-strong)] bg-[var(--bg-card)]/90 backdrop-blur-md px-4 md:px-6 py-2.5 shadow-md flex items-center justify-between pointer-events-auto transition-colors duration-300">
          {/* Left: Brand Logo Badge */}
          <Link href="/" className="flex items-center gap-2 group">
            {brand.logoImage ? (
              <div className="w-8 h-8 rounded-full overflow-hidden relative border border-[var(--border-strong)] bg-[var(--bg-main)] shrink-0 flex items-center justify-center">
                <Image
                  src={brand.logoImage}
                  alt={brand.brandName || "Logo"}
                  width={32}
                  height={32}
                  className="object-contain w-full h-full p-1"
                  unoptimized={typeof brand.logoImage === "string" && brand.logoImage.startsWith("http")}
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[var(--text-main)] text-[var(--bg-main)] flex items-center justify-center font-mono font-bold text-xs shadow-inner group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                {brand.logoText || "GF"}
              </div>
            )}
            <span className="font-mono text-xs font-bold text-[var(--text-main)] tracking-wider uppercase hidden sm:inline-block">
              {brand.brandName || "GERALDINE.DEV"}
            </span>
          </Link>

          {/* Center: Desktop Quick Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-bold uppercase text-[var(--text-main)]">
            {NAV_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[var(--accent)] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--accent)] hover:after:w-full after:transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: Quick Social Buttons, Theme Toggle & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href="https://github.com/geraldz99"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-main)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-main)] transition-all hidden sm:flex"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--text-main)] text-[var(--bg-main)] hover:bg-[var(--accent)] hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm"
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
        className="menu-overlay fixed inset-0 z-40 bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col justify-between p-8 md:p-16 pointer-events-auto transition-colors duration-300"
        style={{ clipPath: "circle(0% at 90% 5%)" }}
      >
        <div className="pt-20 max-w-4xl mx-auto w-full flex flex-col space-y-8">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <span className="text-xs uppercase tracking-[0.4em] font-mono font-bold text-[var(--accent)]">
              NAVIGASI PORTOFOLIO
            </span>
            <div className="flex items-center gap-4">
              <ThemeToggle showLabel />
              <span className="font-mono text-xs font-bold text-[var(--text-muted)] uppercase hidden sm:inline">
                {brand.brandName || "GERALDINE.DEV"}
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <div key={link.name} className="menu-link-item overflow-hidden">
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-baseline gap-4 text-4xl md:text-7xl font-bold font-serif text-[var(--text-main)] hover:text-[var(--accent)] hover:translate-x-4 transition-all duration-300 tracking-tight"
                >
                  <span className="font-mono text-xs font-bold text-[var(--accent)] group-hover:text-[var(--text-main)] transition-colors">
                    {link.num}
                  </span>
                  <span>{link.name}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info inside menu */}
        <div className="max-w-4xl mx-auto w-full border-t border-[var(--border-subtle)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-4">
            <p>© 2026 Geraldine Firdaus. Back-End Developer.</p>
            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-strong)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-bold transition-all shadow-sm"
            >
              <Lock size={12} />
              <span>Panel Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-6 font-bold">
            <a href="https://github.com/geraldz99" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] inline-flex items-center gap-1">
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[var(--accent)] inline-flex items-center gap-1">
              <span>LinkedIn</span>
              <ArrowUpRight size={12} />
            </a>
            <a href="mailto:robihardinata25@gmail.com" className="hover:text-[var(--accent)] inline-flex items-center gap-1">
              <span>Email</span>
              <Mail size={12} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
