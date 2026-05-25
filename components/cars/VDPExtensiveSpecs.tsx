"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Gauge, Settings, Key } from "lucide-react";
import { Car } from "@/lib/types";
import { ReviewsSection } from "@/components/interaction/ReviewsSection";
import { useState } from "react";

// Cursor-Interactive Light-Reflecting Metallic Card Wrapper
function ReflectingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] p-8 md:p-10 transition-all duration-300 backdrop-blur-md w-full h-full ${className}`}
    >
      {/* Dynamic Metallic Light Refraction */}
      {hovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `
              radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.05) 0%, transparent 70%),
              radial-gradient(180px circle at ${coords.x}px ${coords.y}px, rgba(0,113,227,0.12) 0%, transparent 60%)
            `
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function VDPExtensiveSpecs({ car }: { car: Car }) {
  const t: any = { duration: 0.8, ease: "easeOut" };

  return (
    <div className="flex flex-col gap-24 md:gap-32 w-full">
      
      {/* Engine & Power Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={t}
        className="flex flex-col gap-6 md:gap-10"
      >
        <div className="border-t border-white/20 w-12 mb-2 md:mb-6" />
        <motion.h3 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{...t, delay: 0.1}}
          className="font-light text-[40px] sm:text-5xl md:text-7xl xl:text-[90px] leading-[0.95] text-white tracking-tighter"
        >
          Engineered for <br/> <span className="text-white/40">pure adrenaline.</span>
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{...t, delay: 0.2}}
          className="text-lg sm:text-xl md:text-3xl text-[#86868b] font-light max-w-2xl leading-relaxed tracking-tight px-1 mt-4 md:mt-0"
        >
          The {car.model} is built around a devastatingly powerful {car.engine}, paired flawlessly with a {car.transmission}. It doesn&apos;t just drive; it dominates.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{...t, duration: 1.2}}
          className="relative w-full h-[300px] sm:h-[400px] md:h-[700px] rounded-[24px] md:rounded-[40px] overflow-hidden mt-8 md:mt-12 bg-white/5 border border-white/10"
        >
          <Image src={car.images[1] || car.images[0]} alt="Engine details" fill sizes="(max-width: 1200px) 100vw, 50vw" className="object-cover opacity-80" />
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{...t, delay: 0.2}}
            className="w-full"
          >
            <ReflectingCard>
              <Gauge className="text-white mb-6" size={24} />
              <span className="block text-[10px] sm:text-xs font-normal uppercase tracking-widest text-[#86868b] mb-2">Powertrain</span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">{car.engine}</span>
            </ReflectingCard>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{...t, delay: 0.3}}
            className="w-full"
          >
            <ReflectingCard>
              <Settings className="text-white mb-6" size={24} />
              <span className="block text-[10px] sm:text-xs font-normal uppercase tracking-widest text-[#86868b] mb-2">Transmission</span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-white leading-tight">{car.transmission}</span>
            </ReflectingCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Bespoke Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={t}
        className="flex flex-col gap-6 md:gap-10 mt-12 md:mt-24"
      >
        <div className="border-t border-white/20 w-12 mb-2 md:mb-6" />
        <motion.h3 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{...t, delay: 0.1}}
          className="font-light text-[40px] sm:text-5xl md:text-7xl xl:text-[90px] leading-[0.95] text-white tracking-tighter"
        >
          Bespoke to your <br/> <span className="text-[#86868b]">exact identity.</span>
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{...t, delay: 0.2}}
          className="text-lg sm:text-xl md:text-3xl text-[#86868b] font-light max-w-2xl leading-relaxed tracking-tight px-1 mt-4 md:mt-0"
        >
          Every detail inside the cabin is meticulously crafted. From the stitching to the finest leather, the Vanguard standard ensures uncompromising luxury.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
          {car.keyFeatures.map((feature, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{...t, delay: 0.1 * idx}}
              className="w-full"
            >
              <ReflectingCard className="flex flex-col justify-center items-center text-center min-h-[160px] md:min-h-[200px]">
                <span className="text-base sm:text-lg md:text-2xl font-light text-white tracking-tight leading-relaxed">{feature}</span>
              </ReflectingCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Condition & History Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={t}
        className="flex flex-col gap-8 mt-12 md:mt-24"
      >
        <div className="p-8 sm:p-10 md:p-16 bg-white/5 border border-white/10 rounded-[24px] md:rounded-[40px] text-white flex flex-col xl:flex-row items-center justify-between gap-12 overflow-hidden relative backdrop-blur-md">
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none" />
          <div className="flex-1 relative z-10 w-full flex flex-col items-center md:items-start">
            <div className="md:hidden mb-6">
              <span className="font-light text-white uppercase tracking-widest text-[10px] bg-black/20 px-4 py-2 rounded-full border border-white/10 shadow-sm">
                {car.condition}
              </span>
            </div>
            <h3 className="font-light text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-none mb-4 md:mb-6 text-center md:text-left">Flawless <br/> Pedigree.</h3>
            <p className="text-white/90 text-base sm:text-lg md:text-2xl max-w-md font-light leading-snug text-center md:text-left">
              Maintained to absolute perfection. The {car.model} stands in <span className="font-light text-white uppercase tracking-widest text-sm bg-black/20 px-3 py-1 rounded-full mx-2 hidden md:inline-block">{car.condition}</span> condition.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{...t, delay: 0.3}}
            className="w-full md:w-auto bg-black/20 backdrop-blur-md p-8 md:p-10 rounded-[32px] text-center relative z-10 shadow-inner"
          >
            <span className="block text-[10px] uppercase tracking-widest text-white/70 font-light mb-3">Recorded Mileage</span>
            <div className="flex items-baseline justify-center">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-light tracking-tighter leading-none">{car.mileage.toLocaleString()}</span>
            </div>
            <span className="block text-xl text-white/70 font-light mt-2">kilometers</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={t}
        className="p-4 md:p-12 bg-transparent md:bg-white/5 md:border border-white/10 rounded-[32px] md:rounded-[40px] md:backdrop-blur-md"
      >
        <ReviewsSection initialReviews={car.reviews} />
      </motion.div>
    </div>
  );
}
