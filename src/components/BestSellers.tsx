import React, { useState } from 'react';
import { SAREE_PRODUCTS } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTER_TABS = ['All Bestsellers', 'Kanchipuram Silk', 'Banarasi Silk', 'Soft Silk', 'Bridal Silk'];

export const BestSellers: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();
  const [activeTab, setActiveTab] = useState('All Bestsellers');

  // Filter products based on active tab
  const filteredProducts = activeTab === 'All Bestsellers'
    ? SAREE_PRODUCTS.filter(p => p.isBestSeller)
    : SAREE_PRODUCTS.filter(p => p.category === activeTab);

  const handleViewAll = () => {
    setSelectedCategoryFilter(activeTab === 'All Bestsellers' ? null : activeTab);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-gold/25" id="bestsellers" aria-label="Bestsellers Section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-gold font-secondary font-semibold text-xs tracking-[0.28em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>LOVED BY MANY • ICONIC CREATIONS</span>
          </div>

          <h2 className="font-primary text-3xl sm:text-4xl lg:text-5xl text-burgundy font-normal tracking-tight">
            Bestsellers
          </h2>
          
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-3" />

          <p className="font-secondary text-sm sm:text-base text-brown-deep/75 font-light leading-relaxed">
            Discover our most coveted handloom heirlooms — handpicked for their exquisite grace, certified zari craftsmanship, and timeless celebration.
          </p>

          {/* Luxury Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {FILTER_TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-[42px] px-4 sm:px-5 py-2 text-xs font-secondary uppercase tracking-wider rounded-xs transition-all duration-300 ${
                    isActive
                      ? 'bg-burgundy text-gold-pale shadow-sm font-semibold border border-burgundy'
                      : 'bg-white/80 text-brown-deep/80 hover:bg-white hover:text-burgundy border border-gold/20'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4-Column Responsive Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-burgundy bg-transparent text-burgundy hover:bg-burgundy hover:text-gold-pale font-primary text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-sm"
          >
            <span>Explore All Handlooms</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
