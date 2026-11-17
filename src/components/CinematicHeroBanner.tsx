import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useShop } from '../context/ShopContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_SLIDES, TransitionDirection } from './hero/HeroTypes';
import { HeroBackground } from './hero/HeroBackground';
import { HeroImageLayer } from './hero/HeroImageLayer';
import { FabricAnimation } from './hero/FabricAnimation';
import { HeroContent } from './hero/HeroContent';
import { HeroProgressIndicator } from './hero/HeroProgressIndicator';
import { HeroNavigation } from './hero/HeroNavigation';
import '../styles/cinematic-hero.css';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>('next');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { setCurrentView, setSelectedCategoryFilter, setIsConciergeOpen } = useShop();

  const audioRef = useRef<HTMLAudioElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeSlide = HERO_SLIDES[currentSlide];

  // 1. Audio Ambient Runway Soundtrack Sync
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

  // 2. GSAP ScrollTrigger Cinematic Parallax & Fade Animation
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

      // Parallax Model Shift (creates 3D layered depth)
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

  // 3. Slide Transition Handlers with Saree Blending Physics
  const goToSlide = useCallback((index: number, direction?: TransitionDirection) => {
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
    goToSlide((currentSlide + 1) % HERO_SLIDES.length, 'next');
  }, [currentSlide, goToSlide]);

  const prevSlideFn = useCallback(() => {
    goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, 'prev');
  }, [currentSlide, goToSlide]);

  // Clean up transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

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
      if (e.key === 'ArrowLeft') prevSlideFn();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlideFn]);

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
        prevSlideFn();
      }
    }
    touchStartXRef.current = null;
  };

  // 7. CTA Action Handlers
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
      {/* 1. Ambient Background Layer, Lighting Overlays & Floating Petals */}
      <HeroBackground />

      {/* 2. Crystal-Clear High-Resolution Model Layer with Saree Fabric Transition Blending */}
      <HeroImageLayer
        slides={HERO_SLIDES}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        transitionDirection={transitionDirection}
        isTransitioning={isTransitioning}
      />

      {/* 3. Flowing Silk Fabric Transition Wave (Triggered on slide change) */}
      <FabricAnimation
        isTransitioning={isTransitioning}
        transitionDirection={transitionDirection}
        currentSlide={currentSlide}
      />

      {/* 4. Editorial Narrative Content & CTAs */}
      <HeroContent
        slide={activeSlide}
        onPrimaryCta={handlePrimaryCta}
        onSecondaryCta={handleSecondaryCta}
      />

      {/* 5. Vertical Slide Indicators (Right Edge, exactly as reference video) */}
      <HeroProgressIndicator
        slides={HERO_SLIDES}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
      />

      {/* 6. Bottom Navigation Controls & Audio Sync */}
      <HeroNavigation
        onPrevSlide={prevSlideFn}
        onNextSlide={nextSlide}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Audio Element for Runway Soundtrack */}
      <audio
        ref={audioRef}
        src="/assets/video/ambient_fashion_soundtrack.mp3"
        loop
        preload="auto"
      />
    </section>
  );
};
