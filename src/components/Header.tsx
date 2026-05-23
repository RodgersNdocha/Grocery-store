import { User, Heart, ShoppingCart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export function Header({ cartItemCount, onOpenCart }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
             <span className="text-2xl font-bold text-[#ff6b6b] tracking-tight">HOMEDOKAN</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 font-medium text-sm text-gray-700">
             <a href="#" className="text-[#00b25a] font-semibold">Grocery Items</a>
             <a href="#" className="hover:text-[#00b25a] transition-colors">Meats</a>
             <a href="#" className="hover:text-[#00b25a] transition-colors">Dry Foods</a>
             <a href="#" className="hover:text-[#00b25a] transition-colors">Best deals</a>
             <a href="#" className="hover:text-[#00b25a] transition-colors">All Products</a>
             <a href="#" className="hover:text-[#00b25a] transition-colors">Pages</a>
             <a href="#" className="hover:text-[#00b25a] transition-colors">Blog</a>
          </nav>
          
          <div className="hidden sm:flex items-center bg-gray-50 rounded-full px-4 py-2 flex-1 max-w-xs border border-gray-100">
             <Search className="w-4 h-4 text-gray-400 mr-2" />
             <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4 text-gray-600">
            <button className="p-2 hover:text-[#00b25a] transition-colors"><User className="w-5 h-5" /></button>
            <button className="p-2 hover:text-[#00b25a] transition-colors"><Heart className="w-5 h-5" /></button>
            <button
              onClick={onOpenCart}
              className="relative p-2 hover:text-[#00b25a] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-[#00b25a]" />
              <AnimatePresence>
                {cartItemCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#ff6b6b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 h-4 flex items-center justify-center border-2 border-white"
                  >
                    {cartItemCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
