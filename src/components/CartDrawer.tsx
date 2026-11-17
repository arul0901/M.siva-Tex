import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/cart-drawer.css';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
    discountAmount,
    shippingFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setCurrentView,
    openProductDetail
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');

  // Free shipping threshold: ₹3,000
  const freeShippingThreshold = 3000;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-ivory shadow-2xl z-50 flex flex-col border-l border-gold/30 text-brown-deep"
          >
            {/* Header */}
            <div className="p-5 border-b border-gold/20 flex items-center justify-between bg-burgundy text-ivory">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h3 className="font-serif text-base font-bold tracking-wider uppercase text-ivory">
                  Bespoke Shopping Bag ({cartCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 text-ivory/70 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-beige/40 px-5 py-3 border-b border-gold/15">
              {remainingForFreeShipping > 0 ? (
                <div className="space-y-1.5">
                  <p className="text-xs text-brown-deep/80">
                    Add <span className="font-bold text-burgundy">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for <span className="font-semibold text-gold-dark">Complimentary Insured Shipping</span> across India.
                  </p>
                  <div className="shipping-progress-track">
                    <div
                      className={`shipping-progress-fill progress-w-${Math.min(100, Math.max(0, Math.round(progressPercent / 5) * 5))}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>You've unlocked <strong>Free Pan-India Insured Delivery</strong>!</span>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-beige/60 border border-gold/30 flex items-center justify-center text-gold">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-burgundy font-medium">Your Bag is Empty</h4>
                    <p className="text-xs text-brown-deep/70 mt-1 max-w-xs font-light">
                      Explore our handcrafted Kanchipuram and Banarasi handlooms to find your sacred drape.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('shop');
                    }}
                    className="px-6 py-2.5 bg-burgundy text-gold-pale font-serif text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-gold hover:text-brown-dark transition-colors"
                  >
                    Explore Sarees
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-white/70 border border-gold/20 rounded-sm hover:border-gold/40 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsCartOpen(false);
                        openProductDetail(item.product);
                      }}
                      className="w-20 h-24 bg-beige shrink-0 overflow-hidden rounded-sm cursor-pointer"
                    >
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            onClick={() => {
                              setIsCartOpen(false);
                              openProductDetail(item.product);
                            }}
                            className="font-serif text-xs font-semibold text-burgundy line-clamp-1 cursor-pointer hover:text-gold-dark"
                          >
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-brown-deep/40 hover:text-wine p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-brown-deep/60 mt-0.5">
                          {item.product.category} • {item.product.zari}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gold/30 rounded-xs bg-ivory">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:text-gold transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-medium font-sans">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:text-gold transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-burgundy">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Calculations and Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gold/25 bg-beige/30 space-y-3">
                
                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                    <input
                      type="text"
                      placeholder="Coupon (e.g. WELCOME10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-ivory border border-gold/40 text-xs text-brown-deep uppercase placeholder-brown-deep/40 focus:outline-none focus:border-gold rounded-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-burgundy text-gold-pale hover:bg-gold hover:text-brown-dark text-xs font-serif uppercase tracking-wider font-semibold rounded-sm transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {/* Applied Coupon Tag */}
                {appliedCoupon && (
                  <div className="flex items-center justify-between bg-gold/15 border border-gold/40 px-3 py-1 rounded-sm text-xs text-burgundy font-medium">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      Privilege Code: <strong>{appliedCoupon}</strong> (10% Off)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-brown-deep/50 hover:text-wine text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Subtotals Breakdown */}
                <div className="space-y-1.5 text-xs text-brown-deep/80 pt-2 border-t border-gold/15">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-serif text-brown-deep font-semibold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-800">
                      <span>Welcome Privilege (10%)</span>
                      <span className="font-serif font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-800">Free</strong> : `₹${shippingFee}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-burgundy pt-2 border-t border-gold/20">
                    <span>Estimated Total</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[10px] text-brown-deep/60 italic text-right">
                    *Taxes included. Certified Silk Mark authenticity tag included.
                  </p>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 bg-gold hover:bg-gold-light text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 shadow-luxury flex items-center justify-center gap-2"
                >
                  <span>Proceed to Sacred Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-brown-deep/60 font-serif pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>256-bit Encrypted Pan-India Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

