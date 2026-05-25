"use client";

import { useState } from "react";
import { BookingModal } from "@/components/interaction/BookingModal";
import { Calendar, Video } from "lucide-react";
import { Car } from "@/lib/types";

export function VDPBookingHeroActions({ car }: { car: Car }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2.5 px-8 py-4 w-full sm:w-[320px] rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 bg-white text-black hover:bg-white/90 hover:scale-[1.02] shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
        >
          <Calendar size={13} className="translate-y-[-0.5px]" />
          <span>Book Physical Inspection</span>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center gap-2.5 px-8 py-4 w-full sm:w-[320px] rounded-full text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-500 border border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:scale-[1.02]"
        >
          <Video size={13} className="translate-y-[-0.5px]" />
          <span>Schedule Virtual Tour</span>
        </button>
      </div>
      
      <BookingModal car={car} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
