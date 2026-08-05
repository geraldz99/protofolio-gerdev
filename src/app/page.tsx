"use client";

import SequenceScroll from "@/components/Hero/SequenceScroll";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Skills from "@/components/Skills";
import ToolsSlider from "@/components/ToolsSlider";
import WorkProcess from "@/components/WorkProcess";
import GitHubContributions from "@/components/GitHubContributions";
import MusicPlayer from "@/components/MusicPlayer";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

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
