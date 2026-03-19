"use client";

import { Car } from "@/lib/types";
import { CarCard } from "./CarCard";

interface CarGridProps {
  cars: Car[];
}

export function CarGrid({ cars }: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div className="py-24 text-center text-muted">
        <p className="font-serif text-2xl tracking-wide">No vehicles found.</p>
        <p className="text-sm mt-2">Adjust your filters to discover our collection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car, idx) => (
        <CarCard key={car.id} car={car} idx={idx} />
      ))}
    </div>
  );
}
