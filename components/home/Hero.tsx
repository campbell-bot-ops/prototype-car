"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center pt-20 px-4 md:px-6 overflow-hidden bg-black">
      {/* Full Screen Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80" 
          alt="Exotic Car"
          fill 
          sizes="100vw"
          priority
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/60" />
      </div>

      {/* Hero Content Overlaid */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mx-auto w-full mt-auto mb-12 md:mb-24">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white tracking-widest font-semibold text-sm md:text-lg uppercase mb-4"
        >
          Vanguard Exotics
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-[100px] lg:text-[140px] leading-none font-bold text-white tracking-tighter mb-6"
        >
          Curating Excellence.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg md:text-2xl text-white/90 font-medium mb-10 max-w-2xl leading-snug px-4"
        >
          An elite selection of the world&apos;s most prestigious vehicles.
        </motion.p>
        
        {/* Buttons: flex-col on mobile, flex-row on larger screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto px-4"
        >
          <Link 
            href="/inventory" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold text-[15px] md:text-[17px] hover:bg-white/90 transition-colors text-center"
          >
            Explore Collection
          </Link>
          
          <Link 
            href="#hook" 
            className="w-full sm:w-auto px-8 py-4 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold text-[15px] md:text-[17px] hover:bg-black/60 transition-colors text-center"
          >
            The Vanguard Experience
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
