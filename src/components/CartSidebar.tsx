import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import { CartItem } from '../types';
import { initAuth, googleSignIn, getAccessToken } from '../auth';
import { getOrCreateSpreadsheet, appendRow } from '../sheets';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart?: () => void;
}

export function CartSidebar({ isOpen, onClose, cartItems, updateQuantity, removeItem, clearCart }: CartSidebarProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);
  
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Initialize auth
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setNeedsAuth(false);
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  // Reset view when reopened
  useEffect(() => {
    if (isOpen) {
      setCheckoutStep('cart');
      setEmail('');
      setName('');
      setAddress('');
    }
  }, [isOpen]);

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email || 'customer@example.com',
    amount: total * 100,
    publicKey: 'pk_test_6896c3fa70378ee681a76348568ea8a9ba27b4e0',
    currency: 'KES',
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = async () => {
    setCheckoutStep('success');
    
    // Attempt to sync to sheets
    try {
      const token = await getAccessToken();
      if (token) {
        const sid = await getOrCreateSpreadsheet(token);
        setSpreadsheetId(sid);
        
        await appendRow(token, sid, [
          new Date().toISOString(),
          name,
          email,
          address,
          total.toString(),
          cartItems.map(item => `${item.product.name} (x${item.quantity})`).join(', ')
        ]);
        console.log('Order synced to Google Sheets!');
      }
    } catch (err) {
      console.error('Failed to sync to sheets', err);
    }

    if (clearCart) {
      setTimeout(() => {
        clearCart();
      }, 2000); 
    }
  };

  const onPaystackClose = () => {
    // Payment dialogue closed
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (needsAuth) {
      setIsLoggingIn(true);
      try {
        await googleSignIn();
        setNeedsAuth(false);
        // Do not return here, we can proceed to payment since they just logged in
      } catch (err) {
        console.error('Login failed:', err);
        setIsLoggingIn(false);
        return; // wait for login
      }
      setIsLoggingIn(false);
    }

    initializePayment({
      onSuccess,
      onClose: onPaystackClose,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#00b25a]" />
                <h2 className="text-lg font-medium text-gray-900">
                  {checkoutStep === 'cart' ? 'Your Cart' : checkoutStep === 'checkout' ? 'Checkout' : 'Order Placed'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content Body Based on Step */}
            <div className="flex-1 overflow-y-auto">
              {checkoutStep === 'cart' && (
                <div className="p-4 h-full flex flex-col space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                      <ShoppingBag className="w-12 h-12 stroke-1" />
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-900 line-clamp-1">{item.product.name}</h3>
                                <button
                                  onClick={() => removeItem(item.product.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-[#00b25a] font-medium">KES {item.product.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                                className="p-1 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-4 text-center font-medium text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              )}

              {checkoutStep === 'checkout' && (
                <div className="p-6">
                  <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b25a]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b25a]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                      <textarea required rows={3} value={address} onChange={e => setAddress(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00b25a]"></textarea>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Total</span>
                        <span className="font-semibold text-gray-900">KES {total.toLocaleString()}</span>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-[#00b25a]" />
                  <h3 className="text-2xl font-bold text-gray-900">Order Confirmed!</h3>
                  <p className="text-gray-500">Thank you for shopping with us. Your groceries are on the way.</p>
                  
                  {spreadsheetId && (
                    <div className="mt-4 p-4 bg-emerald-50 rounded-lg text-sm border border-emerald-100">
                      <p className="text-emerald-800 font-medium mb-2">Order synced to Google Sheets</p>
                      <a 
                        href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#00b25a] hover:underline break-all"
                      >
                        View Spreadsheet
                      </a>
                    </div>
                  )}

                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {checkoutStep === 'cart' && (
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#00b25a]">KES {total.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  disabled={cartItems.length === 0}
                  className="w-full bg-[#00b25a] text-white py-3 rounded-xl font-medium hover:bg-[#009249] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

            {checkoutStep === 'checkout' && (
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isLoggingIn}
                  className="flex-1 bg-[#00b25a] text-white py-3 rounded-xl font-medium hover:bg-[#009249] transition-colors disabled:opacity-50"
                >
                  {isLoggingIn ? 'Signing In...' : needsAuth ? 'Sign In & Pay' : 'Place Order'}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
