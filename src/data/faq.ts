/**
 * Rule-based FAQ knowledge base for the on-site helper bot.
 * Pure keyword scoring — no model calls, no network.
 */

export const SUPPORT = {
  company: "Mayil Agro Foods",
  phone: "0462 - 233 5555",
  phoneHref: "tel:04622335555",
  mobile: "+91 7200622221",
  mobileHref: "tel:+917200622221",
  salesDesk: "+91 7904567979",
  salesDeskHref: "tel:+917904567979",
  whatsapp: "+91 7200622221",
  whatsappHref: "https://wa.me/917200622221",
  email: "Sales@yghing.com",
  emailHref: "mailto:Sales@yghing.com",
  exportEmail: "Exports@yghing.com",
  exportEmailHref: "mailto:Exports@yghing.com",
  whiteLabellingEmail: "b2bsales@yghing.com",
  whiteLabellingEmailHref: "mailto:b2bsales@yghing.com",
  hours: "Mon–Sat, 9:00 AM – 7:00 PM IST",
  address: "Mayil Agro Foods, 1/303, M.K. Nagar, Near to HP Fuel Station, Abhisekapatti, Tirunelveli - Tenkasi Main Road, Tirunelveli - 627 012",
};

export type FaqEntry = {
  id: string;
  /** Words that must appear (any one) for this entry to score. */
  keywords: string[];
  question: string;
  answer: string;
  /** Optional follow-up chips shown under the answer. */
  followUps?: string[];
};

export const faqs: FaqEntry[] = [
  {
    id: "shipping-time",
    keywords: ["ship", "shipping", "deliver", "delivery", "how long", "days", "dispatch", "courier", "arrive"],
    question: "How long does delivery take?",
    answer:
      "We dispatch within 24 hours of your order from Tirunelveli. Standard delivery reaches most Indian pin codes in 2–6 working days; Express (₹99) usually lands in 1–2 days. You can watch every step on your order tracking page.",
    followUps: ["Is shipping free?", "Do you deliver to my pincode?"],
  },
  {
    id: "shipping-free",
    keywords: ["free shipping", "shipping charge", "delivery charge", "shipping cost", "free over", "₹499", "499"],
    question: "Is shipping free?",
    answer:
      "Shipping is free on every order above ₹499. Below that a flat ₹49 applies. Express shipping is ₹99 on top, and Cash on Delivery adds a ₹20 handling fee.",
  },
  {
    id: "pincode",
    keywords: ["pincode", "pin code", "my area", "serviceable", "location", "all india"],
    question: "Do you deliver to my pincode?",
    answer:
      "We ship to all serviceable pin codes across India. Enter your 6-digit PIN at checkout — we auto-fill your city and state and confirm serviceability right there.",
  },
  {
    id: "which-product",
    keywords: ["which", "recommend", "start", "beginner", "difference", "powder or", "best for me", "suggest"],
    question: "Which hing should I buy?",
    answer:
      "Premium Compounded Powder for everyday sambar, rasam and tempering. Granules for curd rice, buttermilk and pickles — they bloom slowly. Gold Cake for festive kuzhambu when you want the strongest aroma. If you're unsure, start with the powder twin-pack (₹199).",
    followUps: ["Is it gluten-free?", "How much should I use?"],
  },
  {
    id: "gluten",
    keywords: ["gluten", "wheat", "allergy", "allergen", "celiac", "coeliac"],
    question: "Is your hing gluten-free?",
    answer:
      "Our YG Gluten-Free Hing Powder uses a rice-starch base with no wheat. The classic compounded powder, granules and cake use edible starch that may contain wheat, so choose the gluten-free line if you are avoiding gluten.",
  },
  {
    id: "usage",
    keywords: ["how much", "quantity", "use", "usage", "pinch", "recipe", "cook", "tempering"],
    question: "How much hing should I use?",
    answer:
      "About a quarter teaspoon of powder into hot ghee at the tempering stage serves a family pot of sambar or rasam. For granules, crush a pinch. For the cake, scrape a pea-sized piece. Hing is strong — less is more.",
  },
  {
    id: "ingredients",
    keywords: ["ingredient", "made of", "contains", "compounded", "pure", "additive", "preservative"],
    question: "What is compounded hing made of?",
    answer:
      "Compounded asafoetida is resin blended with edible starch and edible gum — that's what makes it pourable and safe to use by the pinch. No artificial colours or preservatives are added.",
  },
  {
    id: "shelf-life",
    keywords: ["shelf life", "expiry", "expire", "store", "storage", "how to keep", "airtight"],
    question: "How should I store it and how long does it last?",
    answer:
      "Keep the jar tightly closed in a cool, dry cupboard away from steam. All products have an optimal shelf life of 12 months from packing. Store in an airtight container.",
  },
  {
    id: "order-track",
    keywords: ["track", "where is my order", "status", "order status", "tracking"],
    question: "How do I track my order?",
    answer:
      "Open Account → Order history and tap any order, or use the tracking link on your confirmation screen. You'll see a live timeline from 'Packed in Tirunelveli' through to 'Delivered', plus an estimated delivery date.",
  },
  {
    id: "cancel",
    keywords: ["cancel", "cancellation", "stop my order", "change order"],
    question: "Can I cancel my order?",
    answer:
      "Yes — cancellation is free and instant any time before the order is marked Shipped. Open the order tracking page and tap 'Cancel order'. Once it has been dispatched, use 'Request refund' instead.",
    followUps: ["How do refunds work?"],
  },
  {
    id: "refund",
    keywords: ["refund", "return", "money back", "damaged", "wrong item", "replace"],
    question: "How do refunds work?",
    answer:
      "Refund requests are accepted from dispatch until 7 days after delivery. Choose a reason on the order page and we review within 24 hours. Approved refunds go back to your original payment method within 7 working days (3 for cancellations). COD orders are refunded by bank transfer.",
  },
  {
    id: "promo",
    keywords: ["promo", "coupon", "discount", "code", "offer", "cheaper", "sale"],
    question: "Do you have discount codes?",
    answer:
      "Yes. HERITAGE10 gives 10% off, HING50 takes ₹50 off orders above ₹399, and FREESHIP removes the delivery fee. Orders above ₹999 automatically get BULK15 (15% off) whenever it beats your typed code.",
  },
  {
    id: "payment",
    keywords: ["payment", "pay", "upi", "card", "cod", "cash on delivery", "netbanking", "paytm"],
    question: "What payment methods do you accept?",
    answer:
      "Paytm, UPI (GPay/PhonePe/BHIM), credit and debit cards, net banking, and Cash on Delivery (₹20 handling fee).",
  },
  {
    id: "bulk",
    keywords: ["bulk", "wholesale", "restaurant", "distributor", "export", "reseller", "b2b"],
    question: "Do you supply in bulk?",
    answer:
      `Yes — restaurants, retailers, caterers and exporters are welcome. Write to ${SUPPORT.email} with your quantity and city and our team will send wholesale pricing.`,
  },
  {
    id: "history",
    keywords: ["1931", "history", "story", "founder", "family", "heritage", "who are you", "about"],
    question: "Who makes Y.G Asafoetida?",
    answer:
      "Shri P. Subramanian Chettiar started the works near Tirunelveli in 1931. 94 years of heritage later, the founder's grandchildren still run it from the same town, using the same house formula. Read the full story on our Story page.",
  },
  {
    id: "gift",
    keywords: ["gift", "wrap", "present", "message card"],
    question: "Can I send this as a gift?",
    answer:
      "Yes — tick heritage gift wrap at checkout (₹49) and add a handwritten-style message. We leave the price off the packing slip.",
  },
  {
    id: "location",
    keywords: ["address", "where are you", "shop", "store", "visit", "factory", "map", "office"],
    question: "Where are you located?",
    answer:
      `${SUPPORT.address}. Our works and office are open ${SUPPORT.hours} — there's a map on the Contact page if you'd like to visit.`,
  },
];

export type BotReply = {
  text: string;
  matched: boolean;
  followUps: string[];
};

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "do", "does", "i", "my", "you", "your", "to", "of", "for",
  "and", "in", "on", "it", "can", "how", "what", "when", "please", "hing",
]);

/** Score every FAQ against the question and return the best rule-based answer. */
export function answerQuestion(input: string): BotReply {
  const q = input.toLowerCase().trim();
  if (!q) {
    return { text: "Ask me anything about products, delivery, refunds or offers.", matched: true, followUps: [] };
  }

  if (/^(hi|hello|hey|vanakkam|namaste|hai)\b/.test(q)) {
    return {
      text: "Vanakkam! I'm the Y.G helper — a simple rule-based FAQ bot. Ask me about products, delivery, offers, cancellations or refunds.",
      matched: true,
      followUps: ["Which hing should I buy?", "Is shipping free?", "How do refunds work?"],
    };
  }
  if (/(thank|thanks|nandri|super|great)\b/.test(q)) {
    return { text: "Happy to help. Anything else you'd like to know?", matched: true, followUps: [] };
  }

  const words = q.split(/[^a-z0-9₹]+/).filter((w) => w.length > 2 && !STOPWORDS.has(w));

  let best: FaqEntry | null = null;
  let bestScore = 0;
  for (const entry of faqs) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (kw.includes(" ")) {
        if (q.includes(kw)) score += 3;
      } else if (words.includes(kw)) {
        score += 2;
      } else if (words.some((w) => w.startsWith(kw) || kw.startsWith(w))) {
        score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (!best || bestScore < 2) {
    return {
      text: "I don't know that one — I'm only a basic FAQ bot, so I can't look up your specific account or order details.",
      matched: false,
      followUps: [],
    };
  }

  return { text: best.answer, matched: true, followUps: best.followUps ?? [] };
}

/** Suggested opening chips. */
export const quickQuestions = [
  "Which hing should I buy?",
  "Is shipping free?",
  "Can I cancel my order?",
  "Do you have discount codes?",
  "Is it gluten-free?",
];
