"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BookingModal } from "@/components/interaction/BookingModal";
import { MapPin, ShieldCheck, ExternalLink } from "lucide-react";
import { Car } from "@/lib/types";
import { FinancingCalculator } from "@/components/interaction/FinancingCalculator";

export default function ClientVDP({ car }: { car: Car }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="sticky top-28 space-y-6 md:space-y-8 pb-20 md:pb-0">
        <div className="bg-white/5 border border-white/10 rounded-[24px] md:rounded-[32px] p-6 md:p-8 backdrop-blur-md">
          <h4 className="font-light text-xl md:text-2xl text-white mb-6">Acquire This Vehicle</h4>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="w-full bg-white text-black rounded-full py-4 text-xs md:text-sm font-semibold uppercase tracking-widest shadow-lg hover:bg-white/90 transition-colors mb-4"
          >
            Book Physical Inspection
          </button>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="w-full bg-transparent border border-white/20 text-white rounded-full py-4 text-xs md:text-sm font-light uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            Schedule Virtual Tour
          </button>
          <p className="text-center text-[10px] text-[#86868b] tracking-widest mt-6 uppercase">
            Routing through Secure Concierge
          </p>
        </div>

        <FinancingCalculator price={car.priceNaira} />

        <div className="space-y-4">
          <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <ShieldCheck className="text-white shrink-0 mt-1" size={20} />
            <div>
              <span className="block text-sm font-normal text-white mb-2 uppercase tracking-widest">Vanguard Verified</span>
              <p className="text-xs md:text-sm text-[#86868b] leading-relaxed font-light">This vehicle has passed our rigorous 150-point inspection verifying its heritage and mechanical integrity.</p>
            </div>
          </div>

          <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md cursor-pointer hover:border-white/30 transition-colors group">
            <MapPin className="text-white shrink-0 mt-1" size={20} />
            <div className="flex-1">
              <span className="flex items-center justify-between text-sm font-normal text-white mb-2 uppercase tracking-widest">
                Physical Location <ExternalLink size={14} className="text-[#86868b] group-hover:text-white transition-colors" />
              </span>
              <p className="text-xs md:text-sm text-[#86868b] leading-relaxed font-light">Currently housed in our Victoria Island showroom. Available for immediate secure viewing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer CTA - Portaled to Body for guaranteed fixed positioning */}
      {mounted && createPortal(
        <div className="fixed bottom-0 left-0 right-0 p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] bg-[#0a0a0a]/95 backdrop-blur-3xl border-t border-white/10 md:hidden z-[9999] flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#86868b] uppercase tracking-[0.2em] mb-1 font-medium">Price</span>
            <span className="text-base font-light text-white tracking-tight">
              {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(car.priceNaira)}
            </span>
          </div>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="flex-1 bg-white text-black py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] active:scale-95 transition-transform"
          >
            Book Inspection
          </button>
        </div>,
        document.body
      )}

      <BookingModal car={car} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
