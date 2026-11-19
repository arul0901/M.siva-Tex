import React, { useState, useMemo } from 'react';
import { SAREE_PRODUCTS, CATEGORIES_DATA } from '../data/sarees';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { Filter, SlidersHorizontal, X, ChevronDown, Sparkles, Grid, LayoutList, Eye, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/shop-view.css';

export const ShopView: React.FC = () => {
  const { 
    selectedCategoryFilter, 
    setSelectedCategoryFilter, 
    searchQuery, 
    setSearchQuery,
    openProductDetail,
    addToCart,
    setQuickViewProduct,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter & Sort Logic (Category and Search)
  const filteredProducts = useMemo(() => {
    return SAREE_PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategoryFilter && product.category !== selectedCategoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q) ||
          product.weave.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0); // 'featured'
    });
  }, [selectedCategoryFilter, sortBy, searchQuery]);

  const clearAllFilters = () => {
    setSelectedCategoryFilter(null);
    setSearchQuery('');
  };

  const activeFilterCount =
    (selectedCategoryFilter ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8 border-b border-gold/20 pb-6">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-brown-deep/60 mb-2">
            <span>Home</span>
            <span>/</span>
            <span>Boutique Catalog</span>
            {selectedCategoryFilter && (
              <>
                <span>/</span>
                <span className="text-gold font-bold">{selectedCategoryFilter}</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
                {selectedCategoryFilter ? selectedCategoryFilter : 'All Handloom Sarees'}
              </h1>
              <p className="text-xs sm:text-sm text-brown-deep/70 font-light mt-1">
                Showing {filteredProducts.length} authentic handcrafted silk and artisanal handlooms.
              </p>
            </div>

            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden min-h-[44px] px-3.5 py-2 bg-beige/60 hover:bg-beige border border-gold/40 rounded-sm text-xs font-serif uppercase tracking-wider text-burgundy flex items-center gap-2 transition-colors active:scale-98"
                aria-label="Open collection filters"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border border-gold/30 rounded-sm overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 transition-colors ${viewMode === 'grid' ? 'bg-burgundy text-gold-pale' : 'text-brown-deep/60 hover:text-burgundy'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 transition-colors ${viewMode === 'list' ? 'bg-burgundy text-gold-pale' : 'text-brown-deep/60 hover:text-burgundy'}`}
                  title="List View"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="min-h-[44px] appearance-none bg-white border border-gold/30 rounded-sm pl-3 pr-8 py-2 text-xs font-serif uppercase tracking-wider text-burgundy focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="featured">Featured Weaves</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gold/15 text-xs">
              <span className="font-serif text-brown-deep/60 uppercase tracking-wider text-[11px]">
                Active Filters:
              </span>
              {selectedCategoryFilter && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-burgundy text-gold-pale rounded-xs font-serif text-[11px]">
                  <span>{selectedCategoryFilter}</span>
                  <button onClick={() => setSelectedCategoryFilter(null)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-beige border border-gold/40 text-burgundy rounded-xs font-serif text-[11px]">
                  <span>Search: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-wine underline hover:text-burgundy font-serif ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Grid with Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (Col 1-3) - Saree Weave / Category Only */}
          <div className="hidden lg:block lg:col-span-3 bg-white/70 p-6 rounded-sm border border-gold/25 sticky top-28 space-y-6">
            
            <div className="flex items-center justify-between border-b border-gold/20 pb-3">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-burgundy flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold" />
                <span>Refine Collection</span>
              </h3>
              {selectedCategoryFilter && (
                <button
                  onClick={() => setSelectedCategoryFilter(null)}
                  className="text-[11px] text-wine hover:underline font-serif"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Saree Categories */}
            <div>
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                Saree Weave / Category
              </h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategoryFilter(null)}
                  className={`w-full text-left py-1.5 px-2.5 rounded-xs flex items-center justify-between transition-colors ${
                    selectedCategoryFilter === null ? 'bg-burgundy text-gold-pale font-medium' : 'text-brown-deep/80 hover:bg-beige'
                  }`}
                >
                  <span>All Collections</span>
                  <span className="text-[10px] opacity-75">{SAREE_PRODUCTS.length}</span>
                </button>
                {CATEGORIES_DATA.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.categoryKey)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-xs flex items-center justify-between transition-colors ${
                      selectedCategoryFilter === cat.categoryKey
                        ? 'bg-burgundy text-gold-pale font-medium'
                        : 'text-brown-deep/80 hover:bg-beige'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-75">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Products Grid (Col 4-12) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white/60 border border-gold/20 rounded-sm p-16 text-center space-y-4">
                <Sparkles className="w-10 h-10 text-gold mx-auto" />
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  No Sarees Found Matching Your Filters
                </h3>
                <p className="text-xs text-brown-deep/70 max-w-md mx-auto leading-relaxed">
                  Try adjusting the price slider or resetting some color/weave filters to explore our wider collection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-burgundy text-gold-pale font-serif text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-gold hover:text-brown-dark transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-6">
                {filteredProducts.map(product => {
                  const inWishlist = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white p-4 sm:p-6 rounded-sm border border-gold/20 flex flex-col sm:flex-row gap-5 sm:gap-6 shadow-xs hover:border-gold/50 transition-all"
                    >
                      <div
                        onClick={() => openProductDetail(product)}
                        className="sm:w-56 aspect-[3/4] overflow-hidden rounded-xs bg-beige shrink-0 cursor-pointer group"
                      >
                        <img
                          src={product.primaryImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs text-gold font-serif uppercase tracking-wider mb-1">
                            <span>{product.category}</span>
                            <span className="text-brown-deep/60 font-sans">{product.zari}</span>
                          </div>
                          <h3
                            onClick={() => openProductDetail(product)}
                            className="font-serif text-lg font-bold text-burgundy mb-2 cursor-pointer hover:text-gold transition-colors"
                          >
                            {product.name}
                          </h3>
                          <p className="text-xs text-brown-deep/80 leading-relaxed font-light mb-4 line-clamp-2">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap gap-2 text-[11px] text-brown-deep/70 mb-4">
                            <span className="px-2 py-0.5 bg-beige rounded-xs">Weave: {product.weave}</span>
                            <span className="px-2 py-0.5 bg-beige rounded-xs">Fabric: {product.fabric}</span>
                            <span className="px-2 py-0.5 bg-beige rounded-xs">Origin: {product.origin}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gold/15">
                          <div>
                            <span className="font-serif text-xl font-bold text-burgundy">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-xs text-brown-deep/50 line-through ml-2">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className="min-h-[44px] min-w-[44px] px-3 py-2 bg-beige/50 hover:bg-beige border border-gold/30 rounded-xs text-burgundy text-xs font-serif flex items-center justify-center gap-1.5 transition-colors"
                              title="Quick View"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden xs:inline">Quick View</span>
                            </button>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className={`min-h-[44px] min-w-[44px] p-2.5 rounded-xs border transition-colors flex items-center justify-center ${
                                inWishlist ? 'border-wine bg-wine text-ivory' : 'border-gold/30 text-burgundy hover:border-gold'
                              }`}
                              aria-label="Save to wishlist"
                            >
                              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                            </button>
                            <button
                              onClick={() => addToCart(product, 1)}
                              className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark text-xs font-serif uppercase tracking-wider font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Bag</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Slide-out Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs lg:hidden"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-ivory shadow-2xl z-50 flex flex-col border-l border-gold/30 text-brown-deep lg:hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-gold/25 flex items-center justify-between bg-burgundy text-gold-pale">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gold" />
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-ivory">
                    Refine Sarees {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ivory/70 hover:text-white transition-colors"
                  aria-label="Close filter drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Filters Body - Saree Weave / Category Only */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                    Saree Weave / Category
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter(null);
                        setMobileFilterOpen(false);
                      }}
                      className={`min-h-[44px] w-full text-left py-2 px-3 rounded-xs flex items-center justify-between transition-colors ${
                        selectedCategoryFilter === null ? 'bg-burgundy text-gold-pale font-medium' : 'text-brown-deep/80 hover:bg-beige bg-white/70 border border-gold/20'
                      }`}
                    >
                      <span>All Collections</span>
                      <span className="text-[10px] opacity-75">{SAREE_PRODUCTS.length}</span>
                    </button>
                    {CATEGORIES_DATA.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategoryFilter(cat.categoryKey);
                          setMobileFilterOpen(false);
                        }}
                        className={`min-h-[44px] w-full text-left py-2 px-3 rounded-xs flex items-center justify-between transition-colors ${
                          selectedCategoryFilter === cat.categoryKey
                            ? 'bg-burgundy text-gold-pale font-medium'
                            : 'text-brown-deep/80 hover:bg-beige bg-white/70 border border-gold/20'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] opacity-75">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Pinned Bottom Actions */}
              <div className="p-4 border-t border-gold/25 bg-beige/40 flex items-center gap-3">
                <button
                  onClick={clearAllFilters}
                  className="min-h-[44px] px-4 py-2.5 border border-gold/40 text-burgundy hover:bg-white text-xs font-serif uppercase tracking-wider font-semibold rounded-xs transition-colors shrink-0"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="min-h-[44px] flex-1 py-2.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark text-xs font-serif uppercase tracking-wider font-semibold rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Apply Filters ({filteredProducts.length})</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

