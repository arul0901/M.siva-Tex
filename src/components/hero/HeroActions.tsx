import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSlide } from './HeroTypes';

interface HeroActionsProps {
  slide: HeroSlide;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  slide,
  onPrimaryCta,
  onSecondaryCta
}) => {
  return (
    <div className="cinematic-hero-cta-group">
      <button onClick={onPrimaryCta} className="cinematic-hero-btn-gold">
        <span>{slide.primaryCta}</span>
        <ArrowRight className="cinematic-hero-btn-arrow" />
      </button>

      <button onClick={onSecondaryCta} className="cinematic-hero-btn-outline">
        <span>{slide.secondaryCta}</span>
      </button>

      <div className="cinematic-hero-tag-pill">
        <span>{slide.tag}</span>
      </div>
    </div>
  );
};
