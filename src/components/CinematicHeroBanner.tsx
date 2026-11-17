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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/cinematic-hero.css';

gsap.registerPlugin(ScrollTrigger);

export interface CinematicSlide {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  categoryTarget: string | null;
  tag: string;
  image: string;
  objectPosition?: string;
}

const CINEMATIC_SLIDES: CinematicSlide[] = [
  {
    id: 1,
    eyebrow: 'THE SAREE GALLERY • EST. 1974',
    title: 'Sarees',
    subtitle: 'Woven for Timeless Stories',
    description: 'Discover ethereal handloom sarees woven with pure mulberry silk and authentic gold zari. A celebration of feminine grace, heritage, and master craftsmanship.',
    primaryCta: 'Explore Sarees',
    secondaryCta: 'Our Heritage',
    categoryTarget: 'Kanchipuram Silk',
    tag: 'Pure Kanchipuram Silk',
    image: '/assets/hero-full.jpg',
    objectPosition: 'center 15%'
  },
  {
    id: 2,
    eyebrow: 'SACRED BRIDAL TROUSSEAU 2026',
    title: 'The Bridal Edit',
    subtitle: 'in Pure 24K Gold Zari',
    description: 'Heirloom-grade bridal Kanjivarams handwoven with pure 24K gold-dipped silver zari on ancient pit looms in Kanchipuram for auspicious beginnings.',
    primaryCta: 'Shop Bridal Edit',
    secondaryCta: 'Book Concierge',
    categoryTarget: 'Bridal Silk',
    tag: '24K Gold Dipped Zari',
    image: '/assets/siva-tex/siva-sarees-bridal-crimson.jpg',
    objectPosition: 'center top'
  },
  {
    id: 3,
    eyebrow: 'A LEGACY OF WEAVING',
    title: 'Our Collections',
    subtitle: 'for Every Celebration',
    description: 'From everyday grace to grand muhurthams. Radiant turmeric gold and mulberry silks with intricate temple borders and hand-interlocked korvai pallus.',
    primaryCta: 'Browse Collections',
    secondaryCta: 'View Lookbook',
    categoryTarget: 'Kanchipuram Silk',
    tag: 'Authentic Korvai Weave',
    image: '/assets/siva-tex/siva-sarees-kanchipuram-gold.jpg',
    objectPosition: 'center top'
  },
  {
    id: 4,
    eyebrow: 'THE IMPERIAL WEAVES',
    title: 'Heritage Silks',
    subtitle: 'with Cultural Soul',
    description: 'Intricate Kadwa floral jaals and interlocking kadhuwa borders hand-engraved on lustrous pure katan silk, celebrating four centuries of imperial textile artistry.',
    primaryCta: 'Discover Banarasi',
    secondaryCta: 'Weaving Process',
    categoryTarget: 'Banarasi Silk',
    tag: 'Master Artisan Handloom',
    image: '/assets/siva-tex/siva-sarees-banarasi-purple.jpg',
    objectPosition: 'center top'
  },
  {
    id: 5,
    eyebrow: 'STEP INTO TIMELESS LUXURY',
    title: 'M. Siva-Tex Atelier',
    subtitle: 'of Authentic Weaves',
    description: 'Preserving authentic three-shuttle Korvai & Kadwa pit loom handloom traditions since 1974. Woven with reverence for celebrations that stay in memory forever.',
    primaryCta: 'Explore All Weaves',
    secondaryCta: 'Virtual Tour',
    categoryTarget: null,
    tag: 'Silk Mark Certified',
    image: '/assets/siva-tex/siva-sarees-7.jpg',
    objectPosition: 'center top'
  }
];

export const CinematicHeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { setCurrentView, setSelectedCategoryFilter, setIsConciergeOpen } = useShop();

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeSlide: CinematicSlide = CINEMATIC_SLIDES[currentSlide];

  // 1. Floating Silk Petals & Golden Bokeh Canvas Animation
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

    const petals: Petal[] = Array.from({ length: 22 }, () => ({
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

  // 2. Audio Ambient Runway Soundtrack Sync
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    audio.muted = isMuted;

    if (!isMuted && isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isMuted, isPlaying]);

  // 3. GSAP ScrollTrigger Cinematic Parallax & Fade Animation
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: banner,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      });

      // Parallax Model Shift
      tl.to('.cinematic-hero-model-container', {
        yPercent: 18,
        scale: 1.03,
        ease: 'none',
      }, 0);

      // Upward drift and soft fade for narrative text
      tl.to('.cinematic-hero-text-block', {
        y: -85,
        opacity: 0.12,
        ease: 'power1.out',
      }, 0);

      // Controls and indicators glide away gently
      tl.to('.cinematic-hero-bottom-bar', {
        y: 35,
        opacity: 0,
        ease: 'power1.out',
        duration: 0.45,
      }, 0);

      tl.to('.cinematic-hero-vertical-indicators', {
        x: 25,
        opacity: 0,
        ease: 'power1.out',
        duration: 0.45,
      }, 0);

      // Ambient background deepening toward imperial maroon of the next section
      tl.to('.cinematic-hero-bg-ambience', {
        backgroundColor: '#4D0007',
        opacity: 0.92,
        ease: 'none',
      }, 0);

      // Floating canvas petals accelerate smoothly upwards
      tl.to('.cinematic-hero-canvas-petals', {
        y: -120,
        opacity: 0.25,
        ease: 'none',
      }, 0);
    }, banner);

    return () => {
      ctx.revert();
    };
  }, []);

  // 4. Slide Transition Handlers with Saree Blending Physics
  const goToSlide = useCallback((index: number, direction?: 'next' | 'prev') => {
    if (index === currentSlide) return;
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    const dir = direction || (index > currentSlide ? 'next' : 'prev');
    setPrevSlide(currentSlide);
    setCurrentSlide(index);
    setTransitionDirection(dir);
    setIsTransitioning(true);

    transitionTimeoutRef.current = setTimeout(() => {
      setPrevSlide(null);
      setIsTransitioning(false);
    }, 1350);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % CINEMATIC_SLIDES.length, 'next');
  }, [currentSlide, goToSlide]);

  const prevSlideFn = useCallback(() => {
    goToSlide((currentSlide - 1 + CINEMATIC_SLIDES.length) % CINEMATIC_SLIDES.length, 'prev');
  }, [currentSlide, goToSlide]);

  // Clean up transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // 5. Automatic Progression (6.8s interval)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6800);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // 6. Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlideFn();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlideFn]);

  // 7. Touch Swipe Support
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
        prevSlideFn();
      }
    }
    touchStartXRef.current = null;
  };

  // 8. CTA Handlers
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
      className="cinematic-hero-wrapper"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="M. Siva-Tex Haute Couture Cinematic Hero Banner"
    >
      {/* 1. Ambient Background Layer */}
      <div className="cinematic-hero-bg-ambience" />

      {/* 2. Crystal-Clear High-Resolution Model Layer with Saree Fabric Transition Blending */}
      <div className="cinematic-hero-model-container">
        {CINEMATIC_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          const isExiting = idx === prevSlide;
          const isVisible = isActive || isExiting;
          if (!isVisible) return null;

          let slideClass = 'cinematic-hero-model-slide';
          if (isActive) {
            slideClass += ' is-active';
            if (isTransitioning) {
              slideClass += ` is-blending-in is-${transitionDirection}`;
            }
          } else if (isExiting) {
            slideClass += ` is-exiting is-${transitionDirection}`;
          }

          return (
            <div key={slide.id} className={slideClass}>
              <img
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                className={`cinematic-hero-model-img cinematic-hero-model-pos-${slide.id}`}
                loading="eager"
              />
              {/* Saree Fabric Gold Sheen Sweep during transition */}
              {isActive && isTransitioning && (
                <div className={`cinematic-hero-saree-sheen-sweep is-${transitionDirection}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Subtle Lighting Overlays & Vignettes */}
      <div className="cinematic-hero-gradient-overlay" />
      <div className="cinematic-hero-vignette-top" />
      <div className="cinematic-hero-vignette-bottom" />

      {/* 4. Canvas Floating Silk Petals & Golden Bokeh */}
      <canvas ref={canvasRef} className="cinematic-hero-canvas-petals" />

      {/* 5. Flowing Silk Fabric Transition Wave (Triggered on slide change) */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{
              x: transitionDirection === 'next' ? '-100%' : '100%',
              opacity: 0
            }}
            animate={{
              x: transitionDirection === 'next' ? '100%' : '-100%',
              opacity: 1
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.35, ease: [0.33, 1, 0.68, 1] }}
            className="cinematic-hero-silk-wave-wrapper"
          >
            <svg
              className="cinematic-hero-silk-wave-svg"
              viewBox="0 0 1440 900"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="silkSheenGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
                  <stop offset="35%" stopColor="rgba(236, 186, 81, 0.55)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.85)" />
                  <stop offset="65%" stopColor="rgba(212, 175, 55, 0.6)" />
                  <stop offset="100%" stopColor="rgba(77, 0, 7, 0)" />
                </linearGradient>
                <filter id="silkBlurFilter" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
              </defs>
              <path
                d="M-200,0 C300,280 400,680 800,450 C1200,220 1300,750 1800,900 L1800,0 Z"
                fill="url(#silkSheenGold)"
                filter="url(#silkBlurFilter)"
              />
              <path
                d="M-200,100 C200,400 600,150 900,550 C1200,950 1500,350 1800,700 L1800,900 L-200,900 Z"
                fill="rgba(212, 175, 55, 0.2)"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Editorial Narrative Content */}
      <div className="cinematic-hero-content-wrap">
        <div className="cinematic-hero-text-block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Brand Eyebrow Badge */}
              <div className="cinematic-hero-brand-pill">
                <Sparkles className="cinematic-hero-eyebrow-icon animate-spin-slow" />
                <span className="cinematic-hero-eyebrow-text">{activeSlide.eyebrow}</span>
              </div>

              {/* Title with Serif Display */}
              <h1 className="cinematic-hero-title">
                <span className="cinematic-hero-title-main">{activeSlide.title}</span>
                <span className="cinematic-hero-title-sub">{activeSlide.subtitle}</span>
              </h1>

              {/* Gold Hairline Divider */}
              <div className="cinematic-hero-gold-line" />

              {/* Description */}
              <p className="cinematic-hero-desc">{activeSlide.description}</p>

              {/* CTA Action Buttons */}
              <div className="cinematic-hero-cta-group">
                <button onClick={handlePrimaryCta} className="cinematic-hero-btn-gold">
                  <span>{activeSlide.primaryCta}</span>
                  <ArrowRight className="cinematic-hero-btn-arrow" />
                </button>

                <button onClick={handleSecondaryCta} className="cinematic-hero-btn-outline">
                  <span>{activeSlide.secondaryCta}</span>
                </button>

                <div className="cinematic-hero-tag-pill">
                  <span>{activeSlide.tag}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 7. Vertical Slide Indicators (Right Edge, exactly as reference video) */}
      <div className="cinematic-hero-vertical-indicators" aria-label="Hero slide navigation">
        {CINEMATIC_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            className={`cinematic-hero-indicator-btn ${idx === currentSlide ? 'active' : ''}`}
            aria-label={`Switch to slide ${idx + 1}: ${slide.title}`}
          >
            <div className="cinematic-hero-indicator-dot" />
            <span className="cinematic-hero-indicator-tooltip">{slide.title}</span>
          </button>
        ))}
      </div>

      {/* 8. Bottom Navigation Controls & Audio */}
      <div className="cinematic-hero-bottom-bar">
        {/* Left Navigation Arrows & Play/Pause */}
        <div className="cinematic-hero-arrows-group">
          <button
            onClick={prevSlideFn}
            className="cinematic-hero-control-btn"
            aria-label="Previous slide"
          >
            <ChevronLeft className="cinematic-hero-control-icon" />
          </button>

          <button
            onClick={nextSlide}
            className="cinematic-hero-control-btn"
            aria-label="Next slide"
          >
            <ChevronRight className="cinematic-hero-control-icon" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="cinematic-hero-control-btn"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? (
              <Pause className="cinematic-hero-control-icon" />
            ) : (
              <Play className="cinematic-hero-control-icon" />
            )}
          </button>
        </div>

        {/* Right Controls: Ambient Music & Silk Mark Badge */}
        <div className="cinematic-hero-right-tools">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="cinematic-hero-audio-btn"
            aria-label={isMuted ? 'Play ambient fashion sound' : 'Mute ambient sound'}
            title={isMuted ? 'Enable Ambient Haute Couture Sound' : 'Mute Sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="cinematic-hero-audio-icon" />
                <span>Sound Off</span>
              </>
            ) : (
              <>
                <Volume2 className="cinematic-hero-audio-icon animate-pulse" />
                <span>Audio Playing</span>
              </>
            )}
          </button>

          <div className="cinematic-hero-hallmark">
            <div className="cinematic-hero-hallmark-pulse animate-ping" />
            <span className="cinematic-hero-hallmark-text">Silk Mark India Certified</span>
          </div>
        </div>
      </div>

      {/* Audio Element for Soundtrack */}
      <audio
        ref={audioRef}
        src="/assets/video/ambient_fashion_soundtrack.mp3"
        loop
        preload="auto"
      />
    </section>
  );
};
