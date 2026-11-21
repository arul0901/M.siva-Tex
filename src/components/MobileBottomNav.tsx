import React from 'react';
import { useShop } from '../context/ShopContext';
import { Home, Sparkles, Heart, ShoppingBag, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    setSelectedCategoryFilter,
    cartCount, 
    wishlistCount, 
    setIsCartOpen,
    setIsAuthModalOpen 
  } = useShop();

  const handleNav = (view: any) => {
    if (view === 'cart') {
      setIsCartOpen(true);
      return;
    }
    if (view === 'account') {
      setIsAuthModalOpen(true);
      return;
    }
    if (view === 'home' || view === 'shop') {
      setSelectedCategoryFilter(null);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#360005]/95 backdrop-blur-md border-t border-[#D4AF37]/30 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
      aria-label="Mobile Navigation Bar"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* 1. HOME */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            currentView === 'home' ? 'text-[#ECBA51]' : 'text-[#FDFBF7]/70 hover:text-[#ECBA51]'
          }`}
          aria-label="Home"
        >
          <Home className={`w-5 h-5 mb-0.5 ${currentView === 'home' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] font-medium tracking-wider uppercase font-secondary">Home</span>
        </button>

        {/* 2. SHOP / COLLECTIONS */}
        <button
          onClick={() => handleNav('shop')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            currentView === 'shop' ? 'text-[#ECBA51]' : 'text-[#FDFBF7]/70 hover:text-[#ECBA51]'
          }`}
          aria-label="Shop Sarees"
        >
          <Sparkles className={`w-5 h-5 mb-0.5 ${currentView === 'shop' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] font-medium tracking-wider uppercase font-secondary">Shop</span>
        </button>

        {/* 3. WISHLIST */}
        <button
          onClick={() => handleNav('wishlist')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            currentView === 'wishlist' ? 'text-[#ECBA51]' : 'text-[#FDFBF7]/70 hover:text-[#ECBA51]'
          }`}
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 mb-0.5 ${currentView === 'wishlist' ? 'stroke-[2.5] fill-[#ECBA51]/20' : 'stroke-[1.75]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#D4AF37] text-[#4D0007] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#4D0007]">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase font-secondary">Wishlist</span>
        </button>

        {/* 4. CART */}
        <button
          onClick={() => handleNav('cart')}
          className="relative flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[#FDFBF7]/70 hover:text-[#ECBA51] transition-colors"
          aria-label="Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 stroke-[1.75]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#ECBA51] text-[#4D0007] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#4D0007]">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase font-secondary">Cart</span>
        </button>

        {/* 5. ACCOUNT */}
        <button
          onClick={() => handleNav('account')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            currentView === 'account' ? 'text-[#ECBA51]' : 'text-[#FDFBF7]/70 hover:text-[#ECBA51]'
          }`}
          aria-label="Account"
        >
          <User className={`w-5 h-5 mb-0.5 ${currentView === 'account' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
          <span className="text-[10px] font-medium tracking-wider uppercase font-secondary">Account</span>
        </button>

      </div>
    </nav>
  );
};
