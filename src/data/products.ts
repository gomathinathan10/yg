export type Format = "powder" | "granules" | "cake" | "combo" | "wellness" | "pooja";

export type Variant = {
  id: string;
  label: string;
  price: number;
  mrp?: number;
  stock?: number;
  image?: string;
  gallery?: string[];
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  format: Format;
  glutenFree: boolean;
  bestseller?: boolean;
  image: string;
  gallery: string[];
  description: string;
  ingredients: string;
  usage: string;
  shelfLife: string;
  variants: Variant[];
  /** false = sold out; visitors can then ask for a back-in-stock alert. */
  inStock?: boolean;
  /** Units left, when low enough to be worth showing. */
  stockLeft?: number;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  // 1. Y.G PREMIUM
  {
    slug: "premium-asafoetida-powder",
    name: "Y.G Premium Asafoetida Powder",
    tagline: "Master Chef's High-Concentration Compounded Hing Powder",
    format: "powder",
    glutenFree: false,
    bestseller: true,
    image: "/products/100g-premium-asafoetida-powder/img-1.jpg",
    gallery: [
      "/products/100g-premium-asafoetida-powder/img-1.jpg",
      "/products/50g-premium-asafoetida-powder/img-1.jpg",
      "/products/100g-premium-asafoetida-powder/img-2.jpg",
      "/products/50g-premium-asafoetida-powder/img-2.jpg",
      "/products/100g-premium-asafoetida-powder/img-3.jpg",
    ],
    description:
      "Superior chef-grade asafoetida with higher natural resin concentration for deep, pungent aroma and unmatched digestive tempering potency. Crafted according to age-old Tirunelveli traditions since 1931.",
    ingredients: "Selected Asafoetida (Ferula asafoetida), wheat flour, edible gum.",
    usage: "A small pinch in hot ghee is sufficient for a family curry.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "50g",
        label: "50 g",
        price: 195,
        mrp: 225,
        stock: 90,
        image: "/products/50g-premium-asafoetida-powder/img-1.jpg",
        gallery: [
          "/products/50g-premium-asafoetida-powder/img-1.jpg",
          "/products/50g-premium-asafoetida-powder/img-2.jpg",
          "/products/50g-premium-asafoetida-powder/img-3.jpg",
          "/products/50g-premium-asafoetida-powder/img-4.jpg",
        ],
      },
      {
        id: "100g",
        label: "100 g",
        price: 360,
        mrp: 410,
        stock: 110,
        image: "/products/100g-premium-asafoetida-powder/img-1.jpg",
        gallery: [
          "/products/100g-premium-asafoetida-powder/img-1.jpg",
          "/products/100g-premium-asafoetida-powder/img-2.jpg",
          "/products/100g-premium-asafoetida-powder/img-3.jpg",
          "/products/100g-premium-asafoetida-powder/img-4.jpg",
        ],
      },
      {
        id: "200g",
        label: "200 g",
        price: 680,
        mrp: 780,
        stock: 80,
        image: "/products/100g-premium-asafoetida-powder/img-1.jpg",
      },
      {
        id: "500g",
        label: "500 g",
        price: 1650,
        mrp: 1900,
        stock: 60,
        image: "/products/100g-premium-asafoetida-powder/img-1.jpg",
      },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 184,
  },

  // 2. Y.G GOLD
  {
    slug: "gold-asafoetida-powder",
    name: "Y.G Gold Asafoetida Powder",
    tagline: "Heritage Gold Compounded Asafoetida Powder",
    format: "powder",
    glutenFree: false,
    bestseller: true,
    image: "/products/100g-gold-asafoetida-powder/img-1.jpg",
    gallery: [
      "/products/100g-gold-asafoetida-powder/img-1.jpg",
      "/products/50g-gold-asafoetida-powder/img-1.jpg",
      "/products/500g-gold-asafoetida-powder/img-1.jpg",
      "/products/100g-gold-asafoetida-powder/img-2.jpg",
      "/products/50g-gold-asafoetida-powder/img-2.jpg",
    ],
    description:
      "Our signature Gold grade compounded hing powder crafted to age-old Tirunelveli traditions since 1931. Rich, intense aromatic profile that elevates every sambar, rasam, kootu, and tadka with wholesome flavor.",
    ingredients: "Selected Asafoetida (Ferula asafoetida), wheat flour, edible gum.",
    usage: "Add 1/4 teaspoon to hot ghee during tempering.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "50g",
        label: "50 g Tray",
        price: 85,
        mrp: 96,
        stock: 120,
        image: "/products/50g-gold-asafoetida-powder/img-1.jpg",
        gallery: [
          "/products/50g-gold-asafoetida-powder/img-1.jpg",
          "/products/50g-gold-asafoetida-powder/img-2.jpg",
          "/products/50g-gold-asafoetida-powder/img-3.jpg",
          "/products/50g-gold-asafoetida-powder/img-4.jpg",
        ],
      },
      {
        id: "100g",
        label: "100 g Tray",
        price: 165,
        mrp: 186,
        stock: 140,
        image: "/products/100g-gold-asafoetida-powder/img-1.jpg",
        gallery: [
          "/products/100g-gold-asafoetida-powder/img-1.jpg",
          "/products/100g-gold-asafoetida-powder/img-2.jpg",
          "/products/100g-gold-asafoetida-powder/img-3.jpg",
          "/products/100g-gold-asafoetida-powder/img-4.jpg",
        ],
      },
      {
        id: "200g",
        label: "200 g Container",
        price: 315,
        mrp: 350,
        stock: 80,
        image: "/products/100g-gold-asafoetida-powder/img-1.jpg",
      },
      {
        id: "500g",
        label: "500 g Pouch",
        price: 765,
        mrp: 850,
        stock: 60,
        image: "/products/500g-gold-asafoetida-powder/img-1.jpg",
        gallery: [
          "/products/500g-gold-asafoetida-powder/img-1.jpg",
          "/products/500g-gold-asafoetida-powder/img-2.jpg",
          "/products/500g-gold-asafoetida-powder/img-3.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 312,
  },

  // 3. GLUTEN FREE ("gluter tree")
  {
    slug: "gluten-free-asafoetida-powder",
    name: "Y.G Gluten Free Asafoetida Powder",
    tagline: "Pure Rice Flour Base — 100% Celiac Safe",
    format: "powder",
    glutenFree: true,
    bestseller: true,
    image: "/products/50g-gluten-free-asafoetida-powder/img-1.jpg",
    gallery: [
      "/products/50g-gluten-free-asafoetida-powder/img-1.jpg",
      "/products/50g-gluten-free-asafoetida-powder/img-2.jpg",
      "/products/50g-gluten-free-asafoetida-powder/img-3.jpg",
      "/products/50g-gluten-free-asafoetida-powder/img-4.jpg",
    ],
    description:
      "Made exclusively with pure rice flour base without wheat flour. Delivers authentic hing aroma for gluten-sensitive and celiac households.",
    ingredients: "Pure Asafoetida (Ferula asafoetida), rice flour, edible gum.",
    usage: "Use exactly like classic powder — 1/4 tsp per dish.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "50g",
        label: "50 g",
        price: 220,
        mrp: 250,
        stock: 65,
        image: "/products/50g-gluten-free-asafoetida-powder/img-1.jpg",
        gallery: [
          "/products/50g-gluten-free-asafoetida-powder/img-1.jpg",
          "/products/50g-gluten-free-asafoetida-powder/img-2.jpg",
        ],
      },
      {
        id: "100g",
        label: "100 g",
        price: 395,
        mrp: 450,
        stock: 75,
        image: "/products/50g-gluten-free-asafoetida-powder/img-2.jpg",
        gallery: [
          "/products/50g-gluten-free-asafoetida-powder/img-2.jpg",
          "/products/50g-gluten-free-asafoetida-powder/img-3.jpg",
          "/products/50g-gluten-free-asafoetida-powder/img-4.jpg",
        ],
      },
    ],
    inStock: true,
    stockLeft: 8,
    rating: 4.6,
    reviews: 96,
  },

  // 4. CRYSTAL / GRANULES
  {
    slug: "hing-pellets",
    name: "Y.G Crystal Asafoetida (Granules / Pellets)",
    tagline: "Crisp Granular Pellets for Curd Rice & Sambar Tempering",
    format: "granules",
    glutenFree: false,
    bestseller: false,
    image: "/products/hing-pellets/img-1.jpg",
    gallery: [
      "/products/hing-pellets/img-1.jpg",
      "/products/hing-pellets/img-2.jpg",
      "/products/hing-pellets/img-3.jpg",
      "/products/hing-pellets/img-4.jpg",
    ],
    description:
      "Free-flowing, crisp hing pellets that dissolve smoothly and puff lightly during tempering. The ideal choice for curd rice, buttermilk, vathal kuzhambu, and potato roasts.",
    ingredients: "Selected Asafoetida (Ferula asafoetida), wheat flour, edible gum.",
    usage: "Crush a pellet or drop whole into hot ghee during tadka.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "50g",
        label: "50 g",
        price: 250,
        mrp: 290,
        stock: 55,
        image: "/products/hing-pellets/img-1.jpg",
        gallery: [
          "/products/hing-pellets/img-1.jpg",
          "/products/hing-pellets/img-2.jpg",
        ],
      },
      {
        id: "100g",
        label: "100 g",
        price: 475,
        mrp: 540,
        stock: 60,
        image: "/products/hing-pellets/img-3.jpg",
        gallery: [
          "/products/hing-pellets/img-3.jpg",
          "/products/hing-pellets/img-4.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.5,
    reviews: 65,
  },

  // 5. PREMIUM CAKE
  {
    slug: "premium-asafoetida-cake",
    name: "Y.G Premium Asafoetida Cake (Pindi Hing)",
    tagline: "Master Grade Solid Block Pindi Hing for Pickles & Gravies",
    format: "cake",
    glutenFree: false,
    bestseller: false,
    image: "/products/100g-asafoetida-gold-cake/img-1.jpg",
    gallery: [
      "/products/100g-asafoetida-gold-cake/img-1.jpg",
      "/products/50g-asafoetida-gold-cake/img-1.jpg",
      "/products/100g-asafoetida-gold-cake/img-3.jpg",
      "/products/50g-asafoetida-gold-cake/img-3.jpg",
    ],
    description:
      "High-potency solid block pindi hing. Shave or scrape a small flake into hot ghee to release intense, unbroken culinary fragrance, or soak in warm water for aromatic gravy infusion.",
    ingredients: "Selected Asafoetida (Ferula asafoetida), wheat flour, edible gum.",
    usage: "Shave a pea-sized piece into tempering or dissolve in 2 tbsp warm water.",
    shelfLife: "12 months from packing. Keep wrapped in foil inside airtight container.",
    variants: [
      {
        id: "50g",
        label: "50 g Cake",
        price: 120,
        mrp: 140,
        stock: 80,
        image: "/products/50g-asafoetida-gold-cake/img-1.jpg",
        gallery: [
          "/products/50g-asafoetida-gold-cake/img-1.jpg",
          "/products/50g-asafoetida-gold-cake/img-3.jpg",
          "/products/50g-asafoetida-gold-cake/img-4.jpg",
        ],
      },
      {
        id: "100g",
        label: "100 g Cake",
        price: 220,
        mrp: 250,
        stock: 90,
        image: "/products/100g-asafoetida-gold-cake/img-1.jpg",
        gallery: [
          "/products/100g-asafoetida-gold-cake/img-1.jpg",
          "/products/100g-asafoetida-gold-cake/img-3.jpg",
          "/products/100g-asafoetida-gold-cake/img-4.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 104,
  },

  // 6. GOLD CAKE
  {
    slug: "asafoetida-gold-cake",
    name: "Y.G Gold Asafoetida Cake (Pindi Hing)",
    tagline: "Solid Block Pindi Hing for Pickles & Traditional Tadka",
    format: "cake",
    glutenFree: false,
    bestseller: false,
    image: "/products/100g-asafoetida-gold-cake/img-2.jpg",
    gallery: [
      "/products/100g-asafoetida-gold-cake/img-2.jpg",
      "/products/50g-asafoetida-gold-cake/img-2.jpg",
      "/products/100g-asafoetida-gold-cake/img-5.jpg",
      "/products/50g-asafoetida-gold-cake/img-5.jpg",
    ],
    description:
      "Pure concentrated hing cake block. Scrape or shave a small flake into hot ghee or tempering to release intense, unbroken culinary fragrance, or soak in warm water for aromatic gravy infusion.",
    ingredients: "Selected Asafoetida (Ferula asafoetida), wheat flour, edible gum.",
    usage: "Shave a pea-sized piece into tempering or dissolve in 2 tbsp warm water.",
    shelfLife: "12 months from packing. Keep wrapped in foil inside airtight container.",
    variants: [
      {
        id: "50g",
        label: "50 g Cake",
        price: 78,
        mrp: 86,
        stock: 90,
        image: "/products/50g-asafoetida-gold-cake/img-2.jpg",
        gallery: [
          "/products/50g-asafoetida-gold-cake/img-2.jpg",
          "/products/50g-asafoetida-gold-cake/img-5.jpg",
          "/products/50g-asafoetida-gold-cake/img-6.jpg",
        ],
      },
      {
        id: "100g",
        label: "100 g Cake",
        price: 148,
        mrp: 164,
        stock: 110,
        image: "/products/100g-asafoetida-gold-cake/img-2.jpg",
        gallery: [
          "/products/100g-asafoetida-gold-cake/img-2.jpg",
          "/products/100g-asafoetida-gold-cake/img-5.jpg",
          "/products/100g-asafoetida-gold-cake/img-6.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 142,
  },

  // 7. HEALTH MIX
  {
    slug: "traditional-health-mix",
    name: "Y.G Traditional Health Mix (Sathu Maavu)",
    tagline: "18 Multigrain Energy Porridge with Millets, Pulses & Nuts",
    format: "wellness",
    glutenFree: false,
    bestseller: true,
    image: "/products/traditional-health-mix/img-1.jpg",
    gallery: [
      "/products/traditional-health-mix/img-1.jpg",
      "/products/traditional-health-mix/img-2.jpg",
      "/products/traditional-health-mix/img-3.jpg",
      "/products/traditional-health-mix/img-4.jpg",
      "/products/traditional-health-mix/img-5.jpg",
      "/products/traditional-health-mix/img-6.jpg",
      "/products/traditional-health-mix/img-7.jpg",
    ],
    description:
      "Handcrafted traditional Sathu Maavu multigrain porridge mix slowly dry-roasted on wood-fired irons and stone-ground from 18 traditional grains, pulses, millets, cardamom, and roasted nuts. Ideal daily morning nourishment for all ages.",
    ingredients: "Ragi, Kambu (Pearl Millet), Red Rice, Roasted Gram, Green Gram, Wheat, Sorghum, Almonds, Cashews, Cardamom, Dry Ginger.",
    usage: "Mix 2 tbsp in 250ml water or milk, simmer for 3-5 minutes with country jaggery or salt & buttermilk.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "200g",
        label: "200 g",
        price: 140,
        mrp: 165,
        stock: 90,
        image: "/products/traditional-health-mix/img-1.jpg",
        gallery: [
          "/products/traditional-health-mix/img-1.jpg",
          "/products/traditional-health-mix/img-3.jpg",
          "/products/traditional-health-mix/img-4.jpg",
        ],
      },
      {
        id: "500g",
        label: "500 g",
        price: 320,
        mrp: 380,
        stock: 65,
        image: "/products/traditional-health-mix/img-2.jpg",
        gallery: [
          "/products/traditional-health-mix/img-2.jpg",
          "/products/traditional-health-mix/img-5.jpg",
          "/products/traditional-health-mix/img-6.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 115,
  },

  // 8. SAMBRANI
  {
    slug: "pure-benzoin-sambrani",
    name: "Y.G Pure Natural Benzoin (Pooja Sambrani)",
    tagline: "Sacred Temple Loban Resin for Puja & Daily Fragrance",
    format: "pooja",
    glutenFree: true,
    bestseller: true,
    image: "/products/pure-benzoin-sambrani/img-1.png",
    gallery: [
      "/products/pure-benzoin-sambrani/img-1.png",
      "/products/pure-benzoin-sambrani/img-2.jpg",
      "/products/pure-benzoin-sambrani/img-3.jpg",
      "/products/pure-benzoin-sambrani/img-4.jpg",
    ],
    description:
      "Pure natural Benzoin resin (Loban / Paal Sambrani) sourced directly from natural balsamic trees. Produces divine, authentic temple aroma and clears airborne impurities when sprinkled on glowing charcoal.",
    ingredients: "100% Pure Natural Benzoin Resin (Styrax benzoin).",
    usage: "Sprinkle a small piece onto glowing coconut shell charcoal or dhoop burner.",
    shelfLife: "12 months from packing. Store in a dry place.",
    variants: [
      {
        id: "50g",
        label: "50 g",
        price: 160,
        mrp: 190,
        stock: 95,
        image: "/products/pure-benzoin-sambrani/img-1.png",
      },
      {
        id: "100g",
        label: "100 g",
        price: 290,
        mrp: 350,
        stock: 50,
        image: "/products/pure-benzoin-sambrani/img-2.jpg",
      },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 89,
  },

  // 9. IDLY PODI (Vismaya Products)
  {
    slug: "traditional-idli-podi",
    name: "Vismaya Traditional Idli Chutney Podi",
    tagline: "Artisanal Wood-Roasted Gunpowder with Pure Hing & Lentils",
    format: "powder",
    glutenFree: false,
    bestseller: true,
    image: "/products/traditional-idli-podi/img-1.jpg",
    gallery: [
      "/products/traditional-idli-podi/img-1.jpg",
      "/products/traditional-idli-podi/img-2.jpg",
      "/products/traditional-idli-podi/img-3.jpg",
      "/products/traditional-idli-podi/img-4.jpg",
    ],
    description:
      "Grandmother's heritage recipe of slow-roasted urad dal, chana dal, sun-dried Guntur chillies, fresh curry leaves, and a generous pinch of authentic Y.G compounded hing. Coarsely ground for the signature crunchy texture that pairs exquisitely with hot idlis, crispy dosas, and melted ghee.",
    ingredients: "Urad Dal, Chana Dal, Dry Red Chillies, White Sesame, Curry Leaves, Y.G Compounded Asafoetida, Rock Salt.",
    usage: "Mix 1-2 tbsp with hot melted A2 ghee as a dip for idlis and dosas.",
    shelfLife: "12 months from packing. Keep jar sealed.",
    variants: [
      {
        id: "200g",
        label: "200 g",
        price: 135,
        mrp: 160,
        stock: 110,
        image: "/products/traditional-idli-podi/img-1.jpg",
        gallery: [
          "/products/traditional-idli-podi/img-1.jpg",
          "/products/traditional-idli-podi/img-2.jpg",
          "/products/traditional-idli-podi/img-3.jpg",
          "/products/traditional-idli-podi/img-4.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 138,
  },

  // 10. ELLU PODI (Vismaya Products)
  {
    slug: "traditional-ellu-podi",
    name: "Vismaya Traditional Ellu Podi (Black Sesame)",
    tagline: "Sun-Dried High-Calcium Black Sesame Chutney Podi",
    format: "powder",
    glutenFree: true,
    bestseller: true,
    image: "/products/black-sesame-seeds/img-1.jpg",
    gallery: [
      "/products/black-sesame-seeds/img-1.jpg",
      "/products/black-sesame-seeds/img-2.jpg",
      "/products/black-sesame-seeds/img-3.jpg",
      "/products/black-sesame-seeds/img-4.jpg",
    ],
    description:
      "Authentic South Indian Black Sesame (Karuppu Ellu) podi slow-roasted with country spices and lentils. Rich in natural calcium, iron, and deep aroma. Ideal for steaming hot rice with gingelly oil or as a side for idlis.",
    ingredients: "Pure Sun-Dried Black Sesame Seeds, Urad Dal, Chana Dal, Red Chillies, Y.G Asafoetida, Rock Salt.",
    usage: "Mix 1-2 tbsp with hot rice and sesame oil or melted ghee.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "200g",
        label: "200 g",
        price: 145,
        mrp: 170,
        stock: 100,
        image: "/products/black-sesame-seeds/img-1.jpg",
        gallery: [
          "/products/black-sesame-seeds/img-1.jpg",
          "/products/black-sesame-seeds/img-2.jpg",
          "/products/black-sesame-seeds/img-3.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.6,
    reviews: 72,
  },

  // 11. VISMAYA KODO MILLET PONGAL MIX (Renamed from Pongal)
  {
    slug: "vismaya-kodo-millet-pongal-mix",
    name: "Vismaya Kodo Millet Pongal Mix",
    tagline: "Nutrient-Dense Wholesome Kodo Millet & Moong Dal Breakfast Blend",
    format: "wellness",
    glutenFree: true,
    bestseller: true,
    image: "/products/millet-pongal-mix/img-1.jpg",
    gallery: [
      "/products/millet-pongal-mix/img-1.jpg",
      "/products/millet-pongal-mix/img-2.jpg",
    ],
    description:
      "A hearty, low-glycemic traditional South Indian breakfast blend combining unpolished Kodo millet with yellow moong dal, crushed Tellicherry black pepper, cumin seeds, roasted cashews, and ginger. Cooks into a piping-hot, comforting Ven Pongal in under 10 minutes.",
    ingredients: "Kodo Millet (Varagu), Yellow Moong Dal, Crushed Black Pepper, Cumin Seeds, Whole Cashews, Ginger, Curry Leaves, Y.G Pure Hing, Salt.",
    usage: "Pressure cook 1 cup mix with 3.5 cups water for 3 whistles. Top with 1 spoon hot ghee.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "250g",
        label: "250 g",
        price: 125,
        mrp: 150,
        stock: 85,
        image: "/products/millet-pongal-mix/img-1.jpg",
        gallery: [
          "/products/millet-pongal-mix/img-1.jpg",
          "/products/millet-pongal-mix/img-2.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.5,
    reviews: 54,
  },

  // 12. VISMAYA KODO MILLET SAMBAR MIX
  {
    slug: "vismaya-kodo-millet-sambar-mix",
    name: "Vismaya Kodo Millet Sambar Mix",
    tagline: "Authentic Tirunelveli Sambar Rice with Ancient Kodo Millet & Spices",
    format: "wellness",
    glutenFree: false,
    bestseller: true,
    image: "/products/millet-sambar-mix/img-1.jpg",
    gallery: [
      "/products/millet-sambar-mix/img-1.jpg",
      "/products/millet-sambar-mix/img-2.jpg",
    ],
    description:
      "One-pot nourishing South Indian comfort food crafted with Kodo millet, protein-rich toor dal, and an artisanal roasted spice blend infused with tangy tamarind and signature Y.G asafoetida.",
    ingredients: "Kodo Millet (Varagu), Toor Dal, Roasted Coriander, Red Chillies, Cumin, Fenugreek, Tamarind, Turmeric, Y.G Compounded Hing, Rock Salt.",
    usage: "Add 1 cup mix to 4 cups boiling water in a pressure cooker with vegetables, cook for 3 whistles, finish with ghee.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      {
        id: "250g",
        label: "250 g",
        price: 130,
        mrp: 155,
        stock: 90,
        image: "/products/millet-sambar-mix/img-1.jpg",
        gallery: [
          "/products/millet-sambar-mix/img-1.jpg",
          "/products/millet-sambar-mix/img-2.jpg",
        ],
      },
    ],
    inStock: true,
    rating: 4.6,
    reviews: 49,
  },

  // 13. CRISPY PRODUCTS: APPALAM
  {
    slug: "crispy-appalam",
    name: "Y.G Crispy Appalam",
    tagline: "Traditional Hand-Rolled Sun-Dried Papadum",
    format: "wellness",
    glutenFree: false,
    bestseller: false,
    image: "",
    gallery: [],
    description:
      "Traditional handcrafted sun-dried appalam rolled thin with premium urad dal and seasoned with a touch of pure asafoetida. Deep fries into an irresistibly crisp, golden accompaniment for sambar and rasam rice.",
    ingredients: "Urad Dal Flour, Edible Vegetable Oil, Sodium Bicarbonate, Asafoetida, Salt.",
    usage: "Deep fry in hot oil for 3-5 seconds until golden and crisp, or roast over direct flame.",
    shelfLife: "9 months from packing. Keep sealed in a moisture-free pouch.",
    variants: [
      { id: "100g", label: "100 g", price: 45, mrp: 55, stock: 150 },
      { id: "200g", label: "200 g", price: 85, mrp: 100, stock: 120 },
      { id: "300g", label: "300 g", price: 120, mrp: 145, stock: 100 },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 62,
  },

  // 14. VISMAYA ANDHRA SPL PARUPPU PODI
  {
    slug: "vismaya-andhra-spl-paruppu-podi",
    name: "Vismaya Andhra Spl Paruppu Podi",
    tagline: "Fiery Guntur-Style Roasted Dal & Spices Podi for Rice & Ghee",
    format: "powder",
    glutenFree: false,
    bestseller: false,
    image: "",
    gallery: [],
    description:
      "Authentic spicy Andhra style Kandi Podi slow-roasted with select toor dal, roasted gram, fiery Guntur red chillies, cumin, and fragrant garlic hints. Best savoured over steaming hot sona masoori rice with a generous spoonful of country ghee.",
    ingredients: "Toor Dal, Roasted Gram, Guntur Red Chillies, Cumin, Garlic, Asafoetida, Rock Salt.",
    usage: "Mix 1-2 spoons with piping hot rice and melted ghee.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "200g", label: "200 g", price: 140, mrp: 165, stock: 80 },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 45,
  },

  // 15. VISMAYA TIRUNELVELI SPL PARUPPU PODI
  {
    slug: "vismaya-tirunelveli-spl-paruppu-podi",
    name: "Vismaya Tirunelveli Spl Paruppu Podi",
    tagline: "Heritage Thamirabarani Roasted Lentil & Cumin Podi",
    format: "powder",
    glutenFree: false,
    bestseller: false,
    image: "",
    gallery: [],
    description:
      "Classic Tirunelveli style paruppu podi created with golden roasted toor and moong lentils, black pepper, cumin seeds, fresh curry leaves, and our signature Y.G compounded hing. Mild, comforting, and deeply nourishing.",
    ingredients: "Toor Dal, Moong Dal, Black Pepper, Cumin, Curry Leaves, Y.G Compounded Asafoetida, Rock Salt.",
    usage: "Mix with hot rice and ghee or sesame oil.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "200g", label: "200 g", price: 140, mrp: 165, stock: 85 },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 58,
  },

  // 16. VISMAYA MULTI MILLET ADAI DOSA MIX
  {
    slug: "vismaya-multi-millet-adai-dosa-mix",
    name: "Vismaya Multi Millet Adai Dosa Mix",
    tagline: "High-Protein Native Millets & Multigrain Crispy Pancake Blend",
    format: "wellness",
    glutenFree: false,
    bestseller: false,
    image: "",
    gallery: [],
    description:
      "Nutrient-dense traditional South Indian Adai mix combining unpolished Foxtail, Kodo, and Little millets with four hearty pulses (chana, toor, urad, moong), red chillies, and ginger. Makes crispy, golden, protein-packed adai dosas without long soaking.",
    ingredients: "Kodo Millet, Foxtail Millet, Little Millet, Chana Dal, Toor Dal, Urad Dal, Red Chillies, Hing, Ginger, Rock Salt.",
    usage: "Mix 1 cup with 1 cup water, rest for 15 mins, and pour thick dosas on hot tawa with oil or butter.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "500g", label: "500 g", price: 175, mrp: 210, stock: 70 },
    ],
    inStock: true,
    rating: 4.6,
    reviews: 38,
  },

  // 17. VISMAYA MORINGA PARUPPU PODI
  {
    slug: "vismaya-moringa-paruppu-podi",
    name: "Vismaya Moringa Paruppu Podi (Murungai Keerai)",
    tagline: "Iron-Rich Sun-Dried Drumstick Leaves & Roasted Lentils",
    format: "powder",
    glutenFree: false,
    bestseller: false,
    image: "",
    gallery: [],
    description:
      "Handcrafted restorative podi blending shade-dried farm-fresh Moringa (Murungai) leaves with slow-roasted lentils and digestive spices. Rich in bio-available iron, calcium, and natural vitamins.",
    ingredients: "Moringa Leaves (Murungai Keerai), Toor Dal, Roasted Gram, Red Chillies, Cumin, Hing, Rock Salt.",
    usage: "Sprinkle over hot rice with ghee, or use as a nutrition-rich seasoning on dosas.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "200g", label: "200 g", price: 150, mrp: 180, stock: 75 },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 52,
  },

  // 18. VISMAYA CURRY LEAVES PARUPPU PODI
  {
    slug: "vismaya-curry-leaves-paruppu-podi",
    name: "Vismaya Curry Leaves Paruppu Podi (Karuveppilai)",
    tagline: "Fragrant Roasted Karuveppilai & Spiced Lentil Rice Mix",
    format: "powder",
    glutenFree: false,
    bestseller: false,
    image: "",
    gallery: [],
    description:
      "Intensely aromatic traditional Karuveppilai Podi made from freshly harvested, slow-roasted curry leaves combined with urad dal, pepper, cumin, and hing. Known in traditional Siddha and Ayurveda for healthy hair and digestion.",
    ingredients: "Fresh Sun-Dried Curry Leaves, Toor Dal, Urad Dal, Black Pepper, Cumin, Asafoetida, Rock Salt.",
    usage: "Mix with hot cooked rice and cold-pressed sesame oil.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "200g", label: "200 g", price: 150, mrp: 180, stock: 80 },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 41,
  },

  // 19. VISMAYA PIRANDAI PARUPPU PODI
  {
    slug: "vismaya-pirandai-paruppu-podi",
    name: "Vismaya Pirandai Paruppu Podi (Adamant Creeper)",
    tagline: "Ancient Bone-Health & Digestive Tonic Herbal Podi",
    format: "powder",
    glutenFree: false,
    bestseller: false,
    image: "",
    gallery: [],
    description:
      "Traditional Tamil medicinal recipe prepared with purified Pirandai (Veldt Grape / Cissus quadrangularis) slow-cooked to eliminate itching, and stone-ground with roasted lentils, tamarind, and aromatic spices. Revered for joint health and digestive fire.",
    ingredients: "Purified Pirandai (Veldt Grape), Roasted Toor Dal, Pepper, Cumin, Tamarind, Pure Hing, Rock Salt.",
    usage: "Consume 1-2 spoons mixed with warm rice and ghee twice a week.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "200g", label: "200 g", price: 160, mrp: 190, stock: 65 },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 67,
  },

  // 20. HING CHIPS
  {
    slug: "hing-chips",
    name: "Y.G Hing Chips (Flakes / Khada)",
    tagline: "Sun-Dried Asafoetida Flakes — Slow Blooming Flavor",
    format: "granules",
    glutenFree: false,
    bestseller: false,
    image: "/products/hing-chips/img-1.jpg",
    gallery: [
      "/products/hing-chips/img-1.jpg",
      "/products/hing-chips/img-2.jpg",
    ],
    description:
      "Coarse sun-cured hing flakes that bloom slowly in sizzling ghee, infusing sambars, curries, and rasams with deep, lingering flavor.",
    ingredients: "Selected Asafoetida (Ferula foetida resin), wheat flour, edible gum.",
    usage: "Drop 2-3 flakes into warm ghee before adding spices.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "50g", label: "50 g", price: 260, mrp: 300, stock: 45 },
      { id: "100g", label: "100 g", price: 490, mrp: 560, stock: 50 },
    ],
    inStock: true,
    rating: 4.6,
    reviews: 78,
  },

  // 21. BOTTLE JAR
  {
    slug: "bottle-jar-asafoetida",
    name: "Y.G Heritage Bottle Jar Asafoetida",
    tagline: "Collector's Glass Bottle Jar with Airtight Aroma Seal",
    format: "powder",
    glutenFree: false,
    bestseller: true,
    image: "/products/bottle-jar/img-1.jpg",
    gallery: [
      "/products/bottle-jar/img-1.jpg",
      "/products/bottle-jar/img-2.jpg",
      "/products/bottle-jar/img-3.jpg",
      "/products/bottle-jar/img-4.jpg",
      "/products/bottle-jar/img-5.jpg",
    ],
    description:
      "Presented in our signature airtight glass bottle jar with hermetic seal to preserve volatile aroma and freshness for years. Reusable and collector-worthy.",
    ingredients: "Compounded Asafoetida (Ferula asafoetida), wheat flour, edible gum.",
    usage: "Keep on kitchen counter for easy daily spooning.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "100g", label: "100 g Glass Jar", price: 380, mrp: 440, stock: 40 },
      { id: "250g", label: "250 g Glass Jar", price: 850, mrp: 990, stock: 30 },
    ],
    inStock: true,
    rating: 4.9,
    reviews: 218,
  },

  // 22. PURE RAW HING
  {
    slug: "pure-raw-hing",
    name: "Y.G Pure Raw Hing Lump (Kashmiri Resin)",
    tagline: "100% Uncut Natural Ferula Gum Resin",
    format: "cake",
    glutenFree: false,
    bestseller: false,
    image: "/products/hing/img-1.jpg",
    gallery: [
      "/products/hing/img-1.jpg",
      "/products/hing/img-2.jpg",
      "/products/hing/img-3.jpg",
      "/products/hing/img-4.jpg",
      "/products/hing/img-5.jpg",
    ],
    description:
      "The raw, unadulterated gum oleoresin directly harvested from the mountain roots of Ferula. Extremely potent and medicinal — a microscopic piece will transform an entire banquet.",
    ingredients: "100% Raw Asafoetida Oleoresin (Ferula foetida). Zero additives.",
    usage: "Scrape a tiny pinhead amount and dissolve in warm liquid.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "25g", label: "25 g Raw Lump", price: 390, mrp: 450, stock: 35 },
      { id: "50g", label: "50 g Raw Lump", price: 720, mrp: 820, stock: 40 },
      { id: "100g", label: "100 g Raw Lump", price: 1350, mrp: 1550, stock: 25 },
    ],
    inStock: true,
    rating: 4.7,
    reviews: 58,
  },

  // 23. ALL PRODUCT HERITAGE COMBO
  {
    slug: "all-product-heritage-combo",
    name: "Y.G Complete Heritage Asafoetida Combo",
    tagline: "Grand All-in-One Collection Box with Spoon & Notes",
    format: "combo",
    glutenFree: false,
    bestseller: true,
    image: "/products/all-product/img-1.jpg",
    gallery: [
      "/products/all-product/img-1.jpg",
      "/products/all-product/img-2.jpg",
      "/products/all-product/img-3.jpg",
      "/products/all-product/img-4.jpg",
      "/products/all-product/img-5.jpg",
      "/products/all-product/img-6.jpg",
    ],
    description:
      "The definitive Y.G tasting experience containing Gold Powder, Premium Cake, Pellets, Chips, and Bottle Jar alongside an engraved brass spoon and heritage recipe cards.",
    ingredients: "Contains: Gold Powder (100g), Cake (50g), Pellets (50g), Chips (50g), Brass Spoon.",
    usage: "The ultimate culinary gift for gourmet cooks and heritage lovers.",
    shelfLife: "12 months from packing. Store in an airtight container.",
    variants: [
      { id: "4in1", label: "4-in-1 Heritage Box", price: 999, mrp: 1299, stock: 50 },
      { id: "deluxe", label: "Deluxe Hamper Box", price: 1799, mrp: 2299, stock: 30 },
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
];

export const formatLabels: Record<Format, string> = {
  powder: "Powder",
  granules: "Granules",
  cake: "Cake",
  combo: "Gift & combo",
  wellness: "Health Mix",
  pooja: "Pooja Sambrani",
};

/** Simple relevance search over name, tagline, format and description. */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  return products
    .map((p) => {
      const haystack = [p.name, p.tagline, formatLabels[p.format], p.description]
        .join(" ")
        .toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (p.name.toLowerCase().includes(t)) score += 3;
        else if (haystack.includes(t)) score += 1;
      }
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

export function getProduct(slug: string) {
  // Support slug aliases
  if (slug === "millet-pongal-mix") {
    return products.find((p) => p.slug === "vismaya-kodo-millet-pongal-mix") || products.find((p) => p.slug === slug);
  }
  if (slug === "millet-sambar-mix") {
    return products.find((p) => p.slug === "vismaya-kodo-millet-sambar-mix") || products.find((p) => p.slug === slug);
  }
  if (slug === "black-sesame-seeds") {
    return products.find((p) => p.slug === "traditional-ellu-podi") || products.find((p) => p.slug === slug);
  }
  return products.find((p) => p.slug === slug);
}

export function formatPrice(paise?: number | string | null) {
  if (paise === undefined || paise === null || isNaN(Number(paise))) {
    return "₹0";
  }
  const num = Number(paise);
  return `₹${num.toLocaleString("en-IN")}`;
}
