import { useEffect, useMemo, useState, useTransition } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building2,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coins,
  DollarSign,
  Download,
  Edit,
  ExternalLink,
  Eye,
  Globe2,
  HelpCircle,
  KeyRound,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  Package,
  Percent,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  Trash2,
  TrendingUp,
  Truck,
  Upload,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatPrice, products as defaultStoreProducts } from "@/data/products";
import { type CalculationMetrics, DEFAULT_METRICS, saveLiveMetrics, resetLiveMetrics } from "@/data/metrics";
import { getLivePromos, saveLivePromos } from "@/data/promos";
import { compressImage, compressMultipleImages } from "@/lib/image-compressor";

// Server Functions
import {
  adminGetDashboardStatsServerFn,
  type AdminDashboardStats,
} from "@/functions/analytics";
import {
  adminListOrdersServerFn,
  adminUpdateOrderStatusServerFn,
  adminProcessResolutionServerFn,
  adminDeleteOrderServerFn,
  adminClearAllOrdersServerFn,
  type FullOrder,
} from "@/functions/orders";
import {
  getProductsServerFn,
  adminSaveProductServerFn,
  adminToggleProductStockServerFn,
  adminSetProductStatusServerFn,
  adminDeleteProductServerFn,
  adminRestoreProductServerFn,
  getCategoriesServerFn,
  adminSaveCategoryServerFn,
  adminDeleteCategoryServerFn,
  adminLoginServerFn,
  type DbProduct,
  type DbProductStatus,
  type DbCategory,
  type AdminProductInput,
} from "@/functions/products";
import {
  adminListReviewsServerFn,
  adminModerateReviewServerFn,
  type DbReview,
} from "@/functions/reviews";
import {
  adminListQuestionsServerFn,
  adminAnswerQuestionServerFn,
  adminDeleteQuestionServerFn,
  type DbQuestion,
} from "@/functions/questions";
import {
  adminListTicketsServerFn,
  adminUpdateTicketServerFn,
  type DbTicket,
} from "@/functions/tickets";
import {
  adminListPromosServerFn,
  adminSavePromoServerFn,
  adminTogglePromoServerFn,
  adminDeletePromoServerFn,
  type DbPromo,
} from "@/functions/promos";
import {
  adminListStockAlertsServerFn,
  adminNotifyStockAlertServerFn,
  type DbAlert,
} from "@/functions/alerts";

export const PRESET_PRODUCT_IMAGES = [
  { label: "Gold Powder 100g", key: "gold-100", url: "/products/100g-gold-asafoetida-powder/img-1.jpg" },
  { label: "Gold Powder 50g", key: "gold-50", url: "/products/50g-gold-asafoetida-powder/img-1.jpg" },
  { label: "Gold Powder 500g", key: "gold-500", url: "/products/500g-gold-asafoetida-powder/img-1.jpg" },
  { label: "Premium Powder 100g", key: "premium-100", url: "/products/100g-premium-asafoetida-powder/img-1.jpg" },
  { label: "Premium Powder 50g", key: "premium-50", url: "/products/50g-premium-asafoetida-powder/img-1.jpg" },
  { label: "Gluten Free 50g", key: "gluten-free", url: "/products/50g-gluten-free-asafoetida-powder/img-1.jpg" },
  { label: "Gold Cake 100g", key: "cake-100", url: "/products/100g-asafoetida-gold-cake/img-1.jpg" },
  { label: "Gold Cake 50g", key: "cake-50", url: "/products/50g-asafoetida-gold-cake/img-1.jpg" },
  { label: "Hing Chips", key: "chips", url: "/products/hing-chips/img-1.jpg" },
  { label: "Hing Pellets", key: "pellets", url: "/products/hing-pellets/img-1.jpg" },
  { label: "Bottle Jar", key: "bottle-jar", url: "/products/bottle-jar/img-1.jpg" },
  { label: "Raw Pure Lump", key: "raw-hing", url: "/products/hing/img-1.jpg" },
  { label: "Combo Box", key: "combo", url: "/products/all-product/img-1.jpg" },
  { label: "Multigrain Adai Dosa Mix 500g (Front)", key: "adai-dosa-front", url: "/products/vismaya-multi-millet-adai-dosa-mix/img-1.jpg" },
  { label: "Multigrain Adai Dosa Mix 500g (Back)", key: "adai-dosa-back", url: "/products/vismaya-multi-millet-adai-dosa-mix/img-2.jpg" },
];

export function getDisplayImageUrl(keyOrUrl: string | undefined | null): string {
  if (!keyOrUrl) return "/products/100g-gold-asafoetida-powder/img-1.jpg";
  if (
    keyOrUrl.startsWith("data:") ||
    keyOrUrl.startsWith("http://") ||
    keyOrUrl.startsWith("https://") ||
    keyOrUrl.startsWith("/")
  ) {
    return keyOrUrl;
  }
  const match = PRESET_PRODUCT_IMAGES.find((p) => p.key === keyOrUrl);
  return match ? match.url : "/products/100g-gold-asafoetida-powder/img-1.jpg";
}

export function formatStatus(val: unknown): string {
  if (val === null || val === undefined) return "";
  return String(val).replace(/_/g, " ");
}

export type { CalculationMetrics } from "@/data/metrics";

export interface ExportDeal {
  id: string;
  companyName: string;
  contactPerson: string;
  country: string;
  destinationPort: string;
  email: string;
  phone: string;
  productType: string;
  quantityMetric: string;
  dealValueCurrency: string;
  dealValueAmount: number;
  stage: "new" | "quoted" | "sample_sent" | "negotiation" | "contract_closed" | "cancelled";
  paymentTerms: string;
  incoterms: string;
  notes: string;
  createdAt: string;
}

export interface AdminMessage {
  id: string;
  senderName: string;
  email: string;
  phone: string;
  category: "general" | "wholesale" | "export" | "private_label";
  subject: string;
  message: string;
  status: "unread" | "in_progress" | "replied";
  receivedAt: string;
  adminNotes?: string;
}

export { DEFAULT_METRICS } from "@/data/metrics";

export const DEFAULT_EXPORT_DEALS: ExportDeal[] = [
  {
    id: "EXP-2026-001",
    companyName: "Mustafa Centre Wholesale Pte Ltd",
    contactPerson: "K. Rajendran",
    country: "Singapore",
    destinationPort: "Port of Singapore (SGSIN)",
    email: "procurement@mustafacentre.com.sg",
    phone: "+65 6295 5855",
    productType: "Gold Grade Asafoetida Powder (100g & 500g tins)",
    quantityMetric: "1,200 kg",
    dealValueCurrency: "SGD",
    dealValueAmount: 48500,
    stage: "contract_closed",
    paymentTerms: "100% Irrevocable LC at sight",
    incoterms: "CIF Singapore",
    notes: "Certificate of Origin & Phytosanitary clearance documents dispatched.",
    createdAt: "2026-09-10",
  },
  {
    id: "EXP-2026-002",
    companyName: "Tamil Spices Trading LLC",
    contactPerson: "Ahmed Al-Mansoor",
    country: "United Arab Emirates",
    destinationPort: "Jebel Ali Port, Dubai (AEJEA)",
    email: "trade@tamilspicesdubai.ae",
    phone: "+971 4 338 9012",
    productType: "Pure Asafoetida Solid Cake & Raw Lumps",
    quantityMetric: "850 kg",
    dealValueCurrency: "USD",
    dealValueAmount: 32400,
    stage: "negotiation",
    paymentTerms: "30% advance, 70% against BL scan",
    incoterms: "FOB Tuticorin (VOC Port)",
    notes: "Halal compliance documents verified. Moisture content < 8% certified.",
    createdAt: "2026-09-14",
  },
  {
    id: "EXP-2026-003",
    companyName: "Nirav Foods & Spices Inc",
    contactPerson: "Viren Patel",
    country: "United States",
    destinationPort: "Port of New York / New Jersey (USNYC)",
    email: "import@niravfoodsusa.com",
    phone: "+1 (732) 555-0198",
    productType: "Gluten-Free Hing Powder & Hing Chips",
    quantityMetric: "2,500 kg",
    dealValueCurrency: "USD",
    dealValueAmount: 89000,
    stage: "sample_sent",
    paymentTerms: "50% advance, balance on delivery",
    incoterms: "CIF New York",
    notes: "FDA Registration verified. Awaiting DHL express sample lab sign-off.",
    createdAt: "2026-09-15",
  },
  {
    id: "EXP-2026-004",
    companyName: "Lanka Spice Distributors Ltd",
    contactPerson: "Suren Wickramasinghe",
    country: "Sri Lanka",
    destinationPort: "Port of Colombo (LKCMB)",
    email: "suren@lankaspice.lk",
    phone: "+94 11 234 5678",
    productType: "Compounded Hing Powder (Yellow Label)",
    quantityMetric: "500 kg",
    dealValueCurrency: "USD",
    dealValueAmount: 14200,
    stage: "quoted",
    paymentTerms: "Wire transfer T/T advance",
    incoterms: "FOB Tuticorin",
    notes: "Proforma Invoice PI-2026-88 sent with 30-day price validity.",
    createdAt: "2026-09-17",
  },
];

export const DEFAULT_ADMIN_MESSAGES: AdminMessage[] = [
  {
    id: "MSG-101",
    senderName: "Senthil Kumar (Sri Krishna Sweets Vendor)",
    email: "senthil.procure@skb.in",
    phone: "+91 98410 44552",
    category: "wholesale",
    subject: "Monthly 150kg requirement for Tirunelveli & Madurai kitchens",
    message: "Namaskaram YG team, we require 150 kg of pure compounded asafoetida powder every month on a standing contract. Please share trade price slabs, GST invoice details, and dispatch schedule from Tirunelveli works.",
    status: "in_progress",
    receivedAt: "2026-09-17 09:45 AM",
    adminNotes: "Sent initial catalog; waiting for MD approval on 18% slab discount.",
  },
  {
    id: "MSG-102",
    senderName: "Marcus Tan (Asian Gourmet Exports, KL)",
    email: "marcus.tan@asiangourmet.com.my",
    phone: "+60 12 345 6789",
    category: "export",
    subject: "Distributorship enquiry for Malaysia & Southeast Asia",
    message: "Hello Y.G Asafoetida management, we distribute authentic South Indian culinary products across hypermarkets in Kuala Lumpur and Penang. We are very interested in becoming your official distributor for Malaysia. Could we organize a Zoom call with your export director this week?",
    status: "unread",
    receivedAt: "2026-09-18 07:15 AM",
  },
  {
    id: "MSG-103",
    senderName: "Dr. Revathi Sundaram",
    email: "revathi.ayur@gmail.com",
    phone: "+91 94432 18900",
    category: "general",
    subject: "Inquiry on gluten-free hing formulation purity",
    message: "Good morning. I am an Ayurvedic practitioner in Coimbatore. I frequently recommend your Gluten-Free Asafoetida to patients with celiac disorder. Could you confirm what natural gum base or flour is utilized in place of wheat starch?",
    status: "replied",
    receivedAt: "2026-09-16 03:20 PM",
    adminNotes: "Replied detailing our natural edible gum and organic rice starch formulation.",
  },
  {
    id: "MSG-104",
    senderName: "Heritage Organics Chennai (Private Label)",
    email: "partners@heritageorganics.co.in",
    phone: "+91 98840 99112",
    category: "private_label",
    subject: "White-label packaging & custom bottling request",
    message: "Dear Team, we run an organic brand across 12 stores in Chennai. We would like to co-pack 50g glass jars with our private label design while sourcing your premium Tirunelveli asafoetida as the sole ingredient. Minimum batch size?",
    status: "unread",
    receivedAt: "2026-09-17 11:30 PM",
  },
];

export const DEFAULT_DASHBOARD_STATS: AdminDashboardStats = {
  totalRevenue: 248900,
  totalOrders: 142,
  ordersPlacedToday: 5,
  pendingReviewsCount: 2,
  openQuestionsCount: 1,
  openTicketsCount: 1,
  lowStockProductsCount: 1,
  stockAlertsCount: 0,
  ordersByStatus: { placed: 3, packed: 5, shipped: 14, out: 4, delivered: 114, cancelled: 2, refund_requested: 0, refunded: 0 },
  recentOrders: [],
  recentSalesTrend: [
    { date: "12 Sept", revenue: 18400, orders: 12 },
    { date: "13 Sept", revenue: 24200, orders: 16 },
    { date: "14 Sept", revenue: 31000, orders: 21 },
    { date: "15 Sept", revenue: 28900, orders: 19 },
    { date: "16 Sept", revenue: 34500, orders: 23 },
    { date: "17 Sept", revenue: 39800, orders: 26 },
    { date: "18 Sept", revenue: 42100, orders: 25 },
  ],
  totalProducts: 0,
  activeProducts: 0,
  outOfStockProducts: 0,
  draftOrHiddenProducts: 0,
  featuredProducts: 0,
};

export const INITIAL_PRODUCTS: DbProduct[] = defaultStoreProducts.map((p, idx) => ({
  slug: p.slug,
  name: p.name,
  tagline: p.tagline,
  format: p.format as any,
  category: p.format,
  sku: p.slug.toUpperCase().replace(/[^A-Z0-9]+/g, "-").slice(0, 24),
  status: p.inStock !== false ? "active" : "out_of_stock",
  archived: 0,
  gluten_free: p.glutenFree ? 1 : 0,
  bestseller: p.bestseller ? 1 : 0,
  image: p.image,
  gallery: JSON.stringify(p.gallery || [p.image]),
  description: p.description,
  ingredients: p.ingredients,
  usage: p.usage,
  shelf_life: p.shelfLife || "12 months from packing",
  in_stock: p.inStock !== false ? 1 : 0,
  stock_left: p.stockLeft ?? 50,
  rating: p.rating,
  reviews: p.reviews,
  created_at: 1726640000000 - idx * 86400000,
  updated_at: 1726640000000,
  variants: (p.variants || []).map((v, vIdx) => ({
    id: v.id,
    product_slug: p.slug,
    label: v.label,
    price: v.price,
    mrp: v.mrp ?? Math.round(v.price * 1.15),
    stock: v.stock ?? 100,
    sort_order: vIdx,
    image: v.image ?? null,
    gallery: v.gallery ? JSON.stringify(v.gallery) : null,
  })),
}));

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Store Admin — Y.G Asafoetida" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center bg-[#FAF3D6]/30">
      <div className="max-w-md w-full p-6 rounded-2xl border border-[#E8DEC8] bg-card shadow-lg space-y-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#FF9933] text-[#181206] font-display font-black text-lg">
          YG
        </div>
        <h2 className="text-xl font-bold text-foreground font-display">Y.G Admin Portal</h2>
        <p className="text-xs text-muted-foreground">
          {error?.message || "An issue occurred while loading administrative records. You can safely retry or re-authenticate."}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <Button
            onClick={() => {
              if (typeof window !== "undefined") {
                sessionStorage.removeItem("yg_admin_auth");
                localStorage.removeItem("yg_admin_auth");
              }
              reset();
            }}
            className="bg-[#FF9933] text-[#181206] font-bold hover:bg-[#FF9933]/90 text-xs h-10"
          >
            Reset Admin Session
          </Button>
          <Button asChild variant="outline" className="text-xs h-10 border-[#E8DEC8]">
            <Link to="/">View Storefront</Link>
          </Button>
        </div>
      </div>
    </div>
  ),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<AdminDashboardStats>(DEFAULT_DASHBOARD_STATS);
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [products, setProducts] = useState<DbProduct[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [questions, setQuestions] = useState<DbQuestion[]>([]);
  const [tickets, setTickets] = useState<DbTicket[]>([]);
  const [promos, setPromos] = useState<DbPromo[]>([]);
  const [alerts, setAlerts] = useState<DbAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<FullOrder | null>(null);

  // Product Filters & Dialog
  const [productSearch, setProductSearch] = useState("");
  const [productFormatFilter, setProductFormatFilter] = useState("all");
  const [productStatusFilter, setProductStatusFilter] = useState("all");
  const [productSort, setProductSort] = useState<"name" | "price" | "date">("date");
  const [productPage, setProductPage] = useState(1);
  const [showArchivedProducts, setShowArchivedProducts] = useState(false);
  const PRODUCTS_PER_PAGE = 9;
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductInput | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");
  const [productErrors, setProductErrors] = useState<Record<string, string>>({});
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<DbProduct | null>(null);
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryDeleteTarget, setCategoryDeleteTarget] = useState<DbCategory | null>(null);
  const [categoryReplacement, setCategoryReplacement] = useState("");
  const [renamingCategorySlug, setRenamingCategorySlug] = useState<string | null>(null);
  const [renamingCategoryValue, setRenamingCategoryValue] = useState("");
  const [adminToken, setAdminToken] = useState<string>("");

  // Quick Price Editor Dialog
  const [quickPriceProduct, setQuickPriceProduct] = useState<DbProduct | null>(null);
  const [quickVariants, setQuickVariants] = useState<
    Array<{ id: string; label: string; price: number; mrp: number | null; stock: number }>
  >([]);

  // Calculation Metrics State
  const [metrics, setMetrics] = useState<CalculationMetrics>(DEFAULT_METRICS);

  // Metrics Live Simulation Calculator State
  const [simRawCost, setSimRawCost] = useState(2800);
  const [simCompounding, setSimCompounding] = useState(400);
  const [simPackaging, setSimPackaging] = useState(25);
  const [simFreight, setSimFreight] = useState(15);
  const [simMarginPct, setSimMarginPct] = useState(35);

  // Export Deals State
  const [exportDeals, setExportDeals] = useState<ExportDeal[]>(DEFAULT_EXPORT_DEALS);
  const [exportSearch, setExportSearch] = useState("");
  const [exportStageFilter, setExportStageFilter] = useState("all");
  const [newDealDialogOpen, setNewDealDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Partial<ExportDeal>>({});

  // Messages & Inquiries State
  const [adminMessages, setAdminMessages] = useState<AdminMessage[]>(DEFAULT_ADMIN_MESSAGES);
  const [msgCategoryFilter, setMsgCategoryFilter] = useState("all");
  const [msgStatusFilter, setMsgStatusFilter] = useState("all");
  const [msgSearch, setMsgSearch] = useState("");
  const [activeMessage, setActiveMessage] = useState<AdminMessage | null>(null);
  const [messageNoteInput, setMessageNoteInput] = useState("");

  // Question Answer Dialog
  const [answeringQuestion, setAnsweringQuestion] = useState<DbQuestion | null>(null);
  const [answerText, setAnswerText] = useState("");

  // Ticket Response Dialog
  const [respondingTicket, setRespondingTicket] = useState<DbTicket | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState("");
  const [ticketStatusVal, setTicketStatusVal] = useState<"open" | "in_progress" | "resolved" | "closed">("open");

  // Promo Dialog
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<{
    code: string;
    label: string;
    description: string;
    percentOff: number | string;
    amountOff: number | string;
    minSubtotal: number | string;
    freeShipping: boolean;
    automatic: boolean;
    isActive: boolean;
  }>({
    code: "",
    label: "",
    description: "",
    percentOff: "",
    amountOff: "",
    minSubtotal: "",
    freeShipping: false,
    automatic: false,
    isActive: true,
  });

  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      try {
        const savedMetrics = localStorage.getItem("yg_calc_metrics");
        if (savedMetrics) setMetrics(JSON.parse(savedMetrics));
      } catch {}
      try {
        const savedDeals = localStorage.getItem("yg_export_deals");
        if (savedDeals) setExportDeals(JSON.parse(savedDeals));
      } catch {}
      try {
        const savedMsgs = localStorage.getItem("yg_admin_messages");
        if (savedMsgs) setAdminMessages(JSON.parse(savedMsgs));
      } catch {}
      const savedToken = sessionStorage.getItem("yg_admin_token");
      if (savedToken) {
        setAdminToken(savedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError("");
    setLoginBusy(true);
    try {
      const res = await adminLoginServerFn({
        data: { username: loginUsername.trim(), password: loginPassword },
      });
      if (res.ok && res.token) {
        sessionStorage.setItem("yg_admin_token", res.token);
        setAdminToken(res.token);
        setIsAuthenticated(true);
        toast.success("Welcome, Administrator!");
      } else {
        setLoginError("Invalid username or password.");
      }
    } catch {
      setLoginError("Invalid username or password.");
    } finally {
      setLoginBusy(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("yg_admin_token");
    }
    setAdminToken("");
    setIsAuthenticated(false);
    toast.info("Logged out from Admin Panel");
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        dashStatsRes,
        orderListRes,
        prodListRes,
        categoryListRes,
        revListRes,
        qListRes,
        ticketListRes,
        promoListRes,
        alertListRes,
      ] = await Promise.allSettled([
        adminGetDashboardStatsServerFn(),
        adminListOrdersServerFn({ data: {} }),
        getProductsServerFn({ data: { includeArchived: showArchivedProducts } }),
        getCategoriesServerFn(),
        adminListReviewsServerFn({ data: {} }),
        adminListQuestionsServerFn({ data: {} }),
        adminListTicketsServerFn({ data: {} }),
        adminListPromosServerFn(),
        adminListStockAlertsServerFn(),
      ]);

      if (dashStatsRes.status === "fulfilled" && dashStatsRes.value) {
        setStats(dashStatsRes.value);
      }
      if (orderListRes.status === "fulfilled" && Array.isArray(orderListRes.value)) {
        setOrders(orderListRes.value);
      }
      if (prodListRes.status === "fulfilled" && Array.isArray(prodListRes.value) && prodListRes.value.length > 0) {
        setProducts(prodListRes.value);
      }
      if (categoryListRes.status === "fulfilled" && Array.isArray(categoryListRes.value)) {
        setCategories(categoryListRes.value);
      }
      if (revListRes.status === "fulfilled" && Array.isArray(revListRes.value)) {
        setReviews(revListRes.value);
      }
      if (qListRes.status === "fulfilled" && Array.isArray(qListRes.value)) {
        setQuestions(qListRes.value);
      }
      if (ticketListRes.status === "fulfilled" && Array.isArray(ticketListRes.value)) {
        setTickets(ticketListRes.value);
      }
      if (promoListRes.status === "fulfilled" && Array.isArray(promoListRes.value)) {
        setPromos(promoListRes.value);
        saveLivePromos(promoListRes.value);
      }
      if (alertListRes.status === "fulfilled" && Array.isArray(alertListRes.value)) {
        setAlerts(alertListRes.value);
      }
    } catch (err) {
      console.error("Admin data fetch fallback handled:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated, showArchivedProducts]);

  /** Tells the storefront's useLiveProducts()/useLiveProduct() hooks to refetch. */
  const notifyStorefrontProductsChanged = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("yg_products_updated"));
    }
  };

  // --- Order Actions ---
  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      await adminUpdateOrderStatusServerFn({ data: { id, status: newStatus } });
      toast.success(`Order ${id} status updated to ${newStatus}`);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );
      if (selectedOrder && selectedOrder.id === id) {
        setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleProcessResolution = async (id: string, action: "approve" | "reject", note?: string) => {
    try {
      await adminProcessResolutionServerFn({ data: { id, action, note } });
      toast.success(`Resolution ${action === "approve" ? "approved" : "rejected"}`);
      loadAllData();
      setSelectedOrder(null);
    } catch (err) {
      toast.error("Failed to process resolution");
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!window.confirm(`Delete order ${id}?`)) return;
    try {
      await adminDeleteOrderServerFn({ data: { id } });
      toast.success(`Order ${id} deleted`);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (selectedOrder && selectedOrder.id === id) setSelectedOrder(null);
      loadAllData();
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const handleClearAllOrders = async () => {
    if (!window.confirm("Are you sure you want to clear all orders? This will delete all order history.")) return;
    try {
      await adminClearAllOrdersServerFn();
      toast.success("All test orders cleared");
      setOrders([]);
      setSelectedOrder(null);
      loadAllData();
    } catch {
      toast.error("Failed to clear orders");
    }
  };

  // --- Product Actions ---
  const handleOpenNewProduct = () => {
    setProductErrors({});
    setEditingProduct({
      slug: "",
      name: "",
      tagline: "",
      format: (categories[0]?.slug as any) || "powder",
      category: categories[0]?.slug || "powder",
      sku: "",
      status: "active",
      glutenFree: false,
      bestseller: false,
      image: "",
      gallery: [],
      description: "",
      ingredients: "",
      usage: "",
      shelfLife: "12 months from packing. Store in an airtight container.",
      inStock: true,
      stockLeft: null,
      rating: 4.8,
      reviews: 120,
      variants: [
        { id: "50g", label: "50 g", price: 150, mrp: 180, stock: 100 },
      ],
    });
    setProductDialogOpen(true);
  };

  const handleEditProduct = (p: DbProduct) => {
    setProductErrors({});
    let gallery: string[] = [];
    try {
      gallery = JSON.parse(p.gallery);
    } catch {
      gallery = [p.image];
    }

    setEditingProduct({
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      format: p.format,
      category: p.category || p.format,
      sku: p.sku || "",
      status: p.status || (p.in_stock ? "active" : "out_of_stock"),
      glutenFree: Boolean(p.gluten_free),
      bestseller: Boolean(p.bestseller),
      image: p.image,
      gallery,
      description: p.description,
      ingredients: p.ingredients,
      usage: p.usage,
      shelfLife: p.shelf_life || "12 months from packing. Store in an airtight container.",
      inStock: Boolean(p.in_stock),
      stockLeft: p.stock_left,
      rating: Math.min(4.9, Math.max(4.5, Number(p.rating || 4.8))),
      reviews: p.reviews ?? 100,
      variants: (p.variants || []).map((v) => {
        let variantGallery: string[] | null = null;
        if (v.gallery) {
          try {
            variantGallery = JSON.parse(v.gallery);
          } catch {
            variantGallery = null;
          }
        }
        return {
          id: v.id,
          label: v.label,
          price: v.price,
          mrp: v.mrp,
          stock: v.stock,
          image: v.image ?? null,
          gallery: variantGallery,
        };
      }),
    });
    setProductDialogOpen(true);
  };

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const MAX_IMAGE_SIZE_MB = 10;

  function validateImageFiles(files: FileList | File[]): { valid: File[]; rejected: string[] } {
    const valid: File[] = [];
    const rejected: string[] = [];
    for (const file of Array.from(files)) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        rejected.push(`${file.name} (unsupported file type — use JPG, PNG, or WEBP)`);
        continue;
      }
      if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
        rejected.push(`${file.name} (larger than ${MAX_IMAGE_SIZE_MB}MB)`);
        continue;
      }
      valid.push(file);
    }
    return { valid, rejected };
  }

  const handleImageFileUpload = async (
    filesInput: FileList | File[] | null,
    isGallery = false
  ) => {
    if (!filesInput || filesInput.length === 0) return;
    const { valid, rejected } = validateImageFiles(filesInput);
    if (rejected.length > 0) {
      toast.error(`Skipped ${rejected.length} file(s): ${rejected.join("; ")}`);
    }
    if (valid.length === 0) return;

    const toastId = toast.loading("Compressing and optimizing image(s)...");
    try {
      if (!isGallery) {
        const res = await compressImage(valid[0]!, {
          maxWidth: 1600,
          maxHeight: 1600,
          quality: 0.88,
          mimeType: "image/webp",
        });
        setEditingProduct((prev) => (prev ? { ...prev, image: res.dataUrl } : null));
        toast.success(
          `Cover image compressed: ${(res.originalSize / 1024).toFixed(0)}KB → ${(res.compressedSize / 1024).toFixed(0)}KB (-${res.compressionRatio}%)`,
          { id: toastId }
        );
      } else {
        const results = await compressMultipleImages(valid, {
          maxWidth: 1600,
          maxHeight: 1600,
          quality: 0.88,
          mimeType: "image/webp",
        });
        const newUrls = results.map((r) => r.dataUrl);
        setEditingProduct((prev) => {
          if (!prev) return null;
          const current = Array.isArray(prev.gallery) ? prev.gallery : [];
          return { ...prev, gallery: [...current, ...newUrls] };
        });
        const totalOriginal = results.reduce((acc, r) => acc + r.originalSize, 0);
        const totalCompressed = results.reduce((acc, r) => acc + r.compressedSize, 0);
        const savedKb = ((totalOriginal - totalCompressed) / 1024).toFixed(0);
        toast.success(
          `${results.length} gallery image(s) compressed & added (saved ${savedKb}KB)`,
          { id: toastId }
        );
      }
    } catch (err) {
      console.error("Image upload compression failed:", err);
      toast.error("Failed to compress image", { id: toastId });
    }
  };

  const handleReplaceGalleryImage = async (index: number, file: File) => {
    const { valid, rejected } = validateImageFiles([file]);
    if (rejected.length > 0) {
      toast.error(rejected[0]!);
      return;
    }
    const toastId = toast.loading("Compressing replacement image...");
    try {
      const res = await compressImage(valid[0]!, {
        maxWidth: 1600,
        maxHeight: 1600,
        quality: 0.88,
        mimeType: "image/webp",
      });
      setEditingProduct((prev) => {
        if (!prev) return null;
        const gallery = [...prev.gallery];
        const wasPrimary = gallery[index] === prev.image;
        gallery[index] = res.dataUrl;
        return { ...prev, gallery, image: wasPrimary ? res.dataUrl : prev.image };
      });
      toast.success("Image replaced", { id: toastId });
    } catch {
      toast.error("Failed to replace image", { id: toastId });
    }
  };

  const handleMoveGalleryImage = (index: number, direction: -1 | 1) => {
    setEditingProduct((prev) => {
      if (!prev) return null;
      const gallery = [...prev.gallery];
      const target = index + direction;
      if (target < 0 || target >= gallery.length) return prev;
      [gallery[index], gallery[target]] = [gallery[target]!, gallery[index]!];
      return { ...prev, gallery };
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setEditingProduct((prev) => {
      if (!prev) return null;
      const removed = prev.gallery[index];
      const gallery = prev.gallery.filter((_, i) => i !== index);
      const image = prev.image === removed ? gallery[0] || "" : prev.image;
      return { ...prev, gallery, image };
    });
  };

  const handleSetPrimaryImage = (url: string) => {
    setEditingProduct((prev) => (prev ? { ...prev, image: url } : null));
  };

  function validateProductForm(input: AdminProductInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.name.trim()) errors["name"] = "Product name is required.";
    if (!input.category?.trim()) errors["category"] = "Category is required.";
    if (!input.gallery || input.gallery.length === 0) {
      errors["images"] = "At least one product image is required.";
    }
    if (!input.variants || input.variants.length === 0) {
      errors["variants"] = "Add at least one price/pack size.";
    } else {
      for (const v of input.variants) {
        if (!(Number(v.price) > 0)) {
          errors["variants"] = "Every variant needs a valid positive price.";
          break;
        }
        if (v.mrp !== undefined && v.mrp !== null && Number(v.mrp) < Number(v.price)) {
          errors["variants"] = "Offer price cannot be higher than the regular (MRP) price.";
          break;
        }
      }
    }
    return errors;
  }

  const handleSaveProduct = async () => {
    if (!editingProduct) return;
    const slug =
      editingProduct.slug.trim() ||
      editingProduct.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const input: AdminProductInput = { ...editingProduct, slug };

    const errors = validateProductForm(input);
    if (Object.keys(errors).length > 0) {
      setProductErrors(errors);
      toast.error(Object.values(errors)[0]!);
      return;
    }
    setProductErrors({});

    try {
      await adminSaveProductServerFn({ data: { ...input, adminToken } });
      toast.success(
        products.some((p) => p.slug === slug)
          ? "Product updated successfully."
          : "Product added successfully."
      );
      setProductDialogOpen(false);
      notifyStorefrontProductsChanged();
      loadAllData();
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  const handleToggleStock = async (slug: string, currentInStock: boolean) => {
    try {
      const newStock = !currentInStock;
      await adminToggleProductStockServerFn({
        data: { slug, inStock: newStock, stockLeft: newStock ? 50 : 0, adminToken },
      });
      toast.success(`Stock status updated for ${slug}`);
      setProducts((prev) =>
        prev.map((p) =>
          p.slug === slug
            ? { ...p, in_stock: newStock ? 1 : 0, status: newStock ? "active" : "out_of_stock" }
            : p
        )
      );
      notifyStorefrontProductsChanged();
    } catch (err) {
      toast.error("Failed to toggle stock");
    }
  };

  const handleSetProductStatus = async (slug: string, status: DbProductStatus) => {
    try {
      await adminSetProductStatusServerFn({ data: { slug, status, adminToken } });
      toast.success("Product status updated successfully.");
      setProducts((prev) =>
        prev.map((p) =>
          p.slug === slug
            ? { ...p, status, in_stock: status === "active" ? 1 : status === "out_of_stock" ? 0 : p.in_stock }
            : p
        )
      );
      notifyStorefrontProductsChanged();
    } catch {
      toast.error("Failed to update product status");
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;
    try {
      await adminDeleteProductServerFn({ data: { slug: deletingProduct.slug, adminToken } });
      toast.success("Product deleted successfully.");
      setProducts((prev) => prev.filter((p) => p.slug !== deletingProduct.slug));
      setDeletingProduct(null);
      notifyStorefrontProductsChanged();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleRestoreProduct = async (slug: string) => {
    try {
      await adminRestoreProductServerFn({ data: { slug, adminToken } });
      toast.success("Product restored.");
      notifyStorefrontProductsChanged();
      loadAllData();
    } catch {
      toast.error("Failed to restore product");
    }
  };

  // --- Category Actions ---
  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }
    try {
      const res = await adminSaveCategoryServerFn({ data: { name: newCategoryName.trim(), adminToken } });
      if (res.ok) {
        toast.success(`Category "${newCategoryName.trim()}" saved.`);
        setNewCategoryName("");
        const list = await getCategoriesServerFn();
        setCategories(list);
      } else {
        toast.error("Failed to save category");
      }
    } catch {
      toast.error("Failed to save category");
    }
  };

  const handleRenameCategory = async (slug: string) => {
    if (!renamingCategoryValue.trim()) {
      toast.error("Category name is required.");
      return;
    }
    try {
      const res = await adminSaveCategoryServerFn({
        data: { slug, name: renamingCategoryValue.trim(), adminToken },
      });
      if (res.ok) {
        toast.success("Category renamed.");
        setRenamingCategorySlug(null);
        const list = await getCategoriesServerFn();
        setCategories(list);
        loadAllData();
      } else {
        toast.error("Failed to rename category");
      }
    } catch {
      toast.error("Failed to rename category");
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryDeleteTarget) return;
    try {
      const res = await adminDeleteCategoryServerFn({
        data: {
          slug: categoryDeleteTarget.slug,
          adminToken,
          ...(categoryReplacement ? { replacementSlug: categoryReplacement } : {}),
        },
      });
      if (res.ok) {
        toast.success(`Category "${categoryDeleteTarget.name}" deleted.`);
        setCategoryDeleteTarget(null);
        setCategoryReplacement("");
        const list = await getCategoriesServerFn();
        setCategories(list);
        loadAllData();
      } else {
        toast.error(res.error || "Cannot delete this category");
      }
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const categoryProductCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      if (p.archived === 1) continue;
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    }
    return counts;
  }, [products]);

  const filteredSortedProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.sku || "").toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q);
      const matchCategory = productFormatFilter === "all" || p.category === productFormatFilter;
      const matchStatus = productStatusFilter === "all" || p.status === productStatusFilter;
      return matchSearch && matchCategory && matchStatus;
    });

    list = [...list].sort((a, b) => {
      if (productSort === "name") return a.name.localeCompare(b.name);
      if (productSort === "price") {
        const priceA = a.variants?.[0]?.price ?? 0;
        const priceB = b.variants?.[0]?.price ?? 0;
        return priceA - priceB;
      }
      return b.updated_at - a.updated_at;
    });

    return list;
  }, [products, productSearch, productFormatFilter, productStatusFilter, productSort]);

  const productTotalPages = Math.max(1, Math.ceil(filteredSortedProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = filteredSortedProducts.slice(
    (productPage - 1) * PRODUCTS_PER_PAGE,
    productPage * PRODUCTS_PER_PAGE
  );

  useEffect(() => {
    setProductPage(1);
  }, [productSearch, productFormatFilter, productStatusFilter, productSort]);

  // --- Review Actions ---
  const handleModerateReview = async (id: string, action: "publish" | "reject" | "delete") => {
    try {
      await adminModerateReviewServerFn({ data: { id, action } });
      toast.success(`Review ${action}ed`);
      if (action === "delete") {
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        const newStatus = action === "publish" ? "published" : "rejected";
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      toast.error("Failed to moderate review");
    }
  };

  // --- Question Actions ---
  const handleAnswerQuestion = async () => {
    if (!answeringQuestion || !answerText.trim()) return;
    try {
      await adminAnswerQuestionServerFn({
        data: { id: answeringQuestion.id, answer: answerText.trim(), answeredBy: "Y.G team" },
      });
      toast.success("Answer published to product page!");
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === answeringQuestion.id
            ? { ...q, answer: answerText.trim(), answered_by: "Y.G team", status: "published" }
            : q
        )
      );
      setAnsweringQuestion(null);
      setAnswerText("");
    } catch (err) {
      toast.error("Failed to submit answer");
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    try {
      await adminDeleteQuestionServerFn({ data: { id } });
      toast.success("Question deleted");
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      toast.error("Failed to delete question");
    }
  };

  // --- Ticket Actions ---
  const handleSaveTicketReply = async () => {
    if (!respondingTicket) return;
    try {
      await adminUpdateTicketServerFn({
        data: {
          id: respondingTicket.id,
          status: ticketStatusVal,
          reply: ticketReplyText.trim() || undefined,
        },
      });
      toast.success(`Ticket ${respondingTicket.id} updated`);
      setTickets((prev) =>
        prev.map((t) =>
          t.id === respondingTicket.id
            ? { ...t, status: ticketStatusVal, reply: ticketReplyText.trim() || null }
            : t
        )
      );
      setRespondingTicket(null);
    } catch (err) {
      toast.error("Failed to update ticket");
    }
  };

  // --- Promo Actions ---
  const handleSavePromo = async () => {
    if (!editingPromo.code || !editingPromo.label) {
      toast.error("Code and label are required");
      return;
    }
    try {
      await adminSavePromoServerFn({
        data: {
          code: editingPromo.code,
          label: editingPromo.label,
          description: editingPromo.description,
          percentOff: editingPromo.percentOff ? Number(editingPromo.percentOff) : null,
          amountOff: editingPromo.amountOff ? Number(editingPromo.amountOff) : null,
          minSubtotal: editingPromo.minSubtotal ? Number(editingPromo.minSubtotal) : null,
          freeShipping: editingPromo.freeShipping,
          automatic: editingPromo.automatic,
          isActive: editingPromo.isActive,
        },
      });
      const currentLive = getLivePromos();
      const codeUpper = editingPromo.code.trim().toUpperCase();
      const existsIdx = currentLive.findIndex((p) => p.code === codeUpper);
      const newPromoObj = {
        code: codeUpper,
        label: editingPromo.label,
        description: editingPromo.description,
        percentOff: editingPromo.percentOff ? Number(editingPromo.percentOff) : undefined,
        amountOff: editingPromo.amountOff ? Number(editingPromo.amountOff) : undefined,
        minSubtotal: editingPromo.minSubtotal ? Number(editingPromo.minSubtotal) : undefined,
        freeShipping: editingPromo.freeShipping,
        automatic: editingPromo.automatic,
        isActive: editingPromo.isActive,
      };
      const updated = [...currentLive];
      if (existsIdx >= 0) {
        updated[existsIdx] = newPromoObj;
      } else {
        updated.push(newPromoObj);
      }
      saveLivePromos(updated);

      toast.success(`Promo code ${editingPromo.code} saved`);
      setPromoDialogOpen(false);
      loadAllData();
    } catch (err) {
      toast.error("Failed to save promo");
    }
  };

  const handleTogglePromo = async (code: string, currentActive: boolean) => {
    try {
      const nextActive = !currentActive;
      await adminTogglePromoServerFn({ data: { code, isActive: nextActive } });
      toast.success(`Promo ${code} ${nextActive ? "activated" : "deactivated"}`);
      setPromos((prev) =>
        prev.map((pr) => (pr.code === code ? { ...pr, is_active: nextActive ? 1 : 0 } : pr))
      );
      const currentLive = getLivePromos();
      const codeUpper = code.trim().toUpperCase();
      const updated = currentLive.map((p) =>
        p.code === codeUpper ? { ...p, isActive: nextActive } : p
      );
      saveLivePromos(updated);
    } catch (err) {
      toast.error("Failed to toggle promo");
    }
  };

  const handleDeletePromo = async (code: string) => {
    if (!confirm(`Delete promo code ${code}?`)) return;
    try {
      await adminDeletePromoServerFn({ data: { code } });
      toast.success("Promo deleted");
      setPromos((prev) => prev.filter((pr) => pr.code !== code));
      const currentLive = getLivePromos();
      const codeUpper = code.trim().toUpperCase();
      const updated = currentLive.filter((p) => p.code !== codeUpper);
      saveLivePromos(updated);
    } catch (err) {
      toast.error("Failed to delete promo");
    }
  };

  // --- Stock Alert Actions ---
  const handleNotifyAlert = async (id: string) => {
    try {
      await adminNotifyStockAlertServerFn({ data: { id } });
      toast.success("Marked as customer notified!");
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, notified: 1, notified_at: Date.now() } : a))
      );
    } catch (err) {
      toast.error("Failed to update alert");
    }
  };

  // --- Quick Price Actions ---
  const handleOpenQuickPrice = (p: DbProduct) => {
    setQuickPriceProduct(p);
    setQuickVariants(
      (p.variants || []).map((v) => ({
        id: v.id,
        label: v.label,
        price: v.price,
        mrp: v.mrp,
        stock: v.stock,
      }))
    );
  };

  const handleSaveQuickPrices = async () => {
    if (!quickPriceProduct) return;
    let gallery: string[] = [];
    try {
      gallery = JSON.parse(quickPriceProduct.gallery);
    } catch {
      gallery = [quickPriceProduct.image];
    }

    for (const v of quickVariants) {
      if (!(Number(v.price) > 0)) {
        toast.error(`"${v.label}" needs a valid positive price.`);
        return;
      }
      if (v.mrp !== null && v.mrp !== undefined && Number(v.mrp) < Number(v.price)) {
        toast.error(`"${v.label}": offer price cannot be higher than the regular price.`);
        return;
      }
    }

    const input: AdminProductInput = {
      slug: quickPriceProduct.slug,
      name: quickPriceProduct.name,
      tagline: quickPriceProduct.tagline,
      format: quickPriceProduct.format,
      category: quickPriceProduct.category || quickPriceProduct.format,
      sku: quickPriceProduct.sku || "",
      status: quickPriceProduct.status || (quickPriceProduct.in_stock ? "active" : "out_of_stock"),
      glutenFree: Boolean(quickPriceProduct.gluten_free),
      bestseller: Boolean(quickPriceProduct.bestseller),
      image: quickPriceProduct.image,
      gallery,
      description: quickPriceProduct.description,
      ingredients: quickPriceProduct.ingredients,
      usage: quickPriceProduct.usage,
      shelfLife: quickPriceProduct.shelf_life || "12 months from packing. Store in an airtight container.",
      inStock: Boolean(quickPriceProduct.in_stock),
      stockLeft: quickPriceProduct.stock_left,
      rating: Math.min(4.9, Math.max(4.5, Number(quickPriceProduct.rating || 4.8))),
      reviews: quickPriceProduct.reviews ?? 100,
      variants: quickVariants.map((qv) => {
        const original = quickPriceProduct.variants?.find((v) => v.id === qv.id);
        return {
          ...qv,
          image: original?.image ?? null,
          gallery: original?.gallery ? JSON.parse(original.gallery) : null,
        };
      }),
    };

    try {
      await adminSaveProductServerFn({ data: { ...input, adminToken } });
      toast.success("Product price updated successfully.");
      setQuickPriceProduct(null);
      notifyStorefrontProductsChanged();
      loadAllData();
    } catch {
      toast.error("Failed to update product prices");
    }
  };

  // --- Calculation Metrics Actions ---
  const handleSaveMetrics = (newMetrics: CalculationMetrics) => {
    setMetrics(newMetrics);
    saveLiveMetrics(newMetrics);
    toast.success("Calculation metrics saved successfully!");
  };

  const handleResetMetrics = () => {
    if (!confirm("Reset all calculation metrics to system defaults?")) return;
    setMetrics(DEFAULT_METRICS);
    resetLiveMetrics();
    toast.info("Calculation metrics reset to factory defaults");
  };

  // --- Export Deals Actions ---
  const handleSaveExportDeal = (deal: ExportDeal) => {
    setExportDeals((prev) => {
      const exists = prev.some((d) => d.id === deal.id);
      const updated = exists ? prev.map((d) => (d.id === deal.id ? deal : d)) : [deal, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("yg_export_deals", JSON.stringify(updated));
      }
      return updated;
    });
    setNewDealDialogOpen(false);
    setEditingDeal({});
    toast.success("Export deal saved successfully");
  };

  const handleDeleteExportDeal = (id: string) => {
    if (!confirm(`Delete export deal ${id}?`)) return;
    setExportDeals((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("yg_export_deals", JSON.stringify(updated));
      }
      return updated;
    });
    toast.success("Export deal removed");
  };

  const handleUpdateDealStage = (id: string, stage: ExportDeal["stage"]) => {
    setExportDeals((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, stage } : d));
      if (typeof window !== "undefined") {
        localStorage.setItem("yg_export_deals", JSON.stringify(updated));
      }
      return updated;
    });
    toast.success(`Deal stage updated to ${formatStatus(stage)}`);
  };

  const handleExportDealsCsv = () => {
    const headers = [
      "Deal ID",
      "Company Name",
      "Contact Person",
      "Country",
      "Destination Port",
      "Email",
      "Phone",
      "Product Type",
      "Quantity",
      "Currency",
      "Deal Value",
      "Stage",
      "Incoterms",
      "Payment Terms",
      "Date",
    ];
    const rows = exportDeals.map((d) => [
      `"${d.id}"`,
      `"${d.companyName}"`,
      `"${d.contactPerson}"`,
      `"${d.country}"`,
      `"${d.destinationPort}"`,
      `"${d.email}"`,
      `"${d.phone}"`,
      `"${d.productType}"`,
      `"${d.quantityMetric}"`,
      `"${d.dealValueCurrency}"`,
      d.dealValueAmount,
      `"${d.stage}"`,
      `"${d.incoterms}"`,
      `"${d.paymentTerms}"`,
      `"${d.createdAt}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `yg_export_deals_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Export deals downloaded as CSV");
  };

  // --- Admin Messages & Mails Actions ---
  const handleUpdateMessageStatus = (id: string, status: AdminMessage["status"]) => {
    setAdminMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, status } : m));
      if (typeof window !== "undefined") {
        localStorage.setItem("yg_admin_messages", JSON.stringify(updated));
      }
      return updated;
    });
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage((prev) => (prev ? { ...prev, status } : null));
    }
    toast.success(`Message marked as ${status}`);
  };

  const handleSaveMessageNote = (id: string) => {
    if (!messageNoteInput.trim()) return;
    setAdminMessages((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, adminNotes: messageNoteInput.trim() } : m));
      if (typeof window !== "undefined") {
        localStorage.setItem("yg_admin_messages", JSON.stringify(updated));
      }
      return updated;
    });
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage((prev) => (prev ? { ...prev, adminNotes: messageNoteInput.trim() } : null));
    }
    setMessageNoteInput("");
    toast.success("Internal admin note saved");
  };

  const handleDeleteMessage = (id: string) => {
    if (!confirm("Delete this inquiry message?")) return;
    setAdminMessages((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("yg_admin_messages", JSON.stringify(updated));
      }
      return updated;
    });
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage(null);
    }
    toast.success("Message deleted");
  };

  const handleExportMessagesCsv = () => {
    const headers = ["Message ID", "Sender Name", "Email", "Phone", "Category", "Subject", "Status", "Date", "Admin Note"];
    const rows = adminMessages.map((m) => [
      `"${m.id}"`,
      `"${m.senderName}"`,
      `"${m.email}"`,
      `"${m.phone}"`,
      `"${m.category}"`,
      `"${m.subject.replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${m.receivedAt}"`,
      `"${(m.adminNotes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `yg_customer_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Customer inquiries downloaded as CSV");
  };

  // Filtered orders
  const filteredOrders = (orders || []).filter((o) => {
    if (!o) return false;
    const matchesStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    const matchesSearch =
      !orderSearch ||
      (o.id && o.id.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (o.email && o.email.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (o.phone && String(o.phone).includes(orderSearch));
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-[#FAF3D6]/40">
        <div className="w-full max-w-md bg-card border border-[#E8DEC8] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF9933] text-[#181206] mb-2 shadow-md font-display font-black text-xl">
              YG
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground font-display">Y.G Admin Portal</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Tirunelveli Works & Store Administration Portal. Sign in to manage products, pricing, orders, calculation metrics, export deals, and messages.
            </p>
          </div>

          <form onSubmit={(e) => handleLogin(e)} className="space-y-4">
            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-medium border border-destructive/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <Label htmlFor="admin-username" className="text-xs font-semibold">Username</Label>
              <Input
                id="admin-username"
                type="text"
                placeholder="admin"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="bg-background border-[#E8DEC8]"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="admin-password" className="text-xs font-semibold">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-background border-[#E8DEC8]"
              />
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={loginBusy}
              className="w-full font-semibold border-primary/40 hover:bg-primary/10 mt-1"
            >
              <KeyRound className="h-4 w-4 mr-2 text-primary" />
              {loginBusy ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-[#E8DEC8]">
            <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground hover:text-foreground">
              <Link to="/">← Return to Storefront</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Admin Top Header */}
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              YG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold leading-tight">Y.G Admin Portal</h1>
                <Badge variant="outline" className="text-[10px] uppercase border-primary/30 text-primary">
                  SQLite Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Tirunelveli Works Management Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={loadAllData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">View Storefront</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1.5 text-destructive hover:bg-destructive hover:text-destructive-foreground">
              <LogOut className="h-3.5 w-3.5" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container-page mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap items-center gap-1.5 h-auto p-1.5 bg-muted/60 rounded-xl border border-border">
            <TabsTrigger value="overview" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <LayoutDashboard className="h-3.5 w-3.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Package className="h-3.5 w-3.5" /> Orders
              {orders.filter((o) => o.status === "placed" || o.status === "refund_requested").length > 0 && (
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.2 text-[10px] text-primary-foreground font-semibold">
                  {orders.filter((o) => o.status === "placed" || o.status === "refund_requested").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="products" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Layers className="h-3.5 w-3.5" /> Products & Pricing
            </TabsTrigger>
            <TabsTrigger value="metrics" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Calculator className="h-3.5 w-3.5 text-primary" /> Calculation Metrics
            </TabsTrigger>
            <TabsTrigger value="export_deals" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Globe2 className="h-3.5 w-3.5 text-emerald-600" /> Export Deals
              <span className="ml-1 rounded-full bg-emerald-600 px-1.5 py-0.2 text-[10px] text-white font-semibold">
                {exportDeals.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Mail className="h-3.5 w-3.5 text-amber-600" /> Mails & Inquiries
              {adminMessages.filter((m) => m.status === "unread").length > 0 && (
                <span className="ml-1 rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] text-white font-semibold">
                  {adminMessages.filter((m) => m.status === "unread").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="reviews" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Star className="h-3.5 w-3.5" /> Reviews
              {reviews.filter((r) => r.status === "pending").length > 0 && (
                <span className="ml-1 rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] text-white font-semibold">
                  {reviews.filter((r) => r.status === "pending").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="questions" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <HelpCircle className="h-3.5 w-3.5" /> Q&A
              {questions.filter((q) => q.status === "pending" || !q.answer).length > 0 && (
                <span className="ml-1 rounded-full bg-[#D4AF37] px-1.5 py-0.2 text-[10px] text-[#181206] font-bold">
                  {questions.filter((q) => q.status === "pending" || !q.answer).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="tickets" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <LifeBuoy className="h-3.5 w-3.5" /> Support
              {tickets.filter((t) => t.status === "open").length > 0 && (
                <span className="ml-1 rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] text-white font-semibold">
                  {tickets.filter((t) => t.status === "open").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="promos" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Tag className="h-3.5 w-3.5" /> Promos
            </TabsTrigger>
            <TabsTrigger value="alerts" className="py-2 px-3 flex items-center gap-1.5 text-xs">
              <Bell className="h-3.5 w-3.5" /> Alerts
              {alerts.filter((a) => a.notified === 0).length > 0 && (
                <span className="ml-1 rounded-full bg-muted-foreground px-1.5 py-0.2 text-[10px] text-background font-semibold">
                  {alerts.filter((a) => a.notified === 0).length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ======================================================== */}
          {/* TAB 1: OVERVIEW & DASHBOARD */}
          {/* ======================================================== */}
          <TabsContent value="overview" className="space-y-6">
            {stats && (
              <>
                {/* Metric Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                        Total Revenue
                      </p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
                        <DollarSign className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{formatPrice(stats.totalRevenue)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">From {stats.totalOrders} total orders</p>
                  </div>

                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                        Orders Today
                      </p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                        <ShoppingBag className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{stats.ordersPlacedToday}</p>
                    <p className="mt-1 text-xs text-muted-foreground">New orders placed in last 24h</p>
                  </div>

                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                        Action Required
                      </p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">
                      {stats.pendingReviewsCount + stats.openQuestionsCount + stats.openTicketsCount}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stats.pendingReviewsCount} reviews · {stats.openQuestionsCount} Qs · {stats.openTicketsCount} tickets
                    </p>
                  </div>

                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                        Inventory Watch
                      </p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{stats.lowStockProductsCount}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Low stock or sold out ({stats.stockAlertsCount} alerts waiting)
                    </p>
                  </div>
                </div>

                {/* Product Catalog Summary */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Total Products</p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Package className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{stats.totalProducts ?? products.length}</p>
                  </div>
                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Active</p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{stats.activeProducts ?? 0}</p>
                  </div>
                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Out of Stock</p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-rose-500/10 text-rose-600">
                        <XCircle className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{stats.outOfStockProducts ?? 0}</p>
                  </div>
                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Draft / Hidden</p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-muted text-muted-foreground">
                        <Eye className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{stats.draftOrHiddenProducts ?? 0}</p>
                  </div>
                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium uppercase text-muted-foreground tracking-wider">Featured</p>
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-amber-500/10 text-amber-600">
                        <Star className="h-4 w-4" />
                      </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold font-display">{stats.featuredProducts ?? 0}</p>
                  </div>
                </div>

                {/* Sales Chart & Status Breakdown */}
                <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
                  {/* Sales trend */}
                  <div className="surface-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-base font-semibold">7-Day Sales Trend</h2>
                        <p className="text-xs text-muted-foreground">Daily revenue from placed orders</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" /> Live
                      </Badge>
                    </div>

                    <div className="mt-6 flex h-48 items-end gap-3 pt-4 border-b border-border">
                      {(stats?.recentSalesTrend || []).map((day, idx) => {
                        const trend = stats?.recentSalesTrend || [];
                        const maxRev = trend.length > 0 ? Math.max(...trend.map((d) => d.revenue), 1000) : 1000;
                        const heightPct = Math.max(10, Math.round((day.revenue / maxRev) * 100));
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="text-[10px] font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                              {formatPrice(day.revenue)}
                            </div>
                            <div
                              style={{ height: `${heightPct}%` }}
                              className="w-full rounded-t-md bg-primary/80 group-hover:bg-primary transition-all duration-300 relative"
                            />
                            <span className="text-[11px] text-muted-foreground font-medium">{day.date}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Status distribution */}
                  <div className="surface-card p-6">
                    <h2 className="text-base font-semibold">Orders Pipeline</h2>
                    <p className="text-xs text-muted-foreground mb-4">Current order fulfillment stages</p>

                    <div className="space-y-3">
                      {[
                        { key: "placed", label: "New / Placed", color: "bg-[#D4AF37]" },
                        { key: "packed", label: "Packed in Works", color: "bg-amber-500" },
                        { key: "shipped", label: "Shipped with Courier", color: "bg-purple-500" },
                        { key: "out", label: "Out for Delivery", color: "bg-[#FF9933]" },
                        { key: "delivered", label: "Delivered", color: "bg-emerald-500" },
                        { key: "refund_requested", label: "Refund Requested", color: "bg-rose-500" },
                        { key: "cancelled", label: "Cancelled", color: "bg-zinc-500" },
                      ].map((st) => {
                        const count = (stats?.ordersByStatus && (stats.ordersByStatus as Record<string, number>)[st.key]) ?? 0;
                        return (
                          <div
                            key={st.key}
                            onClick={() => {
                              setOrderStatusFilter(st.key);
                              setActiveTab("orders");
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`h-2.5 w-2.5 rounded-full ${st.color}`} />
                              <span className="text-sm font-medium">{st.label}</span>
                            </div>
                            <Badge variant="outline" className="font-mono text-xs">
                              {count}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="surface-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-base font-semibold">Recent Orders</h2>
                      <p className="text-xs text-muted-foreground">Latest orders received across the store</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                      View all ({orders.length})
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="border-b border-border text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="pb-3 font-medium">Order ID</th>
                          <th className="pb-3 font-medium">Placed</th>
                          <th className="pb-3 font-medium">Customer</th>
                          <th className="pb-3 font-medium">Items</th>
                          <th className="pb-3 font-medium">Total</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {stats.recentOrders.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-muted-foreground text-xs">
                              No orders yet. Live customer orders will appear here in real-time.
                            </td>
                          </tr>
                        ) : (
                          stats.recentOrders.map((o) => (
                            <tr key={o.id} className="hover:bg-muted/30 transition-colors">
                              <td className="py-3 font-mono font-semibold text-primary">{o.id}</td>
                              <td className="py-3 text-xs text-muted-foreground">
                                {o.createdAt
                                  ? new Date(o.createdAt).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })
                                  : "Recent"}
                              </td>
                              <td className="py-3">{o.email}</td>
                              <td className="py-3">{o.itemCount} items</td>
                              <td className="py-3 font-medium">{formatPrice(o.total)}</td>
                              <td className="py-3">
                                <Badge
                                  variant={
                                    o.status === "delivered"
                                      ? "default"
                                      : o.status === "cancelled"
                                        ? "destructive"
                                        : "secondary"
                                  }
                                  className="capitalize text-xs"
                                >
                                  {formatStatus(o.status)}
                                </Badge>
                              </td>
                              <td className="py-3 text-right">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    const full = orders.find((x) => x.id === o.id);
                                    if (full) setSelectedOrder(full);
                                  }}
                                >
                                  <Eye className="h-3.5 w-3.5 mr-1" /> View
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB 2: ORDERS MANAGEMENT */}
          {/* ======================================================== */}
          <TabsContent value="orders" className="space-y-4">
            <div className="surface-card p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search ID, email, phone..."
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="pl-9 text-xs"
                    />
                  </div>
                  <Select value={orderStatusFilter} onValueChange={setOrderStatusFilter}>
                    <SelectTrigger className="w-44 text-xs">
                      <SelectValue placeholder="Status filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="placed">Placed</SelectItem>
                      <SelectItem value="packed">Packed</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="out">Out for delivery</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="refund_requested">Refund requested</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-muted-foreground">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </div>
                  {orders.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
                      onClick={handleClearAllOrders}
                    >
                      <Trash2 className="h-3 w-3 mr-1" /> Clear Test Orders
                    </Button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-xs uppercase text-muted-foreground border-b border-border">
                    <tr>
                      <th className="p-3 font-medium">Order</th>
                      <th className="p-3 font-medium">Customer & Address</th>
                      <th className="p-3 font-medium">Items</th>
                      <th className="p-3 font-medium">Payment & Total</th>
                      <th className="p-3 font-medium">Status & Flow</th>
                      <th className="p-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground text-sm">
                          No orders in the database. New customer orders will appear here automatically.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 align-top">
                            <span className="font-mono font-bold text-primary block">{o.id}</span>
                            <span className="text-xs text-muted-foreground block">
                              {o.createdAt
                                ? new Date(o.createdAt).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "Recent"}
                            </span>
                            <Badge variant="outline" className="mt-1 text-[10px] uppercase">
                              {o.delivery} delivery
                            </Badge>
                          </td>

                          <td className="p-3 align-top max-w-xs">
                            <div className="font-medium text-xs">
                              {o.address.firstName} {o.address.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">{o.email}</div>
                            <div className="text-xs text-muted-foreground">{o.phone}</div>
                            <div className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                              {o.address.line1}, {o.address.city} {o.address.pin}
                            </div>
                          </td>

                          <td className="p-3 align-top max-w-xs">
                            <div className="space-y-1">
                              {o.items.map((it, idx) => (
                                <div key={idx} className="text-xs flex items-center justify-between gap-2">
                                  <span className="line-clamp-1">
                                    {it.qty} × {it.name} ({it.variantLabel})
                                  </span>
                                  <span className="text-muted-foreground font-mono">
                                    {formatPrice(it.price * it.qty)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>

                          <td className="p-3 align-top">
                            <div className="font-bold text-sm">{formatPrice(o.totals.total)}</div>
                            <Badge variant="secondary" className="text-[10px] uppercase mt-1">
                              {o.payment}
                            </Badge>
                            {o.promoCode && (
                              <div className="text-[10px] text-emerald-600 font-medium mt-1">
                                Code: {o.promoCode} (-{formatPrice(o.totals.discount)})
                              </div>
                            )}
                          </td>

                          <td className="p-3 align-top">
                            <div className="space-y-1.5">
                              <Badge
                                variant={
                                  o.status === "delivered"
                                    ? "default"
                                    : o.status === "cancelled"
                                      ? "destructive"
                                      : "secondary"
                                }
                                className="capitalize text-xs block w-fit"
                              >
                                {formatStatus(o.status)}
                              </Badge>

                              {/* Quick status stepper button */}
                              {o.status === "placed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => handleUpdateOrderStatus(o.id, "packed")}
                                >
                                  Mark Packed →
                                </Button>
                              )}
                              {o.status === "packed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => handleUpdateOrderStatus(o.id, "shipped")}
                                >
                                  Mark Shipped →
                                </Button>
                              )}
                              {o.status === "shipped" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => handleUpdateOrderStatus(o.id, "out")}
                                >
                                  Mark Out for Delivery →
                                </Button>
                              )}
                              {o.status === "out" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs"
                                  onClick={() => handleUpdateOrderStatus(o.id, "delivered")}
                                >
                                  Mark Delivered ✓
                                </Button>
                              )}

                              {o.resolution && (
                                <div className="text-[11px] text-rose-600 font-medium bg-rose-50 p-1.5 rounded border border-rose-200">
                                  {o.resolution.type === "cancellation" ? "Cancellation" : "Refund"}: {o.resolution.reason}
                                </div>
                              )}
                            </div>
                          </td>

                          <td className="p-3 align-top text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button size="sm" variant="outline" className="h-8 text-xs" onClick={() => setSelectedOrder(o)}>
                                <Eye className="h-3.5 w-3.5 mr-1" /> Details
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                title={`Delete order ${o.id}`}
                                onClick={() => handleDeleteOrder(o.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB 3: PRODUCTS & INVENTORY */}
          {/* ======================================================== */}
          <TabsContent value="products" className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Products Management</h2>
                  <p className="text-xs text-muted-foreground">Add products, edit details, manage categories, pricing, images, and visibility</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" onClick={() => setCategoryDialogOpen(true)}>
                    <Tag className="h-4 w-4 mr-1.5" /> Manage Categories
                  </Button>
                  <Button onClick={handleOpenNewProduct}>
                    <Plus className="h-4 w-4 mr-1.5" /> Add Product
                  </Button>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex flex-1 w-full flex-wrap gap-2 items-center">
                  <div className="relative flex-1 min-w-[180px] max-w-sm">
                    <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, SKU, slug..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-8 h-8 text-xs"
                    />
                  </div>
                  <Select value={productFormatFilter} onValueChange={setProductFormatFilter}>
                    <SelectTrigger className="h-8 text-xs w-[170px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={productStatusFilter} onValueChange={setProductStatusFilter}>
                    <SelectTrigger className="h-8 text-xs w-[140px]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={productSort} onValueChange={(v: any) => setProductSort(v)}>
                    <SelectTrigger className="h-8 text-xs w-[150px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Recently updated</SelectItem>
                      <SelectItem value="name">Name (A–Z)</SelectItem>
                      <SelectItem value="price">Price (low–high)</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0 pl-1">
                    <Switch checked={showArchivedProducts} onCheckedChange={setShowArchivedProducts} />
                    Show archived
                  </label>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">
                  Showing {filteredSortedProducts.length} of {products.length} products
                </div>
              </div>

              {loading ? (
                <div className="py-16 text-center text-sm text-muted-foreground">
                  <Loader2 className="h-5 w-5 mx-auto mb-2 animate-spin" />
                  Loading products…
                </div>
              ) : filteredSortedProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <Package className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-sm font-medium text-foreground">No products found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {productSearch || productFormatFilter !== "all" || productStatusFilter !== "all"
                      ? "Try adjusting your search or filters."
                      : "Get started by adding your first product."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop table */}
                  <div className="hidden lg:block overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                          <th className="px-3 py-2.5 font-medium">Product</th>
                          <th className="px-3 py-2.5 font-medium">Category</th>
                          <th className="px-3 py-2.5 font-medium">Price</th>
                          <th className="px-3 py-2.5 font-medium">Offer Price</th>
                          <th className="px-3 py-2.5 font-medium">Stock / Status</th>
                          <th className="px-3 py-2.5 font-medium">Featured</th>
                          <th className="px-3 py-2.5 font-medium">Updated</th>
                          <th className="px-3 py-2.5 font-medium text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {paginatedProducts.map((p) => {
                          const firstVariant = p.variants?.[0];
                          const categoryName = categories.find((c) => c.slug === p.category)?.name || p.category;
                          return (
                            <tr key={p.slug} className={p.archived === 1 ? "opacity-50" : ""}>
                              <td className="px-3 py-2.5">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <div className="h-10 w-10 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                                    <img
                                      src={getDisplayImageUrl(p.image)}
                                      alt={p.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-medium truncate max-w-[220px]">{p.name}</p>
                                    <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                                      {p.sku || p.slug}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-3 py-2.5">
                                <Badge variant="secondary" className="text-[10px] capitalize">{categoryName}</Badge>
                              </td>
                              <td className="px-3 py-2.5 font-mono text-xs">
                                {firstVariant?.mrp ? formatPrice(firstVariant.mrp) : firstVariant ? formatPrice(firstVariant.price) : "—"}
                              </td>
                              <td className="px-3 py-2.5 font-mono text-xs font-semibold">
                                {firstVariant ? formatPrice(firstVariant.price) : "—"}
                              </td>
                              <td className="px-3 py-2.5">
                                <Select
                                  value={p.status || "active"}
                                  onValueChange={(v: DbProductStatus) => handleSetProductStatus(p.slug, v)}
                                >
                                  <SelectTrigger className="h-7 text-[11px] w-[125px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                    <SelectItem value="hidden">Hidden</SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="px-3 py-2.5">
                                {p.bestseller ? (
                                  <Badge className="text-[9px] bg-amber-600">Featured</Badge>
                                ) : (
                                  <span className="text-xs text-muted-foreground">—</span>
                                )}
                              </td>
                              <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                                {new Date(p.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                              </td>
                              <td className="px-3 py-2.5">
                                <div className="flex items-center justify-end gap-1">
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="View on storefront" asChild>
                                    <Link to="/product/$slug" params={{ slug: p.slug }} target="_blank">
                                      <Eye className="h-3.5 w-3.5" />
                                    </Link>
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Quick edit prices" onClick={() => handleOpenQuickPrice(p)}>
                                    <Coins className="h-3.5 w-3.5 text-[#D4AF37]" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="Edit product" onClick={() => handleEditProduct(p)}>
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  {p.archived === 1 ? (
                                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-emerald-600" title="Restore product" onClick={() => handleRestoreProduct(p.slug)}>
                                      <RefreshCw className="h-3.5 w-3.5" />
                                    </Button>
                                  ) : (
                                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10" title="Delete product" onClick={() => setDeletingProduct(p)}>
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile cards */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                    {paginatedProducts.map((p) => {
                      const categoryName = categories.find((c) => c.slug === p.category)?.name || p.category;
                      return (
                        <div key={p.slug} className={`surface-card p-4 flex flex-col justify-between border border-border ${p.archived === 1 ? "opacity-60" : ""}`}>
                          <div>
                            <div className="flex items-start gap-3">
                              <div className="h-14 w-14 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                                <img src={getDisplayImageUrl(p.image)} alt={p.name} className="h-full w-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                  <Badge variant="secondary" className="capitalize text-[10px]">{categoryName}</Badge>
                                  {p.bestseller ? <Badge className="text-[9px] bg-amber-600">Featured</Badge> : null}
                                  {p.archived === 1 ? <Badge variant="outline" className="text-[9px]">Archived</Badge> : null}
                                </div>
                                <h3 className="font-semibold text-sm leading-snug truncate">{p.name}</h3>
                                <p className="text-[11px] text-muted-foreground mt-0.5">{p.sku || p.slug}</p>
                              </div>
                            </div>

                            <div className="mt-3 space-y-1 border-t border-b border-border/60 py-2.5 text-xs">
                              {(p.variants || []).slice(0, 3).map((v) => (
                                <div key={v.id} className="flex items-center justify-between">
                                  <span>{v.label}</span>
                                  <span className="font-mono font-semibold">{formatPrice(v.price)}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <Select
                              value={p.status || "active"}
                              onValueChange={(v: DbProductStatus) => handleSetProductStatus(p.slug, v)}
                            >
                              <SelectTrigger className="h-7 text-[11px] w-[115px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                <SelectItem value="hidden">Hidden</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" title="View on storefront" asChild>
                                <Link to="/product/$slug" params={{ slug: p.slug }} target="_blank">
                                  <Eye className="h-3.5 w-3.5" />
                                </Link>
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => handleOpenQuickPrice(p)}>
                                <Coins className="h-3.5 w-3.5 text-[#D4AF37]" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => handleEditProduct(p)}>
                                <Edit className="h-3.5 w-3.5" />
                              </Button>
                              {p.archived === 1 ? (
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-emerald-600" onClick={() => handleRestoreProduct(p.slug)}>
                                  <RefreshCw className="h-3.5 w-3.5" />
                                </Button>
                              ) : (
                                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => setDeletingProduct(p)}>
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {productTotalPages > 1 ? (
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Page {productPage} of {productTotalPages}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                          disabled={productPage <= 1}
                          onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                        >
                          Previous
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs"
                          disabled={productPage >= productTotalPages}
                          onClick={() => setProductPage((p) => Math.min(productTotalPages, p + 1))}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB 4: REVIEWS MODERATION */}
          {/* ======================================================== */}
          <TabsContent value="reviews" className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Customer Reviews Moderation</h2>
                  <p className="text-xs text-muted-foreground">Approve or reject guest reviews submitted across products</p>
                </div>
              </div>

              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-8 text-center">No reviews in database.</p>
                ) : (
                  reviews.map((r) => (
                    <div key={r.id} className="surface-card p-4 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex text-amber-500">
                            {Array.from({ length: r.rating }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5 fill-current" />
                            ))}
                          </div>
                          <span className="font-semibold text-sm">{r.title}</span>
                          <Badge
                            variant={
                              r.status === "published"
                                ? "default"
                                : r.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="text-[10px] capitalize"
                          >
                            {r.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{r.comment}</p>
                        <div className="text-[11px] text-muted-foreground">
                          By <span className="font-medium text-foreground">{r.name}</span> ({r.city || "India"}) · For product <span className="font-mono font-medium text-primary">{r.slug}</span> · {new Date(r.created_at).toLocaleDateString("en-IN")}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {r.status !== "published" && (
                          <Button size="sm" variant="default" onClick={() => handleModerateReview(r.id, "publish")}>
                            <Check className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                        )}
                        {r.status !== "rejected" && (
                          <Button size="sm" variant="outline" onClick={() => handleModerateReview(r.id, "reject")}>
                            <X className="h-3.5 w-3.5 mr-1" /> Reject
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleModerateReview(r.id, "delete")}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB 5: QUESTIONS & ANSWERS */}
          {/* ======================================================== */}
          <TabsContent value="questions" className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Product Q&A Desk</h2>
                  <p className="text-xs text-muted-foreground">Answer visitor questions to publish official Tirunelveli team advice on product pages</p>
                </div>
              </div>

              <div className="space-y-3">
                {questions.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-8 text-center">No questions submitted yet.</p>
                ) : (
                  questions.map((q) => (
                    <div key={q.id} className="surface-card p-4 border border-border space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-[10px]">
                              {q.slug}
                            </Badge>
                            <Badge
                              variant={q.answer ? "default" : "secondary"}
                              className="text-[10px]"
                            >
                              {q.answer ? "Answered" : "Needs Answer"}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-sm mt-1.5">{q.question}</h4>
                          <p className="text-[11px] text-muted-foreground">
                            Asked by {q.asked_by} on {new Date(q.created_at).toLocaleDateString("en-IN")}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <Button
                            size="sm"
                            variant={q.answer ? "outline" : "default"}
                            onClick={() => {
                              setAnsweringQuestion(q);
                              setAnswerText(q.answer || "");
                            }}
                          >
                            {q.answer ? "Edit Answer" : "Write Answer"}
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteQuestion(q.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      {q.answer && (
                        <div className="rounded-lg bg-primary/5 p-3 border border-primary/20 text-xs">
                          <p className="font-semibold text-primary mb-1 flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5" /> Answer from {q.answered_by || "Y.G team"}:
                          </p>
                          <p className="text-muted-foreground">{q.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB 6: SUPPORT TICKETS */}
          {/* ======================================================== */}
          <TabsContent value="tickets" className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Customer Support Desk</h2>
                  <p className="text-xs text-muted-foreground">Customer queries from contact form and order support dialog</p>
                </div>
              </div>

              <div className="space-y-3">
                {tickets.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-8 text-center">No support tickets found.</p>
                ) : (
                  tickets.map((t) => (
                    <div key={t.id} className="surface-card p-4 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-primary">{t.id}</span>
                          <span className="font-semibold text-sm">{t.topic}</span>
                          <Badge
                            variant={
                              String(t?.status) === "resolved"
                                ? "default"
                                : String(t?.status) === "open"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="text-[10px] capitalize"
                          >
                            {formatStatus(t?.status)}
                          </Badge>
                          {t.order_id && (
                            <Badge variant="outline" className="font-mono text-[10px]">
                              Order {t.order_id}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{t.message}</p>
                        <div className="text-[11px] text-muted-foreground">
                          Contact: <span className="font-medium text-foreground">{t.contact}</span> · Raised on {t.created_at ? new Date(t.created_at).toLocaleString("en-IN") : "Recent"}
                        </div>
                        {t.reply && (
                          <div className="text-xs bg-muted/60 p-2 rounded mt-2 border border-border">
                            <span className="font-medium text-foreground">Reply/Note:</span> {t.reply}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setRespondingTicket(t);
                            setTicketStatusVal(t.status);
                            setTicketReplyText(t.reply || "");
                          }}
                        >
                          Respond / Update
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB 7: PROMOS & COUPONS */}
          {/* ======================================================== */}
          <TabsContent value="promos" className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Promo Codes & Discounts</h2>
                  <p className="text-xs text-muted-foreground">Configure coupons, automatic basket discounts, and threshold rules</p>
                </div>
                <Button
                  onClick={() => {
                    setEditingPromo({
                      code: "",
                      label: "",
                      description: "",
                      percentOff: "",
                      amountOff: "",
                      minSubtotal: "",
                      freeShipping: false,
                      automatic: false,
                      isActive: true,
                    });
                    setPromoDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1.5" /> Create Promo
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {promos.map((pr) => (
                  <div key={pr.code} className="surface-card p-4 border border-border flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-base text-primary">{pr.code}</span>
                        <Badge variant={pr.is_active ? "default" : "secondary"} className="text-[10px]">
                          {pr.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm mt-1">{pr.label}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{pr.description}</p>
                      
                      <div className="mt-3 text-xs space-y-1 text-muted-foreground">
                        {pr.percent_off && <div>• Discount: {pr.percent_off}% off</div>}
                        {pr.amount_off && <div>• Flat off: ₹{pr.amount_off}</div>}
                        {pr.min_subtotal && <div>• Min order: ₹{pr.min_subtotal}</div>}
                        {Boolean(pr.free_shipping) && <div>• Free shipping included</div>}
                        {Boolean(pr.automatic) && <Badge variant="outline" className="text-[10px] mt-1">Auto-applied</Badge>}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTogglePromo(pr.code, Boolean(pr.is_active))}
                      >
                        {pr.is_active ? "Deactivate" : "Activate"}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeletePromo(pr.code)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB 8: BACK-IN-STOCK ALERTS */}
          {/* ======================================================== */}
          <TabsContent value="alerts" className="space-y-4">
            <div className="surface-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Back-in-Stock Alert Subscribers</h2>
                  <p className="text-xs text-muted-foreground">Customers who requested notifications when sold-out items return to inventory</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-xs uppercase text-muted-foreground border-b border-border">
                    <tr>
                      <th className="p-3 font-medium">Product</th>
                      <th className="p-3 font-medium">Customer Contact</th>
                      <th className="p-3 font-medium">Registered Date</th>
                      <th className="p-3 font-medium">Status</th>
                      <th className="p-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {alerts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-muted-foreground text-sm">
                          No stock alerts registered.
                        </td>
                      </tr>
                    ) : (
                      alerts.map((al) => (
                        <tr key={al.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-medium">
                            {al.product_name || al.slug}
                            <span className="block text-xs text-muted-foreground font-mono">{al.slug}</span>
                          </td>
                          <td className="p-3 font-mono text-xs">{al.contact}</td>
                          <td className="p-3 text-xs text-muted-foreground">
                            {new Date(al.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="p-3">
                            <Badge variant={al.notified ? "default" : "secondary"} className="text-xs">
                              {al.notified ? "Notified" : "Waiting"}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            {!al.notified && (
                              <Button size="sm" variant="outline" onClick={() => handleNotifyAlert(al.id)}>
                                <Check className="h-3.5 w-3.5 mr-1" /> Mark Notified
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB: CALCULATION METRICS */}
          {/* ======================================================== */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="surface-card p-6 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold font-display text-foreground">Business Calculation Metrics</h2>
                    <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/30">
                      Live Dynamic Config
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Configure store shipping thresholds, spice GST compliance rates, wholesale B2B trade discount slabs, and simulate pricing margins.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleResetMetrics}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset Defaults
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-[#FF9933] hover:bg-[#FF9933]/90 text-[#181206] font-semibold"
                    onClick={() => handleSaveMetrics(metrics)}
                  >
                    <Save className="h-3.5 w-3.5 mr-1" /> Save Metrics
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 mt-6">
                {/* 1. Shipping & Logistics Metrics */}
                <div className="p-5 rounded-xl bg-card border border-border space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#FF9933]/15 text-[#181206]">
                        <Truck className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">Shipping & Delivery Thresholds</h3>
                        <p className="text-[11px] text-muted-foreground">Store checkout calculation parameters</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <Label htmlFor="metric-free-ship" className="text-[11px]">Free Shipping Min Order (₹)</Label>
                      <Input
                        id="metric-free-ship"
                        type="number"
                        value={metrics.freeShippingThreshold}
                        onChange={(e) => setMetrics({ ...metrics, freeShippingThreshold: Number(e.target.value) })}
                        className="h-8 text-xs font-mono"
                      />
                      <p className="text-[10px] text-muted-foreground">Orders above this get free delivery</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="metric-std-ship" className="text-[11px]">Standard Delivery Fee (₹)</Label>
                      <Input
                        id="metric-std-ship"
                        type="number"
                        value={metrics.standardDeliveryFee}
                        onChange={(e) => setMetrics({ ...metrics, standardDeliveryFee: Number(e.target.value) })}
                        className="h-8 text-xs font-mono"
                      />
                      <p className="text-[10px] text-muted-foreground">Applies when below free shipping</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="metric-exp-ship" className="text-[11px]">Express Air Delivery (₹)</Label>
                      <Input
                        id="metric-exp-ship"
                        type="number"
                        value={metrics.expressDeliveryFee}
                        onChange={(e) => setMetrics({ ...metrics, expressDeliveryFee: Number(e.target.value) })}
                        className="h-8 text-xs font-mono"
                      />
                      <p className="text-[10px] text-muted-foreground">1-2 business days express charge</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="metric-cod-fee" className="text-[11px]">COD Handling Surcharge (₹)</Label>
                      <Input
                        id="metric-cod-fee"
                        type="number"
                        value={metrics.codHandlingFee}
                        onChange={(e) => setMetrics({ ...metrics, codHandlingFee: Number(e.target.value) })}
                        className="h-8 text-xs font-mono"
                      />
                      <p className="text-[10px] text-muted-foreground">Cash-on-delivery handling fee</p>
                    </div>
                  </div>
                </div>

                {/* 2. Tax & Statutory Compliance */}
                <div className="p-5 rounded-xl bg-card border border-border space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-700">
                        <Percent className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">Spice GST & Tax Compliance</h3>
                        <p className="text-[11px] text-muted-foreground">Statutory spice tax rate and HSN classification</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <Label htmlFor="metric-gst" className="text-[11px]">Asafoetida GST Rate (%)</Label>
                      <Input
                        id="metric-gst"
                        type="number"
                        value={metrics.gstPercentage}
                        onChange={(e) => setMetrics({ ...metrics, gstPercentage: Number(e.target.value) })}
                        className="h-8 text-xs font-mono"
                      />
                      <p className="text-[10px] text-muted-foreground">Standard 5% under Indian GST Council for compounded spices</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="metric-hsn" className="text-[11px]">HSN / Tariff Code</Label>
                      <Input
                        id="metric-hsn"
                        type="text"
                        value={metrics.hsnCode}
                        onChange={(e) => setMetrics({ ...metrics, hsnCode: e.target.value })}
                        className="h-8 text-xs font-mono"
                      />
                      <p className="text-[10px] text-muted-foreground">ITC-HS 0910.30 (Ferula Foetida)</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/40 rounded-lg border border-border/80 text-[11px] text-muted-foreground leading-relaxed">
                    💡 <strong>Tax Note:</strong> Invoices generated for domestic consumers include {metrics.gstPercentage}% GST. Export shipments dispatched under Letter of Undertaking (LUT) are zero-rated.
                  </div>
                </div>

                {/* 3. B2B Wholesale Trade Discount Slabs */}
                <div className="p-5 rounded-xl bg-card border border-border space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-blue-500/15 text-blue-700">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">B2B Trade Discount Slabs</h3>
                        <p className="text-[11px] text-muted-foreground">Volume-based wholesale commercial discount tiers</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Tier 1 */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/60">
                      <div className="w-1/3">
                        <span className="font-semibold text-foreground block">Tier 1: Starter</span>
                        <span className="text-[10px] text-muted-foreground">Min {metrics.wholesaleTier1MinKg} kg order</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          type="number"
                          value={metrics.wholesaleTier1MinKg}
                          onChange={(e) => setMetrics({ ...metrics, wholesaleTier1MinKg: Number(e.target.value) })}
                          className="h-7 text-xs w-20"
                          placeholder="Min kg"
                        />
                        <span className="text-[11px] text-muted-foreground">kg =</span>
                        <Input
                          type="number"
                          value={metrics.wholesaleTier1Discount}
                          onChange={(e) => setMetrics({ ...metrics, wholesaleTier1Discount: Number(e.target.value) })}
                          className="h-7 text-xs w-20 font-bold"
                          placeholder="% off"
                        />
                        <span className="text-[11px] font-semibold text-primary">% off</span>
                      </div>
                    </div>

                    {/* Tier 2 */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/60">
                      <div className="w-1/3">
                        <span className="font-semibold text-foreground block">Tier 2: Trade</span>
                        <span className="text-[10px] text-muted-foreground">Min {metrics.wholesaleTier2MinKg} kg order</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          type="number"
                          value={metrics.wholesaleTier2MinKg}
                          onChange={(e) => setMetrics({ ...metrics, wholesaleTier2MinKg: Number(e.target.value) })}
                          className="h-7 text-xs w-20"
                          placeholder="Min kg"
                        />
                        <span className="text-[11px] text-muted-foreground">kg =</span>
                        <Input
                          type="number"
                          value={metrics.wholesaleTier2Discount}
                          onChange={(e) => setMetrics({ ...metrics, wholesaleTier2Discount: Number(e.target.value) })}
                          className="h-7 text-xs w-20 font-bold"
                          placeholder="% off"
                        />
                        <span className="text-[11px] font-semibold text-primary">% off</span>
                      </div>
                    </div>

                    {/* Tier 3 */}
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/60">
                      <div className="w-1/3">
                        <span className="font-semibold text-foreground block">Tier 3: Container / Bulk</span>
                        <span className="text-[10px] text-muted-foreground">Min {metrics.wholesaleTier3MinKg} kg order</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <Input
                          type="number"
                          value={metrics.wholesaleTier3MinKg}
                          onChange={(e) => setMetrics({ ...metrics, wholesaleTier3MinKg: Number(e.target.value) })}
                          className="h-7 text-xs w-20"
                          placeholder="Min kg"
                        />
                        <span className="text-[11px] text-muted-foreground">kg =</span>
                        <Input
                          type="number"
                          value={metrics.wholesaleTier3Discount}
                          onChange={(e) => setMetrics({ ...metrics, wholesaleTier3Discount: Number(e.target.value) })}
                          className="h-7 text-xs w-20 font-bold"
                          placeholder="% off"
                        />
                        <span className="text-[11px] font-semibold text-primary">% off</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Live Costing & Profit Margin Simulator */}
                <div className="p-5 rounded-xl bg-[#FAF3D6]/50 border border-[#E8DEC8] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#FF9933] text-[#181206]">
                        <Calculator className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm text-[#181206]">Live Margin & Pricing Simulator</h3>
                        <p className="text-[11px] text-muted-foreground">Calculate realistic COGS and recommended prices</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Raw Hing Lump (₹/kg)</Label>
                      <Input
                        type="number"
                        value={simRawCost}
                        onChange={(e) => setSimRawCost(Number(e.target.value))}
                        className="h-7 text-xs font-mono bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Compounding/Blending (₹/kg)</Label>
                      <Input
                        type="number"
                        value={simCompounding}
                        onChange={(e) => setSimCompounding(Number(e.target.value))}
                        className="h-7 text-xs font-mono bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Packaging (₹/100g unit)</Label>
                      <Input
                        type="number"
                        value={simPackaging}
                        onChange={(e) => setSimPackaging(Number(e.target.value))}
                        className="h-7 text-xs font-mono bg-background"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] text-muted-foreground">Target Margin (%)</Label>
                      <Input
                        type="number"
                        value={simMarginPct}
                        onChange={(e) => setSimMarginPct(Number(e.target.value))}
                        className="h-7 text-xs font-mono bg-background font-bold text-emerald-700"
                      />
                    </div>
                  </div>

                  {/* Calculated Outputs */}
                  {(() => {
                    const cogsPerKg = simRawCost + simCompounding + (simPackaging * 10) + (simFreight * 10);
                    const targetWholesalePerKg = cogsPerKg / Math.max(0.1, (1 - (simMarginPct / 100)));
                    const consumerPreTax100g = (cogsPerKg / 10) / Math.max(0.1, (1 - ((simMarginPct + 15) / 100)));
                    const recommendedMrp100g = Math.round(consumerPreTax100g * (1 + (metrics.gstPercentage / 100)));

                    return (
                      <div className="p-3 rounded-lg bg-background border border-[#E8DEC8] space-y-2 text-xs">
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>Total Estimated COGS (per kg):</span>
                          <span className="font-mono font-bold text-foreground">₹{cogsPerKg.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-muted-foreground">
                          <span>Target Wholesale Rate (per kg):</span>
                          <span className="font-mono font-bold text-blue-700">₹{targetWholesalePerKg.toFixed(0)}</span>
                        </div>
                        <Separator className="my-1" />
                        <div className="flex justify-between items-center text-sm font-bold">
                          <span className="text-[#181206]">Recommended 100g Retail MRP (incl {metrics.gstPercentage}% GST):</span>
                          <span className="font-mono text-base text-primary">₹{recommendedMrp100g}</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB: EXPORT BUSINESS DEALS */}
          {/* ======================================================== */}
          <TabsContent value="export_deals" className="space-y-4">
            <div className="surface-card p-6 border border-border">
              {/* Header & Stats Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold font-display text-foreground">International Export Business Deals</h2>
                    <Badge className="bg-emerald-600 text-white text-[10px]">
                      Global Pipeline
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Manage overseas buyer leads, proforma quotations, container sample shipments, and B2B export contracts.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleExportDealsCsv}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" /> Export Deals CSV
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 text-xs bg-[#FF9933] hover:bg-[#FF9933]/90 text-[#181206] font-semibold"
                    onClick={() => {
                      setEditingDeal({
                        id: `EXP-2026-${String(exportDeals.length + 1).padStart(3, "0")}`,
                        companyName: "",
                        contactPerson: "",
                        country: "Singapore",
                        destinationPort: "",
                        email: "",
                        phone: "",
                        productType: "Gold Grade Asafoetida Powder",
                        quantityMetric: "1,000 kg",
                        dealValueCurrency: "USD",
                        dealValueAmount: 25000,
                        stage: "new",
                        paymentTerms: "100% LC at sight",
                        incoterms: "FOB Tuticorin",
                        notes: "",
                        createdAt: new Date().toISOString().slice(0, 10),
                      });
                      setNewDealDialogOpen(true);
                    }}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Export Deal
                  </Button>
                </div>
              </div>

              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="text-[11px] text-muted-foreground block">Active Export Deals</span>
                  <span className="text-xl font-bold font-mono text-foreground">{exportDeals.length}</span>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="text-[11px] text-muted-foreground block">Closed Contracts</span>
                  <span className="text-xl font-bold font-mono text-emerald-600">
                    {exportDeals.filter((d) => d.stage === "contract_closed").length}
                  </span>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="text-[11px] text-muted-foreground block">Under Negotiation</span>
                  <span className="text-xl font-bold font-mono text-amber-600">
                    {exportDeals.filter((d) => d.stage === "negotiation" || d.stage === "sample_sent").length}
                  </span>
                </div>
                <div className="p-3 bg-muted/40 rounded-lg border border-border">
                  <span className="text-[11px] text-muted-foreground block">Key Destination Markets</span>
                  <span className="text-xs font-semibold text-foreground line-clamp-1 mt-1">
                    Singapore, UAE, USA, Sri Lanka
                  </span>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-4 pb-3 border-b border-border">
                <div className="flex flex-1 w-full gap-2 items-center">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                    <Input
                      placeholder="Search buyer, company, country, port..."
                      value={exportSearch}
                      onChange={(e) => setExportSearch(e.target.value)}
                      className="pl-8 h-8 text-xs"
                    />
                  </div>
                  <Select value={exportStageFilter} onValueChange={setExportStageFilter}>
                    <SelectTrigger className="h-8 text-xs w-[180px]">
                      <SelectValue placeholder="All Deal Stages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      <SelectItem value="new">New Lead</SelectItem>
                      <SelectItem value="quoted">Quoted / PI Sent</SelectItem>
                      <SelectItem value="sample_sent">Sample Dispatched</SelectItem>
                      <SelectItem value="negotiation">Under Negotiation</SelectItem>
                      <SelectItem value="contract_closed">Contract Closed</SelectItem>
                      <SelectItem value="cancelled">Cancelled / Dropped</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">
                  Showing {exportDeals.filter((d) => {
                    const matchStage = exportStageFilter === "all" || d.stage === exportStageFilter;
                    const matchSearch =
                      !exportSearch ||
                      d.companyName.toLowerCase().includes(exportSearch.toLowerCase()) ||
                      d.country.toLowerCase().includes(exportSearch.toLowerCase()) ||
                      d.contactPerson.toLowerCase().includes(exportSearch.toLowerCase());
                    return matchStage && matchSearch;
                  }).length} deals
                </div>
              </div>

              {/* Deals Table */}
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-xs uppercase text-muted-foreground border-b border-border">
                    <tr>
                      <th className="p-3 font-medium">Buyer / Destination</th>
                      <th className="p-3 font-medium">Product & Volume</th>
                      <th className="p-3 font-medium">Deal Value & Terms</th>
                      <th className="p-3 font-medium">Pipeline Stage</th>
                      <th className="p-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {exportDeals
                      .filter((d) => {
                        const matchStage = exportStageFilter === "all" || d.stage === exportStageFilter;
                        const matchSearch =
                          !exportSearch ||
                          d.companyName.toLowerCase().includes(exportSearch.toLowerCase()) ||
                          d.country.toLowerCase().includes(exportSearch.toLowerCase()) ||
                          d.contactPerson.toLowerCase().includes(exportSearch.toLowerCase());
                        return matchStage && matchSearch;
                      })
                      .map((d) => (
                        <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 align-top">
                            <div className="font-semibold text-foreground text-xs">{d.companyName}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Globe2 className="h-3 w-3 text-emerald-600" />
                              <span>{d.country} · {d.destinationPort}</span>
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-1">
                              Contact: <strong>{d.contactPerson}</strong> ({d.email})
                            </div>
                          </td>

                          <td className="p-3 align-top">
                            <div className="text-xs font-medium text-foreground">{d.productType}</div>
                            <Badge variant="outline" className="text-[10px] mt-1 font-mono">
                              Qty: {d.quantityMetric}
                            </Badge>
                            {d.notes && (
                              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 max-w-xs italic">
                                "{d.notes}"
                              </p>
                            )}
                          </td>

                          <td className="p-3 align-top">
                            <div className="font-mono font-bold text-xs text-foreground">
                              {d.dealValueCurrency} {d.dealValueAmount.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-muted-foreground mt-0.5">
                              {d.incoterms} · {d.paymentTerms}
                            </div>
                            <span className="text-[10px] text-muted-foreground font-mono mt-0.5 block">
                              Ref: {d.id}
                            </span>
                          </td>

                          <td className="p-3 align-top">
                            <Select
                              value={d.stage}
                              onValueChange={(val: any) => handleUpdateDealStage(d.id, val)}
                            >
                              <SelectTrigger className="h-7 text-[11px] w-36 capitalize">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New Lead</SelectItem>
                                <SelectItem value="quoted">Quoted / PI</SelectItem>
                                <SelectItem value="sample_sent">Sample Sent</SelectItem>
                                <SelectItem value="negotiation">Under Negotiation</SelectItem>
                                <SelectItem value="contract_closed">Contract Closed ✓</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>

                          <td className="p-3 align-top text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                                asChild
                              >
                                <a
                                  href={`mailto:${d.email}?subject=${encodeURIComponent(`Y.G Asafoetida Export Inquiry - ${d.id}`)}&body=${encodeURIComponent(`Dear ${d.contactPerson},\n\nThank you for your interest in Y.G Asafoetida products regarding ${d.productType} (${d.quantityMetric})...\n\nBest regards,\nY.G Asafoetida Export Team\nTirunelveli, Tamil Nadu, India`)}`}
                                  title="Send Email"
                                >
                                  <Mail className="h-3 w-3 mr-1" /> Mail
                                </a>
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteExportDeal(d.id)}
                                title="Delete Deal"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* ======================================================== */}
          {/* TAB: MAILS & CUSTOMER INQUIRIES */}
          {/* ======================================================== */}
          <TabsContent value="messages" className="space-y-4">
            <div className="surface-card p-6 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold font-display text-foreground">Customer Inquiries, Mails & Trade Messages</h2>
                    <Badge variant="outline" className="text-[10px] border-[#FF9933] text-[#181206] bg-[#FAF3D6]">
                      Inbox Hub
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Review and respond to guest inquiries, bulk kitchen requirements, private-label packaging requests, and wholesale queries.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={handleExportMessagesCsv}
                >
                  <Download className="h-3.5 w-3.5 mr-1" /> Export Inquiries CSV
                </Button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between my-4 pb-3 border-b border-border">
                <div className="flex flex-1 w-full gap-2 items-center flex-wrap">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                    <Input
                      placeholder="Search sender, email, subject, keyword..."
                      value={msgSearch}
                      onChange={(e) => setMsgSearch(e.target.value)}
                      className="pl-8 h-8 text-xs"
                    />
                  </div>
                  <Select value={msgCategoryFilter} onValueChange={setMsgCategoryFilter}>
                    <SelectTrigger className="h-8 text-xs w-[160px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="general">General Culinary</SelectItem>
                      <SelectItem value="wholesale">Wholesale Kitchen</SelectItem>
                      <SelectItem value="export">Export Distributorship</SelectItem>
                      <SelectItem value="private_label">Private Label / OEM</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={msgStatusFilter} onValueChange={setMsgStatusFilter}>
                    <SelectTrigger className="h-8 text-xs w-[130px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">
                  {adminMessages.filter((m) => m.status === "unread").length} unread of {adminMessages.length} total
                </div>
              </div>

              {/* Messages List */}
              <div className="space-y-3">
                {adminMessages
                  .filter((m) => {
                    const matchCat = msgCategoryFilter === "all" || m.category === msgCategoryFilter;
                    const matchStatus = msgStatusFilter === "all" || m.status === msgStatusFilter;
                    const matchSearch =
                      !msgSearch ||
                      m.senderName.toLowerCase().includes(msgSearch.toLowerCase()) ||
                      m.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
                      m.subject.toLowerCase().includes(msgSearch.toLowerCase()) ||
                      m.message.toLowerCase().includes(msgSearch.toLowerCase());
                    return matchCat && matchStatus && matchSearch;
                  })
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-xl border transition-all ${
                        msg.status === "unread"
                          ? "bg-[#FAF3D6]/40 border-[#FF9933]/70 shadow-xs"
                          : "bg-card border-border"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-foreground">{msg.senderName}</span>
                            <Badge variant="outline" className="text-[10px] capitalize">
                              {formatStatus(msg?.category)}
                            </Badge>
                            <Badge
                              className={`text-[10px] capitalize ${
                                msg?.status === "unread"
                                  ? "bg-rose-500 text-white"
                                  : msg?.status === "in_progress"
                                  ? "bg-amber-500 text-white"
                                  : "bg-emerald-600 text-white"
                              }`}
                            >
                              {formatStatus(msg?.status)}
                            </Badge>
                            <span className="text-[11px] text-muted-foreground font-mono ml-auto sm:ml-0">
                              {msg.receivedAt}
                            </span>
                          </div>

                          <p className="text-xs font-semibold text-foreground mt-1">
                            {msg.subject}
                          </p>

                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {msg.message}
                          </p>

                          {/* Contact pills */}
                          <div className="flex items-center gap-3 pt-1 text-[11px] text-muted-foreground font-mono">
                            <span>📧 {msg.email}</span>
                            <span>📞 {msg.phone}</span>
                          </div>

                          {/* Admin Note if any */}
                          {msg.adminNotes && (
                            <div className="p-2 rounded bg-muted/50 border border-border/60 text-[11px] text-foreground">
                              📝 <strong>Admin Note:</strong> {msg.adminNotes}
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0 pt-2 sm:pt-0">
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-[#FF9933] hover:bg-[#FF9933]/90 text-[#181206]"
                            asChild
                          >
                            <a
                              href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}&body=${encodeURIComponent(`Dear ${msg.senderName},\n\nThank you for reaching out to Y.G Asafoetida regarding your query:\n"${msg.subject}"\n\n\nBest regards,\nY.G Asafoetida Support Team\nNellai Heritage Works`)}`}
                              onClick={() => handleUpdateMessageStatus(msg.id, "replied")}
                            >
                              <Mail className="h-3 w-3 mr-1" /> Reply
                            </a>
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => {
                              setActiveMessage(msg);
                              setMessageNoteInput(msg.adminNotes || "");
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" /> Note / Status
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteMessage(msg.id)}
                            title="Delete Message"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ======================================================== */}
      {/* DIALOGS & MODALS */}
      {/* ======================================================== */}

      {/* 1. ORDER DETAIL MODAL */}
      <Dialog open={Boolean(selectedOrder)} onOpenChange={(open: boolean) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="font-mono text-xl text-primary font-bold">
                    Order {selectedOrder.id}
                  </DialogTitle>
                  <Badge className="capitalize text-xs">
                    {formatStatus(selectedOrder?.status)}
                  </Badge>
                </div>
                <DialogDescription>
                  Placed on {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString("en-IN") : "Recent"} · {selectedOrder.delivery} shipping
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 text-sm">
                {/* Customer Details */}
                <div className="grid sm:grid-cols-2 gap-4 bg-muted/40 p-4 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Customer Info
                    </h4>
                    <p className="font-medium">{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                    <p className="text-muted-foreground text-xs">{selectedOrder.email}</p>
                    <p className="text-muted-foreground text-xs">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Shipping Address
                    </h4>
                    <p className="text-xs">{selectedOrder.address.line1}</p>
                    <p className="text-xs">{selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.pin}</p>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Order Items
                  </h4>
                  <div className="divide-y divide-border border rounded-lg overflow-hidden">
                    {selectedOrder.items.map((it, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium">{it.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Variant: {it.variantLabel} · Quantity: {it.qty}
                          </p>
                        </div>
                        <p className="font-mono font-semibold">{formatPrice(it.price * it.qty)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals breakdown */}
                <div className="bg-muted/40 p-4 rounded-lg space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">{formatPrice(selectedOrder.totals.subtotal)}</span>
                  </div>
                  {selectedOrder.totals.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({selectedOrder.promoCode}):</span>
                      <span className="font-mono">-{formatPrice(selectedOrder.totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className="font-mono">{formatPrice(selectedOrder.totals.shipping)}</span>
                  </div>
                  {selectedOrder.totals.giftWrap > 0 && (
                    <div className="flex justify-between">
                      <span>Gift packaging:</span>
                      <span className="font-mono">{formatPrice(selectedOrder.totals.giftWrap)}</span>
                    </div>
                  )}
                  {selectedOrder.totals.codFee > 0 && (
                    <div className="flex justify-between">
                      <span>COD Fee:</span>
                      <span className="font-mono">{formatPrice(selectedOrder.totals.codFee)}</span>
                    </div>
                  )}
                  <Separator className="my-1" />
                  <div className="flex justify-between text-sm font-bold">
                    <span>Grand Total:</span>
                    <span className="font-mono text-primary">{formatPrice(selectedOrder.totals.total)}</span>
                  </div>
                </div>

                {/* Resolution review if present */}
                {selectedOrder.resolution && (
                  <div className="p-4 bg-rose-50 rounded-lg border border-rose-200 text-rose-900 space-y-2">
                    <h4 className="font-bold flex items-center gap-1.5 text-rose-700">
                      <AlertCircle className="h-4 w-4" /> Open {selectedOrder.resolution.type === "cancellation" ? "Cancellation" : "Refund Request"}
                    </h4>
                    <p className="text-xs"><strong>Reason:</strong> {selectedOrder.resolution.reason}</p>
                    {selectedOrder.resolution.note && <p className="text-xs"><strong>Customer Note:</strong> {selectedOrder.resolution.note}</p>}
                    <p className="text-xs"><strong>Amount:</strong> {formatPrice(selectedOrder.resolution.amount)}</p>
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="default" onClick={() => handleProcessResolution(selectedOrder.id, "approve")}>
                        Approve Request
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleProcessResolution(selectedOrder.id, "reject", "Request declined after inspection")}>
                        Decline Request
                      </Button>
                    </div>
                  </div>
                )}

                {/* Status Updater */}
                <div className="pt-2">
                  <Label className="text-xs font-semibold uppercase text-muted-foreground block mb-2">
                    Update Fulfillment Status
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {["placed", "packed", "shipped", "out", "delivered", "cancelled"].map((st) => (
                      <Button
                        key={st}
                        size="sm"
                        variant={selectedOrder.status === st ? "default" : "outline"}
                        className="capitalize text-xs"
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                      >
                        {formatStatus(st)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 2. PRODUCT EDIT / ADD DIALOG */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingProduct?.slug && products.some((p) => p.slug === editingProduct.slug)
                ? "Edit Product"
                : "Add New Product"}
            </DialogTitle>
            <DialogDescription>Configure product details and variant options</DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-4 text-sm">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="prod-slug">Slug (Unique ID)</Label>
                    <button
                      type="button"
                      className="text-[11px] text-primary hover:underline font-medium"
                      onClick={() => {
                        if (editingProduct.name) {
                          const autoSlug = editingProduct.name
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, "");
                          setEditingProduct({ ...editingProduct, slug: autoSlug });
                        }
                      }}
                    >
                      Generate from Name
                    </button>
                  </div>
                  <Input
                    id="prod-slug"
                    value={editingProduct.slug}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    placeholder="e.g. fresh-asafoetida-granules"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prod-name">Name</Label>
                  <Input
                    id="prod-name"
                    value={editingProduct.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      if (!editingProduct.slug) {
                        const autoSlug = name
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, "");
                        setEditingProduct({ ...editingProduct, name, slug: autoSlug });
                      } else {
                        setEditingProduct({ ...editingProduct, name });
                      }
                    }}
                    placeholder="e.g. YG Special Hing"
                    className={productErrors["name"] ? "border-destructive" : ""}
                  />
                  {productErrors["name"] ? (
                    <p className="text-[11px] text-destructive">{productErrors["name"]}</p>
                  ) : null}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="prod-tagline">Tagline</Label>
                  <Input
                    id="prod-tagline"
                    value={editingProduct.tagline}
                    onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prod-category">Category</Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(val: string) => {
                      const KNOWN_FORMATS = ["powder", "granules", "cake", "combo", "wellness", "pooja", "vismaya", "appalam"];
                      setEditingProduct({
                        ...editingProduct,
                        category: val,
                        format: (KNOWN_FORMATS.includes(val) ? val : "combo") as any,
                      });
                    }}
                  >
                    <SelectTrigger id="prod-category" className={productErrors["category"] ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {productErrors["category"] ? (
                    <p className="text-[11px] text-destructive">{productErrors["category"]}</p>
                  ) : (
                    <button
                      type="button"
                      className="text-[11px] text-primary hover:underline"
                      onClick={() => setCategoryDialogOpen(true)}
                    >
                      + Add a new category
                    </button>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="prod-sku">SKU / Product Code</Label>
                  <Input
                    id="prod-sku"
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    placeholder="e.g. YG-GOLD-100G"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prod-status">Status</Label>
                  <Select
                    value={editingProduct.status}
                    onValueChange={(val: DbProductStatus) =>
                      setEditingProduct({ ...editingProduct, status: val, inStock: val === "active" })
                    }
                  >
                    <SelectTrigger id="prod-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active — visible & purchasable</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock — visible, sold out</SelectItem>
                      <SelectItem value="draft">Draft — hidden, work in progress</SelectItem>
                      <SelectItem value="hidden">Hidden — hidden from storefront</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="prod-desc">Description</Label>
                <Textarea
                  id="prod-desc"
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="prod-ing">Ingredients</Label>
                  <Input
                    id="prod-ing"
                    value={editingProduct.ingredients}
                    onChange={(e) => setEditingProduct({ ...editingProduct, ingredients: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prod-usage">Usage Instructions</Label>
                  <Input
                    id="prod-usage"
                    value={editingProduct.usage}
                    onChange={(e) => setEditingProduct({ ...editingProduct, usage: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="prod-shelf-life">Shelf Life / Expiry</Label>
                  <Input
                    id="prod-shelf-life"
                    value={editingProduct.shelfLife || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shelfLife: e.target.value })}
                    placeholder="e.g. 12 months from packing. Store in an airtight container."
                  />
                  <p className="text-[10px] text-muted-foreground">Standard 12 months for all products</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="prod-rating">Customer Rating (4.5 to 4.9)</Label>
                  <Input
                    id="prod-rating"
                    type="number"
                    step="0.1"
                    min="4.5"
                    max="4.9"
                    value={editingProduct.rating ?? 4.8}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setEditingProduct({ ...editingProduct, rating: isNaN(val) ? 4.8 : val });
                    }}
                    placeholder="4.8"
                  />
                  <p className="text-[10px] text-muted-foreground">Must be between 4.5 and 4.9</p>
                </div>
              </div>

              {/* Product Photos & Gallery */}
              <div className="space-y-4 pt-2 border-t border-border">
                <div>
                  <Label className="font-semibold text-sm flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" /> Product Images & Gallery
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Upload image files, enter URLs, or pick from heritage product presets
                  </p>
                </div>

                {/* Primary Cover Image */}
                <div className="p-3 bg-muted/30 rounded-lg border border-border space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> Primary Cover Image
                    </span>
                    <span className="text-[11px] text-muted-foreground">Main catalog image</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-background border border-border shrink-0 flex items-center justify-center relative shadow-xs">
                      {editingProduct.image ? (
                        <img
                          src={getDisplayImageUrl(editingProduct.image)}
                          alt="Cover Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">No img</span>
                      )}
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Image URL or preset (e.g. powder, /assets/...)"
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          className="text-xs font-mono h-8"
                        />
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              handleImageFileUpload(e.target.files, false);
                              e.target.value = "";
                            }}
                          />
                          <Button type="button" size="sm" variant="outline" className="h-8 text-xs shrink-0" asChild>
                            <span>
                              <Upload className="h-3.5 w-3.5 mr-1" /> Upload
                            </span>
                          </Button>
                        </label>
                      </div>

                      {/* Quick Presets */}
                      <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
                        <span className="text-[10px] text-muted-foreground font-medium mr-1">Presets:</span>
                        {PRESET_PRODUCT_IMAGES.map((preset) => (
                          <button
                            key={preset.key}
                            type="button"
                            onClick={() => setEditingProduct({ ...editingProduct, image: preset.key })}
                            className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                              editingProduct.image === preset.key || editingProduct.image === preset.url
                                ? "bg-primary text-primary-foreground border-primary font-medium"
                                : "bg-background text-muted-foreground hover:text-foreground border-border"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gallery Images */}
                <div
                  className={`p-3 bg-muted/30 rounded-lg border space-y-3 transition-colors ${
                    isDraggingGallery ? "border-primary border-dashed bg-primary/5" : "border-border"
                  } ${productErrors["images"] ? "border-destructive" : ""}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingGallery(true);
                  }}
                  onDragLeave={() => setIsDraggingGallery(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingGallery(false);
                    handleImageFileUpload(e.dataTransfer.files, true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-primary" /> Additional Gallery Images ({editingProduct.gallery?.length || 0})
                    </span>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          handleImageFileUpload(e.target.files, true);
                          e.target.value = "";
                        }}
                      />
                      <Button type="button" size="sm" variant="outline" className="h-7 text-[11px]" asChild>
                        <span>
                          <Upload className="h-3 w-3 mr-1" /> Upload Multiple
                        </span>
                      </Button>
                    </label>
                  </div>
                  <p className="text-[10px] text-muted-foreground -mt-2">
                    Drag & drop image files here, or use Upload Multiple. JPG, PNG, WEBP up to {MAX_IMAGE_SIZE_MB}MB each.
                  </p>
                  {productErrors["images"] ? (
                    <p className="text-[11px] text-destructive">{productErrors["images"]}</p>
                  ) : null}

                  {/* Add by URL */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Paste image URL or preset key to add..."
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newGalleryUrl.trim()) {
                            setEditingProduct({
                              ...editingProduct,
                              gallery: [...(editingProduct.gallery || []), newGalleryUrl.trim()],
                            });
                            setNewGalleryUrl("");
                          }
                        }
                      }}
                      className="text-xs font-mono h-8"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="h-8 text-xs shrink-0"
                      onClick={() => {
                        if (newGalleryUrl.trim()) {
                          setEditingProduct({
                            ...editingProduct,
                            gallery: [...(editingProduct.gallery || []), newGalleryUrl.trim()],
                          });
                          setNewGalleryUrl("");
                          toast.success("Image added to gallery");
                        }
                      }}
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add
                    </Button>
                  </div>

                  {/* Gallery Grid */}
                  {editingProduct.gallery && editingProduct.gallery.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 pt-1">
                      {editingProduct.gallery.map((imgUrl, idx) => {
                        const isCover = editingProduct.image === imgUrl;
                        return (
                          <div
                            key={idx}
                            className={`group relative rounded-md overflow-hidden border aspect-square bg-background shadow-xs transition-all ${
                              isCover ? "ring-2 ring-primary border-transparent" : "border-border"
                            }`}
                          >
                            <img
                              src={getDisplayImageUrl(imgUrl)}
                              alt={`Gallery ${idx + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />

                            {isCover && (
                              <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                                Cover
                              </div>
                            )}

                            {/* Hover actions */}
                            <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-1">
                              {!isCover && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  className="h-6 text-[10px] px-1 py-0 w-full"
                                  onClick={() => {
                                    handleSetPrimaryImage(imgUrl);
                                    toast.success("Set as primary image");
                                  }}
                                >
                                  Set Primary
                                </Button>
                              )}
                              <div className="flex gap-1 w-full">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  className="h-6 text-[10px] px-1 py-0 flex-1"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveGalleryImage(idx, -1)}
                                >
                                  ↑
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  className="h-6 text-[10px] px-1 py-0 flex-1"
                                  disabled={idx === editingProduct.gallery.length - 1}
                                  onClick={() => handleMoveGalleryImage(idx, 1)}
                                >
                                  ↓
                                </Button>
                              </div>
                              <label className="w-full cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/jpeg,image/jpg,image/png,image/webp"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleReplaceGalleryImage(idx, file);
                                    e.target.value = "";
                                  }}
                                />
                                <Button type="button" size="sm" variant="secondary" className="h-6 text-[10px] px-1 py-0 w-full" asChild>
                                  <span>Replace</span>
                                </Button>
                              </label>
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="h-6 text-[10px] px-1 py-0 w-full"
                                onClick={() => {
                                  handleRemoveGalleryImage(idx);
                                  toast.success("Product image removed successfully.");
                                }}
                              >
                                <Trash2 className="h-3 w-3 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-3 border border-dashed border-border rounded text-xs text-muted-foreground">
                      No additional gallery images yet
                    </div>
                  )}
                </div>
              </div>

              {/* Variants */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <Label className="font-semibold">Variants & Pricing</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingProduct({
                        ...editingProduct,
                        variants: [
                          ...editingProduct.variants,
                          { id: `var_${Date.now().toString(36)}`, label: "100 g", price: 299, mrp: 350, stock: 50 },
                        ],
                      });
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Variant
                  </Button>
                </div>

                <div className="space-y-2">
                  {editingProduct.variants.map((v, i) => (
                    <div key={i} className="flex items-center gap-2 bg-muted/40 p-2 rounded">
                      <Input
                        placeholder="Label"
                        value={v.label}
                        onChange={(e) => {
                          const vars = [...editingProduct.variants];
                          vars[i]!.label = e.target.value;
                          setEditingProduct({ ...editingProduct, variants: vars });
                        }}
                        className="w-1/3 text-xs"
                      />
                      <Input
                        placeholder="Price ₹"
                        type="number"
                        value={v.price}
                        onChange={(e) => {
                          const vars = [...editingProduct.variants];
                          vars[i]!.price = Number(e.target.value);
                          setEditingProduct({ ...editingProduct, variants: vars });
                        }}
                        className="w-1/4 text-xs"
                      />
                      <Input
                        placeholder="MRP ₹"
                        type="number"
                        value={v.mrp ?? ""}
                        onChange={(e) => {
                          const vars = [...editingProduct.variants];
                          vars[i]!.mrp = e.target.value ? Number(e.target.value) : null;
                          setEditingProduct({ ...editingProduct, variants: vars });
                        }}
                        className="w-1/4 text-xs"
                      />
                      {v.mrp && v.mrp > v.price ? (
                        <span className="text-[10px] font-semibold text-emerald-600 shrink-0 w-10 text-center">
                          -{Math.round(((v.mrp - v.price) / v.mrp) * 100)}%
                        </span>
                      ) : (
                        <span className="w-10 shrink-0" />
                      )}
                      <Input
                        placeholder="Stock"
                        type="number"
                        value={v.stock ?? 50}
                        onChange={(e) => {
                          const vars = [...editingProduct.variants];
                          vars[i]!.stock = Number(e.target.value);
                          setEditingProduct({ ...editingProduct, variants: vars });
                        }}
                        className="w-1/4 text-xs"
                      />
                      {editingProduct.variants.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="text-destructive h-8 w-8 p-0"
                          onClick={() => {
                            setEditingProduct({
                              ...editingProduct,
                              variants: editingProduct.variants.filter((_, idx) => idx !== i),
                            });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {productErrors["variants"] ? (
                <p className="text-[11px] text-destructive -mt-2">{productErrors["variants"]}</p>
              ) : null}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingProduct.glutenFree}
                      onCheckedChange={(c: boolean) => setEditingProduct({ ...editingProduct, glutenFree: c })}
                    />
                    <span className="text-xs">Gluten-Free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingProduct.bestseller}
                      onCheckedChange={(c: boolean) => setEditingProduct({ ...editingProduct, bestseller: c })}
                    />
                    <span className="text-xs">Featured</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setProductDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE PRODUCT CONFIRMATION */}
      <AlertDialog open={Boolean(deletingProduct)} onOpenChange={(open) => !open && setDeletingProduct(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{deletingProduct?.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove <strong>{deletingProduct?.name}</strong> from the customer-facing website
              immediately. The product record is archived (not permanently erased) and can be restored
              later from the "Show archived" filter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteProduct}
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* MANAGE CATEGORIES */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
            <DialogDescription>Add, rename, or remove product categories.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSaveCategory();
                  }
                }}
              />
              <Button type="button" onClick={handleSaveCategory} className="shrink-0">
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {categories.map((c) =>
                renamingCategorySlug === c.slug ? (
                  <div key={c.slug} className="flex items-center gap-2 p-2 rounded-md border border-primary/40 bg-primary/5">
                    <Input
                      autoFocus
                      value={renamingCategoryValue}
                      onChange={(e) => setRenamingCategoryValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleRenameCategory(c.slug);
                        }
                        if (e.key === "Escape") setRenamingCategorySlug(null);
                      }}
                      className="h-8 text-sm"
                    />
                    <Button size="sm" className="h-8 shrink-0" onClick={() => handleRenameCategory(c.slug)}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 shrink-0" onClick={() => setRenamingCategorySlug(null)}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <div key={c.slug} className="flex items-center justify-between gap-2 p-2 rounded-md border border-border text-sm">
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {categoryProductCounts.get(c.slug) || 0} product(s)
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        title="Rename category"
                        onClick={() => {
                          setRenamingCategorySlug(c.slug);
                          setRenamingCategoryValue(c.name);
                        }}
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                        title="Delete category"
                        onClick={() => setCategoryDeleteTarget(c)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )
              )}
              {categories.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">No categories yet.</p>
              ) : null}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE CATEGORY CONFIRMATION */}
      <AlertDialog open={Boolean(categoryDeleteTarget)} onOpenChange={(open) => !open && setCategoryDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category "{categoryDeleteTarget?.name}"?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                {(categoryProductCounts.get(categoryDeleteTarget?.slug || "") || 0) > 0 ? (
                  <>
                    <p>
                      {categoryProductCounts.get(categoryDeleteTarget?.slug || "")} product(s) still use this
                      category. Choose a replacement category to move them to before deleting.
                    </p>
                    <Select value={categoryReplacement} onValueChange={setCategoryReplacement}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose replacement category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((c) => c.slug !== categoryDeleteTarget?.slug)
                          .map((c) => (
                            <SelectItem key={c.slug} value={c.slug}>
                              {c.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </>
                ) : (
                  <p>This category has no products. It can be safely deleted.</p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCategoryReplacement("")}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={
                (categoryProductCounts.get(categoryDeleteTarget?.slug || "") || 0) > 0 && !categoryReplacement
              }
              onClick={handleDeleteCategory}
            >
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 3. QUESTION ANSWER DIALOG */}
      <Dialog open={Boolean(answeringQuestion)} onOpenChange={(open: boolean) => !open && setAnsweringQuestion(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Answer Customer Question</DialogTitle>
            <DialogDescription>
              {answeringQuestion?.question} (Asked by {answeringQuestion?.asked_by})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <Label htmlFor="q-answer">Official Response (from Y.G team)</Label>
            <Textarea
              id="q-answer"
              rows={4}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type your response here..."
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAnsweringQuestion(null)}>
              Cancel
            </Button>
            <Button onClick={handleAnswerQuestion}>Publish Answer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 4. TICKET RESPONSE DIALOG */}
      <Dialog open={Boolean(respondingTicket)} onOpenChange={(open: boolean) => !open && setRespondingTicket(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Ticket {respondingTicket?.id}</DialogTitle>
            <DialogDescription>
              {respondingTicket?.topic} · Contact: {respondingTicket?.contact}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="p-3 bg-muted/40 rounded text-xs">
              <span className="font-semibold block mb-1">Customer Message:</span>
              <p className="text-muted-foreground">{respondingTicket?.message}</p>
            </div>

            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={ticketStatusVal} onValueChange={(v: any) => setTicketStatusVal(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="t-reply">Response / Team Note</Label>
              <Textarea
                id="t-reply"
                rows={3}
                value={ticketReplyText}
                onChange={(e) => setTicketReplyText(e.target.value)}
                placeholder="Add resolution or response note..."
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRespondingTicket(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTicketReply}>Update Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 5. PROMO CREATE DIALOG */}
      <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create / Edit Promo Code</DialogTitle>
            <DialogDescription>Define discount percentage, flat amount, or shipping rules</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label htmlFor="pr-code">Code</Label>
                <Input
                  id="pr-code"
                  placeholder="e.g. SAVE20"
                  value={editingPromo.code}
                  onChange={(e) => setEditingPromo({ ...editingPromo, code: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pr-label">Label</Label>
                <Input
                  id="pr-label"
                  placeholder="e.g. 20% off"
                  value={editingPromo.label}
                  onChange={(e) => setEditingPromo({ ...editingPromo, label: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="pr-desc">Description</Label>
              <Input
                id="pr-desc"
                placeholder="e.g. 20% off orders above ₹500"
                value={editingPromo.description}
                onChange={(e) => setEditingPromo({ ...editingPromo, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="pr-pct">% Off</Label>
                <Input
                  id="pr-pct"
                  type="number"
                  placeholder="e.g. 20"
                  value={editingPromo.percentOff}
                  onChange={(e) => setEditingPromo({ ...editingPromo, percentOff: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pr-amt">₹ Flat Off</Label>
                <Input
                  id="pr-amt"
                  type="number"
                  placeholder="e.g. 50"
                  value={editingPromo.amountOff}
                  onChange={(e) => setEditingPromo({ ...editingPromo, amountOff: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pr-min">Min Order ₹</Label>
                <Input
                  id="pr-min"
                  type="number"
                  placeholder="e.g. 499"
                  value={editingPromo.minSubtotal}
                  onChange={(e) => setEditingPromo({ ...editingPromo, minSubtotal: e.target.value })}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingPromo.freeShipping}
                  onCheckedChange={(c: boolean) => setEditingPromo({ ...editingPromo, freeShipping: c })}
                />
                <span className="text-xs">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={editingPromo.automatic}
                  onCheckedChange={(c: boolean) => setEditingPromo({ ...editingPromo, automatic: c })}
                />
                <span className="text-xs">Auto Apply</span>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setPromoDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePromo}>Save Promo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QUICK PRICE EDITOR DIALOG */}
      <Dialog
        open={Boolean(quickPriceProduct)}
        onOpenChange={(open: boolean) => !open && setQuickPriceProduct(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <DialogTitle>Quick Price & MRP Editor</DialogTitle>
            </div>
            <DialogDescription>
              Adjust selling prices, MRP, and inventory units for{" "}
              <strong>{quickPriceProduct?.name}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-2 max-h-[60vh] overflow-y-auto">
            {quickVariants.map((v, idx) => (
              <div
                key={v.id || idx}
                className="p-3 bg-muted/30 border border-border rounded-lg space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{v.label}</span>
                  <div className="flex items-center gap-2">
                    {v.mrp && v.mrp > v.price ? (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {Math.round(((v.mrp - v.price) / v.mrp) * 100)}% off
                      </span>
                    ) : null}
                    <span className="text-muted-foreground font-mono text-[11px]">
                      ID: {v.id}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">Price ₹ (Selling)</Label>
                    <Input
                      type="number"
                      value={v.price}
                      onChange={(e) => {
                        const updated = [...quickVariants];
                        updated[idx] = { ...v, price: Number(e.target.value) };
                        setQuickVariants(updated);
                      }}
                      className="h-8 text-xs font-mono font-bold text-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">MRP ₹ (Strikethrough)</Label>
                    <Input
                      type="number"
                      value={v.mrp ?? ""}
                      onChange={(e) => {
                        const updated = [...quickVariants];
                        updated[idx] = { ...v, mrp: e.target.value ? Number(e.target.value) : null };
                        setQuickVariants(updated);
                      }}
                      className="h-8 text-xs font-mono"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] text-muted-foreground">Stock Units</Label>
                    <Input
                      type="number"
                      value={v.stock}
                      onChange={(e) => {
                        const updated = [...quickVariants];
                        updated[idx] = { ...v, stock: Number(e.target.value) };
                        setQuickVariants(updated);
                      }}
                      className="h-8 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setQuickPriceProduct(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveQuickPrices}
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-[#181206] font-semibold"
            >
              <Save className="h-4 w-4 mr-1.5" /> Save Updated Prices
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EXPORT DEAL DIALOG */}
      <Dialog open={newDealDialogOpen} onOpenChange={setNewDealDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-emerald-600" />
              <DialogTitle>Add International Export Deal</DialogTitle>
            </div>
            <DialogDescription>
              Record an overseas buyer lead, proforma quotation, or container export contract.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-xs my-2">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[11px]">Buyer / Company Name *</Label>
                <Input
                  value={editingDeal.companyName || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, companyName: e.target.value })}
                  placeholder="e.g. Mustafa Centre Wholesale Pte Ltd"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Contact Person *</Label>
                <Input
                  value={editingDeal.contactPerson || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, contactPerson: e.target.value })}
                  placeholder="e.g. Mr. K. Rajendran"
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[11px]">Destination Country *</Label>
                <Input
                  value={editingDeal.country || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, country: e.target.value })}
                  placeholder="e.g. Singapore, UAE, USA, Sri Lanka"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Destination Port</Label>
                <Input
                  value={editingDeal.destinationPort || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, destinationPort: e.target.value })}
                  placeholder="e.g. Port of Singapore (SGSIN)"
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[11px]">Buyer Email</Label>
                <Input
                  type="email"
                  value={editingDeal.email || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, email: e.target.value })}
                  placeholder="procurement@company.com"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Buyer Phone / WhatsApp</Label>
                <Input
                  value={editingDeal.phone || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, phone: e.target.value })}
                  placeholder="+65 6295 5855"
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[11px]">Product Specification</Label>
                <Input
                  value={editingDeal.productType || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, productType: e.target.value })}
                  placeholder="e.g. Gold Grade Asafoetida Powder"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Order Volume / Metric</Label>
                <Input
                  value={editingDeal.quantityMetric || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, quantityMetric: e.target.value })}
                  placeholder="e.g. 1,000 kg (Master Cartons)"
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-[11px]">Currency</Label>
                <Select
                  value={editingDeal.dealValueCurrency || "USD"}
                  onValueChange={(val: any) => setEditingDeal({ ...editingDeal, dealValueCurrency: val })}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="SGD">SGD (S$)</SelectItem>
                    <SelectItem value="AED">AED (د.إ)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Deal Value Amount</Label>
                <Input
                  type="number"
                  value={editingDeal.dealValueAmount || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, dealValueAmount: Number(e.target.value) })}
                  placeholder="e.g. 25000"
                  className="h-8 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Pipeline Stage</Label>
                <Select
                  value={editingDeal.stage || "new"}
                  onValueChange={(val: any) => setEditingDeal({ ...editingDeal, stage: val })}
                >
                  <SelectTrigger className="h-8 text-xs capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Lead</SelectItem>
                    <SelectItem value="quoted">Quoted / PI</SelectItem>
                    <SelectItem value="sample_sent">Sample Sent</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="contract_closed">Contract Closed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-[11px]">Incoterms</Label>
                <Input
                  value={editingDeal.incoterms || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, incoterms: e.target.value })}
                  placeholder="e.g. FOB Tuticorin / CIF Singapore"
                  className="h-8 text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-[11px]">Payment Terms</Label>
                <Input
                  value={editingDeal.paymentTerms || ""}
                  onChange={(e) => setEditingDeal({ ...editingDeal, paymentTerms: e.target.value })}
                  placeholder="e.g. 100% LC at sight / 30% advance"
                  className="h-8 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-[11px]">Internal Trade Notes</Label>
              <Textarea
                rows={2}
                value={editingDeal.notes || ""}
                onChange={(e) => setEditingDeal({ ...editingDeal, notes: e.target.value })}
                placeholder="e.g. Phytosanitary certificate, FSSAI export clearance, Halal compliance..."
                className="text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNewDealDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!editingDeal.companyName || !editingDeal.contactPerson) {
                  toast.error("Company name and contact person are required");
                  return;
                }
                handleSaveExportDeal({
                  id: editingDeal.id || `EXP-2026-${String(Date.now()).slice(-4)}`,
                  companyName: editingDeal.companyName,
                  contactPerson: editingDeal.contactPerson,
                  country: editingDeal.country || "India",
                  destinationPort: editingDeal.destinationPort || "FOB Tuticorin",
                  email: editingDeal.email || "trade@buyer.com",
                  phone: editingDeal.phone || "+91 00000 00000",
                  productType: editingDeal.productType || "Compounded Asafoetida Powder",
                  quantityMetric: editingDeal.quantityMetric || "500 kg",
                  dealValueCurrency: editingDeal.dealValueCurrency || "USD",
                  dealValueAmount: Number(editingDeal.dealValueAmount || 10000),
                  stage: (editingDeal.stage as any) || "new",
                  paymentTerms: editingDeal.paymentTerms || "T/T Wire Transfer",
                  incoterms: editingDeal.incoterms || "FOB Tuticorin",
                  notes: editingDeal.notes || "",
                  createdAt: editingDeal.createdAt || new Date().toISOString().slice(0, 10),
                });
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              <Save className="h-4 w-4 mr-1.5" /> Save Deal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MESSAGE NOTE / STATUS DIALOG */}
      <Dialog
        open={Boolean(activeMessage)}
        onOpenChange={(open: boolean) => !open && setActiveMessage(null)}
      >
        <DialogContent className="sm:max-w-md">
          {activeMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">
                  Inquiry: {activeMessage.subject}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  From {activeMessage.senderName} ({activeMessage.email}) · {activeMessage.receivedAt}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-xs my-2">
                <div className="p-3 bg-muted/30 rounded-lg border border-border text-foreground leading-relaxed">
                  {activeMessage.message}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Update Status</Label>
                  <div className="flex gap-2">
                    {(["unread", "in_progress", "replied"] as const).map((st) => (
                      <Button
                        key={st}
                        type="button"
                        size="sm"
                        variant={activeMessage.status === st ? "default" : "outline"}
                        className="h-7 text-xs capitalize flex-1"
                        onClick={() => handleUpdateMessageStatus(activeMessage.id, st)}
                      >
                        {formatStatus(st)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <Label htmlFor="admin-msg-note" className="text-xs font-semibold">
                    Internal Admin Note
                  </Label>
                  <Textarea
                    id="admin-msg-note"
                    rows={3}
                    placeholder="e.g. Quoted 18% slab on 17 Sep. Awaiting payment receipt..."
                    value={messageNoteInput}
                    onChange={(e) => setMessageNoteInput(e.target.value)}
                    className="text-xs"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs w-full"
                    onClick={() => handleSaveMessageNote(activeMessage.id)}
                  >
                    <Save className="h-3 w-3 mr-1" /> Save Note
                  </Button>
                </div>
              </div>

              <DialogFooter className="mt-2">
                <Button variant="outline" onClick={() => setActiveMessage(null)}>
                  Close
                </Button>
                <Button
                  className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-[#181206]"
                  asChild
                >
                  <a
                    href={`mailto:${activeMessage.email}?subject=${encodeURIComponent(`Re: ${activeMessage.subject}`)}&body=${encodeURIComponent(`Dear ${activeMessage.senderName},\n\n`)}`}
                    onClick={() => handleUpdateMessageStatus(activeMessage.id, "replied")}
                  >
                    <Mail className="h-3.5 w-3.5 mr-1" /> Launch Email Client
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
