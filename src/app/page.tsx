import dynamic from "next/dynamic";
import SequenceScroll from "@/components/Hero/SequenceScroll";
import About from "@/components/About";
import Projects from "@/components/Projects";

const ExperienceTimeline = dynamic(() => import("@/components/ExperienceTimeline"));
const Skills = dynamic(() => import("@/components/Skills"));
const ToolsSlider = dynamic(() => import("@/components/ToolsSlider"));
const WorkProcess = dynamic(() => import("@/components/WorkProcess"));
const GitHubContributions = dynamic(() => import("@/components/GitHubContributions"));
const MusicPlayer = dynamic(() => import("@/components/MusicPlayer"));
const Stats = dynamic(() => import("@/components/Stats"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const CTA = dynamic(() => import("@/components/CTA"));

export default function Home() {
  return (
    <main className="relative pb-12">
      <SequenceScroll />
      <About />
      <Projects />
      <ExperienceTimeline />
      <Skills />
      <ToolsSlider />
      <WorkProcess />
      <GitHubContributions />
      <MusicPlayer />
      <Stats />
      <FAQ />
      <Testimonials />
      <CTA />
    </main>
  );
}
