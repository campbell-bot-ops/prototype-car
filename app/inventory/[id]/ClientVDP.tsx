"use client";

import { useState } from "react";
import { BookingModal } from "@/components/interaction/BookingModal";
import { MapPin, ShieldCheck, ExternalLink } from "lucide-react";
import { Car } from "@/lib/types";
import { FinancingCalculator } from "@/components/interaction/FinancingCalculator";

export default function ClientVDP({ car }: { car: Car }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="sticky top-28 space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
        <h4 className="font-normal text-xl md:text-2xl text-white mb-6">Acquire This Vehicle</h4>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="w-full bg-apple-blue text-white rounded-full py-3 md:py-4 text-xs md:text-sm font-light uppercase tracking-widest shadow-lg hover:bg-apple-blue-hover transition-colors mb-4"
        >
          Book Physical Inspection
        </button>
        <button 
          onClick={() => setIsBookingOpen(true)}
          className="w-full bg-transparent border border-white/20 text-white rounded-full py-3 md:py-4 text-xs md:text-sm font-light uppercase tracking-widest hover:bg-white/10 transition-colors"
        >
          Schedule Virtual Tour
        </button>
        <p className="text-center text-[9px] md:text-[10px] text-[#86868b] tracking-widest mt-4 uppercase">
          Routing through Secure Concierge
        </p>
      </div>

      <FinancingCalculator price={car.priceNaira} />

      <div className="space-y-4">
        <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
          <ShieldCheck className="text-apple-blue shrink-0" size={24} />
          <div>
            <span className="block text-sm font-semibold text-white mb-1">Vanguard Verified</span>
            <p className="text-xs text-[#86868b] leading-relaxed">This vehicle has passed our rigorous 150-point inspection verifying its heritage and mechanical integrity.</p>
          </div>
        </div>

        <div className="flex gap-4 items-start p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md cursor-pointer hover:border-apple-blue/50 transition-colors group">
          <MapPin className="text-apple-blue shrink-0" size={24} />
          <div className="flex-1">
            <span className="block text-sm font-semibold text-white flex items-center justify-between mb-1">
              Physical Location <ExternalLink size={14} className="text-[#86868b] group-hover:text-apple-blue transition-colors" />
            </span>
            <p className="text-xs text-[#86868b] leading-relaxed">Currently housed in our Victoria Island showroom. Available for immediate secure viewing.</p>
          </div>
        </div>
      </div>

      <BookingModal car={car} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
