import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Sparkles, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/header.css';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsSearchOpen,
    setIsConciergeOpen,
    setSelectedCategoryFilter
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileMenuOpen]);

  const isHomeView = currentView === 'home';
  const headerStatusClass = !isHomeView || isScrolled ? 'scrolled' : 'transparent';

  const navigateToCategory = (catName: string) => {
    setSelectedCategoryFilter(catName);
    setCurrentView('shop');
    setShopDropdownOpen(false);
    setCollectionsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="header-announcement-bar">
        <Sparkles className="announcement-sparkle-icon animate-pulse" />
        <span className="announcement-text">
          <span className="hidden sm:inline">Complimentary Insured Shipping Across India on Orders Above ₹3,000 | </span>
          <span className="sm:hidden">Free Shipping Above ₹3,000 • </span>
          Use Code: <span className="announcement-promo-code">WELCOME10</span> for 10% Off
        </span>
        <button
          onClick={() => setIsConciergeOpen(true)}
          className="announcement-concierge-btn"
        >
          <PhoneCall className="announcement-phone-icon" />
          <span>Book Video Concierge</span>
        </button>
      </div>

      {/* Main Header */}
      <header className={`site-header ${headerStatusClass}`}>
        <div className="header-container">
          <div className="header-inner-row">
            
            {/* Mobile Menu Button */}
            <div className="header-mobile-toggle-wrap">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="header-mobile-toggle-btn"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo: M. SIVA-TEX */}
            <div className="header-logo-wrap">
              <button
                onClick={() => setCurrentView('home')}
                className="header-logo-btn"
                aria-label="M. SIVA-TEX Home"
              >
                <img
                  src="/assets/logo-gold-transparent.png"
                  alt="M. SIVA-TEX - Pure Silk Weavers Kanchipuram"
                  className="header-logo-img"
                />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="header-nav-desktop">
              <button
                onClick={() => setCurrentView('home')}
                className={`header-nav-item-btn ${currentView === 'home' ? 'active' : ''}`}
              >
                Home
                {currentView === 'home' && (
                  <motion.div layoutId="navUnderline" className="header-nav-underline" />
                )}
              </button>

              {/* Shop Sarees with Mega Dropdown */}
              <div
                className="header-dropdown-parent"
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    setSelectedCategoryFilter(null);
                    setCurrentView('shop');
                  }}
                  className={`header-dropdown-parent-btn ${currentView === 'shop' ? 'active' : ''}`}
                >
                  <span>Shop Sarees</span>
                  <ChevronDown className={`header-dropdown-chevron ${shopDropdownOpen ? 'open' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {shopDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="header-mega-menu"
                    >
                      {/* Column 1: By Weave */}
                      <div className="header-mega-col">
                        <h4 className="header-mega-heading">
                          By Handloom Weave
                        </h4>
                        <ul className="header-mega-list">
                          {['Kanchipuram Silk', 'Banarasi Silk', 'Soft Silk', 'Cotton Sarees', 'Organza Sarees', 'Georgette Sarees'].map(cat => (
                            <li key={cat}>
                              <button
                                onClick={() => navigateToCategory(cat)}
                                className="header-mega-item-btn"
                              >
                                <span>{cat}</span>
                                <span className="header-mega-item-arrow">Explore &rarr;</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 2: By Occasion */}
                      <div className="header-mega-col">
                        <h4 className="header-mega-heading">
                          By Auspicious Occasion
                        </h4>
                        <ul className="header-mega-list">
                          {[
                            { name: 'Bridal Muhurtham', tag: 'Pure Zari Gold' },
                            { name: 'Reception & Cocktails', tag: 'Contemporary Sheer' },
                            { name: 'Festive Puja & Diwali', tag: 'Traditional Temple' },
                            { name: 'Office Elegance', tag: 'Breathable Handspun' },
                            { name: 'Family Heirlooms', tag: 'Korvai 3-Ply Silk' }
                          ].map(item => (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  setSelectedCategoryFilter(null);
                                  setCurrentView('shop');
                                  setShopDropdownOpen(false);
                                }}
                                className="header-mega-item-btn"
                              >
                                <div>
                                  <div>{item.name}</div>
                                  <div className="header-mega-item-tag">{item.tag}</div>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Column 3: Featured Imagery Banner */}
                      <div className="header-mega-featured-card">
                        <div className="header-mega-card-img-wrap">
                          <img
                            src="/assets/siva-tex/siva-sarees-6.jpg"
                            alt="Royal Kanchipuram Weaves"
                            className="header-mega-card-img"
                          />
                          <div className="header-mega-card-gradient">
                            <span className="header-mega-card-title">Kanchipuram Korvai Edit</span>
                          </div>
                        </div>
                        <p className="header-mega-card-desc">
                          "Each thread tells a story of 50 years of master weaver heritage."
                        </p>
                        <button
                          onClick={() => navigateToCategory('Kanchipuram Silk')}
                          className="header-mega-card-link-btn"
                        >
                          View Signature Silks &rarr;
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collections with Dropdown */}
              <div
                className="header-dropdown-parent"
                onMouseEnter={() => setCollectionsDropdownOpen(true)}
                onMouseLeave={() => setCollectionsDropdownOpen(false)}
              >
                <button
                  onClick={() => {
                    setSelectedCategoryFilter('Bridal Silk');
                    setCurrentView('shop');
                  }}
                  className="header-dropdown-parent-btn"
                >
                  <span>Collections</span>
                  <ChevronDown className={`header-dropdown-chevron ${collectionsDropdownOpen ? 'open' : ''}`} />
                </button>

                <AnimatePresence>
                  {collectionsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="header-single-dropdown"
                    >
                      <ul className="header-mega-list">
                        {[
                          { name: 'Sacred Bridal Trousseau 2026', cat: 'Bridal Silk' },
                          { name: 'Royal Kanchipuram Masterpieces', cat: 'Kanchipuram Silk' },
                          { name: 'The Banarasi Kadwa Archives', cat: 'Banarasi Silk' },
                          { name: 'Whispering Soft Silks', cat: 'Soft Silk' },
                          { name: 'Heirloom Organza & Tissue', cat: 'Organza Sarees' },
                          { name: 'Handspun Chanderi Cottons', cat: 'Cotton Sarees' }
                        ].map(c => (
                          <li key={c.name}>
                            <button
                              onClick={() => navigateToCategory(c.cat)}
                              className="header-mega-item-btn"
                            >
                              <span>{c.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => {
                  setSelectedCategoryFilter(null);
                  setCurrentView('shop');
                }}
                className="header-nav-item-btn"
              >
                New Arrivals
              </button>

              <button
                onClick={() => setCurrentView('heritage')}
                className={`header-nav-item-btn ${currentView === 'heritage' ? 'active' : ''}`}
              >
                Our Heritage
                {currentView === 'heritage' && (
                  <motion.div layoutId="navUnderline" className="header-nav-underline" />
                )}
              </button>

              <button
                onClick={() => setCurrentView('contact')}
                className={`header-nav-item-btn ${currentView === 'contact' ? 'active' : ''}`}
              >
                Contact
                {currentView === 'contact' && (
                  <motion.div layoutId="navUnderline" className="header-nav-underline" />
                )}
              </button>
            </nav>

            {/* Right Action Icons */}
            <div className="header-actions-row">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="header-action-btn"
                aria-label="Search Sarees"
                title="Search Sarees"
              >
                <Search className="header-action-icon" />
              </button>

              {/* Account */}
              <button
                onClick={() => setCurrentView('account')}
                className="header-action-btn header-action-user-btn"
                aria-label="Customer Account"
                title="My Account & Orders"
              >
                <User className="header-action-icon" />
              </button>

              {/* Wishlist with Badge */}
              <button
                onClick={() => setCurrentView('wishlist')}
                className="header-action-btn"
                aria-label="Wishlist"
                title="Saved Heirlooms"
              >
                <Heart className="header-action-icon" />
                {wishlistCount > 0 && (
                  <span className="header-badge-wishlist">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag with Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="header-action-btn"
                aria-label="Shopping Bag"
                title="Bespoke Shopping Bag"
              >
                <ShoppingBag className="header-action-icon" />
                {cartCount > 0 && (
                  <span className="header-badge-cart animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-drawer-backdrop"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-drawer-aside"
            >
              <div className="mobile-drawer-top">
                <button
                  onClick={() => {
                    setCurrentView('home');
                    setMobileMenuOpen(false);
                  }}
                  className="mobile-drawer-logo-btn"
                >
                  <img
                    src="/assets/logo-gold-transparent.png"
                    alt="M. SIVA-TEX"
                    className="mobile-drawer-logo-img"
                  />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-drawer-close-btn"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mobile-drawer-nav-list">
                <div>
                  <button
                    onClick={() => {
                      setCurrentView('home');
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-link-btn"
                  >
                    Home
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategoryFilter(null);
                      setCurrentView('shop');
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-link-btn"
                  >
                    Shop All Sarees
                  </button>

                  <div className="pt-2 pb-1 border-t border-b border-[#D4AF37]/20 my-1">
                    <button
                      type="button"
                      onClick={() => setMobileCatOpen(!mobileCatOpen)}
                      className="w-full flex items-center justify-between py-2 text-left text-xs uppercase tracking-widest text-[#D4AF37] font-semibold"
                    >
                      <span>Handloom Categories</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCatOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileCatOpen && (
                      <div className="mobile-drawer-cat-list pb-2">
                        {['Kanchipuram Silk', 'Banarasi Silk', 'Soft Silk', 'Cotton Sarees', 'Bridal Silk', 'Organza Sarees', 'Georgette Sarees'].map(cat => (
                          <button
                            key={cat}
                            onClick={() => navigateToCategory(cat)}
                            className="mobile-drawer-cat-btn"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('heritage');
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-link-btn"
                  >
                    Our Heritage & Looms
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('account');
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-link-btn"
                  >
                    My Account & Orders
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('wishlist');
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-link-btn-row"
                  >
                    <span>Saved Heirlooms</span>
                    <span className="mobile-drawer-badge-count">{wishlistCount}</span>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('contact');
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-link-btn"
                  >
                    Contact & Boutiques
                  </button>
                </div>

                {/* Mobile Concierge CTA */}
                <div className="mobile-drawer-concierge-card">
                  <Sparkles className="mobile-drawer-concierge-icon" />
                  <h4 className="mobile-drawer-concierge-title">Need Styling Guidance?</h4>
                  <p className="mobile-drawer-concierge-desc">
                    Experience our live video concierge with a master saree draper.
                  </p>
                  <button
                    onClick={() => {
                      setIsConciergeOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="mobile-drawer-concierge-btn min-h-[44px]"
                  >
                    Book Video Consultation
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
