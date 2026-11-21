import React, { createContext, useContext, useState, useEffect } from 'react';
import { SareeProduct, CartItem, Order, SareeCategory } from '../types';
import { SAREE_PRODUCTS } from '../data/sarees';

interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'gold';
}

interface ShopContextType {
  // Navigation / View
  currentView: 'home' | 'shop' | 'product-detail' | 'heritage' | 'contact' | 'checkout' | 'account' | 'wishlist' | 'cart';
  setCurrentView: (view: 'home' | 'shop' | 'product-detail' | 'heritage' | 'contact' | 'checkout' | 'account' | 'wishlist' | 'cart') => void;
  selectedProduct: SareeProduct | null;
  openProductDetail: (product: SareeProduct) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (category: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: SareeProduct, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  shippingFee: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: SareeProduct[];
  toggleWishlist: (product: SareeProduct) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;

  // Modals & Overlays
  quickViewProduct: SareeProduct | null;
  setQuickViewProduct: (product: SareeProduct | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => Order;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_ORDERS: Order[] = [
  {
    id: 'MST-882914',
    date: '10 Nov 2026',
    items: [
      {
        product: SAREE_PRODUCTS[0],
        quantity: 1
      }
    ],
    totalAmount: 29250,
    shippingAddress: {
      fullName: 'Smt. Ananya Krishnan',
      phone: '+91 98401 22839',
      street: 'Flat 4B, Temple View Apartments, Mylapore',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600004'
    },
    paymentMethod: 'UPI (GPay - Verified)',
    status: 'In Transit',
    expectedDelivery: '18 Nov 2026',
    trackingNumber: 'BLUEDART-IND-773910'
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewState] = useState<'home' | 'shop' | 'product-detail' | 'heritage' | 'contact' | 'checkout' | 'account' | 'wishlist' | 'cart'>('home');
  const [selectedProduct, setSelectedProduct] = useState<SareeProduct | null>(SAREE_PRODUCTS[0]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Support direct URL query navigation (?view=product-detail&product=mst-swarna-kumkum)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      const prodSlug = params.get('product');

      if (prodSlug) {
        const found = SAREE_PRODUCTS.find(p => p.id === prodSlug || p.slug === prodSlug);
        if (found) setSelectedProduct(found);
      }

      if (viewParam && ['home', 'shop', 'product-detail', 'heritage', 'contact', 'checkout', 'account', 'wishlist', 'cart'].includes(viewParam)) {
        setCurrentViewState(viewParam as any);
      }
    } catch {
      // ignore in non-browser env
    }
  }, []);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mst_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<SareeProduct[]>(() => {
    try {
      const saved = localStorage.getItem('mst_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mst_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<SareeProduct | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('WELCOME10');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem('mst_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('mst_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('mst_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const setCurrentView = (view: 'home' | 'shop' | 'product-detail' | 'heritage' | 'contact' | 'checkout' | 'account' | 'wishlist' | 'cart') => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProductDetail = (product: SareeProduct) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: SareeProduct, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(
      'Added to Shopping Bag',
      `${product.name} has been placed in your bespoke shopping bag.`,
      'gold'
    );
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Removed from Bag', 'The item has been removed from your shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  
  const discountAmount = appliedCoupon === 'WELCOME10' 
    ? Math.round(cartSubtotal * 0.10) 
    : 0;

  // Free shipping on orders above ₹3,000
  const shippingFee = cartSubtotal >= 3000 || cartSubtotal === 0 ? 0 : 350;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME10') {
      setAppliedCoupon('WELCOME10');
      addToast('Coupon Applied!', 'Enjoy 10% privilege discount on your order.', 'success');
      return true;
    } else {
      addToast('Invalid Coupon', 'Please enter a valid promotion code such as WELCOME10.', 'info');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'The promotion discount has been removed.', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (product: SareeProduct) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        addToast('Removed from Wishlist', `${product.name} removed from your saved heirlooms.`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        addToast('Added to Wishlist', `${product.name} saved to your curated wishlist.`, 'gold');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const wishlistCount = wishlist.length;

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'trackingNumber'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `MST-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Loom Inspection',
      trackingNumber: `BLUEDART-IND-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        openProductDetail,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        discountAmount,
        shippingFee,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isConciergeOpen,
        setIsConciergeOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        orders,
        placeOrder,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

