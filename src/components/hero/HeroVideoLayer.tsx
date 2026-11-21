import React, { useEffect, useState, useRef } from 'react';
import { TransitionDirection } from './HeroTypes';

export const SCENE_TIMESTAMPS = [0, 4.8, 10.4, 16.0];

interface HeroVideoLayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  currentSlide: number;
  isPlaying: boolean;
  isMuted: boolean;
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
  onSlideChange?: (index: number) => void;
  onTransitionStateChange?: (inTransition: boolean) => void;
}

export const HeroVideoLayer: React.FC<HeroVideoLayerProps> = ({
  videoRef,
  currentSlide,
  isPlaying,
  isMuted,
  isTransitioning,
  transitionDirection,
  onSlideChange,
  onTransitionStateChange
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const isSeekingRef = useRef(false);
  const lastTransitionStateRef = useRef<boolean>(false);
  const lastSlideRef = useRef<number>(currentSlide);

  // Responsive check for mobile banner video
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync play/pause with prop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying, videoRef]);

  // Sync mute state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted, videoRef]);

  // Seek video to corresponding scene when slide changes from user interaction
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const targetTime = SCENE_TIMESTAMPS[currentSlide] ?? 0;
    // Only seek if difference is greater than 1.2s to prevent fighting continuous playback
    if (Math.abs(video.currentTime - targetTime) > 1.2) {
      isSeekingRef.current = true;
      video.currentTime = targetTime;
      const timer = setTimeout(() => {
        isSeekingRef.current = false;
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, videoRef]);

  // High-precision RAF loop to hide text during saree transitions and reveal when the lady appears
  useEffect(() => {
    let animId: number;

    const checkTransitionSync = () => {
      const video = videoRef.current;
      if (video && !isSeekingRef.current) {
        const t = video.currentTime;

        // Transition windows where saree fabric sweep/camera movement is taking place
        const inTransition =
          (t >= 3.7 && t < 4.8) ||
          (t >= 9.3 && t < 10.4) ||
          (t >= 14.9 && t < 16.0) ||
          (t >= 20.5 && t < 21.6);

        // Notify transition state change (hide text during saree transition)
        if (inTransition !== lastTransitionStateRef.current) {
          lastTransitionStateRef.current = inTransition;
          onTransitionStateChange?.(inTransition);
        }

        // When lady arrives with the saree (out of transition), sync the active slide
        if (!inTransition) {
          let targetSlide = 0;
          if (t >= 16.0 && t < 20.5) targetSlide = 3;
          else if (t >= 10.4 && t < 14.9) targetSlide = 2;
          else if (t >= 4.8 && t < 9.3) targetSlide = 1;
          else targetSlide = 0; // t >= 21.6 or t < 3.7

          if (targetSlide !== lastSlideRef.current) {
            lastSlideRef.current = targetSlide;
            onSlideChange?.(targetSlide);
          }
        }
      }

      animId = requestAnimationFrame(checkTransitionSync);
    };

    animId = requestAnimationFrame(checkTransitionSync);
    return () => cancelAnimationFrame(animId);
  }, [onSlideChange, onTransitionStateChange, videoRef]);

  return (
    <div className={`cinematic-hero-video-stage ${isVideoLoaded ? 'is-ready' : 'is-loading'}`}>
      <div className="cinematic-hero-video-container">
        <video
          ref={videoRef}
          key={isMobile ? 'hero-mobile-video' : 'hero-desktop-video'}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="/assets/video/banner_poster.jpg"
          className="cinematic-hero-video-element"
          onLoadedData={() => setIsVideoLoaded(true)}
          onCanPlay={() => setIsVideoLoaded(true)}
        >
          {isMobile ? (
            <>
              <source src="/assets/video/banner_mobile.mp4" type="video/mp4" />
              <source src="/assests/video/banner_mobile.mp4" type="video/mp4" />
              <source src="/videos/banner_mobile.mp4" type="video/mp4" />
              <source src="/banner_mobile.mp4" type="video/mp4" />
            </>
          ) : (
            <>
              <source src="/banner.mp4" type="video/mp4" />
              <source src="/videos/banner.mp4" type="video/mp4" />
              <source src="/assets/video/banner.mp4" type="video/mp4" />
            </>
          )}
          Your browser does not support high-definition video banner.
        </video>

        {/* Cinematic Golden Sheen Sweep on Slide / Chapter Transition */}
        {isTransitioning && (
          <div className={`cinematic-hero-video-sheen is-${transitionDirection}`} />
        )}
      </div>

      {/* Lighting overlays and scrims removed as requested */}
    </div>
  );
};
