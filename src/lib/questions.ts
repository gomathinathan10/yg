import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";

export type ProductQuestion = {
  id: string;
  slug: string;
  question: string;
  answer?: string | undefined;
  askedBy: string;
  answeredBy?: string | undefined;
  createdAt: number;
  pending?: boolean | undefined;
};

const STORAGE_KEY = "yg-questions-v1";

const DEFAULT_SEEDS: Record<string, ProductQuestion[]> = {
  "gold-asafoetida-powder": [
    {
      id: "q-seed-1",
      slug: "gold-asafoetida-powder",
      question: "How should I store the asafoetida powder to preserve the aroma?",
      answer: "Keep in the airtight container provided, away from direct moisture and sunlight. Do not keep open next to other spices as its aroma is very potent.",
      askedBy: "Kavitha S.",
      answeredBy: "Y.G Quality Team",
      createdAt: Date.now() - 20 * 86400000,
      pending: false,
    },
    {
      id: "q-seed-2",
      slug: "gold-asafoetida-powder",
      question: "How much powder is recommended per serving of sambar or dal?",
      answer: "A pinch (approx. 1/8 to 1/4 teaspoon) tempered in hot ghee or sesame oil is sufficient for 4-6 servings.",
      askedBy: "Ramesh P.",
      answeredBy: "Y.G Culinary Advisor",
      createdAt: Date.now() - 14 * 86400000,
      pending: false,
    },
  ],
  "gluten-free-asafoetida-powder": [
    {
      id: "q-seed-3",
      slug: "gluten-free-asafoetida-powder",
      question: "Does this contain any traces of wheat or gluten-bearing starches?",
      answer: "No. Our gluten-free asafoetida is formulated using non-gluten starches and processed on dedicated, tested equipment.",
      askedBy: "Deepa N.",
      answeredBy: "Y.G Quality Assurance",
      createdAt: Date.now() - 10 * 86400000,
      pending: false,
    },
  ],
};

function readStoredQuestions(): ProductQuestion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeStoredQuestions(questions: ProductQuestion[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch {
    /* ignore */
  }
}

export function useProductQuestions(slug: string) {
  const [questions, setQuestions] = useState<ProductQuestion[]>([]);

  const fetchQuestions = useCallback(async () => {
    let serverQuestions: ProductQuestion[] = [];
    try {
      const res = await apiFetch<any[]>(`/api/questions?slug=${encodeURIComponent(slug)}&status=published`);
      if (Array.isArray(res)) {
        serverQuestions = res.map((q) => ({
          id: q.id,
          slug: q.slug,
          question: q.question,
          answer: q.answer || undefined,
          askedBy: q.asked_by || q.askedBy || "Customer",
          answeredBy: q.answered_by || q.answeredBy || undefined,
          createdAt: q.created_at || q.createdAt || Date.now(),
          pending: false,
        }));
      }
    } catch {
      /* fallback to local storage */
    }

    const stored = readStoredQuestions().filter((q) => q.slug === slug);
    const seeds = DEFAULT_SEEDS[slug] || [];

    const existingIds = new Set<string>();
    const combined: ProductQuestion[] = [];
    for (const q of [...serverQuestions, ...stored, ...seeds]) {
      if (!existingIds.has(q.id)) {
        existingIds.add(q.id);
        combined.push(q);
      }
    }

    setQuestions(combined);
  }, [slug]);

  useEffect(() => {
    void fetchQuestions();
  }, [fetchQuestions]);

  const ask = useCallback(
    async (question: string, askedBy: string) => {
      let created: ProductQuestion = {
        id: `q-${Date.now()}`,
        slug,
        question: question.trim(),
        askedBy: askedBy.trim() || "Guest",
        createdAt: Date.now(),
        pending: true,
      };

      try {
        const res = await apiFetch<{ ok: boolean; question: any }>("/api/questions", {
          method: "POST",
          body: JSON.stringify({ slug, question, askedBy }),
        });
        if (res?.question) {
          created = {
            id: res.question.id,
            slug,
            question: res.question.question,
            answer: res.question.answer || undefined,
            askedBy: res.question.asked_by || askedBy,
            answeredBy: res.question.answered_by || undefined,
            createdAt: res.question.created_at || Date.now(),
            pending: false,
          };
        }
      } catch (err) {
        console.error("Failed to submit question to server, saving locally:", err);
      }

      const all = readStoredQuestions();
      writeStoredQuestions([created, ...all]);
      setQuestions((prev) => [created, ...prev.filter((q) => q.id !== created.id)]);
      return created;
    },
    [slug],
  );

  const answeredCount = questions.filter((q) => !q.pending && q.answer).length;

  return { questions, answeredCount, ask, refresh: fetchQuestions };
}
