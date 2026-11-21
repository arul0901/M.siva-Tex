import React, { useEffect, useState, useRef } from 'react';
import { TransitionDirection } from './HeroTypes';

export const SCENE_TIMESTAMPS = [0, 4.6, 10.2, 15.8, 21.2];

interface HeroVideoLayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  currentSlide: number;
  isPlaying: boolean;
  isMuted: boolean;
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
  onSlideChange?: (index: number) => void;
}

export const HeroVideoLayer: React.FC<HeroVideoLayerProps> = ({
  videoRef,
  currentSlide,
  isPlaying,
  isMuted,
  isTransitioning,
  transitionDirection,
  onSlideChange
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const isSeekingRef = useRef(false);

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

  // Listen to video time updates to synchronize active slide content during linear playback
  const handleTimeUpdate = () => {
    if (isSeekingRef.current || !onSlideChange) return;
    const video = videoRef.current;
    if (!video) return;

    const t = video.currentTime;
    let newSlide = 0;
    if (t >= 21.2) newSlide = 4;
    else if (t >= 15.8) newSlide = 3;
    else if (t >= 10.2) newSlide = 2;
    else if (t >= 4.6) newSlide = 1;
    else newSlide = 0;

    if (newSlide !== currentSlide) {
      onSlideChange(newSlide);
    }
  };

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
          onTimeUpdate={handleTimeUpdate}
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
