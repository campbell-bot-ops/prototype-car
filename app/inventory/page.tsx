"use client";

import { useState, useMemo } from "react";
import { mockCars } from "@/lib/mockData";
import { CarGrid } from "@/components/cars/CarGrid";
import { motion } from "framer-motion";
import { ChevronDown, Filter } from "lucide-react";

const conditions = ["All", "Brand New", "Tokunbo", "Nigerian Used"];
const makes = ["All", ...Array.from(new Set(mockCars.map(car => car.make)))];

export default function InventoryPage() {
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedMake, setSelectedMake] = useState("All");

  const filteredCars = useMemo(() => {
    return mockCars.filter(car => {
      const matchCondition = selectedCondition === "All" || car.condition === selectedCondition;
      const matchMake = selectedMake === "All" || car.make === selectedMake;
      return matchCondition && matchMake;
    });
  }, [selectedCondition, selectedMake]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-24 max-w-4xl mx-auto"
        >
          <span className="text-apple-blue font-light tracking-widest uppercase text-[10px] md:text-xs mb-6 block">Inventory & Showroom</span>
          <h1 className="text-5xl md:text-[80px] lg:text-[100px] font-light tracking-tighter leading-none mb-8 text-black">
            The Collection.
          </h1>
          <p className="text-lg md:text-2xl text-gray-500 font-light leading-snug">
            Explore our curated selection of the world&apos;s finest automobiles. Filter by make and condition to locate your definitive match.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-center gap-6 md:gap-8 mb-16 pt-4 pb-12 border-b border-white/10"
        >
          <div className="flex items-center gap-3 text-muted w-full lg:w-auto lg:mr-4 border-b lg:border-b-0 border-white/10 pb-4 lg:pb-0">
            <Filter size={18} />
            <span className="text-xs uppercase tracking-widest font-light mt-1">Sort & Filter</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-4 w-full lg:w-auto shrink-0 flex-1">
            <div className="relative group w-full sm:w-1/2 lg:max-w-[280px]">
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full appearance-none bg-surface border border-white/10 hover:border-white/30 rounded-2xl py-4 px-6 text-[11px] md:text-xs font-light tracking-widest uppercase text-foreground focus:outline-none focus:ring-1 focus:ring-white/50 transition-all cursor-pointer shadow-sm mt-2 md:mt-0"
              >
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 mt-1 md:mt-0 text-muted group-hover:text-foreground transition-colors pointer-events-none" size={16} />
              <span className="absolute -top-1 md:-top-2.5 left-5 bg-background px-2 text-[9px] uppercase tracking-widest text-[#86868b] font-light pointer-events-none">Make</span>
            </div>

            <div className="relative group w-full sm:w-1/2 lg:max-w-[280px]">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full appearance-none bg-surface border border-white/10 hover:border-white/30 rounded-2xl py-4 px-6 text-[11px] md:text-xs font-light tracking-widest uppercase text-foreground focus:outline-none focus:ring-1 focus:ring-white/50 transition-all cursor-pointer shadow-sm mt-2 md:mt-0"
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 mt-1 md:mt-0 text-muted group-hover:text-foreground transition-colors pointer-events-none" size={16} />
              <span className="absolute -top-1 md:-top-2.5 left-5 bg-background px-2 text-[9px] uppercase tracking-widest text-[#86868b] font-light pointer-events-none">Condition</span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CarGrid cars={filteredCars} />
        </motion.div>
      </div>
    </div>
  );
}
