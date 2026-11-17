import React, { useState } from 'react';
import { WEAVING_HERITAGE_STEPS } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeritageCraft: React.FC = () => {
  const { setCurrentView } = useShop();
  const [activeStep, setActiveStep] = useState(0);

  const stepImages = [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1610030469668-9655ecf3e696?auto=format&fit=crop&w=1000&q=80'
  ];

  return (
    <section className="py-20 sm:py-28 bg-beige/25 border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Vision */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-medium text-xs tracking-[0.25em] uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ancestral Weaving Legacy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-burgundy font-normal tracking-wide">
            The Art of the Saree
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto my-3" />
          <p className="text-sm sm:text-base text-brown-deep/80 font-light leading-relaxed">
            A single M. Siva-Tex pure silk saree takes up to 45 days of rhythmic dedication on ancient wooden pit looms. Explore the sacred journey from raw cocoon to heirloom drape.
          </p>
        </div>

        {/* Interactive Craft Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Step Selector List (Left) */}
          <div className="lg:col-span-5 space-y-3">
            {WEAVING_HERITAGE_STEPS.map((item: any, idx: number) => (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-sm border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                  activeStep === idx
                    ? 'bg-ivory border-gold shadow-luxury text-burgundy'
                    : 'bg-transparent border-gold/15 hover:bg-ivory/60 text-brown-deep/70'
                }`}
              >
                <span className={`font-serif text-lg font-bold shrink-0 ${activeStep === idx ? 'text-gold' : 'text-brown-deep/40'}`}>
                  {item.step}
                </span>
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-semibold leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-brown-deep/70 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Showcase Box (Right) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-sm overflow-hidden bg-burgundy-dark shadow-2xl border border-gold/40">
              <div className="relative h-[420px] sm:h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src={stepImages[activeStep]}
                    alt={WEAVING_HERITAGE_STEPS[activeStep].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/95 via-burgundy/40 to-transparent" />

                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-ivory">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-burgundy/80 border border-gold/40 rounded-full text-gold-light text-[11px] font-serif uppercase tracking-widest mb-2">
                    <Award className="w-3.5 h-3.5 text-gold" />
                    <span>Stage {WEAVING_HERITAGE_STEPS[activeStep].step} of 06</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-ivory font-medium mb-2">
                    {WEAVING_HERITAGE_STEPS[activeStep].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-beige-light/90 font-light leading-relaxed max-w-xl">
                    {WEAVING_HERITAGE_STEPS[activeStep].description}
                  </p>
                </div>
              </div>

              {/* Silk Mark India Authenticity Strip */}
              <div className="bg-burgundy p-4 flex items-center justify-between border-t border-gold/30">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-gold" />
                  <div>
                    <h5 className="font-serif text-xs font-bold text-ivory tracking-wider uppercase">
                      Silk Mark India Certified Pure Handlooms
                    </h5>
                    <p className="text-[10px] text-gold-pale/80 font-sans">
                      Authorized Label No. SMI-KPM-9281. 100% pure natural silk guaranteed.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView('heritage')}
                  className="text-xs font-serif uppercase tracking-wider text-gold hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

