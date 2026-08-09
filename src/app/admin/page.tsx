"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Sparkles,
  User,
  Briefcase,
  Wrench,
  Cpu,
  GitBranch,
  FolderKanban,
  Music,
  BarChart3,
  Github,
  HelpCircle,
  Award,
  MessageSquareQuote,
  Mail,
  ExternalLink,
  Save,
  CheckCircle2,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { usePortfolio, PortfolioState } from "@/context/PortfolioContext";

// Modular Section Editor Components
import OverviewEditor from "@/components/admin/OverviewEditor";
import HeroEditor from "@/components/admin/HeroEditor";
import AboutEditor from "@/components/admin/AboutEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import SkillsEditor from "@/components/admin/SkillsEditor";
import ToolsEditor from "@/components/admin/ToolsEditor";
import ProcessEditor from "@/components/admin/ProcessEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import MusicEditor from "@/components/admin/MusicEditor";
import StatsEditor from "@/components/admin/StatsEditor";
import GithubEditor from "@/components/admin/GithubEditor";
import FaqEditor from "@/components/admin/FaqEditor";
import AwardsEditor from "@/components/admin/AwardsEditor";
import TestimonialsEditor from "@/components/admin/TestimonialsEditor";
import CtaEditor from "@/components/admin/CtaEditor";

type SectionTab =
  | "overview"
  | "hero"
  | "about"
  | "experience"
  | "skills"
  | "tools"
  | "process"
  | "projects"
  | "music"
  | "stats"
  | "github"
  | "faq"
  | "awards"
  | "testimonials"
  | "cta";

export default function AdminDashboardPage() {
  const { state, saveFullState } = usePortfolio();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/login");
  };

  const [activeTab, setActiveTab] = useState<SectionTab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // SECTION STATES (Synchronized with PortfolioContext)
  const [heroData, setHeroData] = useState(state.hero);
  const [aboutData, setAboutData] = useState(state.about);
  const [experienceData, setExperienceData] = useState(state.experience);
  const [skillsData, setSkillsData] = useState(state.skills);
  const [toolsData, setToolsData] = useState(state.tools);
  const [processData, setProcessData] = useState(state.process);
  const [projectsData, setProjectsData] = useState(state.projects);
  const [musicData, setMusicData] = useState(state.music);
  const [statsData, setStatsData] = useState(state.stats);
  const [githubData, setGithubData] = useState(state.github);
  const [faqData, setFaqData] = useState(state.faq);
  const [awards, setAwards] = useState(state.awards);
  const [testimonialsData, setTestimonialsData] = useState(state.testimonials);
  const [ctaData, setCtaData] = useState(state.cta);

  // Keep local editor state in sync when context initializes or changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroData(state.hero);
    setAboutData(state.about);
    setExperienceData(state.experience);
    setSkillsData(state.skills);
    setToolsData(state.tools);
    setProcessData(state.process);
    setProjectsData(state.projects);
    setMusicData(state.music);
    setStatsData(state.stats);
    setGithubData(state.github);
    setFaqData(state.faq);
    setAwards(state.awards);
    setTestimonialsData(state.testimonials);
    setCtaData(state.cta);
  }, [state]);

  const triggerSave = async () => {
    setIsSaving(true);
    setSaveError(null);

    const fullState: PortfolioState = {
      hero: heroData,
      about: aboutData,
      experience: experienceData,
      skills: skillsData,
      tools: toolsData,
      process: processData,
      projects: projectsData,
      music: musicData,
      stats: statsData,
      github: githubData,
      faq: faqData,
      awards: awards,
      testimonials: testimonialsData,
      cta: ctaData,
    };

    try {
      await saveFullState(fullState);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err?.message || "Gagal menyimpan ke Supabase";
      setSaveError(msg);
      console.error("Supabase Save Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const navMenuItems = [
    { id: "overview" as SectionTab, label: "Overview Dashboard", icon: LayoutDashboard },
    { id: "hero" as SectionTab, label: "01 / Hero Sequence", icon: Sparkles },
    { id: "about" as SectionTab, label: "02 / About (Profil)", icon: User },
    { id: "experience" as SectionTab, label: "03 / Rekam Jejak", icon: Briefcase },
    { id: "skills" as SectionTab, label: "04 / Keahlian & Layanan", icon: Wrench },
    { id: "tools" as SectionTab, label: "05 / Tools & Perangkat", icon: Cpu },
    { id: "process" as SectionTab, label: "06 / Proses Kerja", icon: GitBranch },
    { id: "projects" as SectionTab, label: "07 / Portofolio Proyek", icon: FolderKanban },
    { id: "music" as SectionTab, label: "08 / Music Player", icon: Music },
    { id: "stats" as SectionTab, label: "09 / Statistik", icon: BarChart3 },
    { id: "github" as SectionTab, label: "10 / GitHub Kontribusi", icon: Github },
    { id: "faq" as SectionTab, label: "11 / Tanya Jawab (FAQ)", icon: HelpCircle },
    { id: "awards" as SectionTab, label: "12 / Marquee Teks", icon: Award },
    { id: "testimonials" as SectionTab, label: "13 / Testimoni Klien", icon: MessageSquareQuote },
    { id: "cta" as SectionTab, label: "14 / Hubungi Saya (Kontak)", icon: Mail },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6d4b1] text-[#2b211b] selection:bg-[#2b211b] selection:text-[#f6d4b1]">
      {/* Save Toast Notification */}
      {saveToast && (
        <div className="fixed top-6 right-6 z-50 bg-[#c85628] text-[#f6d4b1] px-5 py-3 rounded-2xl font-mono text-xs font-bold flex items-center gap-2 shadow-xl border border-[#2b211b]/20 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={18} />
          <span>Seluruh Konten Berhasil Disimpan & Sinkron!</span>
        </div>
      )}

      {/* Save Error Toast Notification */}
      {saveError && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded-2xl font-mono text-xs font-bold flex items-center justify-between gap-4 shadow-xl border border-red-800 animate-in fade-in slide-in-from-top-4 max-w-md">
          <span>⚠️ {saveError}</span>
          <button onClick={() => setSaveError(null)} className="underline text-xs">
            Tutup
          </button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#ebd0b5] border-r border-[#2b211b]/20 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-[#2b211b]/20 flex items-center justify-between shrink-0">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#c85628]">
              PANEL ADMIN DINAMIS
            </span>
            <h2 className="text-base font-bold text-[#2b211b] font-mono tracking-tight">
              GERALDINE FIRDAUS
            </h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#2b211b]/60 hover:text-[#2b211b]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Section Navigation Links */}
        <nav data-lenis-prevent className="flex-1 overflow-y-auto p-4 space-y-1 [scrollbar-width:none]">
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-widest text-[#2b211b]/50">
            SEKSI LANDING PAGE (13 SEKSI)
          </div>
          {navMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#c85628] text-[#f6d4b1] font-bold shadow-md"
                    : "text-[#2b211b]/80 hover:text-[#c85628] hover:bg-[#f6d4b1]/60"
                }`}
              >
                <Icon size={15} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Bottom Footer */}
        <div className="p-4 border-t border-[#2b211b]/20 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#f6d4b1] hover:bg-[#f6d4b1]/80 border border-[#2b211b]/20 rounded-xl text-xs font-mono text-[#2b211b] font-bold transition-colors"
          >
            <span>Lihat Website</span>
            <ExternalLink size={14} />
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-mono text-red-600 hover:bg-red-500/10 rounded-xl font-bold transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-[#2b211b]/20 bg-[#ebd0b5] px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#2b211b]/70 hover:text-[#2b211b] p-1"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-sm font-bold font-mono text-[#2b211b] tracking-tight uppercase">
              SEKSI // {navMenuItems.find((m) => m.id === activeTab)?.label}
            </h1>
          </div>

          <button
            onClick={triggerSave}
            disabled={isSaving}
            className="px-5 py-2 bg-[#c85628] text-[#f6d4b1] rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#a8441c] active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save size={15} />
            <span>{isSaving ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </header>

        {/* Dynamic Modular Section Canvas */}
        <main data-lenis-prevent className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          {activeTab === "overview" && (
            <OverviewEditor items={navMenuItems.slice(1)} onSelectTab={(tab) => setActiveTab(tab as SectionTab)} />
          )}

          {activeTab === "hero" && (
            <HeroEditor data={heroData} onChange={(data) => setHeroData(data)} />
          )}

          {activeTab === "about" && (
            <AboutEditor data={aboutData} onChange={(data) => setAboutData(data)} />
          )}

          {activeTab === "experience" && (
            <ExperienceEditor data={experienceData} onChange={(data) => setExperienceData(data)} />
          )}

          {activeTab === "skills" && (
            <SkillsEditor data={skillsData} onChange={(data) => setSkillsData(data)} />
          )}

          {activeTab === "tools" && (
            <ToolsEditor data={toolsData} onChange={(data) => setToolsData(data)} />
          )}

          {activeTab === "process" && (
            <ProcessEditor data={processData} onChange={(data) => setProcessData(data)} />
          )}

          {activeTab === "projects" && (
            <ProjectsEditor data={projectsData} onChange={(data) => setProjectsData(data)} />
          )}

          {activeTab === "music" && (
            <MusicEditor data={musicData} onChange={(data) => setMusicData(data)} />
          )}

          {activeTab === "stats" && (
            <StatsEditor items={statsData} onChange={(items) => setStatsData(items)} />
          )}

          {activeTab === "github" && (
            <GithubEditor data={githubData} onChange={(data) => setGithubData(data)} />
          )}

          {activeTab === "faq" && (
            <FaqEditor data={faqData} onChange={(data) => setFaqData(data)} />
          )}

          {activeTab === "awards" && (
            <AwardsEditor items={awards} onChange={(items) => setAwards(items)} />
          )}

          {activeTab === "testimonials" && (
            <TestimonialsEditor data={testimonialsData} onChange={(data) => setTestimonialsData(data)} />
          )}

          {activeTab === "cta" && (
            <CtaEditor data={ctaData} onChange={(data) => setCtaData(data)} />
          )}
        </main>
      </div>
    </div>
  );
}
