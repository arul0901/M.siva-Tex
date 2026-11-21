import React from 'react';
import { Sparkles } from 'lucide-react';
import { HeroSlide } from './HeroTypes';

interface HeroTypographyProps {
  slide: HeroSlide;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ slide }) => {
  return (
    <>
      {/* Brand Eyebrow Badge */}
      <div className="cinematic-hero-brand-pill">
        <Sparkles className="cinematic-hero-eyebrow-icon animate-spin-slow" />
        <span className="cinematic-hero-eyebrow-text">{slide.eyebrow}</span>
      </div>

      {/* Title with Luxury Serif Display */}
      <h1 className="cinematic-hero-title">
        <span className="cinematic-hero-title-main">{slide.title}</span>
        <span className="cinematic-hero-title-sub">{slide.subtitle}</span>
      </h1>

      {/* Gold Hairline Divider with Diamond Emblem */}
      <div className="cinematic-hero-gold-line-wrap">
        <div className="cinematic-hero-gold-line" />
        <span className="cinematic-hero-divider-symbol">❖</span>
        <div className="cinematic-hero-gold-line" />
      </div>

      {/* Poetic Collection Description */}
      <p className="cinematic-hero-desc">{slide.description}</p>
    </>
  );
};
