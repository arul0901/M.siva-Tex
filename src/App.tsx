import React from 'react';
import { useShop } from './context/ShopContext';
import { Header } from './components/Header';
// import { HeroBanner } from './components/HeroBanner'; // Previous banner disabled as requested
import { CinematicHeroBanner } from './components/CinematicHeroBanner';
import './styles/mobile-fixes.css';

// Redesigned Homepage Sections (Inspired by Master Luxury Reference)
import { ShopByCategory } from './components/ShopByCategory';
import { ShopByOccasion } from './components/ShopByOccasion';
import { BestSellers } from './components/BestSellers';
import { EditorialTriptych } from './components/EditorialTriptych';
import { DualPromoBanner } from './components/DualPromoBanner';
import { StylingSuggestions } from './components/StylingSuggestions';
import { TrustService } from './components/TrustService';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchOverlay } from './components/SearchOverlay';
import { ConciergeModal } from './components/ConciergeModal';
import { ToastContainer } from './components/ToastContainer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';

// Routed Views
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { AccountView } from './views/AccountView';
import { WishlistView } from './views/WishlistView';
import { HeritageView } from './views/HeritageView';
import { ContactView } from './views/ContactView';

export const App: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#4D0007] text-[#FDFBF7] selection:bg-[#D4AF37] selection:text-[#4D0007]">
      {/* Header with sticky behavior & transparent-to-solid transition */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. New Cinematic Animated Hero Banner (Faithfully matches Reference Video) */}
            {/* Old banner disabled and commented out per strict instructions: */}
            {/* <HeroBanner /> */}
            <CinematicHeroBanner />

            {/* 2. Shop By Category (8 Saree Categories with Weave Details & Product Counts) */}
            {/* <ShopByCategory /> */}

            {/* 2. Shop By Occasion (3-Phase Scrollytelling Showcase) */}
            <ShopByOccasion />

            {/* 3. Bestsellers Section (Loved by Many • Iconic Creations) */}
            <BestSellers />

            {/* 4. Editorial Triptych Showcase (A Symphony of Tradition & Craftsmanship) */}
            <EditorialTriptych />

            {/* 5. Dual Editorial Promo Banners (Festive Essentials & Heirloom Silks Up to 30% Off) */}
            <DualPromoBanner />

            {/* 5. Styling Suggestions ("DRAPED YOUR WAY" — The Art of Styling) */}
            <StylingSuggestions />
          </>
        )}

        {currentView === 'shop' && <ShopView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'wishlist' && <WishlistView />}
        {currentView === 'heritage' && <HeritageView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      {/* Premium Dark Burgundy Footer */}
      <Footer />

      {/* Global Interactive Overlays & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <ConciergeModal />
      <ToastContainer />
      <AuthModal />

      {/* Floating Bottom Navigation Bar for Mobile */}
      <MobileBottomNav />
    </div>
  );
};
