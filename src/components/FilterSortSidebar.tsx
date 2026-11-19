import React, { useState } from 'react';
import { 
  Filter, 
  ChevronDown, 
  RotateCcw, 
  Check, 
  SlidersHorizontal, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  fabrics: string[];
  occasions: string[];
  availability: 'all' | 'in_stock' | 'out_of_stock';
  sortBy: string;
}

export interface DynamicFilterCounts {
  categories: Record<string, number>;
  colors: Record<string, number>;
  fabrics: Record<string, number>;
  occasions: Record<string, number>;
  availability: {
    in_stock: number;
    out_of_stock: number;
  };
  total: number;
  filtered: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  border?: string;
  textColor?: string;
}

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'red', name: 'Red', hex: '#C41E3A', border: '#8B1E3F', textColor: '#FFFFFF' },
  { id: 'maroon', name: 'Maroon', hex: '#4D0007', border: '#360005', textColor: '#F5E6CC' },
  { id: 'green', name: 'Green', hex: '#1B4D3E', border: '#0F2E25', textColor: '#FFFFFF' },
  { id: 'blue', name: 'Blue', hex: '#0E4D64', border: '#082E3D', textColor: '#FFFFFF' },
  { id: 'pink', name: 'Pink', hex: '#E75480', border: '#B82E56', textColor: '#FFFFFF' },
  { id: 'black', name: 'Black', hex: '#1E1E1E', border: '#000000', textColor: '#FFFFFF' },
  { id: 'gold', name: 'Gold', hex: '#D4AF37', border: '#997F24', textColor: '#4D0007' },
  { id: 'cream', name: 'Cream', hex: '#FDFBF7', border: '#D4AF37', textColor: '#4D0007' },
  { id: 'purple', name: 'Purple', hex: '#481A36', border: '#2D0F21', textColor: '#FFFFFF' },
];

export const CATEGORY_OPTIONS = [
  { key: 'Kanchipuram Silk', label: 'Kanchipuram Silk Sarees' },
  { key: 'Banarasi Silk', label: 'Banarasi Silk Sarees' },
  { key: 'Soft Silk', label: 'Soft Silk Sarees' },
  { key: 'Cotton Sarees', label: 'Cotton Sarees' },
  { key: 'Georgette Sarees', label: 'Georgette Sarees' },
  { key: 'Chiffon Sarees', label: 'Chiffon Sarees' },
  { key: 'Organza Sarees', label: 'Organza Sarees' },
  { key: 'Bridal Silk', label: 'Bridal Silk Sarees' },
];

export const FABRIC_OPTIONS = [
  'Silk',
  'Cotton',
  'Georgette',
  'Chiffon',
  'Organza',
  'Tissue',
  'Crepe',
];

export const OCCASION_OPTIONS = [
  'Wedding',
  'Bridal',
  'Festive',
  'Party Wear',
  'Traditional',
  'Daily Wear',
];

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'best-selling', label: 'Best Selling' },
];

export const MIN_PRICE_BOUND = 1000;
export const MAX_PRICE_BOUND = 60000;

interface FilterSortSidebarProps {
  filters: FilterState;
  counts: DynamicFilterCounts;
  onCategoryToggle: (categoryKey: string) => void;
  onCategorySelectAll: () => void;
  onPriceChange: (range: [number, number]) => void;
  onColorToggle: (colorId: string) => void;
  onFabricToggle: (fabric: string) => void;
  onOccasionToggle: (occasion: string) => void;
  onAvailabilityChange: (val: 'all' | 'in_stock' | 'out_of_stock') => void;
  onSortChange: (sortVal: string) => void;
  onClearAll: () => void;
  onApplyFilters?: () => void;
  isMobileDrawer?: boolean;
}

export const FilterSortSidebar: React.FC<FilterSortSidebarProps> = ({
  filters,
  counts,
  onCategoryToggle,
  onCategorySelectAll,
  onPriceChange,
  onColorToggle,
  onFabricToggle,
  onOccasionToggle,
  onAvailabilityChange,
  onSortChange,
  onClearAll,
  onApplyFilters,
  isMobileDrawer = false,
}) => {
  // Collapsible Accordion states
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: true,
    price: true,
    color: true,
    fabric: true,
    occasion: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Local price input states for smooth typing
  const [minInput, setMinInput] = useState<string>(filters.priceRange[0].toString());
  const [maxInput, setMaxInput] = useState<string>(filters.priceRange[1].toString());

  // Sync inputs if external priceRange changes
  React.useEffect(() => {
    setMinInput(filters.priceRange[0].toString());
    setMaxInput(filters.priceRange[1].toString());
  }, [filters.priceRange]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setMinInput(val);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setMaxInput(val);
  };

  const handlePriceInputCommit = () => {
    const parsedMin = parseInt(minInput, 10) || MIN_PRICE_BOUND;
    const parsedMax = parseInt(maxInput, 10) || MAX_PRICE_BOUND;

    const clampedMin = Math.max(MIN_PRICE_BOUND, Math.min(parsedMin, MAX_PRICE_BOUND));
    const clampedMax = Math.max(clampedMin, Math.min(parsedMax, MAX_PRICE_BOUND));

    setMinInput(clampedMin.toString());
    setMaxInput(clampedMax.toString());
    onPriceChange([clampedMin, clampedMax]);
  };

  const handleMinSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), filters.priceRange[1] - 1000);
    onPriceChange([newMin, filters.priceRange[1]]);
  };

  const handleMaxSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), filters.priceRange[0] + 1000);
    onPriceChange([filters.priceRange[0], newMax]);
  };

  const setPricePreset = (min: number, max: number) => {
    onPriceChange([min, max]);
  };

  // Calculate active filter count
  const activeCount = 
    filters.categories.length +
    (filters.priceRange[0] > MIN_PRICE_BOUND || filters.priceRange[1] < MAX_PRICE_BOUND ? 1 : 0) +
    filters.colors.length +
    filters.fabrics.length +
    filters.occasions.length +
    (filters.availability !== 'all' ? 1 : 0);

  const isAllCategoriesSelected = filters.categories.length === 0;

  // Slider progress percentages
  const minPercent = ((filters.priceRange[0] - MIN_PRICE_BOUND) / (MAX_PRICE_BOUND - MIN_PRICE_BOUND)) * 100;
  const maxPercent = ((filters.priceRange[1] - MIN_PRICE_BOUND) / (MAX_PRICE_BOUND - MIN_PRICE_BOUND)) * 100;

  return (
    <aside 
      className={`luxury-unified-filter-container ${isMobileDrawer ? 'mobile-drawer-view' : ''}`}
      aria-label="Collection Filters and Sorting"
    >
      {/* 1. Header: Filter Icon + REFINE COLLECTION */}
      <div className="filter-header-bar">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-burgundy/5 border border-gold/40 flex items-center justify-center text-gold">
            <Filter className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-serif text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-burgundy flex items-center gap-2">
              <span>Refine Collection</span>
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-sans font-semibold rounded-full bg-burgundy text-gold-pale">
                  {activeCount}
                </span>
              )}
            </h2>
            <p className="text-[10px] text-brown-deep/60 font-sans tracking-wide">
              {counts.filtered} of {counts.total} Handloom Sarees
            </p>
          </div>
        </div>

        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="text-[11px] font-serif text-wine hover:text-burgundy hover:underline tracking-wider uppercase flex items-center gap-1 transition-colors min-h-[36px] px-1"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="filter-divider" />

      {/* 2. Sort By Section (Integrated inside SAME container) */}
      <div className="filter-section-block">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="filter-sort-select" className="font-serif text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy flex items-center gap-1.5">
            <ArrowUpDown className="w-3 h-3 text-gold" />
            <span>Sort By</span>
          </label>
          <span className="text-[10px] font-sans text-brown-deep/50 uppercase tracking-wider">
            Reorder Grid
          </span>
        </div>

        <div className="relative">
          <select
            id="filter-sort-select"
            value={filters.sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full appearance-none min-h-[42px] bg-white border border-gold/35 hover:border-gold focus:border-gold focus:ring-1 focus:ring-gold/40 rounded-xs pl-3.5 pr-9 py-2 text-xs font-serif text-burgundy tracking-wide cursor-pointer transition-colors shadow-xs"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-gold absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform" />
        </div>
      </div>

      <div className="filter-divider" />

      {/* 3. Saree Weave / Category (Collapsible Accordion) */}
      <div className="filter-accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="filter-accordion-header"
          aria-expanded={openSections.category}
        >
          <span className="filter-accordion-title">
            <span>Saree Weave / Category</span>
            {filters.categories.length > 0 && (
              <span className="filter-active-chip">
                {filters.categories.length} selected
              </span>
            )}
          </span>
          <ChevronDown 
            className={`w-3.5 h-3.5 text-gold transition-transform duration-250 ${
              openSections.category ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="filter-accordion-body space-y-1 pt-1">
                {/* All Collections button */}
                <button
                  type="button"
                  onClick={onCategorySelectAll}
                  className={`category-item-row ${isAllCategoriesSelected ? 'category-item-active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      isAllCategoriesSelected 
                        ? 'border-gold bg-gold text-burgundy' 
                        : 'border-gold/40 bg-white/70'
                    }`}>
                      {isAllCategoriesSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span className="font-serif text-xs">All Collections</span>
                  </span>
                  <span className="category-item-count">{counts.total}</span>
                </button>

                {/* 8 Saree Categories */}
                {CATEGORY_OPTIONS.map(cat => {
                  const isSelected = filters.categories.includes(cat.key);
                  const count = counts.categories[cat.key] || 0;

                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => onCategoryToggle(cat.key)}
                      className={`category-item-row ${isSelected ? 'category-item-active' : ''}`}
                    >
                      <span className="flex items-center gap-2 text-left">
                        <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'border-gold bg-burgundy text-gold-pale' 
                            : 'border-gold/40 bg-white'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span className="font-serif text-xs">{cat.label}</span>
                      </span>
                      <span className="category-item-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="filter-divider" />

      {/* 4. Price Range (Collapsible Accordion) */}
      <div className="filter-accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="filter-accordion-header"
          aria-expanded={openSections.price}
        >
          <span className="filter-accordion-title">
            <span>Price Range</span>
            {(filters.priceRange[0] > MIN_PRICE_BOUND || filters.priceRange[1] < MAX_PRICE_BOUND) && (
              <span className="filter-active-chip">
                ₹{(filters.priceRange[0] / 1000).toFixed(0)}k - ₹{(filters.priceRange[1] / 1000).toFixed(0)}k
              </span>
            )}
          </span>
          <ChevronDown 
            className={`w-3.5 h-3.5 text-gold transition-transform duration-250 ${
              openSections.price ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="filter-accordion-body pt-2 space-y-4">
                
                {/* Dynamic Price Display */}
                <div className="flex items-center justify-between text-xs font-serif text-burgundy bg-white/70 border border-gold/25 p-2 rounded-xs">
                  <span className="text-[11px] text-brown-deep/60 uppercase tracking-wider font-sans">
                    Current Range
                  </span>
                  <span className="font-bold text-burgundy tracking-wide">
                    ₹{filters.priceRange[0].toLocaleString('en-IN')} – ₹{filters.priceRange[1].toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Dual Range Slider Component */}
                <div className="relative pt-4 pb-2 px-1">
                  {/* Background Track */}
                  <div className="h-1.5 w-full bg-gold/20 rounded-full relative">
                    {/* Active Golden Bar */}
                    <div 
                      className="absolute h-1.5 bg-burgundy rounded-full"
                      style={{ 
                        left: `${minPercent}%`, 
                        right: `${100 - maxPercent}%` 
                      }} 
                    />
                  </div>

                  {/* Range Thumbs */}
                  <input
                    type="range"
                    min={MIN_PRICE_BOUND}
                    max={MAX_PRICE_BOUND}
                    step={500}
                    value={filters.priceRange[0]}
                    onChange={handleMinSliderChange}
                    className="absolute inset-0 w-full h-1.5 appearance-none bg-transparent pointer-events-none custom-range-slider"
                    aria-label="Minimum Price Slider"
                  />
                  <input
                    type="range"
                    min={MIN_PRICE_BOUND}
                    max={MAX_PRICE_BOUND}
                    step={500}
                    value={filters.priceRange[1]}
                    onChange={handleMaxSliderChange}
                    className="absolute inset-0 w-full h-1.5 appearance-none bg-transparent pointer-events-none custom-range-slider"
                    aria-label="Maximum Price Slider"
                  />
                </div>

                {/* Editable Min/Max Input Boxes */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div>
                    <label className="block text-[10px] font-serif uppercase tracking-wider text-brown-deep/60 mb-1">
                      Min (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gold text-xs font-serif">
                        ₹
                      </span>
                      <input
                        type="text"
                        value={minInput}
                        onChange={handleMinInputChange}
                        onBlur={handlePriceInputCommit}
                        onKeyDown={(e) => e.key === 'Enter' && handlePriceInputCommit()}
                        className="w-full bg-white border border-gold/30 hover:border-gold focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-xs pl-6 pr-2 py-1.5 text-xs font-serif text-burgundy shadow-xs"
                        placeholder="1,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-serif uppercase tracking-wider text-brown-deep/60 mb-1">
                      Max (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gold text-xs font-serif">
                        ₹
                      </span>
                      <input
                        type="text"
                        value={maxInput}
                        onChange={handleMaxInputChange}
                        onBlur={handlePriceInputCommit}
                        onKeyDown={(e) => e.key === 'Enter' && handlePriceInputCommit()}
                        className="w-full bg-white border border-gold/30 hover:border-gold focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-xs pl-6 pr-2 py-1.5 text-xs font-serif text-burgundy shadow-xs"
                        placeholder="60,000"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Price Preset Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setPricePreset(MIN_PRICE_BOUND, 20000)}
                    className="px-2 py-1 bg-white hover:bg-beige border border-gold/30 rounded-xs text-[10px] font-serif text-brown-deep hover:text-burgundy transition-colors"
                  >
                    Under ₹20,000
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricePreset(20000, 35000)}
                    className="px-2 py-1 bg-white hover:bg-beige border border-gold/30 rounded-xs text-[10px] font-serif text-brown-deep hover:text-burgundy transition-colors"
                  >
                    ₹20k – ₹35k
                  </button>
                  <button
                    type="button"
                    onClick={() => setPricePreset(35000, MAX_PRICE_BOUND)}
                    className="px-2 py-1 bg-white hover:bg-beige border border-gold/30 rounded-xs text-[10px] font-serif text-brown-deep hover:text-burgundy transition-colors"
                  >
                    Above ₹35,000
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="filter-divider" />

      {/* 5. Colour (Collapsible Accordion with Interactive Swatches) */}
      <div className="filter-accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('color')}
          className="filter-accordion-header"
          aria-expanded={openSections.color}
        >
          <span className="filter-accordion-title">
            <span>Colour</span>
            {filters.colors.length > 0 && (
              <span className="filter-active-chip">
                {filters.colors.length} selected
              </span>
            )}
          </span>
          <ChevronDown 
            className={`w-3.5 h-3.5 text-gold transition-transform duration-250 ${
              openSections.color ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.color && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="filter-accordion-body pt-2">
                <div className="grid grid-cols-3 gap-2">
                  {COLOR_OPTIONS.map(c => {
                    const isSelected = filters.colors.includes(c.id);
                    const count = counts.colors[c.id] || 0;

                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => onColorToggle(c.id)}
                        className={`color-swatch-item flex items-center gap-1.5 p-1.5 rounded-xs border transition-all text-left ${
                          isSelected 
                            ? 'bg-burgundy/10 border-burgundy shadow-xs' 
                            : 'bg-white/60 border-gold/25 hover:border-gold hover:bg-white'
                        }`}
                        title={`${c.name} (${count} sarees)`}
                      >
                        <span 
                          className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center shadow-xs transition-transform relative"
                          style={{ 
                            backgroundColor: c.hex,
                            border: `1px solid ${c.border || 'rgba(0,0,0,0.15)'}` 
                          }}
                        >
                          {isSelected && (
                            <Check 
                              className="w-3 h-3 stroke-[3]"
                              style={{ color: c.textColor || '#FFFFFF' }} 
                            />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-serif text-brown-deep truncate font-medium">
                            {c.name}
                          </p>
                          <p className="text-[9px] font-sans text-brown-deep/50 leading-none">
                            ({count})
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="filter-divider" />

      {/* 6. Fabric (Collapsible Accordion with Luxury Checkboxes) */}
      <div className="filter-accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('fabric')}
          className="filter-accordion-header"
          aria-expanded={openSections.fabric}
        >
          <span className="filter-accordion-title">
            <span>Fabric</span>
            {filters.fabrics.length > 0 && (
              <span className="filter-active-chip">
                {filters.fabrics.length} selected
              </span>
            )}
          </span>
          <ChevronDown 
            className={`w-3.5 h-3.5 text-gold transition-transform duration-250 ${
              openSections.fabric ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.fabric && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="filter-accordion-body pt-1 space-y-1">
                {FABRIC_OPTIONS.map(fabric => {
                  const isSelected = filters.fabrics.includes(fabric);
                  const count = counts.fabrics[fabric] || 0;

                  return (
                    <button
                      key={fabric}
                      type="button"
                      onClick={() => onFabricToggle(fabric)}
                      className={`luxury-checkbox-row ${isSelected ? 'row-active' : ''}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-burgundy border-burgundy text-gold-pale' 
                            : 'border-gold/40 bg-white'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span className="font-serif text-xs text-brown-deep">{fabric}</span>
                      </span>
                      <span className="text-[10px] font-sans text-brown-deep/50">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="filter-divider" />

      {/* 7. Occasion (Collapsible Accordion with Luxury Checkboxes) */}
      <div className="filter-accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('occasion')}
          className="filter-accordion-header"
          aria-expanded={openSections.occasion}
        >
          <span className="filter-accordion-title">
            <span>Occasion</span>
            {filters.occasions.length > 0 && (
              <span className="filter-active-chip">
                {filters.occasions.length} selected
              </span>
            )}
          </span>
          <ChevronDown 
            className={`w-3.5 h-3.5 text-gold transition-transform duration-250 ${
              openSections.occasion ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.occasion && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="filter-accordion-body pt-1 space-y-1">
                {OCCASION_OPTIONS.map(occ => {
                  const isSelected = filters.occasions.includes(occ);
                  const count = counts.occasions[occ] || 0;

                  return (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => onOccasionToggle(occ)}
                      className={`luxury-checkbox-row ${isSelected ? 'row-active' : ''}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center transition-colors ${
                          isSelected 
                            ? 'bg-burgundy border-burgundy text-gold-pale' 
                            : 'border-gold/40 bg-white'
                        }`}>
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                        <span className="font-serif text-xs text-brown-deep">{occ}</span>
                      </span>
                      <span className="text-[10px] font-sans text-brown-deep/50">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="filter-divider" />

      {/* 8. Availability (Collapsible Accordion) */}
      <div className="filter-accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('availability')}
          className="filter-accordion-header"
          aria-expanded={openSections.availability}
        >
          <span className="filter-accordion-title">
            <span>Availability</span>
            {filters.availability !== 'all' && (
              <span className="filter-active-chip">
                {filters.availability === 'in_stock' ? 'In Stock' : 'Out of Stock'}
              </span>
            )}
          </span>
          <ChevronDown 
            className={`w-3.5 h-3.5 text-gold transition-transform duration-250 ${
              openSections.availability ? 'rotate-180' : ''
            }`} 
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.availability && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="filter-accordion-body pt-1 space-y-1">
                <button
                  type="button"
                  onClick={() => onAvailabilityChange(filters.availability === 'in_stock' ? 'all' : 'in_stock')}
                  className={`luxury-checkbox-row ${filters.availability === 'in_stock' ? 'row-active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      filters.availability === 'in_stock' 
                        ? 'border-emerald-600 bg-emerald-600 text-white' 
                        : 'border-gold/40 bg-white'
                    }`}>
                      {filters.availability === 'in_stock' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span className="font-serif text-xs text-brown-deep">In Stock</span>
                  </span>
                  <span className="text-[10px] font-sans text-brown-deep/50">
                    {counts.availability.in_stock}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onAvailabilityChange(filters.availability === 'out_of_stock' ? 'all' : 'out_of_stock')}
                  className={`luxury-checkbox-row ${filters.availability === 'out_of_stock' ? 'row-active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      filters.availability === 'out_of_stock' 
                        ? 'border-burgundy bg-burgundy text-gold-pale' 
                        : 'border-gold/40 bg-white'
                    }`}>
                      {filters.availability === 'out_of_stock' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span className="font-serif text-xs text-brown-deep">Out of Stock</span>
                  </span>
                  <span className="text-[10px] font-sans text-brown-deep/50">
                    {counts.availability.out_of_stock}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="filter-divider" />

      {/* 9 & 10. Clear All & Apply Action Buttons inside container */}
      <div className="filter-action-group pt-2 space-y-2">
        <button
          type="button"
          onClick={onApplyFilters}
          className="w-full min-h-[44px] py-2.5 px-4 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark rounded-xs font-serif text-xs uppercase tracking-[0.15em] font-semibold transition-all duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-pale" />
          <span>Apply Filters ({counts.filtered})</span>
        </button>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="w-full min-h-[38px] py-2 px-3 bg-white hover:bg-beige/60 border border-gold/40 text-burgundy rounded-xs font-serif text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3 text-gold" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>

    </aside>
  );
};
