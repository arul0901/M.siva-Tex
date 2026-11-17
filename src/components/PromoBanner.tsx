import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Copy, Check, Gift } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { addToast, applyCoupon, setCurrentView } = useShop();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME10');
    setCopied(true);
    applyCoupon('WELCOME10');
    addToast('Coupon Copied & Applied!', 'WELCOME10 has been copied and activated for your shopping bag.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-burgundy-dark text-ivory">
      {/* Background with silk zari imagery and rich burgundy vignette */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80"
          alt="Intricate Zari Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Luxury Pattern Grid & Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-wine/50 via-burgundy/80 to-burgundy-dark/95 z-0" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Decorative Gold Border Frame */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="border border-gold/30 p-8 sm:p-14 text-center relative backdrop-blur-xs">
          
          {/* Corner Flourishes */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-gold" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-gold" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-gold" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-gold" />

          {/* Icon and Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-burgundy/80 border border-gold/40 rounded-full text-gold-light text-xs font-serif uppercase tracking-[0.25em] mb-4">
            <Gift className="w-3.5 h-3.5 text-gold" />
            <span>Auspicious Welcome Privilege</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-ivory tracking-wide leading-tight mb-3">
            A Little Elegance, <span className="italic text-gold-pale">Just for You.</span>
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-beige-light/90 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Enjoy <span className="font-semibold text-gold-light">10% Off Your First Order</span> as we welcome you to the timeless world of M. Siva-Tex pure handloom silks.
          </p>

          {/* Code Copy Box */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div className="flex items-center justify-between w-full sm:w-auto px-6 py-3.5 bg-burgundy/90 border border-dashed border-gold text-gold-pale font-mono tracking-widest text-sm rounded-sm">
              <span className="font-bold mr-4 text-base text-gold">WELCOME10</span>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 text-xs text-ivory hover:text-gold transition-colors font-sans uppercase tracking-wider"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Applied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setCurrentView('shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-gold text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold-light transition-all duration-300 shadow-gold-glow"
            >
              Shop New Arrivals
            </button>
          </div>

          <p className="text-[11px] text-ivory/60 font-serif italic mt-5">
            *Applicable on all Kanchipuram, Banarasi, and Soft Silk collections across India.
          </p>
        </div>
      </div>
    </section>
  );
};
