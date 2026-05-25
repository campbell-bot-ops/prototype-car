"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Key, Volume2, ShieldAlert } from "lucide-react";

interface CarSound {
  id: string;
  name: string;
  type: string;
  idleFreq: number;
  revFreq: number;
  color: string;
  desc: string;
}

const CARS: CarSound[] = [
  {
    id: "porsche",
    name: "911 Turbo S",
    type: "Flat-6 Twin-Turbo",
    idleFreq: 55,
    revFreq: 240,
    color: "#0071e3",
    desc: "Screaming precision, twin-turbocharged high-rpm metallic exhaust notes."
  },
  {
    id: "g63",
    name: "Mercedes-AMG G63",
    type: "Handcrafted V8 BiTurbo",
    idleFreq: 38,
    revFreq: 130,
    color: "#ef4444",
    desc: "Deep, gutteral exhaust growl with low-frequency muscle-car rumbles."
  },
  {
    id: "jeep",
    name: "Cherokee Pioneer",
    type: "Classic 4.0L Inline-6",
    idleFreq: 45,
    revFreq: 160,
    color: "#ca8a04",
    desc: "Classic vintage mechanical hum, raw rugged combustion rhythm."
  }
];

export function IgnitionSoundboard() {
  const [selectedCar, setSelectedCar] = useState<CarSound>(CARS[1]);
  const [isKeyInserted, setIsKeyInserted] = useState(false);
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [isRevving, setIsRevving] = useState(false);
  const [rpm, setRpm] = useState(0);

  // Web Audio API refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize Audio Context on user action to satisfy browser security
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const startEngine = () => {
    initAudio();
    if (!audioCtxRef.current || isEngineOn) return;

    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;

    // Create Oscillators (Osc 1: core power, Osc 2: sub-frequency rumble)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc1.type = "sawtooth";
    osc2.type = "square";

    // Setup filter to smooth out synthetic harshness and sound like a deep exhaust muffler
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(selectedCar.idleFreq * 2.5, ctx.currentTime);

    // Initial Gain (Volume) envelope: Startup rev spike, then drop to idle
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 0.1); // Startup burst
    gainNode.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.9); // Settle to idle

    // Initial Frequency envelope: Startup roar, then settle to idle RPM
    osc1.frequency.setValueAtTime(selectedCar.idleFreq * 3.5, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(selectedCar.idleFreq, ctx.currentTime + 0.9);
    
    osc2.frequency.setValueAtTime(selectedCar.idleFreq * 1.75, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(selectedCar.idleFreq * 0.5, ctx.currentTime + 0.9);

    // Connect nodes
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start oscillators
    osc1.start();
    osc2.start();

    // Store refs
    osc1Ref.current = osc1;
    osc2Ref.current = osc2;
    filterRef.current = filter;
    gainNodeRef.current = gainNode;
    setIsEngineOn(true);
    setRpm(800); // Idle RPM
  };

  const stopEngine = () => {
    if (osc1Ref.current) {
      try { osc1Ref.current.stop(); } catch (e) {}
      osc1Ref.current = null;
    }
    if (osc2Ref.current) {
      try { osc2Ref.current.stop(); } catch (e) {}
      osc2Ref.current = null;
    }
    setIsEngineOn(false);
    setIsRevving(false);
    setRpm(0);
  };

  // Accelerator rev trigger (Click & Hold)
  const handleRevStart = () => {
    if (!isEngineOn || !audioCtxRef.current) return;
    setIsRevving(true);

    const ctx = audioCtxRef.current;
    
    // Ramp up frequency (RPM)
    osc1Ref.current?.frequency.exponentialRampToValueAtTime(selectedCar.revFreq, ctx.currentTime + 0.4);
    osc2Ref.current?.frequency.exponentialRampToValueAtTime(selectedCar.revFreq * 0.5, ctx.currentTime + 0.4);
    filterRef.current?.frequency.exponentialRampToValueAtTime(selectedCar.revFreq * 3.5, ctx.currentTime + 0.4);
    gainNodeRef.current?.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.3);
  };

  const handleRevEnd = () => {
    if (!isEngineOn || !audioCtxRef.current) return;
    setIsRevving(false);

    const ctx = audioCtxRef.current;
    
    // Ramp back down to idle RPM
    osc1Ref.current?.frequency.exponentialRampToValueAtTime(selectedCar.idleFreq, ctx.currentTime + 0.6);
    osc2Ref.current?.frequency.exponentialRampToValueAtTime(selectedCar.idleFreq * 0.5, ctx.currentTime + 0.6);
    filterRef.current?.frequency.exponentialRampToValueAtTime(selectedCar.idleFreq * 2.5, ctx.currentTime + 0.6);
    gainNodeRef.current?.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.5);
  };

  // Interpolate RPM dynamically for the retro dashboard tachometer
  useEffect(() => {
    if (!isEngineOn) {
      setRpm(0);
      return;
    }

    const interval = setInterval(() => {
      setRpm((prev) => {
        if (isRevving) {
          const target = 6500 + Math.random() * 400; // Redline
          return prev + (target - prev) * 0.3;
        } else {
          const target = 800 + Math.random() * 50; // Idle wobble
          return prev + (target - prev) * 0.15;
        }
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isEngineOn, isRevving]);

  // Clean up nodes on unmount
  useEffect(() => {
    return () => {
      stopEngine();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Handle car swap while engine is running
  const handleCarChange = (car: CarSound) => {
    const wasRunning = isEngineOn;
    if (wasRunning) stopEngine();
    setSelectedCar(car);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden flex flex-col justify-center px-6">
      {/* Visual background atmospheric flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[90px] pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: `${selectedCar.color}08` }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase font-semibold block mb-3">Vanguard Audio Lab</span>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">Acoustic Audition</h2>
          <p className="text-white/50 font-light text-sm md:text-base leading-relaxed">
            Experience the mechanical heartbeat. Select a vehicle, insert the ignition key, and fire up the engine core directly in your browser cockpit.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-[#0f0f10] border border-white/[0.04] rounded-[32px] md:rounded-[40px] p-5 md:p-12 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* Left Panel: Selector & Desc */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between self-stretch">
            <div className="space-y-4 lg:space-y-6">
              <h3 className="text-white/40 text-[9px] lg:text-[10px] tracking-[0.2em] uppercase font-bold text-center lg:text-left">Select Combustion Core</h3>
              
              <div className="grid grid-cols-3 lg:flex lg:flex-col gap-2 lg:gap-3">
                {CARS.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleCarChange(car)}
                    className={`flex flex-col lg:flex-row lg:items-center justify-between p-3 lg:p-5 rounded-xl lg:rounded-2xl border text-center lg:text-left transition-all duration-500 group ${
                      selectedCar.id === car.id
                        ? "bg-white/[0.03] border-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.02)]"
                        : "bg-transparent border-transparent hover:bg-white/[0.01]"
                    }`}
                  >
                    <div className="overflow-hidden w-full text-center lg:text-left">
                      <h4 className="text-white font-medium tracking-tight text-xs lg:text-lg truncate group-hover:translate-x-1 transition-transform duration-500">
                        <span className="lg:hidden">
                          {car.id === "porsche" ? "911 Turbo" : car.id === "g63" ? "AMG G63" : "Pioneer"}
                        </span>
                        <span className="hidden lg:inline">{car.name}</span>
                      </h4>
                      <p className="text-white/40 text-[9px] lg:text-xs mt-0.5 lg:mt-1 font-light truncate hidden sm:block lg:block">{car.type}</p>
                    </div>
                    <div 
                      className="w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full transition-all duration-500 mx-auto lg:mx-0 mt-2 lg:mt-0 shrink-0"
                      style={{ 
                        backgroundColor: selectedCar.id === car.id ? car.color : "rgba(255,255,255,0.1)",
                        boxShadow: selectedCar.id === car.id ? `0 0 12px ${car.color}` : "none"
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 lg:mt-0 p-5 bg-white/[0.01] border border-white/[0.03] rounded-2xl hidden lg:block">
              <p className="text-white/70 text-sm leading-relaxed font-light">{selectedCar.desc}</p>
            </div>
          </div>

          {/* Right Panel: Cockpit Controls */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-[#070708] border border-white/[0.02] rounded-[24px] lg:rounded-[32px] p-6 lg:p-8 relative overflow-hidden">
            
            {/* Visualizer Mesh */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Live Dashboard Tachometer Gauges */}
            <div className="relative w-40 h-40 lg:w-56 lg:h-56 flex items-center justify-center mb-6 lg:mb-10">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 224 224">
                <circle
                  cx="112" cy="112" r="95"
                  className="stroke-white/[0.03]"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="112" cy="112" r="95"
                  style={{ 
                    stroke: selectedCar.color,
                    strokeDasharray: 597,
                    strokeDashoffset: 597 - (597 * Math.min(rpm, 8000)) / 8000,
                    transition: "stroke-dashoffset 0.05s ease-out"
                  }}
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>

              {/* RPM display digits */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-white font-mono text-2xl lg:text-3xl font-bold tracking-tight">
                  {Math.round(rpm)}
                </span>
                <span className="text-white/30 text-[8px] lg:text-[9px] uppercase tracking-[0.25em] font-bold mt-0.5 lg:mt-1">RPM</span>
                <span className={`text-[7px] lg:text-[8px] uppercase tracking-[0.2em] font-black mt-1 lg:mt-2 transition-all duration-300 ${
                  rpm > 6000 ? "text-red-500 animate-pulse" : "text-white/20"
                }`}>
                  Redline
                </span>
              </div>
            </div>

            {/* Interactive Control Controls */}
            <div className="flex flex-col items-center gap-5 lg:gap-8 w-full max-w-sm">
              
              {/* Step 1: Insert Key */}
              <div className="flex items-center justify-between w-full p-3 lg:p-4 border border-white/[0.03] rounded-xl lg:rounded-2xl bg-white/[0.01]">
                <div className="flex items-center gap-2.5">
                  <Key size={16} className={isKeyInserted ? "text-amber-500" : "text-white/30"} />
                  <span className="text-[10px] lg:text-xs uppercase tracking-widest text-white/50 font-medium">Ignition Lock</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsKeyInserted(!isKeyInserted);
                    if (isEngineOn) stopEngine();
                  }}
                  className={`px-3 py-1.5 lg:px-4 lg:py-2 text-[9px] lg:text-[10px] uppercase tracking-widest font-bold border rounded-lg transition-all duration-500 ${
                    isKeyInserted
                      ? "border-amber-500/30 text-amber-500 bg-amber-500/5 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                      : "border-white/10 text-white/60 hover:border-white/20"
                  }`}
                >
                  {isKeyInserted ? "Key Locked" : "Insert Key"}
                </button>
              </div>

              {/* Step 2: Start / Stop Engine Button & Accelerator Pedal */}
              <div className="flex items-center justify-center gap-4 lg:gap-6 w-full">
                
                {/* Engine button */}
                <button
                  type="button"
                  disabled={!isKeyInserted}
                  onClick={isEngineOn ? stopEngine : startEngine}
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border flex flex-col items-center justify-center transition-all duration-700 relative group focus:outline-none shrink-0 ${
                    !isKeyInserted
                      ? "opacity-30 cursor-not-allowed border-white/5 bg-transparent"
                      : isEngineOn
                        ? "border-red-500 text-red-500 bg-red-500/5 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                        : "border-white/20 text-white bg-transparent hover:border-white/40 hover:scale-105"
                  }`}
                >
                  {isEngineOn ? (
                    <Square size={16} className="fill-red-500" />
                  ) : (
                    <Play size={16} className="fill-white translate-x-[2px]" />
                  )}
                  <span className="text-[6px] lg:text-[7px] uppercase tracking-widest font-bold mt-1 text-center leading-none">
                    {isEngineOn ? "STOP" : "START"}
                  </span>
                </button>

                {/* Rev Accelerator pedal */}
                <button
                  type="button"
                  disabled={!isEngineOn}
                  onMouseDown={handleRevStart}
                  onMouseUp={handleRevEnd}
                  onMouseLeave={handleRevEnd}
                  onTouchStart={(e) => { e.preventDefault(); handleRevStart(); }}
                  onTouchEnd={(e) => { e.preventDefault(); handleRevEnd(); }}
                  className={`flex-1 py-4 lg:py-6 border rounded-xl lg:rounded-2xl flex flex-col items-center justify-center transition-all duration-500 select-none ${
                    !isEngineOn
                      ? "opacity-30 cursor-not-allowed border-white/5 text-white/20"
                      : isRevving
                        ? "border-white text-black bg-white shadow-2xl scale-[0.98]"
                        : "border-white/10 text-white hover:border-white/30 hover:bg-white/[0.02]"
                  }`}
                >
                  <Volume2 size={16} className="mb-0.5 lg:mb-1" />
                  <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold">Accelerator</span>
                  <span className="text-[6px] lg:text-[7px] uppercase tracking-widest text-white/30 mt-0.5 lg:mt-1 font-light">Hold to Rev Engine</span>
                </button>
              </div>

              {/* Warning message if key is missing */}
              <AnimatePresence>
                {!isKeyInserted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-500/70"
                  >
                    <ShieldAlert size={12} />
                    <span>Key must be inserted in cockpit lock</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
