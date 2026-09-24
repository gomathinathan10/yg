import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

import "../styles.css";
import appCss from "../styles.css?url";
import { CartProvider } from "@/lib/cart";
import { OrdersProvider } from "@/lib/orders";
import { WishlistProvider } from "@/lib/wishlist";
import { ThemeProvider } from "@/lib/theme";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { MobileCartBar } from "@/components/site/MobileCartBar";
import { Toaster } from "@/components/ui/sonner";
import { ClickEffects } from "@/components/site/ClickEffects";
const FaqBot = lazy(() =>
  import("@/components/site/FaqBot").then((m) => ({ default: m.FaqBot })),
);
const BackToTop = lazy(() =>
  import("@/components/site/BackToTop").then((m) => ({ default: m.BackToTop })),
);

/** Mounts children only once the browser is idle, after the page is interactive. */
function DeferUntilIdle({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const run = () => setReady(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(run);
      return () => (window as any).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(run, 1200);
    return () => window.clearTimeout(t);
  }, []);
  return ready ? <Suspense fallback={null}>{children}</Suspense> : null;
}

function NotFoundComponent() {
  const links = [
    { to: "/shop", label: "Shop all products" },
    { to: "/story", label: "Our story since 1932" },
    { to: "/contact", label: "Contact support" },
    { to: "/account", label: "Your orders" },
  ] as const;

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="eyebrow">Est. 1932 · Tirunelveli</p>
      <h1 className="font-display mt-3 text-7xl leading-none font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">This shelf is empty</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you're looking for doesn't exist, or it moved while we were grinding a fresh
        batch. Try one of these instead.
      </p>
      <div className="mt-8 grid w-full max-w-lg gap-3 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="surface-card px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to home
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end — your basket and orders are safe. Try again, or reach
          us at care@ygasafoetida.in if it keeps happening.
        </p>
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-mono text-left max-h-48 overflow-auto border border-destructive/20">
            <strong>Error Details:</strong> {error.message || String(error)}
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "JCXySiTdM9cLVtF34BfI08thOQrkAoFOo5HOBWHlnR4" },
      { title: "Y.G Asafoetida — Authentic Heritage Hing & Traditional Products Since 1932" },
      {
        name: "description",
        content:
          "Compounded artisanal asafoetida powder, pure gold hing cake, gluten-free hing, wood-roasted traditional health mix (sathu maavu), and pure temple benzoin sambrani from Tirunelveli since 1932.",
      },
      {
        name: "keywords",
        content:
          "Y.G Asafoetida, YG Hing, buy hing online, asafoetida powder, pure bandhani hing, hing cake, gluten free hing, traditional health mix, sathu maavu, pure benzoin sambrani, loban, Tirunelveli hing, authentic Indian spices",
      },
      { name: "author", content: "Y.G Asafoetida" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#FF9933" },
      // Open Graph
      { property: "og:site_name", content: "Y.G Asafoetida" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: "Y.G Asafoetida — Authentic Heritage Hing & Traditional Products Since 1932" },
      {
        property: "og:description",
        content:
          "Compounded artisanal asafoetida powder, pure gold hing cake, gluten-free hing, traditional health mix (sathu maavu), and pure temple benzoin sambrani from Tirunelveli since 1932.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
      { property: "og:image:alt", content: "Y.G Asafoetida Logo" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Y.G Asafoetida — Authentic Heritage Hing & Traditional Products Since 1932" },
      {
        name: "twitter:description",
        content:
          "Compounded artisanal asafoetida powder, pure gold hing cake, gluten-free hing, traditional health mix, and sambrani from Tirunelveli since 1932.",
      },
      { name: "twitter:image", content: "https://ygasafoetida.in/logo.png" },
      // Regional & Local SEO
      { name: "geo.region", content: "IN-TN" },
      { name: "geo.placename", content: "Tirunelveli, Tamil Nadu, India" },
      { name: "geo.position", content: "8.7139;77.7567" },
      { name: "ICBM", content: "8.7139, 77.7567" },
    ],
    links: [
      { rel: "canonical", href: "https://ygasafoetida.in" },
      { rel: "preload", href: appCss, as: "style" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap",
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GroceryStore",
          "name": "Y.G Asafoetida",
          "description": "Authentic Heritage Asafoetida, Traditional Health Mix & Pure Sambrani handcrafted in Tirunelveli since 1932.",
          "url": "https://ygasafoetida.in",
          "logo": "https://ygasafoetida.in/logo.png",
          "foundingDate": "1932",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Tirunelveli",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 8.7139,
            "longitude": 77.7567
          }
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="saffron" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MDV4N2TK');`,
          }}
        />
        {/* End Google Tag Manager */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html { background-color: #ffffff; color: #181206; font-family: "Barlow", sans-serif; overflow-x: hidden; }
              body { margin: 0; background-color: #ffffff; color: #181206; font-family: "Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
              header.sticky { background-color: #ffffff; }
              img { content-visibility: auto; }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('yg-palette-theme-v1')||'saffron';document.documentElement.setAttribute('data-theme',t);var c={saffron:'#FF9933',emerald:'#FFAE00',indigo:'#D4AF37',plum:'#7289da'};if(c[t]){document.documentElement.style.setProperty('--primary',c[t]);document.documentElement.style.setProperty('--color-primary',c[t]);document.documentElement.style.setProperty('--primary-foreground','#181206');document.documentElement.style.setProperty('--background','#ffffff');document.documentElement.style.setProperty('--color-background','#ffffff');}}catch(e){}`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDV4N2TK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const routerState = useRouter();
  const pathname = routerState.state.location.pathname;
  const isAdmin = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <WishlistProvider>
      <OrdersProvider>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-white text-foreground transition-colors duration-300">
          <a
            href="#main"
            className="sr-only rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
          >
            Skip to main content
          </a>
          {!isAdmin && <Header />}
          <main id="main" className="flex-1 bg-white">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          {!isAdmin && <Footer />}
        </div>
        {!isAdmin && <CartDrawer />}
        {!isAdmin && <MobileCartBar />}
        {!isAdmin && <ClickEffects />}
        {!isAdmin && (
          <DeferUntilIdle>
            <FaqBot />
            <BackToTop />
          </DeferUntilIdle>
        )}
        <Toaster position="top-center" />
      </CartProvider>
      </OrdersProvider>
      </WishlistProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
