import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA } from '../data/sarees';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/shop-by-category.css';

export const ShopByCategory: React.FC = () => {
  const { setSelectedCategoryFilter, setCurrentView } = useShop();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setCurrentView('shop');
  };

  return (
    <section className="py-20 bg-ivory border-b border-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-gold font-medium text-xs tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Handloom Edits</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
              Shop by Saree Collection
            </h2>
            <p className="text-sm text-brown-deep/70 mt-2 font-light max-w-xl">
              Explore authentic weaves categorized by regional heritage, silk purity, and timeless artisan craftsmanship.
            </p>
          </div>

          {/* Scroll Navigation Arrows for Horizontal Carousel */}
          <div className="hidden md:flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-gold/40 text-burgundy flex items-center justify-center hover:bg-gold hover:text-ivory transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-gold/40 text-burgundy flex items-center justify-center hover:bg-gold hover:text-ivory transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Category Cards */}
        <div
          ref={scrollContainerRef}
          className="category-scroll-container"
        >
          {CATEGORIES_DATA.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="snap-start shrink-0 flex flex-col items-center text-center group cursor-pointer w-44 sm:w-48"
              onClick={() => handleCategorySelect(cat.categoryKey)}
            >
              {/* Circular Product Image Container with Gold Ring */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 border-2 border-gold/30 group-hover:border-gold transition-all duration-300 group-hover:shadow-gold-glow mb-4">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-beige">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-burgundy/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Subtle Floating Badge */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-ivory border border-gold/40 px-2.5 py-0.5 rounded-full shadow-sm text-[9px] font-serif uppercase tracking-wider text-burgundy whitespace-nowrap">
                  {cat.badge}
                </div>
              </div>

              {/* Category Name */}
              <h3 className="font-serif text-sm sm:text-base font-semibold text-burgundy group-hover:text-gold-dark transition-colors mt-2 leading-tight">
                {cat.name}
              </h3>

              {/* Short Descriptive Subtitle */}
              <p className="text-[11px] text-brown-deep/70 font-light mt-1 max-w-[150px] leading-snug">
                {cat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-2 text-xs text-gold font-serif italic">
          <span>&larr; Swipe to explore all 8 handloom collections &rarr;</span>
        </div>

      </div>
    </section>
  );
};
