"use client";
import { useState, useRef } from "react";
import { Power } from "lucide-react";

export function AudioIgnition({ engineName = "V12" }: { engineName?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startIgnition = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    if(audioRef.current) {
        audioRef.current.volume = 0.6; // Not too loud
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio block:", e));
    }
    
    setTimeout(() => {
      setIsPlaying(false);
    }, 4500); // Wait for rev sequence to finish
  };

  return (
    <>
      <audio ref={audioRef} preload="auto" src="/freesound_community-car-engine-revving-94831.mp3" />
      <button 
        onClick={startIgnition}
        className={`flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 border ${
          isPlaying 
            ? "bg-apple-blue border-apple-blue text-white shadow-[0_0_25px_rgba(0,113,227,0.5)] scale-102" 
            : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:scale-105"
        }`}
      >
        <Power size={14} className={isPlaying ? "text-white animate-pulse" : "text-apple-blue"} />
        {isPlaying ? `${engineName} IGNITED` : `IGNITE ${engineName}`}
      </button>
    </>
  );
}
