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
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
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

  // 3-Phase Scrollytelling Architecture:
  // - 1st Scroll: Arrive smoothly from bottom-right corner into center
  // - 2nd Scroll: Content goes away, categories swipe across to make all 7 visible
  // - 3rd Scroll: Moves smoothly toward the next section (The Art of Styling)
  useEffect(() => {
    let ticking = false;

    const handleWindowScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current || !stageRef.current || !scrollRef.current) {
            ticking = false;
            return;
          }

          const container = containerRef.current;
          const stage = stageRef.current;
          const track = scrollRef.current;
          const sidebar = sidebarRef.current;

          const rect = container.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const windowWidth = window.innerWidth;
          const totalDistance = Math.max(container.offsetHeight - windowHeight, 1);

          // Phase 1: Arrive from bottom-right corner into center
          // Triggered as the user scrolls down from the hero banner
          let p1 = 0;
          if (rect.top <= windowHeight && rect.top > 0) {
            p1 = (windowHeight - rect.top) / windowHeight;
          } else if (rect.top <= 0) {
            const pinnedProgress = Math.min(Math.max(-rect.top / totalDistance, 0), 1);
            p1 = Math.min(1, 0.85 + (pinnedProgress / 0.15) * 0.15);
          }

          const easeP1 = 1 - Math.pow(1 - Math.min(Math.max(p1, 0), 1), 3);
          const canvasX = (1 - easeP1) * (windowWidth * 0.45);
          const canvasY = (1 - easeP1) * (windowHeight * 0.22);
          const canvasScale = 0.88 + 0.12 * easeP1;
          const canvasRotate = (1 - easeP1) * 3;
          const canvasOpacity = 0.2 + 0.8 * easeP1;

          stage.style.transform = `translate(${canvasX}px, ${canvasY}px) scale(${canvasScale}) rotate(${canvasRotate}deg)`;
          stage.style.opacity = `${canvasOpacity}`;

          // Phase 2: Content goes and all categories become visible
          if (rect.top <= 0) {
            const totalProgress = Math.min(Math.max(-rect.top / totalDistance, 0), 1);
            
            const stage2Start = 0.08;
            const stage2End = 0.82;
            const rawP2 = Math.min(Math.max((totalProgress - stage2Start) / (stage2End - stage2Start), 0), 1);
            
            // Smooth ease in-out
            const easeP2 = rawP2 < 0.5 
              ? 2 * rawP2 * rawP2 
              : 1 - Math.pow(-2 * rawP2 + 2, 2) / 2;

            // Fade left sidebar content gracefully in place (zero negative translation to prevent text clipping)
            if (sidebar) {
              const sidebarOpacity = Math.max(0, 1 - easeP2 * 2.0);
              const sidebarScale = 1 - easeP2 * 0.05;
              sidebar.style.transform = `scale(${sidebarScale})`;
              sidebar.style.opacity = `${sidebarOpacity}`;
              sidebar.style.pointerEvents = easeP2 > 0.5 ? 'none' : 'auto';
            }

            // Scroll track smoothly so categories slide across and occupy the space
            // Target scroll is bounded to the sidebar width so Card 1 ("Wedding Collection")
            // always aligns cleanly at the start and is NEVER cut off on the left!
            if (!isDraggingRef.current) {
              const sidebarWidth = sidebar ? (sidebar.offsetWidth + 18) : 310;
              const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);
              const targetScroll = Math.min(sidebarWidth, maxScroll);
              track.scrollLeft = easeP2 * targetScroll;
            }

            // Phase 3: Moves smoothly toward the next section without lifting cards into the ceiling
            if (totalProgress >= 0.70) {
              stage.style.transform = 'translate(0px, 0px) scale(1) rotate(0deg)';
            }
          } else {
            // Above pinned point: reset sidebar and track for clean reverse scrolling
            if (sidebar) {
              sidebar.style.transform = 'scale(1)';
              sidebar.style.opacity = '1';
              sidebar.style.pointerEvents = 'auto';
            }
            if (!isDraggingRef.current) {
              track.scrollLeft = 0;
            }
          }

          checkScrollState();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll(); // Initial frame
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
    <div
      ref={containerRef}
      className="occasion-scrolly-container"
      id="shop-by-occasion"
      aria-label="Curated By Celebration - Shop By Occasion"
    >
      <div className="occasion-sticky-viewport">
        <div ref={stageRef} className="occasion-anim-stage">
          <section className="occasion-section">
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
                  <div 
                    ref={sidebarRef}
                    className={`occasion-sidebar-card ${isSwiped ? 'is-swiped' : 'is-start'}`}
                  >
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
        </div>
      </div>
    </div>
  );
};
