import React from 'react';
import { HeroSlide, TransitionDirection } from './HeroTypes';

interface HeroImageLayerProps {
  slides: HeroSlide[];
  currentSlide: number;
  prevSlide: number | null;
  transitionDirection: TransitionDirection;
  isTransitioning: boolean;
}

export const HeroImageLayer: React.FC<HeroImageLayerProps> = ({
  slides,
  currentSlide,
  prevSlide,
  transitionDirection,
  isTransitioning
}) => {
  return (
    <div className="cinematic-hero-model-container">
      {slides.map((slide, idx) => {
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
              className={`cinematic-hero-model-img ${slide.posClass}`}
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
  );
};
