import { Heart } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";

/**
 * Heart toggle used on cards and product pages. Confirms with an undo toast so
 * an accidental tap is never destructive.
 */
export function WishlistButton({
  slug,
  name,
  className,
  variant = "icon",
}: {
  slug: string;
  name: string;
  className?: string;
  variant?: "icon" | "full";
}) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  const onClick = () => {
    const nowSaved = toggle(slug);
    if (nowSaved) {
      toast.success(`${name} saved to your list`, {
        action: { label: "Undo", onClick: () => toggle(slug) },
      });
    } else {
      toast(`${name} removed from your list`, {
        action: { label: "Undo", onClick: () => toggle(slug) },
      });
    }
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium transition-all duration-150 hover:bg-secondary active:scale-95 cursor-pointer",
          saved && "border-primary/40 bg-primary/5 text-primary",
          className,
        )}
      >
        <Heart className={cn("h-4 w-4 transition-transform duration-200", saved && "fill-primary scale-110")} aria-hidden />
        {saved ? "Saved" : "Save for later"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={saved ? `Remove ${name} from your list` : `Save ${name} for later`}
      aria-pressed={saved}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-border bg-card/90 backdrop-blur transition-all duration-150 hover:bg-card active:scale-125 cursor-pointer",
        saved && "border-primary/40 text-primary",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition-transform duration-200", saved && "fill-primary scale-110")} aria-hidden />
    </button>
  );
}
