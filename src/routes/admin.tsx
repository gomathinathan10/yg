import { useEffect, useMemo, useState, useTransition } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  DollarSign,
  Edit,
  Eye,
  HelpCircle,
  KeyRound,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Loader2,
  Lock,
  LogOut,
  Package,
  Plus,
  RefreshCw,
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
import { formatPrice } from "@/data/products";
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
  adminDeleteProductServerFn,
  type DbProduct,
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

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Store Admin — Y.G Asafoetida" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [orders, setOrders] = useState<FullOrder[]>([]);
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [questions, setQuestions] = useState<DbQuestion[]>([]);
  const [tickets, setTickets] = useState<DbTicket[]>([]);
  const [promos, setPromos] = useState<DbPromo[]>([]);
  const [alerts, setAlerts] = useState<DbAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<FullOrder | null>(null);

  // Product Filters & Dialog
  const [productSearch, setProductSearch] = useState("");
  const [productFormatFilter, setProductFormatFilter] = useState("all");
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductInput | null>(null);
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

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

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("yg_admin_auth") === "true";
    }
    return false;
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (loginUsername.trim() === "admin" && loginPassword === "admin123") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("yg_admin_auth", "true");
      }
      setIsAuthenticated(true);
      toast.success("Welcome, Administrator!");
    } else {
      setLoginError("Invalid username or password. Please try again.");
      toast.error("Invalid administrator credentials");
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("yg_admin_auth");
    }
    setIsAuthenticated(false);
    setLoginPassword("");
    setLoginError("");
    toast.info("Logged out from Admin Panel");
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        dashStats,
        orderList,
        prodList,
        revList,
        qList,
        ticketList,
        promoList,
        alertList,
      ] = await Promise.all([
        adminGetDashboardStatsServerFn(),
        adminListOrdersServerFn({ data: {} }),
        getProductsServerFn(),
        adminListReviewsServerFn({ data: {} }),
        adminListQuestionsServerFn({ data: {} }),
        adminListTicketsServerFn({ data: {} }),
        adminListPromosServerFn(),
        adminListStockAlertsServerFn(),
      ]);

      setStats(dashStats);
      setOrders(orderList);
      setProducts(prodList);
      setReviews(revList);
      setQuestions(qList);
      setTickets(ticketList);
      setPromos(promoList);
      setAlerts(alertList);
    } catch (err) {
      console.error("Admin data fetch failed:", err);
      toast.error("Failed to fetch fresh data from database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

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
    setEditingProduct({
      slug: "",
      name: "",
      tagline: "",
      format: "powder",
      glutenFree: false,
      bestseller: false,
      image: "powder",
      gallery: ["powder"],
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
      variants: (p.variants || []).map((v) => ({
        id: v.id,
        label: v.label,
        price: v.price,
        mrp: v.mrp,
        stock: v.stock,
      })),
    });
    setProductDialogOpen(true);
  };

  const handleImageFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isGallery = false
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const toastId = toast.loading("Compressing and optimizing image(s)...");
    try {
      if (!isGallery) {
        const file = files[0];
        if (!file) return;
        const res = await compressImage(file, {
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
        const results = await compressMultipleImages(files, {
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
    } finally {
      e.target.value = "";
    }
  };

  const handleSaveProduct = async () => {
    if (!editingProduct || !editingProduct.slug || !editingProduct.name) {
      toast.error("Slug and Name are required");
      return;
    }
    const r = Number(editingProduct.rating ?? 4.8);
    if (isNaN(r) || r < 4.5 || r > 4.9) {
      toast.error("Rating must be between 4.5 and 4.9");
      return;
    }
    try {
      await adminSaveProductServerFn({ data: editingProduct });
      toast.success(`Product "${editingProduct.name}" saved successfully`);
      setProductDialogOpen(false);
      loadAllData();
    } catch (err) {
      toast.error("Failed to save product");
    }
  };

  const handleToggleStock = async (slug: string, currentInStock: boolean) => {
    try {
      await adminToggleProductStockServerFn({
        data: { slug, inStock: !currentInStock, stockLeft: !currentInStock ? 50 : 0 },
      });
      toast.success(`Stock status updated for ${slug}`);
      setProducts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, in_stock: currentInStock ? 0 : 1 } : p))
      );
    } catch (err) {
      toast.error("Failed to toggle stock");
    }
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete ${slug}?`)) return;
    try {
      await adminDeleteProductServerFn({ data: { slug } });
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

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
      toast.success(`Promo code ${editingPromo.code} saved`);
      setPromoDialogOpen(false);
      loadAllData();
    } catch (err) {
      toast.error("Failed to save promo");
    }
  };

  const handleTogglePromo = async (code: string, currentActive: boolean) => {
    try {
      await adminTogglePromoServerFn({ data: { code, isActive: !currentActive } });
      toast.success(`Promo ${code} ${!currentActive ? "activated" : "deactivated"}`);
      setPromos((prev) =>
        prev.map((pr) => (pr.code === code ? { ...pr, is_active: currentActive ? 0 : 1 } : pr))
      );
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

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
    const matchesSearch =
      !orderSearch ||
      o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.email.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.phone.includes(orderSearch);
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-muted/20">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-2 shadow-inner">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Access</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Please enter your administrator credentials to manage Y.G Asafoetida works.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-medium border border-destructive/20">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5 text-left">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                type="text"
                placeholder="admin"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
                autoFocus
                className="bg-background"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <Button type="submit" className="w-full font-semibold shadow-md mt-2">
              <KeyRound className="h-4 w-4 mr-2" />
              Sign In to Admin Panel
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-border">
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
          <TabsList className="grid grid-cols-4 md:grid-cols-8 h-auto p-1 bg-muted/60">
            <TabsTrigger value="overview" className="py-2.5 flex items-center gap-1.5 text-xs">
              <LayoutDashboard className="h-3.5 w-3.5" /> Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="py-2.5 flex items-center gap-1.5 text-xs">
              <Package className="h-3.5 w-3.5" /> Orders
              {orders.filter((o) => o.status === "placed" || o.status === "refund_requested").length > 0 && (
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.2 text-[10px] text-primary-foreground font-semibold">
                  {orders.filter((o) => o.status === "placed" || o.status === "refund_requested").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="products" className="py-2.5 flex items-center gap-1.5 text-xs">
              <Layers className="h-3.5 w-3.5" /> Products
            </TabsTrigger>
            <TabsTrigger value="reviews" className="py-2.5 flex items-center gap-1.5 text-xs">
              <Star className="h-3.5 w-3.5" /> Reviews
              {reviews.filter((r) => r.status === "pending").length > 0 && (
                <span className="ml-1 rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] text-white font-semibold">
                  {reviews.filter((r) => r.status === "pending").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="questions" className="py-2.5 flex items-center gap-1.5 text-xs">
              <HelpCircle className="h-3.5 w-3.5" /> Q&A
              {questions.filter((q) => q.status === "pending" || !q.answer).length > 0 && (
                <span className="ml-1 rounded-full bg-blue-500 px-1.5 py-0.2 text-[10px] text-white font-semibold">
                  {questions.filter((q) => q.status === "pending" || !q.answer).length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="tickets" className="py-2.5 flex items-center gap-1.5 text-xs">
              <LifeBuoy className="h-3.5 w-3.5" /> Support
              {tickets.filter((t) => t.status === "open").length > 0 && (
                <span className="ml-1 rounded-full bg-rose-500 px-1.5 py-0.2 text-[10px] text-white font-semibold">
                  {tickets.filter((t) => t.status === "open").length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="promos" className="py-2.5 flex items-center gap-1.5 text-xs">
              <Tag className="h-3.5 w-3.5" /> Promos
            </TabsTrigger>
            <TabsTrigger value="alerts" className="py-2.5 flex items-center gap-1.5 text-xs">
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
                      {stats.recentSalesTrend.map((day, idx) => {
                        const maxRev = Math.max(...stats.recentSalesTrend.map((d) => d.revenue), 1000);
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
                        { key: "placed", label: "New / Placed", color: "bg-blue-500" },
                        { key: "packed", label: "Packed in Works", color: "bg-amber-500" },
                        { key: "shipped", label: "Shipped with Courier", color: "bg-purple-500" },
                        { key: "out", label: "Out for Delivery", color: "bg-indigo-500" },
                        { key: "delivered", label: "Delivered", color: "bg-emerald-500" },
                        { key: "refund_requested", label: "Refund Requested", color: "bg-rose-500" },
                        { key: "cancelled", label: "Cancelled", color: "bg-zinc-500" },
                      ].map((st) => {
                        const count = stats.ordersByStatus[st.key] ?? 0;
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
                                  {o.status.replace("_", " ")}
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
                                {o.status.replace("_", " ")}
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
                  <h2 className="text-lg font-semibold">Catalog & Product Flexibility</h2>
                  <p className="text-xs text-muted-foreground">Add products, edit details, adjust ratings (4.5–4.9), manage variants and shelf life</p>
                </div>
                <Button onClick={handleOpenNewProduct} className="shrink-0">
                  <Plus className="h-4 w-4 mr-1.5" /> Add New Product
                </Button>
              </div>

              {/* Product Search & Format Filter */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6 pb-4 border-b border-border">
                <div className="flex flex-1 w-full gap-2 items-center">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="h-3.5 w-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
                    <Input
                      placeholder="Search products by name, slug, tagline..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="pl-8 h-8 text-xs"
                    />
                  </div>
                  <Select value={productFormatFilter} onValueChange={setProductFormatFilter}>
                    <SelectTrigger className="h-8 text-xs w-[170px]">
                      <SelectValue placeholder="All Formats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      <SelectItem value="powder">Powder</SelectItem>
                      <SelectItem value="granules">Granules</SelectItem>
                      <SelectItem value="cake">Solid Cake</SelectItem>
                      <SelectItem value="combo">Combo & Gift</SelectItem>
                      <SelectItem value="wellness">Health Mix (Wellness)</SelectItem>
                      <SelectItem value="pooja">Pooja Sambrani</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-xs text-muted-foreground shrink-0">
                  Showing {products.filter((p) => {
                    const matchSearch =
                      !productSearch.trim() ||
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.slug.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.tagline.toLowerCase().includes(productSearch.toLowerCase());
                    const matchFormat =
                      productFormatFilter === "all" || p.format === productFormatFilter;
                    return matchSearch && matchFormat;
                  }).length} of {products.length} products
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products
                  .filter((p) => {
                    const matchSearch =
                      !productSearch.trim() ||
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.slug.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.tagline.toLowerCase().includes(productSearch.toLowerCase());
                    const matchFormat =
                      productFormatFilter === "all" || p.format === productFormatFilter;
                    return matchSearch && matchFormat;
                  })
                  .map((p) => (
                  <div key={p.slug} className="surface-card p-5 flex flex-col justify-between border border-border">
                    <div>
                      <div className="flex items-start gap-3">
                        <div className="h-14 w-14 rounded-md overflow-hidden bg-muted border border-border shrink-0">
                          <img
                            src={getDisplayImageUrl(p.image)}
                            alt={p.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Badge variant="secondary" className="capitalize text-[10px]">
                              {p.format}
                            </Badge>
                            {p.bestseller ? (
                              <Badge variant="default" className="text-[9px] bg-amber-600">
                                Bestseller
                              </Badge>
                            ) : null}
                          </div>
                          <h3 className="font-semibold text-base leading-snug truncate">{p.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{p.tagline}</p>
                        </div>
                        <Badge
                          variant={p.in_stock ? "default" : "destructive"}
                          className="text-[10px] shrink-0"
                        >
                          {p.in_stock ? "In Stock" : "Sold Out"}
                        </Badge>
                      </div>

                      {/* Rating & Shelf Life badges */}
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/40">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {(p.rating || 4.8).toFixed(1)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded border border-border">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {p.shelf_life || "12 months from packing"}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 border-t border-b border-border/60 py-3 text-xs">
                        <div className="font-medium text-muted-foreground mb-1">Variants & Pricing:</div>
                        {(p.variants || []).map((v) => (
                          <div key={v.id} className="flex items-center justify-between text-xs">
                            <span>{v.label}</span>
                            <div className="font-mono">
                              <span className="font-bold">{formatPrice(v.price)}</span>
                              {v.mrp && <span className="text-muted-foreground line-through ml-1.5">{formatPrice(v.mrp)}</span>}
                              <span className="text-muted-foreground ml-2">({v.stock} in stock)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={Boolean(p.in_stock)}
                          onCheckedChange={() => handleToggleStock(p.slug, Boolean(p.in_stock))}
                        />
                        <span className="text-xs text-muted-foreground">In Stock</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button size="sm" variant="outline" onClick={() => handleEditProduct(p)}>
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" title="Delete Product" onClick={() => handleDeleteProduct(p.slug)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                              t.status === "resolved"
                                ? "default"
                                : t.status === "open"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="text-[10px] capitalize"
                          >
                            {t.status.replace("_", " ")}
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
                    {selectedOrder.status.replace("_", " ")}
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
                        {st.replace("_", " ")}
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
                  />
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
                  <Label htmlFor="prod-format">Format</Label>
                  <Select
                    value={editingProduct.format}
                    onValueChange={(val: any) => setEditingProduct({ ...editingProduct, format: val })}
                  >
                    <SelectTrigger id="prod-format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="powder">Powder</SelectItem>
                      <SelectItem value="granules">Granules</SelectItem>
                      <SelectItem value="cake">Solid Cake</SelectItem>
                      <SelectItem value="combo">Combo & Gift</SelectItem>
                      <SelectItem value="wellness">Health Mix (Wellness)</SelectItem>
                      <SelectItem value="pooja">Pooja Sambrani</SelectItem>
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
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageFileUpload(e, false)}
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
                <div className="p-3 bg-muted/30 rounded-lg border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-primary" /> Additional Gallery Images ({editingProduct.gallery?.length || 0})
                    </span>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, true)}
                      />
                      <Button type="button" size="sm" variant="outline" className="h-7 text-[11px]" asChild>
                        <span>
                          <Upload className="h-3 w-3 mr-1" /> Upload Multiple
                        </span>
                      </Button>
                    </label>
                  </div>

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
                            <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                              {!isCover && (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="secondary"
                                  className="h-6 text-[10px] px-1 py-0 w-full"
                                  onClick={() => {
                                    setEditingProduct({ ...editingProduct, image: imgUrl });
                                    toast.success("Set as main cover");
                                  }}
                                >
                                  Set Cover
                                </Button>
                              )}
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="h-6 text-[10px] px-1 py-0 w-full"
                                onClick={() => {
                                  setEditingProduct({
                                    ...editingProduct,
                                    gallery: editingProduct.gallery.filter((_, i) => i !== idx),
                                  });
                                  toast.success("Removed from gallery");
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
                    <span className="text-xs">Bestseller</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingProduct.inStock}
                      onCheckedChange={(c: boolean) => setEditingProduct({ ...editingProduct, inStock: c })}
                    />
                    <span className="text-xs">In Stock</span>
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
    </div>
  );
}
