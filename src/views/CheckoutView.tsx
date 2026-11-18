import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, CheckCircle2, Lock, ArrowLeft, ArrowRight, 
  Truck, CreditCard, Sparkles, MapPin, Phone, Mail, User, Download, Printer 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/checkout.css';

export const CheckoutView: React.FC = () => {
  const { cart, cartSubtotal, discountAmount, shippingFee, cartTotal, appliedCoupon, placeOrder, setCurrentView } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    fullName: 'Smt. Priya Sundaresan',
    email: 'priya.s@example.com',
    phone: '+91 98401 55219',
    street: 'Plot 12, Sri Krishna Nagar, 2nd Main Road',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600028',
    deliveryMethod: 'standard', // 'standard' | 'express'
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod' | 'netbanking'
    upiId: 'priya@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '08/29',
    cardCvv: '•••'
  });

  const [placedOrder, setPlacedOrder] = useState<any>(null);

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="py-24 text-center bg-ivory">
        <h2 className="font-serif text-2xl text-burgundy font-medium">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-brown-deep/70 mt-2">Add your cherished sarees before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-5 px-6 py-2.5 bg-burgundy text-gold-pale text-xs uppercase font-serif tracking-wider"
        >
          Explore Sarees
        </button>
      </div>
    );
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) {
      // Place Order
      const deliveryFee = formData.deliveryMethod === 'express' ? 450 : shippingFee;
      const finalTotal = cartTotal + (formData.deliveryMethod === 'express' ? 450 : 0);

      const order = placeOrder({
        items: cart,
        totalAmount: finalTotal,
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod === 'upi' ? `UPI (${formData.upiId})` : formData.paymentMethod.toUpperCase(),
        expectedDelivery: formData.deliveryMethod === 'express' ? '18 Nov 2026 (Priority)' : '21 Nov 2026'
      });

      setPlacedOrder(order);
      setStep(4);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#B18A52', '#481A36', '#D9B7B1', '#CDB185']
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-serif uppercase tracking-[0.25em] mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Boutique Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
            Sacred Order Finalization
          </h1>
          <div className="w-12 h-0.5 bg-gold mx-auto my-3" />
        </div>

        {/* Stepper Progress Bar (Steps 1-3) */}
        {step !== 4 && (
          <div className="max-w-2xl mx-auto mb-10 px-2 sm:px-0">
            <div className="flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gold/25 -translate-y-1/2 z-0" />
              
              {[
                { num: 1, full: 'Delivery Address', short: 'Address' },
                { num: 2, full: 'Shipping Mode', short: 'Shipping' },
                { num: 3, full: 'Payment Method', short: 'Payment' }
              ].map(s => (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-xs font-bold transition-all ${
                      step >= s.num
                        ? 'bg-burgundy text-gold-pale shadow-sm border border-gold'
                        : 'bg-ivory text-brown-deep/40 border border-gold/30'
                    }`}
                  >
                    {step > s.num ? <CheckCircle2 className="w-5 h-5 text-gold" /> : s.num}
                  </div>
                  <span className={`text-[10px] sm:text-[11px] font-serif uppercase tracking-wider mt-1.5 text-center ${step >= s.num ? 'text-burgundy font-semibold' : 'text-brown-deep/50'}`}>
                    <span className="hidden sm:inline">{s.full}</span>
                    <span className="sm:hidden">{s.short}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Order Confirmation View */}
        {step === 4 && placedOrder ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-sm border border-gold/40 shadow-luxury text-brown-deep"
          >
            <div className="text-center space-y-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-burgundy">
                Thank You for Your Revered Order!
              </h2>
              <p className="text-xs sm:text-sm text-brown-deep/80 max-w-lg mx-auto font-light leading-relaxed">
                Your heirloom saree has been reserved. Our master weavers are conducting the final handloom inspection and placing it into our signature velvet-lined keepsake box.
              </p>
              <div className="inline-block bg-beige/40 border border-gold/40 px-4 py-2 rounded-sm font-mono text-xs text-burgundy font-bold">
                Order Reference: {placedOrder.id}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-5 bg-beige/25 rounded-sm border border-gold/20 mb-8">
              <div>
                <span className="font-serif font-bold text-burgundy block mb-1">Shipping Destination</span>
                <p>{placedOrder.shippingAddress.fullName}</p>
                <p className="text-brown-deep/70">{placedOrder.shippingAddress.street}</p>
                <p className="text-brown-deep/70">{placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.state} - {placedOrder.shippingAddress.pincode}</p>
                <p className="text-brown-deep/70">Phone: {placedOrder.shippingAddress.phone}</p>
              </div>

              <div>
                <span className="font-serif font-bold text-burgundy block mb-1">Dispatch & Tracking</span>
                <p>Status: <span className="text-emerald-800 font-semibold">{placedOrder.status}</span></p>
                <p>Expected Arrival: <strong>{placedOrder.expectedDelivery}</strong></p>
                <p className="text-brown-deep/70">Carrier: BlueDart Air Express</p>
                <p className="text-brown-deep/70">AWB No: {placedOrder.trackingNumber}</p>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="space-y-3 mb-8">
              <h3 className="font-serif text-sm font-bold text-burgundy uppercase tracking-wider border-b border-gold/20 pb-2">
                Order Summary ({placedOrder.items.length} {placedOrder.items.length === 1 ? 'Item' : 'Items'})
              </h3>
              {placedOrder.items.map((it: any) => (
                <div key={it.product.id} className="flex items-center justify-between text-xs py-2 border-b border-gold/10">
                  <div className="flex items-center gap-3">
                    <img src={it.product.primaryImage} alt="" className="w-12 h-14 object-cover rounded-xs" />
                    <div>
                      <p className="font-serif font-semibold text-burgundy">{it.product.name}</p>
                      <p className="text-[10px] text-brown-deep/60">{it.product.category} • Qty: {it.quantity}</p>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-burgundy">
                    ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-serif text-base font-bold text-burgundy pt-3">
                <span>Total Amount Paid</span>
                <span>₹{placedOrder.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gold/20">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-6 py-3 border border-gold text-burgundy hover:bg-beige text-xs font-serif uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Tax Invoice</span>
              </button>

              <button
                onClick={() => setCurrentView('account')}
                className="w-full sm:w-auto px-6 py-3 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark text-xs font-serif uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <span>Track in My Orders</span>
              </button>

              <button
                onClick={() => setCurrentView('shop')}
                className="w-full sm:w-auto ml-auto text-xs text-burgundy hover:text-gold font-serif uppercase tracking-wider underline text-center"
              >
                Continue Boutique Shopping
              </button>
            </div>
          </motion.div>
        ) : (
          /* Steps 1, 2, 3 Grid with Order Summary Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Section (Col 1-7) */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-sm border border-gold/25 shadow-sm">
              <form onSubmit={handleNextStep}>
                
                {/* Step 1: Address */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-base font-bold text-burgundy uppercase tracking-wider border-b border-gold/20 pb-2 mb-4">
                      1. Client Delivery Details
                    </h3>

                    <div>
                      <label className="block text-[10px] uppercase font-serif tracking-wider text-burgundy mb-1">
                        Full Name of Recipient *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 py-2 text-base sm:text-xs border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-serif tracking-wider text-burgundy mb-1">
                          WhatsApp Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 text-base sm:text-xs border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-serif tracking-wider text-burgundy mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3 py-2 text-base sm:text-xs border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-serif tracking-wider text-burgundy mb-1">
                        Street Address / Apartment / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full px-3 py-2 text-base sm:text-xs border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-serif tracking-wider text-burgundy mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2 text-base sm:text-xs border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-serif tracking-wider text-burgundy mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-3 py-2 text-base sm:text-xs border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-serif tracking-wider text-burgundy mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                          className="w-full px-3 py-2 text-base sm:text-xs border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full min-h-[44px] py-3.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all flex items-center justify-center gap-2"
                      >
                        <span>Continue to Shipping Mode</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Method */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-base font-bold text-burgundy uppercase tracking-wider border-b border-gold/20 pb-2 mb-4">
                      2. Select Insured Shipping Method
                    </h3>

                    <label
                      className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                        formData.deliveryMethod === 'standard'
                          ? 'border-gold bg-beige/30 text-burgundy'
                          : 'border-gold/20 hover:border-gold/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            checked={formData.deliveryMethod === 'standard'}
                            onChange={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                            className="accent-gold"
                          />
                          <div>
                            <span className="font-serif font-bold text-xs uppercase tracking-wide block">
                              Standard Insured Air Courier
                            </span>
                            <span className="text-[11px] text-brown-deep/70">
                              3-5 Business Days • Velvet Keepsake Box Included
                            </span>
                          </div>
                        </div>
                        <span className="font-serif font-bold text-emerald-800 text-xs">
                          {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                        </span>
                      </div>
                    </label>

                    <label
                      className={`block p-4 border rounded-sm cursor-pointer transition-all ${
                        formData.deliveryMethod === 'express'
                          ? 'border-gold bg-beige/30 text-burgundy'
                          : 'border-gold/20 hover:border-gold/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            checked={formData.deliveryMethod === 'express'}
                            onChange={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                            className="accent-gold"
                          />
                          <div>
                            <span className="font-serif font-bold text-xs uppercase tracking-wide block">
                              Express Muhurtham Priority Courier
                            </span>
                            <span className="text-[11px] text-brown-deep/70">
                              Guaranteed 48-Hour BlueDart Priority Flight Dispatch
                            </span>
                          </div>
                        </div>
                        <span className="font-serif font-bold text-burgundy text-xs">₹450</span>
                      </div>
                    </label>

                    <div className="flex items-center gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="py-3 px-4 border border-gold/40 text-brown-deep hover:text-burgundy text-xs font-serif uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all flex items-center justify-center gap-2"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-base font-bold text-burgundy uppercase tracking-wider border-b border-gold/20 pb-2 mb-4">
                      3. Authentic Payment Gateway
                    </h3>

                    {/* Payment Radios */}
                    <div className="space-y-2.5">
                      {/* UPI */}
                      <label
                        className={`block p-3.5 border rounded-sm cursor-pointer transition-all ${
                          formData.paymentMethod === 'upi'
                            ? 'border-gold bg-beige/30'
                            : 'border-gold/20 hover:border-gold/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={formData.paymentMethod === 'upi'}
                              onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                              className="accent-gold"
                            />
                            <span className="font-serif font-bold text-xs uppercase tracking-wide">
                              UPI Instant Payment (Google Pay / PhonePe / Paytm / BHIM)
                            </span>
                          </div>
                          <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded-xs">
                            Instant Verified
                          </span>
                        </div>
                        {formData.paymentMethod === 'upi' && (
                          <div className="mt-3 pt-3 border-t border-gold/20 pl-6">
                            <label className="block text-[10px] uppercase font-serif text-burgundy mb-1">
                              Enter VPA / UPI ID
                            </label>
                            <input
                              type="text"
                              value={formData.upiId}
                              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                              placeholder="username@upi"
                              className="w-full max-w-sm px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs focus:outline-none"
                            />
                          </div>
                        )}
                      </label>

                      {/* Card */}
                      <label
                        className={`block p-3.5 border rounded-sm cursor-pointer transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-gold bg-beige/30'
                            : 'border-gold/20 hover:border-gold/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              checked={formData.paymentMethod === 'card'}
                              onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                              className="accent-gold"
                            />
                            <span className="font-serif font-bold text-xs uppercase tracking-wide">
                              Credit / Debit Cards (Visa, MasterCard, RuPay, Amex)
                            </span>
                          </div>
                        </div>
                        {formData.paymentMethod === 'card' && (
                          <div className="mt-3 pt-3 border-t border-gold/20 pl-6 space-y-2 max-w-sm">
                            <input
                              type="text"
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={formData.cardExpiry}
                                onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                                className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs"
                              />
                              <input
                                type="password"
                                value={formData.cardCvv}
                                onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                                className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-gold/30 rounded-xs"
                              />
                            </div>
                          </div>
                        )}
                      </label>

                      {/* Cash on Delivery */}
                      <label
                        className={`block p-3.5 border rounded-sm cursor-pointer transition-all ${
                          formData.paymentMethod === 'cod'
                            ? 'border-gold bg-beige/30'
                            : 'border-gold/20 hover:border-gold/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="payment"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                            className="accent-gold"
                          />
                          <span className="font-serif font-bold text-xs uppercase tracking-wide">
                            Cash on Delivery (Available up to ₹50,000)
                          </span>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="py-3 px-4 border border-gold/40 text-brown-deep hover:text-burgundy text-xs font-serif uppercase tracking-wider rounded-sm flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        className="flex-1 py-3.5 bg-gold hover:bg-gold-light text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-bold rounded-sm transition-all shadow-gold-glow flex items-center justify-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Authorize & Place Sacred Order</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Order Review Sidebar (Col 8-12) */}
            <div className="lg:col-span-5 bg-beige/30 p-6 rounded-sm border border-gold/30 space-y-4">
              <h3 className="font-serif text-sm font-bold text-burgundy uppercase tracking-wider border-b border-gold/20 pb-2">
                Order Review ({cart.length} Handlooms)
              </h3>

              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 text-xs">
                    <img src={item.product.primaryImage} alt="" className="w-14 h-16 object-cover rounded-xs" />
                    <div className="flex-1">
                      <h4 className="font-serif font-semibold text-burgundy line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-brown-deep/60">{item.product.category} • Qty: {item.quantity}</p>
                      <p className="font-serif font-bold text-burgundy mt-1">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="pt-3 border-t border-gold/20 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-semibold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Privilege Discount ({appliedCoupon})</span>
                    <span className="font-serif font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formData.deliveryMethod === 'express' ? '₹450 (Express)' : (shippingFee === 0 ? 'Free' : `₹${shippingFee}`)}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-burgundy pt-2 border-t border-gold/25">
                  <span>Grand Total</span>
                  <span>₹{(cartTotal + (formData.deliveryMethod === 'express' ? 450 : 0)).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-white/70 border border-gold/20 rounded-xs text-[11px] text-brown-deep/75 space-y-1">
                <div className="flex items-center gap-1.5 text-gold font-serif font-bold uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>The M. Siva-Tex Guarantee</span>
                </div>
                <p>Includes government-authenticated Silk Mark card and custom brass seal packaging.</p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

