import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import '../styles/wishlist.css';

export const WishlistView: React.FC = () => {
  const { wishlist, addToCart, setCurrentView, addToast } = useShop();

  const handleAddAllToCart = () => {
    wishlist.forEach(p => addToCart(p, 1));
    addToast('All Moved to Bag', 'All saved heirlooms have been placed into your shopping bag.', 'gold');
  };

  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-gold text-xs font-serif uppercase tracking-[0.25em] mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Curated Wishlist</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
            Your Saved Heirlooms
          </h1>
          <div className="w-12 h-0.5 bg-gold mx-auto my-3" />
          <p className="text-xs sm:text-sm text-brown-deep/70 font-light">
            Keep track of your shortlisted bridal and festive handloom sarees.
          </p>

          {wishlist.length > 0 && (
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={handleAddAllToCart}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-serif text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Shopping Bag</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 bg-white/60 border border-gold/20 rounded-sm p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-beige/60 border border-gold/30 flex items-center justify-center text-gold mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-burgundy">Your Wishlist is Empty</h3>
            <p className="text-xs text-brown-deep/70 leading-relaxed font-light">
              Explore our pure silk collections and tap the heart icon on any saree to save it for your auspicious day.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gold text-brown-dark font-serif text-xs uppercase tracking-wider font-bold rounded-sm hover:bg-gold-light transition-all shadow-sm"
            >
              <span>Explore Saree Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

