import { SareeProduct, Review } from '../types';

export const CATEGORIES_DATA = [
  {
    id: 'kanchipuram',
    name: 'Kanchipuram Silk Sarees',
    categoryKey: 'Kanchipuram Silk' as const,
    subtitle: 'Pure Mulberry Silk & Korvai Weave',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    count: 24,
    badge: 'Heritage Classic'
  },
  {
    id: 'banarasi',
    name: 'Banarasi Silk Sarees',
    categoryKey: 'Banarasi Silk' as const,
    subtitle: 'Intricate Kadwa Zari of Varanasi',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    count: 18,
    badge: 'Royal Brocades'
  },
  {
    id: 'soft-silk',
    name: 'Soft Silk Sarees',
    categoryKey: 'Soft Silk' as const,
    subtitle: 'Featherlight Drape & Pastel Glow',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    count: 32,
    badge: 'Everyday Luxury'
  },
  {
    id: 'cotton',
    name: 'Cotton Sarees',
    categoryKey: 'Cotton Sarees' as const,
    subtitle: 'Pure Chanderi & Chettinad Weaves',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    count: 15,
    badge: 'Breathable Artisanal'
  },
  {
    id: 'georgette',
    name: 'Georgette Sarees',
    categoryKey: 'Georgette Sarees' as const,
    subtitle: 'Flowing Grace with Zari Motifs',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    count: 19,
    badge: 'Fluid Drape'
  },
  {
    id: 'chiffon',
    name: 'Chiffon Sarees',
    categoryKey: 'Chiffon Sarees' as const,
    subtitle: 'Ethereal Sheer Elegance',
    image: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=800&q=85',
    count: 14,
    badge: 'Regal Twilight'
  },
  {
    id: 'organza',
    name: 'Organza Sarees',
    categoryKey: 'Organza Sarees' as const,
    subtitle: 'Crisp Sheer with Hand Embroidery',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    count: 22,
    badge: 'Contemporary Grace'
  },
  {
    id: 'bridal',
    name: 'Bridal Silk Sarees',
    categoryKey: 'Bridal Silk' as const,
    subtitle: 'Sacred Muhurtham Heirloom Weaves',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
    count: 28,
    badge: 'Bridal Trousseau'
  }
];

export const SAREE_PRODUCTS: SareeProduct[] = [
  {
    id: 'mst-001',
    name: 'Royal Purple Kanchipuram Silk Saree',
    slug: 'royal-purple-kanchipuram-silk-saree',
    category: 'Kanchipuram Silk',
    price: 32500,
    originalPrice: 38000,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 42,
    primaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Royal Purple',
    colorHex: '#481A36',
    fabric: '100% Pure Mulberry Silk',
    weave: 'Traditional Korvai Three-Shuttle Handloom',
    zari: 'Pure Gold Zari',
    occasion: ['Bridal Muhurtham', 'Reception', 'Festive Puja'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres (Contrast Brocade Included)',
    blouseType: 'Unstitched Rich Contrast Pallu-Matching Blouse',
    weight: '820 grams',
    origin: 'Handcrafted in Kanchipuram, Tamil Nadu',
    isBestSeller: true,
    isTrending: true,
    description: 'A sovereign masterpiece crafted for royal occasions. The body features deep aubergine-purple pure mulberry silk adorned with delicate gold zari mayil (peacock) chakram motifs, interlocked seamlessly into a contrast crimson pallu using the ancestral Korvai weaving technique.',
    craftStory: 'Woven over 38 intensive days by our master craftsman Sri Ramanathan in Kanchipuram, this saree uses 3-ply twisted silk warp and 24-carat gold-dipped silver zari. Certified by Silk Mark India for 100% natural mulberry purity.',
    careInstructions: [
      'Strictly dry clean only to preserve natural silk sheen and gold zari lustre.',
      'Wrap in pure unbleached muslin cloth; avoid plastic bags.',
      'Change fold creases every three to four months.',
      'Do not spray perfume directly on zari or silk fabric.'
    ]
  },
  {
    id: 'mst-002',
    name: 'Emerald Green Banarasi Silk Saree',
    slug: 'emerald-green-banarasi-silk-saree',
    category: 'Banarasi Silk',
    price: 28900,
    originalPrice: 34000,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 38,
    primaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Emerald Green',
    colorHex: '#1B4D3E',
    fabric: 'Katan Pure Silk',
    weave: 'Authentic Kadwa Weave with Floral Jaal',
    zari: 'Tested Gold Zari',
    occasion: ['Reception', 'Festive Puja', 'Evening Party'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres (Matching Silk Included)',
    blouseType: 'Unstitched Silk with Zari Sleeve Borders',
    weight: '750 grams',
    origin: 'Woven on the banks of Varanasi, Uttar Pradesh',
    isBestSeller: true,
    isTrending: true,
    description: 'A regal jewel-toned emerald green Banarasi saree woven on traditional handlooms. Intricate flora and fauna jaal motifs grace the entire body, accompanied by an opulent meenakari and antique gold zari pallu.',
    craftStory: 'Kadwa weaving is the most meticulous technique of Varanasi, where each motif is hand-engraved individually with no loose threads at the back. It took 28 days of hand weaving to achieve this immaculate texture.',
    careInstructions: [
      'Professional dry cleaning recommended.',
      'Store flat in a cotton or muslin saree bag in a cool, dark wardrobe.',
      'Air the saree in soft shade twice a year.'
    ]
  },
  {
    id: 'mst-003',
    name: 'Blush Pink Soft Silk Saree',
    slug: 'blush-pink-soft-silk-saree',
    category: 'Soft Silk',
    price: 16800,
    originalPrice: 19500,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 56,
    primaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Blush Pink',
    colorHex: '#D9B7B1',
    fabric: 'Lightweight Mulberry Soft Silk',
    weave: 'Jacquard Loom with Rose Gold Motifs',
    zari: 'Antique Silver Zari',
    occasion: ['Reception', 'Festive Puja', 'Evening Party', 'Office & Casual'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres',
    blouseType: 'Unstitched Running Blouse with Border',
    weight: '520 grams',
    origin: 'Salem & Arani Weaving Clusters',
    isBestSeller: true,
    isTrending: false,
    description: 'Designed for effortless comfort without compromising on royal grace. The soft blush pink body drapes like a dream, accentuated by subtle champagne silver zari butties and a delicate floral border.',
    craftStory: 'Created with lightly degummed mulberry silk threads that ensure supreme softness and lightweight drape, making it ideal for 12-hour festivities and intimate gatherings.',
    careInstructions: [
      'Dry clean for first two washes; subsequently gentle hand wash with baby shampoo.',
      'Steam iron on low silk setting.'
    ]
  },
  {
    id: 'mst-004',
    name: 'Classic Indigo Blue Cotton Saree',
    slug: 'classic-indigo-blue-cotton-saree',
    category: 'Cotton Sarees',
    price: 8400,
    originalPrice: 9800,
    discountPercent: 14,
    rating: 4.7,
    reviewCount: 29,
    primaryImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Indigo Blue',
    colorHex: '#1F2937',
    fabric: '100% Handspun Organic Cotton',
    weave: 'Chanderi Handloom with Zari Borders',
    zari: 'Tested Gold Zari',
    occasion: ['Office & Casual', 'Festive Puja'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres',
    blouseType: 'Unstitched Handloom Cotton Blouse',
    weight: '430 grams',
    origin: 'Chanderi, Madhya Pradesh',
    isBestSeller: true,
    description: 'Understated elegance for connoisseurs of authentic handspun textiles. Pure indigo dyed organic cotton yarn woven with sheer breathability, complemented by a thin antique gold temple zari border.',
    craftStory: 'Handwoven in the historic town of Chanderi. The gossamer lightness is created by balancing fine 120-count cotton yarns on traditional pit looms.',
    careInstructions: [
      'Cold gentle hand wash with mild eco-detergent.',
      'Dry in shade inside out.',
      'Warm iron with light starch for crisp drapes.'
    ]
  },
  {
    id: 'mst-005',
    name: 'Sacred Crimson Bridal Muhurtham Kanjivaram',
    slug: 'sacred-crimson-bridal-muhurtham-kanjivaram',
    category: 'Bridal Silk',
    price: 54000,
    originalPrice: 62000,
    discountPercent: 13,
    rating: 5.0,
    reviewCount: 64,
    primaryImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Crimson Red & Antique Gold',
    colorHex: '#59203F',
    fabric: 'Heavy Kanchipuram Mulberry Silk',
    weave: 'Double Warp Heavy Korvai Pit Loom',
    zari: 'Pure Gold Zari',
    occasion: ['Bridal Muhurtham', 'Reception'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.9 Metres (Embroidered Zari Sleeves Included)',
    blouseType: 'Unstitched Pure Zari Heavy Brocade Blouse',
    weight: '980 grams',
    origin: 'Kanchipuram, Tamil Nadu',
    isBestSeller: true,
    isBridal: true,
    isNewArrival: true,
    description: 'The pinnacle of South Indian bridal artistry. An auspicious kumkum-crimson body densely covered with Gandaberunda (two-headed eagle) and temple spire motifs in pure 24K gold dipped silver zari.',
    craftStory: 'Crafted over 52 days by two senior generational weavers working simultaneously on a heavy wooden pit loom. An heirloom piece to be passed down through generations.',
    careInstructions: [
      'Exclusively dry clean by bridal silk specialists.',
      'Preserve in the handcrafted M. Siva-Tex velvet heirloom box.',
      'Store away from dampness and direct sunlight.'
    ]
  },
  {
    id: 'mst-006',
    name: 'Champagne Gold Tissue Organza Saree',
    slug: 'champagne-gold-tissue-organza-saree',
    category: 'Organza Sarees',
    price: 21500,
    originalPrice: 25000,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 31,
    primaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Champagne Gold',
    colorHex: '#B18A52',
    fabric: 'Pure Kora Silk Organza Tissue',
    weave: 'Metallic Tissue Warp with Zari Floral Bootas',
    zari: 'Tested Gold Zari',
    occasion: ['Reception', 'Evening Party'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres',
    blouseType: 'Unstitched Raw Silk Blouse Piece',
    weight: '480 grams',
    origin: 'Varanasi Artisanal Loom',
    isNewArrival: true,
    description: 'Modern royal luxury reimagined. Pure organza spun with gold tissue yarn that catches the ambient light with every step, adorned with subtle handcrafted scallop cutwork along the borders.',
    craftStory: 'Blending the lightness of Kora organza with fine metallic gold weft yarns, this saree bridges traditional opulence and contemporary cocktail grandeur.',
    careInstructions: [
      'Dry clean only.',
      'Do not wring or spin. Use cool iron with pressing cloth.'
    ]
  },
  {
    id: 'mst-007',
    name: 'Peacock Blue Banarasi Georgette Saree',
    slug: 'peacock-blue-banarasi-georgette-saree',
    category: 'Georgette Sarees',
    price: 24500,
    originalPrice: 28000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 22,
    primaryImage: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Peacock Blue',
    colorHex: '#0E4D64',
    fabric: 'Pure Khaddi Georgette Silk',
    weave: 'Intricate Floral Bandhej & Zari Weave',
    zari: 'Antique Silver Zari',
    occasion: ['Reception', 'Evening Party', 'Festive Puja'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres',
    blouseType: 'Unstitched Georgette with Embroidered Border',
    weight: '590 grams',
    origin: 'Varanasi, Uttar Pradesh',
    isTrending: true,
    description: 'Fluid, sensuous, and richly decorated. Pure Khaddi Georgette hand-dyed in deep royal peacock blue, shimmering with intricate antique silver zari bootis and floral arabesques.',
    craftStory: 'Woven from tightly twisted silk yarns that produce a characteristic pebbled texture, then hand-embellished by master Banarasi weavers.',
    careInstructions: [
      'Dry clean only.',
      'Store rolled on cardboard cylinders or loosely folded in muslin.'
    ]
  },
  {
    id: 'mst-008',
    name: 'Mustard Gold Korvai Kanchipuram Saree',
    slug: 'mustard-gold-korvai-kanchipuram-saree',
    category: 'Kanchipuram Silk',
    price: 36000,
    originalPrice: 42000,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 47,
    primaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Mustard Gold & Maroon',
    colorHex: '#B18A52',
    fabric: '100% Pure Mulberry Silk',
    weave: 'Authentic Korvai Handloom with Temple Borders',
    zari: 'Pure Gold Zari',
    occasion: ['Bridal Muhurtham', 'Festive Puja'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres (Contrast Maroon Included)',
    blouseType: 'Unstitched Rich Brocade Blouse Piece',
    weight: '860 grams',
    origin: 'Kanchipuram, Tamil Nadu',
    isBestSeller: true,
    description: 'Auspicious Haldi and Muhurtham grandeur. The radiant mustard gold silk body is framed by a bold 14-inch contrasting deep maroon temple border woven with the revered Thazhampoo (screwpine flower) motif.',
    craftStory: 'The interlocking of the mustard body with the solid maroon border requires two weavers passing shuttles back and forth in rhythmic harmony.',
    careInstructions: [
      'Dry clean only.',
      'Air after each wear; refold every 3 months.'
    ]
  },
  {
    id: 'mst-009',
    name: 'Rani Pink Brocade Kanchipuram Silk',
    slug: 'rani-pink-brocade-kanchipuram-silk',
    category: 'Kanchipuram Silk',
    price: 38500,
    originalPrice: 45000,
    discountPercent: 14,
    rating: 5.0,
    reviewCount: 36,
    primaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Rani Pink',
    colorHex: '#9B1D54',
    fabric: 'Pure Mulberry Silk (Heavy 4-ply)',
    weave: 'All-over Zari Vanki Brocade Weave',
    zari: 'Pure Gold Zari',
    occasion: ['Bridal Muhurtham', 'Reception', 'Festive Puja'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.9 Metres',
    blouseType: 'Unstitched Heavy Brocade Blouse',
    weight: '890 grams',
    origin: 'Kanchipuram, Tamil Nadu',
    isNewArrival: true,
    isBridal: true,
    description: 'A symphony in royal Rani pink. Richly brocaded all over with traditional Vanki (armlet) and elephant motifs, culminating in an opulent grand zari pallu that commands admiration.',
    craftStory: 'Heirloom collection piece woven with pure gold zari tested at our laboratory for purity. Backed by the Silk Mark India authenticity certificate.',
    careInstructions: [
      'Dry clean only by reputable silk cleaners.',
      'Store flat in a muslin bag with cedar balls away from light.'
    ]
  },
  {
    id: 'mst-010',
    name: 'Midnight Black Banarasi Katan Silk Saree',
    slug: 'midnight-black-banarasi-katan-silk-saree',
    category: 'Banarasi Silk',
    price: 26000,
    originalPrice: 31000,
    discountPercent: 16,
    rating: 4.8,
    reviewCount: 19,
    primaryImage: 'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Midnight Black & Antique Copper',
    colorHex: '#30221F',
    fabric: 'Katan Pure Silk',
    weave: 'Jangla Weave with Antique Copper Zari',
    zari: 'Copper Zari',
    occasion: ['Reception', 'Evening Party'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres',
    blouseType: 'Unstitched Matching Silk with Zari border',
    weight: '760 grams',
    origin: 'Varanasi, Uttar Pradesh',
    isTrending: true,
    description: 'Daring, contemporary and profoundly regal. Lustrous midnight black Katan silk adorned with intricately woven rose gold and copper zari flora, creating a mesmerizing twilight shimmer.',
    craftStory: 'Jangla is among the oldest Banarasi weaving styles, featuring sprawling botanical scrolls that cover the fabric without repetitive breakages.',
    careInstructions: [
      'Dry clean only.',
      'Steam press gently on silk setting.'
    ]
  },
  {
    id: 'mst-011',
    name: 'Pista Green Hand-Embroidered Organza Saree',
    slug: 'pista-green-hand-embroidered-organza-saree',
    category: 'Organza Sarees',
    price: 19200,
    originalPrice: 22000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 27,
    primaryImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Pista Green',
    colorHex: '#A3B18A',
    fabric: 'Pure Sheer Silk Organza',
    weave: 'Hand-guided Resham & Pearl Threadwork',
    zari: 'Resham Thread',
    occasion: ['Reception', 'Festive Puja', 'Evening Party'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.8 Metres',
    blouseType: 'Unstitched Raw Silk Blouse Piece',
    weight: '410 grams',
    origin: 'Lucknow & Varanasi Collaboration',
    isNewArrival: true,
    description: 'Subtle sophistication in refreshing pastel pista green. The ethereal sheer organza is delicately embellished with tonal Resham flora, sequins, and scalloped pearl edges.',
    craftStory: 'Combines the crisp texture of pure organza with the delicate precision of hand embroidery, delivering a saree that feels weightless and looks majestic.',
    careInstructions: [
      'Dry clean only.',
      'Hang carefully or fold with tissue paper between folds.'
    ]
  },
  {
    id: 'mst-012',
    name: 'Wine Burgundy Pure Zari Heirloom Saree',
    slug: 'wine-burgundy-pure-zari-heirloom-saree',
    category: 'Bridal Silk',
    price: 49500,
    originalPrice: 58000,
    discountPercent: 15,
    rating: 5.0,
    reviewCount: 49,
    primaryImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=90',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=90'
    ],
    color: 'Deep Wine Burgundy',
    colorHex: '#481A36',
    fabric: 'Pure Kanchipuram Mulberry Silk',
    weave: 'Three-Ply Korvai Weave with Annapakshi Motifs',
    zari: 'Pure Gold Zari',
    occasion: ['Bridal Muhurtham', 'Reception'],
    sareeLength: '5.5 Metres',
    blouseLength: '0.9 Metres (Included with Embroidered Border)',
    blouseType: 'Unstitched Pure Zari Heavy Blouse Piece',
    weight: '920 grams',
    origin: 'Kanchipuram, Tamil Nadu',
    isBestSeller: true,
    isBridal: true,
    isTrending: true,
    description: 'An embodiment of timeless luxury. Deep wine burgundy silk with authentic Annapakshi (divine swan) medallions woven in solid pure gold zari across the body, leading into a magnificent temple-corridor pallu.',
    craftStory: 'The Annapakshi represents divinity, purity, and grace. Handcrafted over 44 days on ancient pit looms, this saree comes with a certified gold content purity card.',
    careInstructions: [
      'Strictly dry clean only.',
      'Keep enclosed in the signature M. Siva-Tex velvet heritage box.'
    ]
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    author: 'Dr. Meenakshi Sundaram',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    date: 'October 14, 2026',
    title: 'The Korvai weave is breathtakingly authentic!',
    comment: 'I purchased the Sacred Crimson Bridal Kanjivaram for my daughter’s wedding in Mylapore. The heavy pure gold zari and the thickness of the mulberry silk are comparable to heirlooms woven 50 years ago. M. Siva-Tex represents true handloom integrity.',
    verified: true,
    sareeDraped: 'Sacred Crimson Bridal Muhurtham Kanjivaram'
  },
  {
    id: 'rev-02',
    author: 'Radhika Swaminathan',
    location: 'Bangalore, Karnataka',
    rating: 5,
    date: 'November 2, 2026',
    title: 'Best saree shopping experience online',
    comment: 'The video concierge session helped me see the drape in natural sunlight before ordering. Arrived in a luxurious burgundy velvet box with the Silk Mark hologram. Wore the Royal Purple saree for Diwali and received endless compliments.',
    verified: true,
    sareeDraped: 'Royal Purple Kanchipuram Silk Saree'
  },
  {
    id: 'rev-03',
    author: 'Ananya Deshmukh',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: 'September 28, 2026',
    title: 'Pure Kadwa Banarasi perfection',
    comment: 'Finding genuine Kadwa Banarasi without machine-made synthetic blends is rare nowadays. M. Siva-Tex’s Emerald Green Banarasi has true handcrafted finesse with zero loose back-threads. A proud possession in my wardrobe.',
    verified: true,
    sareeDraped: 'Emerald Green Banarasi Silk Saree'
  },
  {
    id: 'rev-04',
    author: 'Priyanka Nambiar',
    location: 'Coimbatore, Tamil Nadu',
    rating: 5,
    date: 'August 19, 2026',
    title: 'Featherlight soft silk with royal sheen',
    comment: 'The Blush Pink Soft Silk is so easy to pleat and carry for a full 8-hour family reception. The drape stayed crisp and comfortable without slipping. Will definitely be a returning patron!',
    verified: true,
    sareeDraped: 'Blush Pink Soft Silk Saree'
  }
];

export const WEAVING_HERITAGE_STEPS = [
  {
    step: '01',
    title: 'Mulberry Silk Reeling',
    description: 'We source Grade-A raw mulberry silk threads directly from traditional sericulture clusters in Karnataka and Bengal, rigorously tested for tensile strength and natural sheen.',
    icon: 'Sparkles'
  },
  {
    step: '02',
    title: 'Pure Gold & Silver Zari',
    description: 'Authentic zari is created by wrapping fine electroplated 24-carat gold around flattened pure silver wire core, lending eternal lustre that never blackens over decades.',
    icon: 'Coins'
  },
  {
    step: '03',
    title: 'The Korvai Pit Loom',
    description: 'In the ancient Korvai technique, the body and the border are woven separately using two or three distinct shuttles, interlinked manually by master weavers with rhythmic precision.',
    icon: 'Wrench'
  },
  {
    step: '04',
    title: 'Jacquard Temple Motifs',
    description: 'Sacred South Indian temple motifs — Mayil (peacock), Rudraksham, Yali, and Thazhampoo — are punched onto traditional graph boards to guide every single warp pick.',
    icon: 'Feather'
  },
  {
    step: '05',
    title: 'Hand Tasselling & Finishing',
    description: 'Each saree ends with hand-knotted silk tassels (kuchu) crafted using matching silk yarn and pure zari threads by skilled women artisans.',
    icon: 'Scissors'
  },
  {
    step: '06',
    title: 'Silk Mark Certification',
    description: 'Every single saree leaving our looms is individually inspected, certified with the government-backed Silk Mark India hologram, and packaged in archival velvet.',
    icon: 'ShieldCheck'
  }
];
