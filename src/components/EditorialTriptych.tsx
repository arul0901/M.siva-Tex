import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/editorial-triptych.css';

export const EditorialTriptych: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, setIsConciergeOpen } = useShop();
  const [activeStory, setActiveStory] = useState<0 | 1>(0);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const handleExploreWeaves = () => {
    setSelectedCategoryFilter('Kanchipuram Silk');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConcierge = () => {
    setIsConciergeOpen(true);
  };

  const scrollToStory = (index: 0 | 1) => {
    setActiveStory(index);
    if (scrollTrackRef.current) {
      const card = scrollTrackRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handleScroll = () => {
    if (scrollTrackRef.current) {
      const { scrollLeft, clientWidth } = scrollTrackRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.8));
      if (index === 0 || index === 1) {
        setActiveStory(index);
      }
    }
  };

  return (
    <section 
      className="editorial-triptych-section"
      aria-label="A Symphony of Tradition and Craftsmanship - The Legacy of Divinity"
    >
      <div className="editorial-triptych-container">
        
        {/* ========================================================
            1. DESKTOP VIEW (lg:grid): 3-Column Triptych Layout
            Ultra-compact, balanced luxury aesthetics
            ======================================================== */}
        <div className="hidden lg:grid editorial-triptych-grid">
          
          {/* Left Wing: A Symphony of Tradition & Craftsmanship */}
          <div className="editorial-wing editorial-wing-left">
            <span className="editorial-eyebrow">
              <Sparkles className="w-3 h-3 text-[#ECBA51]" />
              <span>Sacred Artistry</span>
            </span>

            <h2 className="editorial-title">
              A Symphony Of
              <span className="editorial-title-gold">Tradition & Craftsmanship</span>
            </h2>

            <div className="editorial-divider">
              <span className="editorial-divider-line" />
              <span>❖</span>
              <span className="editorial-divider-line" />
            </div>

            <p className="editorial-desc">
              Pure handloom silk is not merely a drape — it is a timeless celebration of heritage. Each Korvai interlock, each warp and weft spun with authentic 24K dipped zari, speaks of an ancestral artistry that transcends time. Adorn an immortal masterpiece that radiates culture, poise, and royal grandeur.
            </p>

            <button
              onClick={handleExploreWeaves}
              className="editorial-cta-btn"
              aria-label="Explore pure handloom heritage weaves"
            >
              <span>Explore Masterpieces</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Hero Editorial Photograph */}
          <div className="editorial-center-frame">
            <img
              src="/assets/siva-tex/editorial-triptych.jpg"
              alt="M. Siva-Tex Royal Heirloom Sarees - Haute Couture Editorial"
              className="editorial-hero-img"
              loading="lazy"
            />
            <div className="editorial-img-vignette" />
          </div>

          {/* Right Wing: The Legacy of Divinity */}
          <div className="editorial-wing editorial-wing-right">
            <span className="editorial-eyebrow">
              <Sparkles className="w-3 h-3 text-[#ECBA51]" />
              <span>Sanctified Heirlooms</span>
            </span>

            <h2 className="editorial-title">
              The Legacy Of
              <span className="editorial-title-gold">Divinity & Grace</span>
            </h2>

            <div className="editorial-divider">
              <span className="editorial-divider-line" />
              <span>❖</span>
              <span className="editorial-divider-line" />
            </div>

            <p className="editorial-desc">
              Rooted in devotion, crafted with unyielding precision — each piece narrates a story of divine grace and ancestral lore. Enriched with sacred temple motifs of Mayil, Annapakshi, and Kamalam, wrap yourself in eternal majesty, timeless elegance, and a touch of the ethereal.
            </p>

            <button
              onClick={handleOpenConcierge}
              className="editorial-cta-btn"
              aria-label="Book private patron concierge consultation"
            >
              <span>Private Concierge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* ========================================================
            2. MOBILE & TABLET VIEW (lg:hidden): Compact Focal Image + Swipeable Story Cards
            Eliminates 1400px scroll trap, creates seamless mobile shopping
            ======================================================== */}
        <div className="lg:hidden flex flex-col gap-3.5">
          
          {/* Focal Image Frame on Top */}
          <div className="editorial-center-frame aspect-[16/10] max-h-[250px] sm:max-h-[300px]">
            <img
              src="/assets/siva-tex/editorial-triptych.jpg"
              alt="M. Siva-Tex Royal Heirloom Sarees - Haute Couture Editorial"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="editorial-img-vignette" />
          </div>

          {/* Story Chapter Selector Tabs */}
          <div className="flex items-center justify-center gap-2 px-1 pt-0.5">
            <button
              onClick={() => scrollToStory(0)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-secondary uppercase tracking-widest border transition-all flex items-center gap-1.5 ${
                activeStory === 0
                  ? 'bg-[#D4AF37] text-[#220003] border-[#D4AF37] font-bold shadow-xs'
                  : 'bg-white/5 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sacred Artistry</span>
            </button>
            <button
              onClick={() => scrollToStory(1)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-secondary uppercase tracking-widest border transition-all flex items-center gap-1.5 ${
                activeStory === 1
                  ? 'bg-[#D4AF37] text-[#220003] border-[#D4AF37] font-bold shadow-xs'
                  : 'bg-white/5 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Sanctified Heirlooms</span>
            </button>
          </div>

          {/* Horizontal Swipeable Track */}
          <div 
            ref={scrollTrackRef}
            onScroll={handleScroll}
            className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar px-1 py-1"
          >
            {/* Story 1 Card */}
            <div className="w-[88vw] xs:w-[335px] shrink-0 snap-center editorial-wing">
              <span className="editorial-eyebrow">
                <Sparkles className="w-3 h-3 text-[#ECBA51]" />
                <span>Sacred Artistry</span>
              </span>

              <h2 className="editorial-title">
                A Symphony Of
                <span className="editorial-title-gold">Tradition & Craftsmanship</span>
              </h2>

              <div className="editorial-divider">
                <span className="editorial-divider-line" />
                <span>❖</span>
                <span className="editorial-divider-line" />
              </div>

              <p className="editorial-desc">
                Pure handloom silk is not merely a drape — it is a timeless celebration of heritage. Each Korvai interlock, each warp and weft spun with authentic 24K dipped zari, speaks of an ancestral artistry that transcends time.
              </p>

              <button
                onClick={handleExploreWeaves}
                className="editorial-cta-btn min-h-[44px]"
                aria-label="Explore pure handloom heritage weaves"
              >
                <span>Explore Masterpieces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Story 2 Card */}
            <div className="w-[88vw] xs:w-[335px] shrink-0 snap-center editorial-wing">
              <span className="editorial-eyebrow">
                <Sparkles className="w-3 h-3 text-[#ECBA51]" />
                <span>Sanctified Heirlooms</span>
              </span>

              <h2 className="editorial-title">
                The Legacy Of
                <span className="editorial-title-gold">Divinity & Grace</span>
              </h2>

              <div className="editorial-divider">
                <span className="editorial-divider-line" />
                <span>❖</span>
                <span className="editorial-divider-line" />
              </div>

              <p className="editorial-desc">
                Rooted in devotion, crafted with unyielding precision — each piece narrates a story of divine grace and ancestral lore. Enriched with sacred temple motifs of Mayil, Annapakshi, and Kamalam.
              </p>

              <button
                onClick={handleOpenConcierge}
                className="editorial-cta-btn min-h-[44px]"
                aria-label="Book private patron concierge consultation"
              >
                <span>Private Concierge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dots Indicator & Swipe Hint */}
          <div className="flex items-center justify-between px-2 pt-0.5">
            <span className="text-[10px] font-secondary tracking-wider text-[#ECBA51]/75 uppercase">
              {activeStory === 0 ? 'Chapter 1 of 2' : 'Chapter 2 of 2'}
            </span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => scrollToStory(0)}
                aria-label="View Story 1"
                className={`h-2 rounded-full transition-all ${activeStory === 0 ? 'w-5 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/30'}`}
              />
              <button 
                onClick={() => scrollToStory(1)}
                aria-label="View Story 2"
                className={`h-2 rounded-full transition-all ${activeStory === 1 ? 'w-5 bg-[#D4AF37]' : 'w-2 bg-[#D4AF37]/30'}`}
              />
            </div>
            <span className="text-[10px] font-secondary text-[#FAF7F2]/50">
              Swipe ↔
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EditorialTriptych;
