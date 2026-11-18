import React, { useState } from 'react';
import { SareeProduct } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';
import '../styles/product-card.css';

interface ProductCardProps {
  product: SareeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
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

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-burgundy text-gold-pale text-[10px] font-serif uppercase tracking-widest px-2.5 py-0.5 rounded-sm shadow-sm">
              Best Seller
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="bg-wine/90 text-ivory text-[10px] font-sans font-medium px-2 py-0.5 rounded-sm backdrop-blur-sm">
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

        {/* Quick Action Drawer at Bottom (Touch accessible on mobile, hover on desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-burgundy-dark/95 via-burgundy/70 to-transparent opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between gap-1.5 sm:gap-2">
          <button
            onClick={handleQuickView}
            className="flex-1 min-h-[40px] sm:min-h-[36px] py-2 px-2.5 bg-ivory/95 hover:bg-gold hover:text-white text-brown-deep text-[10px] sm:text-[11px] font-serif uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleAddToCart}
            className="min-h-[40px] min-w-[40px] sm:min-h-[36px] sm:min-w-[36px] py-2 px-2.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark rounded-xs transition-colors flex items-center justify-center shadow-sm"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            {isAdded ? <Check className="w-4 h-4 text-emerald-300" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2 flex flex-col flex-1">
        {/* Saree Type / Weave */}
        <div className="flex items-center justify-between text-[11px] text-gold font-serif uppercase tracking-wider mb-1">
          <span>{product.category}</span>
          <span className="text-brown-deep/50 lowercase italic font-sans">{product.zari}</span>
        </div>

        {/* Product Name */}
        <h4 className="font-serif text-sm sm:text-base font-medium text-burgundy group-hover:text-gold-dark transition-colors line-clamp-1">
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
          <span className="text-[11px] text-brown-deep/60">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-base sm:text-lg font-serif font-bold text-burgundy">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-brown-deep/50 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
