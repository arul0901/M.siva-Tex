import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/editorial-triptych.css';

export const EditorialTriptych: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, setIsConciergeOpen } = useShop();

  const handleExploreWeaves = () => {
    setSelectedCategoryFilter('Kanchipuram Silk');
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConcierge = () => {
    setIsConciergeOpen(true);
  };

  return (
    <section 
      className="editorial-triptych-section"
      aria-label="A Symphony of Tradition and Craftsmanship - The Legacy of Divinity"
    >
      <div className="editorial-triptych-container">
        <div className="editorial-triptych-grid">
          
          {/* 1. Left Wing: A Symphony of Tradition & Craftsmanship */}
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

          {/* 2. Center Hero Editorial Photograph */}
          <div className="editorial-center-frame">
            {/* Generated Haute Couture Editorial Image */}
            <img
              src="/assets/siva-tex/editorial-triptych.jpg"
              alt="M. Siva-Tex Royal Heirloom Sarees - Haute Couture Editorial"
              className="editorial-hero-img"
              loading="lazy"
            />

            {/* Dramatic Palace Lighting & Vignette Overlay */}
            <div className="editorial-img-vignette" />
          </div>

          {/* 3. Right Wing: The Legacy of Divinity */}
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
      </div>
    </section>
  );
};

export default EditorialTriptych;
