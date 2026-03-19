"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Maximize, Rotate3D } from "lucide-react";

export function Gallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"photos" | "360" | "video">("photos");
  const [inlineIndex, setInlineIndex] = useState(0);

  // Avoid scrolling the underlying page when fullscreen modal is open
  if (typeof document !== 'undefined') {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* View Mode Controls */}
      <div className="flex flex-wrap shadow-none border-none justify-center gap-2 md:gap-4 pb-2">
         <button onClick={() => setViewMode("photos")} className={`px-6 py-3 rounded-full text-[10px] md:text-xs font-normal tracking-widest uppercase transition-all ${viewMode === 'photos' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'}`}>Photos</button>
         <button onClick={() => setViewMode("video")} className={`px-6 py-3 rounded-full text-[10px] md:text-xs font-normal tracking-widest uppercase flex items-center gap-2 transition-all ${viewMode === 'video' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'}`}><Play size={12}/> Video Walkaround</button>
         <button onClick={() => setViewMode("360")} className={`px-6 py-3 rounded-full text-[10px] md:text-xs font-normal tracking-widest uppercase flex items-center gap-2 transition-all ${viewMode === '360' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'}`}><Rotate3D size={14}/> 360° Studio</button>
      </div>

      {/* Main Cinematic Viewer */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#050505] rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/5 group shadow-2xl">
         
         {viewMode === "photos" && (
           <>
             <AnimatePresence mode="wait">
               <motion.div
                 key={inlineIndex}
                 initial={{ opacity: 0, scale: 1.02 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.6, ease: "easeInOut" }}
                 className="absolute inset-0 cursor-zoom-in"
                 onClick={() => setSelectedIndex(inlineIndex)}
               >
                 <Image src={images[inlineIndex]} alt="Car" fill className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700" priority sizes="(max-width: 768px) 100vw, 80vw" />
               </motion.div>
             </AnimatePresence>
             
             {/* Left/Right Overlays */}
             <button onClick={(e) => { e.stopPropagation(); setInlineIndex(i => i > 0 ? i - 1 : images.length - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:scale-110">
               <ChevronLeft size={24} />
             </button>
             <button onClick={(e) => { e.stopPropagation(); setInlineIndex(i => i < images.length - 1 ? i + 1 : 0); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:scale-110">
               <ChevronRight size={24} />
             </button>
             
             {/* Expand Icon */}
             <button onClick={() => setSelectedIndex(inlineIndex)} className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white/20 flex items-center gap-2 shadow-lg">
               <Maximize size={14} />
               <span className="text-[10px] uppercase tracking-widest font-light">Expand</span>
             </button>

             {/* Image Indicators */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10">
               {images.map((_, idx) => (
                 <button 
                   key={idx} 
                   onClick={(e) => { e.stopPropagation(); setInlineIndex(idx); }}
                   className="p-1"
                 >
                   <div className={`h-1.5 rounded-full transition-all duration-500 ${idx === inlineIndex ? 'w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-2 bg-white/40 hover:bg-white/80'}`} />
                 </button>
               ))}
             </div>
           </>
         )}

         {viewMode === "video" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]">
               <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center mb-6 cursor-pointer hover:scale-110 hover:bg-white/10 transition-all">
                 <Play size={32} className="text-white ml-2 opacity-90" />
               </div>
               <p className="text-white/60 font-light tracking-widest uppercase text-xs">Play Cinematic Feature</p>
               <span className="text-[10px] text-white/30 tracking-widest mt-2 uppercase">Video available upon formal inquiry</span>
            </div>
         )}
         
         {viewMode === "360" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] cursor-grab active:cursor-grabbing">
               <Rotate3D size={64} className="text-white/20 mb-6" />
               <p className="text-white/60 font-light tracking-widest uppercase text-xs">Drag to rotate exterior</p>
               <div className="flex gap-2 mt-6">
                 <span className="w-2 h-2 rounded-full bg-apple-blue animate-pulse" />
                 <span className="w-2 h-2 rounded-full bg-apple-blue/50 animate-pulse delay-75" />
                 <span className="w-2 h-2 rounded-full bg-apple-blue/20 animate-pulse delay-150" />
               </div>
               <span className="text-[10px] text-white/30 tracking-widest mt-4 uppercase">Interactive module loading securely...</span>
            </div>
         )}
      </div>

      {/* Fullscreen Modal Override */}
      {typeof document !== "undefined" ? createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center p-4 md:p-8"
            >
            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[60] bg-white/5 p-3 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>

            {selectedIndex > 0 && (
              <button 
                onClick={() => setSelectedIndex(selectedIndex - 1)}
                className="absolute left-2 md:left-8 text-white/50 hover:text-white transition-colors z-[60] p-4 group hidden md:block"
              >
                <ChevronLeft size={48} className="group-hover:-translate-x-2 transition-transform" />
              </button>
            )}

            <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full max-h-[85vh]"
              >
                <Image
                  src={images[selectedIndex]}
                  alt={`Full screen image ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                />
              </motion.div>
            </div>

            {selectedIndex < images.length - 1 && (
              <button 
                onClick={() => setSelectedIndex(selectedIndex + 1)}
                className="absolute right-2 md:right-8 text-white/50 hover:text-white transition-colors z-[60] p-4 group hidden md:block"
              >
                <ChevronRight size={48} className="group-hover:translate-x-2 transition-transform" />
              </button>
            )}

            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3 z-[60]">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === selectedIndex ? 'w-10 bg-white' : 'w-2 bg-white/30 cursor-pointer hover:bg-white/70'}`}
                  onClick={() => setSelectedIndex(idx)}
                />
              ))}
            </div>
            
            {/* Mobile swipe hints */}
            <div className="absolute top-1/2 left-4 md:hidden text-white/30" onClick={() => setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : selectedIndex)}><ChevronLeft size={32}/></div>
            <div className="absolute top-1/2 right-4 md:hidden text-white/30" onClick={() => setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : selectedIndex)}><ChevronRight size={32}/></div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      ) : null}
    </div>
  );
}
