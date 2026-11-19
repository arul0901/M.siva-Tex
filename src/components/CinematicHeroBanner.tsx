import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useShop } from '../context/ShopContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_SLIDES, TransitionDirection } from './hero/HeroTypes';
import { HeroBackground } from './hero/HeroBackground';
import { HeroImageLayer } from './hero/HeroImageLayer';
import { HeroVideoLayer } from './hero/HeroVideoLayer';
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
  const videoRef = useRef<HTMLVideoElement>(null);
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

  // 2. GSAP ScrollTrigger Cinematic Parallax & Fade Animation on banner.mp4 & Elements
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: banner,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const video = videoRef.current;
            if (!video) return;
            const velocity = Math.abs(self.getVelocity());
            if (velocity > 250) {
              video.playbackRate = Math.min(1.0 + velocity / 3200, 1.35);
            } else {
              video.playbackRate = 1.0;
            }
          }
        }
      });

      // Cinematic Parallax Video Zoom & Translation on banner.mp4
      tl.to('.cinematic-hero-video-container', {
        scale: 1.15,
        yPercent: 20,
        ease: 'none',
      }, 0);

      // Video element subtle contrast & lighting depth
      tl.to('.cinematic-hero-video-element', {
        filter: 'brightness(0.85) contrast(1.08)',
        ease: 'none',
      }, 0);

      // Model fallback layer shift (matching depth)
      tl.to('.cinematic-hero-model-container', {
        yPercent: 18,
        scale: 1.05,
        ease: 'none',
      }, 0);

      // Upward drift, soft blur, and fade for narrative text
      tl.to('.cinematic-hero-text-block', {
        y: -110,
        opacity: 0,
        filter: 'blur(3px)',
        ease: 'power1.out',
      }, 0);

      // Scroll to explore indicator prompt fades out quickly
      tl.to('.cinematic-hero-scroll-prompt', {
        y: 25,
        opacity: 0,
        duration: 0.25,
        ease: 'power1.out',
      }, 0);

      // Controls and indicators glide away gently
      tl.to('.cinematic-hero-bottom-bar', {
        y: 45,
        opacity: 0,
        ease: 'power1.out',
        duration: 0.45,
      }, 0);

      tl.to('.cinematic-hero-vertical-indicators', {
        x: 35,
        opacity: 0,
        ease: 'power1.out',
        duration: 0.45,
      }, 0);

      // Ambient background deepening toward imperial maroon of the next section
      tl.to('.cinematic-hero-bg-ambience', {
        backgroundColor: '#4D0007',
        opacity: 0.95,
        ease: 'none',
      }, 0);

      tl.to('.cinematic-hero-video-vignette-bottom', {
        opacity: 0.95,
        height: '240px',
        ease: 'none',
      }, 0);

      // Floating canvas petals accelerate smoothly upwards
      tl.to('.cinematic-hero-canvas-petals', {
        y: -150,
        opacity: 0.2,
        ease: 'none',
      }, 0);
    }, banner);

    return () => {
      ctx.revert();
    };
  }, []);

  // 3. Slide Transition Handlers
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
    }, 1250);
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % HERO_SLIDES.length, 'next');
  }, [currentSlide, goToSlide]);

  const prevSlideFn = useCallback(() => {
    goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length, 'prev');
  }, [currentSlide, goToSlide]);

  // Handle continuous video scene updates
  const handleVideoSceneSync = useCallback((sceneIndex: number) => {
    if (sceneIndex === currentSlide) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(sceneIndex);
    setTransitionDirection('next');
    setIsTransitioning(true);

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setPrevSlide(null);
      setIsTransitioning(false);
    }, 1250);
  }, [currentSlide]);

  // Clean up transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // 4. Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlideFn();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlideFn]);

  // 5. Touch Swipe Support
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

  // 6. CTA Action Handlers
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

  const handleScrollDown = () => {
    const nextSection = document.getElementById('shop-by-occasion');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
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

      {/* 2. Crystal-Clear High-Resolution Model Layer (Instant Fallback / Low-Bandwidth Layer) */}
      <HeroImageLayer
        slides={HERO_SLIDES}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
        transitionDirection={transitionDirection}
        isTransitioning={isTransitioning}
      />

      {/* 3. Master Cinematic Video Banner (banner.mp4 with 60fps luxury playback & scroll animation) */}
      <HeroVideoLayer
        videoRef={videoRef}
        currentSlide={currentSlide}
        isPlaying={isPlaying}
        isMuted={isMuted}
        isTransitioning={isTransitioning}
        transitionDirection={transitionDirection}
        onSlideChange={handleVideoSceneSync}
      />

      {/* 4. Flowing Silk Fabric Transition Wave (Triggered on slide change) */}
      <FabricAnimation
        isTransitioning={isTransitioning}
        transitionDirection={transitionDirection}
        currentSlide={currentSlide}
        prevSlide={prevSlide}
      />

      {/* 5. Editorial Narrative Content & CTAs */}
      <HeroContent
        slide={activeSlide}
        onPrimaryCta={handlePrimaryCta}
        onSecondaryCta={handleSecondaryCta}
      />

      {/* 6. Vertical Slide Indicators (Right Edge, exactly as reference video) */}
      <HeroProgressIndicator
        slides={HERO_SLIDES}
        currentSlide={currentSlide}
        onSelectSlide={goToSlide}
      />

      {/* 7. Luxury Scroll to Explore Indicator */}
      <button
        onClick={handleScrollDown}
        className="cinematic-hero-scroll-prompt"
        aria-label="Scroll down to explore M. Siva-Tex collections"
      >
        <span className="cinematic-hero-scroll-text">Scroll to Explore</span>
        <div className="cinematic-hero-scroll-line-wrap">
          <div className="cinematic-hero-scroll-line" />
        </div>
      </button>

      {/* 8. Bottom Navigation Controls & Audio Sync */}
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
