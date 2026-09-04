import { useMemo, useRef, useState } from "react";
import { CheckCircle2, Loader2, MessageSquarePlus, Pencil, ShieldCheck, Sparkles, Star, ThumbsUp, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { formatReviewDate, useGuestReviews, type ReviewDraft } from "@/lib/reviews";
import type { Product } from "@/data/products";

const MAX_COMMENT = 600;

type Form = {
  rating: number;
  title: string;
  comment: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  contactOptIn: boolean;
};

const empty: Form = {
  rating: 5,
  title: "",
  comment: "",
  name: "",
  city: "",
  email: "",
  phone: "",
  contactOptIn: false,
};

function Stars({ value, className = "h-3.5 w-3.5" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${className} ${
            n <= Math.round(value) ? "fill-amber-500 text-amber-500" : "text-border"
          }`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function ProductReviews({ product }: { product: Product }) {
  const { reviews, average, hydrated, submitReview, remove } = useGuestReviews(product.slug);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [hover, setHover] = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const set =
    <K extends keyof Form>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  const blur = (key: keyof Form) => () => setTouched((t) => ({ ...t, [key]: true }));

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (form.rating < 1) e.rating = "Pick a star rating";
    if (form.name.trim().length < 2) e.name = "Tell us what to call you";
    if (form.comment.trim().length < 10) e.comment = "Write at least 10 characters";
    if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    const digits = form.phone.replace(/\D/g, "");
    if (form.phone.trim() && digits.length < 10) e.phone = "Enter a 10-digit mobile number";
    if (form.contactOptIn && !form.email.trim() && !form.phone.trim())
      e.contactOptIn = "Add an email or phone so we can reply";
    return e;
  }, [form]);

  const errorFor = (key: keyof Form) => (touched[key] ? errors[key] : undefined);
  const valid = Object.keys(errors).length === 0;

  const openForm = () => {
    setOpen(true);
    setDone(false);
    requestAnimationFrame(() =>
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ rating: true, name: true, comment: true, email: true, phone: true, contactOptIn: true });
    if (!valid) {
      toast.error("Please complete the required fields.");
      return;
    }
    setSending(true);
    try {
      await submitReview({
        slug: product.slug,
        rating: form.rating,
        title: form.title,
        comment: form.comment,
        name: form.name,
        city: form.city.trim() || undefined,
        email: form.email.trim() || undefined,
        phone: form.phone.trim() || undefined,
        contactOptIn: form.contactOptIn,
      });
      setForm(empty);
      setTouched({});
      setOpen(false);
      setDone(true);
      toast.success("Thank you! Your verified review has been recorded.");
    } catch {
      toast.error("Could not post review. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="container-page py-8 sm:py-12">
      {/* Header & Rating Breakdown Banner */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-xs">
        <div className="grid gap-6 md:grid-cols-12 items-center">
          {/* Left Score */}
          <div className="md:col-span-4 space-y-2 text-center md:text-left border-b md:border-b-0 md:border-r border-border/70 pb-5 md:pb-0 md:pr-6">
            <p className="eyebrow">Verified Kitchen Feedback</p>
            <div className="flex items-baseline justify-center md:justify-start gap-2 pt-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">/ 5.0</span>
            </div>

            <div className="flex justify-center md:justify-start pt-0.5">
              <Stars value={product.rating} className="h-4 w-4" />
            </div>

            <p className="text-xs text-muted-foreground pt-1">
              Based on <span className="font-bold text-foreground">{(product.reviews ?? 0).toLocaleString("en-IN")}</span> verified buyers across India
            </p>
          </div>

          {/* Middle Rating Bars */}
          <div className="md:col-span-5 space-y-1.5 text-xs text-muted-foreground px-0 md:px-3">
            {[
              {
                star: 5,
                pct: `${Math.round(
                  product.rating >= 4.9
                    ? 90
                    : product.rating >= 4.8
                    ? 82
                    : product.rating >= 4.7
                    ? 74
                    : product.rating >= 4.6
                    ? 66
                    : 58
                )}%`,
              },
              {
                star: 4,
                pct: `${Math.round(
                  product.rating >= 4.9
                    ? 8
                    : product.rating >= 4.8
                    ? 14
                    : product.rating >= 4.7
                    ? 21
                    : product.rating >= 4.6
                    ? 28
                    : 35
                )}%`,
              },
              {
                star: 3,
                pct: `${Math.round(
                  product.rating >= 4.9
                    ? 2
                    : product.rating >= 4.8
                    ? 4
                    : product.rating >= 4.7
                    ? 4
                    : product.rating >= 4.6
                    ? 5
                    : 6
                )}%`,
              },
              {
                star: 2,
                pct: `${Math.round(product.rating <= 4.5 ? 1 : 0)}%`,
              },
              { star: 1, pct: "0%" },
            ].map((b) => (
              <div key={b.star} className="flex items-center gap-2">
                <span className="w-6 font-mono text-right">{b.star}★</span>
                <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: b.pct }} />
                </div>
                <span className="w-8 text-[11px] font-mono text-muted-foreground/80">{b.pct}</span>
              </div>
            ))}
          </div>

          {/* Right Action */}
          <div className="md:col-span-3 text-center md:text-right space-y-2">
            <Button onClick={openForm} variant={open ? "outline" : "default"} size="sm" className="w-full font-semibold gap-1.5 shadow-xs">
              <MessageSquarePlus className="h-3.5 w-3.5" />
              Write a Review
            </Button>
            <p className="text-[10px] text-muted-foreground">
              No account required · 100% verified guest review
            </p>
          </div>
        </div>
      </div>

      {done && !open && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="font-bold text-foreground">Thank you for sharing your experience!</p>
            <p className="text-muted-foreground">
              Your feedback is live and helps other traditional cooks make authentic choices.
            </p>
          </div>
        </div>
      )}

      {/* Review Form Drawer */}
      <div ref={formRef}>
        {open && (
          <form onSubmit={submit} className="surface-card mt-5 space-y-4 p-5 sm:p-6 rounded-2xl border border-border/90" noValidate>
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Share Your Cooking Experience with {product.name}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            {/* Stars Picker */}
            <div className="space-y-1.5">
              <Label className="text-xs">
                Your Rating <span className="text-destructive">*</span>
              </Label>
              <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHover(n)}
                    onClick={() => {
                      setForm((f) => ({ ...f, rating: n }));
                      setTouched((t) => ({ ...t, rating: true }));
                    }}
                    className="p-1 transition-transform hover:scale-115"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        n <= (hover || form.rating)
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-xs font-bold text-foreground">{form.rating} of 5 Stars</span>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="rev-title" className="text-xs">Headline / Summary</Label>
              <Input
                id="rev-title"
                value={form.title}
                onChange={set("title")}
                maxLength={80}
                className="h-8 text-xs"
                placeholder="e.g. Unbelievable aroma in morning rasam"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="rev-comment" className="text-xs">
                Your Detailed Feedback <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="rev-comment"
                value={form.comment}
                onChange={set("comment")}
                onBlur={blur("comment")}
                maxLength={MAX_COMMENT}
                rows={4}
                className="text-xs"
                placeholder="How did this hing bloom in your ghee? Which recipes did you cook with it?"
              />
              <div className="flex justify-between text-[10px]">
                <span className="text-destructive">{errorFor("comment")}</span>
                <span className="text-muted-foreground">{form.comment.length}/{MAX_COMMENT}</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <Label htmlFor="rev-name" className="text-xs">
                  Your Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="rev-name"
                  value={form.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  className="h-8 text-xs"
                  placeholder="e.g. Sowmya Raman"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="rev-city" className="text-xs">City & State (optional)</Label>
                <Input
                  id="rev-city"
                  value={form.city}
                  onChange={set("city")}
                  className="h-8 text-xs"
                  placeholder="e.g. Chennai, TN"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Button type="submit" size="sm" className="h-8 text-xs font-semibold px-4" disabled={sending}>
                {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> : null}
                Submit Review
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Reviews List */}
      <div className="mt-6 space-y-3.5">
        {hydrated && reviews.length === 0 && !open && (
          <div className="surface-card flex flex-col items-center gap-2 p-8 text-center rounded-2xl">
            <Pencil className="h-5 w-5 text-primary" />
            <p className="font-bold text-sm text-foreground">Be the first to review {product.name}</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Share your thoughts on how this artisan hing blooms in your kitchen.
            </p>
            <Button variant="outline" size="sm" className="mt-2 text-xs" onClick={openForm}>
              Write a Review
            </Button>
          </div>
        )}

        {reviews.map((r) => (
          <article
            key={r.id}
            className="surface-card p-4 sm:p-5 rounded-xl border border-border/80 hover:border-primary/30 transition-colors shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Stars value={r.rating} />
                {r.title ? <h4 className="text-xs sm:text-sm font-bold text-foreground">{r.title}</h4> : null}
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="h-3 w-3 shrink-0" />
                <span>Verified Buyer</span>
              </div>
            </div>

            <p className="mt-2 text-xs text-foreground/90 leading-relaxed">
              {r.comment}
            </p>

            <div className="mt-3 pt-2.5 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">{r.name}</span>
                {r.city ? <span>· {r.city}</span> : null}
                <span>· {formatReviewDate(r.createdAt)}</span>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                <span>South Indian Cuisine</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
