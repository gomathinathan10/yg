import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";

export type ReviewStatus = "pending" | "published" | "rejected";

export type GuestReview = {
  id: string;
  slug: string;
  rating: number;
  title: string;
  comment: string;
  name: string;
  city?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  contactOptIn: boolean;
  createdAt: number;
  status: ReviewStatus;
};

export type ReviewDraft = Omit<GuestReview, "id" | "createdAt" | "status">;

const STORAGE_KEY = "yg-reviews-v1";

const DEFAULT_SEEDS: Record<string, GuestReview[]> = {
  "gold-asafoetida-powder": [
    {
      id: "rev-seed-1",
      slug: "gold-asafoetida-powder",
      rating: 5,
      title: "Incomparable Traditional Aroma",
      comment: "Just a pinch transforms the rasam and sambar completely. Unmatched authenticity and freshness. Truly heritage quality!",
      name: "Meenakshi Sundaram",
      city: "Chennai",
      contactOptIn: true,
      createdAt: Date.now() - 3 * 86400000,
      status: "published",
    },
    {
      id: "rev-seed-2",
      slug: "gold-asafoetida-powder",
      rating: 5,
      title: "Best Hing in South India",
      comment: "We have been using Y.G for three generations. The gold powder has that deep, rounded compound aroma without any bitter aftertaste.",
      name: "Venkatesh Raghavan",
      city: "Tirunelveli",
      contactOptIn: true,
      createdAt: Date.now() - 9 * 86400000,
      status: "published",
    },
    {
      id: "rev-seed-3",
      slug: "gold-asafoetida-powder",
      rating: 5,
      title: "Airtight packaging is excellent",
      comment: "Arrived fresh and tightly sealed. Dissolves seamlessly in hot ghee tempering.",
      name: "Ananya Sharma",
      city: "Bengaluru",
      contactOptIn: false,
      createdAt: Date.now() - 15 * 86400000,
      status: "published",
    },
  ],
  "gluten-free-asafoetida-powder": [
    {
      id: "rev-seed-4",
      slug: "gluten-free-asafoetida-powder",
      rating: 5,
      title: "Life-saver for Celiac Diet",
      comment: "Finally an authentic hing without wheat flour or maida. Clean aroma, pure taste, and completely gut-friendly.",
      name: "Dr. Shalini Rao",
      city: "Hyderabad",
      contactOptIn: true,
      createdAt: Date.now() - 5 * 86400000,
      status: "published",
    },
  ],
};

function readStoredReviews(): GuestReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeStoredReviews(reviews: GuestReview[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    /* ignore storage quota errors */
  }
}

export function formatReviewDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Reviews loaded from client storage + local optimistic submissions */
export function useGuestReviews(slug: string) {
  const [reviews, setReviews] = useState<GuestReview[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const fetchReviews = useCallback(async () => {
    let serverReviews: GuestReview[] = [];
    try {
      const res = await apiFetch<any[]>(`/api/reviews?slug=${encodeURIComponent(slug)}&status=published`);
      if (Array.isArray(res)) {
        serverReviews = res.map((r) => ({
          id: r.id,
          slug: r.slug,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          name: r.name,
          city: r.city,
          email: r.email,
          phone: r.phone,
          contactOptIn: r.contact_opt_in === 1 || r.contactOptIn === true,
          createdAt: r.created_at || r.createdAt || Date.now(),
          status: r.status || "published",
        }));
      }
    } catch {
      /* fallback to local storage */
    }

    const stored = readStoredReviews().filter((r) => r.slug === slug);
    const seeds = DEFAULT_SEEDS[slug] || [];

    const existingIds = new Set<string>();
    const combined: GuestReview[] = [];
    for (const r of [...serverReviews, ...stored, ...seeds]) {
      if (!existingIds.has(r.id)) {
        existingIds.add(r.id);
        combined.push(r);
      }
    }

    setReviews(combined);
    setHydrated(true);
  }, [slug]);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  const submitReview = useCallback(
    async (draft: ReviewDraft): Promise<GuestReview> => {
      let created: GuestReview = {
        ...draft,
        id: `rev_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
        createdAt: Date.now(),
        status: "published",
      };

      try {
        const res = await apiFetch<{ ok: boolean; review: any }>("/api/reviews", {
          method: "POST",
          body: JSON.stringify(draft),
        });
        if (res?.review) {
          created = {
            ...draft,
            id: res.review.id,
            createdAt: res.review.created_at || Date.now(),
            status: res.review.status || "published",
          };
        }
      } catch (err) {
        console.error("Failed to submit review to server, saving locally:", err);
      }

      const all = readStoredReviews();
      writeStoredReviews([created, ...all]);
      setReviews((prev) => [created, ...prev.filter((r) => r.id !== created.id)]);
      return created;
    },
    [],
  );

  const remove = useCallback((id: string) => {
    void apiFetch(`/api/reviews/${id}`, { method: "DELETE" }).catch(() => {});
    const all = readStoredReviews().filter((r) => r.id !== id);
    writeStoredReviews(all);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const sortedReviews = [...reviews].sort((a, b) => b.createdAt - a.createdAt);

  const average =
    sortedReviews.length > 0
      ? Math.round((sortedReviews.reduce((s, r) => s + r.rating, 0) / sortedReviews.length) * 10) / 10
      : 5.0;

  return { reviews: sortedReviews, average, hydrated, submitReview, remove, refresh: fetchReviews };
}
