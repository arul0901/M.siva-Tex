import React, { useState } from 'react';
import { SareeProduct } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ChevronRight } from 'lucide-react';
import '../styles/product-card.css';

interface ProductCardProps {
  product: SareeProduct;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { openProductDetail, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (compact) {
    return (
      <div
        onClick={() => openProductDetail(product)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col bg-white rounded-xs border border-gold/20 hover:border-gold/50 shadow-[0_2px_10px_rgba(77,0,7,0.03)] hover:shadow-[0_10px_25px_rgba(77,0,7,0.1)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer h-full"
      >
        {/* Product Image Box */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige/30">
          <img
            src={isHovered ? product.secondaryImage : product.primaryImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Micro Luxury Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 z-10 pointer-events-none">
            {product.isBestSeller && (
              <span className="bg-burgundy/95 text-gold-pale text-[8.5px] font-secondary uppercase tracking-[0.16em] font-semibold px-2 py-0.5 rounded-xs backdrop-blur-md shadow-xs border border-gold/30">
                Bestseller
              </span>
            )}
            {product.discountPercent > 0 && (
              <span className="bg-gold text-brown-dark text-[8.5px] font-secondary font-bold px-1.5 py-0.5 rounded-xs shadow-xs">
                {product.discountPercent}% Off
              </span>
            )}
          </div>

          {/* Sleek Compact Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label={inWishlist ? "Remove from Wishlist" : "Save to Wishlist"}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-xs backdrop-blur-sm ${
              inWishlist
                ? 'bg-burgundy text-gold-pale'
                : 'bg-white/90 text-burgundy hover:bg-burgundy hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current' : ''}`} strokeWidth={2} />
          </button>
        </div>

        {/* Compact Details Box */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-1.5 bg-white">
          <div>
            {/* Category and Zari Tag */}
            <div className="flex items-center justify-between text-[10px] text-gold font-primary uppercase tracking-wider mb-0.5">
              <span className="truncate pr-1 font-semibold">{product.category}</span>
              <span className="text-brown-deep/60 font-special italic lowercase text-[11px] shrink-0">
                {product.zari}
              </span>
            </div>

            {/* Product Name */}
            <h4 className="font-secondary text-xs sm:text-[13px] font-semibold text-burgundy group-hover:text-gold transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h4>

            {/* Modern Minimal Rating */}
            <div className="flex items-center gap-1.5 mt-1 text-[11px] font-secondary text-brown-deep/70">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500 shrink-0" />
              <span className="font-semibold text-brown-deep text-[11px]">{product.rating}</span>
              <span className="text-[10px] text-brown-deep/50">({product.reviewCount})</span>
            </div>
          </div>

          {/* Compact Modern Price & View CTA */}
          <div className="mt-2 pt-2 border-t border-gold/15 flex items-center justify-between font-secondary">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-burgundy">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] text-brown-deep/50 line-through font-normal">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <span className="text-[10px] uppercase font-secondary tracking-wider text-gold font-semibold group-hover:text-burgundy group-hover:translate-x-0.5 transition-all flex items-center gap-0.5">
              <span>View</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Standard Product Card (used in full grid views)
  return (
    <div
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-white rounded-xs border border-gold/15 hover:border-gold/45 text-brown-deep cursor-pointer transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-1 overflow-hidden"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige/40">
        
        {/* Primary and Secondary Hover Image Switch */}
        <img
          src={isHovered ? product.secondaryImage : product.primaryImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Luxury Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-burgundy text-gold-pale text-[9px] font-secondary uppercase tracking-[0.2em] font-semibold px-2.5 py-0.5 rounded-xs backdrop-blur-md shadow-xs border border-gold/35">
              Bestseller
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-gold text-brown-dark text-[9px] font-secondary font-bold px-1.5 py-0.5 rounded-xs shadow-xs">
              {product.discountPercent}% Off
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from Wishlist" : "Save to Wishlist"}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-sm ${
            inWishlist
              ? 'bg-burgundy text-gold-pale'
              : 'bg-white/90 text-burgundy hover:bg-white hover:text-burgundy'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} strokeWidth={2} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Saree Type / Weave */}
        <div className="flex items-center justify-between text-[11px] text-gold font-primary uppercase tracking-wider mb-1">
          <span className="font-semibold">{product.category}</span>
          <span className="text-brown-deep/60 font-special italic lowercase text-xs">{product.zari}</span>
        </div>

        {/* Product Name */}
        <h4 className="font-secondary text-sm sm:text-base font-semibold text-burgundy group-hover:text-gold transition-colors line-clamp-1">
          {product.name}
        </h4>

        {/* Star Rating */}
        <div className="flex items-center gap-1.5 mt-1.5 mb-2">
          <div className="flex items-center text-amber-600">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-current text-amber-500'
                    : 'text-amber-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-secondary text-brown-deep/60">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto flex items-baseline gap-2 pt-2 border-t border-gold/15 font-secondary">
          <span className="text-base sm:text-lg font-bold text-burgundy">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-brown-deep/50 line-through font-normal">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
