import React, { useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/shop-by-occasion.css';

interface OccasionItem {
  id: string;
  name: string;
  filterCategory: string;
  image: string;
  description: string;
  tag: string;
}

const OCCASIONS: OccasionItem[] = [
  {
    id: 'occ-1',
    name: 'Wedding Collection',
    filterCategory: 'Bridal Silk',
    image: '/assets/siva-tex/siva-sarees-1.jpg',
    description: 'Auspicious Muhurtham heirlooms woven with real 24K gold dipped zari.',
    tag: 'Grand Celebrations'
  },
  {
    id: 'occ-2',
    name: 'Bridal Silk',
    filterCategory: 'Kanchipuram Silk',
    image: '/assets/siva-tex/siva-sarees-2.jpg',
    description: 'Ancestral Korvai three-shuttle pure mulberry silks for the modern bride.',
    tag: 'Sacred Trousseau'
  },
  {
    id: 'occ-3',
    name: 'Festive Wear',
    filterCategory: 'Banarasi Silk',
    image: '/assets/siva-tex/siva-sarees-3.jpg',
    description: 'Luminous Kadwa florals and temple borders for Diwali, Puja and family milestones.',
    tag: 'Festive Splendor'
  },
  {
    id: 'occ-4',
    name: 'Party Wear',
    filterCategory: 'Georgette Sarees',
    image: '/assets/siva-tex/siva-sarees-4.jpg',
    description: 'Contemporary sheer silhouettes with metallic zari accents for evening soirees.',
    tag: 'Cocktails & Receptions'
  },
  {
    id: 'occ-5',
    name: 'Everyday Elegance',
    filterCategory: 'Cotton Sarees',
    image: '/assets/siva-tex/siva-sarees-5.jpg',
    description: 'Breathable handspun Chanderi and whisper-soft silks for effortless poise.',
    tag: 'Daytime Poise'
  }
];

export const ShopByOccasion: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelectOccasion = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="occasion-section">
      <div className="occasion-container">
        <div className="occasion-grid">
          
          {/* Left Column: Heading, Divider, and CTA */}
          <div className="occasion-sidebar">
            <div>
              <p className="occasion-eyebrow">
                Curated By Celebration
              </p>
              <h2 className="occasion-title">
                Shop By <br />
                <span className="occasion-title-italic">Occasion</span>
              </h2>
            </div>

            <div className="occasion-divider" />

            <p className="occasion-desc">
              Every drape is conceived for an auspicious moment — from sacred wedding mandaps to intimate festive evenings.
            </p>

            <div className="occasion-btn-wrap">
              <button
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="occasion-view-all-btn"
              >
                <span>VIEW ALL COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile/Tablet scroll hints */}
            <div className="occasion-mobile-nav">
              <button
                onClick={() => scroll('left')}
                className="occasion-nav-btn"
                aria-label="Previous occasion"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="occasion-nav-btn"
                aria-label="Next occasion"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="occasion-swipe-hint">Swipe to explore</span>
            </div>
          </div>

          {/* Right Column: 5 Arched Cards */}
          <div className="occasion-cards-col">
            <div ref={scrollRef} className="occasion-scroll-track no-scrollbar">
              {OCCASIONS.map((occ) => (
                <div
                  key={occ.id}
                  onClick={() => handleSelectOccasion(occ.filterCategory)}
                  className="occasion-card"
                >
                  {/* Card Container with Arched Top */}
                  <div className="occasion-card-arch">
                    <img
                      src={occ.image}
                      alt={occ.name}
                      className="occasion-card-img"
                      loading="lazy"
                    />

                    <div className="occasion-card-overlay" />
                  </div>

                  {/* Elegant Bottom Label Box */}
                  <div className="occasion-label-box">
                    <h3 className="occasion-label-title">
                      {occ.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
