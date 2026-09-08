import { PRODUCTS, type Product } from '../data/products';

export interface OutfitItem {
  product: Product;
  selectedColor: string;
  role: string; // e.g., '👔 Statement Jacket' | '👕 Base Shirt' | '👖 Tailored Bottoms' | '👞 Footwear' | '⌚ Luxury Accent' | '👜 Handbag'
  reason: string;
}

export interface CuratedOutfit {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Men' | 'Women' | 'Unisex';
  items: OutfitItem[];
}

export interface AIResponse {
  text: string;
  outfits?: CuratedOutfit[];
  suggestions: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  outfits?: CuratedOutfit[];
  suggestions?: string[];
  timestamp: string;
}

// Helper to look up a product by ID safely
const getProduct = (id: number): Product | undefined => {
  return PRODUCTS.find((p) => p.id === id);
};

// Curated Fashion Ensembles
export const CURATED_ENSEMBLES: Record<string, CuratedOutfit[]> = {
  wedding: [
    {
      id: 'wedding-men-formal',
      title: "👔 Men's Tailored Summer Wedding Attire",
      tagline: 'Refined European linen suiting paired with Tuscan burnished leather.',
      description: 'Ideal for garden, vineyard, destination, or semi-formal weddings. The breathable Normandy flax linen keeps you cool and poised, while the burnished calfskin oxfords and chronograph watch deliver timeless Italian flair.',
      category: 'Men',
      items: [
        {
          product: getProduct(11)!, // Tailored Linen Blazer
          selectedColor: 'Sand Beige',
          role: '🧥 Jacket / Blazer',
          reason: 'Lightweight, structured slub linen that radiates effortless summer sophistication.'
        },
        {
          product: getProduct(2)!, // Premium T-Shirt
          selectedColor: 'Pure White',
          role: '👕 Base Layer',
          reason: 'Peruvian pima cotton providing a crisp, ultra-clean neutral anchor under the blazer.'
        },
        {
          product: getProduct(3)!, // Slim Fit Jeans
          selectedColor: 'Dark Wash',
          role: '👖 Tailored Pants',
          reason: 'Deep indigo wash offering tailored sharpness without stiffness.'
        },
        {
          product: getProduct(16)!, // Italian Leather Oxford Shoes
          selectedColor: 'Cognac Burnish',
          role: '👞 Footwear',
          reason: 'Hand-burnished closed-lacing leather dress shoes that elevate the entire ensemble.'
        },
        {
          product: getProduct(8)!, // Leather Belt
          selectedColor: 'Rich Brown',
          role: '🎗️ Leather Accessory',
          reason: 'Harmonizes with the cognac footwear with vegetable-tanned Italian leather.'
        },
        {
          product: getProduct(18)!, // Luxury Chronograph Watch
          selectedColor: 'Rose Gold / Brown Leather',
          role: '⌚ Statement Timepiece',
          reason: 'Warm rose gold case with brown Horween leather strap to complete the look.'
        }
      ].filter((item) => Boolean(item.product))
    },
    {
      id: 'wedding-women-formal',
      title: "✨ Women's Mulberry Silk Evening Gala Dress",
      tagline: 'Liquid silk charmeuse in Champagne Gold with gold stiletto accents.',
      description: 'A showstopping, graceful look designed for evening weddings, black-tie cocktail parties, and formal receptions. The bias-cut silk dress cascades naturally, accented by shimmering metallics and an Italian leather tote.',
      category: 'Women',
      items: [
        {
          product: getProduct(12)!, // Silk Midi Evening Dress
          selectedColor: 'Champagne Gold',
          role: '👗 Evening Dress',
          reason: '100% 22-momme Grade-6A mulberry silk with fluid liquid drape and cowl neckline.'
        },
        {
          product: getProduct(17)!, // Strappy Stiletto Sandals
          selectedColor: 'Metallic Gold',
          role: '👠 Luxury Footwear',
          reason: '85mm stiletto heel with mirror-finish tubular straps for leg-lengthening elegance.'
        },
        {
          product: getProduct(5)!, // Women's Handbag
          selectedColor: 'Alabaster',
          role: '👜 Leather Tote',
          reason: 'Sculpted Tuscan calfskin with polished gold hardware that complements the gown.'
        },
        {
          product: getProduct(19)!, // Reversible Silk Scarf
          selectedColor: 'Royal Blue / Gold',
          role: '🧣 Silk Wrap',
          reason: 'Archival printed silk twill wrap for breezy evening terraces and indoor halls.'
        }
      ].filter((item) => Boolean(item.product))
    },
    {
      id: 'wedding-women-summer',
      title: "🌺 Women's Botanical Garden Wedding Look",
      tagline: 'Breezy botanical midi dress with sunburst hues and elegant eyewear.',
      description: 'The definitive choice for outdoor, beach, or day weddings. Vibrant botanical prints flutter effortlessly in the summer breeze.',
      category: 'Women',
      items: [
        {
          product: getProduct(4)!, // Women's Summer Dress
          selectedColor: 'Sunburst Coral',
          role: '👗 Midi Dress',
          reason: 'Eco-Vero viscose and silk crepe de chine with romantic flutter sleeves.'
        },
        {
          product: getProduct(17)!, // Strappy Stiletto Sandals
          selectedColor: 'Blush Nude',
          role: '👠 Footwear',
          reason: 'Understated blush nude straps that let the botanical dress take center stage.'
        },
        {
          product: getProduct(9)!, // Sunglasses
          selectedColor: 'Rose Gold',
          role: '🕶️ Sunglasses',
          reason: 'UV400 polarized aviators in polished rose gold for outdoor sunlit celebrations.'
        }
      ].filter((item) => Boolean(item.product))
    }
  ],

  business: [
    {
      id: 'business-casual-men',
      title: "💼 Modern Executive Smart-Casual",
      tagline: 'Tailored blazer, pima cotton top, dark wash denim, and Chelsea boots.',
      description: 'The gold standard for client dinners, tech boardroom presentations, and creative agency settings. Balances authoritative structure with relaxed comfort.',
      category: 'Men',
      items: [
        {
          product: getProduct(11)!, // Tailored Linen Blazer
          selectedColor: 'Navy Blue',
          role: '🧥 Structured Blazer',
          reason: 'Deep navy suiting provides an executive presence while remaining breathable.'
        },
        {
          product: getProduct(2)!, // Premium T-Shirt
          selectedColor: 'Pure White',
          role: '👕 Core Layer',
          reason: 'Ultra-soft Peruvian Pima cotton with a clean modern neckline.'
        },
        {
          product: getProduct(3)!, // Slim Fit Jeans
          selectedColor: 'Dark Wash',
          role: '👖 Tailored Denim',
          reason: 'Rope-dyed indigo selvedge denim tailored with 2% comfort stretch.'
        },
        {
          product: getProduct(15)!, // Minimalist Chelsea Boots
          selectedColor: 'Black Calfskin',
          role: '👞 Boots',
          reason: 'Storm-welted box calf leather with clean silhouettes that slip on seamlessly.'
        },
        {
          product: getProduct(18)!, // Luxury Chronograph Watch
          selectedColor: 'Silver / Black Leather',
          role: '⌚ Precision Timepiece',
          reason: '316L surgical steel and sapphire crystal dial.'
        }
      ].filter((item) => Boolean(item.product))
    },
    {
      id: 'business-chic-women',
      title: "✨ Women's High-Power Parisian Chic",
      tagline: 'Wide-leg wool trousers, cashmere knitwear, and structured trench coat.',
      description: 'Command the room with sharp architectural pleats, ultra-soft Mongolian cashmere, and an iconic gabardine trench overcoat.',
      category: 'Women',
      items: [
        {
          product: getProduct(20)!, // Structured Trench Overcoat
          selectedColor: 'Classic Khaki',
          role: '🧥 Trench Coat',
          reason: 'Double-breasted longline trench in weatherproof cotton gabardine.'
        },
        {
          product: getProduct(13)!, // Cashmere Knit Sweater
          selectedColor: 'Oatmeal Heather',
          role: '🧶 Cashmere Top',
          reason: 'Grade-A 100% inner Mongolian cashmere delivering lightweight warmth.'
        },
        {
          product: getProduct(14)!, // Wide Leg Tailored Trousers
          selectedColor: 'Black',
          role: '👖 Tailored Trousers',
          reason: 'High-waisted virgin wool blend trousers with fluid leg drape.'
        },
        {
          product: getProduct(5)!, // Women's Handbag
          selectedColor: 'Midnight Black',
          role: '👜 Leather Tote',
          reason: 'Tuscan calfskin tote spacious enough for your daily tablet and essentials.'
        },
        {
          product: getProduct(15)!, // Chelsea Boots
          selectedColor: 'Black Calfskin',
          role: '👢 Footwear',
          reason: 'Goodyear-welted sleek boots for comfortable all-day city walking.'
        }
      ].filter((item) => Boolean(item.product))
    }
  ],

  datenight: [
    {
      id: 'date-night-women',
      title: "🥂 Romantic Evening Cocktail Look",
      tagline: 'Mulberry silk dress in Ruby Wine with delicate strappy heels.',
      description: 'Sensual and sophisticated. The ruby wine silk catches candlelight beautifully, accessorized with fine leather and gold details.',
      category: 'Women',
      items: [
        {
          product: getProduct(12)!, // Silk Midi Dress
          selectedColor: 'Ruby Wine',
          role: '👗 Evening Slip Dress',
          reason: 'Rich, passionate hue with fluid silk sheen and cowl contour.'
        },
        {
          product: getProduct(17)!, // Stiletto Sandals
          selectedColor: 'Sleek Black',
          role: '👠 Stiletto Sandals',
          reason: 'Tubular ankle wrap with padded memory foam for graceful posture.'
        },
        {
          product: getProduct(5)!, // Handbag
          selectedColor: 'Midnight Black',
          role: '👜 Statement Tote',
          reason: 'Polished gold hardware accentuating the deep wine silk dress.'
        },
        {
          product: getProduct(19)!, // Silk Scarf
          selectedColor: 'Burgundy / Cream',
          role: '🧣 Silk Accent',
          reason: 'Draped over shoulders or tied around handbag handle.'
        }
      ].filter((item) => Boolean(item.product))
    },
    {
      id: 'date-night-men',
      title: "🍷 Sophisticated Evening Date Attire",
      tagline: 'Classic jacket in Midnight Black with dark wash denim and Chelsea boots.',
      description: 'Effortlessly magnetic. Structured outerwear silhouette paired with dark selvedge denim and handcrafted leather.',
      category: 'Men',
      items: [
        {
          product: getProduct(1)!, // Classic Men's Jacket
          selectedColor: 'Midnight Black',
          role: '🧥 Outerwear',
          reason: 'Structured heavy cotton twill with clean hardware and matte finish.'
        },
        {
          product: getProduct(2)!, // Premium T-Shirt
          selectedColor: 'Charcoal',
          role: '👕 Base Layer',
          reason: 'Charcoal pima cotton provides a moody, modern monochrome vibe.'
        },
        {
          product: getProduct(3)!, // Slim Fit Jeans
          selectedColor: 'Washed Black',
          role: '👖 Denim',
          reason: 'Subtle whiskered washed black denim for modern edge.'
        },
        {
          product: getProduct(15)!, // Chelsea Boots
          selectedColor: 'Black Calfskin',
          role: '👞 Boots',
          reason: 'Streamlined leather boots giving clean continuous leg lines.'
        },
        {
          product: getProduct(18)!, // Chronograph Watch
          selectedColor: 'Silver / Black Leather',
          role: '⌚ Timepiece',
          reason: 'Classic diamond-cut dial on black Horween leather.'
        }
      ].filter((item) => Boolean(item.product))
    }
  ],

  summer: [
    {
      id: 'summer-vacation-women',
      title: "☀️ Riviera Vacation & Brunch Ensemble",
      tagline: 'Floral Emerald dress, aviator sunglasses, and strappy sandals.',
      description: 'Channel European coastal glam with breathable botanical silks, gold aviators, and artisan leather accessories.',
      category: 'Women',
      items: [
        {
          product: getProduct(4)!, // Summer Dress
          selectedColor: 'Floral Emerald',
          role: '👗 Summer Midi',
          reason: 'Breezy botanical print that stays cool under warm Mediterranean sun.'
        },
        {
          product: getProduct(9)!, // Sunglasses
          selectedColor: 'Gold / Emerald',
          role: '🕶️ Sunglasses',
          reason: 'Polarized emerald tint lenses that match the botanical flora.'
        },
        {
          product: getProduct(17)!, // Stiletto Sandals
          selectedColor: 'Metallic Gold',
          role: '👡 Sandals',
          reason: 'Refined metallic gleam for patio lunches and seaside promenades.'
        },
        {
          product: getProduct(5)!, // Handbag
          selectedColor: 'Cognac Tan',
          role: '👜 Handbag',
          reason: 'Rich cognac leather that anchors warm vacation tones.'
        }
      ].filter((item) => Boolean(item.product))
    },
    {
      id: 'summer-vacation-men',
      title: "🌊 Coastal Linen & Minimalist Sneakers",
      tagline: 'Normandy linen blazer, pima tee, selvedge denim, and clean white sneakers.',
      description: 'A crisp, breezy resort look suitable for yacht clubs, weekend getaways, and sunset rooftop drinks.',
      category: 'Men',
      items: [
        {
          product: getProduct(11)!, // Linen Blazer
          selectedColor: 'Sand Beige',
          role: '🧥 Linen Blazer',
          reason: 'Ultra-breathable open slub plain weave keeps temperature regulated.'
        },
        {
          product: getProduct(2)!, // Premium T-Shirt
          selectedColor: 'Sage',
          role: '👕 Summer Tee',
          reason: 'Subtle organic sage green complements warm sand tones.'
        },
        {
          product: getProduct(3)!, // Slim Fit Jeans
          selectedColor: 'Vintage Indigo',
          role: '👖 Jeans',
          reason: 'Sun-faded vintage indigo selvedge denim.'
        },
        {
          product: getProduct(6)!, // Casual Sneakers
          selectedColor: 'Crisp White',
          role: '👟 Leather Sneakers',
          reason: 'Minimalist low-top Nappa leather sneakers with orthotic comfort.'
        },
        {
          product: getProduct(9)!, // Sunglasses
          selectedColor: 'Gunmetal / Smoke',
          role: '🕶️ Sunglasses',
          reason: 'Titanium frame aviators neutralizing harsh daylight glare.'
        }
      ].filter((item) => Boolean(item.product))
    }
  ],

  streetwear: [
    {
      id: 'streetwear-cozy-urban',
      title: "🔥 Urban Minimalist Streetwear",
      tagline: 'Heavyweight French terry hoodie, washed denim, and gum-sole sneakers.',
      description: 'High-density 450 GSM organic loopback cotton paired with comfort-flex denim and architectural low-tops.',
      category: 'Unisex',
      items: [
        {
          product: getProduct(10)!, // Premium Hoodie
          selectedColor: 'Heather Gray',
          role: '🧥 Hoodie',
          reason: '450 GSM ultra-heavyweight cotton fleece with structured drape.'
        },
        {
          product: getProduct(3)!, // Slim Fit Jeans
          selectedColor: 'Washed Black',
          role: '👖 Denim',
          reason: 'Vintage faded black wash that matches street tones.'
        },
        {
          product: getProduct(6)!, // Casual Sneakers
          selectedColor: 'White/Gum',
          role: '👟 Sneakers',
          reason: 'Classic white leather with vulcanized amber gum outsoles.'
        },
        {
          product: getProduct(9)!, // Sunglasses
          selectedColor: 'Gunmetal / Smoke',
          role: '🕶️ Aviators',
          reason: 'Matte gunmetal frames for sleek modern edge.'
        }
      ].filter((item) => Boolean(item.product))
    }
  ],

  winter: [
    {
      id: 'winter-layering-luxury',
      title: "❄️ Highland Cashmere & Trench Layering",
      tagline: 'Mongolian cashmere knitwear under a weatherproof longline trench coat.',
      description: 'Masterclass in textural luxury. The water-repellent gabardine shields from cold rains while Mongolian cashmere traps insulating warmth.',
      category: 'Unisex',
      items: [
        {
          product: getProduct(20)!, // Trench Coat
          selectedColor: 'Classic Khaki',
          role: '🧥 Overcoat',
          reason: 'High-density weatherproof gabardine with belted waist and storm flaps.'
        },
        {
          product: getProduct(13)!, // Cashmere Sweater
          selectedColor: 'Charcoal',
          role: '🧶 Cashmere Layer',
          reason: '2-ply 12-gauge Grade-A cashmere for cloud-like softness.'
        },
        {
          product: getProduct(14)!, // Wide Leg Trousers
          selectedColor: 'Espresso Brown',
          role: '👖 Suiting Trousers',
          reason: 'Heavy wool blend suiting with sharp front pleats.'
        },
        {
          product: getProduct(15)!, // Chelsea Boots
          selectedColor: 'Dark Brown Suede',
          role: '👢 Suede Boots',
          reason: 'Treated water-resistant suede boots with British Dainite soles.'
        },
        {
          product: getProduct(19)!, // Silk Scarf
          selectedColor: 'Burgundy / Cream',
          role: '🧣 Silk Scarf',
          reason: 'Archival printed silk providing neck warmth and pop of color.'
        }
      ].filter((item) => Boolean(item.product))
    }
  ]
};

// Main AI Styling Recommendation Logic
export const generateStylistAdvice = (userQuery: string): AIResponse => {
  const query = userQuery.toLowerCase().trim();

  // 1. Wedding Questions (The primary user scenario)
  if (
    query.includes('wedding') ||
    query.includes('marriage') ||
    query.includes('shaadi') ||
    query.includes('groom') ||
    query.includes('bridal') ||
    query.includes('reception') ||
    query.includes('ceremony')
  ) {
    const isMen = query.includes('men') || query.includes('guy') || query.includes('groom') || query.includes('husband') || query.includes('suit') || query.includes('blazer');
    const isWomen = query.includes('women') || query.includes('dress') || query.includes('gown') || query.includes('girl') || query.includes('lady');

    let outfits = CURATED_ENSEMBLES.wedding;
    if (isMen) {
      outfits = outfits.filter((o) => o.category === 'Men');
    } else if (isWomen) {
      outfits = outfits.filter((o) => o.category === 'Women');
    }

    return {
      text: `🎉 **Stylist Recommendation for a Wedding:**

When attending a wedding, the key is striking the perfect balance between **refined elegance** and **tasteful individuality** without outshining the couple. 

Here are our top curated wedding ensembles featuring matching garments, complementary textures, and handcrafted footwear from our luxury collection:`,
      outfits: outfits,
      suggestions: [
        'How do I match shoes with this outfit?',
        'Show formal evening gala options',
        'Recommend women’s wedding dresses',
        'Recommend men’s tailored wedding suits'
      ]
    };
  }

  // 2. Business / Office / Interview
  if (
    query.includes('business') ||
    query.includes('office') ||
    query.includes('work') ||
    query.includes('interview') ||
    query.includes('meeting') ||
    query.includes('corporate') ||
    query.includes('formal')
  ) {
    const isMen = query.includes('men') || query.includes('guy') || query.includes('suit');
    const isWomen = query.includes('women') || query.includes('dress') || query.includes('lady');

    let outfits = CURATED_ENSEMBLES.business;
    if (isMen) outfits = outfits.filter((o) => o.category === 'Men');
    if (isWomen) outfits = outfits.filter((o) => o.category === 'Women');

    return {
      text: `💼 **Executive Business & Smart-Casual Looks:**

For professional settings, prioritize **impeccable tailoring**, **clean silhouettes**, and **breathable natural fibers** like Peruvian Pima cotton, European linen, and virgin wool.

Here are complete professional ensembles coordinated for maximum confidence:`,
      outfits: outfits,
      suggestions: [
        'What shoes work best for office meetings?',
        'Show summer vacation styles',
        'What accessories match navy suits?'
      ]
    };
  }

  // 3. Date Night / Dinner / Gala / Party
  if (
    query.includes('date') ||
    query.includes('dinner') ||
    query.includes('romantic') ||
    query.includes('party') ||
    query.includes('gala') ||
    query.includes('night out') ||
    query.includes('cocktail') ||
    query.includes('club')
  ) {
    return {
      text: `✨ **Curated Looks for Date Nights & Evening Soirées:**

For evenings, we recommend **rich jewel tones** (Ruby Wine, Midnight Navy, Onyx Black) paired with **lustrous textures** like Mulberry silk charmeuse, Tuscan leather, and brushed metallics.

Explore these handpicked matching ensembles:`,
      outfits: CURATED_ENSEMBLES.datenight,
      suggestions: [
        'What jewelry/watch matches the silk dress?',
        'Show casual daytime outfits',
        'How do I style Chelsea boots?'
      ]
    };
  }

  // 4. Summer / Vacation / Beach / Resort
  if (
    query.includes('summer') ||
    query.includes('vacation') ||
    query.includes('beach') ||
    query.includes('resort') ||
    query.includes('travel') ||
    query.includes('hot') ||
    query.includes('holiday')
  ) {
    return {
      text: `☀️ **Summer Vacation & Resort Wear Coordinates:**

For warm sunny days, focus on **airy botanical silks**, **open-weave linen**, **featherlight Pima cotton**, and **UV400 polarized aviators** for effortless style under the sun.`,
      outfits: CURATED_ENSEMBLES.summer,
      suggestions: [
        'Show sunglasses & accessory pairings',
        'What should I wear to a summer wedding?',
        'Recommend comfortable sneakers for walking'
      ]
    };
  }

  // 5. Streetwear / Casual / Cozy / Weekend
  if (
    query.includes('casual') ||
    query.includes('streetwear') ||
    query.includes('hoodie') ||
    query.includes('weekend') ||
    query.includes('everyday') ||
    query.includes('comfortable') ||
    query.includes('chill')
  ) {
    return {
      text: `👟 **Elevated Everyday Streetwear & Casual Chic:**

Upgrade your off-duty wardrobe with **heavyweight 450 GSM French terry**, **premium selvedge denim**, and **cushioned Nappa leather low-tops**.`,
      outfits: CURATED_ENSEMBLES.streetwear,
      suggestions: [
        'What sneakers go best with slim jeans?',
        'Show winter layering pieces',
        'Recommend men’s business casual'
      ]
    };
  }

  // 6. Winter / Cold / Fall / Trench Coat
  if (
    query.includes('winter') ||
    query.includes('cold') ||
    query.includes('rain') ||
    query.includes('autumn') ||
    query.includes('fall') ||
    query.includes('trench') ||
    query.includes('sweater') ||
    query.includes('jacket')
  ) {
    return {
      text: `❄️ **Luxury Winter & Autumn Layering:**

Combine **weatherproof cotton gabardine** with **Grade-A Mongolian cashmere** and **Goodyear-welted footwear** for warmth with sharp architectural lines.`,
      outfits: CURATED_ENSEMBLES.winter,
      suggestions: [
        'How do I care for cashmere?',
        'What shoes match the trench overcoat?',
        'Show formal evening looks'
      ]
    };
  }

  // 7. Product-Specific / Color Matching Query
  const matchedProduct = PRODUCTS.find((p) =>
    query.includes(p.name.toLowerCase()) ||
    query.includes(p.name.toLowerCase().replace("'", '')) ||
    (query.includes('jacket') && p.id === 1) ||
    (query.includes('t-shirt') && p.id === 2) ||
    (query.includes('jeans') && p.id === 3) ||
    (query.includes('summer dress') && p.id === 4) ||
    (query.includes('handbag') && p.id === 5) ||
    (query.includes('sneakers') && p.id === 6) ||
    (query.includes('running') && p.id === 7) ||
    (query.includes('belt') && p.id === 8) ||
    (query.includes('sunglasses') && p.id === 9) ||
    (query.includes('hoodie') && p.id === 10) ||
    (query.includes('blazer') && p.id === 11) ||
    (query.includes('silk dress') && p.id === 12) ||
    (query.includes('cashmere') && p.id === 13) ||
    (query.includes('trousers') && p.id === 14) ||
    (query.includes('chelsea') && p.id === 15) ||
    (query.includes('oxford') && p.id === 16) ||
    (query.includes('stiletto') && p.id === 17) ||
    (query.includes('watch') && p.id === 18) ||
    (query.includes('scarf') && p.id === 19) ||
    (query.includes('trench') && p.id === 20)
  );

  if (matchedProduct) {
    let pairingItems: OutfitItem[] = [
      {
        product: matchedProduct,
        selectedColor: matchedProduct.colors[0],
        role: `⭐ Featured Anchor: ${matchedProduct.category}`,
        reason: 'The centerpiece of your ensemble.'
      }
    ];

    if (matchedProduct.category === 'Men') {
      if (matchedProduct.id !== 3) {
        const jeans = getProduct(3);
        if (jeans) pairingItems.push({ product: jeans, selectedColor: 'Dark Wash', role: '👖 Matching Bottoms', reason: 'Tapered slim silhouette with dark indigo dye.' });
      }
      if (matchedProduct.id !== 16 && matchedProduct.id !== 15 && matchedProduct.id !== 6) {
        const shoes = getProduct(15) || getProduct(6);
        if (shoes) pairingItems.push({ product: shoes, selectedColor: shoes.colors[0], role: '👞 Footwear', reason: 'Handcrafted leather build with streamlined toe profile.' });
      }
      const watch = getProduct(18);
      if (watch) pairingItems.push({ product: watch, selectedColor: watch.colors[0], role: '⌚ Wristwear', reason: 'Polished steel finish for an executive touch.' });
    } else if (matchedProduct.category === 'Women') {
      if (matchedProduct.id !== 14 && (matchedProduct.id === 13 || matchedProduct.id === 20)) {
        const trousers = getProduct(14);
        if (trousers) pairingItems.push({ product: trousers, selectedColor: 'Black', role: '👖 Pleated Trousers', reason: 'Wide-leg tailored drape complementing structured top.' });
      }
      const shoes = getProduct(17) || getProduct(15);
      if (shoes) pairingItems.push({ product: shoes, selectedColor: shoes.colors[0], role: '👠 Footwear', reason: 'Cushioned footbed with flattering height.' });
      const bag = getProduct(5);
      if (bag) pairingItems.push({ product: bag, selectedColor: bag.colors[0], role: '👜 Handbag', reason: 'Full-grain calfskin leather matching the tone.' });
    } else if (matchedProduct.category === 'Shoes') {
      const top = getProduct(11) || getProduct(1) || getProduct(12);
      if (top) pairingItems.push({ product: top, selectedColor: top.colors[0], role: '👗 Top / Outfit', reason: 'Colors and styling designed to elevate your footwear.' });
      const accessory = getProduct(18) || getProduct(8) || getProduct(19);
      if (accessory) pairingItems.push({ product: accessory, selectedColor: accessory.colors[0], role: '✨ Coordinating Accent', reason: 'Matching leather/metallic tones to pull the look together.' });
    } else {
      const top = getProduct(1) || getProduct(12) || getProduct(20);
      if (top) pairingItems.push({ product: top, selectedColor: top.colors[0], role: '🧥 Core Garment', reason: 'Provides a rich neutral background for this accessory.' });
    }

    return {
      text: `🎨 **Styling Coordinated Outfit for "${matchedProduct.name}":**

To highlight your **${matchedProduct.name}**, balance it with complementary textures and harmonized accent pieces:`,
      outfits: [
        {
          id: `custom-pairing-${matchedProduct.id}`,
          title: `Coordinated Outfit with ${matchedProduct.name}`,
          tagline: `Curated style pairings designed for effortless elegance.`,
          description: `These matching pieces balance the proportions and color tones of the ${matchedProduct.name}.`,
          category: matchedProduct.category === 'Women' ? 'Women' : matchedProduct.category === 'Men' ? 'Men' : 'Unisex',
          items: pairingItems
        }
      ],
      suggestions: [
        'What should I wear for a wedding?',
        'Suggest casual everyday look',
        'Show more accessories'
      ]
    };
  }

  // 8. General Fashion Advice Fallback
  return {
    text: `👗 **Fashion World Virtual Stylist at Your Service!**

I can help you build head-to-toe matching outfits for any occasion, find complementary tops, bottoms, shoes, or coordinate specific colors from our collection.

Try asking me:
- *"What should I wear for a wedding?"*
- *"Suggest a smart business casual outfit for men"*
- *"What shoes and accessories match the Silk Midi Dress?"*
- *"Give me a chic summer vacation look"*`,
    outfits: [
      CURATED_ENSEMBLES.wedding[0],
      CURATED_ENSEMBLES.wedding[1]
    ],
    suggestions: [
      'What should I wear for a wedding?',
      'Suggest a business casual look',
      'Recommend date night outfits',
      'Show summer vacation styles'
    ]
  };
};
