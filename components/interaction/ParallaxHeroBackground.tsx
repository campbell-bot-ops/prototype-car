"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxHeroBackground({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Track global scroll position — no target ref needed, avoids container positioning issues
  const { scrollY } = useScroll();

  // Parallax: move background down at ~40% of scroll speed
  const y = useTransform(scrollY, [0, 800], [0, 320]);
  // Fade out as user scrolls past the hero
  const opacity = useTransform(scrollY, [0, 600], [1, 0.3]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 w-full h-full transform-gpu will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
