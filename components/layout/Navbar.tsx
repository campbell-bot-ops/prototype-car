"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Use Framer Motion's useScroll for smooth, optimized scroll tracking
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Pages where navbar starts transparent over hero content
  const isHeroPage = pathname === "/" || pathname?.startsWith("/inventory/");

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-[201]"
      >
        {/* Background layer with smooth CSS transition */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            backgroundColor: isOpen
              ? "transparent"
              : isScrolled
                ? "rgba(0, 0, 0, 0.75)"
                : isHeroPage
                  ? "transparent"
                  : "rgba(22, 22, 23, 0.9)",
            backdropFilter: isOpen
              ? "none"
              : isScrolled
                ? "blur(20px) saturate(180%)"
                : isHeroPage
                  ? "none"
                  : "blur(12px)",
            borderBottom: isScrolled && !isOpen
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
          }}
        />

        <div 
          className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between transition-all duration-500"
          style={{ height: isScrolled && !isOpen ? 56 : 72 }}
        >
          {/* Logo */}
          <Link href="/" className="text-white hover:text-white/80 transition-colors font-medium tracking-[0.2em] text-[13px] uppercase">
            Vanguard
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-[11px] font-medium text-white/60 tracking-[0.15em] uppercase items-center">
            {[
              { name: "Showroom", href: "/" },
              { name: "Vehicles", href: "/inventory" },
              { name: "Compare", href: "/compare" },
              { name: "Configure", href: "/configure" },
              { name: "Journal", href: "/journal" },
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative py-2 transition-colors duration-300 group ${
                  pathname === link.href ? "text-white" : "hover:text-white"
                }`}
              >
                <span>{link.name}</span>
                {/* Active indicator */}
                {pathname === link.href && (
                  <motion.span 
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link href="/vault" className="text-white/60 hover:text-white transition-colors flex items-center gap-2 group hidden md:flex">
              <User size={15} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[10px] uppercase tracking-[0.15em] font-medium">Client Vault</span>
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-white p-2 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8 text-white"
          >
            <div className="flex flex-col gap-1 w-full max-w-sm mx-auto">
              {[
                { name: "Showroom", href: "/" },
                { name: "Vehicles", href: "/inventory" },
                { name: "Compare", href: "/compare" },
                { name: "Configure", href: "/configure" },
                { name: "Client Vault", href: "/vault" },
                { name: "Journal", href: "/journal" },
              ].map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between py-4 border-b border-white/[0.06] transition-colors duration-300 ${
                      pathname === link.href ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span className="text-2xl font-light tracking-tight">{link.name}</span>
                    <span className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 text-sm">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
