"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      category: "EVENTS",
      title: "The Sepang Grand Prix Circuit Allocation",
      excerpt: "Vanguard clients push their limits on the legendary Malaysian circuit under the guidance of former F1 instructors.",
      image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=2000",
      date: "14 May 2024",
      size: "large"
    },
    {
      id: 2,
      category: "CULTURE",
      title: "Watchmaking & Hypercars: The Synergy",
      excerpt: "Exploring the mechanical overlap between Richard Mille's latest tourbillon and the W16 engine.",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200",
      date: "02 May 2024",
      size: "small"
    },
    {
      id: 3,
      category: "CURATION",
      title: "Procuring the Unobtainable",
      excerpt: "How Vanguard's concierge network secured the highly coveted Pagani Mistral for a local collector.",
      image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1200",
      date: "28 Apr 2024",
      size: "small"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-32">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="mb-20 md:mb-32 max-w-4xl"
        >
          <span className="text-apple-blue font-bold tracking-widest uppercase text-xs mb-6 block">Vanguard Editorial</span>
          <h1 className="text-6xl md:text-[100px] lg:text-[120px] font-bold tracking-tighter leading-none mb-8">The Journal.</h1>
          <p className="text-xl md:text-3xl text-[#86868b] font-medium leading-snug">
            Curated narratives exploring automotive culture, ultra-rare allocations, and exclusive Vanguard client events.
          </p>
        </motion.div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
           {/* Featured Large Article */}
           <motion.div 
             initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
             className="md:col-span-2 lg:col-span-8 group cursor-pointer"
           >
             <div className="relative w-full h-[50vh] md:h-[70vh] rounded-[32px] overflow-hidden mb-8">
               <Image src={articles[0].image} alt="Journal Image" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
             </div>
             <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest mb-4">
               <span className="text-apple-blue">{articles[0].category}</span>
               <span className="text-[#86868b]">{articles[0].date}</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 group-hover:text-apple-blue transition-colors leading-none">{articles[0].title}</h2>
             <p className="text-[#86868b] text-lg font-medium max-w-2xl mb-6">{articles[0].excerpt}</p>
             <Link href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-apple-blue transition-colors">
               Read Editorial <ArrowRight size={14} />
             </Link>
           </motion.div>

           {/* Small Articles Column */}
           <div className="md:col-span-1 lg:col-span-4 flex flex-col gap-12 lg:gap-16 pt-8 lg:pt-0 border-t md:border-t-0 border-white/10 md:pl-8 lg:pl-12 md:border-l">
             {articles.slice(1).map((article, idx) => (
               <motion.div 
                 key={article.id}
                 initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 * idx }}
                 className="group cursor-pointer flex flex-col"
               >
                 <div className="relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden mb-6">
                   <Image src={article.image} alt="Journal Image" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                 </div>
                 <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest mb-3">
                   <span className="text-apple-blue">{article.category}</span>
                   <span className="text-[#86868b]">{article.date}</span>
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-apple-blue transition-colors leading-snug">{article.title}</h3>
                 <p className="text-[#86868b] text-sm font-medium mb-4">{article.excerpt}</p>
                 <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white hover:text-apple-blue transition-colors">
                   Read <ArrowRight size={12} />
                 </Link>
               </motion.div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
