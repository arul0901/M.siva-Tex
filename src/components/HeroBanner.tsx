import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import heroWebm from '../assets/banner/hero.webm';
import heroMp4 from '../assets/banner/hero-1.mp4';
import '../styles/hero.css';

interface HeroSlide {
  id: number;
  eyebrow: string;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix?: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  categoryTarget: string | null;
  tag: string;
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'THE SAREE GALLERY • EST. 1974',
    titlePrefix: 'Sarees',
    titleAccent: 'Woven for Timeless Stories',
    description: 'Discover ethereal handloom sarees woven with pure mulberry silk and authentic gold zari. A celebration of feminine grace, heritage, and master craftsmanship.',
    primaryCta: 'Explore Sarees',
    secondaryCta: 'Our Heritage',
    categoryTarget: 'Kanchipuram Silk',
    tag: 'Pure Kanchipuram Silk',
    image: '/assets/video/slide_hd_1_sarees.jpg'
  },
  {
    id: 2,
    eyebrow: 'SACRED BRIDAL TROUSSEAU 2026',
    titlePrefix: 'The Bridal',
    titleAccent: 'Edit in Pure 24K Gold Zari',
    description: 'Heirloom-grade bridal Kanjivarams handwoven with pure 24K gold-dipped silver zari on ancient pit looms in Kanchipuram for auspicious beginnings.',
    primaryCta: 'Shop Bridal Edit',
    secondaryCta: 'Book Concierge',
    categoryTarget: 'Bridal Silk',
    tag: '24K Gold Dipped Zari',
    image: '/assets/video/slide_hd_2_bridal.jpg'
  },
  {
    id: 3,
    eyebrow: 'A LEGACY OF WEAVING',
    titlePrefix: 'Our',
    titleAccent: 'Collections for Every Celebration',
    description: 'From everyday grace to grand muhurthams. Radiant turmeric gold and mulberry silks with intricate temple borders and hand-interlocked korvai pallus.',
    primaryCta: 'Browse Collections',
    secondaryCta: 'View Lookbook',
    categoryTarget: 'Kanchipuram Silk',
    tag: 'Authentic Korvai Weave',
    image: '/assets/video/slide_hd_3_collections.jpg'
  },
  {
    id: 4,
    eyebrow: 'THE IMPERIAL WEAVES',
    titlePrefix: 'Heritage',
    titleAccent: 'Silks with Cultural Soul',
    description: 'Intricate Kadwa floral jaals and interlocking kadhuwa borders hand-engraved on lustrous pure katan silk, celebrating four centuries of imperial textile artistry.',
    primaryCta: 'Discover Banarasi',
    secondaryCta: 'Weaving Process',
    categoryTarget: 'Banarasi Silk',
    tag: 'Master Artisan Handloom',
    image: '/assets/video/slide_hd_4_heritage.jpg'
  },
  {
    id: 5,
    eyebrow: 'STEP INTO TIMELESS LUXURY',
    titlePrefix: 'M. Siva-Tex',
    titleAccent: 'Atelier of Authentic Weaves',
    description: 'Preserving authentic three-shuttle Korvai & Kadwa pit loom traditions since 1974. Woven with reverence for celebrations that stay in memory forever.',
    primaryCta: 'Explore All Weaves',
    secondaryCta: 'Virtual Tour',
    categoryTarget: null,
    tag: 'Silk Mark Certified',
    image: '/assets/video/slide_hd_5_atelier.jpg'
  }
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { setCurrentView, setSelectedCategoryFilter, setIsConciergeOpen } = useShop();

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const activeSlide = HERO_SLIDES[currentSlide];

  // 1. Particle System: Floating Silk Petals & Golden Bokeh on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      angularSpeed: number;
      opacity: number;
      color: string;
      aspect: number;
    }

    const petals: Petal[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 5,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: Math.random() * 0.5 - 0.25,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.45 + 0.25,
      color: Math.random() > 0.4 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(217, 140, 130, 0.45)', // gold or soft rose petal
      aspect: Math.random() * 0.4 + 0.6
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.6 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.beginPath();
        // Draw delicate organic petal ellipse
        ctx.ellipse(0, 0, p.size, p.size * p.aspect, 0, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.3)';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. Audio Ambient Soundtrack
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.muted = isMuted;

    if (!isMuted && isPlaying) {
      audio.play().catch(() => { });
    } else {
      audio.pause();
    }
  }, [isMuted, isPlaying]);

  // 3. Slide Transition Logic
  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % HERO_SLIDES.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [currentSlide, goToSlide]);

  // 4. Automatic Progression (6.8s interval)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6800);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // 5. Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // 6. Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  // 7. CTAs
  const handlePrimaryCta = () => {
    setSelectedCategoryFilter(activeSlide.categoryTarget);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecondaryCta = () => {
    if (activeSlide.secondaryCta.includes('Concierge')) {
      setIsConciergeOpen(true);
    } else {
      setCurrentView('heritage');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={bannerRef}
      className="hero-cinematic-banner"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="M. Siva-Tex Haute Couture Cinematic Hero"
    >
      {/* 1. Media Engine (Crystal-Clear High-Resolution Saree Model Layer) */}
      <div className="hero-media-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            className="hero-image-bg"
          >
            <motion.img
              src={activeSlide.image}
              alt={activeSlide.titlePrefix + ' ' + activeSlide.titleAccent}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1.00 }}
              transition={{ duration: 7, ease: 'easeOut' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Soundtrack Audio Element */}
        <audio
          ref={audioRef}
          src="/assets/video/ambient_fashion_soundtrack.mp3"
          loop
          preload="auto"
        />
      </div>

      {/* 2. Luxury Editorial Gradients & Vignettes */}
      <div className="hero-gradient-overlay" />
      <div className="hero-vignette-top" />
      <div className="hero-vignette-bottom" />
      <div className="hero-light-sweep" />

      {/* 3. Floating Rose Petals & Golden Dust Canvas */}
      <canvas ref={canvasRef} className="hero-petals-canvas" />

      {/* 4. Flowing Silk Fabric Transition Wave (Triggered on slide change) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="hero-silk-wave-container"
          >
            <svg
              className="hero-silk-wave-svg"
              viewBox="0 0 1440 900"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="silkGoldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
                  <stop offset="35%" stopColor="rgba(236, 186, 81, 0.5)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="65%" stopColor="rgba(212, 175, 55, 0.55)" />
                  <stop offset="100%" stopColor="rgba(77, 0, 7, 0)" />
                </linearGradient>
                <filter id="silkBlur" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
              </defs>
              {/* Undulating liquid silk wave curves */}
              <path
                d="M-200,0 C300,280 400,680 800,450 C1200,220 1300,750 1800,900 L1800,0 Z"
                fill="url(#silkGoldSheen)"
                filter="url(#silkBlur)"
              />
              <path
                d="M-200,100 C200,400 600,150 900,550 C1200,950 1500,350 1800,700 L1800,900 L-200,900 Z"
                fill="rgba(212, 175, 55, 0.2)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Main Editorial Content Container */}
      <div className="hero-content-container">
        <div className="hero-text-block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow Badge */}
              <div className="hero-brand-badge">
                <Sparkles className="hero-eyebrow-icon animate-spin-slow" />
                <span className="hero-eyebrow-text">{activeSlide.eyebrow}</span>
              </div>

              {/* Main Heading with Serif Italic Artistry */}
              <h1 className="hero-main-title">
                <span className="hero-title-line">
                  {activeSlide.titlePrefix}{' '}
                  <span className="hero-title-accent">{activeSlide.titleAccent}</span>
                </span>
                {activeSlide.titleSuffix && (
                  <span className="hero-title-line text-lg sm:text-2xl lg:text-3xl font-light text-maroon/90 mt-1">
                    {activeSlide.titleSuffix}
                  </span>
                )}
              </h1>

              {/* Gold Hairline Divider */}
              <div className="hero-gold-hairline" />

              {/* Description */}
              <p className="hero-description">{activeSlide.description}</p>

              {/* Action Buttons */}
              <div className="hero-cta-group">
                <button onClick={handlePrimaryCta} className="hero-btn-primary">
                  <span>{activeSlide.primaryCta}</span>
                  <ArrowRight className="hero-btn-primary-arrow" />
                </button>

                <button onClick={handleSecondaryCta} className="hero-btn-secondary">
                  <span>{activeSlide.secondaryCta}</span>
                </button>

                <div className="hero-tag-badge">
                  <span>{activeSlide.tag}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 6. Vertical Slide Indicators (Right Edge) */}
      <div className="hero-vertical-indicators" aria-label="Hero slide navigation">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            className={`hero-indicator-btn ${idx === currentSlide ? 'active' : ''}`}
            aria-label={`Switch to slide ${idx + 1}: ${slide.titleAccent}`}
          >
            <div className="hero-indicator-dot" />
            <span className="hero-indicator-tooltip">{slide.titleAccent}</span>
          </button>
        ))}
      </div>

      {/* 7. Bottom Navigation & Audio Controls */}
      <div className="hero-bottom-controls">
        {/* Left Navigation Arrows & Play/Pause */}
        <div className="hero-nav-arrow-group">
          <button
            onClick={prevSlide}
            className="hero-control-btn"
            aria-label="Previous slide"
          >
            <ChevronLeft className="hero-control-icon" />
          </button>

          <button
            onClick={nextSlide}
            className="hero-control-btn"
            aria-label="Next slide"
          >
            <ChevronRight className="hero-control-icon" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="hero-control-btn"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="hero-control-icon" />
            ) : (
              <Play className="hero-control-icon" />
            )}
          </button>
        </div>

        {/* Right Controls: Ambient Music & Silk Mark Badge */}
        <div className="hero-right-controls">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="hero-sound-btn"
            aria-label={isMuted ? 'Play ambient fashion sound' : 'Mute ambient sound'}
            title={isMuted ? 'Enable Ambient Haute Couture Sound' : 'Mute Sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="hero-sound-icon" />
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="hero-sound-icon animate-pulse" />
                <span>Audio Playing</span>
              </>
            )}
          </button>

          <div className="hero-seal-badge">
            <div className="hero-seal-pulse-dot animate-ping" />
            <span className="hero-seal-text">Silk Mark India Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};
