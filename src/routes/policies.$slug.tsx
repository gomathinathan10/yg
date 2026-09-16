import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { policies } from "@/data/policies";

export const Route = createFileRoute("/policies/$slug")({
  loader: ({ params }) => {
    const policy = policies.find((p) => p.slug === params.slug);
    if (!policy) throw notFound();
    return policy;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Y.G Asafoetida Store Policies` },
          { name: "description", content: `${loaderData.summary.slice(0, 150)}... Read our official store policies.` },
          { property: "og:title", content: `${loaderData.title} — Y.G Asafoetida` },
          { property: "og:description", content: loaderData.summary.slice(0, 155) },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `https://ygasafoetida.in/policies/${loaderData.slug}` },
          { property: "og:image", content: "https://ygasafoetida.in/logo.png" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `https://ygasafoetida.in/policies/${loaderData.slug}` }]
      : [],
  }),
  component: PolicyPage,
});

function PolicyPage() {
  const policy = Route.useLoaderData();

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
        <nav aria-label="Policies" className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Policies</p>
          <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {policies.map((p) => (
              <li key={p.slug} className="shrink-0">
                <Link
                  to="/policies/$slug"
                  params={{ slug: p.slug }}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "bg-secondary text-foreground" }}
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-2xl">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {policy.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{policy.summary}</p>
          <p className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
            Last updated {policy.updated}
          </p>

          <div className="mt-10 space-y-9">
            {policy.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
                {s.body.map((b) => (
                  <p key={b} className="mt-3 leading-relaxed text-muted-foreground">
                    {b}
                  </p>
                ))}
                {s.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-12 flex gap-3 rounded-xl border border-border bg-secondary/50 p-5">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
            <p className="text-sm text-muted-foreground">
              Something here unclear? Write to{" "}
              <a className="font-medium text-foreground underline" href="mailto:Sales@yghing.com">
                Sales@yghing.com
              </a>{" "}
              or use the{" "}
              <Link to="/contact" className="font-medium text-foreground underline">
                contact form
              </Link>
              . A person in Tirunelveli answers, usually the same day.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
