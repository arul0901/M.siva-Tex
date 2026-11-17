import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/hero.css';

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: 'TIMELESS INDIAN HERITAGE',
    heading: 'Draped in Tradition.\nDefined by Elegance.',
    description: 'Discover exquisite sarees woven with heritage, craftsmanship and timeless beauty. Find the perfect drape for every celebration and every story.',
    cta: 'Explore Collections',
    categoryTarget: null,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90',
    tag: 'Pure Kanchipuram Silk'
  },
  {
    id: 2,
    eyebrow: 'SACRED BRIDAL TROUSSEAU 2026',
    heading: 'Sacred Silks for\nAuspicious Beginnings.',
    description: 'Heirloom-grade bridal Kanjivarams handwoven with pure 24k gold-dipped silver zari on ancient pit looms in Kanchipuram.',
    cta: 'Shop Bridal Edit',
    categoryTarget: 'Bridal Silk',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=2000&q=90',
    tag: '24K Gold Dipped Zari'
  },
  {
    id: 3,
    eyebrow: 'THE VARANASI KADWA ARCHIVES',
    heading: 'The Soul of Banaras,\nWoven by Hand.',
    description: 'Intricate Kadwa floral jaals hand-engraved onto lustrous Katan silk, celebrating four centuries of imperial textile artistry.',
    cta: 'Discover Banarasi',
    categoryTarget: 'Banarasi Silk',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90',
    tag: 'Authentic Kadwa Weave'
  }
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { setCurrentView, setSelectedCategoryFilter } = useShop();

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const slide = HERO_SLIDES[currentSlide];

  const handleCtaClick = () => {
    setSelectedCategoryFilter(slide.categoryTarget);
    setCurrentView('shop');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <section
      className="relative h-[85vh] min-h-[600px] max-h-[880px] w-full overflow-hidden bg-burgundy-dark select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Crossfade and Gentle Zoom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0"
        >
          {/* Zooming background image */}
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.heading}
              className="w-full h-full object-cover object-right md:object-[75%_center]"
            />
          </motion.div>

          {/* Luxury Editorial Overlay - Deep burgundy and warm shadows */}
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-dark/95 via-burgundy/80 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/80 via-transparent to-black/30" />2026-11-17T17:31:17+05:30
        </motion.div>
      </AnimatePresence>

      {/* Hero Content (Positioned on the Left for Editorial Luxury) */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex items-center">
        <div className="max-w-2xl text-ivory pt-10 sm:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="space-y-6"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy/70 border border-gold/40 rounded-full backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow" />
                <span className="text-[11px] sm:text-xs tracking-[0.25em] font-medium text-gold uppercase">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-wide text-ivory">
                {slide.heading.split('\n').map((line, idx) => (
                  <span key={idx} className="block">
                    {idx === 1 ? (
                      <span className="italic font-light text-gold-pale">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-beige-light/90 font-light leading-relaxed max-w-lg">
                {slide.description}
              </p>

              {/* CTA and Slide Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  onClick={handleCtaClick}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold text-brown-dark font-serif text-xs uppercase tracking-[0.22em] font-semibold overflow-hidden transition-all duration-300 hover:bg-gold-light hover:shadow-gold-glow"
                >
                  <span>{slide.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <div className="hidden sm:flex items-center gap-2 text-xs text-gold-pale/80 font-serif italic border-l border-gold/30 pl-4">
                  <span>{slide.tag}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute z-20 bottom-8 left-6 sm:left-12 flex items-center gap-4">
        {/* Minimal Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full border border-gold/40 bg-burgundy/40 text-gold-pale flex items-center justify-center hover:bg-gold hover:text-burgundy transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full border border-gold/40 bg-burgundy/40 text-gold-pale flex items-center justify-center hover:bg-gold hover:text-burgundy transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 ml-4">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="group relative py-2"
            >
              <div
                className={`h-1 transition-all duration-500 rounded-full ${
                  idx === currentSlide ? 'w-8 bg-gold shadow-gold-glow' : 'w-2.5 bg-ivory/40 group-hover:bg-ivory/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Handcrafted Seal on bottom right */}
      <div className="hidden md:flex absolute z-20 bottom-8 right-12 items-center gap-3 bg-burgundy/60 border border-gold/30 backdrop-blur-md px-4 py-2.5 rounded-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
        <span className="text-[11px] font-serif uppercase tracking-[0.2em] text-gold-light">
          Silk Mark Certified Handlooms
        </span>
      </div>
    </section>
  );
};
