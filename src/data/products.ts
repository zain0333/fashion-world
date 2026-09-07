export interface FabricDetails {
  composition: string;
  weight: string;
  weave: string;
  breathability: string;
  stretch: string;
  textureDescription: string;
  care: string[];
  texturePattern?: 'silk' | 'cotton' | 'denim' | 'knit' | 'leather' | 'linen';
}

export interface Product {
  id: number;
  name: string;
  category: 'Men' | 'Women' | 'Shoes' | 'Accessories';
  price: number;
  oldPrice?: number;
  originalPrice?: number; // backwards compatibility
  image: string;
  images?: string[]; // Multiple product images
  rating: number;
  reviews: number;
  reviewCount?: number; // backwards compatibility
  stock: number;
  inStock?: boolean; // backwards compatibility
  description: string;
  badge?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  discountPercent?: number;
  sizes: string[];
  colors: string[];
  // Realistic Animations & Previews
  videoUrl?: string;
  multiAngleImages?: string[];
  fabricDetails?: FabricDetails;
}

export interface Category {
  id: string;
  name: 'Men' | 'Women' | 'Shoes' | 'Accessories';
  itemCount: number;
  image: string;
  description: string;
}

export interface Review {
  id: number;
  name: string;
  role: string;
  city: string;
  rating: number;
  comment: string;
  avatar: string;
  productName: string;
  date: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'men',
    name: 'Men',
    itemCount: 48,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    description: 'Tailored jackets, premium tees, and refined menswear essentials.'
  },
  {
    id: 'women',
    name: 'Women',
    itemCount: 64,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: 'Effortless dresses, tailored separates, and seasonal knitwear.'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    itemCount: 32,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    description: 'Casual sneakers, running performance shoes, and leather boots.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    itemCount: 45,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    description: 'Italian leather handbags, belts, timepieces, and sunglasses.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Men's Jacket",
    category: 'Men',
    price: 189.99,
    oldPrice: 249.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 64,
    reviewCount: 64,
    stock: 25,
    inStock: true,
    description: 'A timeless, structured outerwear jacket made from durable weather-resistant cotton twill with sleek hardware.',
    badge: 'Best Seller',
    isFeatured: true,
    isFlashSale: true,
    discountPercent: 24,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Camel', 'Midnight Black', 'Olive'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-adjusting-his-suit-jacket-40546-large.mp4',
    fabricDetails: {
      composition: '100% Organic Heavy Cotton Twill with Weather-Shield Coating',
      weight: '380 GSM Heavyweight Outerwear Gauge',
      weave: '3x1 Dense Left-Hand Twill Structure',
      breathability: 'High All-Weather Permeability',
      stretch: '3% Natural Mechanical Flex',
      texturePattern: 'cotton',
      textureDescription: 'Structured yet supple cotton twill that breaks in gracefully with wear, offering wind-resistant shielding, reinforced stitching, and a rich tactile matte finish.',
      care: ['Professional dry clean recommended', 'Cool iron on reverse with press cloth', 'Store on structured cedar hanger']
    }
  },
  {
    id: 2,
    name: 'Premium T-Shirt',
    category: 'Men',
    price: 39.50,
    oldPrice: 49.00,
    originalPrice: 49.00,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 142,
    reviewCount: 142,
    stock: 60,
    inStock: true,
    description: 'Ultra-soft 100% Pima cotton crewneck t-shirt with a modern tailored cut that maintains shape wash after wash.',
    badge: 'Trending',
    isFeatured: true,
    isNew: false,
    discountPercent: 19,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Pure White', 'Charcoal', 'Navy', 'Sage'],
    fabricDetails: {
      composition: '100% Peruvian Long-Staple Pima Cotton',
      weight: '220 GSM Midweight Luxury Jersey',
      weave: 'Ring-Spun Single Jersey Micro-Knit',
      breathability: 'Ultra-High 360° Flow',
      stretch: 'Natural 4-Way Flexibility',
      texturePattern: 'cotton',
      textureDescription: 'Long-staple pima cotton micro-fibers that resist pilling, offering cloud-like softness, drape, and enduring dimensional stability.',
      care: ['Machine wash cold (30°C)', 'Tumble dry low or air dry', 'Warm iron if desired']
    }
  },
  {
    id: 3,
    name: 'Slim Fit Jeans',
    category: 'Men',
    price: 89.00,
    oldPrice: 115.00,
    originalPrice: 115.00,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856453?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542272604-780c96856453?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 89,
    reviewCount: 89,
    stock: 3, // Low stock: Only Few Left
    inStock: true,
    description: 'Contemporary slim fit denim with 2% comfort stretch, authentic fading, and reinforced rivet stitching.',
    badge: 'Only 3 Left',
    isFeatured: true,
    isNew: false,
    discountPercent: 22,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Vintage Indigo', 'Dark Wash', 'Washed Black'],
    fabricDetails: {
      composition: '98% Organic Cotton, 2% RoICA High-Recovery Elastane',
      weight: '13.5 oz Premium Selvedge Denim',
      weave: 'Right-Hand Twill Rope-Dyed Indigo Weft',
      breathability: 'Medium All-Season Comfort',
      stretch: '2% Adaptive Comfort Flex',
      texturePattern: 'denim',
      textureDescription: 'Woven on vintage shuttle looms with natural slub yarns, developing rich personalized whiskers and fades unique to your lifestyle.',
      care: ['Wash inside out with cold water', 'Line dry in shade to preserve indigo', 'Do not bleach']
    }
  },
  {
    id: 4,
    name: "Women's Summer Dress",
    category: 'Women',
    price: 119.00,
    oldPrice: 149.00,
    originalPrice: 149.00,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 128,
    reviewCount: 128,
    stock: 20,
    inStock: true,
    description: 'Breezy botanical print summer midi dress featuring delicate flutter sleeves, a cinched waist, and a flowing tiered hem.',
    badge: 'Hot Drop',
    isFeatured: true,
    isNew: true,
    discountPercent: 20,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Floral Emerald', 'Sunburst Coral', 'Ivory Bloom'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-in-a-summer-dress-walking-in-a-field-43285-large.mp4',
    fabricDetails: {
      composition: '70% Eco-Vero Viscose, 30% Mulberry Silk Crepe de Chine',
      weight: '160 GSM Featherlight Fluidity',
      weave: 'Micro-Crinkle Crepe Weave',
      breathability: 'Ultra-High Whispering Drape',
      stretch: 'Natural Bias Movement',
      texturePattern: 'silk',
      textureDescription: 'Airy botanical crepe de chine that flutters effortlessly with every step, feeling whisper-soft and cool against the skin.',
      care: ['Hand wash cold or gentle dry clean', 'Dry flat in shade', 'Low steam ironing only']
    }
  },
  {
    id: 5,
    name: "Women's Handbag",
    category: 'Accessories',
    price: 210.00,
    oldPrice: 260.00,
    originalPrice: 260.00,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 112,
    reviewCount: 112,
    stock: 2, // Low stock: Only Few Left
    inStock: true,
    description: 'Structured top-handle tote in full-grain calfskin leather with polished gold hardware and a detachable shoulder strap.',
    badge: 'Only 2 Left',
    isFeatured: true,
    isNew: false,
    discountPercent: 19,
    sizes: ['One Size'],
    colors: ['Cognac Tan', 'Midnight Black', 'Alabaster'],
    fabricDetails: {
      composition: '100% Full-Grain Tuscan Calfskin Leather with Microsuede Lining',
      weight: '1.8mm Precision Leather Gauge',
      weave: 'Vegetable-Tanned Pebble Grain Finish',
      breathability: 'Porous Organic Leather Grain',
      stretch: 'Sculpted Architectural Rigidity',
      texturePattern: 'leather',
      textureDescription: 'Richly textured pebble grain leather treated with organic botanical tanneries in Florence, resisting minor scuffs while developing a lustrous amber patina.',
      care: ['Wipe clean with a soft dry cloth', 'Apply leather conditioning balm every 6 months', 'Store in cotton dust protector bag']
    }
  },
  {
    id: 6,
    name: 'Casual Sneakers',
    category: 'Shoes',
    price: 125.00,
    oldPrice: 150.00,
    originalPrice: 150.00,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 95,
    reviewCount: 95,
    stock: 40,
    inStock: true,
    description: 'Clean minimalist low-top leather sneakers with cushioned orthotic insoles and durable vulcanized rubber soles.',
    badge: 'Trending',
    isFeatured: true,
    isNew: true,
    discountPercent: 16,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Crisp White', 'White/Gum', 'Triple Black'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-person-tying-their-sneakers-42674-large.mp4',
    fabricDetails: {
      composition: 'Supple Nappa Leather Upper & Natural Vulcanized Gum Rubber Outsole',
      weight: '390g Lightweight Ergonomic Build',
      weave: 'Micro-Perforated Breathability Inset',
      breathability: 'High with Anti-Microbial Orthotic Footbed',
      stretch: 'Foot-Conforming Ergonomic Fit',
      texturePattern: 'leather',
      textureDescription: 'Buttery smooth Nappa leather upper stitched to a reinforced rubber cupsole, providing plush heel cushioning and day-long arch support.',
      care: ['Clean gently with leather cleaning foam', 'Air dry at room temperature', 'Use wooden shoe trees to maintain toe-box shape']
    }
  },
  {
    id: 7,
    name: 'Running Shoes',
    category: 'Shoes',
    price: 145.00,
    oldPrice: 175.00,
    originalPrice: 175.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 164,
    reviewCount: 164,
    stock: 0, // Out of Stock
    inStock: false,
    description: 'High-performance lightweight running shoes engineered with responsive foam cushioning and breathable engineered mesh.',
    badge: 'Sold Out',
    isFeatured: false,
    isNew: true,
    isFlashSale: true,
    discountPercent: 17,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Crimson/Black', 'Volt Gray', 'Obsidian Blue'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-legs-of-a-runner-in-sneakers-running-on-the-road-42675-large.mp4',
    fabricDetails: {
      composition: 'Engineered Flyknit Matrix with Nitro-Infused Rebound Midsole',
      weight: '235g Racing Featherweight',
      weave: 'Zoned High-Tension Jacquard Mesh',
      breathability: 'Maximum 360° Heat-Dispersal Mesh',
      stretch: 'Adaptive High-Rebound Sockliner',
      texturePattern: 'knit',
      textureDescription: 'Seamless multi-density jacquard knit that hugs the midfoot dynamically while channeling airflow across high-heat zones during high-speed runs.',
      care: ['Hand wash with mild detergent', 'Air dry away from direct heat sources', 'Remove insole before cleaning']
    }
  },
  {
    id: 8,
    name: 'Leather Belt',
    category: 'Accessories',
    price: 55.00,
    oldPrice: 70.00,
    originalPrice: 70.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 58,
    reviewCount: 58,
    stock: 50,
    inStock: true,
    description: 'Genuine full-grain Italian leather belt accented with an antique brushed brass buckle and beveled edge detailing.',
    badge: 'Essential',
    isFeatured: false,
    isNew: false,
    discountPercent: 21,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Rich Brown', 'Classic Black'],
    fabricDetails: {
      composition: '100% Full-Grain Vegetable-Tanned Italian Bridle Leather',
      weight: '3.5mm Heavy-Duty Thickness',
      weave: 'Burnished Hand-Finished Edge Weave',
      breathability: 'Natural Organic Leather',
      stretch: 'Non-Stretch Tensile Durability',
      texturePattern: 'leather',
      textureDescription: 'Heavyweight Italian bridle leather hand-rubbed with organic waxes, burnished along edges, and secured with solid forged brass buckle hardware.',
      care: ['Spot clean with dry cloth', 'Treat with beeswax dressing periodically']
    }
  },
  {
    id: 9,
    name: 'Sunglasses',
    category: 'Accessories',
    price: 85.00,
    oldPrice: 120.00,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 76,
    reviewCount: 76,
    stock: 4, // Low stock: Only Few Left
    inStock: true,
    description: 'Iconic polarized aviator sunglasses with UV400 protective scratch-resistant lenses and ultralight metal frames.',
    badge: 'Only 4 Left',
    isFeatured: false,
    isNew: true,
    isFlashSale: true,
    discountPercent: 29,
    sizes: ['One Size'],
    colors: ['Gold / Emerald', 'Gunmetal / Smoke', 'Rose Gold'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-putting-on-stylish-sunglasses-41221-large.mp4',
    fabricDetails: {
      composition: 'Aerospace-Grade Titanium Alloy & Polarized Triacetate Cellulose (TAC)',
      weight: '24g Featherweight Frame',
      weave: 'Hydrophobic & Oleophobic Nano-Coated Lenses',
      breathability: 'Ventilated Nosepad Grips',
      stretch: 'Spring-Hinged Flexible Temples',
      texturePattern: 'leather',
      textureDescription: 'Ultralight hypoallergenic titanium frame paired with precision Category 3 polarized lenses that neutralize 99.9% of glare and reflections.',
      care: ['Rinse with average lukewarm water', 'Clean with optical microfiber cloth', 'Keep in hard protective clamshell case']
    }
  },
  {
    id: 10,
    name: 'Premium Hoodie',
    category: 'Men',
    price: 95.00,
    oldPrice: 125.00,
    originalPrice: 125.00,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 104,
    reviewCount: 104,
    stock: 28,
    inStock: true,
    description: 'Heavyweight 450 GSM French terry cotton pullover hoodie with ribbed side gussets and a double-layered hood.',
    badge: 'Cozy Pick',
    isFeatured: false,
    isNew: true,
    discountPercent: 24,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Heather Gray', 'Oatmeal', 'Washed Black'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-putting-on-a-hoodie-and-looking-at-the-camera-42866-large.mp4',
    fabricDetails: {
      composition: '100% Organic Ring-Spun French Terry Cotton',
      weight: '450 GSM Ultra-Heavyweight Coziness',
      weave: 'Diagonal Loopback Thermal Knit',
      breathability: 'High Warmth with Natural Air Circulation',
      stretch: 'Heavy 2x2 Ribbed Stretch Gussets',
      texturePattern: 'knit',
      textureDescription: 'Luxurious dense loopback knit providing structured streetwear silhouette, heavy thermal warmth, and an ultra-soft fleece-like inner feel.',
      care: ['Machine wash cold inside out', 'Do not tumble dry high', 'Lay flat to dry']
    }
  },
  {
    id: 11,
    name: 'Tailored Linen Blazer',
    category: 'Men',
    price: 149.50,
    oldPrice: 195.00,
    originalPrice: 195.00,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 42,
    reviewCount: 42,
    stock: 0, // Out of Stock
    inStock: false,
    description: 'Breathable European linen blazer cut in a relaxed tailored silhouette, perfect for warm-weather formal and smart-casual affairs.',
    badge: 'Sold Out',
    isFeatured: true,
    isNew: false,
    discountPercent: 23,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Sand Beige', 'Navy Blue', 'Slate Gray'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-adjusting-his-suit-jacket-40546-large.mp4',
    fabricDetails: {
      composition: '100% Normandy Flax Linen with Bemberg Half-Lining',
      weight: '280 GSM Summer Suiting Linen',
      weave: 'Open Slub Plain Weave',
      breathability: 'Maximum Air Permeability',
      stretch: 'Relaxed Tailored Fall',
      texturePattern: 'linen',
      textureDescription: 'Pure European flax boasting subtle slub cross-hatch textures that drape with effortless distinction, keeping you crisp and refreshed in high temperatures.',
      care: ['Dry clean only', 'Warm steam press with pressing cloth', 'Store on broad wooden shoulder hangers']
    }
  },
  {
    id: 12,
    name: 'Silk Midi Evening Dress',
    category: 'Women',
    price: 165.00,
    oldPrice: 220.00,
    originalPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 73,
    reviewCount: 73,
    stock: 14,
    inStock: true,
    description: 'Flowing 100% mulberry silk slip dress with an elegant cowl neckline and bias-cut drape that contours naturally.',
    badge: 'Luxury Edit',
    isFeatured: true,
    isNew: true,
    discountPercent: 25,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Champagne Gold', 'Ruby Wine', 'Midnight Navy'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-long-white-dress-walking-by-the-sea-41315-large.mp4',
    fabricDetails: {
      composition: '100% Grade-6A Long-Filament Mulberry Silk Charmeuse',
      weight: '22 Momme Heavy Couture Silk',
      weave: 'Liquid High-Luster Satin Weave',
      breathability: 'Naturally Temperature Regulating',
      stretch: '45-Degree Bias Contour',
      texturePattern: 'silk',
      textureDescription: 'Exquisite 22 momme silk charmeuse that falls in liquid ripples, gleaming under evening lights with seamless fluidity and silk-to-skin touch.',
      care: ['Specialist dry clean only or cold silk wash', 'Steam gently inside-out', 'Do not wring or tumble dry']
    }
  },
  {
    id: 13,
    name: 'Cashmere Knit Sweater',
    category: 'Women',
    price: 135.00,
    oldPrice: 175.00,
    originalPrice: 175.00,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 81,
    reviewCount: 81,
    stock: 3, // Low stock: Only Few Left
    inStock: true,
    description: 'Plush Grade-A Mongolian cashmere crewneck sweater delivering cloud-like warmth with fine ribbed trim.',
    badge: 'Only 3 Left',
    isFeatured: false,
    isNew: false,
    discountPercent: 23,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Soft Blush', 'Oatmeal Heather', 'Charcoal'],
    fabricDetails: {
      composition: '100% Grade-A Pure Inner Mongolian Cashmere',
      weight: '2-Ply 12-Gauge Fine Knit',
      weave: 'Fine Fully-Fashioned Jersey Stitch',
      breathability: 'High Featherweight Insulation',
      stretch: 'Natural Spring Micro-Elasticity',
      texturePattern: 'knit',
      textureDescription: 'Spun from the finest 15.5-micron underfleece, offering unmatched cloud-like warmth without bulk, finished with reinforced hand-linked necklines.',
      care: ['Hand wash in cold water with cashmere shampoo', 'Dry flat on towel', 'Use cashmere comb for de-pilling']
    }
  },
  {
    id: 14,
    name: 'Wide Leg Tailored Trousers',
    category: 'Women',
    price: 98.00,
    oldPrice: 130.00,
    originalPrice: 130.00,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 64,
    reviewCount: 64,
    stock: 26,
    inStock: true,
    description: 'High-waisted pleated trousers with a fluid wide-leg silhouette that elongates the frame for a polished look.',
    badge: 'Chic Style',
    isFeatured: false,
    isNew: true,
    discountPercent: 25,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ecru Cream', 'Espresso Brown', 'Black'],
    fabricDetails: {
      composition: '65% Virgin Wool, 30% Lyocell, 5% Elastane',
      weight: '260 GSM Year-Round Suiting Flannel',
      weave: 'Crease-Resistant Compact Weave',
      breathability: 'High Breathability & Fluid Swing',
      stretch: '5% Multi-Directional Stretch',
      texturePattern: 'cotton',
      textureDescription: 'High-twist wool blend with architectural drape that holds sharp front pleats and moves gracefully with dynamic stride.',
      care: ['Dry clean only', 'Warm iron over press cloth', 'Hang by bottom hem']
    }
  },
  {
    id: 15,
    name: 'Minimalist Chelsea Boots',
    category: 'Shoes',
    price: 175.00,
    oldPrice: 220.00,
    originalPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviews: 53,
    reviewCount: 53,
    stock: 19,
    inStock: true,
    description: 'Water-resistant box calf leather Chelsea boots featuring elastic side panels and Goodyear welt construction.',
    badge: 'Handcrafted',
    isFeatured: true,
    isNew: false,
    isFlashSale: true,
    discountPercent: 20,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black Calfskin', 'Dark Brown Suede'],
    fabricDetails: {
      composition: 'Full-Grain Box Calf Leather & Storm-Welted Dainite Rubber Soles',
      weight: '580g Per Boot',
      weave: 'Waxed Aniline Finish & Elastic Ribbed Side Panels',
      breathability: 'Natural Leather Calf Lining',
      stretch: 'Elastic Side Gussets for Easy Slip-On',
      texturePattern: 'leather',
      textureDescription: 'Goodyear-welted box calf leather treated with hydrophobic oils, mounted on resoleable British Dainite rubber studs for all-weather traction.',
      care: ['Wipe mud with damp cloth', 'Polish with carnauba wax shoe cream', 'Use cedar boot trees']
    }
  },
  {
    id: 16,
    name: 'Italian Leather Oxford Shoes',
    category: 'Shoes',
    price: 195.00,
    oldPrice: 250.00,
    originalPrice: 250.00,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 48,
    reviewCount: 48,
    stock: 0, // Out of Stock
    inStock: false,
    description: 'Hand-burnished closed-lacing Oxford dress shoes handcrafted in Tuscany from full-grain vegetable-tanned leather.',
    badge: 'Sold Out',
    isFeatured: false,
    isNew: false,
    discountPercent: 22,
    sizes: ['8', '8.5', '9', '9.5', '10', '11', '12'],
    colors: ['Cognac Burnish', 'Classic Black'],
    fabricDetails: {
      composition: 'Hand-Burnished Tuscan Calfskin Leather & Hand-Sewn Oak Bark Leather Soles',
      weight: '490g Per Shoe',
      weave: 'Closed-Channel Blake Rapid Stitching',
      breathability: 'Perforated Soft Calf Insole',
      stretch: 'Molds to Foot Profile over 10 Wears',
      texturePattern: 'leather',
      textureDescription: 'Individually dyed by Tuscan master artisans with multi-tonal antique burnishing on the toe cap and beveled fiddleback waist.',
      care: ['Apply saphir renovateur conditioner', 'Mirror shine toe caps with beeswax wax', 'Always use shoehorn']
    }
  },
  {
    id: 17,
    name: 'Strappy Stiletto Sandals',
    category: 'Shoes',
    price: 139.00,
    oldPrice: 175.00,
    originalPrice: 175.00,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviews: 37,
    reviewCount: 37,
    stock: 21,
    inStock: true,
    description: 'Barely-there tubular leather straps set on a graceful 85mm stiletto heel with lightly padded leather footbeds.',
    badge: 'Party Ready',
    isFeatured: false,
    isNew: true,
    discountPercent: 21,
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Metallic Gold', 'Sleek Black', 'Blush Nude'],
    fabricDetails: {
      composition: 'Mirror-Finish Metallic Kid Leather Upper & Cushioned Memory-Foam Footbed',
      weight: '210g Slender Stiletto Form',
      weave: 'Tubular Hand-Turned Ankle Wrap',
      breathability: 'Open-Air Architecture',
      stretch: 'Adjustable Buckled Ankle Strap',
      texturePattern: 'leather',
      textureDescription: 'Supple tubular leather straps engineered to securely support the arch while distributing ball-of-foot pressure onto padded memory foam.',
      care: ['Wipe clean with soft cloth', 'Store in individual flannel dust bags']
    }
  },
  {
    id: 18,
    name: 'Luxury Chronograph Watch',
    category: 'Accessories',
    price: 285.00,
    oldPrice: 350.00,
    originalPrice: 350.00,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 62,
    reviewCount: 62,
    stock: 12,
    inStock: true,
    description: 'Precision Japanese quartz movement timepiece with sapphire crystal glass, 5 ATM water resistance, and leather band.',
    badge: 'Premium',
    isFeatured: true,
    isNew: false,
    discountPercent: 19,
    sizes: ['40mm Dial', '42mm Dial'],
    colors: ['Silver / Black Leather', 'Rose Gold / Brown Leather'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-putting-on-stylish-sunglasses-41221-large.mp4',
    fabricDetails: {
      composition: '316L Surgical-Grade Stainless Steel & Horween Chromexcel Leather Strap',
      weight: '145g Balanced Wrist Feel',
      weave: 'Sunray Brushed Dial & Domed Sapphire Crystal',
      breathability: 'Water Resistant 50 Meters (5 ATM)',
      stretch: 'Deployant Stainless Steel Butterfly Clasp',
      texturePattern: 'leather',
      textureDescription: 'High-precision Japanese caliber movement housed in a diamond-cut 316L steel chassis, crowned with anti-reflective domed sapphire glass.',
      care: ['Rinse with fresh water after ocean exposure', 'Polish steel with micro-cloth', 'Service mechanism every 3-5 years']
    }
  },
  {
    id: 19,
    name: 'Reversible Silk Scarf',
    category: 'Accessories',
    price: 68.00,
    oldPrice: 90.00,
    originalPrice: 90.00,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviews: 44,
    reviewCount: 44,
    stock: 2, // Low stock: Only Few Left
    inStock: true,
    description: '100% twill silk square scarf printed with archival geometric and equestrian-inspired heritage motifs.',
    badge: 'Only 2 Left',
    isFeatured: false,
    isNew: true,
    discountPercent: 24,
    sizes: ['S (70x70cm)', 'M (90x90cm)', 'L (110x110cm)'],
    colors: ['Royal Blue / Gold', 'Burgundy / Cream'],
    fabricDetails: {
      composition: '100% Pure Mulberry Silk Twill (16 Momme) with Hand-Rolled Edges',
      weight: '65g Featherweight Square',
      weave: 'Diagonal Twill Rib Weave with Dual-Sided Screen Print',
      breathability: 'High Natural Temperature Adaptability',
      stretch: 'Soft Diagonal Flexibility',
      texturePattern: 'silk',
      textureDescription: 'Classic silk twill weave with distinctive diagonal ribbing, printed with archival heritage inks and finished with meticulous artisan hand-rolled edges.',
      care: ['Dry clean only', 'Store flat without sharp fold creases', 'Steam on silk heat setting']
    }
  },
  {
    id: 20,
    name: 'Structured Trench Overcoat',
    category: 'Women',
    price: 195.00,
    oldPrice: 260.00,
    originalPrice: 260.00,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    multiAngleImages: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviews: 91,
    reviewCount: 91,
    stock: 17,
    inStock: true,
    description: 'Double-breasted longline trench coat with storm flaps, belted waist, horn buttons, and satin inner lining.',
    badge: 'Iconic',
    isFeatured: true,
    isNew: true,
    isFlashSale: true,
    discountPercent: 25,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Classic Khaki', 'Onyx Black', 'Stone Gray'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-an-autumn-outfit-43288-large.mp4',
    fabricDetails: {
      composition: '100% Weatherproof Cotton Gabardine with 100% Cupro Silk Lining',
      weight: '340 GSM Weather-Shield Gabardine',
      weave: 'High-Density 63-Degree Steep Twill',
      breathability: 'High All-Season Rain & Wind Shielding',
      stretch: 'Architectural Tailored Structure',
      texturePattern: 'linen',
      textureDescription: 'Innovatively woven gabardine with microscopic fiber spacing that repels heavy rain while keeping the garment fully breathable and crease-free.',
      care: ['Specialist dry clean with mild fluorocarbon solvent', 'Steam iron low', 'Re-proof water repellency annually']
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sophia Laurent',
    role: 'Fashion Stylist',
    city: 'New York, NY',
    rating: 5,
    comment: 'The craftsmanship of the Classic Men\'s Jacket is nothing short of Parisian couture level. Flawless drape, sublime tailoring, and arrived within 2 days!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    productName: "Classic Men's Jacket",
    date: 'March 2026'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Creative Director',
    city: 'London, UK',
    rating: 5,
    comment: 'The Linen Blazer and Casual Sneakers have become my staple pieces for gallery openings and transatlantic trips. Breathable, sharp, and fits like a bespoke commission.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    productName: 'Tailored Linen Blazer',
    date: 'February 2026'
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Interior Architect',
    city: 'Milan, Italy',
    rating: 5,
    comment: 'I rarely buy evening wear online, but the Summer Dress and Silk Midi Dress exceeded all expectations. Incredible fabric weight, rich depth of color, and pure luxury.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    productName: "Women's Summer Dress",
    date: 'January 2026'
  }
];
