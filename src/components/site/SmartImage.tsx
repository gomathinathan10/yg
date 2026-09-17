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
  const [hasError, setHasError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  if (!src) {
    return (
      <div className={cn("relative flex flex-col items-center justify-center gap-1.5 bg-[#FAF3D6]/80 p-3 text-center rounded-[8px] border border-[#E8DEC8]", wrapperClassName)}>
        <span className="text-xl">📦</span>
        <span className="text-[10px] leading-tight font-bold tracking-wide text-[#8C5921] uppercase line-clamp-1">
          {fallbackLabel ?? "Product"}
        </span>
        <span className="text-[9px] text-[#78716C] font-medium">Photo Coming Soon</span>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={cn("relative flex flex-col items-center justify-center gap-2 bg-[#FAF3D6]/60 p-3 text-center rounded-[8px] border border-[#E8DEC8]", wrapperClassName)}>
        <ImageOff className="h-5 w-5 text-[#8C5921]" aria-hidden="true" />
        <span className="text-[10px] leading-tight font-medium tracking-wide text-[#8C5921] uppercase">
          {fallbackLabel ?? "Photo Coming Soon"}
        </span>
        <button
          type="button"
          onClick={() => {
            setHasError(false);
            setAttempt((a) => a + 1);
          }}
          className="inline-flex items-center gap-1 rounded-full border border-[#E8DEC8] bg-white px-2.5 py-1 text-[11px] font-medium text-[#181206] transition-colors hover:bg-[#FAF3D6]"
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
