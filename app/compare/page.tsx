"use client";

import { useState } from "react";
import { mockCars } from "@/lib/mockData";
import { Car } from "@/lib/types";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";

export default function ComparePage() {
  const [carAId, setCarAId] = useState<string>(mockCars[0].id);
  const [carBId, setCarBId] = useState<string>(mockCars[1].id);

  const carA = mockCars.find(c => c.id === carAId);
  const carB = mockCars.find(c => c.id === carBId);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const Selector = ({ selectedId, onChange }: { selectedId: string, onChange: (id: string) => void }) => (
    <div className="relative group w-full mb-8">
      <select 
        value={selectedId} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-medium focus:outline-none focus:border-apple-blue transition-colors cursor-pointer"
      >
        {mockCars.map(car => (
          <option key={car.id} value={car.id} className="text-black">
            {car.make} {car.model}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-white transition-colors pointer-events-none" size={20} />
    </div>
  );

  const CarColumn = ({ car, id, onChange }: { car?: Car, id: string, onChange: (id: string) => void }) => {
    if (!car) return null;
    return (
      <div className="flex-1 flex flex-col items-center">
        <Selector selectedId={id} onChange={onChange} />
        
        <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden mb-12 border border-white/5 shadow-2xl">
          <Image 
            src={car.images[0]} 
            alt={car.model} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover" 
          />
        </div>

        <h3 className="text-4xl text-center md:text-5xl font-bold tracking-tighter text-white mb-2">{car.make}</h3>
        <h4 className="text-xl md:text-2xl text-[#86868b] font-medium tracking-tight mb-8 text-center">{car.model}</h4>

        <div className="w-full space-y-6">
          <div className="border-b border-white/10 pb-6 text-center">
            <span className="block text-[10px] uppercase tracking-widest font-bold text-[#86868b] mb-2">Acquisition</span>
            <span className="text-3xl font-bold tracking-tight text-white">{formatNaira(car.priceNaira)}</span>
          </div>

          <div className="border-b border-white/10 pb-6 text-center">
            <span className="block text-[10px] uppercase tracking-widest font-bold text-[#86868b] mb-2">Powertrain</span>
            <span className="text-xl font-bold tracking-tight text-white">{car.engine}</span>
          </div>

          <div className="border-b border-white/10 pb-6 text-center">
            <span className="block text-[10px] uppercase tracking-widest font-bold text-[#86868b] mb-2">Transmission</span>
            <span className="text-xl font-bold tracking-tight text-white">{car.transmission}</span>
          </div>

          <div className="border-b border-white/10 pb-6 text-center">
            <span className="block text-[10px] uppercase tracking-widest font-bold text-[#86868b] mb-2">Odometer</span>
            <span className="text-xl font-bold tracking-tight text-white">{car.mileage.toLocaleString()} km</span>
          </div>

          <div className="border-b border-white/10 pb-6 text-center">
            <span className="block text-[10px] uppercase tracking-widest font-bold text-[#86868b] mb-4">Key Features</span>
            <div className="flex flex-col gap-3">
              {car.keyFeatures.map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <span className="text-sm font-medium text-white/90">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-[80px] font-bold tracking-tighter text-white mb-6 leading-none">
            Compare Models.
          </h1>
          <p className="text-lg md:text-2xl text-[#86868b] font-medium leading-snug">
            Analyze specifications, acquisitions, and pedigree side-by-side to find the ultimate expression of your identity.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-8 lg:gap-16">
          <CarColumn car={carA} id={carAId} onChange={setCarAId} />
          
          <div className="hidden md:flex flex-col justify-center opacity-30">
            <div className="w-[1px] h-[500px] bg-gradient-to-b from-transparent via-white to-transparent" />
          </div>

          <CarColumn car={carB} id={carBId} onChange={setCarBId} />
        </div>
      </div>
    </div>
  );
}
