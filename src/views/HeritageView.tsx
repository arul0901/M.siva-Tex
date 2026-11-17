import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ShieldCheck, Award, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import '../styles/heritage.css';

export const HeritageView: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs font-serif uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Legacy of the Master Weavers</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-burgundy font-normal tracking-wide leading-tight">
            Half a Century of Pure Silk Reverence
          </h1>
          <div className="w-16 h-0.5 bg-gold mx-auto my-4" />
          <p className="text-sm sm:text-base text-brown-deep/80 font-light leading-relaxed">
            Founded in 1974 in the temple town of Kanchipuram, M. Siva-Tex began with a sacred vow: to preserve the dying, labour-intensive three-shuttle Korvai pit loom handloom craft and bring authentic pure silk heirlooms directly to families across India and the globe.
          </p>
        </div>

        {/* Big Editorial Image */}
        <div className="relative h-[400px] sm:h-[500px] rounded-sm overflow-hidden mb-16 shadow-luxury border border-gold/30">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85"
            alt="Handloom Weaving Loom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/90 via-transparent to-transparent flex items-end p-8 sm:p-12">
            <div className="text-ivory max-w-xl">
              <span className="text-gold font-serif text-xs uppercase tracking-widest block mb-1">Authentic Pit Looms</span>
              <h3 className="font-serif text-2xl font-normal text-ivory">Where Every Thread is a Sacred Rhythm</h3>
            </div>
          </div>
        </div>

        {/* Narrative Chapters */}
        <div className="space-y-16 text-brown-deep">
          
          {/* Chapter 1: The Korvai Technique */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-gold block mb-1">Chapter 01</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-burgundy mb-4">
                The Sacred Art of Korvai
              </h2>
              <p className="text-xs sm:text-sm text-brown-deep/80 leading-relaxed font-light mb-3">
                In Tamil, <em>'Korvai'</em> means 'to interlink or knot together'. While mass-produced modern powerlooms print borders onto the body, a true Korvai Kanchipuram requires two master weavers sitting side by side on a pit loom.
              </p>
              <p className="text-xs sm:text-sm text-brown-deep/80 leading-relaxed font-light">
                One weaver manages the body shuttle with vibrant mulberry silk warp, while the other simultaneously interlocks the pure zari borders using a zigzag catch. This creates an unyielding bond that lasts more than 100 years.
              </p>
            </div>
            <div className="aspect-[4/3] rounded-sm overflow-hidden bg-beige shadow-sm border border-gold/20">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
                alt="Korvai Weaving"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Chapter 2: Real 24K Gold & Silver Zari */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
            <div className="md:order-2">
              <span className="text-xs font-serif uppercase tracking-widest text-gold block mb-1">Chapter 02</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-burgundy mb-4">
                Tested & Pure Zari Metallization
              </h2>
              <p className="text-xs sm:text-sm text-brown-deep/80 leading-relaxed font-light mb-3">
                Authentic zari is never made with cheap plastic metallic yarn (lurex). At M. Siva-Tex, our pure zari threads are crafted by wrapping 98.5% pure silver flattened wire around a core silk filament, followed by an electroplated dip into 24-carat liquid gold.
              </p>
              <p className="text-xs sm:text-sm text-brown-deep/80 leading-relaxed font-light">
                This lends that unmistakable muted royal gleam which never turns black or oxidizes even when passed down through four generations of brides.
              </p>
            </div>
            <div className="md:order-1 aspect-[4/3] rounded-sm overflow-hidden bg-beige shadow-sm border border-gold/20">
              <img
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                alt="Pure Zari Motifs"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Chapter 3: Ethical Artisan Cooperatives */}
          <div className="bg-beige/40 p-8 sm:p-12 rounded-sm border border-gold/30 space-y-4 text-center max-w-3xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-burgundy text-gold flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-burgundy">
              Honouring the Weaver: Ethical Loom Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-brown-deep/80 font-light leading-relaxed">
              We work directly with over 120 generational weaving families in Kanchipuram, Arani, and Varanasi. We provide health insurance, guaranteed monthly minimum wages, loom maintenance subsidies, and education grants for weavers' children. When you wear M. Siva-Tex, you sustain a living cultural heritage.
            </p>
          </div>

        </div>

        {/* CTA to Shop */}
        <div className="text-center mt-20 pt-10 border-t border-gold/20">
          <button
            onClick={() => setCurrentView('shop')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-burgundy text-gold-pale hover:bg-gold hover:text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all shadow-luxury"
          >
            <span>Explore Handloom Masterpieces</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

