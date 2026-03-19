import { Car } from './types';

export const mockCars: Car[] = [
  {
    id: "c-001",
    make: "Rolls-Royce",
    model: "Cullinan Black Badge",
    year: 2024,
    priceNaira: 850000000,
    mileage: 120,
    condition: "Brand New",
    engine: "6.75L Twin-Turbo V12",
    transmission: "8-Speed Automatic",
    keyFeatures: ["Shooting Star Headliner", "Bespoke Audio", "Viewing Suite"],
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80",
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1530675706010-bc677ce30ab6?w=1200&q=80"
    ],
    reviews: [
      { id: "cm-001", author: "Chief Adebayo", text: "A truly pristine Cullinan. The delivery was remarkably smooth and the bespoke audio exceeded expectations.", date: "2024-05-10T08:30:00Z", rating: 5 }
    ]
  },
  {
    id: "c-002",
    make: "Mercedes-Benz",
    model: "G63 AMG",
    year: 2022,
    priceNaira: 320000000,
    mileage: 18500,
    condition: "Tokunbo",
    engine: "4.0L V8 Biturbo",
    transmission: "9-Speed Automatic",
    keyFeatures: ["Nappa Leather", "Burmester Surround Sound", "Night Package"],
    images: [
      "https://images.unsplash.com/photo-1530906358829-e84b2769270f?w=1200&q=80",
      "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=1200&q=80",
      "https://images.unsplash.com/photo-1566024164372-0281f1133aa6?w=1200&q=80"
    ],
    reviews: [
      { id: "cm-002", author: "Emeka V.", text: "The G63 is immaculate. Inspection was deeply professional and transparent. Highly recommended.", date: "2024-05-11T14:20:00Z", rating: 5 },
      { id: "cm-003", author: "Femi O.", text: "Beautiful vehicle, slightly higher price than expected but the condition justifies every Naira.", date: "2024-05-12T15:00:00Z", rating: 4 }
    ]
  },
  {
    id: "c-003",
    make: "Lamborghini",
    model: "Urus S",
    year: 2021,
    priceNaira: 450000000,
    mileage: 24000,
    condition: "Nigerian Used",
    engine: "4.0L Twin-Turbo V8",
    transmission: "8-Speed Automatic",
    keyFeatures: ["Carbon Ceramic Brakes", "Panoramic Roof", "Q-Citura Interior"],
    images: [
      "https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?w=1200&q=80",
      "https://images.unsplash.com/photo-1581439645268-ea7bbe6bd091?w=1200&q=80",
      "https://images.unsplash.com/photo-1604705528621-81b2755a320b?w=1200&q=80"
    ],
    reviews: []
  },
  {
    id: "c-004",
    make: "Bentley",
    model: "Continental GT Mulliner",
    year: 2023,
    priceNaira: 600000000,
    mileage: 1500,
    condition: "Tokunbo",
    engine: "6.0L W12",
    transmission: "8-Speed Dual-Clutch",
    keyFeatures: ["Mulliner Driving Specification", "Rotating Display", "Diamond Knurling"],
    images: [
      "https://images.unsplash.com/photo-1611740801331-d8b5d6962822?w=1200&q=80",
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=1200&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&q=80"
    ],
    reviews: []
  },
  {
    id: "c-005",
    make: "Land Rover",
    model: "Range Rover Autobiography",
    year: 2024,
    priceNaira: 420000000,
    mileage: 50,
    condition: "Brand New",
    engine: "4.4L Twin-Turbo V8",
    transmission: "8-Speed Automatic",
    keyFeatures: ["Executive Class Rear Seats", "Meridian Signature Sound", "Deployable Side Steps"],
    images: [
      "https://images.unsplash.com/photo-1530906358829-e84b2769270f?w=1200&q=80",
      "https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?w=1200&q=80",
      "https://images.unsplash.com/photo-1581439645268-ea7bbe6bd091?w=1200&q=80"
    ],
    reviews: [
      { id: "cm-004", author: "Prince K.", text: "The executive rear seats are a marvel. The entire acquisition process through Vanguard Concierge was flawless.", date: "2024-05-12T09:15:00Z", rating: 5 }
    ]
  },
  {
    id: "c-006",
    make: "Porsche",
    model: "911 Turbo S",
    year: 2023,
    priceNaira: 380000000,
    mileage: 5000,
    condition: "Tokunbo",
    engine: "3.8L Twin-Turbo Flat-6",
    transmission: "8-Speed PDK",
    keyFeatures: ["Sport Chrono Package", "Porsche Ceramic Composite Brakes (PCCB)", "Burmester Surround"],
    images: [
      "https://images.unsplash.com/photo-1566024164372-0281f1133aa6?w=1200&q=80",
      "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=1200&q=80",
      "https://images.unsplash.com/photo-1611740801331-d8b5d6962822?w=1200&q=80"
    ],
    reviews: []
  }
];
