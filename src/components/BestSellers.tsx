import React, { useState, useRef, useEffect } from 'react';
import { SAREE_PRODUCTS } from '../data/sarees';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, 
  ArrowRight, 
  Video, 
  ShieldCheck, 
  Award, 
  Truck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  count: number;
}

export const BestSellers: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, setIsConciergeOpen } = useShop();
  const [activeTab, setActiveTab] = useState('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

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

  // Check scroll position to toggle navigation buttons and update progress bar
  const checkScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    } else {
      setScrollProgress(0);
    }
  };

  useEffect(() => {
    // Reset scroll when tab changes
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    const timer = setTimeout(checkScrollState, 150);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [filteredProducts]);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 265; // card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Drag handlers for desktop mouse dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current);
    dragDistanceRef.current = Math.abs(walk);
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleViewAll = () => {
    setSelectedCategoryFilter(activeTab === 'all' ? null : activeTab);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      className="pt-3 sm:pt-5 pb-16 sm:pb-24 bg-[#FAF7F2] border-b border-gold/25 relative overflow-hidden" 
      id="bestsellers" 
      aria-label="Bestsellers — Iconic Masterpiece Sarees"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
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
          
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-3" />

          <p className="font-secondary text-sm sm:text-base text-brown-deep/75 font-light leading-relaxed">
            Discover our most celebrated handlooms — woven with authentic mulberry silk, certified silver-gold zari, and heritage pit-loom craftsmanship.
          </p>
        </div>

        {/* Luxury Filter Segmented Rail */}
        <div className="mb-6 sm:mb-10 flex justify-start sm:justify-center px-1 overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-white/80 border border-gold/30 rounded-xs shadow-xs max-w-full shrink-0">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative min-h-[38px] px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-secondary uppercase tracking-wider rounded-xs transition-colors duration-200 shrink-0 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
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
                  <span className={`relative z-10 text-[9.5px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
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

        {/* Single-Row Carousel Showcase Container */}
        <div className="relative group/carousel">
          {/* Floating Left Navigation Arrow (Desktop) */}
          <button
            onClick={() => scrollCarousel('left')}
            disabled={!canScrollLeft}
            aria-label="Previous sarees"
            className={`hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/95 border border-gold/35 text-burgundy shadow-md items-center justify-center transition-all duration-300 z-20 ${
              canScrollLeft
                ? 'opacity-100 hover:bg-burgundy hover:text-gold-pale hover:border-gold hover:scale-105 cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Floating Right Navigation Arrow (Desktop) */}
          <button
            onClick={() => scrollCarousel('right')}
            disabled={!canScrollRight}
            aria-label="Next sarees"
            className={`hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-white/95 border border-gold/35 text-burgundy shadow-md items-center justify-center transition-all duration-300 z-20 ${
              canScrollRight
                ? 'opacity-100 hover:bg-burgundy hover:text-gold-pale hover:border-gold hover:scale-105 cursor-pointer'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Single Horizontal Row Track */}
          <div
            ref={scrollRef}
            onScroll={checkScrollState}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex items-stretch gap-3 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1 snap-x snap-mandatory touch-pan-x cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  className="w-[172px] xs:w-[190px] sm:w-[230px] md:w-[260px] shrink-0 snap-start flex flex-col"
                >
                  <ProductCard product={product} compact={true} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Progress / Scroll Indicator Rail */}
          <div className="flex items-center justify-between mt-5 px-1 pt-1">
            <div className="text-xs font-secondary text-brown-deep/70 flex items-center gap-2">
              <span className="font-semibold text-burgundy">{filteredProducts.length}</span>
              <span>Exclusive Masterpieces</span>
              <span className="hidden sm:inline text-gold/40">•</span>
              <span className="hidden sm:inline text-brown-deep/50 text-[11px]">Swipe or use arrows to view all</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Visual Gold Progress Bar */}
              <div className="w-24 sm:w-36 h-1 bg-gold/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-burgundy transition-all duration-200 rounded-full"
                  style={{ width: `${Math.max(15, scrollProgress)}%` }}
                />
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollCarousel('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous sarees"
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold/30 bg-white/90 text-burgundy flex items-center justify-center text-xs transition-all shadow-xs ${
                    canScrollLeft 
                      ? 'opacity-100 hover:bg-burgundy hover:text-white hover:border-gold cursor-pointer' 
                      : 'opacity-30 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  disabled={!canScrollRight}
                  aria-label="Next sarees"
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gold/30 bg-white/90 text-burgundy flex items-center justify-center text-xs transition-all shadow-xs ${
                    canScrollRight 
                      ? 'opacity-100 hover:bg-burgundy hover:text-white hover:border-gold cursor-pointer' 
                      : 'opacity-30 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dual High-Intent Action CTAs */}
        

        {/* Luxury Brand Reassurance Bar */}
        <div className="mt-14 pt-8 border-t border-gold/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
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
