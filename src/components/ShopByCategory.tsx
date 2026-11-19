import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_DATA, SAREE_PRODUCTS } from '../data/sarees';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/shop-by-category.css';

// Curated high-res imagery for each of the 8 categories matching the exact counts from the reference
const CATEGORY_DISPLAY_DATA = [
  {
    categoryKey: 'Kanchipuram Silk',
    name: 'Kanchipuram Silk Sarees',
    subtitle: 'Pure Mulberry Silk & Korvai Three-Shuttle Handloom',
    image: '/assets/siva-tex/siva-sarees-kanchipuram-gold.jpg',
    count: 24,
    badge: 'Heritage Classic'
  },
  {
    categoryKey: 'Banarasi Silk',
    name: 'Banarasi Silk Sarees',
    subtitle: 'Intricate Kadwa Zari Brocades of Varanasi',
    image: '/assets/siva-tex/siva-sarees-banarasi-purple.jpg',
    count: 18,
    badge: 'Royal Brocades'
  },
  {
    categoryKey: 'Soft Silk',
    name: 'Soft Silk Sarees',
    subtitle: 'Featherlight Drape with Luminous Pastel Sheen',
    image: '/assets/siva-tex/siva-sarees-5.jpg',
    count: 32,
    badge: 'Everyday Luxury'
  },
  {
    categoryKey: 'Cotton Sarees',
    name: 'Cotton Sarees',
    subtitle: 'Pure Chanderi & Breathable Chettinad Handloom Weaves',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    count: 15,
    badge: 'Artisanal Handspun'
  },
  {
    categoryKey: 'Georgette Sarees',
    name: 'Georgette Sarees',
    subtitle: 'Flowing Graceful Silhouette with Gold Zari Motifs',
    image: '/assets/siva-tex/siva-sarees-4.jpg',
    count: 19,
    badge: 'Fluid Drape'
  },
  {
    categoryKey: 'Chiffon Sarees',
    name: 'Chiffon Sarees',
    subtitle: 'Ethereal Sheer Elegance for Evening Milestone Soirees',
    image: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=800&q=85',
    count: 14,
    badge: 'Regal Twilight'
  },
  {
    categoryKey: 'Organza Sarees',
    name: 'Organza Sarees',
    subtitle: 'Crisp Glass-Tissue Sheer with Intricate Needlecraft',
    image: '/assets/siva-tex/siva-sarees-3.jpg',
    count: 22,
    badge: 'Contemporary Grace'
  },
  {
    categoryKey: 'Bridal Silk',
    name: 'Bridal Silk Sarees',
    subtitle: 'Sacred Muhurtham Silks with 24K Gold Dipped Zari',
    image: '/assets/siva-tex/siva-sarees-bridal-crimson.jpg',
    count: 28,
    badge: 'Bridal Trousseau'
  }
];

export const ShopByCategory: React.FC = () => {
  const { setSelectedCategoryFilter, setCurrentView } = useShop();

  const handleCategorySelect = (categoryKey: string | null) => {
    setSelectedCategoryFilter(categoryKey);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="shop-by-category-section" id="shop-by-category">
      <div className="shop-by-category-container">
        
        {/* Section Header */}
        <div className="shop-cat-header-wrap">
          <div>
            <div className="shop-cat-eyebrow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Saree Weave / Category</span>
            </div>
            <h2 className="shop-cat-title">
              Shop By <span className="shop-cat-title-italic">Category</span>
            </h2>
            <p className="shop-cat-subtitle">
              Explore 8 authentic regional weaving traditions — each handloom masterpiece crafted by certified master artisans with pure mulberry silk and authentic gold zari.
            </p>
          </div>

          {/* View All Collections Button */}
          <button
            onClick={() => handleCategorySelect(null)}
            className="shop-cat-all-btn"
          >
            <span>All Collections</span>
            <span className="shop-cat-all-count">({SAREE_PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* 8 Categories Grid */}
        <div className="shop-cat-grid">
          {CATEGORY_DISPLAY_DATA.map((cat) => (
            <div
              key={cat.categoryKey}
              className="shop-cat-card group"
              onClick={() => handleCategorySelect(cat.categoryKey)}
            >
              {/* Saree Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="shop-cat-card-img"
                loading="lazy"
              />

              {/* Luxury Vignette Gradient Overlay */}
              <div className="shop-cat-card-overlay" />

              {/* Card Body */}
              <div className="shop-cat-card-body">
                <span className="shop-cat-count-badge">
                  <span>{cat.count} Designs</span>
                </span>
                
                <h3 className="shop-cat-card-title">
                  {cat.name}
                </h3>
                
                <p className="shop-cat-card-subtitle">
                  {cat.subtitle}
                </p>

                <div className="shop-cat-explore-link">
                  <span>Explore Weaves</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
