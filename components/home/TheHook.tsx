"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Clock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    description: "Every vehicle undergoes a rigorously documented 150-point inspection verifying authenticity, heritage, and condition."
  },
  {
    icon: Zap,
    title: "Frictionless Acquisition",
    description: "We handle importation, clearing, and premium logistics. A seamless white-glove delivery directly to your estate."
  },
  {
    icon: Clock,
    title: "24/7 Digital Salesman",
    description: "Our digital showroom never limits your access. Explore pristine condition media, detailed specifications, and secure your booking anytime."
  }
];

export function TheHook() {
  return (
    <section id="hook" className="py-24 bg-surface bg-[radial-gradient(circle_at_top,rgba(0,113,227,0.03)_0%,transparent_60%)] text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-apple-blue text-[11px] font-semibold tracking-[0.3em] uppercase mb-4">The Vanguard Difference</h2>
          <h3 className="font-light text-4xl md:text-6xl tracking-tight text-[#1d1d1f] mb-6 leading-tight">Engineered for Speed,<br/>Built on Trust.</h3>
          <p className="text-[#86868b] leading-relaxed font-light max-w-2xl mx-auto text-base md:text-lg">
            The standard exotic car purchasing experience is noisy, opaque, and outdated. We constructed a streamlined platform for distinguished buyers who value exclusivity, transparency, and time above all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group bg-white/[0.02] hover:bg-white border border-black/[0.04] hover:border-apple-blue/20 hover:shadow-[0_30px_60px_rgba(0,0,0,0.02)] rounded-[32px] p-8 md:p-10 transition-all duration-700 hover:-translate-y-2 cursor-default flex flex-col justify-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-apple-blue/5 flex items-center justify-center mb-6 group-hover:bg-apple-blue/10 transition-all duration-500 group-hover:scale-110">
                <feature.icon className="text-apple-blue group-hover:scale-105 transition-transform duration-500" size={26} strokeWidth={1.5} />
              </div>
              <h4 className="font-medium text-[#1d1d1f] text-xl mb-4 tracking-tight">{feature.title}</h4>
              <p className="text-[#86868b] text-sm leading-relaxed font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
