"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Car } from "@/lib/types";

export function FeaturedCars({ cars }: { cars: Car[] }) {
  // Snappy, fast, fluid Apple-like transition
  const transition: any = { duration: 0.8, ease: "easeOut" };

  return (
    <section className="flex flex-col px-3 py-3 w-full relative gap-6">
      {cars.map((car, idx) => {
        const isDark = idx % 2 !== 0; 
        const bgColor = isDark ? "bg-black" : "bg-background";
        const textColor = isDark ? "text-white" : "text-[#1d1d1f]";
        const subTextColor = isDark ? "text-[#86868b]" : "text-[#1d1d1f]/70";

        return (
          <motion.div 
            key={car.id} 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={transition}
            className={`relative w-full h-[95vh] md:h-[100dvh] ${bgColor} rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col items-center justify-start pt-16 md:pt-24`}
          >
            <div className="relative z-20 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto flex-shrink-0">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: 0.1 }}
                className={`font-bold text-4xl sm:text-5xl md:text-7xl lg:text-[80px] leading-none tracking-tight mb-4 ${textColor}`}
              >
                {car.make} <br className="md:hidden" /> {car.model}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: 0.2 }}
                className={`text-base sm:text-lg md:text-3xl font-medium tracking-tight mb-8 px-4 ${subTextColor}`}
              >
                {car.keyFeatures[0] || 'Unparalleled luxury and performance.'}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...transition, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full px-4 sm:w-auto"
              >
                <Link 
                  href={`/inventory/${car.id}`} 
                  className={`w-full sm:w-auto px-8 py-4 ${isDark ? 'bg-white text-black hover:bg-surface' : 'bg-[#1d1d1f] text-white hover:bg-black'} rounded-full font-semibold text-[15px] md:text-[17px] transition-colors shadow-sm text-center`}
                >
                  Acquire Now
                </Link>
                <Link 
                  href={`/inventory/${car.id}`} 
                  className={`w-full sm:w-auto px-8 py-4 ${isDark ? 'text-white border-white/20 hover:bg-white/10' : 'text-[#1d1d1f] border-black/10 hover:bg-black/5'} border rounded-full font-semibold text-[15px] md:text-[17px] transition-colors text-center`}
                >
                  View Details
                </Link>
              </motion.div>
            </div>

            {/* Massive Full-Width Absolute Image with slight scale reveal */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.05, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, duration: 1.2 }}
              className="absolute bottom-0 left-0 w-full h-[60%] md:h-[75%] lg:h-[80%] pointer-events-none"
            >
              <Image 
                src={car.images[0]} 
                alt={car.model}
                fill
                sizes="100vw"
                className="object-cover object-bottom"
                priority={idx === 0}
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black/10 via-transparent to-black' : 'from-background/10 via-transparent to-background'}`} />
            </motion.div>
          </motion.div>
        );
      })}
    </section>
  );
}
