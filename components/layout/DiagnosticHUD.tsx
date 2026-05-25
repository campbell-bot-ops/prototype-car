"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DiagnosticHUDProps {
  loadingProgress: number;
  loadingPhase: number;
}

export function DiagnosticHUD({ loadingProgress, loadingPhase }: DiagnosticHUDProps) {
  return (
    <motion.div
      key="loading-screen"
      className="fixed inset-0 z-[99999] bg-[#070709] flex flex-col items-center justify-center p-6 font-sans select-none overflow-hidden h-[100dvh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: "blur(20px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
      }}
    >
      {/* Immersive cinematic background glowing light orbs */}
      <motion.div 
        className="absolute w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] rounded-full blur-[80px] md:blur-[140px] pointer-events-none"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -80, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          top: "15%", 
          left: "10%",
          backgroundColor: "rgba(0, 113, 227, 0.08)" 
        }}
      />
      <motion.div 
        className="absolute w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] rounded-full blur-[80px] md:blur-[120px] pointer-events-none"
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 60, -70, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          bottom: "15%", 
          right: "10%",
          backgroundColor: "rgba(245, 158, 11, 0.04)" 
        }}
      />

      {/* Fine carbon weave pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-30" />

      {/* Main Centered Diagnostic HUD */}
      <div className="relative z-10 flex flex-col items-center max-w-[90%] sm:max-w-xs md:max-w-sm w-full text-center px-4">
        
        {/* Large Glowing Center Circular Radar */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-8 flex items-center justify-center">
          <motion.div 
            className="absolute inset-0 rounded-full border border-[#0071e3]/25"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-2.5 rounded-full border border-dashed border-[#0071e3]/45"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-6 rounded-full border border-[#0071e3]/60 flex items-center justify-center"
            style={{ 
              boxShadow: "inset 0 0 20px rgba(0, 113, 227, 0.15)",
              backgroundColor: "rgba(0, 0, 0, 0.2)"
            }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-[#0071e3] font-mono text-xl sm:text-2xl font-light tracking-tight">
              {loadingProgress}%
            </span>
          </motion.div>
          
          {/* Glowing rotating sweep blip - fully robust for 128px (w-32) and 144px (w-36) diameters */}
          <div className="absolute inset-0 rounded-full flex items-start justify-center">
            <motion.div 
              className="w-2 h-2 rounded-full bg-[#0071e3] shadow-[0_0_12px_#0071e3]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              style={{ transformOrigin: "center 64px" }}
            />
          </div>
        </div>

        {/* Diagnostic Labels */}
        <span className="text-[#0071e3] text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] uppercase mb-1.5 sm:mb-2">
          System Ignition
        </span>
        <h3 className="text-lg sm:text-xl font-light text-white tracking-widest uppercase mb-6 sm:mb-8">
          Calibrating Showroom
        </h3>

        {/* Progress Line */}
        <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden mb-6 sm:mb-8 relative">
          <div 
            className="h-full bg-[#0071e3] shadow-[0_0_10px_#0071e3] transition-all duration-75"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        {/* Dynamic Log Text Terminal: locked size and border ensures zero height shifts */}
        <div 
          className="h-14 flex items-center justify-center text-center px-4 overflow-hidden border border-white/5 rounded-2xl w-full"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={loadingPhase}
              className="text-white/60 font-mono text-[10px] sm:text-xs tracking-wider leading-relaxed select-none"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {loadingPhase === 0 && "SYSTEM CHECK: Verifying secure clearance..."}
              {loadingPhase === 1 && "IGNITION: Priming hybrid battery cells..."}
              {loadingPhase === 2 && "AERO CALIBRATION: Syncing spoilers..."}
              {loadingPhase === 3 && "ENGINE CONTROL: Mapping exotics exhaust..."}
              {loadingPhase === 4 && "ENGINE READY. Launching Vanguard showroom."}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
