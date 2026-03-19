"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-[var(--color-nav)] backdrop-blur-md"
    >
      <div className="max-w-5xl mx-auto px-4 h-11 flex items-center justify-between">
        <Link href="/" className="text-white/80 hover:text-white transition-colors font-semibold tracking-tight text-sm px-2">
          Vanguard
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-[12px] font-medium text-white/80 tracking-wide">
          <Link href="/" className="hover:text-white transition-colors">Showroom</Link>
          <Link href="/inventory" className="hover:text-white transition-colors">Vehicles</Link>
          <Link href="/compare" className="hover:text-white transition-colors">Compare</Link>
          <Link href="/configure" className="text-white hover:text-apple-blue transition-colors">Configure</Link>
          <Link href="#" className="text-white hover:text-apple-blue transition-colors">Finance</Link>
          <Link href="#" className="text-white hover:text-apple-blue transition-colors">Our Story</Link>
          <Link href="/journal" className="text-white hover:text-apple-blue transition-colors">Journal</Link>
          <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <Link href="/vault" className="text-white hover:text-apple-blue transition-colors flex items-center gap-2 group hidden md:flex">
            <User size={18} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Client Vault</span>
          </Link>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden absolute top-11 left-0 w-full bg-[var(--color-nav)] backdrop-blur-md flex flex-col px-8 py-6 gap-6 text-[17px] text-white/80 border-t border-white/10 shadow-2xl"
        >
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors border-b border-white/10 pb-4">Showroom</Link>
          <Link href="/inventory" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors border-b border-white/10 pb-4">Vehicles</Link>
          <Link href="/compare" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors border-b border-white/10 pb-4">Compare</Link>
          <Link href="/configure" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors border-b border-white/10 pb-4">Configure</Link>
          <Link href="/vault" onClick={() => setIsOpen(false)} className="hover:text-apple-blue text-apple-blue font-bold tracking-widest transition-colors border-b border-white/10 pb-4 flex items-center gap-2">
            <User size={16} /> Client Vault
          </Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors border-b border-white/10 pb-4">Finance</Link>
          <Link href="#" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors border-b border-white/10 pb-4">Our Story</Link>
          <Link href="/journal" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors border-b border-white/10 pb-4">Journal</Link>
          <Link href="#contact" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors pb-4">Contact</Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
