"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, MapPin, ShieldCheck, Check, ChevronLeft } from "lucide-react";
import { Car } from "@/lib/types";
import Image from "next/image";

interface BookingModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const curators = [
  {
    id: "valerie",
    name: "Valerie Sterling",
    role: "Vintage Restorations",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&q=80"
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    role: "Exotic Chassis",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop&q=80"
  },
  {
    id: "dominic",
    name: "Dominic Thorne",
    role: "Vanguard Head",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&q=80"
  }
];

const timeSlots = ["10:00 AM", "01:30 PM", "04:30 PM"];

export function BookingModal({ car, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<"physical" | "virtual">("physical");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [selectedCurator, setSelectedCurator] = useState("dominic");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isOpen) {
      setStep(1); // Reset step when closed
    }
    return () => setMounted(false);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);

    const curatorObj = curators.find(c => c.id === selectedCurator);
    const curatorName = curatorObj ? curatorObj.name : "Vanguard Curator";

    const message = `Hi Vanguard, I just scheduled a private ${type} inspection with ${curatorName} for the ${car.make} ${car.model} on ${date} at ${selectedTime}. My name is ${name}.`;
    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      onClose();
      setIsConfirmed(false);
      setName("");
      setPhone("");
      setDate("");
      setSelectedTime("10:00 AM");
      setSelectedCurator("dominic");
      setStep(1);
    }, 2000);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -25 }
  };

  return (
    <>{mounted && typeof document !== "undefined" ? createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-xl p-3 md:p-6"
          >
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="bg-[#0c0c0d] border border-white/5 w-full max-w-5xl md:h-auto md:max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.9)] rounded-[28px] md:rounded-[40px] relative text-white max-h-[95vh]"
            >
              
              {/* Back to Step 1 Button (Only in Step 2 on Mobile) */}
              {step === 2 && (
                <button
                  onClick={() => setStep(1)}
                  className="absolute top-6 left-6 p-2 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all md:hidden border border-white/10 z-50 flex items-center justify-center"
                >
                  <ChevronLeft size={16} />
                </button>
              )}

              {/* Close button */}
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all z-50 border border-white/10"
              >
                <X size={16} />
              </button>

              {/* Left Column: FaceTime Preview / Details Summary */}
              <div className="w-full md:w-[38%] bg-[#080809] border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative shrink-0">
                
                {/* Micro Ambient Glow */}
                <div className="absolute top-0 left-0 w-48 h-48 bg-apple-blue/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full gap-6">
                  <div>
                    <span className="text-apple-blue text-[9px] tracking-[0.3em] uppercase mb-1.5 font-bold block">Acquisition Request</span>
                    <h3 className="text-2xl md:text-3xl font-light tracking-tighter text-white leading-tight">
                      {car.make} <br />
                      <span className="text-white/60 font-serif font-light">{car.model}</span>
                    </h3>
                  </div>

                  {/* FaceTime Viewport or Showroom Preview */}
                  {type === "virtual" ? (
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-black flex flex-col justify-between p-3 select-none">
                      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-10" />
                      
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={car.images[0]}
                          alt={car.model}
                          fill
                          sizes="(max-width: 768px) 100vw, 380px"
                          className="object-cover opacity-45 mix-blend-screen scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                      </div>

                      <div className="relative z-10 flex items-center justify-between">
                        <span className="flex items-center gap-1.2 px-2 py-0.5 rounded-full bg-apple-blue/20 backdrop-blur-md text-apple-blue text-[7px] uppercase tracking-wider font-bold border border-apple-blue/30 animate-pulse">
                          <span className="w-1.2 h-1.2 rounded-full bg-apple-blue shadow-[0_0_8px_#0071e3]" />
                          <span>Facetime HD</span>
                        </span>
                        <span className="text-white/30 text-[7px] font-mono">1080p 60fps</span>
                      </div>

                      <div className="relative z-10 flex justify-between items-end text-[7px] font-mono text-white/50">
                        <span>ISO 400</span>
                        <span>LIVE PREVIEW MOCK</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/5 shadow-inner bg-black flex flex-col justify-end p-4">
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={car.images[0]}
                          alt={car.model}
                          fill
                          sizes="(max-width: 768px) 100vw, 380px"
                          className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      </div>
                      <div className="relative z-10 text-white space-y-0.5">
                        <span className="text-apple-blue text-[8px] uppercase tracking-widest font-bold block">Physical Viewing</span>
                        <span className="text-[10px] text-white/90 font-medium">VIP Showroom Lounge</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-4 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-3 text-[11px] text-white/80">
                      <span className="w-8 h-8 bg-white/5 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                        <MapPin size={12} className="text-apple-blue" />
                      </span>
                      <span className="font-light">VI Showroom, Lagos</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-white/80">
                      <span className="w-8 h-8 bg-white/5 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                        <ShieldCheck size={12} className="text-apple-blue" />
                      </span>
                      <span className="font-light">Bespoke Telemetry Inspection</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right Column: Form Wizard */}
              <div className="w-full md:w-[62%] p-6 md:p-10 relative flex flex-col justify-between min-h-[460px] md:min-h-0">
                
                {isConfirmed ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 rounded-full bg-apple-blue/20 flex items-center justify-center text-apple-blue mb-5 shadow-[0_0_30px_rgba(0,113,227,0.3)]"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h4 className="font-serif text-2xl mb-2 text-white font-light">Request Scheduled</h4>
                    <p className="text-white/50 text-[11px] max-w-xs mb-6 leading-relaxed font-light">
                      Routing curation parameters to our private VIP concierge stream on WhatsApp.
                    </p>
                    <div className="w-6 h-6 border-2 border-apple-blue border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full flex-grow">
                    
                    {/* Header with Step Tracker */}
                    <div className="mb-6 pt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`h-1 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-apple-blue' : 'w-4 bg-white/10'}`} />
                        <div className={`h-1 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-apple-blue' : 'w-4 bg-white/10'}`} />
                      </div>
                      <h4 className="text-2xl font-light tracking-tight text-white leading-tight">
                        {step === 1 ? "Private Specialist" : "Select Schedule"}
                      </h4>
                      <p className="text-white/40 text-[11px] mt-1 font-light">
                        {step === 1 ? "Choose your concierge viewing expert." : "Secure your private showroom slot."}
                      </p>
                    </div>

                    {/* Step View Container */}
                    <div className="flex-grow min-h-[220px] md:min-h-0 flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {step === 1 ? (
                          <motion.div
                            key="step1"
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="space-y-5"
                          >
                            {/* Inspection Type Selector */}
                            <div className="space-y-2">
                              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block ml-1">Viewing Mode</label>
                              <div className="flex gap-2 bg-white/5 p-1 rounded-full w-full">
                                <button 
                                  type="button"
                                  onClick={() => setType("physical")}
                                  className={`flex-1 py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 ${
                                    type === "physical" 
                                      ? "bg-white text-black shadow-md" 
                                      : "text-white/40 hover:text-white/80"
                                  }`}
                                >
                                  Showroom
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => setType("virtual")}
                                  className={`flex-1 py-2.5 text-[9px] tracking-[0.2em] uppercase font-bold rounded-full transition-all duration-300 ${
                                    type === "virtual" 
                                      ? "bg-white text-black shadow-md" 
                                      : "text-white/40 hover:text-white/80"
                                  }`}
                                >
                                  FaceTime
                                </button>
                              </div>
                            </div>

                            {/* Curator Selector Grid */}
                            <div className="space-y-2">
                              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block ml-1">Assigned Curator</label>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {curators.map((c) => (
                                  <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => setSelectedCurator(c.id)}
                                    className={`flex items-center gap-2.5 p-2.5 text-left rounded-xl border transition-all duration-300 ${
                                      selectedCurator === c.id
                                        ? "bg-white/10 border-apple-blue shadow-[0_0_12px_rgba(0,113,227,0.2)]"
                                        : "bg-white/5 border-white/5 hover:border-white/15"
                                    }`}
                                  >
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/10">
                                      <Image
                                        src={c.avatar}
                                        alt={c.name}
                                        fill
                                        sizes="32px"
                                        className="object-cover"
                                      />
                                    </div>
                                    <div className="overflow-hidden">
                                      <span className="block text-[10px] font-semibold tracking-tight text-white truncate">{c.name.split(' ')[0]}</span>
                                      <span className="block text-[7px] text-white/40 uppercase tracking-wider truncate">{c.role}</span>
                                    </div>
                                    {selectedCurator === c.id && (
                                      <div className="w-3 h-3 rounded-full bg-apple-blue flex items-center justify-center shrink-0 ml-auto shadow-[0_0_5px_#0071e3]">
                                        <Check size={6} className="text-white" strokeWidth={3} />
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="step2"
                            variants={stepVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                            className="space-y-5"
                          >
                            {/* Date & Time Blocks */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold ml-1">Preferred Date</label>
                                <div className="relative group">
                                  <Calendar size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none group-focus-within:text-apple-blue" />
                                  <input 
                                    type="date" required
                                    value={date} onChange={e => setDate(e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 group-hover:border-white/15 focus:border-apple-blue focus:outline-none rounded-xl pl-10 pr-3 py-3 text-[12px] text-white font-medium cursor-pointer transition-all [color-scheme:dark]"
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold ml-1">Preferred Time Block</label>
                                <div className="flex gap-1.5">
                                  {timeSlots.map((slot) => (
                                    <button
                                      key={slot}
                                      type="button"
                                      onClick={() => setSelectedTime(slot)}
                                      className={`flex-1 py-3 text-[8px] uppercase tracking-widest font-bold rounded-xl border transition-all duration-300 ${
                                        selectedTime === slot
                                          ? "bg-apple-blue/20 border-apple-blue text-white shadow-[0_0_10px_rgba(0,113,227,0.2)]"
                                          : "bg-white/5 border-white/5 hover:border-white/15 text-white/40 hover:text-white"
                                      }`}
                                    >
                                      {slot.split(' ')[0]} <span className="text-[6px] opacity-60 ml-0.5">{slot.split(' ')[1]}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Legal Name & Phone Inputs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="relative group">
                                <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none group-focus-within:text-apple-blue" />
                                <input 
                                  type="text" required placeholder="Full Legal Name"
                                  value={name} onChange={e => setName(e.target.value)}
                                  className="w-full bg-white/5 border border-white/5 group-hover:border-white/15 focus:border-apple-blue focus:outline-none rounded-xl pl-10 pr-3 py-3.5 text-[12px] text-white font-medium placeholder:text-white/20 transition-all"
                                />
                              </div>
                              <div className="relative group">
                                <Phone size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none group-focus-within:text-apple-blue" />
                                <input 
                                  type="tel" required placeholder="WhatsApp Enabled Phone"
                                  value={phone} onChange={e => setPhone(e.target.value)}
                                  className="w-full bg-white/5 border border-white/5 group-hover:border-white/15 focus:border-apple-blue focus:outline-none rounded-xl pl-10 pr-3 py-3.5 text-[12px] text-white font-medium placeholder:text-white/20 transition-all"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Actions Panel */}
                    <div className="mt-8 flex flex-col gap-3 flex-shrink-0">
                      <p className="text-[7.5px] text-white/30 tracking-[0.2em] uppercase text-center leading-relaxed font-light">
                        Reservations are validated and assigned directly within 15 minutes.
                      </p>
                      
                      {step === 1 ? (
                        <button 
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full bg-white text-black py-3.5 rounded-full font-bold uppercase tracking-[0.25em] text-[10px] hover:bg-white/95 transition-all shadow-md cursor-pointer"
                        >
                          Continue to Schedule
                        </button>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <button 
                            type="submit"
                            className="w-full bg-white text-black py-3.5 rounded-full font-bold uppercase tracking-[0.25em] text-[10px] hover:bg-white/95 transition-all shadow-md cursor-pointer"
                          >
                            Confirm Reservation
                          </button>
                          <button 
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full bg-transparent hover:bg-white/5 text-white/40 hover:text-white py-2 rounded-full font-bold uppercase tracking-[0.2em] text-[8px] transition-all cursor-pointer hidden md:block"
                          >
                            Back to Specialist
                          </button>
                        </div>
                      )}
                    </div>

                  </form>
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
