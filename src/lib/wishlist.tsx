import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiFetch } from "@/lib/api-client";

/**
 * Saved items ("Kitchen list") and back-in-stock alerts.
 * Device-local for now — swap the load/save pair for an API when a backend exists.
 */

const WISHLIST_KEY = "yg-wishlist-v1";
const ALERTS_KEY = "yg-stock-alerts-v1";

export type StockAlert = {
  slug: string;
  contact: string;
  createdAt: number;
};

type WishlistValue = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
  alerts: StockAlert[];
  hasAlert: (slug: string) => boolean;
  addAlert: (slug: string, contact: string) => void;
};

const WishlistContext = createContext<WishlistValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSlugs(read<string[]>(WISHLIST_KEY, []));
    setAlerts(read<StockAlert[]>(ALERTS_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(slugs));
    } catch {
      /* storage full or blocked — the list simply won't persist */
    }
  }, [slugs, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    } catch {
      /* ignore */
    }
  }, [alerts, hydrated]);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback(
    (slug: string) => {
      let nowSaved = false;
      setSlugs((prev) => {
        nowSaved = !prev.includes(slug);
        return nowSaved ? [slug, ...prev] : prev.filter((s) => s !== slug);
      });
      return nowSaved;
    },
    [],
  );

  const remove = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const clear = useCallback(() => setSlugs([]), []);

  const hasAlert = useCallback((slug: string) => alerts.some((a) => a.slug === slug), [alerts]);

  const addAlert = useCallback((slug: string, contact: string) => {
    void apiFetch("/api/alerts", {
      method: "POST",
      body: JSON.stringify({ slug, contact }),
    }).catch((err) => {
      console.error("Failed to post stock alert to server:", err);
    });

    setAlerts((prev) => [
      ...prev.filter((a) => a.slug !== slug),
      { slug, contact, createdAt: Date.now() },
    ]);
  }, []);

  const value = useMemo<WishlistValue>(
    () => ({ slugs, has, toggle, remove, clear, alerts, hasAlert, addAlert }),
    [slugs, has, toggle, remove, clear, alerts, hasAlert, addAlert],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
