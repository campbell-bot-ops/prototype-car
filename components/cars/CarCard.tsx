"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/types";

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
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex gap-2 z-10">
          <span className="bg-white/80 backdrop-blur-md border border-black/5 px-4 py-1.5 text-[10px] tracking-widest uppercase text-black font-bold rounded-full shadow-sm">
            {car.condition}
          </span>
        </div>
      </Link>

      <div className="p-8 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-apple-blue text-[10px] uppercase tracking-widest font-bold block mb-2">{car.make} • {car.year}</span>
          <h3 className="font-bold text-2xl md:text-3xl tracking-tight text-black leading-none mb-8">{car.model}</h3>

          <div className="space-y-4 mb-8 border-b border-black/5 pb-8">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Mileage</span>
              <span className="text-black font-bold">{car.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400 uppercase tracking-widest text-[9px] font-bold">Engine</span>
              <span className="text-black font-bold">{car.engine}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-2xl text-apple-blue font-bold tracking-tighter leading-none">
            {formatNaira(car.priceNaira)}
          </span>
          <Link
            href={`/inventory/${car.id}`}
            className="text-[10px] uppercase tracking-widest bg-black/5 hover:bg-apple-blue text-black hover:text-white px-5 py-2.5 rounded-full font-bold transition-all"
          >
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
