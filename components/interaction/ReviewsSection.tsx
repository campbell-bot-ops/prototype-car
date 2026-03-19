"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarReview } from "@/lib/types";
import { Star, Send, CheckCircle2 } from "lucide-react";

interface ReviewsSectionProps {
  initialReviews: CarReview[];
}

export function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<CarReview[]>(initialReviews);
  const [newReview, setNewReview] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || !authorName.trim()) return;

    const rev: CarReview = {
      id: `rev-new-${Date.now()}`,
      author: authorName,
      text: newReview,
      date: new Date().toISOString(),
      rating
    };

    setReviews([rev, ...reviews]);
    setNewReview("");
    setRating(5);
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "0.0";

  return (
    <div className="mt-2 text-white">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-full bg-apple-blue/10 flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(41,151,255,0.15)]">
          <Star className="text-apple-blue" size={36} fill="currentColor" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="font-bold text-3xl md:text-[40px] text-white tracking-tighter mb-2">Verified Client Reviews</h3>
          <div className="flex flex-col md:flex-row items-center gap-3">
             <div className="flex items-center gap-1 text-apple-blue">
               {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" className={parseFloat(averageRating) >= star ? 'opacity-100' : parseFloat(averageRating) >= star - 0.5 ? 'opacity-50' : 'opacity-20'} />)}
             </div>
             <span className="text-xs font-bold tracking-widest text-[#86868b] mt-1 md:mt-0">{averageRating} OUT OF 5.0 • {reviews.length} REVIEW{reviews.length !== 1 && 'S'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {/* Reviews List */}
        <div className="w-full">
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white/5 rounded-3xl border border-white/10 border-dashed">
              <Star className="text-white/20 mb-4" size={48} />
              <p className="text-[#86868b] font-medium tracking-wide">No reviews yet. Be the first to review this stunning vehicle.</p>
            </div>
          ) : (
             <div className="space-y-6">
               <AnimatePresence>
                 {reviews.map((rev, idx) => (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     key={rev.id} 
                     className="bg-white/5 p-8 border border-white/10 rounded-3xl group hover:bg-white/10 transition-colors"
                   >
                     <div className="flex justify-between items-start mb-4">
                       <div>
                         <div className="flex items-center gap-2 mb-2">
                           <span className="font-bold text-white text-sm uppercase tracking-widest">{rev.author}</span>
                         </div>
                         <div className="flex text-apple-blue">
                           {[1,2,3,4,5].map(star => <Star key={`rev-${rev.id}-${star}`} size={12} fill="currentColor" className={rev.rating >= star ? 'opacity-100' : 'opacity-20'} />)}
                         </div>
                       </div>
                       <span className="text-xs text-[#86868b] font-medium tracking-tight">
                         {new Date(rev.date).toLocaleDateString('en-NG', {
                           year: 'numeric', month: 'short', day: 'numeric'
                         })}
                       </span>
                     </div>
                     <p className="text-white/80 text-[15px] leading-relaxed font-medium">{rev.text}</p>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          )}
        </div>

        {/* Post a Review Form */}
        <div className="w-full mt-8">
          <form onSubmit={handleSubmit} className="bg-[#0a0a0a] p-8 md:p-12 border border-white/10 rounded-[32px] shadow-2xl">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#86868b] mb-8">Leave a Review</h4>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-3 font-bold">Overall Rating</label>
                <div className="flex gap-2" onMouseLeave={() => setHoverRating(0)}>
                  {[1,2,3,4,5].map(star => (
                    <button 
                      type="button" 
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star size={32} className={`${(hoverRating || rating) >= star ? 'text-apple-blue fill-apple-blue' : 'text-white/20'} transition-colors`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/5 my-6" />

              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 font-bold">Purchaser Name</label>
                <input 
                  type="text" 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-white/5 border border-transparent rounded-2xl px-5 py-4 text-sm text-white focus:border-apple-blue focus:bg-transparent focus:outline-none transition-all placeholder:text-white/20"
                  placeholder="e.g. Chief Adebayo"
                  required
                />
              </div>
              
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2 font-bold">Review Message</label>
                <textarea 
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-transparent rounded-2xl px-5 py-4 text-sm text-white focus:border-apple-blue focus:bg-transparent focus:outline-none transition-all resize-none placeholder:text-white/20"
                  placeholder="Share your Vanguard experience..."
                  required
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-apple-blue text-white py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-[#2986e6] shadow-[0_4_20px_rgba(41,151,255,0.4)] transition-all flex items-center justify-center gap-2 mt-2"
              >
                Post Review <CheckCircle2 size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
