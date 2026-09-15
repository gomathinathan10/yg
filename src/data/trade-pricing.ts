export type TradeProduct = {
  id: string;
  name: string;
  category: "powder" | "cake";
  categoryLabel: string;
  packType: "Cover" | "Tray" | "Container" | "Bag" | "Pouch";
  packQty: number;
  cfPrice: number;
  mtPrice: number | null;
  directPrice: number | null;
  distPrice: number;
  ssPrice: number;
  mrp: number;
  slug: string;
  weightGrams: number;
};

export const TRADE_PRODUCTS: TradeProduct[] = [
  {
    id: "yg-gold-pwd-10g",
    name: "10G YG GOLD POWDER COVER",
    category: "powder",
    categoryLabel: "YG Gold Powder",
    packType: "Cover",
    packQty: 10,
    cfPrice: 6.0,
    mtPrice: null,
    directPrice: null,
    distPrice: 12.0,
    ssPrice: 10.8,
    mrp: 20,
    slug: "gold-asafoetida-powder",
    weightGrams: 10,
  },
  {
    id: "yg-gold-pwd-20g",
    name: "20G YG GOLD POWDER COVER",
    category: "powder",
    categoryLabel: "YG Gold Powder",
    packType: "Cover",
    packQty: 10,
    cfPrice: 12.0,
    mtPrice: null,
    directPrice: null,
    distPrice: 24.0,
    ssPrice: 21.6,
    mrp: 40,
    slug: "gold-asafoetida-powder",
    weightGrams: 20,
  },
  {
    id: "yg-gold-pwd-50g",
    name: "50G YG GOLD POWDER TRAY",
    category: "powder",
    categoryLabel: "YG Gold Powder",
    packType: "Tray",
    packQty: 20,
    cfPrice: 28.8,
    mtPrice: 38.4,
    directPrice: 38.4,
    distPrice: 57.6,
    ssPrice: 51.84,
    mrp: 96,
    slug: "gold-asafoetida-powder",
    weightGrams: 50,
  },
  {
    id: "yg-gold-pwd-100g",
    name: "100G YG GOLD POWDER TRAY",
    category: "powder",
    categoryLabel: "YG Gold Powder",
    packType: "Tray",
    packQty: 10,
    cfPrice: 55.8,
    mtPrice: 74.4,
    directPrice: 74.4,
    distPrice: 111.6,
    ssPrice: 100.44,
    mrp: 186,
    slug: "gold-asafoetida-powder",
    weightGrams: 100,
  },
  {
    id: "yg-gold-pwd-200g",
    name: "200G YG GOLD POWDER / CONTAINER",
    category: "powder",
    categoryLabel: "YG Gold Powder",
    packType: "Container",
    packQty: 1,
    cfPrice: 105.0,
    mtPrice: 140.0,
    directPrice: 140.0,
    distPrice: 210.0,
    ssPrice: 189.0,
    mrp: 350,
    slug: "gold-asafoetida-powder",
    weightGrams: 200,
  },
  {
    id: "yg-gold-cake-25g",
    name: "25G YG GOLD CAKE BAG",
    category: "cake",
    categoryLabel: "YG Gold Cake",
    packType: "Bag",
    packQty: 40,
    cfPrice: 13.8,
    mtPrice: 18.4,
    directPrice: 18.4,
    distPrice: 27.6,
    ssPrice: 24.84,
    mrp: 46,
    slug: "asafoetida-gold-cake",
    weightGrams: 25,
  },
  {
    id: "yg-gold-cake-50g",
    name: "50G YG GOLD CAKE BAG",
    category: "cake",
    categoryLabel: "YG Gold Cake",
    packType: "Bag",
    packQty: 40,
    cfPrice: 25.8,
    mtPrice: 34.4,
    directPrice: 34.4,
    distPrice: 51.6,
    ssPrice: 46.44,
    mrp: 86,
    slug: "asafoetida-gold-cake",
    weightGrams: 50,
  },
  {
    id: "yg-gold-cake-100g",
    name: "100G YG GOLD CAKE BAG",
    category: "cake",
    categoryLabel: "YG Gold Cake",
    packType: "Bag",
    packQty: 20,
    cfPrice: 49.2,
    mtPrice: 65.6,
    directPrice: 65.6,
    distPrice: 98.4,
    ssPrice: 88.56,
    mrp: 164,
    slug: "asafoetida-gold-cake",
    weightGrams: 100,
  },
  {
    id: "yg-gold-pwd-500g",
    name: "500G YG GOLD POWDER POUCH",
    category: "powder",
    categoryLabel: "YG Gold Powder",
    packType: "Pouch",
    packQty: 1,
    cfPrice: 255.0,
    mtPrice: 340.0,
    directPrice: 340.0,
    distPrice: 510.0,
    ssPrice: 459.0,
    mrp: 850,
    slug: "gold-asafoetida-powder",
    weightGrams: 500,
  },
  {
    id: "yg-gold-pwd-1kg",
    name: "1 KG YG GOLD POWDER POUCH",
    category: "powder",
    categoryLabel: "YG Gold Powder",
    packType: "Pouch",
    packQty: 1,
    cfPrice: 480.0,
    mtPrice: 640.0,
    directPrice: 640.0,
    distPrice: 960.0,
    ssPrice: 864.0,
    mrp: 1600,
    slug: "gold-asafoetida-powder",
    weightGrams: 1000,
  },
];

export type PriceTierKey = "cf" | "mt" | "direct" | "dist" | "ss" | "mrp";

export const PRICE_TIERS: Array<{
  key: PriceTierKey;
  label: string;
  fullName: string;
  description: string;
  badgeColor: string;
}> = [
  {
    key: "cf",
    label: "CF Price",
    fullName: "Carrying & Forwarding Agent",
    description: "Depot-level primary consignment pricing for state-level C&F logistics partners.",
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/40",
  },
  {
    key: "ss",
    label: "S.S Price",
    fullName: "Super Stockist",
    description: "District / regional super stockist buy price for secondary hub fulfillment.",
    badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/40",
  },
  {
    key: "dist",
    label: "Dist. Price",
    fullName: "Wholesale Distributor",
    description: "Distributor billing rate to FMCG retail grocery stores and food marts.",
    badgeColor: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/40",
  },
  {
    key: "direct",
    label: "Direct Price",
    fullName: "Direct to Retailer",
    description: "Institutional supply price for large department stores and direct retailers.",
    badgeColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40",
  },
  {
    key: "mt",
    label: "MT Price",
    fullName: "Modern Trade (Supermarkets)",
    description: "Organized retail, hypermarkets, and national supermarket supply terms.",
    badgeColor: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-900/40",
  },
  {
    key: "mrp",
    label: "MRP",
    fullName: "Maximum Retail Price",
    description: "Consumer retail printed price inclusive of all taxes across India.",
    badgeColor: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/40",
  },
];

export function formatIndianCurrency(amount: number | null): string {
  if (amount === null || amount === undefined) return "—";
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
