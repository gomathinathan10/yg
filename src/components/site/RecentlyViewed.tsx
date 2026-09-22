import { Link } from "@tanstack/react-router";
import { History } from "lucide-react";
import { SmartImage } from "@/components/site/SmartImage";
import { formatPrice, useLiveProducts } from "@/data/products";
import { useRecentlyViewed } from "@/lib/recently-viewed";

/** Horizontal strip of the last products this visitor opened. */
export function RecentlyViewed({ currentSlug }: { currentSlug?: string }) {
  const { slugs, clear } = useRecentlyViewed(currentSlug);
  const allProducts = useLiveProducts();
  const items = slugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) return null;

  return (
    <section className="container-page py-12" aria-labelledby="recently-viewed">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <h2 id="recently-viewed" className="flex min-w-0 items-center gap-2 text-lg font-semibold">
          <History className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <span className="truncate">Recently viewed</span>
        </h2>
        <button
          type="button"
          onClick={clear}
          className="shrink-0 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          Clear
        </button>
      </div>

      <ul className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2">
        {items.map((p) => (
          <li key={p.slug} className="w-40 shrink-0 snap-start">
            <Link to="/product/$slug" params={{ slug: p.slug }} className="group block">
              <SmartImage
                src={p.image}
                alt={p.name}
                sizes="160px"
                fallbackLabel={p.name}
                wrapperClassName="aspect-square w-full rounded-xl border border-border"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <p className="mt-2 line-clamp-2 text-sm font-medium">{p.name}</p>
              <p className="text-sm text-muted-foreground">{formatPrice(p.variants[0]!.price)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
