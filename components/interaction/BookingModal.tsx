"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, MapPin, Video } from "lucide-react";
import { Car } from "@/lib/types";
import Image from "next/image";

interface BookingModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ car, isOpen, onClose }: BookingModalProps) {
  const [type, setType] = useState<"physical" | "virtual">("physical");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);

    const message = `Hi Vanguard, I just booked a ${type} inspection for the ${car.make} ${car.model} on ${date} at ${time}. My name is ${name}.`;
    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      onClose();
      setIsConfirmed(false);
      setName("");
      setPhone("");
      setDate("");
      setTime("");
    }, 2000);
  };

  return (
    <>{typeof document !== "undefined" ? createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4"
          >
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="bg-surface w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl md:rounded-[40px] relative z-[10000]"
          >
            {/* Left Side: Car Info */}
            <div className="hidden md:flex md:w-2/5 bg-surface border-r border-border p-8 flex-col overflow-hidden relative">
              <div className="flex-1 flex flex-col justify-end">
                <span className="text-apple-blue text-[10px] tracking-widest uppercase mb-2 font-medium">Acquisition Request</span>
                <h3 className="font-serif text-3xl text-foreground mb-4">{car.make} <br/>{car.model}</h3>
                <p className="text-muted text-sm mb-12">Secure your private viewing. Our acquisition concierge will prepare the vehicle and appropriate refreshments.</p>
                
                <div className="space-y-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-4 text-sm text-foreground">
                     <span className="w-10 h-10 bg-background rounded-full border border-border shadow-sm flex items-center justify-center shrink-0">
                       <MapPin size={16} className="text-apple-blue" />
                     </span>
                     <span className="font-medium">Vanguard Showroom, Victoria Island</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-foreground">
                     <span className="w-10 h-10 bg-background rounded-full border border-border shadow-sm flex items-center justify-center shrink-0">
                       <Video size={16} className="text-apple-blue" />
                     </span>
                     <span className="font-medium">High-Fidelity Virtual Walkaround</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-3/5 p-6 md:p-12 relative flex flex-col min-h-full">
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 md:bg-transparent text-muted hover:text-foreground z-50"
              >
                <X size={28} />
              </button>

              {isConfirmed ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 rounded-full bg-apple-blue/20 flex items-center justify-center text-apple-blue mb-8"
                  >
                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h4 className="font-serif text-3xl mb-4">Request Secured</h4>
                  <p className="text-muted text-sm max-w-sm mb-10 leading-relaxed">
                    We are routing your parameters to our elite concierge via WhatsApp for immediate white-glove scheduling.
                  </p>
                  <div className="w-8 h-8 border-3 border-apple-blue border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="mb-10 pt-4">
                    <span className="text-apple-blue text-[10px] tracking-[0.3em] uppercase mb-2 block font-bold md:hidden">Acquisition Request</span>
                    <h4 className="font-serif text-3xl md:text-4xl text-foreground">Scheduling</h4>
                    <p className="text-muted text-sm mt-2 font-light">Prepare for an unparalleled experience.</p>
                  </div>

                  <div className="flex gap-3 mb-10">
                    <button 
                      onClick={() => setType("physical")}
                      className={`flex-1 py-4 text-[10px] tracking-[0.2em] uppercase font-bold border transition-all ${
                        type === "physical" ? "border-apple-blue text-apple-blue bg-apple-blue/5 shadow-[0_0_20px_rgba(0,122,255,0.1)]" : "border-border text-muted"
                      }`}
                    >
                      Physical
                    </button>
                    <button 
                      onClick={() => setType("virtual")}
                      className={`flex-1 py-4 text-[10px] tracking-[0.2em] uppercase font-bold border transition-all ${
                        type === "virtual" ? "border-apple-blue text-apple-blue bg-apple-blue/5 shadow-[0_0_20px_rgba(0,122,255,0.1)]" : "border-border text-muted"
                      }`}
                    >
                      Virtual
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <div className="space-y-5">
                      <div className="relative group">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-apple-blue" />
                        <input 
                          type="text" required placeholder="Full Legal Name"
                          value={name} onChange={e => setName(e.target.value)}
                          className="w-full bg-white border border-border pl-12 pr-4 py-5 text-[15px] text-black focus:border-apple-blue focus:outline-none placeholder:text-muted/60 rounded-xl transition-all font-medium"
                        />
                      </div>
                      <div className="relative group">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-apple-blue" />
                        <input 
                          type="tel" required placeholder="WhatsApp Enabled Phone"
                          value={phone} onChange={e => setPhone(e.target.value)}
                          className="w-full bg-white border border-border pl-12 pr-4 py-5 text-[15px] text-black focus:border-apple-blue focus:outline-none placeholder:text-muted/60 rounded-xl transition-all font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Preferred Date</label>
                           <input 
                             type="date" required
                             value={date} onChange={e => setDate(e.target.value)}
                             className="w-full bg-white border border-border px-4 py-5 text-[15px] text-black focus:border-apple-blue focus:outline-none rounded-xl cursor-pointer font-medium"
                           />
                        </div>
                        <div className="flex flex-col gap-2">
                           <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Preferred Time</label>
                           <input 
                             type="time" required
                             value={time} onChange={e => setTime(e.target.value)}
                             className="w-full bg-white border border-border px-4 py-5 text-[15px] text-black focus:border-apple-blue focus:outline-none rounded-xl cursor-pointer font-medium"
                           />
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pb-8 flex flex-col gap-6">
                      <p className="text-[9px] text-muted tracking-[0.2em] uppercase text-center leading-relaxed">
                        Secure connection via end-to-end encrypted WhatsApp concierge.
                      </p>
                      <button 
                        type="submit"
                        className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-black/90 active:scale-[0.98] transition-all shadow-2xl"
                      >
                        Confirm Request
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>,
      document.body
    ) : null}</>
  );
}
