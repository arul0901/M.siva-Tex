import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SAREE_PRODUCTS, CUSTOMER_REVIEWS } from '../data/sarees';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, Heart, ShoppingBag, ShieldCheck, Check, Sparkles, Truck, 
  RefreshCw, Award, Share2, MapPin, ChevronLeft, ChevronRight,
  Clock, Gift, Zap, Phone, MessageCircle, Mail, AlertCircle, X,
  ArrowRight, CheckCircle2, Eye, Package, Lock, ThumbsUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/product-detail.css';

export const ProductDetailView: React.FC = () => {
  const { 
    selectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setCurrentView, 
    addToast, 
    setIsConciergeOpen 
  } = useShop();

  // Fallback to flagship product if none selected
  const product = selectedProduct || SAREE_PRODUCTS[0];
  const inWishlist = isInWishlist(product.id);

  // Gallery state
  const images = [
    product.primaryImage,
    product.secondaryImage,
    ...(product.galleryImages || [])
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Purchase options state
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('600001');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(
    'Available! Express delivery by Monday • Free Shipping • COD Available'
  );

  // Scarcity Live Viewers ticker (fluctuates realistically between 145 and 188)
  const [liveViewers, setLiveViewers] = useState(161);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => Math.floor(145 + Math.random() * 40));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Prepaid Offer Countdown Timer (counts down from 9:42)
  const [timeLeft, setTimeLeft] = useState(582); // 9 minutes 42 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 580));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Dynamic Dates for Delivery Timeline
  const today = new Date();
  const formatShortDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const datePurchased = formatShortDate(today);
  const dateProcessing1 = formatShortDate(today);
  const dateProcessing2 = formatShortDate(new Date(today.getTime() + 86400000));
  const dateDelivery1 = formatShortDate(new Date(today.getTime() + 4 * 86400000));
  const dateDelivery2 = formatShortDate(new Date(today.getTime() + 5 * 86400000));

  // Accordions open/close state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    exchange: false,
    shipping: false,
    care: false,
    seller: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Review Form Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  // Frequently Bought Together Bundle state
  const [bundleIncludeClutch, setBundleIncludeClutch] = useState(true);
  const [bundleIncludePetticoat, setBundleIncludePetticoat] = useState(true);

  const clutchPrice = 699;
  const petticoatPrice = 450;
  const bundleTotalPrice = product.price + 
    (bundleIncludeClutch ? clutchPrice : 0) + 
    (bundleIncludePetticoat ? petticoatPrice : 0);
  const bundleDiscountedPrice = Math.round(bundleTotalPrice * 0.85); // 15% bundle discount

  // Handlers
  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast('Added to Cart', `${product.name} (x${quantity}) has been added to your shopping bag.`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentView('checkout');
  };

  const handleAddBundleToCart = () => {
    addToCart(product, 1);
    addToast('Bundle Added', 'Saree & matching heirloom accessories added with 15% bundle privilege.', 'success');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Available! Express courier delivery to PIN ${pincode} by ${dateDelivery1} • Cash on Delivery available.`);
      addToast('PIN Code Verified', `Express delivery confirmed for PIN ${pincode}.`, 'success');
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this exquisite ${product.name} at Vrindavan Fashion / M. Siva-Tex:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;
    setIsReviewModalOpen(false);
    addToast('Review Submitted', 'Thank you! Your verified review will appear after quality approval.', 'success');
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  const mobileScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToMobileImage = (index: number) => {
    setActiveImageIndex(index);
    if (mobileScrollRef.current) {
      const clientWidth = mobileScrollRef.current.clientWidth;
      mobileScrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, clientWidth } = mobileScrollRef.current;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex >= 0 && newIndex < images.length && newIndex !== activeImageIndex) {
        setActiveImageIndex(newIndex);
      }
    }
  };

  // Next / Prev Gallery Navigation
  const prevImage = () => {
    const newIdx = activeImageIndex === 0 ? images.length - 1 : activeImageIndex - 1;
    scrollToMobileImage(newIdx);
  };

  const nextImage = () => {
    const newIdx = activeImageIndex === images.length - 1 ? 0 : activeImageIndex + 1;
    scrollToMobileImage(newIdx);
  };

  // Reset scroll on product change
  useEffect(() => {
    setActiveImageIndex(0);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollLeft = 0;
    }
  }, [product.id]);

  // Related Products: 8 items for 2-row mobile scroll & 4-card desktop grid
  const relatedSarees = SAREE_PRODUCTS.filter(p => p.id !== product.id).slice(0, 8);

  // Reviews for this product
  const reviewsList = [
    {
      id: 'vrin-rev-1',
      author: 'Gayatri Rao',
      location: 'Hyderabad, Telangana',
      rating: 5,
      date: '2 days ago',
      title: 'Stunning golden glow! Worth every single rupee',
      comment: 'The Swarna Kumkum color contrast is absolutely divine in person. The golden zari woven border has heavy traditional temple work, and the kumkum pink pallu drapes so gracefully. The unstitched blouse piece matched perfectly.',
      verified: true,
      image: 'https://cdn.shopify.com/s/files/1/0734/1988/2750/files/IMG_0317.jpg?v=1766815298'
    },
    {
      id: 'vrin-rev-2',
      author: 'Sowmya Iyer',
      location: 'Chennai, Tamil Nadu',
      rating: 5,
      date: '5 days ago',
      title: 'Prepaid order arrived in 3 days with surprise gift!',
      comment: 'Super fast delivery via BlueDart. Took the prepaid option to get the extra ₹100 discount, and was delighted to find a cute golden zari clutch gift inside! Saree is pure traditional silk with high sheen.',
      verified: true,
      image: 'https://cdn.shopify.com/s/files/1/0734/1988/2750/files/aiease_1766814843468.jpg?v=1766815221'
    },
    {
      id: 'vrin-rev-3',
      author: 'Kavitha Nair',
      location: 'Kochi, Kerala',
      rating: 5,
      date: '1 week ago',
      title: 'Wore it for my sister’s engagement — endless compliments',
      comment: 'The saree is lightweight yet looks regal like an expensive 10k Kanchipuram. The fabric has a natural silk luster and doesn’t puff up while pleating. Definitely ordering another color for Diwali.',
      verified: true,
      image: 'https://cdn.shopify.com/s/files/1/0734/1988/2750/files/IMG_0316.jpg?v=1766815221'
    },
    {
      id: 'vrin-rev-4',
      author: 'Deepa Balaji',
      location: 'Bangalore, Karnataka',
      rating: 5,
      date: '2 weeks ago',
      title: '100% authentic zari work and vibrant kumkum hue',
      comment: 'Extremely satisfied with the purchase! The border weaving is dense and clean with no rough thread ends. Packaging was very neat and secure.',
      verified: true,
      image: 'https://cdn.shopify.com/s/files/1/0734/1988/2750/files/IMG_0321.jpg?v=1766815221'
    }
  ];

  return (
    <div className="pdp-page-wrapper pt-4 pb-20 sm:pt-6 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Breadcrumbs */}
        <nav className="pdp-breadcrumb mb-3 sm:mb-4" aria-label="Breadcrumb navigation">
          <button onClick={() => setCurrentView('home')}>Home</button>
          <span>/</span>
          <button onClick={() => setCurrentView('shop')}>Sarees</button>
          <span>/</span>
          <span className="text-gold font-semibold">{product.category}</span>
          <span>/</span>
          <span className="pdp-breadcrumb-active">{product.name}</span>
        </nav>

        {/* 2. Main Product Grid: 50-50 Layout (Left Gallery 50%, Right Product Info 50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-14 items-start">
          
          {/* Left Column: Media Gallery (50% width, sticky with tall luxury viewer) */}
          <div className="w-full flex flex-col lg:sticky lg:top-24 self-start">

            {/* Mobile View: Swipeable Horizontal Carousel (< md) */}
            <div className="md:hidden relative w-full overflow-hidden rounded-xs bg-[#F4EFEB] border border-gold/20 shadow-xs mb-3">
              <div
                ref={mobileScrollRef}
                onScroll={handleMobileScroll}
                className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth touch-pan-x"
              >
                {images.map((img, idx) => (
                  <div key={idx} className="min-w-full w-full aspect-[4/5] shrink-0 snap-center relative">
                    <img
                      src={img}
                      alt={`${product.name} drape photo ${idx + 1}`}
                      className="w-full h-full object-cover object-top cursor-zoom-in"
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsLightboxOpen(true);
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Discount Badge */}
              <div className="pdp-badge-discount">
                {product.discountPercent}% OFF
              </div>

              {/* Popular Badge */}
              <div className="pdp-badge-popular">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Most Popular</span>
              </div>

              {/* Mobile Navigation Arrows */}
              {images.length > 1 && (
                <div className="absolute inset-y-0 inset-x-0 flex items-center justify-between px-2.5 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="w-8 h-8 rounded-full bg-white/80 text-burgundy shadow-sm flex items-center justify-center pointer-events-auto backdrop-blur-xs hover:bg-white transition-all"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="w-8 h-8 rounded-full bg-white/80 text-burgundy shadow-sm flex items-center justify-center pointer-events-auto backdrop-blur-xs hover:bg-white transition-all"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Counter Tag */}
              <div className="pdp-photo-counter">
                {activeImageIndex + 1} / {images.length}
              </div>

              {/* Pagination Dots on Mobile */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeImageIndex === i
                        ? 'w-5 bg-white shadow-md'
                        : 'w-1.5 bg-white/60 backdrop-blur-xs'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop View: Thumbnails Strip + Tall Luxury Hero Viewer (md+) */}
            <div className="hidden md:flex pdp-gallery-container">
              {/* Thumbnails Strip */}
              <div className="pdp-thumbnails-strip scrollbar-none" aria-label="Product thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`pdp-thumbnail-btn ${activeImageIndex === idx ? 'is-active' : ''}`}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="pdp-thumbnail-img" />
                  </button>
                ))}
              </div>

              {/* Main Hero Viewer (Increased height to utilize vertical space) */}
              <div className="pdp-main-viewer group">
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="pdp-main-img"
                  onClick={() => setIsLightboxOpen(true)}
                />

                {/* Discount Badge */}
                <div className="pdp-badge-discount">
                  {product.discountPercent}% OFF
                </div>

                {/* Popular Badge */}
                <div className="pdp-badge-popular">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>Most Popular</span>
                </div>

                {/* Navigation Arrows */}
                <div className="pdp-viewer-arrows">
                  <button
                    onClick={prevImage}
                    className="pdp-nav-arrow"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="pdp-nav-arrow"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Counter Tag */}
                <div className="pdp-photo-counter">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Below Gallery Assurance Strip to utilize vertical space */}
            <div className="pdp-gallery-footer mt-3.5 hidden sm:flex items-center justify-between py-2.5 px-3.5 bg-white/80 rounded-xs border border-gold/20 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-xs font-secondary font-semibold text-burgundy">Silk Mark Certified Authenticity</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-secondary text-[#78635B]">
                <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>Handloom Fall & Pico Finished</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Engine (50% width) */}
          <div className="w-full flex flex-col max-w-[500px]">
            <div>
              {/* Origin & In-Stock Line */}
              <div className="flex items-center justify-between text-[11px] font-secondary uppercase tracking-[0.12em] text-[#8C6D62] pb-1 border-b border-[#D4AF37]/15 mb-2">
                <span>{product.origin || 'HANDCRAFTED IN KANCHIPURAM, TAMIL NADU'}</span>
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold normal-case tracking-normal">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  In Stock (Ready to Dispatch)
                </span>
              </div>

              {/* Brand / Vendor Label */}
              <span className="pdp-vendor-pill mb-1">
                VRINDAVAN FASHION • M. SIVA-TEX
              </span>

              {/* Product Title */}
              <h1 className="pdp-product-title text-xl sm:text-2xl font-semibold mb-1.5">
                {product.name}
              </h1>

              {/* Rating & Review Link + Share */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="pdp-stars-group">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[#4D0007]">{product.rating}</span>
                  <a 
                    href="#customer-reviews" 
                    className="pdp-review-link text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('customer-reviews')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    ({product.reviewCount} customer reviews)
                  </a>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-[#7A6560] hover:text-[#4D0007] transition-colors"
                  title="Share this saree"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="underline">Share</span>
                </button>
              </div>

              {/* Price Row */}
              <div className="pdp-price-row mb-0.5">
                <span className="text-xs text-brown-deep/60 uppercase font-secondary mr-1">Sale price</span>
                <span className="pdp-price-sale text-xl font-bold">
                  ₹ {product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="pdp-price-regular text-sm">
                    ₹ {product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="pdp-price-discount-tag">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="pdp-tax-notice text-xs mb-1.5">Inclusive of all taxes.</p>

              {/* Live Viewers Indicator */}
              <div className="pdp-live-visitors mb-2.5">
                <div className="pdp-live-dot" />
                <Eye className="w-3 h-3 text-emerald-800" />
                <span><strong>{liveViewers} People</strong> Are Watching Right Now.</span>
              </div>

              {/* Actions: Minimalist High-Contrast Quantity Stepper & Unified CTA Row (Matches Reference Exactly) */}
              <div className="pdp-purchase-actions my-3">
                {/* Quantity Header Row with Wishlist */}
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[13px] font-medium text-gray-700">
                    Quantity
                  </label>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="flex items-center gap-1.5 text-xs text-[#7A6560] hover:text-[#4D0007] transition-colors cursor-pointer"
                    title={inWishlist ? 'Saved in Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#4D0007] text-[#4D0007]' : ''}`} />
                    <span>{inWishlist ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>
                </div>

                {/* Stepper Control */}
                <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-xs mb-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors text-base font-semibold border-r border-gray-200 select-none cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 h-9 flex items-center justify-center font-bold text-gray-900 border-r border-gray-200 text-sm select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors text-base font-semibold select-none cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Thin Divider Line */}
                <div className="border-b border-gray-200 mb-3" />

                {/* Side-by-side Flush CTA Row: ADD TO CART (White/Black) + BUY IT NOW (Solid Black) */}
                <div className="flex w-full mb-3 shadow-xs">
                  {/* ADD TO CART */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-white text-black border-2 border-black border-r-0 font-secondary font-bold text-xs sm:text-[13px] uppercase tracking-[0.16em] hover:bg-neutral-50 transition-colors flex items-center justify-center cursor-pointer select-none"
                  >
                    ADD TO CART
                  </button>

                  {/* BUY IT NOW */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 h-12 bg-black text-white border-2 border-black font-secondary font-bold text-xs sm:text-[13px] uppercase tracking-[0.16em] hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer select-none"
                  >
                    BUY IT NOW
                  </button>
                </div>
              </div>

              {/* Delivery Timeline (Custom Delivery Timeline) */}
              <div className="cdt-container my-2">
                <div className="cdt-headline">
                  <Zap className="w-3 h-3 text-amber-500 fill-current" />
                  <span>Prepaid orders are delivered faster than COD.</span>
                </div>
                <div className="cdt-track">
                  <div className="cdt-connector cdt-connector-1" />
                  <div className="cdt-connector cdt-connector-2" />

                  {/* Step 1: Purchased */}
                  <div className="cdt-step">
                    <div className="cdt-icon-box">
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </div>
                    <span className="cdt-date">{datePurchased}</span>
                    <span className="cdt-label">Purchased</span>
                  </div>

                  {/* Step 2: Processing */}
                  <div className="cdt-step">
                    <div className="cdt-icon-box">
                      <Package className="w-3.5 h-3.5" />
                    </div>
                    <span className="cdt-date">{dateProcessing1} - {dateProcessing2}</span>
                    <span className="cdt-label">Processing</span>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className="cdt-step">
                    <div className="cdt-icon-box">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <span className="cdt-date">{dateDelivery1} - {dateDelivery2}</span>
                    <span className="cdt-label">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Delivery Details Pincode Checker */}
              <div className="pdp-pincode-box my-2.5">
                <div className="pdp-pincode-header">
                  <MapPin className="w-3 h-3 text-gold" />
                  <span>Check Delivery Details</span>
                </div>
                <form onSubmit={handleCheckPincode} className="pdp-pincode-form">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit Pincode"
                    className="pdp-pincode-input"
                  />
                  <button type="submit" className="pdp-pincode-btn">
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className={`pdp-pincode-status ${pincodeStatus.startsWith('Available') ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {pincodeStatus}
                  </p>
                )}
              </div>

              {/* Trust Icons Strip (4 Badges) */}
              <div className="pdp-trust-strip my-2.5">
                <div className="pdp-trust-item">
                  <Truck className="pdp-trust-icon" />
                  <span className="pdp-trust-label">Cash on Delivery</span>
                </div>
                <div className="pdp-trust-item">
                  <Gift className="pdp-trust-icon" />
                  <span className="pdp-trust-label">Free Shipping</span>
                </div>
                <div className="pdp-trust-item">
                  <ShieldCheck className="pdp-trust-icon" />
                  <span className="pdp-trust-label">Secure Payments</span>
                </div>
                <div className="pdp-trust-item">
                  <Phone className="pdp-trust-icon" />
                  <span className="pdp-trust-label">Customer Support</span>
                </div>
              </div>

              {/* 5 Collapsible Accordions (Product Details is 1st, Need Help Removed) */}
              <div className="pdp-accordions-wrap">
                
                {/* 1. Product Details */}
                <div className={`pdp-accordion-box ${openAccordions.details ? 'is-open' : ''}`}>
                  <button onClick={() => toggleAccordion('details')} className="pdp-accordion-summary">
                    <span>Product Details</span>
                    <ChevronRight className="pdp-accordion-chevron" />
                  </button>
                  {openAccordions.details && (
                    <div className="pdp-accordion-body">
                      <div className="pdp-spec-table">
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">SKU</span>
                          <span className="pdp-spec-val font-mono">{product.id.toUpperCase()}_Pattu_Saree</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Saree Fabric</span>
                          <span className="pdp-spec-val">{product.fabric}</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Saree Color</span>
                          <span className="pdp-spec-val">{product.color}</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Saree Work</span>
                          <span className="pdp-spec-val">{product.weave}</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Saree Length</span>
                          <span className="pdp-spec-val">{product.sareeLength}</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Type</span>
                          <span className="pdp-spec-val">Traditional Pattu</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Blouse Color</span>
                          <span className="pdp-spec-val">Kumkum Pink</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Blouse Fabric</span>
                          <span className="pdp-spec-val">Silk</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Blouse Work</span>
                          <span className="pdp-spec-val">Zari Woven Border</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Blouse Length</span>
                          <span className="pdp-spec-val">{product.blouseLength}</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Wash And Care</span>
                          <span className="pdp-spec-val">Hand Wash only. Do not dry in direct sunlight</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Sales Package</span>
                          <span className="pdp-spec-val">1 Saree With Attached Unstitched Blouse</span>
                        </div>
                        <div className="pdp-spec-row">
                          <span className="pdp-spec-label">Weight</span>
                          <span className="pdp-spec-val">{product.weight}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Return & Exchange */}
                <div className={`pdp-accordion-box ${openAccordions.exchange ? 'is-open' : ''}`}>
                  <button onClick={() => toggleAccordion('exchange')} className="pdp-accordion-summary">
                    <span>Return & Exchange</span>
                    <ChevronRight className="pdp-accordion-chevron" />
                  </button>
                  {openAccordions.exchange && (
                    <div className="pdp-accordion-body space-y-2">
                      <p><strong>Exchange Only:</strong> We offer 5-day doorstep exchanges for size or color preference.</p>
                      <p><strong>Condition:</strong> Unused, unworn, original tags and Silk Mark hologram intact.</p>
                      <p><strong>Unboxing Video:</strong> For transit damage or defect claims, a 360-degree clear opening unboxing video is required.</p>
                      <p><strong>Fast Resolution:</strong> Contact our concierge within 5 days of delivery for zero-hassle pickup.</p>
                    </div>
                  )}
                </div>

                {/* 3. Shipping & Delivery */}
                <div className={`pdp-accordion-box ${openAccordions.shipping ? 'is-open' : ''}`}>
                  <button onClick={() => toggleAccordion('shipping')} className="pdp-accordion-summary">
                    <span>Shipping & Delivery</span>
                    <ChevronRight className="pdp-accordion-chevron" />
                  </button>
                  {openAccordions.shipping && (
                    <div className="pdp-accordion-body space-y-2">
                      <p><strong>Free Delivery:</strong> Compliments of M. Siva-Tex on all orders across India.</p>
                      <p><strong>Fast Shipping:</strong> Delivery in 4-5 business days via BlueDart, Delhivery, or Xpressbees.</p>
                      <p><strong>Prepaid Priority:</strong> Prepaid orders ship within 24 hours with priority air transit.</p>
                      <p><strong>COD Orders:</strong> Dispatched following standard telephone / WhatsApp confirmation.</p>
                    </div>
                  )}
                </div>

                {/* 4. Care Instructions */}
                <div className={`pdp-accordion-box ${openAccordions.care ? 'is-open' : ''}`}>
                  <button onClick={() => toggleAccordion('care')} className="pdp-accordion-summary">
                    <span>Care Instructions</span>
                    <ChevronRight className="pdp-accordion-chevron" />
                  </button>
                  {openAccordions.care && (
                    <div className="pdp-accordion-body space-y-2">
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Wash:</strong> Gentle hand wash with cold water using mild silk liquid detergent.</li>
                        <li><strong>Dry:</strong> Air dry in complete shade; avoid direct harsh sunlight to preserve zari luster.</li>
                        <li><strong>Iron:</strong> Low heat setting, ironing inside-out with a damp muslin cloth overlay.</li>
                        <li><strong>Storage:</strong> Wrap in clean, unbleached cotton or muslin cloth; do not store in plastic.</li>
                        <li><strong>Color Notice:</strong> Minor shade variation may occur due to studio lighting and monitor resolution.</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* 5. Seller Information */}
                <div className={`pdp-accordion-box ${openAccordions.seller ? 'is-open' : ''}`}>
                  <button onClick={() => toggleAccordion('seller')} className="pdp-accordion-summary">
                    <span>Seller Information</span>
                    <ChevronRight className="pdp-accordion-chevron" />
                  </button>
                  {openAccordions.seller && (
                    <div className="pdp-accordion-body space-y-2">
                      <p><strong>Brand / Atelier:</strong> M. Siva-Tex & Vrindavan Fashion</p>
                      <p><strong>Atelier Address:</strong> 8107, Avadh Textile Market, opposite New Bombay Market, Ring Road, Surat - 395010</p>
                      <p><strong>Country Of Origin:</strong> India</p>
                      <p><strong>Silk Mark Certification:</strong> 100% Genuine Handloom Purity Certified.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 3. Frequently Bought Together / Matching Accessories Bundle */}
        <div className="pdp-bundle-wrap">
          <h3 className="pdp-bundle-title">Frequently Bought Together</h3>
          <div className="pdp-bundle-grid">
            <div className="pdp-bundle-items-row">
              {/* Product 1: Saree */}
              <div className="pdp-bundle-card">
                <img src={product.primaryImage} alt={product.name} className="pdp-bundle-thumb" />
                <span className="text-[10px] font-semibold text-gray-900 truncate w-full">This Saree</span>
                <span className="text-xs font-bold text-burgundy">₹{product.price}</span>
              </div>

              <span className="pdp-bundle-plus">+</span>

              {/* Product 2: Handcrafted Gold Zari Potli */}
              <div className="pdp-bundle-card">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" alt="Zari Potli" className="pdp-bundle-thumb" />
                <span className="text-[10px] font-semibold text-gray-900 truncate w-full">Golden Potli</span>
                <span className="text-xs font-bold text-burgundy">₹{clutchPrice}</span>
              </div>

              <span className="pdp-bundle-plus">+</span>

              {/* Product 3: Cotton Satin Saree Silhouette */}
              <div className="pdp-bundle-card">
                <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80" alt="Petticoat" className="pdp-bundle-thumb" />
                <span className="text-[10px] font-semibold text-gray-900 truncate w-full">Satin Shaper</span>
                <span className="text-xs font-bold text-burgundy">₹{petticoatPrice}</span>
              </div>
            </div>

            {/* Bundle Pricing & CTA */}
            <div className="pdp-bundle-pricing-side">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs text-gray-500 uppercase font-secondary">Bundle Total:</span>
                <span className="text-lg font-bold text-burgundy font-secondary">₹{bundleDiscountedPrice}</span>
                <span className="text-xs text-gray-400 line-through font-secondary">₹{bundleTotalPrice}</span>
              </div>
              <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm mb-3 font-secondary">
                Save 15% with Bundle Privilege
              </span>
              <button
                onClick={handleAddBundleToCart}
                className="w-full py-2.5 px-4 bg-burgundy hover:bg-gold text-gold-pale hover:text-brown-dark font-secondary text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add All 3 to Cart</span>
              </button>
            </div>
          </div>
        </div>

       

        {/* 5. Related Products Section: Mobile 2-Row Horizontal Scroll & Desktop 4-Card Grid */}
        {relatedSarees.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-gold/20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-2">
              <div className="text-center sm:text-left">
                <span className="text-gold font-serif text-xs uppercase tracking-[0.25em] block">You May Also Cherish</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-burgundy mt-1">Complementary Weaves</h3>
              </div>
              {/* Mobile horizontal scroll hint */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-brown-deep/70 lg:hidden">
                <span className="font-secondary">Swipe to explore</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </div>
            </div>

            {/* Mobile: 2 Rows with horizontal scrolling | Desktop: 4 Columns single row */}
            <div className="
              grid grid-rows-2 grid-flow-col auto-cols-[165px] sm:auto-cols-[190px]
              gap-3 sm:gap-4 overflow-x-auto pb-4 pt-1 px-1
              snap-x snap-mandatory scrollbar-none
              lg:grid-rows-1 lg:grid-cols-4 lg:grid-flow-row lg:overflow-visible lg:px-0 lg:gap-6
            ">
              {relatedSarees.map((prod, idx) => (
                <div
                  key={prod.id}
                  className={`snap-start h-full ${idx >= 4 ? 'block lg:hidden' : 'block'}`}
                >
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* 6. Sticky Bottom Action Bar on Mobile */}
      <div className="pdp-mobile-sticky-bar">
        <div className="flex items-center gap-2.5 min-w-0">
          <img src={images[0]} alt={product.name} className="w-10 h-12 object-cover rounded-xs border border-gold/30 shrink-0" />
          <div className="min-w-0 pr-1">
            <span className="text-xs font-serif font-bold text-burgundy truncate block">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] text-emerald-700 font-semibold block leading-tight">
              Prepaid ₹{(product.price - 100).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center flex-1 max-w-[240px] shadow-xs">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 bg-white text-black border border-black border-r-0 font-secondary text-[10px] uppercase tracking-[0.14em] font-bold text-center select-none cursor-pointer"
          >
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-2.5 bg-black text-white border border-black font-secondary text-[10px] uppercase tracking-[0.14em] font-bold text-center select-none cursor-pointer"
          >
            BUY IT NOW
          </button>
        </div>
      </div>

      {/* 7. Image Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gold p-2 z-10"
              aria-label="Close photo preview"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold p-3 bg-black/40 rounded-full"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold p-3 bg-black/40 rounded-full"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="max-h-[80vh] w-auto object-contain rounded-sm shadow-2xl"
              />
              <span className="text-white/80 font-serif text-xs mt-3">
                {product.name} — Photo {activeImageIndex + 1} of {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Write Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs"
            onClick={() => setIsReviewModalOpen(false)}
          >
            <div 
              className="bg-white max-w-lg w-full rounded-sm p-6 sm:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-xl text-burgundy font-semibold mb-1">Write a Verified Review</h3>
              <p className="text-xs text-gray-500 mb-4">Share your draping experience with {product.name}</p>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase font-serif mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="e.g. Smt. Lakshmi Narayanan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase font-serif mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        className="text-amber-500 focus:outline-none"
                      >
                        <Star className={`w-6 h-6 ${star <= newReviewRating ? 'fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase font-serif mb-1">Review Title</label>
                  <input
                    type="text"
                    required
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    placeholder="e.g. Outstanding craftsmanship and sheen"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase font-serif mb-1">Detailed Review</label>
                  <textarea
                    rows={4}
                    required
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe the fabric feel, zari sheen, color vibrancy, and event compliments..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-xs text-xs focus:outline-none focus:border-burgundy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-burgundy hover:bg-gold text-white hover:text-brown-dark font-serif text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors"
                >
                  Submit Verified Review
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
