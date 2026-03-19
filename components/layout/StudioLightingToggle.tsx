"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function StudioLightingToggle() {
  const [isStudioLight, setIsStudioLight] = useState(false);

  useEffect(() => {
    if (isStudioLight) {
      document.documentElement.classList.add("studio-lights");
    } else {
      document.documentElement.classList.remove("studio-lights");
    }
  }, [isStudioLight]);

  return (
    <button 
      onClick={() => setIsStudioLight(!isStudioLight)}
      className="fixed bottom-8 right-8 z-[200] w-14 h-14 rounded-full bg-apple-blue shadow-[0_0_30px_rgba(41,151,255,0.4)] hidden md:flex items-center justify-center text-white hover:scale-110 transition-transform"
      title="Toggle Studio Lighting Environment"
    >
      {isStudioLight ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}
