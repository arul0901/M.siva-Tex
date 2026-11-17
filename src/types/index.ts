export type SareeCategory = 
  | 'Kanchipuram Silk'
  | 'Banarasi Silk'
  | 'Soft Silk'
  | 'Cotton Sarees'
  | 'Georgette Sarees'
  | 'Chiffon Sarees'
  | 'Organza Sarees'
  | 'Bridal Silk';

export type Occasion = 'Bridal Muhurtham' | 'Festive Puja' | 'Reception' | 'Office & Casual' | 'Evening Party';

export type ZariType = 'Pure Gold Zari' | 'Tested Gold Zari' | 'Antique Silver Zari' | 'Copper Zari' | 'Resham Thread';

export interface SareeProduct {
  id: string;
  name: string;
  slug: string;
  category: SareeCategory;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  color: string;
  colorHex: string;
  fabric: string;
  weave: string;
  zari: ZariType;
  occasion: Occasion[];
  sareeLength: string;
  blouseLength: string;
  blouseType: string;
  weight: string;
  origin: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isBridal?: boolean;
  description: string;
  craftStory: string;
  careInstructions: string[];
}

export interface CartItem {
  product: SareeProduct;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sareeDraped: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  status: 'Loom Inspection' | 'Packed in Velvet Box' | 'In Transit' | 'Delivered';
  expectedDelivery: string;
  trackingNumber: string;
}

