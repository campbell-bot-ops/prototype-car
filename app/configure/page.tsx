"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function ConfigurePage() {
  const [activeColor, setActiveColor] = useState("rosso-corsa");
  const [activeWheel, setActiveWheel] = useState("forged-black");

  const colors = [
    { id: "rosso-corsa", name: "Rosso Corsa", hex: "#FF2800", hue: "hue-rotate-0" },
    { id: "nero-ds", name: "Nero Daytona", hex: "#111111", hue: "grayscale contrast-125 brightness-50" },
    { id: "giallo-modena", name: "Giallo Modena", hex: "#FFD700", hue: "hue-rotate-[60deg] saturate-150" },
    { id: "blu-tour-de-france", name: "Blu Tour de France", hex: "#00205B", hue: "hue-rotate-[220deg] brightness-75" },
    { id: "grigio-silverstone", name: "Grigio Silverstone", hex: "#555555", hue: "grayscale brightness-75 drop-shadow-md" },
  ];

  const wheels = [
    { id: "forged-black", name: "20\" Forged Diamond Black", price: "+ ₦12,500,000" },
    { id: "carbon-fiber", name: "21\" Full Carbon Fiber Track", price: "+ ₦32,000,000" },
    { id: "silver-chrome", name: "20\" Classic Chrome Spoke", price: "Included" },
  ];

  const activeColorData = colors.find(c => c.id === activeColor);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f7] pt-24 pb-32">
      <div className="grid grid-cols-1 xl:grid-cols-12 max-w-screen-2xl mx-auto min-h-[calc(100vh-80px)]">
        {/* Left/Top: Visualizer Studio */}
        <div className="xl:col-span-8 bg-[#0a0a0a] relative flex items-center justify-center p-8 overflow-hidden min-h-[50vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-[#050505] to-[#000]" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeColor}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.02, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-5xl"
            >
              {/* Using the red Ferrari image from unsplash as our placeholder silhouette for color filtering */}
              <Image 
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80" 
                alt="Vehicle Configuration Base" 
                fill 
                sizes="100vw"
                priority
                className={`object-contain transition-all duration-1000 ${activeColorData?.hue}`}
                style={{ filter: activeColorData?.hue.includes('hue') ? undefined : activeColorData?.hue }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white/40 text-xs tracking-widest uppercase font-bold">
            Interactive Digital Twin
          </div>
        </div>

        {/* Right/Bottom: Configuration Panel */}
        <div className="xl:col-span-4 px-8 xl:px-12 2xl:px-16 flex flex-col justify-center py-16 xl:py-0">
          <div className="mb-16">
             <h1 className="text-[10px] uppercase tracking-widest text-apple-blue font-bold mb-4">Vanguard Studio</h1>
             <h2 className="text-5xl font-bold tracking-tighter text-white leading-none mb-6">Vehicle<br/>Configuration.</h2>
             <p className="text-lg text-[#86868b] font-medium leading-relaxed">
               Command absolute exclusivity. Configure exterior hues and wheel styling to match your precise specifications.
             </p>
          </div>

          {/* Exterior Colors */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white tracking-wide">Exterior Paint</h3>
              <span className="text-[10px] font-bold tracking-widest text-[#86868b] uppercase">{activeColorData?.name}</span>
            </div>
            
            <div className="flex gap-4 flex-wrap">
              {colors.map(color => (
                <button
                  key={color.id}
                  onClick={() => setActiveColor(color.id)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${activeColor === color.id ? 'ring-2 ring-offset-2 ring-offset-[#050505] ring-white scale-110' : 'ring-1 ring-white/10 hover:ring-white/30 hover:scale-105'}`}
                  style={{ backgroundColor: color.hex }}
                >
                  {activeColor === color.id && <Check size={16} className={color.id === 'nero-ds' ? 'text-white' : 'text-black/50'} strokeWidth={3} />}
                </button>
              ))}
            </div>
          </div>

          {/* Wheels */}
          <div className="mb-16">
            <h3 className="font-bold text-white tracking-wide mb-6">Wheel Styling</h3>
            <div className="space-y-3">
              {wheels.map(wheel => (
                <button
                  key={wheel.id}
                  onClick={() => setActiveWheel(wheel.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${activeWheel === wheel.id ? 'border-apple-blue bg-apple-blue/10 backdrop-blur-md' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                >
                  <span className={`font-semibold tracking-tight ${activeWheel === wheel.id ? 'text-white' : 'text-[#86868b]'}`}>{wheel.name}</span>
                  <span className="text-xs font-bold tracking-widest text-white/50">{wheel.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Total & Checkout */}
          <div className="border-t border-white/10 pt-8 mt-auto">
            <div className="flex items-end justify-between mb-8">
              <span className="text-xs font-bold tracking-widest text-[#86868b] uppercase">Estimated Configuration Price</span>
              <span className="text-3xl font-bold tracking-tighter text-white">₦462,500,000</span>
            </div>
            <button className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform">
              Send to Concierge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
