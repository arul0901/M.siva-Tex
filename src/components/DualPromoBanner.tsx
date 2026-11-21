import React, { useRef, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/dual-promo-banner.css';

export const DualPromoBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();
  const [card1Hovered, setCard1Hovered] = useState(false);
  const [card2Hovered, setCard2Hovered] = useState(false);

  const handleShopCategory = (category: string | null) => {
    setSelectedCategoryFilter(category);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="dual-promo-section" aria-label="Featured Collections">
      {/* Decorative top border */}
      <div className="dual-promo-top-border">
        <span className="dual-promo-border-line" />
        <span className="dual-promo-border-diamond">◆</span>
        <span className="dual-promo-border-line" />
      </div>

      <div className="dual-promo-container">

        {/* Section Header */}
        <div className="dual-promo-header">
          <p className="dual-promo-eyebrow">
            <Sparkles className="dual-promo-eyebrow-icon" />
            Curated Collections
            <Sparkles className="dual-promo-eyebrow-icon" />
          </p>
          <h2 className="dual-promo-heading">
            Draped in <em>Elegance</em>
          </h2>
          <p className="dual-promo-heading-sub">
            Discover our signature weaves — where every thread tells a story of heritage and grace.
          </p>
        </div>

        {/* Two-Card Grid */}
        <div className="dual-promo-grid">

          {/* ── Card 1: Festive Essentials ── */}
          <div
            className={`dual-promo-card card-festive${card1Hovered ? ' hovered' : ''}`}
            onClick={() => handleShopCategory('Kanchipuram Silk')}
            onMouseEnter={() => setCard1Hovered(true)}
            onMouseLeave={() => setCard1Hovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleShopCategory('Kanchipuram Silk');
            }}
            aria-label="Shop Festive Essentials – Kanchipuram Silk"
          >
            {/* Full-bleed background image */}
            <div className="dpc-bg-wrap">
              <img
                src="/assets/promo-festive.jpg"
                alt="Festive Kanchipuram Silk Sarees"
                className="dpc-bg-img"
                loading="lazy"
              />
              <div className="dpc-bg-overlay" />
            </div>

            {/* Gold zari corner ornament */}
            <div className="dpc-corner-ornament dpc-corner-tl" />
            <div className="dpc-corner-ornament dpc-corner-tr" />
            <div className="dpc-corner-ornament dpc-corner-bl" />
            <div className="dpc-corner-ornament dpc-corner-br" />

            {/* Badge */}
            <div className="dpc-badge badge-gold">
              <span>SEASON SPECIAL</span>
            </div>

            {/* Content overlay at bottom */}
            <div className="dpc-content">
              <p className="dpc-eyebrow">Kanchipuram Silk</p>
              <h3 className="dpc-title">
                Festive<br />
                <em>Essentials</em>
              </h3>
              <p className="dpc-subtitle">
                Light fabrics. Fresh weaves.<br />Endless grace.
              </p>
              <button
                type="button"
                className="dpc-btn dpc-btn-gold"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShopCategory('Kanchipuram Silk');
                }}
              >
                <span>Explore Now</span>
                <ArrowRight className="dpc-btn-icon" />
              </button>
            </div>

            {/* Animated shimmer strip on hover */}
            <div className="dpc-shimmer" />
          </div>

          {/* ── Card 2: Bridal Silks ── */}
          <div
            className={`dual-promo-card card-bridal${card2Hovered ? ' hovered' : ''}`}
            onClick={() => handleShopCategory('Bridal Silk')}
            onMouseEnter={() => setCard2Hovered(true)}
            onMouseLeave={() => setCard2Hovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleShopCategory('Bridal Silk');
            }}
            aria-label="Shop Bridal Silks – Up to 30% Off"
          >
            {/* Full-bleed background image */}
            <div className="dpc-bg-wrap">
              <img
                src="/assets/promo-bridal.jpg"
                alt="Heirloom Bridal Silk Sarees"
                className="dpc-bg-img"
                loading="lazy"
              />
              <div className="dpc-bg-overlay dpc-bg-overlay-bridal" />
            </div>

            {/* Gold zari corner ornament */}
            <div className="dpc-corner-ornament dpc-corner-tl" />
            <div className="dpc-corner-ornament dpc-corner-tr" />
            <div className="dpc-corner-ornament dpc-corner-bl" />
            <div className="dpc-corner-ornament dpc-corner-br" />

            {/* Badge */}
            <div className="dpc-badge badge-maroon">
              <span>UP TO 30% OFF</span>
            </div>

            {/* Content overlay at bottom */}
            <div className="dpc-content">
              <p className="dpc-eyebrow">Heirloom Bridal Collection</p>
              <h3 className="dpc-title">
                Bridal<br />
                <em>Silks</em>
              </h3>
              <p className="dpc-subtitle">
                Pure 24K gold zari. Sacred korvai<br />weaves for auspicious beginnings.
              </p>
              <button
                type="button"
                className="dpc-btn dpc-btn-ivory"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShopCategory('Bridal Silk');
                }}
              >
                <span>Shop Bridal Edit</span>
                <ArrowRight className="dpc-btn-icon" />
              </button>
            </div>

            {/* Animated shimmer strip on hover */}
            <div className="dpc-shimmer" />
          </div>

        </div>

      </div>

      {/* Decorative bottom border */}
      <div className="dual-promo-top-border">
        <span className="dual-promo-border-line" />
        <span className="dual-promo-border-diamond">◆</span>
        <span className="dual-promo-border-line" />
      </div>
    </section>
  );
};

export default DualPromoBanner;
