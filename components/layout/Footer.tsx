"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h2 className="font-serif text-2xl uppercase tracking-widest text-foreground mb-6">
            Vanguard
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-sm">
            Curating excellence. We provide the most exclusive and meticulously inspected exotic vehicles for the elite in Lagos, Nigeria.
          </p>
        </div>
        
        <div>
          <h3 className="font-serif text-apple-blue mb-6 uppercase tracking-wider text-sm">Contact</h3>
          <ul className="space-y-4 text-sm tracking-wide text-muted">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-apple-blue" />
              15 Victoria Island Drive, Lagos
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-apple-blue" />
              +234 800 VANGUARD
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-apple-blue" />
              sales@vanguardexotics.com
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-serif text-apple-blue mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
          <ul className="space-y-4 text-sm tracking-wide text-muted flex flex-col">
            <Link href="/inventory" className="hover:text-foreground transition-colors w-fit">Vehicles</Link>
            <Link href="/compare" className="hover:text-foreground transition-colors w-fit">Compare Models</Link>
            <Link href="/configure" className="hover:text-foreground transition-colors w-fit">Configure</Link>
            <Link href="#" className="hover:text-foreground transition-colors w-fit">Finance Calculator</Link>
            <Link href="#" className="hover:text-foreground transition-colors w-fit">Our Story</Link>
            <Link href="/journal" className="hover:text-foreground transition-colors w-fit">Journal</Link>
            <Link href="#" className="hover:text-foreground transition-colors w-fit">Terms of Service</Link>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-muted uppercase">
        <p>&copy; {new Date().getFullYear()} Vanguard Exotics. All rights reserved.</p>
        <p>Built for Prestige</p>
      </div>
    </footer>
  );
}
