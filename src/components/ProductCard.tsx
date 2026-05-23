import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Use orange button or green randomly to mimic design
  const buttonColor = product.name === "Vegan Egg Replacer" ? 'bg-[#ff9f43] hover:bg-[#eb8c30]' : 'bg-[#00b25a] hover:bg-[#009249]';
  const priceOld = (product.price * 1.3).toFixed(0);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-xl hover:shadow-[#00b25a]/5 transition-all group duration-300"
    >
      <div className="relative w-full aspect-[4/3] mb-6 p-2 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-[80%] max-h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
        />
        {/* Rating stars below image */}
        <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-1 bg-white px-2 py-1 mx-auto w-max rounded-full shadow-sm border border-gray-50">
          {[1,2,3].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#00b25a] text-[#00b25a]" />)}
          <Star className="w-3.5 h-3.5 text-[#00b25a]/30" />
          <Star className="w-3.5 h-3.5 text-[#00b25a]/30" />
        </div>
      </div>
      
      <h3 className="font-bold text-gray-900 mb-2 truncate w-full mt-2 text-[15px]">{product.name}</h3>
      
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-bold text-[#00b25a]">KES {product.price.toLocaleString()}</span>
        <span className="text-xs font-medium text-gray-300 line-through">KES {Number(priceOld).toLocaleString()}</span>
      </div>

      <button
        onClick={() => onAddToCart(product)}
        className={`w-3/4 py-2.5 rounded-full text-white font-bold text-xs shadow-md uppercase tracking-wider transition-colors ${buttonColor}`}
      >
        Shop Now →
      </button>
    </motion.div>
  );
}
