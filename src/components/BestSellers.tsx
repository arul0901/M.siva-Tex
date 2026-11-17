import React, { useState } from 'react';
import { SAREE_PRODUCTS } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FILTER_TABS = ['All Weaves', 'Kanchipuram Silk', 'Banarasi Silk', 'Soft Silk', 'Bridal Silk'];

export const BestSellers: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();
  const [activeTab, setActiveTab] = useState('All Weaves');

  // Filter products based on active tab
  const filteredProducts = activeTab === 'All Weaves'
    ? SAREE_PRODUCTS.filter(p => p.isBestSeller).slice(0, 8)
    : SAREE_PRODUCTS.filter(p => p.category === activeTab);

  const handleViewAll = () => {
    setSelectedCategoryFilter(activeTab === 'All Weaves' ? null : activeTab);
    setCurrentView('shop');
  };

  return (
    <section className="py-20 sm:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-gold font-medium text-xs tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Craftsmen's Choice</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
            Loved by Many
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto my-3" />
          <p className="text-sm sm:text-base text-brown-deep/75 font-light leading-relaxed">
            Explore our most cherished sarees, handpicked for their beauty, craftsmanship and timeless appeal.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-serif uppercase tracking-wider rounded-sm transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-burgundy text-gold-pale shadow-sm font-semibold'
                    : 'bg-beige/50 text-brown-deep/80 hover:bg-beige hover:text-burgundy'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Grid on Desktop */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold text-burgundy font-serif text-xs uppercase tracking-[0.2em] font-semibold hover:bg-burgundy hover:text-gold-pale hover:border-burgundy transition-all duration-300"
          >
            <span>View Complete Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
