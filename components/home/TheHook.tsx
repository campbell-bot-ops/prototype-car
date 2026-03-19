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
    <section id="hook" className="py-24 bg-surface text-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-apple-blue text-sm tracking-[0.3em] uppercase mb-4">The Vanguard Difference</h2>
          <h3 className="font-serif text-3xl md:text-5xl mb-6">Engineered for Speed,<br/>Built on Trust.</h3>
          <p className="text-muted leading-relaxed">
            The standard exotic car purchasing experience is noisy, opaque, and outdated. We constructed a streamlined platform for distinguished buyers who value exclusivity, transparency, and time above all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group"
            >
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6 group-hover:border-apple-blue transition-colors duration-500">
                <feature.icon className="text-apple-blue" size={28} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-xl mb-4">{feature.title}</h4>
              <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
