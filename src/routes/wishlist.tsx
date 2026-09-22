import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/site/SmartImage";
import { RecentlyViewed } from "@/components/site/RecentlyViewed";
import { formatPrice, useLiveProducts } from "@/data/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your kitchen list — Y.G Asafoetida" },
      {
        name: "description",
        content:
          "The hing you saved for later, plus the back-in-stock alerts you asked for. Move anything to your basket in one tap.",
      },
      { property: "og:title", content: "Your kitchen list — Y.G Asafoetida" },
      {
        property: "og:description",
        content: "Saved hing, gift boxes and back-in-stock alerts, ready when you are.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { slugs, remove, alerts } = useWishlist();
  const { add } = useCart();
  const allProducts = useLiveProducts();
  const items = slugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="container-page py-8 sm:py-14 px-3 sm:px-6">
      {/* Ekomart Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-[#181206] transition-colors">Home</Link>
        <span>/</span>
        <span className="font-semibold text-foreground">Wishlist</span>
      </nav>

      <div className="border-b border-[#E8DEC8] pb-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#181206]">Saved by you</span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#181206]">
          Your Saved Hing &amp; Wishlist
        </h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl">
          Nothing here expires and nothing is shared. Move anything to your basket when you&apos;re ready to cook.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-[6px] border border-[#E8DEC8] bg-white mt-8 flex flex-col items-center px-6 py-14 text-center shadow-xs">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#FAF3D6] border border-[#E8DEC8]">
            <Heart className="h-7 w-7 text-muted-foreground" aria-hidden />
          </span>
          <h2 className="mt-4 text-lg font-bold text-[#181206]">Your wishlist is currently empty</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Tap the heart icon on any authentic formulation to save it here for later.
          </p>
          <Button asChild className="mt-6 bg-[#FF9933] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] font-bold shadow-xs">
            <Link to="/shop">Browse the collection</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => {
            const variant = p.variants[0]!;
            const soldOut = p.inStock === false;
            return (
              <li key={p.slug} className="rounded-[6px] border border-[#E8DEC8] bg-white flex gap-4 p-4 shadow-xs transition-shadow hover:shadow-md">
                <Link to="/product/$slug" params={{ slug: p.slug }} className="shrink-0">
                  <SmartImage
                    src={p.image}
                    alt={p.name}
                    sizes="96px"
                    fallbackLabel={p.name}
                    wrapperClassName="h-24 w-24 rounded-[6px] border border-[#E8DEC8] bg-[#FAF3D6]"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="line-clamp-2 font-bold text-sm text-[#181206] hover:text-[#181206] transition-colors"
                  >
                    {p.name}
                  </Link>
                  <p className="mt-1 text-sm font-bold text-[#DC2626]">
                    {formatPrice(variant.price)} <span className="text-xs font-normal text-muted-foreground">· {variant.label}</span>
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-3">
                    <Button
                      size="sm"
                      disabled={soldOut}
                      className="bg-[#FF9933] hover:bg-[#E6B000] text-[#181206] font-black rounded-[6px] font-bold text-xs shadow-xs"
                      onClick={() => add(p.slug, variant.id)}
                    >
                      {soldOut ? "Sold out" : "Add to basket"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-muted-foreground hover:text-[#DC2626] rounded-[6px] hover:bg-red-50"
                      onClick={() => {
                        remove(p.slug);
                        toast(`${p.name} removed from your list`);
                      }}
                      aria-label={`Remove ${p.name} from your list`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {alerts.length > 0 ? (
        <section className="mt-14" aria-labelledby="alerts">
          <h2 id="alerts" className="flex items-center gap-2 text-lg font-bold text-[#181206]">
            <BellRing className="h-4 w-4 text-[#181206]" aria-hidden /> Back-in-stock alerts
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {alerts.map((a) => {
              const p = allProducts.find((prod) => prod.slug === a.slug);
              return (
                <li
                  key={a.slug}
                  className="rounded-[6px] border border-[#E8DEC8] bg-white flex items-center justify-between gap-3 p-4 text-sm shadow-xs"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-[#181206]">{p?.name ?? a.slug}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      We&apos;ll message {a.contact}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-[4px] bg-[#FF9933]/10 border border-[#FF9933]/20 px-2.5 py-1 text-xs font-bold text-[#181206]">
                    Watching
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <RecentlyViewed />
    </div>
  );
}
