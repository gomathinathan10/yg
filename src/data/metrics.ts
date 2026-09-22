import { useEffect, useState } from "react";
import { getCalcMetricsServerFn, type DbCalcMetrics } from "@/functions/metrics";

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

export function dbMetricsToMetrics(m: DbCalcMetrics): CalculationMetrics {
  return {
    freeShippingThreshold: Number(m.free_shipping_threshold),
    standardDeliveryFee: Number(m.standard_delivery_fee),
    expressDeliveryFee: Number(m.express_delivery_fee),
    codHandlingFee: Number(m.cod_handling_fee),
    gstPercentage: Number(m.gst_percentage),
    hsnCode: m.hsn_code,
    wholesaleTier1MinKg: Number(m.wholesale_tier1_min_kg),
    wholesaleTier1Discount: Number(m.wholesale_tier1_discount),
    wholesaleTier2MinKg: Number(m.wholesale_tier2_min_kg),
    wholesaleTier2Discount: Number(m.wholesale_tier2_discount),
    wholesaleTier3MinKg: Number(m.wholesale_tier3_min_kg),
    wholesaleTier3Discount: Number(m.wholesale_tier3_discount),
  };
}

export function metricsToDbMetrics(m: CalculationMetrics): DbCalcMetrics {
  return {
    free_shipping_threshold: m.freeShippingThreshold,
    standard_delivery_fee: m.standardDeliveryFee,
    express_delivery_fee: m.expressDeliveryFee,
    cod_handling_fee: m.codHandlingFee,
    gst_percentage: m.gstPercentage,
    hsn_code: m.hsnCode,
    wholesale_tier1_min_kg: m.wholesaleTier1MinKg,
    wholesale_tier1_discount: m.wholesaleTier1Discount,
    wholesale_tier2_min_kg: m.wholesaleTier2MinKg,
    wholesale_tier2_discount: m.wholesaleTier2Discount,
    wholesale_tier3_min_kg: m.wholesaleTier3MinKg,
    wholesale_tier3_discount: m.wholesaleTier3Discount,
  };
}

/**
 * Fetches the real, admin-managed shipping/GST/wholesale metrics from the
 * server so checkout pricing always reflects whatever an administrator has
 * saved — for every visitor, not just the browser that made the edit.
 * Falls back to DEFAULT_METRICS if none are saved yet or the request fails.
 */
export async function getLiveMetrics(): Promise<CalculationMetrics> {
  try {
    const db = await getCalcMetricsServerFn();
    return db ? dbMetricsToMetrics(db) : DEFAULT_METRICS;
  } catch (e) {
    console.error("Failed to load live calculation metrics, using defaults:", e);
    return DEFAULT_METRICS;
  }
}

/**
 * Reactive React hook for Calculation Metrics.
 * Re-fetches on mount and whenever "yg_calc_metrics_updated" fires
 * (dispatched by the Admin Portal right after a save/reset).
 */
export function useLiveMetrics(): CalculationMetrics {
  const [metrics, setMetrics] = useState<CalculationMetrics>(DEFAULT_METRICS);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      getLiveMetrics().then((data) => {
        if (!cancelled) setMetrics(data);
      });
    };
    load();

    window.addEventListener("yg_calc_metrics_updated", load);
    return () => {
      cancelled = true;
      window.removeEventListener("yg_calc_metrics_updated", load);
    };
  }, []);

  return metrics;
}
