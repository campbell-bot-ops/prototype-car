"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ParallaxHeroBackground } from "@/components/interaction/ParallaxHeroBackground";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-black">
      {/* Full-Bleed Cinematic Video — THE CAR IS THE STAR */}
      <ParallaxHeroBackground>
        <video 
          src="https://res.cloudinary.com/ddm5ca6u8/video/upload/jeep_dgk4g9.mp4"
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-center"
        />
        {/* Cinematic bottom gradient for text readability — minimal, keeps video vivid */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        {/* Subtle top vignette for navbar breathing room */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent h-[30%]" />
      </ParallaxHeroBackground>

      {/* Bottom-Anchored Content — like Porsche/Lamborghini/BMW */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-20 pb-12 md:pb-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          
          {/* Left: Headline Block */}
          <div className="flex flex-col">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/50 text-[10px] md:text-xs font-medium tracking-[0.35em] uppercase mb-3"
            >
              The New Standard
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-white text-[42px] sm:text-6xl md:text-7xl lg:text-[88px] font-semibold leading-[0.95] tracking-tight"
            >
              Vanguard<br />Exotics.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-white/60 text-sm md:text-base font-light mt-4 max-w-md leading-relaxed"
            >
              Curating the world&apos;s most exceptional vehicles. 
              Precision-sourced. Impeccably delivered.
            </motion.p>
          </div>

          {/* Right: CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-row gap-3 items-center"
          >
            <Link 
              href="/inventory" 
              className="px-7 py-3.5 bg-white text-black rounded-sm font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 text-center uppercase"
            >
              Explore Models
            </Link>
            
            <Link 
              href="#hook" 
              className="px-7 py-3.5 border border-white/30 text-white rounded-sm font-medium text-sm tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center uppercase"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Subtle scroll indicator — a simple animated chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
