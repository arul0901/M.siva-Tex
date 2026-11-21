import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SAREE_PRODUCTS } from '../data/sarees';
import { useShop } from '../context/ShopContext';
import { ArrowRight, ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';
import { SareeProduct } from '../types';
import '../styles/best-sellers.css';

interface CuratedBestseller {
  product: SareeProduct;
  badgeType: 'bestseller' | 'new' | 'discount';
  badgeLabel: string;
  swatches: string[];
}

export const BestSellers: React.FC = () => {
  const { setCurrentView, setSelectedCategoryFilter, openProductDetail, toggleWishlist, isInWishlist } = useShop();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Drag tracking refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Curate 7 signature bestsellers with distinct badges and color swatches matching the reference
  const curatedItems: CuratedBestseller[] = [
    {
      product: SAREE_PRODUCTS[0], // Swarna Kumkum Pattu Saree
      badgeType: 'bestseller',
      badgeLabel: 'BEST SELLER',
      swatches: ['#1A1A1A', '#8D3228', '#E5C158']
    },
    {
      product: SAREE_PRODUCTS[1] || SAREE_PRODUCTS[0], // Royal Purple Kanchipuram
      badgeType: 'new',
      badgeLabel: 'NEW',
      swatches: ['#6B2D5C', '#8D3228', '#D4AF37']
    },
    {
      product: SAREE_PRODUCTS[2] || SAREE_PRODUCTS[0], // Heritage Mustard Korvai
      badgeType: 'bestseller',
      badgeLabel: 'BEST SELLER',
      swatches: ['#1A1A1A', '#C68B2C', '#8D3228']
    },
    {
      product: SAREE_PRODUCTS[3] || SAREE_PRODUCTS[0], // Emerald Green Muhurtham
      badgeType: 'discount',
      badgeLabel: '-20%',
      swatches: ['#1F3A2B', '#D4AF37', '#7B3F00']
    },
    {
      product: SAREE_PRODUCTS[4] || SAREE_PRODUCTS[0], // Whisper Soft Chanderi
      badgeType: 'bestseller',
      badgeLabel: 'BEST SELLER',
      swatches: ['#1A1A1A', '#7B3F00', '#F3ECE2']
    },
    {
      product: SAREE_PRODUCTS[5] || SAREE_PRODUCTS[0], // Midnight Plum Katan
      badgeType: 'new',
      badgeLabel: 'NEW',
      swatches: ['#2A1828', '#C68B2C', '#E5C158']
    },
    {
      product: SAREE_PRODUCTS[6] || SAREE_PRODUCTS[0], // Golden Temple Korvai
      badgeType: 'discount',
      badgeLabel: '-15%',
      swatches: ['#D4AF37', '#1F3A2B', '#8D3228']
    }
  ];

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

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const track = scrollRef.current;
    const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth + 18 : 240;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
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

  const handleCardClick = (product: SareeProduct) => {
    if (hasMovedRef.current) return;
    openProductDetail(product);
  };

  const handleViewAll = () => {
    setSelectedCategoryFilter(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      className="bestsellers-section" 
      id="bestsellers"
      aria-label="Best Sellers Collection"
    >
      <div className="bestsellers-container">
        
        {/* Header: "BEST SELLERS" on Left, "VIEW ALL BEST SELLERS →" on Right */}
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">
            BEST SELLERS
          </h2>

          <button
            type="button"
            onClick={handleViewAll}
            className="bestsellers-view-all"
          >
            <span>VIEW ALL BEST SELLERS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="bestsellers-carousel-outer">
          
          {/* Floating Left Button (when scrolled) */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scroll('left')}
              className="bestsellers-nav-btn bestsellers-nav-prev"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Floating Right Button */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scroll('right')}
              className="bestsellers-nav-btn bestsellers-nav-next"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* 5-Card Horizontal Row Track */}
          <div
            ref={scrollRef}
            className={`bestsellers-track ${isDragging ? 'is-dragging' : ''}`}
            onScroll={checkScrollState}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {curatedItems.map(({ product, badgeType, badgeLabel, swatches }, index) => {
              const inWishlist = isInWishlist(product.id);

              return (
                <div
                  key={`${product.id}-${index}`}
                  onClick={() => handleCardClick(product)}
                  className="bestsellers-card group"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(product);
                    }
                  }}
                >
                  {/* Portrait Image Box (3/4 Aspect Ratio) */}
                  <div className="bestsellers-img-box">
                    
                    {/* Top Corner Pill Badge */}
                    <span className={`bestsellers-badge badge-${badgeType}`}>
                      {badgeLabel}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className={`bestsellers-wishlist-btn ${inWishlist ? 'is-active' : ''}`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>

                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      className="bestsellers-img"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>

                  {/* Card Details (Below Image) */}
                  <div className="bestsellers-details">
                    
                    {/* Title */}
                    <h3 className="bestsellers-card-title">
                      {product.name}
                    </h3>

                    {/* Color Swatches */}
                    <div className="bestsellers-swatches">
                      {swatches.map((color, sIdx) => (
                        <span
                          key={sIdx}
                          className="bestsellers-swatch-dot"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Meta Row: 5 Gold Stars on Left, Price on Right */}
                    <div className="bestsellers-meta-row">
                      <div className="bestsellers-stars-wrap">
                        <div className="bestsellers-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                        <span className="bestsellers-review-count">
                          ({product.reviewCount || 48})
                        </span>
                      </div>

                      <div className="bestsellers-price-wrap">
                        <span className="bestsellers-price">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="bestsellers-original-price">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BestSellers;
