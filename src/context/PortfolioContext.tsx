"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PROJECTS as INITIAL_PROJECTS, Project } from "@/data/projects";

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

export interface ValueItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

export interface HighlightItem {
  id: string;
  label: string;
  value: string;
}

export interface AboutData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  bioText: string;
  profileImage: string;
  profileBadge: string;
  highlights: HighlightItem[];
  coreTechStack: string[];
  values: ValueItem[];
}

export interface ExperienceItem {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
}

export interface ExperienceData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  subText: string;
  ctaText: string;
  ctaLink: string;
  items: ExperienceItem[];
}

export interface SkillItem {
  id: string;
  num: string;
  title: string;
  desc: string;
}

export interface SkillsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: SkillItem[];
}

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  logoSrc: string;
  isMonochrome?: boolean;
}

export interface ToolsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: ToolItem[];
}

export interface ProcessStep {
  id: string;
  num: string;
  phase: string;
  title: string;
  desc: string;
}

export interface ProcessData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  subText: string;
  items: ProcessStep[];
}

export interface ProjectsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  ctaText: string;
  ctaLink: string;
  items: Project[];
}

export interface MusicData {
  sectionBadge: string;
  title: string;
  artist: string;
  audioUrl: string;
  subText: string;
  enabled: boolean;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface GithubData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  username: string;
  profileUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: FaqItem[];
}

export interface AwardItem {
  id: string;
  title: string;
}

export interface TestimonialItem {
  id: string;
  num: string;
  content: string;
  author: string;
  role: string;
  company: string;
}

export interface TestimonialsData {
  sectionBadge: string;
  titleMain: string;
  titleHighlight: string;
  items: TestimonialItem[];
}

export interface CtaData {
  title: string;
  description: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface PortfolioState {
  hero: HeroData;
  about: AboutData;
  experience: ExperienceData;
  skills: SkillsData;
  tools: ToolsData;
  process: ProcessData;
  projects: ProjectsData;
  music: MusicData;
  stats: StatItem[];
  github: GithubData;
  faq: FaqData;
  awards: AwardItem[];
  testimonials: TestimonialsData;
  cta: CtaData;
}

const DEFAULT_PORTFOLIO_STATE: PortfolioState = {
  hero: {
    bgText: "DEVELOPER",
    prefixText: "Hi there, I’m",
    highlightText: "Geraldine",
    heroImage: "/projects/ger2.png",
    ctaText: "Hire Me",
    ctaLink: "/#contact",
    bottomLeftText: "Specialized in Back-End architecture, RESTful API design, microservices, and database optimization.",
    bottomRightText: "I build fast, scalable, and resilient back-end systems using PHP, Node.js, Golang, and PostgreSQL.",
  },
  about: {
    sectionBadge: "01 // BIOGRAFI & PROFIL",
    titleMain: "Arsitektur Sistem &",
    titleHighlight: "Rekayasa Back-End",
    bioText: "Saya Geraldine Firdaus. Seorang Back-End & Full-Stack Developer yang memfokuskan keahlian pada pembangunan arsitektur API berkinerja tinggi, keamanan data, dan struktur mikroservis yang skalabel.",
    profileImage: "/projects/gerdev.png",
    profileBadge: "GERALDINE FIRDAUS",
    highlights: [
      { id: "h-1", label: "Nama", value: "Geraldine Firdaus" },
      { id: "h-2", label: "Peran Utama", value: "Back-End Developer" },
      { id: "h-3", label: "Spesialisasi", value: "Node.js, Golang & PHP" },
      { id: "h-4", label: "Database", value: "PostgreSQL & MySQL" },
    ],
    coreTechStack: [
      "PHP (Laravel / CodeIgniter)",
      "Node.js (Express / TS)",
      "Golang (Fiber)",
      "Android (Kotlin / Java)",
      "PostgreSQL & MySQL",
    ],
    values: [
      {
        id: "v-1",
        num: "01",
        title: "KECEPATAN & EFISIENSI QUERY",
        desc: "Optimasi query database PostgreSQL/MySQL dan penggunaan caching Redis untuk menjamin latensi serendah mungkin.",
      },
      {
        id: "v-2",
        num: "02",
        title: "ARSITEKTUR SKALABEL",
        desc: "Pengembangan layanan independen dengan pemisahan domain yang bersih menggunakan Node.js dan Golang (Fiber).",
      },
      {
        id: "v-3",
        num: "03",
        title: "KODE TERTATA & BERSIH",
        desc: "Penerapan prinsip Clean Architecture, SOLID, serta pengujian yang ketat untuk pemeliharaan sistem jangka panjang.",
      },
    ],
  },
  experience: {
    sectionBadge: "02 // REKAM JEJAK",
    titleMain: "Pengalaman",
    titleHighlight: "Kerja",
    subText: "Rekam jejak profesional dalam membangun sistem back-end, integrasi payment gateway, dan arsitektur database.",
    ctaText: "HUBUNGI UNTUK KOLABORASI",
    ctaLink: "mailto:geraldinefirdaus99@gmail.com",
    items: [
      {
        id: "exp-1",
        year: "2023 — SEKARANG",
        role: "Senior Back-End Developer",
        company: "Tech Architecture Ltd.",
        description: "Merancang microservices berbasis Golang & Node.js untuk menangani ribuan transaksi per detik dengan uptime 99.9%.",
      },
      {
        id: "exp-2",
        year: "2021 — 2023",
        role: "Full-Stack Developer",
        company: "Digital Enterprise",
        description: "Pengembangan sistem manajemen internal berbasis PHP Laravel, RESTful APIs, dan aplikasi mobile Kotlin.",
      },
    ],
  },
  skills: {
    sectionBadge: "03 // KEAHLIAN & LAYANAN",
    titleMain: "Solusi",
    titleHighlight: "Rekayasa Perangkat Lunak",
    items: [
      {
        id: "s-1",
        num: "01",
        title: "Back-End & Microservices",
        desc: "Merancang API RESTful & gRPC yang aman, scalable, dan cepat berbasis Node.js, Golang, dan Express.",
      },
      {
        id: "s-2",
        num: "02",
        title: "Database Engineering & Caching",
        desc: "Desain skema PostgreSQL & MySQL, indexing, migrasi data, dan integrasi Redis caching.",
      },
      {
        id: "s-3",
        num: "03",
        title: "Full-Stack & Mobile App",
        desc: "Pengembangan antarmuka Next.js & React serta integrasi aplikasi Android native menggunakan Kotlin/Java.",
      },
    ],
  },
  tools: {
    sectionBadge: "04 // PERANGKAT",
    titleMain: "Teknologi &",
    titleHighlight: "Perangkat Utama",
    items: [
      { id: "t-1", name: "Node.js & Express", category: "Back-End Runtime", logoSrc: "/logo/Devicon-html5-plain.svg" },
      { id: "t-2", name: "Golang & Fiber", category: "High Performance Microservices", logoSrc: "/logo/Devicon-css3-plain.svg" },
      { id: "t-3", name: "PHP & Laravel", category: "Enterprise Web Backend", logoSrc: "/logo/React-icon.svg" },
      { id: "t-4", name: "PostgreSQL & MySQL", category: "Relational Database", logoSrc: "/logo/Cib-next-js_(CoreUI_Icons_v1.0.0).svg", isMonochrome: true },
      { id: "t-5", name: "Next.js & TypeScript", category: "Full-Stack Web", logoSrc: "/logo/Tailwind_CSS_Logo.svg" },
      { id: "t-6", name: "Android (Kotlin)", category: "Mobile App Development", logoSrc: "/logo/Typescript_logo_2020.svg" },
    ],
  },
  process: {
    sectionBadge: "05 // PROSES KERJA",
    titleMain: "Langkah",
    titleHighlight: "Eksekusi",
    subText: "Tahapan sistematis dari perancangan skema database hingga deployment layanan ber-performa tinggi.",
    items: [
      { id: "p-1", num: "01", phase: "PHASE 01", title: "Riset & Desain Skema API", desc: "Menganalisis kebutuhan bisnis, mendokumentasikan spesifikasi OpenAPI/Swagger, dan merancang model data." },
      { id: "p-2", num: "02", phase: "PHASE 02", title: "Pengembangan Kode & DB", desc: "Mengimplementasikan logika bisnis dengan arsitektur bersih, query terstruktur, dan validasi keamanan." },
      { id: "p-3", num: "03", phase: "PHASE 03", title: "Pengujian & Optimasi Latensi", desc: "Pengujian otomatis (Unit/Integration testing) serta penyesuaian indeks database dan caching." },
      { id: "p-4", num: "04", phase: "PHASE 04", title: "Deployment & Monitoring", desc: "Kontainerisasi Docker, CI/CD pipeline, dan pemantauan kesehatan server secara real-time." },
    ],
  },
  projects: {
    sectionBadge: "06 // KARYA TERPILIH",
    titleMain: "Rekayasa",
    titleHighlight: "Sistem & Aplikasi",
    ctaText: "LIHAT SEMUA PROYEK",
    ctaLink: "/projects",
    items: INITIAL_PROJECTS,
  },
  music: {
    sectionBadge: "08 // VIBE & MUSIC",
    title: "Walking Back Home",
    artist: "FUR",
    audioUrl: "/audio/FUR - Walking Back Home.mp3",
    subText: "Sembari menjelajahi portofolio, nikmati alunan musik latar ini.",
    enabled: true,
  },
  stats: [
    { id: "st-1", label: "Proyek Selesai", value: 25, suffix: "+" },
    { id: "st-2", label: "Tahun Pengalaman", value: 4, suffix: "+" },
    { id: "st-3", label: "Teknologi Dikuasai", value: 12, suffix: "+" },
  ],
  github: {
    sectionBadge: "OPEN SOURCE & AKTIVITAS",
    titleMain: "Aktivitas &",
    titleHighlight: "Kontribusi GitHub",
    username: "geraldz99",
    profileUrl: "https://github.com/geraldz99",
  },
  faq: {
    sectionBadge: "08 // TANYA JAWAB",
    titleMain: "Pertanyaan",
    titleHighlight: "Populer",
    items: [
      {
        id: "f-1",
        question: "Teknologi (tech stack) utama apa yang Anda gunakan?",
        answer: "Saya berfokus pada Node.js (Express/TypeScript), Golang (Fiber), PHP (Laravel/CodeIgniter), PostgreSQL, MySQL, serta Android (Kotlin).",
      },
      {
        id: "f-2",
        question: "Apakah Anda juga melayani pembuatan aplikasi Full-Stack?",
        answer: "Ya, selain Back-End saya juga dapat membangun antarmuka web modern dengan Next.js / React dan styling Tailwind CSS.",
      },
    ],
  },
  awards: [
    { id: "aw-1", title: "BACK-END ARCHITECTURE EXCELLENCE" },
    { id: "aw-2", title: "HIGH PERFORMANCE MICROSERVICES" },
    { id: "aw-3", title: "NODE.JS & GOLANG SPECIALIST" },
  ],
  testimonials: {
    sectionBadge: "09 // TESTIMONI",
    titleMain: "Kritik &",
    titleHighlight: "Apresiasi",
    items: [
      {
        id: "ts-1",
        num: "01",
        content: "Geraldine menghadirkan arsitektur API yang sangat stabil, tangguh terhadap lonjakan beban, dan mudah diintegrasikan.",
        author: "Tech Lead",
        role: "CTO",
        company: "Enterprise Platform",
      },
    ],
  },
  cta: {
    title: "Hubungi Saya",
    description: "Tertarik berkolaborasi atau memiliki pertanyaan seputar rekayasa sistem back-end & aplikasi? Mari terhubung melalui email atau platform berikut.",
    email: "geraldinefirdaus99@gmail.com",
    linkedinUrl: "https://linkedin.com",
    githubUrl: "https://github.com/geraldz99",
  },
};

interface PortfolioContextType {
  state: PortfolioState;
  updateSection: <K extends keyof PortfolioState>(key: K, data: PortfolioState[K]) => void;
  resetAll: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "porto_geraldine_data_v1";

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PortfolioState>(DEFAULT_PORTFOLIO_STATE);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Fallback ke default state jika terjadi kesalahan parsing
    } finally {
      setInitialized(true);
    }
  }, []);

  const updateSection = <K extends keyof PortfolioState>(key: K, data: PortfolioState[K]) => {
    setState((prev) => {
      const updated = { ...prev, [key]: data };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Handle quota storage
      }
      return updated;
    });
  };

  const resetAll = () => {
    setState(DEFAULT_PORTFOLIO_STATE);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // Handle quota storage
    }
  };

  if (!initialized) {
    return (
      <PortfolioContext.Provider value={{ state, updateSection, resetAll }}>
        {children}
      </PortfolioContext.Provider>
    );
  }

  return (
    <PortfolioContext.Provider value={{ state, updateSection, resetAll }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
