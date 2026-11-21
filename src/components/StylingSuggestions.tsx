import React, { useRef, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight, Sparkles, Check, Heart } from 'lucide-react';
import '../styles/styling-suggestions.css';

interface StylingLook {
  id: string;
  title: string;
  eyebrow: string;
  image: string;
  sareeName: string;
  sareePrice: number;
  accessoriesList: string[];
  blouseStyle: string;
  occasionTag: string;
  categoryFilter: string;
}

const STYLING_LOOKS: StylingLook[] = [
  {
    id: 'look-1',
    title: 'Wedding Guest',
    eyebrow: 'LOOK 01',
    image: '/assets/siva-tex/siva-sarees-1.jpg',
    sareeName: 'Royal Magenta Kanchipuram Silk',
    sareePrice: 32500,
    accessoriesList: [
      '22K Gold Filigree Jhumkas',
      'Antique Floral Kadas (Set of 2)',
      'Embroidered Zari Box Clutch'
    ],
    blouseStyle: 'Contrast Emerald Elbow-Sleeve with Maggam Work',
    occasionTag: 'Grand Receptions',
    categoryFilter: 'Bridal Silk'
  },
  {
    id: 'look-2',
    title: 'Festive Grace',
    eyebrow: 'LOOK 02',
    image: '/assets/siva-tex/siva-sarees-2.jpg',
    sareeName: 'Heritage Mustard Korvai Silk',
    sareePrice: 28900,
    accessoriesList: [
      'Laxmi Coin Temple Choker',
      'Navratna Antique Gold Bangle Stack',
      'Traditional Raw Silk Drawstring Potli'
    ],
    blouseStyle: 'Deep Red Silk with Handcrafted Temple Border',
    occasionTag: 'Diwali & Family Pujas',
    categoryFilter: 'Kanchipuram Silk'
  },
  {
    id: 'look-3',
    title: 'Everyday Elegance',
    eyebrow: 'LOOK 03',
    image: '/assets/siva-tex/siva-sarees-3.jpg',
    sareeName: 'Handspun Sky Chanderi Silk Cotton',
    sareePrice: 14200,
    accessoriesList: [
      'Minimalist Gold Studs',
      'Single Wire Gold Sleek Kada',
      'Handloom Cotton Tote'
    ],
    blouseStyle: 'Boat-Neck Linen Blouse with Shell Buttons',
    occasionTag: 'Art Soirees & Workdays',
    categoryFilter: 'Cotton Sarees'
  },
  {
    id: 'look-4',
    title: 'Evening Glamour',
    eyebrow: 'LOOK 04',
    image: '/assets/siva-tex/siva-sarees-4.jpg',
    sareeName: 'Midnight Plum Banarasi Kadwa Silk',
    sareePrice: 36000,
    accessoriesList: [
      'Polki Diamond & Emerald Drop Earrings',
      'Geometric Antique Cuff',
      'Champagne Gold Minaudiere'
    ],
    blouseStyle: 'Sweetheart Neckline with Delicate Zari Piping',
    occasionTag: 'Sangeet & Cocktails',
    categoryFilter: 'Banarasi Silk'
  }
];

export const StylingSuggestions: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, addToast } = useShop();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeLookModal, setActiveLookModal] = useState<StylingLook | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (look: StylingLook) => {
    setActiveLookModal(look);
  };

  const handleShopLook = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setCurrentView('shop');
    setActiveLookModal(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="styling-section">
      <div className="styling-container">
        
        {/* Section Header with Left/Right alignment */}
        <div className="styling-header-row">
          <div>
            <div className="styling-eyebrow">
              <Sparkles className="styling-eyebrow-icon" />
              <span>DRAPED YOUR WAY</span>
            </div>
            
            <h2 className="styling-title">
              The Art of <span className="styling-title-accent">Styling</span>
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-[#ECBA51]/80 mt-1.5 lg:hidden">
              <span>Swipe to explore looks</span>
              <span>&rarr;</span>
            </div>
          </div>

          {/* "GET INSPIRED" relocated to Section Header */}
          <button
            onClick={() => {
              setSelectedCategoryFilter(null);
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="styling-cta-btn"
          >
            <span>GET INSPIRED</span>
            <span className="styling-btn-arrow">&rarr;</span>
          </button>
        </div>

        {/* Carousel Container with Left/Right Arrows */}
        <div className="styling-carousel-wrapper">
          
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="styling-nav-arrow-left"
            aria-label="Previous styling suggestion"
          >
            <ChevronLeft className="styling-arrow-icon" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="styling-nav-arrow-right"
            aria-label="Next styling suggestion"
          >
            <ChevronRight className="styling-arrow-icon" />
          </button>

          {/* 4 Cards Grid */}
          <div ref={carouselRef} className="styling-grid no-scrollbar">
            {STYLING_LOOKS.map((look) => (
              <div
                key={look.id}
                onClick={() => handleCardClick(look)}
                className="styling-card"
              >
                {/* Outfit Editorial Composition Image */}
                <div className="styling-card-img-wrap">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="styling-card-img"
                    loading="lazy"
                  />

                  {/* Gradient Overlay on hover */}
                  <div className="styling-card-overlay">
                    <span className="styling-card-overlay-text">
                      Click to inspect full styling edit &rarr;
                    </span>
                  </div>
                </div>

                {/* Styling Details List */}
                <div className="styling-card-info">
                  <h3 className="styling-card-title">
                    {look.title}
                  </h3>
                  <p className="styling-card-saree">
                    {look.sareeName}
                  </p>
                </div>

                {/* Bottom Pill Label */}
                <div className="styling-pill-wrapper">
                  <div className="styling-pill">
                    <span className="styling-pill-text">
                      {look.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Interactive Modal Preview for Clicked Look */}
      {activeLookModal && (
        <div className="styling-modal-backdrop animate-fade-in">
          <div className="styling-modal-card">
            
            {/* Close button */}
            <button
              onClick={() => setActiveLookModal(null)}
              className="styling-modal-close"
              aria-label="Close dialog"
            >
              &times;
            </button>

            <div className="styling-modal-content">
              <div className="styling-modal-img-wrap">
                <img
                  src={activeLookModal.image}
                  alt={activeLookModal.title}
                  className="styling-modal-img"
                />
              </div>

              <div className="styling-modal-body">
                <div className="styling-modal-eyebrow">
                  {activeLookModal.eyebrow} • {activeLookModal.occasionTag}
                </div>

                <h3 className="styling-modal-title">
                  {activeLookModal.title}
                </h3>

                <div className="styling-modal-details">
                  <div className="styling-modal-detail-row">
                    <span className="styling-modal-detail-label">Primary Saree</span>
                    <span className="styling-modal-detail-val">
                      {activeLookModal.sareeName} (₹{activeLookModal.sareePrice.toLocaleString('en-IN')})
                    </span>
                  </div>

                  <div className="styling-modal-detail-row">
                    <span className="styling-modal-detail-label">Blouse Styling</span>
                    <span>{activeLookModal.blouseStyle}</span>
                  </div>

                  <div className="styling-modal-accessories">
                    <span className="styling-modal-detail-label">Curated Accessories</span>
                    <ul className="styling-modal-acc-list">
                      {activeLookModal.accessoriesList.map((acc, idx) => (
                        <li key={idx} className="styling-modal-acc-item">
                          <Check className="styling-modal-acc-icon" />
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="styling-modal-actions">
                  <button
                    onClick={() => handleShopLook(activeLookModal.categoryFilter)}
                    className="styling-modal-shop-btn"
                  >
                    Shop This Edit
                  </button>
                  <button
                    onClick={() => {
                      addToast('Saved Look', `"${activeLookModal.title}" saved to your private style board.`, 'gold');
                      setActiveLookModal(null);
                    }}
                    className="styling-modal-fav-btn"
                    title="Save to Style Board"
                  >
                    <Heart className="styling-modal-fav-icon" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
