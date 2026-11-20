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
  },
  {
    id: 'occ-7',
    name: 'Reception Soirée',
    filterCategory: 'Organza Sarees',
    image: '/assets/siva-tex/siva-sarees-6.jpg',
    description: 'Contemporary sheer silhouettes with delicate metallic embroidery for glamorous evenings.',
    tag: 'Evening Glamour'
  }
];

export const ShopByOccasion: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter } = useShop();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isSwiped, setIsSwiped] = useState(false);

  // Mouse drag tracking for smooth desktop swipe
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const checkScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const atStart = scrollLeft <= 30;
    const atEnd = scrollLeft >= scrollWidth - clientWidth - 25;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
    setIsSwiped(!atStart);
  }, []);

  useEffect(() => {
    checkScrollState();
    const handleResize = () => checkScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollState]);

  // Automatic Horizontal Swipe Driven by Vertical Scroll:
  // As the user scrolls down into #shop-by-occasion, the categories smoothly swipe forward,
  // occupying the left space. When scrolling back up, it smoothly negative-swipes back to the original place.
  useEffect(() => {
    let ticking = false;

    const handleWindowScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!scrollRef.current || !sectionRef.current || isDraggingRef.current) {
            ticking = false;
            return;
          }

          const section = sectionRef.current;
          const track = scrollRef.current;
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Activation trigger zone:
          // startY: when the top of the section enters the lower portion of the screen
          // endY: when the section has reached the upper portion of the screen
          const startY = windowHeight * 0.75;
          const endY = 80;
          const range = startY - endY;

          if (rect.top <= startY && rect.bottom >= 100) {
            const progress = Math.min(Math.max((startY - rect.top) / range, 0), 1);
            
            // Calculate swipe amount:
            // Scroll past the left editorial sidebar so all 7 occasion categories occupy the screen
            const sidebar = track.querySelector('.occasion-sidebar-card') as HTMLElement;
            const sidebarWidth = sidebar ? sidebar.offsetWidth + 26 : 340;
            const maxScroll = track.scrollWidth - track.clientWidth;
            const targetSwipe = Math.min(sidebarWidth + 80, maxScroll);

            track.scrollLeft = progress * targetSwipe;
          } else if (rect.top > startY) {
            // Above the trigger zone (scrolled back up towards the hero banner)
            track.scrollLeft = 0;
          }

          checkScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [checkScrollState]);

  const handleSelectOccasion = (cat: string) => {
    setSelectedCategoryFilter(cat);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const track = scrollRef.current;

    if (direction === 'right') {
      if (track.scrollLeft < 50) {
        // First swipe: scroll past the sidebar so the categories occupy the left space
        const sidebar = track.querySelector('.occasion-sidebar-card') as HTMLElement;
        const scrollAmount = sidebar ? sidebar.offsetWidth + 26 : 340;
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        // Subsequent swipes: scroll forward by 2 cards
        track.scrollBy({ left: 350, behavior: 'smooth' });
      }
    } else {
      // Negative swipe: if close to the sidebar, return directly to initial position (0)
      if (track.scrollLeft <= 360) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: -350, behavior: 'smooth' });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    if (Math.abs(walk) > 6) {
      hasMovedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleCardClick = (cat: string) => {
    if (hasMovedRef.current) return; // Prevent navigation during mouse drag swipe
    handleSelectOccasion(cat);
  };

  return (
    <section
      ref={sectionRef}
      className="occasion-section"
      id="shop-by-occasion"
      aria-label="Curated By Celebration - Shop By Occasion"
    >
      <div className="occasion-container">
        
        {/* Floating Navigation Controls (Appear when swiping across categories) */}
        <button
          onClick={() => scroll('left')}
          className={`occasion-floating-nav-btn occasion-floating-prev ${canScrollLeft ? 'is-visible' : 'is-hidden'}`}
          aria-label="Previous occasions / Return to original view"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className={`occasion-floating-nav-btn occasion-floating-next ${canScrollRight ? 'is-visible' : 'is-hidden'}`}
          aria-label="Next occasions"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="occasion-track-outer">
          <div
            ref={scrollRef}
            className="occasion-scroll-track no-scrollbar"
            onScroll={checkScrollState}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* 1. Left Editorial Sidebar: Occupies the start position. 
                When swiping, it scrolls out so the 7 categories occupy that space.
                When negative swiping, it returns back to its original place. */}
            <div className={`occasion-sidebar-card ${isSwiped ? 'is-swiped' : 'is-start'}`}>
              <div className="occasion-sidebar-content">
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

                {/* Sidebar Navigation Buttons */}
                <div className="occasion-sidebar-nav">
                  <button
                    onClick={() => scroll('left')}
                    className={`occasion-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
                    aria-label="Previous occasion"
                    disabled={!canScrollLeft}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    className={`occasion-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
                    aria-label="Next occasion"
                    disabled={!canScrollRight}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="occasion-swipe-hint">Swipe to explore</span>
                </div>
              </div>
            </div>

            {/* 2. All 7 Occasion Cards (Categories 1-5 + 2 New Categories 6 & 7) */}
            {OCCASIONS.map((occ) => (
              <div
                key={occ.id}
                onClick={() => handleCardClick(occ.filterCategory)}
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

                  <div className="occasion-hover-btn-wrap">
                    <span className="occasion-hover-btn">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
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
    </section>
  );
};
