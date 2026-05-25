import { mockCars } from "@/lib/mockData";
import { Gallery } from "@/components/cars/Gallery";
import { VDPExtensiveSpecs } from "@/components/cars/VDPExtensiveSpecs";
import { AudioIgnition } from "@/components/interaction/AudioIgnition";
import { AudioWalkthrough } from "@/components/interaction/AudioWalkthrough";
import { VDPBookingHeroActions } from "@/components/interaction/VDPBookingHeroActions";
import Image from "next/image";
import ClientVDP from "./ClientVDP";
import { ParallaxHeroBackground } from "@/components/interaction/ParallaxHeroBackground";

// Generate static params for mock data
export function generateStaticParams() {
  return mockCars.map((car) => ({
    id: car.id,
  }));
}

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = mockCars.find(c => c.id === id);
  
  if (!car) {
    return <div className="min-h-screen flex items-center justify-center font-serif text-2xl">Vehicle not found.</div>;
  }

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] pb-24 overflow-x-hidden">
      {/* Apple Pro Immersive Dark Header */}
      <div className="relative h-[100dvh] min-h-[700px] w-full flex flex-col items-center justify-start pt-32 overflow-hidden mb-16 border-b-8 border-white/10">
        <div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
          <h2 className="text-apple-blue font-normal tracking-widest uppercase text-xs md:text-sm mb-4">
            {car.make} • {car.year}
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-[100px] font-light tracking-tighter text-white mb-4 md:mb-6 leading-none px-4 break-words max-w-full">
            {car.model}
          </h1>
          <p className="text-base sm:text-lg md:text-3xl font-light text-[#86868b] max-w-2xl mb-8 px-4">
            {car.condition}. {car.engine}. Absolute Power.
          </p>
          <div className="flex gap-4 mt-2 mb-4 max-w-full overflow-hidden">
            <span className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-apple-blue drop-shadow-md truncate">{formatNaira(car.priceNaira)}</span>
          </div>
          <div className="mt-8 z-30 flex flex-col items-center justify-center gap-4 w-full px-4">
            <VDPBookingHeroActions car={car} />
            <div className="h-[1px] w-24 bg-white/10 my-3" />
            <AudioIgnition engineName={car.engine} />
            <AudioWalkthrough 
              year={car.year} 
              make={car.make} 
              model={car.model} 
              engine={car.engine} 
              transmission={car.transmission} 
              condition={car.condition} 
              keyFeatures={car.keyFeatures} 
            />
          </div>
        </div>

        {/* The Immersive Full Bleed Car Image with Parallax */}
        <ParallaxHeroBackground>
          <Image 
            src={car.images[0]} 
            alt={car.model} 
            fill 
            sizes="100vw"
            priority
            className="object-cover object-center opacity-90 mix-blend-lighten"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent" />
        </ParallaxHeroBackground>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Gallery */}
        <div className="mb-16">
          <Gallery images={car.images} video={car.video} hotspots={car.hotspots} />
        </div>

        <div className="flex flex-col xl:grid xl:grid-cols-3 gap-16">
          {/* Main Content: Extensive Specs & Features (Animated Client Component) */}
          <div className="xl:col-span-2">
            <VDPExtensiveSpecs car={car} />
          </div>

          {/* Sticky Sidebar: Trust & CTAs */}
          <div className="xl:col-span-1 border-t xl:border-t-0 border-white/10 pt-12 xl:pt-0">
            <ClientVDP car={car} />
          </div>
        </div>
      </div>
    </div>
  );
}
