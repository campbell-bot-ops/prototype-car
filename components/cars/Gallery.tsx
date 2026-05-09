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
    <div className="flex flex-col gap-8 md:gap-12">
      {/* View Mode Controls */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-6 pb-2">
         <button onClick={() => setViewMode("photos")} className={`px-5 py-2 md:px-8 md:py-3 rounded-full text-[9px] md:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-500 ${viewMode === 'photos' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80 border border-white/5'}`}>Photos</button>
         <button onClick={() => setViewMode("video")} className={`px-5 py-2 md:px-8 md:py-3 rounded-full text-[9px] md:text-[11px] font-medium tracking-[0.2em] uppercase flex items-center gap-2 transition-all duration-500 ${viewMode === 'video' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80 border border-white/5'}`}><Play size={10} className="md:w-3 md:h-3"/> Video</button>
         <button onClick={() => setViewMode("360")} className={`px-5 py-2 md:px-8 md:py-3 rounded-full text-[9px] md:text-[11px] font-medium tracking-[0.2em] uppercase flex items-center gap-2 transition-all duration-500 ${viewMode === '360' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)]' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/80 border border-white/5'}`}><Rotate3D size={12} className="md:w-4 md:h-4"/> 360° View</button>
      </div>

      {/* Main Cinematic Viewer */}
      <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#050505] rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/5 group shadow-2xl">
         
         {viewMode === "photos" && (
           <>
             <AnimatePresence mode="wait">
               <motion.div
                 key={inlineIndex}
                 drag="x"
                 dragConstraints={{ left: 0, right: 0 }}
                 onDragEnd={(e, { offset, velocity }) => {
                   const swipe = Math.abs(offset.x) * velocity.x;
                   if (swipe < -10000) {
                     setInlineIndex(i => i < images.length - 1 ? i + 1 : 0);
                   } else if (swipe > 10000) {
                     setInlineIndex(i => i > 0 ? i - 1 : images.length - 1);
                   }
                 }}
                 initial={{ opacity: 0, scale: 1.05 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 className="absolute inset-0 cursor-zoom-in touch-none"
                 onClick={() => setSelectedIndex(inlineIndex)}
               >
                 <Image 
                    src={images[inlineIndex]} 
                    alt="Car" 
                    fill 
                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-out" 
                    priority 
                    sizes="(max-width: 768px) 100vw, 80vw" 
                 />
               </motion.div>
             </AnimatePresence>
             
             {/* Left/Right Overlays */}
             <button onClick={(e) => { e.stopPropagation(); setInlineIndex(i => i > 0 ? i - 1 : images.length - 1); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 hidden md:flex items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black hover:scale-110">
               <ChevronLeft size={24} />
             </button>
             <button onClick={(e) => { e.stopPropagation(); setInlineIndex(i => i < images.length - 1 ? i + 1 : 0); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 hidden md:flex items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black hover:scale-110">
               <ChevronRight size={24} />
             </button>
             
             {/* Expand Icon */}
             <button onClick={() => setSelectedIndex(inlineIndex)} className="absolute top-6 right-6 p-4 rounded-full bg-black/20 text-white backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black">
               <Maximize size={18} />
             </button>

             {/* Image Indicators */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 z-10 px-6 py-3 rounded-full bg-black/20 backdrop-blur-md border border-white/5">
               {images.map((_, idx) => (
                 <button 
                   key={idx} 
                   onClick={(e) => { e.stopPropagation(); setInlineIndex(idx); }}
                   className="p-1"
                 >
                   <div className={`h-1 rounded-full transition-all duration-700 ${idx === inlineIndex ? 'w-10 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/20 hover:bg-white/50'}`} />
                 </button>
               ))}
             </div>
           </>
         )}

         {viewMode === "video" && (
            <div className="absolute inset-0 bg-black">
               <iframe
                 src="https://player.cloudinary.com/embed/?cloud_name=ddm5ca6u8&public_id=pplp_eyxyep&fluid=true&autoplay=true&loop=true&controls=true&muted=true"
                 className="w-full h-full border-none"
                 allow="autoplay; fullscreen"
                 allowFullScreen
               />
            </div>
         )}
         
         {viewMode === "360" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] cursor-grab active:cursor-grabbing">
               <Rotate3D size={64} className="text-white/10 mb-8" />
               <p className="text-white/40 font-light tracking-[0.3em] uppercase text-[10px] md:text-xs">Secure Virtual Studio Loading</p>
               <div className="flex gap-3 mt-8">
                 <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" />
                 <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse delay-150" />
                 <span className="w-1.5 h-1.5 rounded-full bg-white/10 animate-pulse delay-300" />
               </div>
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
              transition={{ duration: 0.6 }}
              className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center"
            >
            {/* Studio Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

            <button 
              onClick={() => setSelectedIndex(null)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-all duration-500 z-[60] bg-white/5 p-4 rounded-full border border-white/10 hover:bg-white hover:text-black"
            >
              <X size={20} />
            </button>

            {selectedIndex > 0 && (
              <button 
                onClick={() => setSelectedIndex(selectedIndex - 1)}
                className="absolute left-8 text-white/20 hover:text-white transition-all duration-500 z-[60] p-6 hidden md:block"
              >
                <ChevronLeft size={64} strokeWidth={1} />
              </button>
            )}

            <div className="relative w-full h-full max-w-[90vw] max-h-[80vh] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -20 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
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
              </AnimatePresence>
            </div>

            {selectedIndex < images.length - 1 && (
              <button 
                onClick={() => setSelectedIndex(selectedIndex + 1)}
                className="absolute right-8 text-white/20 hover:text-white transition-all duration-500 z-[60] p-6 hidden md:block"
              >
                <ChevronRight size={64} strokeWidth={1} />
              </button>
            )}

            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-4 z-[60]">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1 rounded-full transition-all duration-[0.8s] ${idx === selectedIndex ? 'w-12 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'w-3 bg-white/10 cursor-pointer hover:bg-white/40'}`}
                  onClick={() => setSelectedIndex(idx)}
                />
              ))}
            </div>
            
            {/* Mobile Touch Controls */}
            <div className="absolute inset-0 md:hidden flex justify-between pointer-events-none">
              <div className="w-1/3 h-full pointer-events-auto" onClick={() => setSelectedIndex(i => i! > 0 ? i! - 1 : i)} />
              <div className="w-1/3 h-full pointer-events-auto" onClick={() => setSelectedIndex(i => i! < images.length - 1 ? i! + 1 : i)} />
            </div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      ) : null}
    </div>
  );
}
