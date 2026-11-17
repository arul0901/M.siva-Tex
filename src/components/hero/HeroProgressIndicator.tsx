import React from 'react';
import { HeroSlide } from './HeroTypes';

interface HeroProgressIndicatorProps {
  slides: HeroSlide[];
  currentSlide: number;
  onSelectSlide: (index: number) => void;
}

export const HeroProgressIndicator: React.FC<HeroProgressIndicatorProps> = ({
  slides,
  currentSlide,
  onSelectSlide
}) => {
  return (
    <div className="cinematic-hero-vertical-indicators" aria-label="Hero slide navigation">
      {slides.map((slide, idx) => (
        <button
          key={slide.id}
          onClick={() => onSelectSlide(idx)}
          className={`cinematic-hero-indicator-btn ${idx === currentSlide ? 'active' : ''}`}
          aria-label={`Switch to slide ${idx + 1}: ${slide.title}`}
        >
          <div className="cinematic-hero-indicator-dot" />
          <span className="cinematic-hero-indicator-tooltip">{slide.title}</span>
        </button>
      ))}
    </div>
  );
};
