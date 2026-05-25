"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedCars({ cars }: { cars: Car[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cars.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50; // trigger offset in pixels
    if (info.offset.x < -swipeThreshold) {
      nextCard();
    } else if (info.offset.x > swipeThreshold) {
      prevCard();
    }
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="flex flex-col py-16 bg-[#09090b] relative w-full overflow-hidden" id="hook">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-apple-blue text-[10px] tracking-[0.4em] uppercase font-bold block mb-3">Vanguard Editorial</span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-none">Featured Collections</h2>
          <p className="text-white/30 text-[10px] uppercase tracking-widest mt-2 block">Swipe or tap a card to cycle the fleet</p>
        </div>

        {/* Previous / Next Controls */}
        <div className="flex gap-2">
          <button
            onClick={prevCard}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-white/25 text-white/50 hover:text-white flex items-center justify-center transition-all bg-white/[0.02] active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextCard}
            className="w-12 h-12 rounded-full border border-white/10 hover:border-white/25 text-white/50 hover:text-white flex items-center justify-center transition-all bg-white/[0.02] active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Overlapping Deck Stack Container */}
      <div className="relative w-full h-[55vh] min-h-[420px] max-h-[550px] flex items-center justify-center px-6 mb-8 select-none">
        <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
          
          {cars.map((car, idx) => {
            // Find difference to determine offset positioning
            let diff = idx - activeIndex;
            
            // Handle wrap-around so cards loop infinitely in the stack
            if (diff < -1) diff += cars.length;
            if (diff > cars.length - 2) diff -= cars.length;

            const isActive = diff === 0;
            const isNext = diff === 1;
            const isPassed = diff === -1;
            
            // Only render active, next, and passed cards to maintain clean performance
            const shouldRender = isActive || isNext || isPassed;
            if (!shouldRender) return null;

            // Compute custom offset styles based on stack order
            let zIndex = 10;
            let translateX = 0;
            let scale = 0.85;
            let opacity = 0;
            let rotate = 0;

            if (isActive) {
              zIndex = 30;
              translateX = 0;
              scale = 1;
              opacity = 1;
              rotate = 0;
            } else if (isNext) {
              zIndex = 20;
              // Shift to the right (use pre-computed isMobile state to completely bypass browser reflow!)
              translateX = isMobile ? 40 : 200;
              scale = 0.9;
              opacity = 0.55;
              rotate = isMobile ? 0 : 2; // Disable expensive rotations on mobile GPUs
            } else if (isPassed) {
              zIndex = 10;
              // Shift to the left
              translateX = isMobile ? -40 : -200;
              scale = 0.9;
              opacity = 0.0; // prepped but hidden
              rotate = isMobile ? 0 : -2;
            }

            return (
              <motion.div
                key={car.id}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                  }
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3} // Tactile swipe resistance
                onDragEnd={isActive ? handleDragEnd : undefined}
                animate={{
                  x: translateX,
                  scale: scale,
                  opacity: opacity,
                  rotate: rotate,
                }}
                transition={{
                  type: "tween",
                  ease: [0.16, 1, 0.3, 1], // snappiest compositor cubic-bezier
                  duration: 0.45
                }}
                style={{ 
                  zIndex,
                  willChange: "transform, opacity" // promoting element to a dedicated GPU layering block
                }}
                className={`absolute w-[85vw] sm:w-[65vw] md:w-[55vw] lg:w-[66vw] xl:w-[60vw] h-[48vh] sm:h-[52vh] lg:h-[64vh] min-h-[380px] lg:min-h-[480px] max-h-[580px] rounded-[24px] md:rounded-[32px] overflow-hidden flex flex-col justify-between p-6 md:p-10 transition-colors border cursor-pointer ${
                  isActive 
                    ? "bg-[#0f0f11] border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] touch-pan-y" 
                    : "bg-[#18181c] border-white/5 opacity-60 hover:opacity-85 shadow-md"
                }`}
              >
                {/* Card Header Content */}
                <div className="relative z-20 flex justify-between items-start w-full">
                  <div className="flex flex-col">
                    <span className="px-2.5 py-0.5 rounded-full bg-apple-blue/20 text-apple-blue text-[8px] uppercase tracking-widest font-bold border border-apple-blue/25 w-max mb-3">
                      {idx === 0 ? "New" : "Certified"}
                    </span>
                    <span className="text-[10px] text-white/40 tracking-[0.2em] uppercase font-bold block mb-1">
                      {car.year} • {car.condition}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white leading-tight">
                      {car.make} <br />
                      <span className="text-white/60 font-serif font-light">{car.model}</span>
                    </h3>
                  </div>

                  {/* High-Fashion Outline counter */}
                  <span className="text-3xl md:text-4xl font-mono text-white/5 select-none font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Overlap Tint Filter Card Mask — perpetual solid shade to avoid expensive live blurs on mobile */}
                <div 
                  className="absolute inset-0 bg-[#09090b]/55 z-10 rounded-[24px] md:rounded-[32px] transition-all duration-300 pointer-events-none"
                  style={{ 
                    opacity: isActive ? 0 : 1,
                  }}
                />

                {/* Card Footer Detail Panel */}
                <div className={`relative z-20 w-full border-t border-white/5 pt-4 transition-all duration-500 flex items-center justify-between ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white tracking-tight">{formatNaira(car.priceNaira)}</span>
                    <span className="text-[7px] tracking-[0.2em] uppercase text-white/30 font-bold mt-0.5">{car.engine.split(' ')[0]} • {car.transmission.split(' ')[0]}</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/inventory/${car.id}`}
                      className="px-4 py-2 bg-white text-black hover:bg-white/95 rounded-full font-bold text-[8px] uppercase tracking-[0.15em] transition-all duration-300"
                    >
                      Acquire
                    </Link>
                    <Link
                      href={`/inventory/${car.id}`}
                      className="px-4 py-2 border border-white/10 hover:border-white/25 hover:bg-white/5 text-white rounded-full font-bold text-[8px] uppercase tracking-[0.15em] transition-all duration-300"
                    >
                      Explore
                    </Link>
                  </div>
                </div>

                {/* Immersive Car Media Image Background */}
                <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden rounded-[24px] md:rounded-[32px] flex items-center justify-center">
                  <Image
                    src={car.images[0]}
                    alt={car.model}
                    fill
                    sizes="(max-width: 768px) 85vw, 48vw"
                    className={`object-cover object-center transition-all duration-1000 rounded-[24px] md:rounded-[32px] ${
                      isActive ? "opacity-45 scale-100" : "opacity-25 scale-105 saturate-50"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-90 rounded-[24px] md:rounded-[32px]" />
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* Progress Dots Indicators */}
      <div className="flex justify-center gap-1.5 w-full">
        {cars.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              activeIndex === idx ? "w-8 bg-apple-blue" : "w-1.5 bg-white/15 hover:bg-white/30"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
