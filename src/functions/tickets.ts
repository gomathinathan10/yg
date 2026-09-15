import { apiFetch } from "@/lib/api-client";

export type DbTicket = {
  id: string;
  topic: string;
  order_id: string | null;
  message: string;
  contact: string;
  name: string | null;
  status: "open" | "in_progress" | "resolved" | "closed";
  reply: string | null;
  created_at: number;
  updated_at: number;
};

export const createTicketServerFn = async ({
  data,
}: {
  data: {
    topic: string;
    orderId?: string | undefined;
    message: string;
    contact: string;
    name?: string | undefined;
  };
}): Promise<{ ok: boolean; ticket: DbTicket }> => {
  return apiFetch<{ ok: boolean; ticket: DbTicket }>("/api/tickets", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const adminListTicketsServerFn = async ({
  data,
}: {
  data?: { status?: string; search?: string };
} = {}): Promise<DbTicket[]> => {
  const query = data?.status && data.status !== "all" ? `?status=${encodeURIComponent(data.status)}` : "";
  const tickets = await apiFetch<DbTicket[]>(`/api/tickets${query}`);
  if (data?.search) {
    const term = data.search.toLowerCase();
    return tickets.filter(
      (t) =>
        t.id.toLowerCase().includes(term) ||
        t.contact.toLowerCase().includes(term) ||
        t.message.toLowerCase().includes(term) ||
        t.topic.toLowerCase().includes(term)
    );
  }
  return tickets;
};

export const adminUpdateTicketServerFn = async ({
  data,
}: {
  data: {
    id: string;
    status: "open" | "in_progress" | "resolved" | "closed";
    reply?: string | undefined;
  };
}) => {
  await apiFetch(`/api/tickets/${data.id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: data.status, reply: data.reply }),
  });
  return { ok: true };
};
