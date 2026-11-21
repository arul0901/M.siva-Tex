import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide } from './HeroTypes';
import { HeroTypography } from './HeroTypography';
import { HeroActions } from './HeroActions';

interface HeroContentProps {
  slide: HeroSlide;
  isVisible: boolean;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  slide,
  isVisible,
  onPrimaryCta,
  onSecondaryCta
}) => {
  return (
    <div className={`cinematic-hero-content-wrap ${isVisible ? 'content-visible' : 'content-hidden'}`}>
      <div className="cinematic-hero-text-block">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroTypography slide={slide} />
              <HeroActions
                slide={slide}
                onPrimaryCta={onPrimaryCta}
                onSecondaryCta={onSecondaryCta}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
