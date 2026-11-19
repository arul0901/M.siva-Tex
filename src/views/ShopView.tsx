import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SAREE_PRODUCTS } from '../data/sarees';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { 
  FilterSortSidebar, 
  FilterState, 
  DynamicFilterCounts, 
  COLOR_OPTIONS, 
  CATEGORY_OPTIONS, 
  FABRIC_OPTIONS, 
  OCCASION_OPTIONS,
  SORT_OPTIONS,
  MIN_PRICE_BOUND,
  MAX_PRICE_BOUND
} from '../components/FilterSortSidebar';
import { 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Grid, 
  LayoutList, 
  Eye, 
  ShoppingBag, 
  Heart,
  RotateCcw,
  ArrowUpDown,
  ChevronDown,
  Check,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/shop-view.css';

// Match terms for colors
const COLOR_MATCH_TERMS: Record<string, string[]> = {
  red: ['red', 'crimson', 'kumkum'],
  maroon: ['maroon', 'wine', 'burgundy', 'aubergine'],
  green: ['green', 'emerald', 'pista', 'olive'],
  blue: ['blue', 'indigo', 'peacock', 'navy'],
  pink: ['pink', 'blush', 'rani', 'rose'],
  black: ['black', 'midnight', 'dark'],
  gold: ['gold', 'mustard', 'champagne', 'metallic', 'yellow', 'zari'],
  cream: ['cream', 'ivory', 'beige', 'off-white'],
  purple: ['purple', 'violet', 'lavender', 'magenta']
};

const matchesColor = (p: typeof SAREE_PRODUCTS[0], colorId: string): boolean => {
  const terms = COLOR_MATCH_TERMS[colorId] || [colorId];
  const target = `${p.color} ${p.name} ${p.description}`.toLowerCase();
  return terms.some(t => target.includes(t));
};

const matchesFabric = (p: typeof SAREE_PRODUCTS[0], fabric: string): boolean => {
  const f = fabric.toLowerCase();
  const target = `${p.fabric} ${p.category} ${p.weave}`.toLowerCase();
  if (f === 'silk') return target.includes('silk') || target.includes('pattu') || target.includes('katan');
  if (f === 'cotton') return target.includes('cotton') || target.includes('chanderi');
  if (f === 'georgette') return target.includes('georgette') || target.includes('khaddi');
  if (f === 'chiffon') return target.includes('chiffon');
  if (f === 'organza') return target.includes('organza') || target.includes('kora');
  if (f === 'tissue') return target.includes('tissue');
  if (f === 'crepe') return target.includes('crepe');
  return target.includes(f);
};

const matchesOccasion = (p: typeof SAREE_PRODUCTS[0], occasion: string): boolean => {
  const occ = occasion.toLowerCase();
  const occString = p.occasion.join(' ').toLowerCase();
  const fullText = `${occString} ${p.category} ${p.weave} ${p.name}`.toLowerCase();
  
  if (occ === 'wedding') return /wedding|bridal|muhurtham|reception/i.test(fullText) || !!p.isBridal;
  if (occ === 'bridal') return /bridal|muhurtham/i.test(fullText) || !!p.isBridal || p.category === 'Bridal Silk';
  if (occ === 'festive') return /festive|puja|diwali/i.test(fullText);
  if (occ === 'party wear') return /party|evening|reception/i.test(fullText);
  if (occ === 'traditional') return /traditional|puja|muhurtham|korvai|kadwa/i.test(fullText);
  if (occ === 'daily wear') return /casual|office|daily/i.test(fullText);
  return fullText.includes(occ);
};

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

  // Toolbar & View States
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when filter drawer is open
  useEffect(() => {
    if (filterDrawerOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [filterDrawerOpen]);

  // Unified Filter State
  const [filters, setFilters] = useState<FilterState>({
    categories: selectedCategoryFilter ? [selectedCategoryFilter] : [],
    priceRange: [MIN_PRICE_BOUND, MAX_PRICE_BOUND],
    colors: [],
    fabrics: [],
    occasions: [],
    availability: 'all',
    sortBy: 'recommended',
  });

  // Sync external selectedCategoryFilter from ShopContext
  useEffect(() => {
    if (selectedCategoryFilter) {
      setFilters(prev => ({
        ...prev,
        categories: [selectedCategoryFilter]
      }));
    }
  }, [selectedCategoryFilter]);

  // Handlers for Filter Updates
  const handleCategoryToggle = (categoryKey: string) => {
    setFilters(prev => {
      const exists = prev.categories.includes(categoryKey);
      const updated = exists 
        ? prev.categories.filter(c => c !== categoryKey)
        : [...prev.categories, categoryKey];
      
      if (updated.length === 1) {
        setSelectedCategoryFilter(updated[0]);
      } else {
        setSelectedCategoryFilter(null);
      }
      return { ...prev, categories: updated };
    });
  };

  const handleCategorySelectAll = () => {
    setFilters(prev => ({ ...prev, categories: [] }));
    setSelectedCategoryFilter(null);
  };

  const handlePriceChange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const handleColorToggle = (colorId: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(colorId)
        ? prev.colors.filter(c => c !== colorId)
        : [...prev.colors, colorId]
    }));
  };

  const handleFabricToggle = (fabric: string) => {
    setFilters(prev => ({
      ...prev,
      fabrics: prev.fabrics.includes(fabric)
        ? prev.fabrics.filter(f => f !== fabric)
        : [...prev.fabrics, fabric]
    }));
  };

  const handleOccasionToggle = (occasion: string) => {
    setFilters(prev => ({
      ...prev,
      occasions: prev.occasions.includes(occasion)
        ? prev.occasions.filter(o => o !== occasion)
        : [...prev.occasions, occasion]
    }));
  };

  const handleAvailabilityChange = (val: 'all' | 'in_stock' | 'out_of_stock') => {
    setFilters(prev => ({ ...prev, availability: val }));
  };

  const handleSortChange = (sortVal: string) => {
    setFilters(prev => ({ ...prev, sortBy: sortVal }));
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      priceRange: [MIN_PRICE_BOUND, MAX_PRICE_BOUND],
      colors: [],
      fabrics: [],
      occasions: [],
      availability: 'all',
      sortBy: 'recommended',
    });
    setSelectedCategoryFilter(null);
    setSearchQuery('');
  };

  // Filter & Sort Execution Logic
  const filteredProducts = useMemo(() => {
    return SAREE_PRODUCTS.filter(product => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.fabric.toLowerCase().includes(q) ||
          product.weave.toLowerCase().includes(q) ||
          product.color.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Saree Weave / Category Filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) {
          return false;
        }
      }

      // 3. Price Range Filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // 4. Color Filter
      if (filters.colors.length > 0) {
        const hasColor = filters.colors.some(colId => matchesColor(product, colId));
        if (!hasColor) return false;
      }

      // 5. Fabric Filter
      if (filters.fabrics.length > 0) {
        const hasFabric = filters.fabrics.some(fab => matchesFabric(product, fab));
        if (!hasFabric) return false;
      }

      // 6. Occasion Filter
      if (filters.occasions.length > 0) {
        const hasOccasion = filters.occasions.some(occ => matchesOccasion(product, occ));
        if (!hasOccasion) return false;
      }

      // 7. Availability Filter
      if (filters.availability === 'out_of_stock') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0) || b.price - a.price;
        case 'popularity':
          return b.reviewCount - a.reviewCount || b.rating - a.rating;
        case 'best-selling':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating;
        case 'recommended':
        default:
          const scoreA = (a.isBestSeller ? 3 : 0) + (a.isNewArrival ? 2 : 0) + a.rating;
          const scoreB = (b.isBestSeller ? 3 : 0) + (b.isNewArrival ? 2 : 0) + b.rating;
          return scoreB - scoreA;
      }
    });
  }, [filters, searchQuery]);

  // Dynamic Product Counts Calculation
  const filterCounts: DynamicFilterCounts = useMemo(() => {
    const catCounts: Record<string, number> = {};
    CATEGORY_OPTIONS.forEach(c => {
      catCounts[c.key] = 0;
    });

    const colCounts: Record<string, number> = {};
    COLOR_OPTIONS.forEach(c => {
      colCounts[c.id] = 0;
    });

    const fabCounts: Record<string, number> = {};
    FABRIC_OPTIONS.forEach(f => {
      fabCounts[f] = 0;
    });

    const occCounts: Record<string, number> = {};
    OCCASION_OPTIONS.forEach(o => {
      occCounts[o] = 0;
    });

    let inStockCount = 0;

    SAREE_PRODUCTS.forEach(p => {
      if (catCounts[p.category] !== undefined) {
        catCounts[p.category]++;
      }

      COLOR_OPTIONS.forEach(c => {
        if (matchesColor(p, c.id)) {
          colCounts[c.id]++;
        }
      });

      FABRIC_OPTIONS.forEach(f => {
        if (matchesFabric(p, f)) {
          fabCounts[f]++;
        }
      });

      OCCASION_OPTIONS.forEach(o => {
        if (matchesOccasion(p, o)) {
          occCounts[o]++;
        }
      });

      inStockCount++;
    });

    return {
      categories: catCounts,
      colors: colCounts,
      fabrics: fabCounts,
      occasions: occCounts,
      availability: {
        in_stock: inStockCount,
        out_of_stock: 0
      },
      total: SAREE_PRODUCTS.length,
      filtered: filteredProducts.length
    };
  }, [filteredProducts.length]);

  // Active filter count
  const activeCount = 
    filters.categories.length +
    (filters.priceRange[0] > MIN_PRICE_BOUND || filters.priceRange[1] < MAX_PRICE_BOUND ? 1 : 0) +
    filters.colors.length +
    filters.fabrics.length +
    filters.occasions.length +
    (filters.availability !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const currentSortOption = SORT_OPTIONS.find(o => o.value === filters.sortBy) || SORT_OPTIONS[0];

  return (
    <div className="bg-ivory min-h-screen py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================
            Top Header Bar: Left Title/Breadcrumbs + Right Toolbar
            ======================================================== */}
        <div className="mb-6 sm:mb-8 border-b border-gold/20 pb-5 sm:pb-6">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-brown-deep/60 mb-2">
            <span>Home</span>
            <span>/</span>
            <span>Boutique Catalog</span>
            {filters.categories.length === 1 && (
              <>
                <span>/</span>
                <span className="text-gold font-bold">{filters.categories[0]}</span>
              </>
            )}
            {filters.categories.length > 1 && (
              <>
                <span>/</span>
                <span className="text-gold font-bold">{filters.categories.length} Categories</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-burgundy font-normal tracking-wide">
                {filters.categories.length === 1 
                  ? filters.categories[0] 
                  : filters.categories.length > 1 
                    ? 'Curated Saree Collections' 
                    : 'All Handloom Sarees'}
              </h1>
              <p className="text-xs sm:text-sm text-brown-deep/70 font-light mt-1">
                Showing {filteredProducts.length} authentic handcrafted silk and artisanal handlooms.
              </p>
            </div>

            {/* ========================================================
                PREMIUM TOP-RIGHT TOOLBAR:
                [ FILTER ⚙ ] [ SORT BY ⇅ ] [ GRID ICON ] [ LIST ICON ]
                ======================================================== */}
            <div className="flex items-center gap-2 sm:gap-2.5 self-start md:self-auto flex-wrap sm:flex-nowrap">
              
              {/* 1. FILTER Button */}
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className={`toolbar-btn ${activeCount > 0 ? 'toolbar-btn-active' : ''}`}
                aria-label="Open filter sidebar drawer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-gold toolbar-btn-icon" />
                <span>Filter</span>
                {activeCount > 0 && (
                  <span className="toolbar-badge">
                    {activeCount}
                  </span>
                )}
              </button>

              {/* 2. SORT BY Button with Popover Dropdown */}
              <div className="relative" ref={sortDropdownRef}>
                <button
                  onClick={() => setSortDropdownOpen(prev => !prev)}
                  className="toolbar-btn"
                  aria-expanded={sortDropdownOpen}
                  aria-label="Sort products dropdown"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-gold toolbar-btn-icon" />
                  <span className="hidden xs:inline">Sort:</span>
                  <span className="font-semibold">{currentSortOption.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Elegant Sort Dropdown anchored directly below */}
                <AnimatePresence>
                  {sortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="sort-dropdown-menu"
                    >
                      <div className="px-3.5 py-1.5 border-b border-gold/15 text-[9px] font-serif uppercase tracking-widest text-brown-deep/50 font-bold">
                        Sort Collection
                      </div>
                      {SORT_OPTIONS.map(opt => {
                        const isSelected = filters.sortBy === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              handleSortChange(opt.value);
                              setSortDropdownOpen(false);
                            }}
                            className={`sort-dropdown-item ${isSelected ? 'active' : ''}`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-gold stroke-[2.5]" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3 & 4. GRID / LIST VIEW Buttons */}
              <div className="flex items-center border border-gold/35 rounded-xs overflow-hidden bg-white shadow-xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`min-h-[42px] min-w-[42px] flex items-center justify-center p-2 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-burgundy text-gold-pale' 
                      : 'text-brown-deep/60 hover:text-burgundy hover:bg-beige/60'
                  }`}
                  title="Grid View"
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`min-h-[42px] min-w-[42px] flex items-center justify-center p-2 transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-burgundy text-gold-pale' 
                      : 'text-brown-deep/60 hover:text-burgundy hover:bg-beige/60'
                  }`}
                  title="List View"
                  aria-label="List view"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Active Filter Tags Bar with Instant Clear */}
          {activeCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gold/15 text-xs">
              <span className="font-serif text-brown-deep/60 uppercase tracking-wider text-[11px] font-semibold">
                Active Filters:
              </span>

              {/* Category tags */}
              {filters.categories.map(cat => (
                <span 
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-burgundy text-gold-pale rounded-xs font-serif text-[11px] shadow-xs"
                >
                  <span>{cat}</span>
                  <button 
                    onClick={() => handleCategoryToggle(cat)}
                    className="hover:text-white transition-colors"
                    aria-label={`Remove ${cat} filter`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Price range tag */}
              {(filters.priceRange[0] > MIN_PRICE_BOUND || filters.priceRange[1] < MAX_PRICE_BOUND) && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/40 text-burgundy rounded-xs font-serif text-[11px] shadow-xs">
                  <span>Price: ₹{filters.priceRange[0].toLocaleString('en-IN')} – ₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
                  <button 
                    onClick={() => handlePriceChange([MIN_PRICE_BOUND, MAX_PRICE_BOUND])}
                    className="hover:text-wine transition-colors"
                    aria-label="Reset price filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Color tags */}
              {filters.colors.map(colId => {
                const opt = COLOR_OPTIONS.find(c => c.id === colId);
                return (
                  <span 
                    key={colId}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/40 text-burgundy rounded-xs font-serif text-[11px] shadow-xs"
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full inline-block border border-black/20"
                      style={{ backgroundColor: opt?.hex || '#999' }}
                    />
                    <span>{opt?.name || colId}</span>
                    <button 
                      onClick={() => handleColorToggle(colId)}
                      className="hover:text-wine transition-colors"
                      aria-label={`Remove color ${opt?.name || colId}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}

              {/* Fabric tags */}
              {filters.fabrics.map(fab => (
                <span 
                  key={fab}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/40 text-burgundy rounded-xs font-serif text-[11px] shadow-xs"
                >
                  <span>Fabric: {fab}</span>
                  <button 
                    onClick={() => handleFabricToggle(fab)}
                    className="hover:text-wine transition-colors"
                    aria-label={`Remove fabric ${fab}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Occasion tags */}
              {filters.occasions.map(occ => (
                <span 
                  key={occ}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/40 text-burgundy rounded-xs font-serif text-[11px] shadow-xs"
                >
                  <span>Occasion: {occ}</span>
                  <button 
                    onClick={() => handleOccasionToggle(occ)}
                    className="hover:text-wine transition-colors"
                    aria-label={`Remove occasion ${occ}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {/* Availability tag */}
              {filters.availability !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-gold/40 text-burgundy rounded-xs font-serif text-[11px] shadow-xs">
                  <span>{filters.availability === 'in_stock' ? 'In Stock Only' : 'Out of Stock Only'}</span>
                  <button 
                    onClick={() => handleAvailabilityChange('all')}
                    className="hover:text-wine transition-colors"
                    aria-label="Reset availability"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Search query tag */}
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-beige border border-gold/40 text-burgundy rounded-xs font-serif text-[11px] shadow-xs">
                  <span>Search: "{searchQuery}"</span>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="hover:text-wine transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {/* Clear all button */}
              <button
                onClick={handleClearAll}
                className="text-xs text-wine hover:text-burgundy hover:underline font-serif ml-2 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================
            FULL-WIDTH PRODUCT GRID (Sidebar Completely Removed)
            ======================================================== */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="bg-white/70 border border-gold/25 rounded-xs p-16 text-center space-y-4 shadow-sm">
              <Sparkles className="w-10 h-10 text-gold mx-auto" />
              <h3 className="font-serif text-xl font-bold text-burgundy">
                No Sarees Found Matching Your Filters
              </h3>
              <p className="text-xs text-brown-deep/70 max-w-md mx-auto leading-relaxed">
                We could not find any handloom sarees matching your exact criteria. Try adjusting your price slider or resetting some color, weave, or occasion selections.
              </p>
              <button
                onClick={handleClearAll}
                className="px-6 py-2.5 bg-burgundy text-gold-pale font-serif text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-gold hover:text-brown-dark transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* Expansive 4-column luxury grid on desktop, 3-col on medium, 2-col on tablet/mobile */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
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
                    className="bg-white p-4 sm:p-6 rounded-xs border border-gold/20 flex flex-col sm:flex-row gap-5 sm:gap-6 shadow-xs hover:border-gold/50 transition-all"
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

      {/* ========================================================
          RIGHT-SIDE SLIDE-IN FILTER DRAWER (Opened via FILTER button)
          ======================================================== */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
            />

            {/* Slide-out Drawer from RIGHT */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="filter-drawer-panel"
            >
              {/* Drawer Header */}
              <div className="filter-drawer-header">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-ivory/10 border border-gold/40 flex items-center justify-center text-gold">
                    <Filter className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold uppercase tracking-[0.16em] text-ivory flex items-center gap-2">
                      <span>Refine Collection</span>
                      {activeCount > 0 && (
                        <span className="toolbar-badge">
                          {activeCount}
                        </span>
                      )}
                    </h3>
                    <p className="text-[10px] text-gold-pale/70 font-sans tracking-wide">
                      {filterCounts.filtered} of {filterCounts.total} Handloom Sarees Available
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeCount > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="text-[11px] font-serif text-gold-pale hover:text-white hover:underline uppercase tracking-wider flex items-center gap-1 mr-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                  <button
                    onClick={() => setFilterDrawerOpen(false)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ivory/80 hover:text-white transition-colors"
                    aria-label="Close filter drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Filters Body */}
              <div className="filter-drawer-body">
                <FilterSortSidebar
                  filters={filters}
                  counts={filterCounts}
                  onCategoryToggle={handleCategoryToggle}
                  onCategorySelectAll={handleCategorySelectAll}
                  onPriceChange={handlePriceChange}
                  onColorToggle={handleColorToggle}
                  onFabricToggle={handleFabricToggle}
                  onOccasionToggle={handleOccasionToggle}
                  onAvailabilityChange={handleAvailabilityChange}
                  onClearAll={handleClearAll}
                  onApplyFilters={() => setFilterDrawerOpen(false)}
                  isDrawer={true}
                />
              </div>

              {/* Sticky Drawer Footer */}
              <div className="filter-drawer-footer">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="min-h-[44px] px-4 py-2.5 border border-gold/40 bg-white hover:bg-beige text-burgundy text-xs font-serif uppercase tracking-wider font-semibold rounded-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gold" />
                  <span>Reset All</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDrawerOpen(false)}
                  className="min-h-[44px] flex-1 py-2.5 px-4 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark rounded-xs font-serif text-xs uppercase tracking-[0.14em] font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-pale" />
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
