import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { SareeProduct } from '../types';
import { SAREE_PRODUCTS } from '../data/sarees';
import '../styles/curated-bestsellers.css';

interface BestsellerTile {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
}

const BESTSELLER_TILES: BestsellerTile[] = [
  {
    id: 'tile-1',
    name: 'Royal Muhurtham Kanchipuram Silk',
    category: 'Bridal Silk',
    price: 48500,
    originalPrice: 54000,
    image: '/assets/siva-tex/siva-sarees-1.jpg',
    badge: 'Iconic'
  },
  {
    id: 'tile-2',
    name: 'Crimson Korvai Handloom Silk Saree',
    category: 'Kanchipuram Silk',
    price: 38900,
    originalPrice: 44000,
    image: '/assets/siva-tex/siva-sarees-2.jpg',
    badge: 'Pure Zari'
  },
  {
    id: 'tile-3',
    name: 'Emerald Brocade Whispering Silk Saree',
    category: 'Soft Silk',
    price: 34200,
    originalPrice: 39500,
    image: '/assets/siva-tex/siva-sarees-4.jpg',
    badge: 'Heritage'
  },
  {
    id: 'tile-4',
    name: 'Royal Purple Kadwa Banarasi Silk',
    category: 'Banarasi Silk',
    price: 28500,
    originalPrice: 33000,
    image: '/assets/siva-tex/siva-sarees-5.jpg',
    badge: 'Artisanal'
  },
  {
    id: 'tile-5',
    name: 'Sacred Muhurtham Pink Kanjivaram Silk',
    category: 'Bridal Silk',
    price: 52000,
    originalPrice: 58000,
    image: '/assets/siva-tex/siva-sarees-7.jpg',
    badge: '24K Gold'
  },
  {
    id: 'tile-6',
    name: 'Mayil Chakram Zari Brocade Pallu Saree',
    category: 'Pure Zari Handloom',
    price: 42000,
    originalPrice: 47000,
    image: '/assets/siva-tex/siva-sarees-pallu.jpg',
    badge: 'Heirloom'
  }
];

export const CuratedBestsellers: React.FC = () => {
  const {
    setCurrentView,
    setSelectedCategoryFilter,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const getTileProduct = (tile: BestsellerTile): SareeProduct => {
    const found = SAREE_PRODUCTS.find(p => p.id === tile.id || p.name.toLowerCase().includes(tile.name.toLowerCase().split(' ')[0]));
    if (found) {
      return {
        ...found,
        id: tile.id,
        name: tile.name,
        price: tile.price,
        primaryImage: tile.image,
        secondaryImage: tile.image
      };
    }

    return {
      id: tile.id,
      name: tile.name,
      slug: tile.name.toLowerCase().replace(/\s+/g, '-'),
      category: 'Kanchipuram Silk',
      price: tile.price,
      originalPrice: tile.originalPrice || tile.price * 1.15,
      discountPercent: 12,
      rating: 4.9,
      reviewCount: 38,
      primaryImage: tile.image,
      secondaryImage: tile.image,
      galleryImages: [tile.image],
      color: 'Heirloom Multi',
      colorHex: '#451B25',
      fabric: 'Pure Mulberry Silk & Authentic Gold',
      weave: 'Handloom Korvai & Kadwa Weave',
      zari: 'Pure Gold Zari',
      occasion: ['Bridal Muhurtham', 'Festive Puja'],
      sareeLength: '5.5 Meters',
      blouseLength: '0.8 Meters',
      blouseType: 'Unstitched Running Silk Blouse',
      weight: '750g',
      origin: 'Kanchipuram & Varanasi',
      description: `Exquisitely crafted ${tile.name}. Handcrafted using centuries-old techniques for discerning celebrations.`,
      craftStory: 'Handwoven by master artisans using pure zari and mulberry silk.',
      careInstructions: ['Dry Clean Only', 'Store wrapped in mul-mul cotton cloth', 'Avoid direct perfume spray on zari']
    };
  };

  const handleTileAddToCart = (e: React.MouseEvent, tile: BestsellerTile) => {
    e.stopPropagation();
    const product = getTileProduct(tile);
    addToCart(product);
  };

  const handleTileWishlist = (e: React.MouseEvent, tile: BestsellerTile) => {
    e.stopPropagation();
    const product = getTileProduct(tile);
    toggleWishlist(product);
  };

  return (
    <section className="curated-section">
      <div className="curated-grid">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: AREA 01 (Text) + AREA 02 (Editorial Photo)  */}
        {/* ======================================================== */}
        <div className="curated-col-left">
          
          {/* AREA 01 — CURATED COLLECTION (Deep Maroon #4D0007) */}
          <div className="curated-text-panel">
            <div className="curated-eyebrow">
              <Sparkles className="curated-eyebrow-icon" />
              <span>CURATED FOR YOU</span>
            </div>

            <h3 className="curated-heading">
              The Signature <br />
              <span className="curated-heading-accent">Collection</span>
            </h3>

            <p className="curated-desc">
              A thoughtful selection of exceptional weaves, timeless silhouettes and distinctive craftsmanship. Preserving handloom traditions for the discerning connoisseur.
            </p>

            <div>
              <button
                onClick={() => {
                  setSelectedCategoryFilter('Kanchipuram Silk');
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="curated-cta-btn"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="curated-cta-icon" />
              </button>
            </div>
          </div>

          {/* AREA 02 — EDITORIAL IMAGE (Saree Weaving Masterpiece) */}
          <div className="curated-editorial-wrap">
            <img
              src="/assets/siva-tex/siva-sarees-3.jpg"
              alt="M. Siva-Tex Heirloom Silk Saree Editorial"
              className="curated-editorial-img"
              loading="lazy"
            />
            {/* Subtle Gradient & Editorial Caption */}
            <div className="curated-editorial-overlay">
              <div>
                <p className="curated-editorial-quote">"Draped in living history."</p>
                <p className="curated-editorial-caption">
                  Three generations of master weaver heritage • Korvai & Kadwa Weaves
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: AREA 03 (Text) + AREA 04 (2x3 Product Grid)*/}
        {/* ======================================================== */}
        <div className="bestsellers-col-right">
          
          {/* AREA 03 — BESTSELLERS INTRODUCTION (Radiant Temple Gold Panel) */}
          <div className="bestsellers-intro-panel">
            <div className="bestsellers-eyebrow">
              <Sparkles className="bestsellers-eyebrow-icon" />
              <span>LOVED BY MANY</span>
            </div>

            <h3 className="bestsellers-heading">
              Bestsellers
            </h3>

            <p className="bestsellers-desc">
              Discover the pure silk sarees that have become timeless favourites among brides and connoisseurs worldwide. Handwoven on traditional pit looms in Kanchipuram and Varanasi.
            </p>

            <div>
              <button
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bestsellers-cta-btn"
              >
                <span>SHOP BESTSELLERS</span>
                <ArrowRight className="bestsellers-cta-icon" />
              </button>
            </div>
          </div>

          {/* AREA 04 — BESTSELLER PRODUCT GRID (2 × 3 Compact Pure Saree Grid) */}
          <div className="bestsellers-grid-wrap">
            <div className="bestsellers-grid">
              {BESTSELLER_TILES.map((tile) => {
                const inWish = isInWishlist(tile.id);
                return (
                  <div
                    key={tile.id}
                    onClick={() => {
                      setSelectedCategoryFilter(tile.category.includes('Silk') ? tile.category : null);
                      setCurrentView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bestseller-tile"
                  >
                    {/* Image Container with Wishlist Icon */}
                    <div className="bestseller-tile-img-wrap">
                      <img
                        src={tile.image}
                        alt={tile.name}
                        className="bestseller-tile-img"
                        loading="lazy"
                      />

                      {/* Badge */}
                      {tile.badge && (
                        <span className="bestseller-tile-badge">
                          {tile.badge}
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => handleTileWishlist(e, tile)}
                        className={`bestseller-tile-wishlist-btn ${inWish ? 'active' : 'inactive'}`}
                        title="Wishlist"
                        aria-label="Save to Wishlist"
                      >
                        <Heart className="bestseller-tile-wishlist-icon" fill={inWish ? 'currentColor' : 'none'} />
                      </button>

                      {/* Quick Add Overlay on Hover */}
                      <div className="bestseller-tile-quickadd-overlay">
                        <button
                          onClick={(e) => handleTileAddToCart(e, tile)}
                          className="bestseller-tile-quickadd-btn"
                        >
                          <ShoppingBag className="bestseller-tile-quickadd-icon" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="bestseller-tile-info">
                      <h4 className="bestseller-tile-title">
                        {tile.name}
                      </h4>
                      <p className="bestseller-tile-category">
                        {tile.category}
                      </p>

                      <div className="bestseller-tile-prices">
                        <span className="bestseller-tile-price">
                          ₹{tile.price.toLocaleString('en-IN')}
                        </span>
                        {tile.originalPrice && (
                          <span className="bestseller-tile-original-price">
                            ₹{tile.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
