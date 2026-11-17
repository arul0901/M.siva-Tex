import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSlide } from './HeroTypes';
import { HeroTypography } from './HeroTypography';
import { HeroActions } from './HeroActions';

interface HeroContentProps {
  slide: HeroSlide;
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  slide,
  onPrimaryCta,
  onSecondaryCta
}) => {
  return (
    <div className="cinematic-hero-content-wrap">
      <div className="cinematic-hero-text-block">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroTypography slide={slide} />
            <HeroActions
              slide={slide}
              onPrimaryCta={onPrimaryCta}
              onSecondaryCta={onSecondaryCta}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
