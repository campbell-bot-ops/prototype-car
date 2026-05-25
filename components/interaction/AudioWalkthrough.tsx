"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioWalkthroughProps {
  year: number;
  make: string;
  model: string;
  engine: string;
  transmission: string;
  condition: string;
  keyFeatures: string[];
}

export function AudioWalkthrough({
  year,
  make,
  model,
  engine,
  transmission,
  condition,
  keyFeatures
}: AudioWalkthroughProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const startWalkthrough = () => {
    if (!synthRef.current) return;

    // Mute any ongoing audio synthesis
    synthRef.current.cancel();

    const script = `
      Welcome to the Vanguard showroom. You are auditing the exquisite, ${year} ${make} ${model}. 
      Equipped with a powerful, ${engine} drivetrain, mated to a highly responsive ${transmission} gearbox, 
      this chassis is presented in pristine ${condition} condition. 
      Key highlights include a custom ${keyFeatures[0] || "leather package"} and premium tech telemetry. 
      Our master curators have conducted a rigorous 150-point mechanical inspection to validate absolute power. 
      Truly, a stellar collector acquisition.
    `;

    const utterance = new SpeechSynthesisUtterance(script);
    utteranceRef.current = utterance;

    // Load available voices
    const voices = synthRef.current.getVoices();
    // Prioritize natural sounding english voices
    const luxuryVoice = voices.find(v => 
      v.name.includes("Google US English") || 
      v.name.includes("Natural") || 
      v.name.includes("Male") || 
      v.lang.startsWith("en")
    );
    
    if (luxuryVoice) {
      utterance.voice = luxuryVoice;
    }

    utterance.rate = 0.92; // Deliberate luxury editorial pace
    utterance.pitch = 0.85; // Lower, warmer, more authoritative tone

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    setIsPlaying(true);
    synthRef.current.speak(utterance);
  };

  const stopWalkthrough = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button
        onClick={isPlaying ? stopWalkthrough : startWalkthrough}
        className={`flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-500 border ${
          isPlaying 
            ? "bg-apple-blue border-apple-blue text-white shadow-[0_0_25px_rgba(0,113,227,0.5)] scale-102" 
            : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:scale-105"
        }`}
      >
        {isPlaying ? (
          <>
            <Square size={14} className="fill-white" />
            <span>Mute Walkthrough</span>
          </>
        ) : (
          <>
            <Volume2 size={14} className="animate-pulse" />
            <span>Play Concierge Walkthrough</span>
          </>
        )}
      </button>

      {/* Real-time pulsing Soundwave Visualizer bars */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 24 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1 h-6 select-none pointer-events-none mt-1"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.75 bg-apple-blue rounded-full"
                animate={{ 
                  height: [6, 22, 6],
                }}
                transition={{
                  duration: 0.5 + (i % 3) * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
