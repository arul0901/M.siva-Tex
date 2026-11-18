import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { User, Package, MapPin, Heart, ShieldCheck, Clock, CheckCircle2, ChevronRight, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/account.css';

export const AccountView: React.FC = () => {
  const { orders, setCurrentView, wishlistCount } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 border-b border-gold/20 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-gold mb-1">
              <User className="w-4 h-4" />
              <span>Private Patron Portal</span>
            </div>
            <h1 className="font-serif text-3xl text-burgundy font-normal tracking-wide">
              Client Account & Orders
            </h1>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 text-xs font-serif w-full sm:w-auto">
            <button
              onClick={() => setCurrentView('wishlist')}
              className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 bg-beige/50 border border-gold/30 rounded-sm text-burgundy hover:bg-gold hover:text-white transition-colors flex items-center justify-center text-center"
            >
              Saved Heirlooms ({wishlistCount})
            </button>
            <button
              onClick={() => setCurrentView('shop')}
              className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 bg-burgundy text-gold-pale rounded-sm hover:bg-burgundy-dark transition-colors flex items-center justify-center text-center"
            >
              Browse Catalog
            </button>
          </div>
        </div>

        {/* Account Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white p-4 rounded-sm border border-gold/25 space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`min-h-[44px] w-full text-left px-4 py-2.5 rounded-xs text-xs font-serif uppercase tracking-wider flex items-center justify-between transition-colors ${
                activeTab === 'orders' ? 'bg-burgundy text-gold-pale font-bold' : 'text-brown-deep/80 hover:bg-beige'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4" />
                <span>My Orders ({orders.length})</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`min-h-[44px] w-full text-left px-4 py-2.5 rounded-xs text-xs font-serif uppercase tracking-wider flex items-center justify-between transition-colors ${
                activeTab === 'profile' ? 'bg-burgundy text-gold-pale font-bold' : 'text-brown-deep/80 hover:bg-beige'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Patron Profile</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`min-h-[44px] w-full text-left px-4 py-2.5 rounded-xs text-xs font-serif uppercase tracking-wider flex items-center justify-between transition-colors ${
                activeTab === 'addresses' ? 'bg-burgundy text-gold-pale font-bold' : 'text-brown-deep/80 hover:bg-beige'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-sm border border-gold/25">
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-burgundy border-b border-gold/20 pb-3">
                  Handloom Order History
                </h3>

                {orders.length === 0 ? (
                  <div className="py-12 text-center text-brown-deep/60">
                    <p className="font-serif text-base">No orders placed yet.</p>
                  </div>
                ) : (
                  orders.map(order => (
                    <div
                      key={order.id}
                      className="border border-gold/30 rounded-sm p-5 space-y-4 bg-ivory/40"
                    >
                      {/* Top Order Meta */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gold/15 pb-3 text-xs">
                        <div>
                          <span className="font-serif font-bold text-burgundy text-sm">
                            Order {order.id}
                          </span>
                          <span className="text-brown-deep/60 ml-2">Placed on {order.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 bg-gold/20 text-burgundy border border-gold/40 rounded-xs font-serif font-semibold text-[11px]">
                            {order.status}
                          </span>
                          <span className="font-serif font-bold text-burgundy text-sm">
                            ₹{order.totalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>

                      {/* Timeline Tracking */}
                      <div className="bg-beige/30 p-4 rounded-sm border border-gold/15">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-serif uppercase tracking-wider text-brown-deep/80 gap-1 mb-2">
                          <span className="flex items-center gap-1.5 text-gold-dark font-bold">
                            <Truck className="w-3.5 h-3.5" />
                            <span>Courier: BlueDart Insured Air ({order.trackingNumber})</span>
                          </span>
                          <span>Expected: <strong>{order.expectedDelivery}</strong></span>
                        </div>

                        {/* Visual Progress Steps */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-2 pt-2 text-[10px] text-center font-serif">
                          {[
                            { name: 'Loom Inspection', done: true },
                            { name: 'Velvet Box Packed', done: true },
                            { name: 'In Transit', done: order.status === 'In Transit' || order.status === 'Delivered' },
                            { name: 'Doorstep Delivered', done: order.status === 'Delivered' }
                          ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center p-1 bg-white/50 sm:bg-transparent rounded-xs">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-[10px] ${
                                  step.done ? 'bg-burgundy text-gold-pale font-bold' : 'bg-beige text-brown-deep/40'
                                }`}
                              >
                                {step.done ? '✓' : idx + 1}
                              </div>
                              <span className={`leading-tight ${step.done ? 'text-burgundy font-semibold' : 'text-brown-deep/50'}`}>
                                {step.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Items in this order */}
                      <div className="space-y-3 pt-2">
                        {order.items.map(item => (
                          <div key={item.product.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <img src={item.product.primaryImage} alt="" className="w-12 h-14 object-cover rounded-xs" />
                              <div>
                                <h4 className="font-serif font-semibold text-burgundy">{item.product.name}</h4>
                                <p className="text-[10px] text-brown-deep/60">{item.product.category} • Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-serif font-bold text-burgundy">
                              ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-brown-deep/70 pt-2 border-t border-gold/15 flex items-center justify-between">
                        <span>Delivering to: {order.shippingAddress.street}, {order.shippingAddress.city}</span>
                        <span>Payment: {order.paymentMethod}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-burgundy border-b border-gold/20 pb-3">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-brown-deep/60 uppercase font-serif text-[10px] mb-1">Full Name</label>
                    <input type="text" readOnly value="Smt. Priya Sundaresan" className="w-full px-3 py-2 bg-beige/30 border border-gold/30 rounded-xs" />
                  </div>
                  <div>
                    <label className="block text-brown-deep/60 uppercase font-serif text-[10px] mb-1">Email</label>
                    <input type="email" readOnly value="priya.s@example.com" className="w-full px-3 py-2 bg-beige/30 border border-gold/30 rounded-xs" />
                  </div>
                  <div>
                    <label className="block text-brown-deep/60 uppercase font-serif text-[10px] mb-1">WhatsApp Phone</label>
                    <input type="text" readOnly value="+91 98401 55219" className="w-full px-3 py-2 bg-beige/30 border border-gold/30 rounded-xs" />
                  </div>
                  <div>
                    <label className="block text-brown-deep/60 uppercase font-serif text-[10px] mb-1">Patron Tier</label>
                    <input type="text" readOnly value="Gold Heritage Circle (10% Privilege Member)" className="w-full px-3 py-2 bg-gold/15 text-burgundy font-bold border border-gold/30 rounded-xs" />
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-burgundy border-b border-gold/20 pb-3">
                  Saved Delivery Addresses
                </h3>
                <div className="p-4 border border-gold/30 bg-beige/25 rounded-sm text-xs space-y-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif font-bold text-burgundy">Primary Residence (Default)</span>
                    <span className="text-[10px] bg-burgundy text-gold-pale px-2 py-0.5 rounded-xs font-serif uppercase">Default</span>
                  </div>
                  <p className="font-medium text-brown-deep">Smt. Priya Sundaresan</p>
                  <p className="text-brown-deep/70">Plot 12, Sri Krishna Nagar, 2nd Main Road</p>
                  <p className="text-brown-deep/70">Chennai, Tamil Nadu - 600028</p>
                  <p className="text-brown-deep/70">Phone: +91 98401 55219</p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

