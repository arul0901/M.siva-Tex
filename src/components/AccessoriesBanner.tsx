import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/accessories-banner.css';

export const AccessoriesBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, addToast } = useShop();

  const handleShopAccessories = () => {
    setSelectedCategoryFilter(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast('Zari & Pallu Archives', 'Explore pure 24K gold zari handloom sarees with heirloom border craftsmanship.', 'gold');
  };

  return (
    <section className="craft-banner-section">
      <div className="craft-banner-fade-left" />

      {/* Right Background Image: Pure gold zari pallu and intricate motifs */}
      <div className="craft-banner-img-wrap">
        <img
          src="/assets/siva-tex/siva-sarees-pallu.jpg"
          alt="Artisanal Pure Silk Saree Zari Pallu with Hand-knotted Tassels"
          className="craft-banner-img"
          loading="lazy"
        />
        <div className="craft-banner-fade-right" />
      </div>

      <div className="craft-banner-container">
        <div className="craft-banner-content">
          
          {/* Eyebrow */}
          <div className="craft-banner-eyebrow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ART OF THE PALLU</span>
          </div>

          {/* Heading */}
          <h2 className="craft-banner-heading">
            Zari & Pallu Craft
          </h2>

          {/* Description */}
          <p className="craft-banner-desc">
            Every pure silk saree from M. Siva-Tex features intricate 24K gold dipped silver zari handwoven with sacred Mayil Chakram, Rudraksha, and temple Korvai borders. Finished with traditional hand-knotted silk tassels.
          </p>

          {/* Curated Feature Badges */}
          <div className="craft-banner-badges">
            <span className="craft-badge-item">
              24K Gold Dipped Zari
            </span>
            <span className="craft-badge-item">
              Pit Loom Weaving
            </span>
            <span className="craft-badge-item">
              Hand-Knotted Tassels
            </span>
          </div>

          {/* CTA Button */}
          <div>
            <button
              onClick={handleShopAccessories}
              className="craft-banner-cta-btn"
            >
              <span>EXPLORE ZARI CRAFT</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
