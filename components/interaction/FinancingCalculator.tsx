"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

export function FinancingCalculator({ price }: { price: number }) {
  const [downpaymentPercent, setDownpaymentPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(36);
  
  const downpaymentAmount = price * (downpaymentPercent / 100);
  const loanAmount = price - downpaymentAmount;
  const apr = 0.05; // 5% flat dummy
  const totalInterest = loanAmount * apr * (termMonths / 12);
  const monthlyPayment = (loanAmount + totalInterest) / termMonths;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md">
       <h4 className="font-semibold text-xl md:text-2xl text-white mb-6 flex items-center gap-2">
         <Calculator size={24} className="text-apple-blue" />
         Financing Estimate
       </h4>
       
       <div className="mb-8 p-6 bg-black/20 rounded-2xl border border-white/5 shadow-inner">
         <span className="block text-[10px] text-[#86868b] uppercase tracking-widest font-bold mb-2">Monthly Installment</span>
         <div className="flex items-baseline gap-1 flex-wrap">
           <span className="text-3xl xl:text-4xl text-apple-blue font-bold tracking-tighter drop-shadow-md whitespace-nowrap">
             {formatNaira(monthlyPayment)}
           </span>
           <span className="text-sm font-medium text-[#86868b] whitespace-nowrap">/ mo</span>
         </div>
       </div>

       <div className="space-y-8">
         {/* Downpayment Slider */}
         <div>
           <div className="flex justify-between text-sm text-white mb-3">
             <span className="font-bold text-[#86868b] uppercase tracking-widest text-[10px]">Downpayment</span>
             <span className="font-bold text-xs">{downpaymentPercent}% ({formatNaira(downpaymentAmount)})</span>
           </div>
           <input 
             type="range" 
             min="10" max="80" step="5" 
             value={downpaymentPercent} 
             onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
             className="w-full accent-white h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer flex-1"
             style={{ accentColor: '#ffffff' }}
           />
           <div className="flex justify-between text-[#86868b] text-[9px] font-bold mt-2 uppercase tracking-widest">
             <span>10%</span>
             <span>80%</span>
           </div>
         </div>

         {/* Terms Pills */}
         <div>
           <span className="block font-bold text-[#86868b] uppercase tracking-widest text-[10px] mb-3">Installment Term Length</span>
           <div className="flex justify-between gap-2">
             {[12, 24, 36, 48, 60].map(term => (
               <button 
                 key={term}
                 onClick={() => setTermMonths(term)}
                 className={`flex-1 py-3 rounded-full text-xs font-bold transition-all ${
                   termMonths === term 
                     ? 'bg-white text-black shadow-lg scale-105' 
                     : 'bg-white/10 text-white hover:bg-white/20'
                 }`}
               >
                 {term}M
               </button>
             ))}
           </div>
         </div>
       </div>

       <p className="text-center text-[9px] md:text-[10px] text-[#86868b] tracking-widest mt-8 uppercase font-bold leading-relaxed">
         Subject to 5% flat APR. Excludes local taxes, registration, and delivery fees.
       </p>
    </div>
  );
}
