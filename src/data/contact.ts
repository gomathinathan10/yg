import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api-client";

export type StoreContact = {
  registeredName?: string;
  phone: string;
  phoneRaw: string;
  mobile: string;
  salesDeskPhone?: string;
  whatsapp: string;
  email: string;
  supportEmail: string;
  b2bEmail?: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  workingHours: string;
  businessHours?: string;
  announcementText: string;
  freeDeliveryThreshold: number;
};

export const DEFAULT_STORE_CONTACT: StoreContact = {
  registeredName: "Mayil Agro Foods",
  phone: "0462 - 233 5555",
  phoneRaw: "04622335555",
  mobile: "+91 7200622221",
  salesDeskPhone: "+91 7904567979",
  whatsapp: "+91 7200622221",
  email: "Sales@yghing.com",
  supportEmail: "care@ygasafoetida.in",
  b2bEmail: "b2bsales@yghing.com",
  addressLine1: "1/303, M.K. Nagar, Near to HP Fuel Station, Abhisekapatti",
  addressLine2: "Tirunelveli - Tenkasi Main Road, Tirunelveli - 627 012",
  city: "Tirunelveli",
  state: "Tamil Nadu",
  pincode: "627012",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM IST",
  businessHours: "Monday – Saturday: 9:00 AM – 7:00 PM",
  announcementText: "FREE delivery & 40% OFF next 3 orders!",
  freeDeliveryThreshold: 499,
};

const CONTACT_STORAGE_KEY = "yg_store_contact";

export function getCachedContact(): StoreContact {
  if (typeof window === "undefined") return DEFAULT_STORE_CONTACT;
  try {
    const raw = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_STORE_CONTACT, ...JSON.parse(raw) };
    }
  } catch {}
  return DEFAULT_STORE_CONTACT;
}

export function notifyStorefrontContactChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("yg_contact_updated"));
  try {
    localStorage.setItem("yg_contact_updated_at", String(Date.now()));
    const bc = new BroadcastChannel("yg_sync_channel");
    bc.postMessage("contact_updated");
    bc.close();
  } catch {}
}

export function saveLocalContact(contact: StoreContact): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
    notifyStorefrontContactChanged();
  } catch {}
}

export async function getLiveContact(): Promise<StoreContact> {
  try {
    const remote = await apiFetch<StoreContact>("/api/contact");
    if (remote && typeof remote === "object") {
      const merged = { ...DEFAULT_STORE_CONTACT, ...remote };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(merged));
        } catch {}
      }
      return merged;
    }
    return getCachedContact();
  } catch {
    return getCachedContact();
  }
}

export async function adminSaveContactServerFn(contact: StoreContact, adminToken?: string): Promise<{ ok: boolean }> {
  saveLocalContact(contact);
  try {
    await apiFetch("/api/contact", {
      method: "POST",
      headers: adminToken ? { "x-admin-token": adminToken } : {},
      body: JSON.stringify(contact),
    });
    return { ok: true };
  } catch {
    return { ok: true }; // Local persistence succeeded
  }
}

export function useLiveContact(): StoreContact {
  const [contact, setContact] = useState<StoreContact>(() => getCachedContact());

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      setContact(getCachedContact());
      getLiveContact().then((data) => {
        if (!cancelled && data) {
          setContact(data);
        }
      });
    };
    load();

    const onStorage = (e: StorageEvent) => {
      if (e.key === CONTACT_STORAGE_KEY || e.key === "yg_contact_updated_at") {
        load();
      }
    };

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("yg_sync_channel");
      bc.onmessage = (ev) => {
        if (ev.data === "contact_updated") load();
      };
    } catch {}

    const onCustomEvent = () => load();

    window.addEventListener("yg_contact_updated", onCustomEvent);
    window.addEventListener("storage", onStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("yg_contact_updated", onCustomEvent);
      window.removeEventListener("storage", onStorage);
      if (bc) bc.close();
    };
  }, []);

  return contact;
}
