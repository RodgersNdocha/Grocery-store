import { ReactNode } from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface DealOfTheWeekProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function DealOfTheWeek({ products, onAddToCart }: DealOfTheWeekProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-serif text-[#815e4b] tracking-widest uppercase">
          Deal Of The Week
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
         {products.slice(3, 7).map((product, index) => {
           let oldPrice = (product.price * 1.5).toFixed(0);
           if (index === 0) oldPrice = "1550";
           if (index === 1) oldPrice = "1150";
           if (index === 2) oldPrice = "1950";
           if (index === 3) oldPrice = "2350";

           return (
             <div 
               key={product.id} 
               className="bg-white p-4 rounded-sm shadow-[0_12px_36px_-6px_rgba(0,0,0,0.18)] flex flex-col items-center text-center group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.22)]"
             >
               <div className="relative w-full aspect-square overflow-hidden mb-6 bg-[#FAF8F5]">
                 {index === 0 && (
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white text-[#815E4B] px-6 py-1 text-[15px] font-serif italic z-10 rounded-b-md shadow-sm">
                     Deal Deal
                   </div>
                 )}
                 <img 
                   src={product.image} 
                   alt={product.name}
                   className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                 />
               </div>
               
               <h3 className="text-[#815E4B] uppercase tracking-widest font-serif transition-colors cursor-pointer text-[15px] sm:text-base mb-3 leading-snug min-h-[44px] flex items-center justify-center line-clamp-2">
                 {product.name}
               </h3>
               
               <div className="flex items-center gap-1.5 mb-4">
                 {[1,2,3,4,5].map(i => (
                   <Star key={i} className="w-4 h-4 fill-[#C8A275] text-[#C8A275]" />
                 ))}
               </div>
               
               <div className="flex items-center gap-2 mb-6 font-sans">
                 <span className="text-gray-800 font-medium text-[15px] tracking-wide">
                   NOW KES {product.price.toLocaleString()}
                 </span>
                 <span className="text-[#998b82] text-sm line-through">
                   KES {Number(oldPrice).toLocaleString()}
                 </span>
               </div>
               
               <button
                 onClick={() => onAddToCart(product)}
                 className="mb-2 px-10 py-2.5 bg-gradient-to-b from-[#bd9074] to-[#8f6248] border border-[#78513b] rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] text-[#2a1a11] uppercase tracking-[0.1em] text-[13px] font-bold hover:from-[#ab7f62] hover:to-[#7a523a] transition-all cursor-pointer font-sans"
               >
                 Shop Now
               </button>
             </div>
           );
         })}
      </div>
    </div>
  );
}
