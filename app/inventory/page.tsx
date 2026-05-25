"use client";

import { useState, useMemo, useEffect } from "react";
import { mockCars } from "@/lib/mockData";
import { CarGrid } from "@/components/cars/CarGrid";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, X, LayoutGrid, Eye, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

const conditions = ["All", "Brand New", "Tokunbo", "Nigerian Used"];
const makes = ["All", ...Array.from(new Set(mockCars.map(car => car.make)))];

export default function InventoryPage() {
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedMake, setSelectedMake] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"editorial" | "cinematic">("editorial");
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const filteredCars = useMemo(() => {
    return mockCars.filter(car => {
      const matchCondition = selectedCondition === "All" || car.condition === selectedCondition;
      const matchMake = selectedMake === "All" || car.make === selectedMake;
      return matchCondition && matchMake;
    });
  }, [selectedCondition, selectedMake]);

  // Handle slide transitions for cinematic mode
  const nextSlide = () => {
    setActiveSlideIdx((prev) => (prev + 1) % filteredCars.length);
  };

  const prevSlide = () => {
    setActiveSlideIdx((prev) => (prev - 1 + filteredCars.length) % filteredCars.length);
  };

  const currentCar = filteredCars[activeSlideIdx];

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 relative overflow-x-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-apple-blue/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <span className="text-apple-blue font-light tracking-widest uppercase text-[10px] md:text-xs mb-4 block">Inventory & Showroom</span>
          <h1 className="text-5xl md:text-[80px] lg:text-[100px] font-light tracking-tighter leading-none mb-6 text-black">
            The Collection.
          </h1>
          <p className="text-base md:text-xl text-gray-500 font-light leading-relaxed">
            Explore our curated selection of the world&apos;s finest automobiles. Toggle viewports below to inspect the registry in standard editorial grid layout or full immersive cinema projection.
          </p>
        </motion.div>

        {/* View Switcher and Filter Toggle Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-row items-center justify-between border-t border-b border-black/5 py-6 mb-12"
        >
          {/* Glass Filter Button Trigger */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-3 px-6 py-3.5 bg-black/5 hover:bg-black text-black hover:text-white rounded-full transition-all duration-300 group"
          >
            <Filter size={14} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Filter Registry</span>
            {(selectedCondition !== "All" || selectedMake !== "All") && (
              <span className="w-2 h-2 rounded-full bg-apple-blue shadow-[0_0_8px_#0071e3]" />
            )}
          </button>

          {/* Toggle View Mode buttons */}
          <div className="bg-black/5 p-1 rounded-full flex gap-1 items-center">
            <button
              onClick={() => setViewMode("editorial")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-all ${
                viewMode === "editorial"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <LayoutGrid size={12} />
              <span className="hidden sm:inline">Grid Layout</span>
            </button>
            <button
              onClick={() => {
                setViewMode("cinematic");
                setActiveSlideIdx(0);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-all ${
                viewMode === "cinematic"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              <Eye size={12} />
              <span className="hidden sm:inline">Cinema View</span>
            </button>
          </div>
        </motion.div>

        {/* 1. CHIC EDITORIAL GRID VIEW */}
        <AnimatePresence mode="wait">
          {viewMode === "editorial" ? (
            <motion.div
              key="editorial"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <CarGrid cars={filteredCars} />
            </motion.div>
          ) : (
            
            /* 2. CINEMATIC FULLSCREEN SLIDESHOW VIEW */
            <motion.div
              key="cinematic"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="w-full relative"
            >
              {filteredCars.length === 0 ? (
                <div className="py-32 text-center text-muted">
                  <p className="font-serif text-2xl tracking-wide">No vehicles matching active parameters.</p>
                  <button 
                    onClick={() => { setSelectedMake("All"); setSelectedCondition("All"); }}
                    className="mt-6 px-6 py-3 bg-black text-white rounded-full text-xs uppercase tracking-widest font-medium"
                  >
                    Clear Active Filters
                  </button>
                </div>
              ) : (
                <div className="w-full aspect-[16/9] min-h-[480px] bg-black rounded-[40px] overflow-hidden relative shadow-2xl flex items-end p-8 md:p-16">
                  
                  {/* Absolute Background Image Slide */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={currentCar.images[0]}
                      alt={currentCar.model}
                      fill
                      className="object-cover object-center transition-all duration-1000"
                    />
                    {/* Dark gradient mapping to make texts pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/45" />
                  </div>

                  {/* Left/Right Absolute Navigation Arrows */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between items-center z-20 pointer-events-none">
                    <button
                      onClick={prevSlide}
                      className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center pointer-events-auto"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all flex items-center justify-center pointer-events-auto"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* Slide Content Overlaid */}
                  <div className="relative z-10 w-full max-w-3xl text-white">
                    <motion.div
                      key={currentCar.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="space-y-4"
                    >
                      <span className="text-apple-blue font-semibold tracking-[0.3em] uppercase text-[9px] md:text-[10px] block">
                        {currentCar.make} • {currentCar.year}
                      </span>
                      
                      <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-none">
                        {currentCar.model}
                      </h2>
                      
                      <p className="text-white/70 font-light text-xs md:text-base max-w-lg leading-relaxed">
                        {currentCar.keyFeatures[0]} • Styled with a premium {currentCar.transmission} mechanical setup.
                      </p>

                      {/* Micro specs grid */}
                      <div className="flex gap-8 py-4 border-t border-b border-white/10 w-full max-w-md my-4">
                        <div>
                          <span className="block text-[8px] uppercase tracking-widest text-white/40">Condition</span>
                          <span className="text-[11px] uppercase tracking-wider font-medium">{currentCar.condition}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase tracking-widest text-white/40">Engine</span>
                          <span className="text-[11px] font-medium">{currentCar.engine.split(' ')[0]}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase tracking-widest text-white/40">Acquisition Price</span>
                          <span className="text-[11px] font-medium text-apple-blue">{formatNaira(currentCar.priceNaira)}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link 
                          href={`/inventory/${currentCar.id}`}
                          className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black hover:bg-apple-blue hover:text-white rounded-full text-[10px] uppercase tracking-widest font-bold transition-all shadow-lg"
                        >
                          <span>Audition Vehicle</span>
                          <ArrowRight size={12} />
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                  {/* Dynamic Slide Counter Index overlay */}
                  <div className="absolute top-8 right-8 text-white/30 font-mono text-sm z-10 select-none">
                    0{activeSlideIdx + 1} / 0{filteredCars.length}
                  </div>

                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 3. INTERACTIVE GLASSMORPHIC FILTER DRAWER PORTAL */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Backdrop blur clickoff panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
              />

              {/* Sliding Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 260 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white/95 backdrop-blur-2xl border-l border-black/5 z-[9999] shadow-2xl p-8 flex flex-col text-black h-full"
              >
                {/* Sticky Header: flex-shrink-0 */}
                <div className="flex items-center justify-between pb-6 border-b border-black/5 flex-shrink-0">
                  <div>
                    <h3 className="font-light text-2xl tracking-tight text-black">Filter Collection</h3>
                    <p className="text-gray-500 text-xs mt-1 font-light">Refine inventory by model parameters.</p>
                  </div>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 rounded-full hover:bg-black/5 text-gray-400 hover:text-black transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable Content: flex-1 overflow-y-auto */}
                <div className="flex-1 overflow-y-auto py-8 space-y-8 pr-1 scrollbar-thin">
                  
                  {/* Select Make Panel */}
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Vehicle Make</label>
                    <div className="flex flex-wrap gap-2">
                      {makes.map((make) => (
                        <button
                          key={make}
                          onClick={() => setSelectedMake(make)}
                          className={`px-4 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-all border ${
                            selectedMake === make
                              ? "bg-black border-black text-white shadow-sm"
                              : "bg-transparent border-black/10 hover:border-black/35 text-gray-500 hover:text-black"
                          }`}
                        >
                          {make}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Condition Panel */}
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">Chassis Condition</label>
                    <div className="flex flex-wrap gap-2">
                      {conditions.map((cond) => (
                        <button
                          key={cond}
                          onClick={() => setSelectedCondition(cond)}
                          className={`px-4 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-all border ${
                            selectedCondition === cond
                              ? "bg-black border-black text-white shadow-sm"
                              : "bg-transparent border-black/10 hover:border-black/35 text-gray-500 hover:text-black"
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Standard Certification Banner */}
                  <div className="p-5 border border-black/5 rounded-2xl bg-black/[0.01] flex items-start gap-3">
                    <ShieldCheck size={18} className="text-apple-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-black font-bold block">Vanguard Certified</span>
                      <p className="text-gray-500 text-[10px] mt-1 leading-relaxed font-light">
                        Every vehicle catalogued in our digital registry qualifies for physical 150-Point authenticity and drivetrain validation prior to showroom handover.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Sticky Footer: flex-shrink-0 */}
                <div className="pt-6 border-t border-black/5 flex gap-3 flex-shrink-0 bg-white/95">
                  <button
                    onClick={() => {
                      setSelectedMake("All");
                      setSelectedCondition("All");
                      setIsFilterOpen(false);
                    }}
                    className="flex-1 py-4 border border-black/10 hover:border-black/25 text-gray-600 hover:text-black text-[10px] uppercase tracking-widest font-bold rounded-full transition-all text-center"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 py-4 bg-black text-white hover:bg-black/90 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all shadow-md text-center"
                  >
                    Apply Filters
                  </button>
                </div>

              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
}
