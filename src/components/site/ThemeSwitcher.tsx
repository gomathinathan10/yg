import { useEffect, useRef, useState } from "react";
import { Palette, Check, ChevronDown } from "lucide-react";
import { PALETTE_THEMES, useTheme, type PaletteThemeId } from "@/lib/theme";
import { toast } from "sonner";

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const current = PALETTE_THEMES.find((t) => t.id === theme) ?? PALETTE_THEMES[0]!;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (id: PaletteThemeId, name: string) => {
    setTheme(id);
    setIsOpen(false);
    toast.success(`Theme changed to ${name}`, { duration: 1500 });
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Current Theme: ${current.name}. Click to change theme.`}
        className="flex items-center gap-1 sm:gap-2 h-8 sm:h-9 px-1.5 sm:px-3 rounded-full border border-border bg-background hover:bg-secondary/80 text-foreground transition-all cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <span
          className="h-3 w-3 rounded-full ring-2 ring-background ring-offset-1 ring-offset-border/60 shadow-xs shrink-0"
          style={{ backgroundColor: current.dotColor }}
        />
        <Palette className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden xs:block" />
        <span className="text-xs font-semibold text-foreground whitespace-nowrap hidden sm:inline">
          {current.name}
        </span>
        <ChevronDown
          className={`h-3 w-3 text-muted-foreground transition-transform duration-200 hidden sm:block ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Panel (4 Curated Themes) */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 rounded-2xl border-2 border-border bg-white p-2 shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          {/* Header */}
          <div className="px-2.5 py-1.5 mb-1 flex items-center justify-between border-b border-border/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Select Color Theme
            </span>
            <span className="text-[9px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
              4 Themes
            </span>
          </div>

          {/* 4 Theme Options */}
          <div className="space-y-1">
            {PALETTE_THEMES.map((item) => {
              const active = item.id === theme;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id, item.name)}
                  role="menuitem"
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all text-left ${
                    active
                      ? "bg-primary/10 border border-primary/30 text-primary shadow-xs"
                      : "hover:bg-muted/70 text-foreground border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`h-4 w-4 rounded-full ring-2 ring-white shadow-xs shrink-0 transition-transform ${
                        active ? "scale-110 ring-primary" : ""
                      }`}
                      style={{ backgroundColor: item.dotColor }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold leading-tight text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{item.subtitle}</p>
                    </div>
                  </div>

                  {active ? (
                    <div className="h-5 w-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 ml-2 shadow-xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
