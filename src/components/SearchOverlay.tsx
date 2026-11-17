import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SAREE_PRODUCTS } from '../data/sarees';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/modals.css';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductDetail, setSelectedCategoryFilter, setCurrentView } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  // Quick tags
  const popularTags = [
    'Kanchipuram Silk',
    'Banarasi Silk',
    'Bridal Silk',
    'Soft Silk',
    'Pure Gold Zari',
    'Kadwa Weave',
    'Royal Purple',
    'Emerald Green'
  ];

  const searchResults = searchTerm.trim()
    ? SAREE_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.weave.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.occasion.some(occ => occ.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  useEffect(() => {
    if (!isSearchOpen) {
      setSearchTerm('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: any) => {
    setIsSearchOpen(false);
    openProductDetail(product);
  };

  const handleSelectTag = (tag: string) => {
    setSearchTerm(tag);
  };

  const handleViewAllFiltered = () => {
    setIsSearchOpen(false);
    setSelectedCategoryFilter(searchTerm);
    setCurrentView('shop');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-ivory text-brown-deep overflow-y-auto">
        
        {/* Top Header */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex items-center justify-between border-b border-gold/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-serif text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
              Search M. Siva-Tex Boutique
            </span>
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-brown-deep hover:text-burgundy transition-colors rounded-full hover:bg-beige"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-10 pb-6">
          <div className="relative border-b-2 border-gold pb-3 flex items-center gap-3">
            <Search className="w-6 h-6 text-gold shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by weave, motif, color or occasion (e.g. Kanchipuram, Korvai, Crimson)..."
              className="w-full font-serif text-lg sm:text-2xl bg-transparent placeholder-brown-deep/40 text-burgundy focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-brown-deep/40 hover:text-brown-deep p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Search Suggestions */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-serif uppercase tracking-wider text-brown-deep/60 mr-2">
              Popular Searches:
            </span>
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleSelectTag(tag)}
                className="px-3 py-1 bg-beige/50 hover:bg-gold hover:text-white border border-gold/20 text-xs font-serif rounded-full transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
          {searchTerm.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gold/15">
                <span className="font-serif text-sm text-burgundy">
                  Found <strong>{searchResults.length}</strong> matching handloom {searchResults.length === 1 ? 'saree' : 'sarees'}
                </span>
                {searchResults.length > 0 && (
                  <button
                    onClick={handleViewAllFiltered}
                    className="text-xs font-serif uppercase tracking-wider text-gold hover:text-burgundy flex items-center gap-1"
                  >
                    <span>View In Shop Grid</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {searchResults.length === 0 ? (
                <div className="text-center py-16 text-brown-deep/60">
                  <p className="font-serif text-lg text-burgundy">No sarees found matching "{searchTerm}"</p>
                  <p className="text-xs mt-1">Try searching for "Silk", "Banarasi", "Bridal", or "Organza"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="group cursor-pointer bg-white p-2.5 rounded-sm border border-gold/20 hover:border-gold shadow-xs hover:shadow-luxury transition-all"
                    >
                      <div className="aspect-[3/4] overflow-hidden rounded-xs bg-beige mb-2">
                        <img
                          src={product.primaryImage}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] text-gold font-serif uppercase tracking-wider block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-xs font-semibold text-burgundy line-clamp-1 group-hover:text-gold-dark mt-0.5">
                        {product.name}
                      </h4>
                      <p className="font-serif text-xs font-bold text-burgundy mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-brown-deep/50 font-serif italic text-sm">
              Begin typing to explore our pure handloom collections...
            </div>
          )}
        </div>

      </div>
    </AnimatePresence>
  );
};

