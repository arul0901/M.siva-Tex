import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/modals.css';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, openProductDetail } = useShop();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const activeImage = selectedImage || quickViewProduct.primaryImage;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const handleViewFullPage = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    openProductDetail(prod);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-ivory border border-gold/30 shadow-2xl rounded-sm max-w-4xl w-full overflow-y-auto md:overflow-hidden z-10 text-brown-deep max-h-[92vh] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-3 right-3 z-20 min-h-[44px] min-w-[44px] w-11 h-11 rounded-full bg-ivory/90 text-burgundy hover:bg-burgundy hover:text-white flex items-center justify-center transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Imagery with Thumbnails */}
          <div className="md:w-1/2 p-4 sm:p-6 flex flex-col bg-beige/30 border-b md:border-b-0 md:border-r border-gold/20 shrink-0">
            <div className="relative aspect-[4/3] sm:aspect-[3/4] max-h-[260px] sm:max-h-[380px] md:max-h-none w-full overflow-hidden rounded-sm bg-beige mb-3 shadow-inner">
              <img
                src={activeImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute top-3 left-3 bg-burgundy text-gold-pale text-[10px] font-serif uppercase tracking-widest px-2.5 py-0.5 rounded-sm">
                {quickViewProduct.category}
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[quickViewProduct.primaryImage, quickViewProduct.secondaryImage, ...quickViewProduct.galleryImages.slice(0, 2)].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xs overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img ? 'border-gold shadow-sm scale-102' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Actions */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center justify-between text-xs text-gold font-serif uppercase tracking-wider mb-1">
                <span>{quickViewProduct.origin}</span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  Silk Mark Certified
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-burgundy mb-2">
                {quickViewProduct.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(quickViewProduct.rating) ? 'fill-current text-amber-500' : 'text-amber-200'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-brown-deep/70">
                  {quickViewProduct.rating} ({quickViewProduct.reviewCount} connoisseur reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gold/20">
                <span className="font-serif text-2xl font-bold text-burgundy">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <>
                    <span className="text-sm text-brown-deep/50 line-through">
                      ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs bg-wine text-ivory px-2 py-0.5 rounded-sm">
                      Save {quickViewProduct.discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-4 py-2.5 border-t border-b border-gold/20">
                <div>
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Fabric</span>
                  <span className="font-medium text-burgundy">{quickViewProduct.fabric}</span>
                </div>
                <div>
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Zari Purity</span>
                  <span className="font-medium text-burgundy">{quickViewProduct.zari}</span>
                </div>
                <div>
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Weave</span>
                  <span className="font-medium text-burgundy">{quickViewProduct.weave}</span>
                </div>
                <div>
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Length</span>
                  <span className="font-medium text-burgundy">{quickViewProduct.sareeLength} + Blouse</span>
                </div>
              </div>

              {/* Description excerpt */}
              <p className="text-xs text-brown-deep/80 leading-relaxed font-light mb-6">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gold/20">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-gold/40 rounded-sm bg-white min-h-[44px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="min-h-[44px] min-w-[36px] flex items-center justify-center px-2.5 py-2 text-sm hover:text-gold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="min-h-[44px] min-w-[36px] flex items-center justify-center px-2.5 py-2 text-sm hover:text-gold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-h-[44px] py-3 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-serif text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`min-h-[44px] min-w-[44px] p-3 rounded-sm border transition-colors flex items-center justify-center ${
                    inWishlist ? 'border-wine bg-wine text-ivory' : 'border-gold/40 text-burgundy hover:border-burgundy'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* View Full Product Details Link */}
              <button
                onClick={handleViewFullPage}
                className="w-full min-h-[44px] text-center text-xs font-serif uppercase tracking-widest text-burgundy hover:text-gold transition-colors py-2 flex items-center justify-center gap-1.5"
              >
                <span>View Complete Artisan Story & Saree Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

