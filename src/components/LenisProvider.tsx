"use client";

import { ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable Lenis on mobile devices for native 60fps touch scrolling and low TBT
    if (typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  // Handle hash on route change
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && lenisRef.current) {
        // Stage 1: Immediate attempt
        const jump = () => {
          ScrollTrigger.refresh();
          const el = document.querySelector(hash);
          if (el) {
            lenisRef.current?.scrollTo(el as HTMLElement, {
              offset: -20,
              immediate: true
            });
          }
        };

        // Stage 2: Final settling attempt (after GSAP/Animations are likely done)
        const settle = () => {
          ScrollTrigger.refresh();
          const el = document.querySelector(hash);
          if (el) {
            lenisRef.current?.scrollTo(el as HTMLElement, {
              offset: -20,
              duration: 0.5,
              immediate: false // Smooth adjust for the final few pixels if needed
            });
          }
        };

        setTimeout(jump, 100);
        setTimeout(settle, 800); // Wait for Preloader & GSAP Pinning to stabilize
      } else {
        lenisRef.current?.scrollTo(0, { immediate: true });
      }
    };

    handleHash();
  }, [pathname]);

  return <>{children}</>;
}
