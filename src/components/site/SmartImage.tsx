import { useState } from "react";
import { ImageOff, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { srcSetFor } from "@/assets/images";

type SmartImageProps = {
  src?: string | undefined;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  sizes?: string;
  priority?: boolean;
  fallbackLabel?: string;
};

export function SmartImage({
  src,
  alt,
  className,
  wrapperClassName,
  width,
  height,
  loading = "lazy",
  sizes,
  priority,
  fallbackLabel,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(!src);
  const [attempt, setAttempt] = useState(0);

  if (!src || hasError) {
    return (
      <div className={cn("relative flex flex-col items-center justify-center gap-2 bg-secondary/50 p-3 text-center rounded-xl", wrapperClassName)}>
        <ImageOff className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <span className="text-[10px] leading-tight font-medium tracking-wide text-muted-foreground uppercase">
          {fallbackLabel ?? "Image unavailable"}
        </span>
        <button
          type="button"
          onClick={() => {
            setHasError(false);
            setAttempt((a) => a + 1);
          }}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <RefreshCw className="h-3 w-3" aria-hidden="true" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-transparent flex items-center justify-center", wrapperClassName)}>
      <img
        key={`${src}-${attempt}`}
        src={src}
        alt={alt}
        {...(srcSetFor(src) ? { srcSet: srcSetFor(src), sizes: sizes ?? "100vw" } : {})}
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        loading={priority ? "eager" : loading}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        onError={() => setHasError(true)}
        className={cn("h-full w-full object-contain block", className)}
      />
    </div>
  );
}
