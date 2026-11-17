Created At: 2026-11-17T17:31:10+05:30
Completed At: 2026-11-17T17:31:10+05:30
Created At: 2026-11-17T17:31:10+05:30
Completed At: 2026-11-17T17:31:10+05:30
Showing lines 1-100 of 209
1: import React, { useState, useEffect } from 'react';
2: import { useShop } from '../context/ShopContext';
3: import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
4: import { motion, AnimatePresence } from 'framer-motion';
5: import '../styles/hero.css';
6: 
7: const HERO_SLIDES = [
8:   {
9:     id: 1,
10:     eyebrow: 'TIMELESS INDIAN HERITAGE',
11:     heading: 'Draped in Tradition.\nDefined by Elegance.',
12:     description: 'Discover exquisite sarees woven with heritage, craftsmanship and timeless beauty. Find the perfect drape for every celebration and every story.',
13:     cta: 'Explore Collections',
14:     categoryTarget: null,
15:     image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=90',
16:     tag: 'Pure Kanchipuram Silk'
17:   },
18:   {
19:     id: 2,
20:     eyebrow: 'SACRED BRIDAL TROUSSEAU 2026',
21:     heading: 'Sacred Silks for\nAuspicious Beginnings.',
22:     description: 'Heirloom-grade bridal Kanjivarams handwoven with pure 24k gold-dipped silver zari on ancient pit looms in Kanchipuram.',
23:     cta: 'Shop Bridal Edit',
24:     categoryTarget: 'Bridal Silk',
25:     image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=2000&q=90',
26:     tag: '24K Gold Dipped Zari'
27:   },
28:   {
29:     id: 3,
30:     eyebrow: 'THE VARANASI KADWA ARCHIVES',
31:     heading: 'The Soul of Banaras,\nWoven by Hand.',
32:     description: 'Intricate Kadwa floral jaals hand-engraved onto lustrous Katan silk, celebrating four centuries of imperial textile artistry.',
33:     cta: 'Discover Banarasi',
34:     categoryTarget: 'Banarasi Silk',
35:     image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=90',
36:     tag: 'Authentic Kadwa Weave'
37:   }
38: ];
39: 
40: export const HeroBanner: React.FC = () => {
41:   const [currentSlide, setCurrentSlide] = useState(0);
42:   const [isHovered, setIsHovered] = useState(false);
43:   const { setCurrentView, setSelectedCategoryFilter } = useShop();
44: 
45:   useEffect(() => {
46:     if (isHovered) return;
47:     const interval = setInterval(() => {
48:       setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
49:     }, 6500);
50:     return () => clearInterval(interval);
51:   }, [isHovered]);
52: 
53:   const slide = HERO_SLIDES[currentSlide];
54: 
55:   const handleCtaClick = () => {
56:     setSelectedCategoryFilter(slide.categoryTarget);
57:     setCurrentView('shop');
58:   };
59: 
60:   const nextSlide = () => {
61:     setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
62:   };
63: 
64:   const prevSlide = () => {
65:     setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
66:   };
67: 
68:   return (
69:     <section
70:       className="relative h-[85vh] min-h-[600px] max-h-[880px] w-full overflow-hidden bg-burgundy-dark select-none"
71:       onMouseEnter={() => setIsHovered(true)}
72:       onMouseLeave={() => setIsHovered(false)}
73:     >
74:       {/* Background Images with Crossfade and Gentle Zoom */}
75:       <AnimatePresence mode="wait">
76:         <motion.div
77:           key={slide.id}
78:           initial={{ opacity: 0 }}
79:           animate={{ opacity: 1 }}
80:           exit={{ opacity: 0 }}
81:           transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
82:           className="absolute inset-0"
83:         >
84:           {/* Zooming background image */}
85:           <motion.div
86:             initial={{ scale: 1.05 }}
87:             animate={{ scale: 1 }}
88:             transition={{ duration: 8, ease: 'easeOut' }}
89:             className="w-full h-full"
90:           >
91:             <img
92:               src={slide.image}
93:               alt={slide.heading}
94:               className="w-full h-full object-cover object-right md:object-[75%_center]"
95:             />
96:           </motion.div>
97: 
98:           {/* Luxury Editorial Overlay - Deep burgundy and warm shadows */}
99:           <div className="absolute inset-0 bg-gradient-to-r from-burgundy-dark/95 via-burgundy/80 to-transparent lg:w-3/5" />
100:           <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/80 via-transparent to-black/30" />