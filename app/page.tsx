import { Hero } from "@/components/home/Hero";
import { TheHook } from "@/components/home/TheHook";
import { IgnitionSoundboard } from "@/components/home/IgnitionSoundboard";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { mockCars } from "@/lib/mockData";
import Link from "next/link";

export default function Home() {
  const featuredCars = mockCars.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Hero />
      <TheHook />
      <IgnitionSoundboard />
      
      {/* Apple Style Stacked Full-Bleed Feature Sections */}
      <FeaturedCars cars={featuredCars} />

      {/* Collection CTA Block */}
      <section className="py-24 md:py-36 px-6 bg-surface relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Decorative ambient glass light orbs */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-apple-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 translate-x-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-apple-blue text-xs font-semibold tracking-[0.3em] uppercase mb-4">Unparalleled Fleet</span>
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-[#1d1d1f] mb-8 leading-none">
            The Full Register.
          </h2>
          <p className="text-[#86868b] font-light max-w-md mb-10 text-base md:text-lg">
            Browse our entire hand-selected roster of exceptional vintage, executive luxury, and high-speed hypercar models.
          </p>
          <Link 
            href="/inventory"
            className="px-10 py-5 bg-[#1d1d1f] text-white hover:bg-black rounded-full font-medium text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 text-center"
          >
            Explore Full Inventory
          </Link>
        </div>
      </section>
    </div>
  );
}
