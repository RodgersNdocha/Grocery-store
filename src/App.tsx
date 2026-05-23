import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PromoBanners } from './components/PromoBanners';
import { TopCategories } from './components/TopCategories';
import { FeaturedSection } from './components/FeaturedSection';
import { MidBanners } from './components/MidBanners';
import { DealOfTheWeek } from './components/DealOfTheWeek';
import { CartSidebar } from './components/CartSidebar';
import { MOCK_PRODUCTS } from './data';
import { CartItem, Product } from './types';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('freshcart_items');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from local storage', error);
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('freshcart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // Handle adding items to cart
  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Handle quantity updates
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => setCartItems([]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#00b25a]/30 pt-0">
      <TopBar />
      <Header cartItemCount={cartItemCount} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero />
        <PromoBanners />
        <TopCategories />
        <FeaturedSection products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />
        <MidBanners />
        <DealOfTheWeek products={MOCK_PRODUCTS} onAddToCart={handleAddToCart} />
      </main>

      <footer className="h-48 mt-20 relative overflow-hidden bg-[#1e1e1e] flex flex-col justify-center items-center text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80')] opacity-10 object-cover bg-center"></div>
          <p className="text-2xl font-bold text-[#ff6b6b] tracking-tight relative z-10 mb-2">HOMEDOKAN</p>
          <p className="text-gray-400 text-sm relative z-10">© 2026 HomeDokan. All rights reserved.</p>
      </footer>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={handleUpdateQuantity}
        removeItem={handleRemoveItem}
        clearCart={handleClearCart}
      />
    </div>
  );
}
