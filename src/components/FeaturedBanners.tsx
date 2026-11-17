import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturedBanners: React.FC = () => {
  const { setSelectedCategoryFilter, setCurrentView } = useShop();

  const handleBannerOne = () => {
    setSelectedCategoryFilter('Kanchipuram Silk');
    setCurrentView('shop');
  };

  const handleBannerTwo = () => {
    setSelectedCategoryFilter('Banarasi Silk');
    setCurrentView('shop');
  };

  return (
    <section className="py-16 sm:py-24 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Banner One — Traditional Heritage */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative h-[480px] sm:h-[540px] overflow-hidden rounded-sm cursor-pointer shadow-luxury"
            onClick={handleBannerOne}
          >
            {/* Background Image: Indian woman in Kanchipuram silk saree in heritage palace setting */}
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
              alt="The Beauty of Traditional Silk"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/95 via-burgundy/60 to-transparent" />
            
            {/* Fine Gold Inset Border */}
            <div className="absolute inset-4 border border-gold/30 pointer-events-none transition-all duration-300 group-hover:inset-3 group-hover:border-gold/60" />

            {/* Banner Content */}
            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-ivory">
              <div className="inline-flex items-center gap-1.5 text-gold-light text-xs font-serif tracking-[0.25em] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kanchipuram Heritage</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-ivory leading-tight mb-3">
                The Beauty of <br />
                <span className="italic text-gold-pale">Traditional Silk</span>
              </h3>
              <p className="text-xs sm:text-sm text-beige-light/90 font-light max-w-md leading-relaxed mb-6">
                Handwoven elegance, crafted to be treasured for generations with pure zari Korvai borders.
              </p>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBannerOne();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-ivory text-burgundy font-serif text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-white transition-all duration-300"
                >
                  <span>Explore Silk Sarees</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Banner Two — Trending Collection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative h-[480px] sm:h-[540px] overflow-hidden rounded-sm cursor-pointer shadow-luxury"
            onClick={handleBannerTwo}
          >
            {/* Background Image: Close-up editorial photograph of richly woven Banarasi silk fabric featuring intricate zari */}
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
              alt="Elegance in Every Thread"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-wine/60 to-transparent" />
            
            {/* Fine Gold Inset Border */}
            <div className="absolute inset-4 border border-gold/30 pointer-events-none transition-all duration-300 group-hover:inset-3 group-hover:border-gold/60" />

            {/* Banner Content */}
            <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-ivory">
              <div className="inline-flex items-center gap-1.5 text-gold-light text-xs font-serif tracking-[0.25em] uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Banarasi Kadwa Craft</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-normal text-ivory leading-tight mb-3">
                Elegance in <br />
                <span className="italic text-gold-pale">Every Thread</span>
              </h3>
              <p className="text-xs sm:text-sm text-beige-light/90 font-light max-w-md leading-relaxed mb-6">
                Discover sarees that celebrate timeless Indian craftsmanship with real floral zari jaals.
              </p>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBannerTwo();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-semibold hover:bg-gold-light transition-all duration-300"
                >
                  <span>Discover Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
