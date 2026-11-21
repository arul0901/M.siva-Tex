import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  },
  {
    id: 'occ-6',
    name: 'Temple Traditions',
    filterCategory: 'Kanchipuram Silk',
    image: '/assets/siva-tex/siva-sarees-7.jpg',
    description: 'Sacred Korvai borders and temple motifs woven for divine pujas and spiritual ceremonies.',
    tag: 'Temple Heritage'
  }
];

export const ShopByOccasion: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Mouse drag tracking for 1:1 responsive desktop swipe
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const checkScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  }, []);

  useEffect(() => {
    checkScrollState();
    const handleResize = () => checkScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollState]);

  const handleSelectOccasion = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const track = scrollRef.current;
    // Scroll by ~2 cards width + gaps
    const scrollAmount = direction === 'left' ? -380 : 380;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    setIsDragging(true);
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.15;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
    checkScrollState();
  };

  const handleMouseUpOrLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      checkScrollState();
    }
  };

  const handleCardClick = (cat: string) => {
    if (hasMovedRef.current) return; // Prevent navigation during mouse drag swipe
    handleSelectOccasion(cat);
  };

  return (
    <section 
      className="occasion-section" 
      id="shop-by-occasion"
      aria-label="Curated By Celebration - Shop By Occasion"
    >
      <div className="occasion-container">
        {/* Horizontal Scroll Track Wrapper */}
        <div className="occasion-track-outer">
          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className={`occasion-scroll-track ${isDragging ? 'is-dragging' : ''}`}
            onScroll={checkScrollState}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {OCCASIONS.map((occ) => (
              <div
                key={occ.id}
                onClick={() => handleCardClick(occ.filterCategory)}
                className="occasion-card group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick(occ.filterCategory);
                  }
                }}
              >
                {/* Royal Architectural Arched Saree Frame */}
                <div className="occasion-card-arch">
                  <img
                    src={occ.image}
                    alt={occ.name}
                    className="occasion-card-img"
                    loading="lazy"
                    draggable={false}
                  />

                  <div className="occasion-card-overlay" />
                </div>

                {/* Refined Luxury Typography Label */}
                <div className="occasion-label-wrap">
                  <h3 className="occasion-label-title">
                    {occ.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;
