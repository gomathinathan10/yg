import { useEffect, useState } from "react";

export interface CalculationMetrics {
  freeShippingThreshold: number;
  standardDeliveryFee: number;
  expressDeliveryFee: number;
  codHandlingFee: number;
  gstPercentage: number;
  hsnCode: string;
  wholesaleTier1MinKg: number;
  wholesaleTier1Discount: number;
  wholesaleTier2MinKg: number;
  wholesaleTier2Discount: number;
  wholesaleTier3MinKg: number;
  wholesaleTier3Discount: number;
}

export const DEFAULT_METRICS: CalculationMetrics = {
  freeShippingThreshold: 499,
  standardDeliveryFee: 50,
  expressDeliveryFee: 120,
  codHandlingFee: 40,
  gstPercentage: 5,
  hsnCode: "0910.30",
  wholesaleTier1MinKg: 5,
  wholesaleTier1Discount: 10,
  wholesaleTier2MinKg: 25,
  wholesaleTier2Discount: 18,
  wholesaleTier3MinKg: 100,
  wholesaleTier3Discount: 25,
};

const STORAGE_KEY = "yg_calc_metrics";

export function getLiveMetrics(): CalculationMetrics {
  if (typeof window === "undefined") return DEFAULT_METRICS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          ...DEFAULT_METRICS,
          ...parsed,
          freeShippingThreshold: Number(parsed.freeShippingThreshold ?? DEFAULT_METRICS.freeShippingThreshold),
          standardDeliveryFee: Number(parsed.standardDeliveryFee ?? DEFAULT_METRICS.standardDeliveryFee),
          expressDeliveryFee: Number(parsed.expressDeliveryFee ?? DEFAULT_METRICS.expressDeliveryFee),
          codHandlingFee: Number(parsed.codHandlingFee ?? DEFAULT_METRICS.codHandlingFee),
          gstPercentage: Number(parsed.gstPercentage ?? DEFAULT_METRICS.gstPercentage),
        };
      }
    }
  } catch (e) {
    console.error("Failed to load calculation metrics:", e);
  }
  return DEFAULT_METRICS;
}

export function saveLiveMetrics(metrics: CalculationMetrics): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
    window.dispatchEvent(new CustomEvent("yg_calc_metrics_updated", { detail: metrics }));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save calculation metrics:", e);
  }
}

export function resetLiveMetrics(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("yg_calc_metrics_updated", { detail: DEFAULT_METRICS }));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to reset calculation metrics:", e);
  }
}

/**
 * Reactive React hook for Calculation Metrics.
 * Automatically re-renders components whenever metrics are modified in the Admin Portal.
 */
export function useLiveMetrics(): CalculationMetrics {
  const [metrics, setMetrics] = useState<CalculationMetrics>(() => getLiveMetrics());

  useEffect(() => {
    // Sync on mount
    setMetrics(getLiveMetrics());

    const handleUpdate = () => {
      setMetrics(getLiveMetrics());
    };

    window.addEventListener("yg_calc_metrics_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("yg_calc_metrics_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return metrics;
}
