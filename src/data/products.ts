export interface Product {
  id: number;
  name: string;
  category: 'Women' | 'Men' | 'Accessories' | 'Shoes' | 'Outerwear';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isFlashSale?: boolean;
  discountPercent?: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

export interface Category {
  id: string;
  name: 'Women' | 'Men' | 'Accessories' | 'Shoes' | 'Outerwear';
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
    description: 'Tailored suits, urban jackets, and elevated essentials.'
  },
  {
    id: 'women',
    name: 'Women',
    itemCount: 64,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    description: 'Effortless dresses, premium knitwear, and couture separates.'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    itemCount: 32,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    description: 'Italian leather loafers, boots, and sculpted heels.'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    itemCount: 45,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    description: 'Structured handbags, Swiss timepieces, and silk scarves.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Classic Silk Trench Coat',
    category: 'Outerwear',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    description: 'Elegantly tailored trench coat crafted from weather-resistant blended silk fabric. Features belted waist and double-breasted closure.',
    isFeatured: true,
    isNew: false,
    isFlashSale: true,
    discountPercent: 25,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Midnight Black', 'Olive'],
    inStock: true
  },
  {
    id: 2,
    name: 'Tailored Linen Blazer',
    category: 'Men',
    price: 149.50,
    originalPrice: 195.00,
    rating: 4.7,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    description: 'Refined lightweight linen blazer designed for modern business or smart-casual versatility with breathable comfort.',
    isFeatured: true,
    isNew: true,
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Navy Blue', 'Sand', 'Slate Grey'],
    inStock: true
  },
  {
    id: 3,
    name: 'Pleated Velvet Evening Dress',
    category: 'Women',
    price: 129.00,
    originalPrice: 180.00,
    rating: 4.9,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    description: 'Stunning velvet midi dress featuring flowing accordion pleats and an alluring neckline. Ideal for evenings and special occasions.',
    isFeatured: true,
    isNew: true,
    isFlashSale: true,
    discountPercent: 30,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald Green', 'Wine Red', 'Obsidian'],
    inStock: true
  },
  {
    id: 4,
    name: 'Handcrafted Leather Handbag',
    category: 'Accessories',
    price: 210.00,
    originalPrice: 260.00,
    rating: 4.9,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    description: 'Full-grain Italian leather handbag with gold-tone hardware and spacious multi-compartment design.',
    isFeatured: true,
    isNew: false,
    sizes: ['One Size'],
    colors: ['Cognac Tan', 'Charcoal', 'Cream'],
    inStock: true
  },
  {
    id: 5,
    name: 'Minimalist Chelsea Boots',
    category: 'Shoes',
    price: 175.00,
    originalPrice: 220.00,
    rating: 4.6,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
    description: 'Durable and sleek leather Chelsea boots with flexible elastic side gussets and cushioned memory insoles.',
    isFeatured: true,
    isNew: false,
    isFlashSale: true,
    discountPercent: 20,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black Leather', 'Espresso Suede'],
    inStock: true
  },
  {
    id: 6,
    name: 'Cashmere Ribbed Knit Sweater',
    category: 'Women',
    price: 115.00,
    originalPrice: 155.00,
    rating: 4.8,
    reviewCount: 81,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-soft Mongolian cashmere sweater featuring a cozy turtleneck cut and ribbed sleeve cuffs.',
    isFeatured: false,
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Oatmeal', 'Blush', 'Charcoal'],
    inStock: true
  },
  {
    id: 7,
    name: 'Slim-Fit Oxford Shirt',
    category: 'Men',
    price: 65.00,
    originalPrice: 85.00,
    rating: 4.5,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    description: '100% organic cotton Oxford shirt featuring button-down collar and tailored silhouette for timeless style.',
    isFeatured: false,
    isNew: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Sky Blue', 'Crisp White', 'Soft Pink'],
    inStock: true
  },
  {
    id: 8,
    name: 'Polarized Aviator Sunglasses',
    category: 'Accessories',
    price: 85.00,
    originalPrice: 120.00,
    rating: 4.7,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'Classic aviator silhouette with 100% UV400 polarized crystal lenses and lightweight titanium frame.',
    isFeatured: false,
    isNew: true,
    isFlashSale: true,
    discountPercent: 30,
    sizes: ['One Size'],
    colors: ['Gold/Green', 'Gunmetal/Black'],
    inStock: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sophia Laurent',
    role: 'Fashion Stylist',
    city: 'New York, NY',
    rating: 5,
    comment: 'The craftsmanship of the Silk Trench Coat is nothing short of Parisian couture level. Flawless drape, sublime tailoring, and arrived within 2 days!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    productName: 'Classic Silk Trench Coat',
    date: 'March 2026'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Creative Director',
    city: 'London, UK',
    rating: 5,
    comment: 'The Linen Blazer has become my staple piece for gallery openings and transatlantic trips. Breathable, sharp, and fits like a bespoke commission.',
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
    comment: 'I rarely buy evening wear online, but the Pleated Velvet Dress exceeded all expectations. Incredible fabric weight, rich depth of color, and pure luxury.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    productName: 'Pleated Velvet Evening Dress',
    date: 'January 2026'
  }
];
