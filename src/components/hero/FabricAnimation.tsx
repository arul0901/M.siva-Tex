import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionDirection } from './HeroTypes';

interface FabricAnimationProps {
  isTransitioning: boolean;
  transitionDirection: TransitionDirection;
}

export const FabricAnimation: React.FC<FabricAnimationProps> = ({
  isTransitioning,
  transitionDirection
}) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{
            x: transitionDirection === 'next' ? '-100%' : '100%',
            opacity: 0
          }}
          animate={{
            x: transitionDirection === 'next' ? '100%' : '-100%',
            opacity: 1
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.35, ease: [0.33, 1, 0.68, 1] }}
          className="cinematic-hero-silk-wave-wrapper"
        >
          <svg
            className="cinematic-hero-silk-wave-svg"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="silkSheenGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
                <stop offset="35%" stopColor="rgba(236, 186, 81, 0.55)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.85)" />
                <stop offset="65%" stopColor="rgba(212, 175, 55, 0.6)" />
                <stop offset="100%" stopColor="rgba(77, 0, 7, 0)" />
              </linearGradient>
              <filter id="silkBlurFilter" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
            </defs>
            <path
              d="M-200,0 C300,280 400,680 800,450 C1200,220 1300,750 1800,900 L1800,0 Z"
              fill="url(#silkSheenGold)"
              filter="url(#silkBlurFilter)"
            />
            <path
              d="M-200,100 C200,400 600,150 900,550 C1200,950 1500,350 1800,700 L1800,900 L-200,900 Z"
              fill="rgba(212, 175, 55, 0.2)"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
