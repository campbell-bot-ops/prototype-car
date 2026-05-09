"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxHeroBackground({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position relative to this container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Move the background down at half the speed of the scroll
  // To create a parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  // Optional: fade out slightly as we scroll down
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden bg-black">
      <motion.div 
        style={{ y, opacity, width: '100%', height: '100%' }}
        className="relative w-full h-full transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
}
