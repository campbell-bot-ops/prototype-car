"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, KeyRound, CornerDownLeft, Delete, Eye, EyeOff, Lock } from "lucide-react";
import { DiagnosticHUD } from "@/components/layout/DiagnosticHUD";

interface PasskeyGuardProps {
  children: React.ReactNode;
}

export function PasskeyGuard({ children }: PasskeyGuardProps) {
  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState<boolean | null>(null); // null represents checking storage
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showText, setShowText] = useState(false);
  const [igniting, setIgniting] = useState(false);
  const [shakeSite, setShakeSite] = useState(false);
  const [keyboardKeys, setKeyboardKeys] = useState<string[][]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Shuffles keyboard alphanumeric keys on mount or reset
  const regenerateKeys = () => {
    // Alphanumeric keys required for "stillstudio" + padding symbols/digits
    const baseKeys = ["s", "t", "i", "l", "u", "d", "o", "9", "1", "a"];
    
    // Fisher-Yates Shuffle
    const shuffled = [...baseKeys];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Split shuffled alphanumeric keys into standard layout
    // Row 1: 4 keys
    // Row 2: 4 keys
    // Row 3: BACKSPACE, 2 remaining keys, ENTER
    const row1 = shuffled.slice(0, 4);
    const row2 = shuffled.slice(4, 8);
    const row3 = ["BACKSPACE", shuffled[8], shuffled[9], "ENTER"];
    
    setKeyboardKeys([row1, row2, row3]);
  };

  // Initialize Audio Context lazily on user gesture
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Synthesize Key Tap Sound
  const playTap = () => {
    try {
      const ctx = initAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      // Elegant high chirp
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  // Synthesize Error Buzz Sound
  const playError = () => {
    try {
      const ctx = initAudio();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = "sawtooth";
      osc2.type = "square";
      
      osc1.frequency.setValueAtTime(120, ctx.currentTime);
      osc2.frequency.setValueAtTime(123, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.35);
      osc2.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  // Synthesize V8 Engine Ignition Sound
  const playIgnition = () => {
    try {
      const ctx = initAudio();
      const now = ctx.currentTime;

      // 1. Chime - Beautiful, clean high-tech ascending arpeggio
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });

      // 2. V8 Engine Start & Rumble Simulation
      const bufferSize = ctx.sampleRate * 2.0; // 2 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      // Generate pink/white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Low pass filter with sweep resonance
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.Q.setValueAtTime(9, now);
      filter.frequency.setValueAtTime(50, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.3); // Crank rev up
      filter.frequency.exponentialRampToValueAtTime(140, now + 0.9); // Drop to fast idle
      filter.frequency.exponentialRampToValueAtTime(40, now + 2.0);  // Fade out

      // Starter crank + combustion amplitude envelope
      const engineGain = ctx.createGain();
      engineGain.gain.setValueAtTime(0, now);
      engineGain.gain.linearRampToValueAtTime(0.2, now + 0.1); // Starter hum
      engineGain.gain.linearRampToValueAtTime(0.9, now + 0.35); // V8 fires! Peak roar
      engineGain.gain.exponentialRampToValueAtTime(0.4, now + 0.9); // Settling down
      engineGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0); // Fading to quiet background

      // Mechanical rumble oscillator (V8 low combustion frequency)
      const lowOsc = ctx.createOscillator();
      lowOsc.type = "sawtooth";
      lowOsc.frequency.setValueAtTime(40, now);
      lowOsc.frequency.exponentialRampToValueAtTime(160, now + 0.3);
      lowOsc.frequency.exponentialRampToValueAtTime(70, now + 0.9);
      lowOsc.frequency.exponentialRampToValueAtTime(25, now + 2.0);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.4, now + 0.3);
      oscGain.gain.exponentialRampToValueAtTime(0.12, now + 0.9);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      noise.connect(filter);
      filter.connect(engineGain);
      engineGain.connect(ctx.destination);

      lowOsc.connect(filter);
      lowOsc.connect(oscGain);
      oscGain.connect(ctx.destination);

      noise.start(now);
      lowOsc.start(now);
      noise.stop(now + 2.0);
      lowOsc.stop(now + 2.0);
    } catch (e) {
      console.warn("Ignition audio failed", e);
    }
  };

  // Check state on mount
  useEffect(() => {
    const stored = localStorage.getItem("showroom_unlocked");
    if (stored === "true") {
      setIsUnlocked(true);
    } else {
      setIsUnlocked(false);
      regenerateKeys();
    }

    // Set up a listener for manual re-lock event (triggered by footer)
    const handleLockEvent = () => {
      setIsUnlocked(false);
      setPasscode("");
      setSuccess(false);
      setIgniting(false);
      setLoadingProgress(0);
      setLoadingPhase(0);
      regenerateKeys(); // Shuffle keys on lock reset!
    };

    window.addEventListener("lock-showroom", handleLockEvent);
    return () => window.removeEventListener("lock-showroom", handleLockEvent);
  }, []);

  // Handle Physical Keyboard Typing
  useEffect(() => {
    if (isUnlocked || isUnlocked === null || igniting) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses when inputs are active elsewhere or modifiers are held
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      
      if (e.key === "Enter") {
        handleSubmit();
      } else if (e.key === "Backspace") {
        playTap();
        setPasscode((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        // Only accept alphanumeric characters
        if (/^[a-zA-Z0-9]$/.test(e.key)) {
          if (passcode.length < 16) {
            playTap();
            setPasscode((prev) => prev + e.key.toLowerCase());
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [passcode, isUnlocked, igniting]);

  const handleKeyPress = (val: string) => {
    if (igniting) return;
    playTap();
    if (val === "BACKSPACE") {
      setPasscode((prev) => prev.slice(0, -1));
    } else if (val === "ENTER") {
      handleSubmit();
    } else {
      if (passcode.length < 16) {
        setPasscode((prev) => prev + val.toLowerCase());
      }
    }
  };

  const handleSubmit = () => {
    if (passcode.toLowerCase() === "stillstudio") {
      setSuccess(true);
      setError(false);
      setIgniting(true);
      playIgnition();
      
      // Dynamic Loading Progress Simulation: 0 to 100% over 1800ms
      const duration = 1800;
      const intervalTime = 30;
      const totalSteps = duration / intervalTime;
      let step = 0;

      // Site engine rumble effect starts after 300ms (when combustion sparks)
      setTimeout(() => {
        setShakeSite(true);
      }, 300);

      const progressInterval = setInterval(() => {
        step++;
        const progress = Math.min(Math.round((step / totalSteps) * 100), 100);
        setLoadingProgress(progress);

        // Map progress to diagnostic stages
        if (progress < 25) {
          setLoadingPhase(0);
        } else if (progress < 50) {
          setLoadingPhase(1);
        } else if (progress < 75) {
          setLoadingPhase(2);
        } else if (progress < 95) {
          setLoadingPhase(3);
        } else {
          setLoadingPhase(4);
        }

        if (step >= totalSteps) {
          clearInterval(progressInterval);
          
          // Complete ignition fadeout slightly after progress reaches 100%
          setTimeout(() => {
            setShakeSite(false);
            localStorage.setItem("showroom_unlocked", "true");
            setIsUnlocked(true);
          }, 300);
        }
      }, intervalTime);

    } else {
      setError(true);
      playError();
      setTimeout(() => {
        setError(false);
        setPasscode("");
        regenerateKeys(); // Reshuffle keypad on incorrect entry for extra security/sweetness!
      }, 800);
    }
  };

  if (isUnlocked === null) {
    // Blank or loading state to prevent layout flash during SSR hydration
    return (
      <div className="fixed inset-0 bg-[#0a0a0c] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#070709] overflow-hidden font-sans select-none h-[100dvh]"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.08,
              filter: "blur(20px)",
              transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } 
            }}
          >
            {/* Elegant glowing backdrop orbs simulating moving luxury ambient lights (uses solid standard colors to prevent oklab warnings) */}
            <motion.div 
              className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full blur-[80px] md:blur-[140px] pointer-events-none"
              animate={{
                x: [0, 80, -60, 0],
                y: [0, -100, 80, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                top: "10%", 
                left: "5%",
                backgroundColor: "rgba(0, 113, 227, 0.1)" 
              }}
            />
            <motion.div 
              className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
              animate={{
                x: [0, -90, 70, 0],
                y: [0, 80, -90, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ 
                bottom: "10%", 
                right: "5%",
                backgroundColor: "rgba(245, 158, 11, 0.05)" 
              }}
            />

            {/* Fine carbon weave pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

            {/* Locked Absolute Flex Overlay: Guarantees perfect visual centering of the Passkey keypad console */}
            <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
              <AnimatePresence>
                {!success && (
                  /* 1. PASSKEY PANEL (Main Luxury Glass Console - stable layout, no size shifts!) */
                  <motion.div
                    key="passcode-card"
                    className="w-full max-w-[90%] sm:max-w-sm backdrop-blur-3xl rounded-[2rem] p-6 sm:p-8 flex flex-col items-center pointer-events-auto"
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      borderColor: error 
                        ? "rgba(239, 68, 68, 0.4)" 
                        : "rgba(255, 255, 255, 0.1)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      boxShadow: error
                        ? "0 0 50px rgba(239, 68, 68, 0.25)"
                        : "0 0 80px rgba(0, 0, 0, 0.7)"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={error ? { 
                      opacity: 1, 
                      y: 0,
                      x: [-8, 8, -6, 6, -3, 3, 0],
                      transition: { duration: 0.5 }
                    } : { 
                      opacity: 1, 
                      y: 0 
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.95,
                      filter: "blur(10px)",
                      transition: { duration: 0.4 } 
                    }}
                  >
                    {/* Top Security Emblem */}
                    <div className="relative mb-6">
                      <motion.div 
                        className={`w-16 h-16 rounded-full flex items-center justify-center border relative`}
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          color: "rgba(255, 255, 255, 0.8)"
                        }}
                      >
                        <Shield size={26} className="text-white/60" />
                        <span className="absolute inset-0 rounded-full animate-ping opacity-25 border border-white/20" />
                      </motion.div>
                    </div>

                    {/* Headings */}
                    <span className="text-[#0071e3] text-[10px] font-semibold tracking-[0.4em] uppercase mb-1">
                      Lagos HQ Security
                    </span>
                    <h2 className="text-2xl font-light text-white tracking-widest text-center mb-1">
                      VANGUARD VAULT
                    </h2>
                    <p className="text-white/40 text-[11px] text-center font-light tracking-wider mb-8">
                      RESTRICTED SHOWROOM ACCESS
                    </p>

                    {/* Password Display / Input Box */}
                    <div className="w-full relative mb-6">
                      <div 
                        className="w-full h-14 rounded-2xl flex items-center justify-between px-4 relative overflow-hidden group hover:bg-white/10 transition-colors duration-300"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        <input
                          type={showText ? "text" : "password"}
                          value={passcode}
                          readOnly
                          placeholder="Enter authentication key..."
                          className="w-[80%] bg-transparent border-none outline-none text-white text-center font-mono font-light text-lg tracking-[0.2em] placeholder:text-white/25 placeholder:font-sans placeholder:text-sm placeholder:tracking-wider cursor-default select-none"
                        />
                        <button
                          onClick={() => { playTap(); setShowText(!showText); }}
                          className="text-white/40 hover:text-white/80 transition-colors duration-300 p-1"
                          title={showText ? "Hide Password" : "Show Password"}
                        >
                          {showText ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        {/* Subtle neon underlines */}
                        <div 
                          className="absolute bottom-0 left-0 right-0 h-[2px]" 
                          style={{
                            backgroundImage: `linear-gradient(to right, transparent, ${
                              error 
                                ? "rgba(239, 68, 68, 0.8)" 
                                : "rgba(255, 255, 255, 0.2)"
                            }, transparent)`
                          }}
                        />
                      </div>
                    </div>

                    {/* Status Message */}
                    <div className="h-6 flex items-center justify-center mb-6">
                      <AnimatePresence mode="wait">
                        {error && (
                          <motion.span
                            className="text-red-400 text-xs font-light tracking-widest uppercase flex items-center gap-1.5"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                          >
                            <Lock size={12} /> Authentication Denied
                          </motion.span>
                        )}
                        {!error && passcode.length > 0 && (
                          <motion.span
                            className="text-white/40 text-[10px] font-mono tracking-widest"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                          >
                            {passcode.length} CHARS ENTERED
                          </motion.span>
                        )}
                        {!error && passcode.length === 0 && (
                          <motion.span
                            className="text-white/30 text-[10px] font-light tracking-wide text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            Use keypad or type on physical keyboard
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Dynamic Alphanumeric Keypad Grid */}
                    <div className="w-full flex flex-col gap-3.5 mb-4">
                      {keyboardKeys.length > 0 && keyboardKeys.map((row, rowIdx) => (
                        <div key={rowIdx} className="flex justify-center gap-3.5 w-full">
                          {row.map((key) => {
                            const isBackspace = key === "BACKSPACE";
                            const isEnter = key === "ENTER";
                            
                            return (
                              <motion.button
                                key={key}
                                onClick={() => handleKeyPress(key)}
                                whileTap={{ scale: 0.92 }}
                                className={`h-12 flex items-center justify-center rounded-xl font-light text-sm select-none transition-all duration-300 ${
                                  isBackspace 
                                    ? "w-24 text-white/50 hover:text-white" 
                                    : isEnter 
                                    ? "w-24 bg-[#0071e3] border border-[#0071e3]/30 text-white hover:bg-[#0077ED] shadow-[0_0_20px_rgba(0,113,227,0.2)]" 
                                    : "w-12 text-white hover:bg-white/10 hover:border-white/20"
                                }`}
                                style={
                                  isBackspace 
                                    ? {
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)"
                                      }
                                    : isEnter
                                    ? {}
                                    : {
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        border: "1px solid rgba(255, 255, 255, 0.1)"
                                      }
                                }
                              >
                                {isBackspace ? (
                                  <Delete size={16} />
                                ) : isEnter ? (
                                  <CornerDownLeft size={16} />
                                ) : (
                                  key.toUpperCase()
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. DEDICATED FULL-BLEED DIAGNOSTIC HUD OVERLAY (Renders outside, completely immune to keyboard/layout shifts!) */}
            <AnimatePresence>
              {success && (
                <DiagnosticHUD 
                  loadingProgress={loadingProgress}
                  loadingPhase={loadingPhase}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Showroom Page Content Wrapper */}
      <div 
        className={`${shakeSite ? "engine-shake" : ""} h-full min-h-screen flex flex-col transition-all duration-500`}
        style={!isUnlocked ? { filter: "blur(12px)", pointerEvents: "none" } : {}}
      >
        {children}
      </div>
    </>
  );
}
