import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';

interface FeaturedSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const categoriesSidebar = [
  'Cake & Pastry', 'Bread & Bakery', 'Snacks', 'Dairy', 'Confectionery', 'Popular Items', 'Chocolate & Candy', 'Beverage'
];

export function FeaturedSection({ products, onAddToCart }: FeaturedSectionProps) {
  const [activeTab, setActiveTab] = useState('Featured');
  const tabs = ['Featured', 'Best Sellers', 'Popular'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 flex flex-col lg:flex-row gap-10">
       {/* Sidebar */}
       <div className="w-full lg:w-64 shrink-0">
          <p className="text-[#00b25a] text-sm italic font-serif mb-1">Categories</p>
          <h3 className="text-xl font-bold text-gray-900 mb-6">Featured Products</h3>
          <ul className="space-y-4 mb-10">
            {categoriesSidebar.map(c => (
              <li key={c}>
                <a href="#" className="text-gray-500 hover:text-[#00b25a] text-sm font-medium transition-colors block">{c}</a>
              </li>
            ))}
          </ul>
          
          <div className="bg-emerald-50/50 rounded-2xl p-6 text-center border border-emerald-100 relative overflow-hidden group hover:shadow-lg transition-shadow">
             <p className="text-[#00b25a] text-xs font-bold uppercase mb-2 font-serif italic relative z-10">Enjoy up to 20% →</p>
             <h4 className="text-2xl font-bold text-gray-900 mb-6 relative z-10">Fresh Vegetable</h4>
             <button className="bg-[#00b25a] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase hover:bg-[#009249] transition-colors relative z-10 shadow-md shadow-[#00b25a]/30">
               Shop Now →
             </button>
             <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" alt="Basket" className="w-full h-40 object-cover rounded-xl mt-6 relative z-10 group-hover:scale-105 transition-transform duration-500" />
          </div>
       </div>

       {/* Main Grid Content */}
       <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4 border-b border-gray-100 pb-2">
             <div className="flex gap-8 overflow-x-auto hide-scrollbar">
                {tabs.map(t => (
                  <button 
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`text-sm font-bold pb-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === t ? 'text-[#00b25a] border-[#00b25a]' : 'text-gray-400 border-transparent hover:text-gray-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
             </div>
             <div className="flex gap-2 shrink-0">
               <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">{"<"}</button>
               <button className="w-8 h-8 rounded-full bg-[#00b25a] text-white flex items-center justify-center transition-colors shadow-md shadow-[#00b25a]/40">{">"}</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
             {products.slice(0, 3).map(product => (
               <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
             ))}
          </div>
       </div>
    </div>
  );
}
