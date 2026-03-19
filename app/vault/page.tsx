"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockCars } from "@/lib/mockData";
import { ShieldCheck, Wallet, Calendar, MessageSquare, Car, LogOut, Download, MapPin, Wrench, Send } from "lucide-react";
import Image from "next/image";

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState<"garage" | "concierge" | "service">("garage");
  
  // Dummy Client Data
  const clientData = {
    name: "Chief Adebayo",
    memberSince: "2019",
    totalAssetValue: 1250000000,
    ownedCars: [mockCars[0], mockCars[4]], // Cullinan and Range Rover
  };

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f7] pt-24 pb-32">
       <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Sidebar / Profile Info */}
          <div className="lg:col-span-3 flex flex-col gap-8">
             <motion.div 
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
               className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[32px] overflow-hidden relative shadow-2xl"
             >
                <div className="h-24 bg-gradient-to-br from-apple-blue/20 to-transparent absolute top-0 left-0 right-0 -z-0" />
                <div className="relative z-10 flex flex-col items-start pt-6">
                  <div className="w-20 h-20 rounded-full bg-apple-blue/10 flex items-center justify-center border border-apple-blue/30 mb-6 shadow-[#2997ff]/20 shadow-xl">
                    <span className="text-3xl font-bold text-apple-blue">CA</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter text-white mb-1 leading-none">Chief<br/>Adebayo</h2>
                  <div className="flex items-center gap-2 mt-4 text-apple-blue bg-apple-blue/10 px-3 py-1.5 rounded-full mb-8">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Verified Collector</span>
                  </div>
                  
                  <div className="space-y-4 w-full">
                    <div className="flex justify-between items-end border-b border-white/5 pb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#86868b]">Member Since</span>
                      <span className="text-xs font-bold text-white">{clientData.memberSince}</span>
                    </div>
                    <div className="flex justify-between items-end border-b border-white/5 pb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#86868b]">Total Assets</span>
                      <span className="text-xs font-bold text-white">{formatNaira(clientData.totalAssetValue)}</span>
                    </div>
                  </div>
                </div>
             </motion.div>

             {/* Navigation Tabs */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
               className="flex flex-col gap-2"
             >
                <button onClick={() => setActiveTab('garage')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'garage' ? 'bg-apple-blue text-white shadow-[#2997ff]/20 shadow-lg' : 'hover:bg-white/5 text-[#86868b] hover:text-white'}`}>
                  <Car size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Digital Garage</span>
                </button>
                <button onClick={() => setActiveTab('concierge')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'concierge' ? 'bg-apple-blue text-white shadow-[#2997ff]/20 shadow-lg' : 'hover:bg-white/5 text-[#86868b] hover:text-white'}`}>
                  <MessageSquare size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Concierge Chat</span>
                </button>
                <button onClick={() => setActiveTab('service')} className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'service' ? 'bg-apple-blue text-white shadow-[#2997ff]/20 shadow-lg' : 'hover:bg-white/5 text-[#86868b] hover:text-white'}`}>
                  <Wrench size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Service History</span>
                </button>
                
                <button className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all mt-4 hover:bg-white/5 text-red-400 hover:text-red-300`}>
                  <LogOut size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Secure Logout</span>
                </button>
             </motion.div>
          </div>

          {/* Main Dashboard Area */}
          <div className="lg:col-span-9 flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === 'garage' && (
                <motion.div key="garage" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col h-full">
                   <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
                     <div>
                       <h1 className="text-[10px] text-apple-blue uppercase tracking-widest font-bold mb-2">Portfolio Overview</h1>
                       <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-none">Digital Garage.</h2>
                     </div>
                     <button className="hidden md:flex items-center gap-2 border border-white/20 hover:border-white/40 px-5 py-3 rounded-full transition-colors text-xs font-bold tracking-widest uppercase">
                       <Download size={14} /> Export Document
                     </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {clientData.ownedCars.map((car, idx) => (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 * idx }}
                         key={car.id} 
                         className="bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden group hover:border-white/30 transition-colors cursor-pointer flex flex-col"
                       >
                         <div className="relative h-64 w-full overflow-hidden">
                           <Image src={car.images[0]} alt={car.model} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest">
                             {car.year} Model
                           </div>
                         </div>
                         <div className="p-8 flex flex-col flex-1 justify-between">
                            <div>
                              <span className="text-apple-blue text-[10px] uppercase tracking-widest font-bold">{car.make}</span>
                              <h3 className="text-2xl font-bold text-white tracking-tight leading-none mt-2 mb-6">{car.model}</h3>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-[#86868b] font-medium">Acquisition Date</span>
                                  <span className="text-white font-bold">10 May 2024</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-[#86868b] font-medium">Original Invoice</span>
                                  <span className="text-white font-bold">{formatNaira(car.priceNaira)}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-[#86868b] font-medium">Current Mileage</span>
                                  <span className="text-white font-bold">345 km</span>
                                </div>
                              </div>
                            </div>
                            
                            <button className="w-full mt-8 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl text-xs uppercase tracking-widest font-bold transition-all text-center">
                              View Documentation
                            </button>
                         </div>
                       </motion.div>
                     ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'concierge' && (
                <motion.div key="concierge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col h-full">
                   <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
                     <div>
                       <h1 className="text-[10px] text-apple-blue uppercase tracking-widest font-bold mb-2">Direct Line</h1>
                       <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-none">Alexander (Concierge).</h2>
                     </div>
                     <div className="flex items-center gap-3">
                       <span className="relative flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                       </span>
                       <span className="text-[10px] uppercase tracking-widest font-bold text-[#86868b]">Online Now</span>
                     </div>
                   </div>

                   <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden flex flex-col min-h-[500px]">
                      <div className="flex-1 p-8 overflow-y-auto space-y-6">
                         <div className="flex items-end gap-4 max-w-[80%]">
                           <div className="w-8 h-8 rounded-full bg-apple-blue/20 flex items-center justify-center border border-apple-blue text-apple-blue text-[10px] font-bold">AL</div>
                           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-bl-sm">
                             <p className="text-sm font-medium leading-relaxed text-white/90">Good morning Chief Adebayo. Your Cullinan is due for its first 1,000km routine check next Tuesday. Shall I dispatch a driver to your Victoria Island residence to handle the pickup?</p>
                             <span className="text-[10px] text-[#86868b] mt-3 block font-bold">10:42 AM</span>
                           </div>
                         </div>
                         
                         <div className="flex items-end gap-4 max-w-[80%] ml-auto justify-end">
                           <div className="bg-apple-blue p-5 rounded-2xl rounded-br-sm text-white">
                             <p className="text-sm font-medium leading-relaxed">Morning Alexander. Yes, that works. Send him at 9 AM. I also want you to source the new G63 AMG Edition 1 for my wife.</p>
                             <span className="text-[10px] text-white/50 mt-3 block font-bold text-right">11:05 AM</span>
                           </div>
                         </div>

                         <div className="flex items-end gap-4 max-w-[80%]">
                           <div className="w-8 h-8 rounded-full bg-apple-blue/20 flex items-center justify-center border border-apple-blue text-apple-blue text-[10px] font-bold">AL</div>
                           <div className="bg-white/5 border border-white/10 p-5 rounded-2xl rounded-bl-sm">
                             <p className="text-sm font-medium leading-relaxed text-white/90">Understood perfectly. I will have the pickup scheduled for Tuesday at 9 AM. I am already securing an allocation for the G63 Edition 1. I will send you the build configurations tonight.</p>
                             <span className="text-[10px] text-[#86868b] mt-3 block font-bold">11:12 AM</span>
                           </div>
                         </div>
                      </div>
                      
                      <div className="p-6 border-t border-white/10 bg-black">
                         <div className="relative">
                           <input type="text" placeholder="Message your concierge..." className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm focus:outline-none focus:border-apple-blue transition-colors pr-16 text-white placeholder:text-white/30" />
                           <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-apple-blue rounded-full flex items-center justify-center text-white hover:bg-[#2997ff]/80 transition-colors">
                             <Send size={16} className="-ml-1" />
                           </button>
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'service' && (
                <motion.div key="service" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col h-full">
                   <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
                     <div>
                       <h1 className="text-[10px] text-apple-blue uppercase tracking-widest font-bold mb-2">Automotive Care</h1>
                       <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white leading-none">Service History.</h2>
                     </div>
                   </div>

                   <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-8 md:p-12 overflow-hidden flex flex-col justify-center items-center text-center min-h-[400px]">
                     <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                       <Calendar size={32} className="text-white/30" />
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-4">No Previous Service Records</h3>
                     <p className="text-[#86868b] font-medium max-w-sm">All your vehicles are beautifully maintained and up to date. Your first scheduled maintenance is approaching next week.</p>
                     
                     <button onClick={() => setActiveTab('concierge')} className="mt-8 bg-apple-blue text-white py-3 px-8 rounded-full text-xs font-bold uppercase tracking-widest shadow-[#2997ff]/20 shadow-lg hover:scale-105 transition-transform">
                       Schedule via Concierge
                     </button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
       </div>
    </div>
  );
}
