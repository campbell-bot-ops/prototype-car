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
        className={`flex items-center gap-3 backdrop-blur-md px-6 py-3 rounded-full border transition-all font-light tracking-widest text-xs uppercase ${
          isPlaying 
            ? 'border-apple-blue bg-apple-blue text-white shadow-[0_0_50px_rgba(41,151,255,0.8)] animate-pulse' 
            : 'border-white/20 bg-black/40 text-white hover:border-white/50 hover:bg-white/10'
        }`}
      >
        <Power size={18} className={isPlaying ? "text-white" : "text-apple-blue"} />
        {isPlaying ? `${engineName} IGNITED` : `IGNITE ${engineName}`}
      </button>
    </>
  );
}
