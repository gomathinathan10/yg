import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  qty,
  onChange,
  small,
  label = "Quantity",
  min = 1,
  max,
}: {
  qty: number;
  onChange: (qty: number) => void;
  small?: boolean;
  label?: string;
  min?: number;
  max?: number;
}) {
  const size = small ? "h-9 w-9" : "h-11 w-11";
  const atMin = qty <= min;
  const atMax = max !== undefined && qty >= max;

  return (
    <div
      className="inline-flex items-center rounded-full border border-border bg-card"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={atMin}
        onClick={() => onChange(qty - 1)}
        className={`${size} inline-flex items-center justify-center rounded-full text-muted-foreground transition-all duration-100 hover:text-foreground active:scale-75 active:bg-muted/60 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40`}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <span
        className="min-w-8 text-center text-sm font-semibold tabular-nums"
        role="status"
        aria-live="polite"
        aria-label={`${label}: ${qty}`}
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        disabled={atMax}
        onClick={() => onChange(qty + 1)}
        className={`${size} inline-flex items-center justify-center rounded-full text-muted-foreground transition-all duration-100 hover:text-foreground active:scale-75 active:bg-muted/60 cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40`}
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
