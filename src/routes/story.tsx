import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  History,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/site/SmartImage";
import {
  heritageImage as heritageImg,
  storyShopImage as chapter1,
  storyKitchenImage as chapter2,
  storyTodayImage as chapter3,
} from "@/assets/images";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Heritage Since 1932 — Three Generations of Tirunelveli Hing | Y.G Asafoetida" },
      {
        name: "description",
        content:
          "The 92-year journey of Y.G Asafoetida from a small shop on South Car Street in Tirunelveli to India's most trusted heritage hing house. Learn our artisanal stone-milling compounding craft.",
      },
      {
        name: "keywords",
        content:
          "Y.G Asafoetida history, Tirunelveli hing history, heritage asafoetida, traditional hing compounding, South Indian spices history, 1932 spices brand",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://ygasafoetida.in/story" },
      { property: "og:title", content: "Our Heritage Since 1932 — Y.G Asafoetida" },
      {
        property: "og:description",
        content:
          "Ninety-two years of stone-compounding pure hing in Tirunelveli, preserved across three generations.",
      },
      { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our 1932 Heritage — Y.G Asafoetida" },
      {
        name: "twitter:description",
        content:
          "The 92-year journey of Y.G Asafoetida compounding in Tirunelveli, Tamil Nadu.",
      },
      { name: "twitter:image", content: "https://ygasafoetida.in/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://ygasafoetida.in/story" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "The Y.G Asafoetida Heritage Story",
          "description": "The 92-year history and artisanal compounding craft of Y.G Asafoetida in Tirunelveli since 1932.",
          "url": "https://ygasafoetida.in/story",
          "publisher": {
            "@type": "Organization",
            "name": "Y.G Asafoetida",
            "logo": "https://ygasafoetida.in/logo.png"
          }
        }),
      },
    ],
  }),
  component: StoryPage,
});

type StoryChapter = {
  no: string;
  year: string;
  badge: string;
  title: string;
  image: string;
  alt: string;
  lead: string;
  paragraphs: string[];
  highlight: string;
};

const chapters: StoryChapter[] = [
  {
    no: "Chapter I",
    year: "1932",
    badge: "The Genesis",
    title: "The Little Shop on South Car Street",
    image: chapter1,
    alt: "A 1930s Tirunelveli spice shop with brass scales and sacks of raw asafoetida resin",
    lead:
      "Near the sacred Thamirabarani river, young Shri P. Subramanian opened a modest stone-floored shop with two polished brass scales and an unyielding commitment to purity.",
    paragraphs: [
      "In the 1930s, finding raw asafoetida resin unadulterated by cheap gypsum was rare. Shri Subramanian forged direct links with overland merchants importing raw ferula gum tears.",
      "Every morning before dawn, he hand-pounded the resin in stone mortars, balancing it with edible starches so even a tiny pinhead pinch would dissolve cleanly without burning during tempering.",
      "Word traveled swiftly. Temple cooks and neighbourhood families swore by the fragrant parcels from Subramanian's shop.",
    ],
    highlight:
      "The very first formula created on those brass scales in 1932 remains the unbroken foundation of every jar we seal today.",
  },
  {
    no: "Chapter II",
    year: "1965",
    badge: "Culinary Formula",
    title: "Tuning the Recipe to Sing in South Indian Kitchens",
    image: chapter2,
    alt: "A traditional 1960s Tamil kitchen with a mother tempering sambar with pure hing",
    lead:
      "Subramanian's son realized that South Indian cooking demanded immediate, blooming heat without scorching.",
    paragraphs: [
      "South Indian kitchens thrive on blistering tadkas — crackling mustard and fiery tamarind vathal gravies. High-heat cooking destroyed ordinary hing.",
      "By controlling stone-milling speeds, volatile aromatic terpenes were protected against heat degradation, creating our signature aroma bloom.",
    ],
    highlight:
      "Stone-milled at low temperatures so essential natural aromas remain intact until they touch your hot pan.",
  },
  {
    no: "Chapter III",
    year: "Today",
    badge: "Modern Legacy",
    title: "Third Generation, Same Uncompromising Integrity",
    image: chapter3,
    alt: "The third generation in Tirunelveli packing fresh jars with modern quality controls",
    lead:
      "Ninety-two years later, Shri Subramanian's grandchildren still oversee the works in Tirunelveli with modern FSSAI laboratory standards.",
    paragraphs: [
      "While tamper-evident seals and climate-controlled packing rooms have modernized the facility, every batch of resin is still organoleptically inspected by family elders before compounding.",
      "Over 48,000 jars dispatch annually to kitchens across India and worldwide, including dedicated gluten-free lines and traditional roasted podis.",
    ],
    highlight:
      "Over 48,000 jars delivered annually to passionate cooks who refuse to compromise on culinary truth.",
  },
];

const craftSteps = [
  {
    step: "01",
    title: "Mountain Resin Sourcing",
    body: "Grade-A tears of raw Ferula gum oleoresin harvested from alpine mountain roots.",
  },
  {
    step: "02",
    title: "Cold Stone Compounding",
    body: "Resin is blended on heavy granite rollers at low RPMs to avoid heat build-up.",
  },
  {
    step: "03",
    title: "Texture Calibration",
    body: "Milled into fine powders, coarse granules, pellets, or compressed into solid pindi cakes.",
  },
  {
    step: "04",
    title: "Aroma-Lock Sealing",
    body: "Sealed immediately in airtight glass jars to lock in fresh fragrance.",
  },
];

function StoryPage() {
  return (
    <div className="space-y-0">
      {/* ======================================================== */}
      {/* 1. COMPACT HERO COVER */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden gradient-warm border-b border-border py-8 sm:py-12">
        <div className="container-page">
          <div className="storybook-page overflow-hidden rounded-2xl border border-border shadow-md bg-card">
            <div className="grid items-center gap-0 lg:grid-cols-12">
              <div className="p-6 sm:p-8 lg:p-10 lg:col-span-7 space-y-3.5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-[11px] font-semibold text-primary uppercase">
                  <History className="h-3 w-3" />
                  <span>The 92-Year Chronicle</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-foreground">
                  Ninety-Two Years of Aroma, One Family Legacy
                </h1>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  How a small shop on South Car Street in 1932 Tirunelveli became South India’s most
                  revered stone-compounded hing house.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 border-t border-border/60 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-primary" />
                    <span>Est. 1932</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span>3 Generations</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    <span>100% Pure Resin</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative h-full min-h-[220px] bg-muted">
                <SmartImage
                  src={heritageImg}
                  alt="A 1930s South Indian spice shop"
                  width={1400}
                  height={1000}
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  fallbackLabel="Est. 1932"
                  wrapperClassName="h-full w-full absolute inset-0"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. STATS BANNER */}
      {/* ======================================================== */}
      <section className="border-b border-border bg-card">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-4 py-5 text-center">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">1932</p>
            <p className="text-[10px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">
              Founding Year
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">92+</p>
            <p className="text-[10px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">
              Years of Craft
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">9</p>
            <p className="text-[10px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">
              Formulations
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-primary">48,000+</p>
            <p className="text-[10px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">
              Kitchens Served
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. COMPACT CHAPTERS */}
      {/* ======================================================== */}
      <section className="container-page py-10 sm:py-14 space-y-8">
        {chapters.map((c, i) => (
          <article
            key={c.no}
            className="storybook-page overflow-hidden rounded-2xl border border-border shadow-sm bg-card"
          >
            <div
              className={`grid gap-0 lg:grid-cols-12 items-stretch ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-last" : ""
              }`}
            >
              {/* Text Side */}
              <div className="p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                        {c.no}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-muted font-mono rounded text-muted-foreground">
                        {c.year}
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {c.badge}
                    </span>
                  </div>

                  <h2 className="mt-2 text-xl sm:text-2xl font-bold leading-snug text-foreground">
                    {c.title}
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm font-medium text-foreground/90 leading-relaxed border-l-2 border-primary pl-3">
                    {c.lead}
                  </p>

                  <div className="mt-3 space-y-2 text-xs text-muted-foreground leading-relaxed">
                    {c.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                {/* Highlight box */}
                <div className="rounded-xl bg-primary/5 border border-primary/15 p-3 flex items-start gap-2 text-xs text-foreground/90">
                  <Sparkles className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <p className="italic text-[11px]">{c.highlight}</p>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:col-span-5 relative min-h-[200px] lg:min-h-full bg-muted">
                <img
                  src={c.image}
                  alt={c.alt}
                  className="h-full w-full object-cover absolute inset-0"
                />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ======================================================== */}
      {/* 4. COMPACT 4-STEP METHOD */}
      {/* ======================================================== */}
      <section className="border-y border-border bg-secondary/30 py-10 sm:py-14">
        <div className="container-page space-y-6">
          <div className="max-w-xl mx-auto text-center space-y-1.5">
            <p className="eyebrow">The Method</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              The 4 Pillars of Stone-Compounding
            </h2>
            <p className="text-xs text-muted-foreground">
              Why Y.G asafoetida preserves its natural aroma and potency.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {craftSteps.map((s) => (
              <div
                key={s.step}
                className="surface-card p-4 rounded-xl border border-border shadow-xs space-y-2 relative overflow-hidden"
              >
                <span className="text-3xl font-black text-primary/10 font-mono absolute top-3 right-3">
                  {s.step}
                </span>
                <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {s.step}
                </div>
                <h3 className="text-sm font-bold text-foreground leading-snug">{s.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. HERITAGE CTA */}
      {/* ======================================================== */}
      <section className="container-page py-10 sm:py-14">
        <div className="gradient-gold rounded-2xl p-6 sm:p-10 text-center text-primary-foreground shadow-md">
          <div className="max-w-lg mx-auto space-y-2.5">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-90">
              Your Kitchen is the Next Chapter
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Taste the True Tirunelveli Tradition
            </h2>
            <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
              Explore our complete range of 9 stone-compounded powders, crunchy pellets, pure cakes, and
              gift boxes.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
              <Button size="sm" variant="secondary" className="font-bold text-slate-950 px-5 shadow-xs" asChild>
                <Link to="/shop">
                  Shop the Full Range <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent border-white/40 text-white hover:bg-white/10 text-xs"
                asChild
              >
                <Link to="/contact">Ask Our Specialists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
