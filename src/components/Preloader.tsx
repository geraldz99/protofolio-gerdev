"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  "Halo",
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "Guten Tag",
  "Geraldine.",
];

export default function Preloader() {
  const [currentText, setCurrentText] = useState(GREETINGS[0]);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < GREETINGS.length) {
        setCurrentText(GREETINGS[index]);
      } else {
        clearInterval(interval);
        gsap.to(".preloader-bg", {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          onComplete: () => setComplete(true),
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (complete) return null;

  return (
    <div className="preloader-bg fixed inset-0 z-[9999] flex items-center justify-center bg-[#f6d4b1]">
      <div className="overflow-hidden">
        <span className="block text-3xl md:text-6xl font-black font-mono tracking-wider text-[#2b211b] drop-shadow-[0_0_20px_rgba(200,86,40,0.3)] uppercase text-center">
          {currentText}
        </span>
      </div>
    </div>
  );
}

