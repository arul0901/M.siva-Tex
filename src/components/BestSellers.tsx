import React, { useState } from 'react';
import { SAREE_PRODUCTS } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Video, ShieldCheck, Award, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  count: number;
}

export const BestSellers: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, setIsConciergeOpen } = useShop();
  const [activeTab, setActiveTab] = useState('all');

  // Define tab categories and compute real dynamic counts
  const tabs: TabItem[] = [
    { 
      id: 'all', 
      label: 'All Bestsellers', 
      count: SAREE_PRODUCTS.filter(p => p.isBestSeller).length 
    },
    { 
      id: 'Kanchipuram Silk', 
      label: 'Kanchipuram Silk', 
      count: SAREE_PRODUCTS.filter(p => p.category === 'Kanchipuram Silk').length 
    },
    { 
      id: 'Bridal Silk', 
      label: 'Bridal Silk', 
      count: SAREE_PRODUCTS.filter(p => p.category === 'Bridal Silk').length 
    },
    { 
      id: 'Banarasi Silk', 
      label: 'Banarasi Silk', 
      count: SAREE_PRODUCTS.filter(p => p.category === 'Banarasi Silk').length 
    },
    { 
      id: 'Soft Silk', 
      label: 'Soft Silk', 
      count: SAREE_PRODUCTS.filter(p => p.category === 'Soft Silk').length 
    }
  ];

  // Filter products based on active tab
  const filteredProducts = activeTab === 'all'
    ? SAREE_PRODUCTS.filter(p => p.isBestSeller)
    : SAREE_PRODUCTS.filter(p => p.category === activeTab);

  const handleViewAll = () => {
    setSelectedCategoryFilter(activeTab === 'all' ? null : activeTab);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-gold/25 relative overflow-hidden" 
      id="bestsellers" 
      aria-label="Bestsellers — Iconic Masterpiece Sarees"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-gold font-secondary font-semibold text-xs tracking-[0.28em] uppercase mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>LOVED BY MANY • ICONIC CREATIONS</span>
          </div>

          <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl text-burgundy font-normal tracking-tight">
            Bestsellers
            <span className="font-special italic text-gold font-normal block sm:inline sm:ml-3 text-2xl sm:text-3xl lg:text-4xl">
              Cherished Heirlooms
            </span>
          </h2>
          
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-3.5" />

          <p className="font-secondary text-sm sm:text-base text-brown-deep/75 font-light leading-relaxed">
            Discover our most celebrated handlooms — woven with authentic mulberry silk, certified silver-gold zari, and heritage pit-loom craftsmanship.
          </p>
        </div>

        {/* Luxury Filter Segmented Rail (Full width container, centered on desktop, scrollable on mobile) */}
        <div className="mb-10 sm:mb-14 flex justify-center px-2">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/80 border border-gold/30 rounded-xs shadow-xs max-w-full overflow-x-auto no-scrollbar">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative min-h-[40px] px-4 py-2 text-xs font-secondary uppercase tracking-wider rounded-xs transition-colors duration-200 shrink-0 flex items-center gap-2 ${
                    isActive
                      ? 'text-gold-pale font-semibold'
                      : 'text-brown-deep/75 hover:text-burgundy'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBestsellerTab"
                      className="absolute inset-0 bg-burgundy rounded-xs shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                  <span className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-gold/25 text-gold-pale font-bold' 
                      : 'bg-beige text-brown-deep/60'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Responsive Grid with Stagger & Spring Motion */}
        <motion.div
          layout
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dual High-Intent Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-12 sm:mt-16">
          <button
            onClick={handleViewAll}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 border border-burgundy bg-burgundy text-gold-pale hover:bg-gold hover:text-brown-dark hover:border-gold font-primary text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm rounded-xs"
          >
            <span>Explore All Handlooms</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsConciergeOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-gold/40 bg-white/60 text-burgundy hover:bg-white hover:border-gold font-secondary text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 rounded-xs"
          >
            <Video className="w-3.5 h-3.5 text-gold" />
            <span>Book Video Concierge</span>
          </button>
        </div>

        {/* Luxury Brand Reassurance Bar */}
        <div className="mt-16 pt-10 border-t border-gold/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-1.5 p-2">
            <Award className="w-5 h-5 text-gold" />
            <h5 className="font-primary text-xs uppercase tracking-wider text-burgundy font-semibold">
              Silk Mark Certified
            </h5>
            <p className="font-secondary text-[11px] text-brown-deep/70 font-light">
              100% Pure Mulberry Silk Guarantee
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <h5 className="font-primary text-xs uppercase tracking-wider text-burgundy font-semibold">
              Master Artisan Looms
            </h5>
            <p className="font-secondary text-[11px] text-brown-deep/70 font-light">
              Authentic Korvai & Kadwa Weaving
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-2">
            <Truck className="w-5 h-5 text-gold" />
            <h5 className="font-primary text-xs uppercase tracking-wider text-burgundy font-semibold">
              Insured Free Delivery
            </h5>
            <p className="font-secondary text-[11px] text-brown-deep/70 font-light">
              Direct to your doorstep worldwide
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5 p-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <h5 className="font-primary text-xs uppercase tracking-wider text-burgundy font-semibold">
              Heirloom Assurance
            </h5>
            <p className="font-secondary text-[11px] text-brown-deep/70 font-light">
              3 Generations of Weaving Trust
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
