import React, { useState, useMemo } from 'react';
import { SAREE_PRODUCTS, CATEGORIES_DATA } from '../data/sarees';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { Filter, SlidersHorizontal, X, ChevronDown, Sparkles, Grid, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/shop-view.css';

export const ShopView: React.FC = () => {
  const { selectedCategoryFilter, setSelectedCategoryFilter, searchQuery, setSearchQuery } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedZari, setSelectedZari] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(65000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Available unique colors
  const colorOptions = [
    { name: 'Royal Purple', hex: '#481A36' },
    { name: 'Crimson Red', hex: '#8B1E3F' },
    { name: 'Emerald Green', hex: '#1B4D3E' },
    { name: 'Mustard Gold', hex: '#B18A52' },
    { name: 'Blush Pink', hex: '#D9B7B1' },
    { name: 'Peacock Blue', hex: '#0E4D64' },
    { name: 'Midnight Black', hex: '#30221F' },
    { name: 'Pista Green', hex: '#A3B18A' }
  ];

  // Available Zari Types
  const zariOptions = [
    'Pure Gold Zari',
    'Tested Gold Zari',
    'Antique Silver Zari',
    'Copper Zari',
    'Resham Thread'
  ];

  // Available Occasions
  const occasionOptions = [
    'Bridal Muhurtham',
    'Reception',
    'Festive Puja',
    'Evening Party',
    'Office & Casual'
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return SAREE_PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategoryFilter && product.category !== selectedCategoryFilter) {
        return false;
      }
      // Zari filter
      if (selectedZari && product.zari !== selectedZari) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion && !product.occasion.includes(selectedOccasion as any)) {
        return false;
      }
      // Color filter
      if (selectedColor && !product.color.toLowerCase().includes(selectedColor.toLowerCase())) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
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
  }, [selectedCategoryFilter, selectedZari, selectedOccasion, selectedColor, maxPrice, sortBy, searchQuery]);

  const clearAllFilters = () => {
    setSelectedCategoryFilter(null);
    setSelectedZari(null);
    setSelectedOccasion(null);
    setSelectedColor(null);
    setMaxPrice(65000);
    setSearchQuery('');
  };

  const activeFilterCount =
    (selectedCategoryFilter ? 1 : 0) +
    (selectedZari ? 1 : 0) +
    (selectedOccasion ? 1 : 0) +
    (selectedColor ? 1 : 0) +
    (maxPrice < 65000 ? 1 : 0) +
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-beige/60 border border-gold/30 rounded-sm text-xs font-serif uppercase tracking-wider text-burgundy flex items-center gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border border-gold/30 rounded-sm overflow-hidden bg-white">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-burgundy text-gold-pale' : 'text-brown-deep/60 hover:text-burgundy'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-burgundy text-gold-pale' : 'text-brown-deep/60 hover:text-burgundy'}`}
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
                  className="appearance-none bg-white border border-gold/30 rounded-sm px-4 py-2 pr-8 text-xs font-serif uppercase tracking-wider text-burgundy focus:outline-none focus:border-gold cursor-pointer"
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
              {selectedZari && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-beige border border-gold/40 text-burgundy rounded-xs font-serif text-[11px]">
                  <span>{selectedZari}</span>
                  <button onClick={() => setSelectedZari(null)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedOccasion && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-beige border border-gold/40 text-burgundy rounded-xs font-serif text-[11px]">
                  <span>{selectedOccasion}</span>
                  <button onClick={() => setSelectedOccasion(null)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedColor && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-beige border border-gold/40 text-burgundy rounded-xs font-serif text-[11px]">
                  <span>Color: {selectedColor}</span>
                  <button onClick={() => setSelectedColor(null)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {maxPrice < 65000 && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-beige border border-gold/40 text-burgundy rounded-xs font-serif text-[11px]">
                  <span>Under ₹{maxPrice.toLocaleString('en-IN')}</span>
                  <button onClick={() => setMaxPrice(65000)}><X className="w-3 h-3" /></button>
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
          
          {/* Desktop Filter Sidebar (Col 1-3) */}
          <div className="hidden lg:block lg:col-span-3 bg-white/70 p-6 rounded-sm border border-gold/25 sticky top-28 space-y-6">
            
            <div className="flex items-center justify-between border-b border-gold/20 pb-3">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-burgundy flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold" />
                <span>Refine Collection</span>
              </h3>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
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
                  className={`w-full text-left py-1 px-2 rounded-xs flex items-center justify-between transition-colors ${
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
                    className={`w-full text-left py-1 px-2 rounded-xs flex items-center justify-between transition-colors ${
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

            {/* Price Range Slider */}
            <div className="border-t border-gold/15 pt-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-serif font-bold uppercase tracking-wider text-burgundy">
                  Max Price
                </span>
                <span className="font-serif font-bold text-gold-dark">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="8000"
                max="65000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-brown-deep/60 mt-1 font-serif">
                <span>₹8,000</span>
                <span>₹65,000+</span>
              </div>
            </div>

            {/* Color Filter Swatches */}
            <div className="border-t border-gold/15 pt-5">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-burgundy mb-3">
                Curated Color Palette
              </h4>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                    className={`flex flex-col items-center p-1.5 rounded-sm border transition-all ${
                      selectedColor === color.name
                        ? 'border-gold shadow-sm bg-beige/40'
                        : 'border-transparent hover:border-gold/30'
                    }`}
                    title={color.name}
                  >
                    <span
                      className={`w-6 h-6 rounded-full border border-gold/40 shadow-xs mb-1 color-swatch-${color.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                    <span className="text-[9px] text-center font-serif text-brown-deep leading-tight truncate w-full">
                      {color.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Zari Type */}
            <div className="border-t border-gold/15 pt-5">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                Zari Craftsmanship
              </h4>
              <div className="space-y-1.5 text-xs">
                {zariOptions.map(zari => (
                  <label
                    key={zari}
                    className="flex items-center gap-2 text-brown-deep/80 cursor-pointer hover:text-burgundy"
                  >
                    <input
                      type="checkbox"
                      checked={selectedZari === zari}
                      onChange={() => setSelectedZari(selectedZari === zari ? null : zari)}
                      className="accent-gold rounded-xs"
                    />
                    <span>{zari}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Auspicious Occasion */}
            <div className="border-t border-gold/15 pt-5">
              <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                Auspicious Occasion
              </h4>
              <div className="space-y-1.5 text-xs">
                {occasionOptions.map(occ => (
                  <label
                    key={occ}
                    className="flex items-center gap-2 text-brown-deep/80 cursor-pointer hover:text-burgundy"
                  >
                    <input
                      type="checkbox"
                      checked={selectedOccasion === occ}
                      onChange={() => setSelectedOccasion(selectedOccasion === occ ? null : occ)}
                      className="accent-gold rounded-xs"
                    />
                    <span>{occ}</span>
                  </label>
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
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white p-4 sm:p-6 rounded-sm border border-gold/20 flex flex-col sm:flex-row gap-6 shadow-xs hover:border-gold/50 transition-all"
                  >
                    <div className="sm:w-56 aspect-[3/4] overflow-hidden rounded-xs bg-beige shrink-0">
                      <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-gold font-serif uppercase tracking-wider mb-1">
                          <span>{product.category}</span>
                          <span className="text-brown-deep/60 font-sans">{product.zari}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-burgundy mb-2">
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

                      <div className="flex items-center justify-between pt-4 border-t border-gold/15">
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
                        <ProductCard product={product} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

