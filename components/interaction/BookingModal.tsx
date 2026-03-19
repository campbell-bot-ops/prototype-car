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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-surface border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl"
          >
            {/* Left Side: Car Info */}
            <div className="md:w-2/5 bg-surface border-r border-border p-8 flex flex-col overflow-hidden relative">
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
            <div className="md:w-3/5 p-8 md:p-12 relative flex flex-col">
              <button onClick={onClose} className="absolute top-6 right-6 text-muted hover:text-foreground">
                <X size={24} />
              </button>

              {isConfirmed ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-apple-blue/20 flex items-center justify-center text-apple-blue mb-6"
                  >
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h4 className="font-serif text-2xl mb-4">Initial Request Secured</h4>
                  <p className="text-muted text-sm max-w-sm mb-8">
                    We are routing your request to our concierge via WhatsApp for immediate confirmation and scheduling.
                  </p>
                  <div className="w-6 h-6 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  <h4 className="font-serif text-2xl mb-8">Scheduling Parameters</h4>
                  <div className="flex gap-4 mb-8">
                    <button 
                      onClick={() => setType("physical")}
                      className={`flex-1 py-3 text-xs tracking-widest uppercase border transition-colors ${
                        type === "physical" ? "border-apple-blue text-apple-blue bg-apple-blue/10" : "border-border text-muted"
                      }`}
                    >
                      Physical
                    </button>
                    <button 
                      onClick={() => setType("virtual")}
                      className={`flex-1 py-3 text-xs tracking-widest uppercase border transition-colors ${
                        type === "virtual" ? "border-apple-blue text-apple-blue bg-apple-blue/10" : "border-border text-muted"
                      }`}
                    >
                      Virtual
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                    <div className="space-y-4">
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" required placeholder="Full Legal Name"
                          value={name} onChange={e => setName(e.target.value)}
                          className="w-full bg-white border border-gray-200 pl-12 pr-4 py-4 text-sm text-black focus:border-black focus:outline-none placeholder:text-gray-400 rounded-lg shadow-sm font-medium"
                        />
                      </div>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="tel" required placeholder="Phone Number (WhatsApp Active)"
                          value={phone} onChange={e => setPhone(e.target.value)}
                          className="w-full bg-white border border-gray-200 pl-12 pr-4 py-4 text-sm text-black focus:border-black focus:outline-none placeholder:text-gray-400 rounded-lg shadow-sm font-medium"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 group">
                          <input 
                            type="date" required
                            value={date} onChange={e => setDate(e.target.value)}
                            className="w-full bg-white border border-gray-200 px-4 py-4 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg cursor-pointer shadow-sm font-medium"
                          />
                        </div>
                        <div className="relative flex-1 group">
                          <input 
                            type="time" required
                            value={time} onChange={e => setTime(e.target.value)}
                            className="w-full bg-white border border-gray-200 px-4 py-4 text-sm text-black focus:border-black focus:outline-none focus:ring-1 focus:ring-black rounded-lg cursor-pointer shadow-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border flex flex-col gap-4 justify-end">
                      <p className="text-[10px] text-muted tracking-widest uppercase text-center">
                        Proceeding will transfer you to our WhatsApp concierge.
                      </p>
                      <button 
                        type="submit"
                        className="w-full bg-foreground text-background py-4 rounded-full font-medium uppercase tracking-widest hover:scale-[1.02] transition-transform"
                      >
                        Confirm Request
                      </button>
                    </div>
                  </form>
                </>
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
