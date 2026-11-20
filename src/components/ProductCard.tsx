import React, { useState } from 'react';
import { SareeProduct } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star } from 'lucide-react';
import '../styles/product-card.css';

interface ProductCardProps {
  product: SareeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-ivory text-brown-deep cursor-pointer transition-all duration-300"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige/40">
        
        {/* Primary and Secondary Hover Image Switch */}
        <img
          src={isHovered ? product.secondaryImage : product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Luxury Badges on Top Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
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

        {/* Wishlist Button (Always Visible or Floating on Top Right) */}
        <button
          onClick={handleWishlist}
          aria-label={inWishlist ? "Remove from Wishlist" : "Save to Wishlist"}
          className={`absolute top-2.5 right-2.5 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 z-10 shadow-sm ${
            inWishlist
              ? 'bg-wine text-ivory'
              : 'bg-ivory/90 text-burgundy hover:bg-ivory hover:text-wine'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2 flex flex-col flex-1">
        {/* Saree Type / Weave */}
        <div className="flex items-center justify-between text-[11px] text-gold font-primary uppercase tracking-wider mb-1">
          <span>{product.category}</span>
          <span className="text-brown-deep/60 font-special italic lowercase text-xs">{product.zari}</span>
        </div>

        {/* Product Name (Manrope for clean contemporary luxury readability) */}
        <h4 className="font-secondary text-sm sm:text-base font-semibold text-burgundy group-hover:text-gold-dark transition-colors line-clamp-1">
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
        <div className="mt-auto flex items-baseline gap-2 pt-1 font-secondary">
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
