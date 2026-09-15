import { apiFetch } from "@/lib/api-client";

export type DbQuestion = {
  id: string;
  slug: string;
  question: string;
  answer: string | null;
  asked_by: string;
  answered_by: string | null;
  created_at: number;
  answered_at: number | null;
  status: "pending" | "published";
};

export const getProductQuestionsServerFn = async ({
  data,
}: {
  data: { slug: string };
}): Promise<DbQuestion[]> => {
  return apiFetch<DbQuestion[]>(`/api/questions?slug=${encodeURIComponent(data.slug)}&status=published`);
};

export const submitQuestionServerFn = async ({
  data,
}: {
  data: {
    slug: string;
    question: string;
    askedBy: string;
  };
}): Promise<{ ok: boolean; question: DbQuestion }> => {
  return apiFetch<{ ok: boolean; question: DbQuestion }>("/api/questions", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const adminListQuestionsServerFn = async ({
  data,
}: {
  data?: { slug?: string; status?: "pending" | "published" | "all" };
} = {}): Promise<DbQuestion[]> => {
  const params = new URLSearchParams();
  if (data?.slug) params.set("slug", data.slug);
  if (data?.status) params.set("status", data.status);
  const q = params.toString() ? `?${params.toString()}` : "";
  return apiFetch<DbQuestion[]>(`/api/questions${q}`);
};

export const adminAnswerQuestionServerFn = async ({
  data,
}: {
  data: { id: string; answer: string; answeredBy?: string | undefined };
}) => {
  await apiFetch(`/api/questions/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify({ answer: data.answer, answeredBy: data.answeredBy }),
  });
  return { ok: true, id: data.id };
};

export const adminDeleteQuestionServerFn = async ({
  data,
}: {
  data: { id: string };
}) => {
  await apiFetch(`/api/questions/${data.id}`, { method: "DELETE" });
  return { ok: true, id: data.id };
};
