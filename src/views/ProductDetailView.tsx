import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SAREE_PRODUCTS } from '../data/sarees';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, Heart, ShoppingBag, ShieldCheck, Check, Sparkles, Truck, 
  RefreshCw, Ruler, Award, Share2, Info, ArrowRight, MapPin, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/product-detail.css';

export const ProductDetailView: React.FC = () => {
  const { selectedProduct, addToCart, toggleWishlist, isInWishlist, setCurrentView, addToast, setIsConciergeOpen } = useShop();

  if (!selectedProduct) {
    return (
      <div className="py-20 text-center bg-ivory">
        <p className="font-serif text-lg text-burgundy">No product selected.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 px-6 py-2 bg-burgundy text-gold-pale text-xs uppercase tracking-wider font-serif"
        >
          Explore Boutique
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(selectedProduct.id);
  const [activeImage, setActiveImage] = useState(selectedProduct.primaryImage);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'craft' | 'specs' | 'care' | 'shipping'>('craft');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const images = [
    selectedProduct.primaryImage,
    selectedProduct.secondaryImage,
    ...selectedProduct.galleryImages
  ];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setCurrentView('checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Available! Express insured delivery to PIN ${pincode} by Wednesday.`);
      addToast('Delivery Confirmed', `Insured tamper-proof delivery available to PIN ${pincode}.`, 'success');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProduct.name,
        text: `Look at this exquisite ${selectedProduct.name} at M. Siva-Tex:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  // Related Sarees
  const relatedSarees = SAREE_PRODUCTS.filter(
    p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.zari === selectedProduct.zari)
  ).slice(0, 4);

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-brown-deep/60 mb-8">
          <button onClick={() => setCurrentView('home')} className="hover:text-burgundy">Home</button>
          <span>/</span>
          <button onClick={() => setCurrentView('shop')} className="hover:text-burgundy">Sarees</button>
          <span>/</span>
          <span className="text-gold font-bold">{selectedProduct.category}</span>
          <span>/</span>
          <span className="truncate max-w-[200px] text-brown-deep">{selectedProduct.name}</span>
        </div>

        {/* Main Product Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left: Gallery (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails Strip */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0 md:max-h-[640px] scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xs overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === img
                      ? 'border-gold shadow-sm scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100 hover:border-gold/30'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Hero Viewer */}
            <div className="flex-1 relative aspect-[3/4] max-h-[720px] rounded-sm overflow-hidden bg-beige/40 shadow-luxury group">
              <img
                src={activeImage}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-crosshair"
              />

              {/* Silk Mark Seal Badge on Top Right */}
              <div className="absolute top-4 right-4 bg-ivory/90 border border-gold/40 px-3 py-1 rounded-sm shadow-sm flex items-center gap-1.5 backdrop-blur-xs">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span className="text-[10px] font-serif uppercase tracking-wider text-burgundy font-bold">
                  100% Pure Silk Certified
                </span>
              </div>

              {/* Category Pill on Top Left */}
              <div className="absolute top-4 left-4 bg-burgundy/90 text-gold-pale px-3 py-1 rounded-sm text-[10px] font-serif uppercase tracking-widest">
                {selectedProduct.category}
              </div>
            </div>
          </div>

          {/* Right: Product Story, Specs & Actions (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Origin & Weave Tag */}
              <div className="flex items-center justify-between text-xs text-gold font-serif uppercase tracking-wider mb-2">
                <span>{selectedProduct.origin}</span>
                <span className="text-emerald-800 font-semibold">• In Stock (Ready to Dispatch)</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-burgundy leading-tight mb-3">
                {selectedProduct.name}
              </h1>

              {/* Star Rating & Reviews */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-current text-amber-500' : 'text-amber-200'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-brown-deep/80 font-medium">
                  {selectedProduct.rating} ({selectedProduct.reviewCount} customer reviews)
                </span>
                <span className="text-brown-deep/40">•</span>
                <button
                  onClick={handleShare}
                  className="text-xs text-burgundy hover:text-gold flex items-center gap-1 font-serif underline"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Share</span>
                </button>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mb-6 p-4 bg-beige/30 border border-gold/20 rounded-sm">
                <div>
                  <span className="text-xs text-brown-deep/60 block font-serif uppercase tracking-wider">
                    Bespoke Handloom Price
                  </span>
                  <div className="flex items-baseline gap-3 mt-0.5">
                    <span className="font-serif text-3xl font-bold text-burgundy">
                      ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-sm text-brown-deep/50 line-through">
                        ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                {selectedProduct.discountPercent > 0 && (
                  <span className="ml-auto bg-wine text-ivory text-xs px-2.5 py-1 rounded-sm font-medium">
                    Save {selectedProduct.discountPercent}%
                  </span>
                )}
              </div>

              {/* Quick Specification Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs mb-6">
                <div className="p-2.5 bg-white border border-gold/20 rounded-xs">
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Fabric</span>
                  <span className="font-semibold text-burgundy">{selectedProduct.fabric}</span>
                </div>
                <div className="p-2.5 bg-white border border-gold/20 rounded-xs">
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Zari Authenticity</span>
                  <span className="font-semibold text-burgundy">{selectedProduct.zari}</span>
                </div>
                <div className="p-2.5 bg-white border border-gold/20 rounded-xs">
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Weave Technique</span>
                  <span className="font-semibold text-burgundy">{selectedProduct.weave}</span>
                </div>
                <div className="p-2.5 bg-white border border-gold/20 rounded-xs">
                  <span className="text-brown-deep/60 block text-[10px] uppercase font-serif">Total Length</span>
                  <span className="font-semibold text-burgundy">{selectedProduct.sareeLength} + {selectedProduct.blouseLength}</span>
                </div>
              </div>

              {/* Pincode Delivery Estimator */}
              <div className="mb-6 p-3.5 bg-beige/25 border border-gold/20 rounded-sm">
                <span className="text-[11px] font-serif uppercase tracking-wider text-burgundy font-semibold flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>Check Delivery & Express Courier</span>
                </span>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Indian PIN (e.g. 600001)"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-gold/30 rounded-xs focus:outline-none focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark text-xs font-serif uppercase tracking-wider font-semibold rounded-xs transition-colors shrink-0"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className={`text-[11px] mt-2 font-medium ${pincodeStatus.startsWith('Available') ? 'text-emerald-800' : 'text-wine'}`}>
                    {pincodeStatus}
                  </p>
                )}
              </div>

              {/* Action Buttons: Quantity, Add to Bag, Buy Now */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-gold/40 rounded-sm bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-sm hover:text-gold transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-bold font-sans">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-sm hover:text-gold transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-luxury"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-3.5 rounded-sm border transition-colors ${
                      inWishlist
                        ? 'border-wine bg-wine text-ivory'
                        : 'border-gold/40 text-burgundy hover:border-burgundy bg-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-gold hover:bg-gold-light text-brown-dark font-serif text-xs uppercase tracking-[0.2em] font-bold rounded-sm transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>Buy Now — Instant Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Virtual Video Salon CTA */}
                <button
                  onClick={() => setIsConciergeOpen(true)}
                  className="w-full py-2.5 border border-gold/40 text-burgundy hover:bg-beige/50 font-serif text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Book 1-on-1 Live Video Drape Session</span>
                </button>
              </div>
            </div>

            {/* Reassurance Strip */}
            <div className="pt-4 border-t border-gold/20 grid grid-cols-3 gap-2 text-center text-[10px] text-brown-deep/70 font-serif">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-gold mb-1" />
                <span>Insured Express Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-gold mb-1" />
                <span>Silk Mark Authenticity</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-gold mb-1" />
                <span>7-Day Return Policy</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs: Craft Story, Specs, Care, Shipping */}
        <div className="mt-16 sm:mt-24 border-t border-gold/20 pt-10">
          <div className="flex border-b border-gold/20 gap-4 sm:gap-8 overflow-x-auto">
            {[
              { id: 'craft', label: 'Weaving & Craft Story' },
              { id: 'specs', label: 'Saree & Blouse Specs' },
              { id: 'care', label: 'Care & Storage Guide' },
              { id: 'shipping', label: 'Shipping & Returns' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 font-serif text-xs sm:text-sm uppercase tracking-wider transition-all whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-burgundy font-bold border-b-2 border-gold'
                    : 'text-brown-deep/60 hover:text-burgundy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8 text-sm text-brown-deep/80 leading-relaxed font-light max-w-4xl">
            {activeTab === 'craft' && (
              <div className="space-y-4">
                <h4 className="font-serif text-base font-semibold text-burgundy">
                  Master Artisan's Story
                </h4>
                <p>{selectedProduct.craftStory}</p>
                <p>{selectedProduct.description}</p>
                <div className="bg-beige/30 p-4 border-l-2 border-gold rounded-r-sm text-xs mt-4">
                  <p className="font-serif font-semibold text-burgundy">Handloom Mark of Distinction:</p>
                  <p className="text-brown-deep/70 mt-1">
                    Every motif is woven on slow-moving traditional wooden pit looms. The subtle organic variations in weave tension reflect the hand of the weaver and celebrate true non-mechanized heritage.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h4 className="font-serif text-base font-semibold text-burgundy">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex justify-between py-2 border-b border-gold/15">
                    <span className="font-semibold text-burgundy">Product Code:</span>
                    <span>{selectedProduct.id.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gold/15">
                    <span className="font-semibold text-burgundy">Saree Length:</span>
                    <span>{selectedProduct.sareeLength}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gold/15">
                    <span className="font-semibold text-burgundy">Blouse Piece Length:</span>
                    <span>{selectedProduct.blouseLength}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gold/15">
                    <span className="font-semibold text-burgundy">Blouse Details:</span>
                    <span>{selectedProduct.blouseType}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gold/15">
                    <span className="font-semibold text-burgundy">Approximate Weight:</span>
                    <span>{selectedProduct.weight}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gold/15">
                    <span className="font-semibold text-burgundy">Silk Mark No:</span>
                    <span>SMI-KPM-9281-AUTH</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4">
                <h4 className="font-serif text-base font-semibold text-burgundy">
                  Preserving Your Heirloom Silk
                </h4>
                <ul className="space-y-2.5 text-xs list-disc pl-5 text-brown-deep/80">
                  {selectedProduct.careInstructions.map((instruction, i) => (
                    <li key={i} className="leading-relaxed">{instruction}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <h4 className="font-serif text-base font-semibold text-burgundy">
                  Insured Delivery & Doorstep Returns
                </h4>
                <div className="space-y-2 text-xs">
                  <p><strong>Pan-India Shipping:</strong> Delivered in 3-5 business days via BlueDart Insured Air Express. Every saree is packed in a signature velvet-lined M. Siva-Tex keepsake box.</p>
                  <p><strong>Worldwide Delivery:</strong> We ship to the USA, UK, Canada, UAE, Singapore, and Australia via DHL Express (5-7 business days).</p>
                  <p><strong>7-Day Returns:</strong> If you are not completely satisfied with the color or drape, request a doorstep pickup within 7 days of delivery with original tags and Silk Mark intact.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Sarees Recommendation */}
        {relatedSarees.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gold/20">
            <div className="text-center mb-10">
              <span className="text-gold font-serif text-xs uppercase tracking-[0.25em]">You May Also Cherish</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-burgundy mt-1">Complementary Weaves</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSarees.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

