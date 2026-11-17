export interface HeroSlide {
  id: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  categoryTarget: string | null;
  tag: string;
  image: string;
  posClass: string;
}

export type TransitionDirection = 'next' | 'prev';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: 'THE SAREE GALLERY • EST. 1974',
    title: 'Sarees',
    subtitle: 'Woven for Timeless Stories',
    description: 'Discover ethereal handloom sarees woven with pure mulberry silk and authentic gold zari. A celebration of feminine grace, heritage, and master craftsmanship.',
    primaryCta: 'Explore Sarees',
    secondaryCta: 'Our Heritage',
    categoryTarget: 'Kanchipuram Silk',
    tag: 'Pure Kanchipuram Silk',
    image: '/assets/hero-full.jpg',
    posClass: 'cinematic-hero-model-pos-1'
  },
  {
    id: 2,
    eyebrow: 'SACRED BRIDAL TROUSSEAU 2026',
    title: 'The Bridal Edit',
    subtitle: 'in Pure 24K Gold Zari',
    description: 'Heirloom-grade bridal Kanjivarams handwoven with pure 24K gold-dipped silver zari on ancient pit looms in Kanchipuram for auspicious beginnings.',
    primaryCta: 'Shop Bridal Edit',
    secondaryCta: 'Book Concierge',
    categoryTarget: 'Bridal Silk',
    tag: '24K Gold Dipped Zari',
    image: '/assets/siva-tex/siva-sarees-bridal-crimson.jpg',
    posClass: 'cinematic-hero-model-pos-2'
  },
  {
    id: 3,
    eyebrow: 'A LEGACY OF WEAVING',
    title: 'Our Collections',
    subtitle: 'for Every Celebration',
    description: 'From everyday grace to grand muhurthams. Radiant turmeric gold and mulberry silks with intricate temple borders and hand-interlocked korvai pallus.',
    primaryCta: 'Browse Collections',
    secondaryCta: 'View Lookbook',
    categoryTarget: 'Kanchipuram Silk',
    tag: 'Authentic Korvai Weave',
    image: '/assets/siva-tex/siva-sarees-kanchipuram-gold.jpg',
    posClass: 'cinematic-hero-model-pos-3'
  },
  {
    id: 4,
    eyebrow: 'THE IMPERIAL WEAVES',
    title: 'Heritage Silks',
    subtitle: 'with Cultural Soul',
    description: 'Intricate Kadwa floral jaals and interlocking kadhuwa borders hand-engraved on lustrous pure katan silk, celebrating four centuries of imperial textile artistry.',
    primaryCta: 'Discover Banarasi',
    secondaryCta: 'Weaving Process',
    categoryTarget: 'Banarasi Silk',
    tag: 'Master Artisan Handloom',
    image: '/assets/siva-tex/siva-sarees-banarasi-purple.jpg',
    posClass: 'cinematic-hero-model-pos-4'
  },
  {
    id: 5,
    eyebrow: 'STEP INTO TIMELESS LUXURY',
    title: 'M. Siva-Tex Atelier',
    subtitle: 'of Authentic Weaves',
    description: 'Preserving authentic three-shuttle Korvai & Kadwa pit loom handloom traditions since 1974. Woven with reverence for celebrations that stay in memory forever.',
    primaryCta: 'Explore All Weaves',
    secondaryCta: 'Virtual Tour',
    categoryTarget: null,
    tag: 'Silk Mark Certified',
    image: '/assets/siva-tex/siva-sarees-7.jpg',
    posClass: 'cinematic-hero-model-pos-5'
  }
];
