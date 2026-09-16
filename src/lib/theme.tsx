import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type PaletteThemeId = "saffron" | "emerald" | "indigo" | "plum";

export type PaletteThemeInfo = {
  id: PaletteThemeId;
  name: string;
  subtitle: string;
  dotColor: string;
  bgPreview: string;
  background: string;
  primary: string;
  ring: string;
};

export const PALETTE_THEMES: PaletteThemeInfo[] = [
  {
    id: "saffron",
    name: "Neon Gold",
    subtitle: "Radiant Neon Gold & Clean White Background",
    dotColor: "#FFC700",
    bgPreview: "#ffffff",
    background: "#ffffff",
    primary: "#FFC700",
    ring: "#FFC700",
  },
  {
    id: "emerald",
    name: "Champagne Amber",
    subtitle: "Glowing Amber & Clean White Background",
    dotColor: "#FFAE00",
    bgPreview: "#ffffff",
    background: "#ffffff",
    primary: "#FFAE00",
    ring: "#FFAE00",
  },
  {
    id: "indigo",
    name: "Vintage Brass",
    subtitle: "Tirunelveli Temple Brass & Clean White",
    dotColor: "#D4AF37",
    bgPreview: "#ffffff",
    background: "#ffffff",
    primary: "#D4AF37",
    ring: "#D4AF37",
  },
  {
    id: "plum",
    name: "Mysore Plum",
    subtitle: "Royal Velvet Amethyst Purple",
    dotColor: "#9333EA",
    bgPreview: "#F8EEFB",
    background: "oklch(0.960 0.030 315)",
    primary: "oklch(0.44 0.19 315)",
    ring: "oklch(0.44 0.19 315)",
  },
];

function applyThemeToDOM(themeId: PaletteThemeId) {
  if (typeof document === "undefined") return;
  const item = PALETTE_THEMES.find((t) => t.id === themeId) ?? PALETTE_THEMES[0]!;
  document.documentElement.setAttribute("data-theme", themeId);
  document.documentElement.style.setProperty("--primary", item.primary);
  document.documentElement.style.setProperty("--color-primary", item.primary);
  document.documentElement.style.setProperty("--primary-foreground", "#181206");
  document.documentElement.style.setProperty("--color-primary-foreground", "#181206");
  document.documentElement.style.setProperty("--ring", item.ring);
  document.documentElement.style.setProperty("--color-ring", item.ring);
  document.documentElement.style.setProperty("--background", item.background);
  document.documentElement.style.setProperty("--color-background", item.background);
  document.documentElement.style.backgroundColor = item.bgPreview;
  if (document.body) {
    document.body.setAttribute("data-theme", themeId);
    document.body.style.setProperty("--primary", item.primary);
    document.body.style.setProperty("--color-primary", item.primary);
    document.body.style.setProperty("--primary-foreground", "#181206");
    document.body.style.setProperty("--color-primary-foreground", "#181206");
    document.body.style.setProperty("--background", item.background);
    document.body.style.setProperty("--color-background", item.background);
    document.body.style.backgroundColor = item.bgPreview;
  }
}

type ThemeContextValue = {
  theme: PaletteThemeId;
  setTheme: (t: PaletteThemeId) => void;
  cycleTheme: () => void;
  ready: boolean;
};

const THEME_STORAGE_KEY = "yg-palette-theme-v1";
const VALID_THEMES = new Set<string>(PALETTE_THEMES.map((t) => t.id));
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<PaletteThemeId>("saffron");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let initial: PaletteThemeId = "saffron";
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as PaletteThemeId | null;
      if (stored && VALID_THEMES.has(stored)) {
        initial = stored;
      }
    } catch {
      /* ignore */
    }
    setThemeState(initial);
    applyThemeToDOM(initial);
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
    setReady(true);
  }, []);

  const setTheme = useCallback((next: PaletteThemeId) => {
    setThemeState(next);
    applyThemeToDOM(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const cycleTheme = useCallback(() => {
    const list: PaletteThemeId[] = PALETTE_THEMES.map((t) => t.id);
    const idx = list.indexOf(theme);
    const next = list[(idx + 1) % list.length] ?? "saffron";
    setTheme(next);
  }, [theme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, cycleTheme, ready }),
    [theme, setTheme, cycleTheme, ready],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
