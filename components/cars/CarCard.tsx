"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/types";
import { Cpu, Zap, ShieldCheck } from "lucide-react";

interface CarCardProps {
  car: Car;
  idx?: number;
}

export function CarCard({ car, idx = 0 }: CarCardProps) {
  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
      className="group relative flex flex-col bg-white border border-black/5 hover:border-black/10 rounded-[32px] overflow-hidden transition-all shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]"
    >
      <Link href={`/inventory/${car.id}`} className="block relative aspect-[4/3] w-full overflow-hidden bg-[#f5f5f7]">
        <Image
          src={car.images[0]}
          alt={`${car.make} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        
        {/* High-Tech X-Ray Telemetry Glass Overlay */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 p-6 flex flex-col justify-between text-white z-20">
          <div>
            <span className="text-apple-blue text-[9px] tracking-[0.25em] uppercase font-bold block mb-1">Telemetry / Mechanics</span>
            <h4 className="font-light text-lg tracking-tight mb-4 border-b border-white/10 pb-2">{car.make} {car.model}</h4>
            
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <span className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Cpu size={11} className="text-apple-blue" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-widest text-white/40">Drivetrain</span>
                  <span className="text-[11px] font-light text-white/90">{car.engine}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Zap size={11} className="text-apple-blue" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-widest text-white/40">Gearbox</span>
                  <span className="text-[11px] font-light text-white/90">{car.transmission}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={11} className="text-apple-blue" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-widest text-white/40">Chassis Quality</span>
                  <span className="text-[11px] font-light text-white/90">150-Point Certified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
            {car.keyFeatures.slice(0, 2).map((feature, fIdx) => (
              <span key={fIdx} className="text-[8px] tracking-wider uppercase bg-white/5 border border-white/10 px-2.5 py-0.75 rounded text-white/70">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-2 z-10">
          <span className="bg-white/80 backdrop-blur-md border border-black/5 px-4 py-1.5 text-[10px] tracking-widest uppercase text-black font-light rounded-full shadow-sm">
            {car.condition}
          </span>
        </div>
      </Link>

      <div className="p-8 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-apple-blue text-[10px] uppercase tracking-widest font-light block mb-2">{car.make} • {car.year}</span>
          <h3 className="font-light text-2xl md:text-3xl tracking-tight text-black leading-none mb-8">{car.model}</h3>

          <div className="space-y-4 mb-8 border-b border-black/5 pb-8">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 uppercase tracking-widest text-[9px] font-normal">Mileage</span>
              <span className="text-black font-light">{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 uppercase tracking-widest text-[9px] font-normal">Engine</span>
              <span className="text-black font-light">{car.engine}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl text-apple-blue font-light tracking-tighter leading-none">
            {formatNaira(car.priceNaira)}
          </span>
          <Link
            href={`/inventory/${car.id}`}
            className="text-[10px] uppercase tracking-widest bg-black/5 hover:bg-apple-blue text-black hover:text-white px-5 py-2.5 rounded-full font-light transition-all"
          >
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
