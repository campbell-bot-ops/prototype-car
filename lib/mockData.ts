import { Car } from './types';

export const mockCars: Car[] = [
  {
    id: "c-007",
    make: "Mercedes-Benz",
    model: "GLC300",
    year: 2024,
    priceNaira: 150000000,
    mileage: 150,
    condition: "Brand New",
    engine: "2.0L Inline-4 Turbo",
    transmission: "9-Speed Automatic",
    keyFeatures: ["MBUX Infotainment System", "Panoramic Sunroof", "Burmester Surround Sound"],
    images: [
      "https://res.cloudinary.com/ddm5ca6u8/image/upload/v1778287162/imagem_mnsdmd.png",
      "https://res.cloudinary.com/ddm5ca6u8/image/upload/v1778287163/imagem2_orx6jh.png",
      "https://res.cloudinary.com/ddm5ca6u8/image/upload/v1778287347/imagem3_j7ywf2.png"
    ],
    video: "https://res.cloudinary.com/ddm5ca6u8/video/upload/newhh_tgmqr0.mp4",
    reviews: [],
    hotspots: [
      { x: 38, y: 70, label: "Digital Light Headlamps", desc: "1.3 million pixels per headlamp projecting warnings directly onto the tarmac." },
      { x: 55, y: 35, label: "Acoustic Glasshouse", desc: "Acoustically insulated windshield and side panes reducing cabin noise to library levels." },
      { x: 20, y: 75, label: "48V Mild-Hybrid Grille", desc: "Active shutters optimize thermal efficiency for the 2.0L turbocharged inline-4." }
    ]
  },
  {
    id: "c-008",
    make: "Jeep",
    model: "Cherokee Pioneer (Chrysler)",
    year: 1989,
    priceNaira: 55000000,
    mileage: 42500,
    condition: "Tokunbo",
    engine: "4.0L PowerTech Inline-6",
    transmission: "4-Speed Automatic",
    keyFeatures: ["Heritage Plaid Interior", "Selec-Trac 4WD System", "Restored Vintage Wood-Grain Panel", "Retro-Modern Bluetooth Audio", "Chrome Exterior Accent Package"],
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
      "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1200&q=80"
    ],
    video: "https://res.cloudinary.com/ddm5ca6u8/video/upload/jeep_dgk4g9.mp4",
    reviews: [
      { id: "cm-005", author: "Alhaji Bello", text: "A nostalgic masterpiece. The restoration quality of the wood-grain dash and Selec-Trac system is pristine.", date: "2024-05-15T10:45:00Z", rating: 5 }
    ],
    hotspots: [
      { x: 28, y: 65, label: "Heritage Grille", desc: "Iconic Chrysler 8-slot chrome grille restored to factory catalog specs." },
      { x: 52, y: 48, label: "Tan Plaid Weave", desc: "Custom hand-stitched interior reproducing 1989 Pioneer cabin heritage." },
      { x: 82, y: 72, label: "Pioneer Chrome Package", desc: "Hand-polished original AMC-era badges and side moulding inserts." }
    ]
  },
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
    ],
    hotspots: [
      { x: 35, y: 60, label: "Spirit of Ecstasy", desc: "Solid sterling silver Spirit of Ecstasy retractable bonnet sculpture." },
      { x: 48, y: 82, label: "Magic Carpet Ride", desc: "Self-levelling air suspension performing millions of damping calculations per second." },
      { x: 75, y: 45, label: "Private Suite", desc: "Immersive seating with integrated champagne chiller and bespoke whiskey decanters." }
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
