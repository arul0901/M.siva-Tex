import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/editorial-featured.css';

export const EditorialFeatured: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();

  const handleNavigate = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="editorial-section">
      <div className="editorial-grid">
        
        {/* ======================================================== */}
        {/* LEFT PANEL — BRIDAL COLLECTION (Deep Maroon #4D0007)     */}
        {/* ======================================================== */}
        <div className="editorial-panel-bridal">
          
          <div className="editorial-overlay-watermark" />

          {/* Model Background Image filling allocated right area */}
          <div className="editorial-panel-img-wrap">
            <img
              src="/assets/siva-tex/siva-sarees-7.jpg"
              alt="Bridal Silk Saree with Gold Zari"
              className="editorial-panel-img"
            />
            <div className="editorial-fade-maroon" />
          </div>

          {/* Top Eyebrow */}
          <div className="editorial-panel-top">
            <div className="editorial-eyebrow-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MADE FOR YOUR FOREVER</span>
            </div>
          </div>

          {/* Center / Bottom Content */}
          <div className="editorial-panel-body">
            <h3 className="editorial-heading-bridal">
              The Bridal <br />
              <span className="editorial-heading-accent-gold">Edit</span>
            </h3>

            <p className="editorial-desc-bridal">
              Timeless silk, intricate craftsmanship and unforgettable elegance for your most cherished moments. Handwoven with certified 24K gold zari on ancestral pit looms.
            </p>

            <div>
              <button
                onClick={() => handleNavigate('Bridal Silk')}
                className="editorial-cta-bridal"
              >
                <span>EXPLORE BRIDAL</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Accreditation Badge */}
          <div className="editorial-panel-badge-bridal">
            <span>Pure Mulberry Silk</span>
            <span>Silk Mark India</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANEL — HERITAGE SILKS (Luminous Temple Gold Panel) */}
        {/* ======================================================== */}
        <div className="editorial-panel-heritage">
          
          <div className="editorial-overlay-gold" />

          {/* Model Background Image filling right area */}
          <div className="editorial-panel-img-wrap">
            <img
              src="/assets/siva-tex/siva-sarees-4.jpg"
              alt="Kanchipuram Heritage Silk Saree"
              className="editorial-panel-img"
            />
            <div className="editorial-fade-gold" />
          </div>

          {/* Top Eyebrow */}
          <div className="editorial-panel-top">
            <div className="editorial-eyebrow-maroon">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A LEGACY OF WEAVING</span>
            </div>
          </div>

          {/* Center / Bottom Content */}
          <div className="editorial-panel-body">
            <h3 className="editorial-heading-heritage">
              Heritage <br />
              <span className="editorial-heading-accent-maroon">Silks</span>
            </h3>

            <p className="editorial-desc-heritage">
              Discover the beauty of traditional craftsmanship woven into every extraordinary detail. Sourced directly from our master weavers in Kanchipuram and Varanasi.
            </p>

            <div>
              <button
                onClick={() => handleNavigate('Kanchipuram Silk')}
                className="editorial-cta-heritage"
              >
                <span>EXPLORE SILKS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Accreditation Badge */}
          <div className="editorial-panel-badge-heritage">
            <span>Three-Shuttle Korvai</span>
            <span>Est. 1974</span>
          </div>
        </div>

      </div>
    </section>
  );
};
