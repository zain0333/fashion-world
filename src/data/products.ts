export interface Product {
  id: number;
  name: string;
  category: 'Men' | 'Women' | 'Shoes' | 'Accessories';
  price: number;
  oldPrice?: number;
  originalPrice?: number; // backwards compatibility
  image: string;
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
    colors: ['Camel', 'Midnight Black', 'Olive']
  },
  {
    id: 2,
    name: 'Premium T-Shirt',
    category: 'Men',
    price: 39.50,
    oldPrice: 49.00,
    originalPrice: 49.00,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
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
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Pure White', 'Charcoal', 'Navy', 'Sage']
  },
  {
    id: 3,
    name: 'Slim Fit Jeans',
    category: 'Men',
    price: 89.00,
    oldPrice: 115.00,
    originalPrice: 115.00,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 89,
    reviewCount: 89,
    stock: 35,
    inStock: true,
    description: 'Contemporary slim fit denim with 2% comfort stretch, authentic fading, and reinforced rivet stitching.',
    badge: 'Popular',
    isFeatured: true,
    isNew: false,
    discountPercent: 22,
    sizes: ['30x32', '32x32', '34x32', '36x32'],
    colors: ['Vintage Indigo', 'Dark Wash', 'Washed Black']
  },
  {
    id: 4,
    name: "Women's Summer Dress",
    category: 'Women',
    price: 119.00,
    oldPrice: 149.00,
    originalPrice: 149.00,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
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
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Emerald', 'Sunburst Coral', 'Ivory Bloom']
  },
  {
    id: 5,
    name: "Women's Handbag",
    category: 'Accessories',
    price: 210.00,
    oldPrice: 260.00,
    originalPrice: 260.00,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 112,
    reviewCount: 112,
    stock: 18,
    inStock: true,
    description: 'Structured top-handle tote in full-grain calfskin leather with polished gold hardware and a detachable shoulder strap.',
    badge: 'Luxury Edit',
    isFeatured: true,
    isNew: false,
    discountPercent: 19,
    sizes: ['One Size'],
    colors: ['Cognac Tan', 'Midnight Black', 'Alabaster']
  },
  {
    id: 6,
    name: 'Casual Sneakers',
    category: 'Shoes',
    price: 125.00,
    oldPrice: 150.00,
    originalPrice: 150.00,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
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
    colors: ['Crisp White', 'White/Gum', 'Triple Black']
  },
  {
    id: 7,
    name: 'Running Shoes',
    category: 'Shoes',
    price: 145.00,
    oldPrice: 175.00,
    originalPrice: 175.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 164,
    reviewCount: 164,
    stock: 30,
    inStock: true,
    description: 'High-performance lightweight running shoes engineered with responsive foam cushioning and breathable engineered mesh.',
    badge: 'Performance',
    isFeatured: false,
    isNew: true,
    isFlashSale: true,
    discountPercent: 17,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Crimson/Black', 'Volt Gray', 'Obsidian Blue']
  },
  {
    id: 8,
    name: 'Leather Belt',
    category: 'Accessories',
    price: 55.00,
    oldPrice: 70.00,
    originalPrice: 70.00,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
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
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Rich Brown', 'Classic Black']
  },
  {
    id: 9,
    name: 'Sunglasses',
    category: 'Accessories',
    price: 85.00,
    oldPrice: 120.00,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 76,
    reviewCount: 76,
    stock: 45,
    inStock: true,
    description: 'Iconic polarized aviator sunglasses with UV400 protective scratch-resistant lenses and ultralight metal frames.',
    badge: 'Summer Pick',
    isFeatured: false,
    isNew: true,
    isFlashSale: true,
    discountPercent: 29,
    sizes: ['One Size'],
    colors: ['Gold / Emerald', 'Gunmetal / Smoke', 'Rose Gold']
  },
  {
    id: 10,
    name: 'Premium Hoodie',
    category: 'Men',
    price: 95.00,
    oldPrice: 125.00,
    originalPrice: 125.00,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
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
    colors: ['Heather Gray', 'Oatmeal', 'Washed Black']
  },
  {
    id: 11,
    name: 'Tailored Linen Blazer',
    category: 'Men',
    price: 149.50,
    oldPrice: 195.00,
    originalPrice: 195.00,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 42,
    reviewCount: 42,
    stock: 15,
    inStock: true,
    description: 'Breathable European linen blazer cut in a relaxed tailored silhouette, perfect for warm-weather formal and smart-casual affairs.',
    badge: 'Tailored',
    isFeatured: true,
    isNew: false,
    discountPercent: 23,
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Sand Beige', 'Navy Blue', 'Slate Gray']
  },
  {
    id: 12,
    name: 'Silk Midi Evening Dress',
    category: 'Women',
    price: 165.00,
    oldPrice: 220.00,
    originalPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
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
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Champagne Gold', 'Ruby Wine', 'Midnight Navy']
  },
  {
    id: 13,
    name: 'Cashmere Knit Sweater',
    category: 'Women',
    price: 135.00,
    oldPrice: 175.00,
    originalPrice: 175.00,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 81,
    reviewCount: 81,
    stock: 22,
    inStock: true,
    description: 'Plush Grade-A Mongolian cashmere crewneck sweater delivering cloud-like warmth with fine ribbed trim.',
    badge: 'Best Seller',
    isFeatured: false,
    isNew: false,
    discountPercent: 23,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Soft Blush', 'Oatmeal Heather', 'Charcoal']
  },
  {
    id: 14,
    name: 'Wide Leg Tailored Trousers',
    category: 'Women',
    price: 98.00,
    oldPrice: 130.00,
    originalPrice: 130.00,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
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
    sizes: ['2', '4', '6', '8', '10', '12'],
    colors: ['Ecru Cream', 'Espresso Brown', 'Black']
  },
  {
    id: 15,
    name: 'Minimalist Chelsea Boots',
    category: 'Shoes',
    price: 175.00,
    oldPrice: 220.00,
    originalPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
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
    colors: ['Black Calfskin', 'Dark Brown Suede']
  },
  {
    id: 16,
    name: 'Italian Leather Oxford Shoes',
    category: 'Shoes',
    price: 195.00,
    oldPrice: 250.00,
    originalPrice: 250.00,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 48,
    reviewCount: 48,
    stock: 16,
    inStock: true,
    description: 'Hand-burnished closed-lacing Oxford dress shoes handcrafted in Tuscany from full-grain vegetable-tanned leather.',
    badge: 'Artisan',
    isFeatured: false,
    isNew: false,
    discountPercent: 22,
    sizes: ['8', '8.5', '9', '9.5', '10', '11', '12'],
    colors: ['Cognac Burnish', 'Classic Black']
  },
  {
    id: 17,
    name: 'Strappy Stiletto Sandals',
    category: 'Shoes',
    price: 139.00,
    oldPrice: 175.00,
    originalPrice: 175.00,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
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
    colors: ['Metallic Gold', 'Sleek Black', 'Blush Nude']
  },
  {
    id: 18,
    name: 'Luxury Chronograph Watch',
    category: 'Accessories',
    price: 285.00,
    oldPrice: 350.00,
    originalPrice: 350.00,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
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
    sizes: ['40mm Dial'],
    colors: ['Silver / Black Leather', 'Rose Gold / Brown Leather']
  },
  {
    id: 19,
    name: 'Reversible Silk Scarf',
    category: 'Accessories',
    price: 68.00,
    oldPrice: 90.00,
    originalPrice: 90.00,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 44,
    reviewCount: 44,
    stock: 35,
    inStock: true,
    description: '100% twill silk square scarf printed with archival geometric and equestrian-inspired heritage motifs.',
    badge: 'New In',
    isFeatured: false,
    isNew: true,
    discountPercent: 24,
    sizes: ['90cm x 90cm'],
    colors: ['Royal Blue / Gold', 'Burgundy / Cream']
  },
  {
    id: 20,
    name: 'Structured Trench Overcoat',
    category: 'Women',
    price: 195.00,
    oldPrice: 260.00,
    originalPrice: 260.00,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
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
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Classic Khaki', 'Onyx Black', 'Stone Gray']
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
