import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProduct, products, type Bundle } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  component: ProductPage,
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Shahkar.store` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — Shahkar.store` },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.img },
        ]
      : [{ title: "Product — Shahkar.store" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-5xl text-charcoal">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold underline">Back to home</Link>
      </div>
    </div>
  ),
});

function ProductPage() {
  const p = Route.useLoaderData();
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 2);
  const [selectedBundle, setSelectedBundle] = useState(
    p.bundles?.find((b) => b.highlight)?.id ?? p.bundles?.[0]?.id
  );
  const activeBundle = p.bundles?.find((b) => b.id === selectedBundle);
  const checkoutSearch = activeBundle ? { bundle: activeBundle.id } : undefined;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-charcoal text-frost text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2.5 text-center">
          Beat the Heat: Delivery in 3–5 Days across Pakistan via Markaz Partner Shipping.
        </div>
      </div>

      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-shimmer-gold font-semibold">Shahkar</Link>
          <nav className="flex gap-6 text-sm font-medium text-foreground/80">
            <Link to="/" className="hover:text-gold">Home</Link>
            <Link to="/" hash="collection" className="hover:text-gold">Collection</Link>
          </nav>
        </div>
        <div className="gold-rule" />
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <nav className="text-xs tracking-widest uppercase text-muted-foreground">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/" hash="collection" className="hover:text-gold">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{p.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-square rounded-3xl overflow-hidden gradient-ice shadow-ice">
            {p.badge && (
              <div className="absolute top-6 left-6 z-10 gradient-gold text-charcoal text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shadow-gold">
                {p.badge}
              </div>
            )}
            <img src={p.img} alt={p.name} width={1024} height={1024}
                 className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">{p.tagline}</p>
          <h1 className="mt-4 font-display text-5xl lg:text-6xl text-charcoal leading-tight">{p.name}</h1>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="inline-flex h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <span className="font-semibold uppercase tracking-widest text-destructive text-xs">
              Hurry — Only {p.stockLeft} pieces left!
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl text-charcoal">Rs. {p.price.toLocaleString()}</span>
            {p.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">Rs. {p.oldPrice.toLocaleString()}</span>
            )}
            {p.oldPrice && (
              <span className="text-xs font-bold uppercase tracking-widest text-gold-deep bg-ice px-2 py-1 rounded">
                Save Rs. {(p.oldPrice - p.price).toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{p.description}</p>

          <ul className="mt-8 space-y-3">
            {p.features.map((f: string) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ice text-gold-deep">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/checkout/$slug"
              params={{ slug: p.slug }}
              className="group inline-flex items-center gap-3 gradient-gold text-charcoal font-semibold text-sm tracking-[0.18em] uppercase px-9 py-5 rounded-full shadow-gold hover:scale-[1.02] transition-transform"
            >
              Order — Cash on Delivery
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {p.specs.map((s: { label: string; value: string }) => (
              <div key={s.label} className="bg-card p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                <div className="mt-1 font-display text-lg text-charcoal">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-xs text-muted-foreground border-t border-border pt-6">
            <div>✓ 7-Day Warranty</div>
            <div>✓ COD Across Pakistan</div>
            <div>✓ 3–5 Day Delivery</div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">You may also like</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal mb-10">More from the collection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/products/$slug"
                params={{ slug: r.slug }}
                className="group flex gap-6 bg-card rounded-2xl border border-border/60 hover:border-gold/40 p-5 shadow-ice transition-all hover:-translate-y-0.5"
              >
                <div className="h-28 w-28 rounded-xl overflow-hidden bg-ice flex-shrink-0">
                  <img src={r.img} alt={r.name} loading="lazy" width={1024} height={1024}
                       className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-display text-xl text-charcoal">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.tagline}</p>
                  <p className="mt-2 font-display text-lg text-gold-deep">Rs. {r.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-charcoal text-frost py-10">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-frost/60">
          © 2026 Shahkar.store — Sukoon ab har jagah.
        </div>
      </footer>
    </main>
  );
}
