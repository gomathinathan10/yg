import { SUPPORT } from "@/data/faq";
import { formatPrice } from "@/data/products";
import type { Order } from "@/lib/orders";

export type Ticket = {
  id: string;
  createdAt: number;
  topic: string;
  orderId?: string | undefined;
  message: string;
  contact: string;
};

const TICKETS_KEY = "yg-tickets-v1";

export const TICKET_TOPICS = [
  "Where is my order?",
  "Damaged or wrong item",
  "Cancellation or refund help",
  "Change address or delivery date",
  "Product or usage question",
  "Something else",
];

export function readTickets(): Ticket[] {
  try {
    const raw = window.localStorage.getItem(TICKETS_KEY);
    return raw ? (JSON.parse(raw) as Ticket[]) : [];
  } catch {
    return [];
  }
}

import { apiFetch } from "@/lib/api-client";

export async function saveTicket(input: Omit<Ticket, "id" | "createdAt">): Promise<Ticket> {
  let created: Ticket = {
    ...input,
    id: `TKT${Math.floor(10000 + Math.random() * 89999)}`,
    createdAt: Date.now(),
  };

  try {
    const res = await apiFetch<{ ok: boolean; ticket: any }>("/api/tickets", {
      method: "POST",
      body: JSON.stringify(input),
    });
    if (res?.ticket) {
      created = {
        id: res.ticket.id,
        topic: res.ticket.topic,
        orderId: res.ticket.order_id || undefined,
        contact: res.ticket.contact,
        message: res.ticket.message,
        createdAt: res.ticket.created_at || Date.now(),
      };
    }
  } catch (err) {
    console.error("Failed to post ticket to server, saving locally:", err);
  }

  try {
    window.localStorage.setItem(TICKETS_KEY, JSON.stringify([created, ...readTickets()]));
  } catch {
    /* ignore */
  }
  return created;
}

/** Human-readable order digest used to prefill a support ticket, so nothing is typed twice. */
export function orderDigest(order: Order): string {
  const items = order.items
    .map((i) => `• ${i.qty} × ${i.name} (${i.variantLabel}) — ${formatPrice(i.price * i.qty)}`)
    .join("\n");
  const placed = order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }) : "Recent";
  const resolution = order.resolution
    ? `\nOpen request: ${order.resolution.type === "cancellation" ? "Cancellation" : "Refund"} — ${order.resolution.reason}`
    : "";
  return [
    `Order ID: ${order.id}`,
    `Placed: ${placed}`,
    `Payment: ${order.payment.toUpperCase()} · ${order.delivery === "express" ? "Express" : "Standard"} shipping`,
    `Total: ${formatPrice(order.totals.total)}`,
    `Deliver to: ${order.address.firstName} ${order.address.lastName}, ${order.address.line1}, ${order.address.city}, ${order.address.state} ${order.address.pin}`,
    `Contact: ${order.email} · ${order.phone}`,
    "",
    "Items:",
    items,
    resolution,
  ]
    .join("\n")
    .trim();
}

/** Pre-composed mailto so a customer can escalate without retyping order details. */
export function mailtoForOrder(order: Order, topic: string, note: string): string {
  const subject = `[${order.id}] ${topic}`;
  const body = `${note ? `${note}\n\n` : ""}--- Order details ---\n${orderDigest(order)}`;
  return `mailto:${SUPPORT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
