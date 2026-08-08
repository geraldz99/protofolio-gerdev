"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Pause, Play, Volume2, VolumeX, Youtube } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function MusicPlayer() {
  const { state } = usePortfolio();
  const { music } = state;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const youtubeId = getYouTubeId(music.audioUrl || "");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const discRef = useRef<HTMLDivElement>(null);

  // Handle vinyl rotation animation
  useEffect(() => {
    const discTween = gsap.to(discRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
      paused: true,
    });

    if (isPlaying) {
      discTween.resume();
    } else {
      discTween.pause();
    }

    return () => {
      discTween.kill();
    };
  }, [isPlaying]);

  // Handle standard HTML5 audio setup when not using YouTube
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsPlaying(false);

    if (!youtubeId && music.audioUrl) {
      const audioSrc = music.audioUrl;
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    }
  }, [music.audioUrl, youtubeId]);

  const togglePlay = () => {
    if (youtubeId) {
      if (isPlaying) {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: "" }),
          "*"
        );
        setIsPlaying(false);
      } else {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: "" }),
          "*"
        );
        setIsPlaying(true);
      }
    } else {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (youtubeId) {
      if (isMuted) {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "unMute", args: "" }),
          "*"
        );
        setIsMuted(false);
      } else {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: "" }),
          "*"
        );
        setIsMuted(true);
      }
    } else {
      if (!audioRef.current) return;
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="music" className="py-12 px-6 max-w-4xl mx-auto text-[#2b211b]">
      <hr className="border-[#2b211b]/20 mb-8" />

      {/* Hidden YouTube Iframe Player if audioUrl is a YouTube URL */}
      {youtubeId && (
        <iframe
          ref={iframeRef}
          className="hidden"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&controls=0`}
          allow="autoplay"
          title="YouTube Music Player"
        />
      )}

      <div className="p-6 md:p-8 rounded-3xl bg-[#ebd0b5]/80 border border-[#2b211b]/20 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info & Controls */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Vinyl Record Icon */}
          <div
            ref={discRef}
            className="w-14 h-14 rounded-full bg-[#2b211b] border-2 border-[#c85628] flex items-center justify-center shrink-0 shadow-md relative"
          >
            <div className="w-4 h-4 rounded-full bg-[#f6d4b1] border border-[#2b211b]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-[#c85628] uppercase tracking-widest block">
                {music.sectionBadge || "08 // VIBE & MUSIC"}
              </span>
              {youtubeId && (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#c85628]/10 text-[#c85628] border border-[#c85628]/30">
                  <Youtube size={10} /> YouTube
                </span>
              )}
            </div>
            <h3 className="text-base md:text-lg font-bold font-serif text-[#2b211b] truncate">
              {music.title || "Walking Back Home"}
            </h3>
            <p className="text-xs font-mono text-[#2b211b]/60 truncate">
              {music.artist || "FUR"}
            </p>
          </div>
        </div>

        {/* Audio Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-[#c85628] text-[#f6d4b1] hover:bg-[#a8441c] transition-colors flex items-center justify-center shadow-md cursor-pointer"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </button>
          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-full bg-[#f6d4b1] border border-[#2b211b]/20 text-[#2b211b] hover:bg-[#ebd0b5] transition-colors flex items-center justify-center cursor-pointer"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
}
