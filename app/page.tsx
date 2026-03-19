import { Hero } from "@/components/home/Hero";
import { TheHook } from "@/components/home/TheHook";
import { FeaturedCars } from "@/components/home/FeaturedCars";
import { mockCars } from "@/lib/mockData";
import Link from "next/link";

export default function Home() {
  const featuredCars = mockCars.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Hero />
      <TheHook />
      
      {/* Apple Style Stacked Full-Bleed Feature Sections */}
      <FeaturedCars cars={featuredCars} />

      {/* Collection CTA Block */}
      <section className="py-24 md:py-32 px-6 bg-surface flex flex-col items-center justify-center text-center">
        <h2 className="text-[40px] md:text-7xl font-bold tracking-tight text-[#1d1d1f] mb-8 leading-tight">
          The Full Register.
        </h2>
        <Link 
          href="/inventory"
          className="px-8 md:px-10 py-4 md:py-5 bg-foreground text-background rounded-full font-semibold text-base md:text-lg hover:bg-foreground/80 transition-colors"
        >
          View All Vehicles
        </Link>
      </section>
    </div>
  );
}
