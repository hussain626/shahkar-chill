import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProduct, products, type Bundle, type Review } from "@/lib/products";

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
  const [selectedBundle, setSelectedBundle] = useState<string | undefined>(
    p.bundles?.find((b: Bundle) => b.highlight)?.id ?? p.bundles?.[0]?.id
  );
  const activeBundle = p.bundles?.find((b: Bundle) => b.id === selectedBundle);
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

      {p.eidSpecial && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-4">
          <EidBanner />
          <EidCountdown />
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-12 grid lg:grid-cols-2 gap-8 lg:gap-16">
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

          {p.bundles && p.bundles.length > 0 && (
            <div className="mt-8 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold-deep font-bold">Choose your Eid Bundle</div>
              {p.bundles.map((b: Bundle) => {
                const isActive = selectedBundle === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBundle(b.id)}
                    className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                      isActive
                        ? "border-gold bg-gold/10 shadow-gold"
                        : "border-border hover:border-gold/50 bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display text-lg text-charcoal">{b.label}</span>
                          {b.highlight && (
                            <span className="text-[9px] font-bold uppercase tracking-widest bg-destructive text-white px-2 py-0.5 rounded-full">Best Value</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{b.sublabel}</div>
                      </div>
                      <div className="font-display text-xl text-charcoal whitespace-nowrap">Rs. {b.price.toLocaleString()}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <DeliveryInfo />

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/checkout/$slug"
              params={{ slug: p.slug }}
              search={checkoutSearch as any}
              className="group inline-flex items-center gap-3 gradient-gold text-charcoal font-semibold text-sm tracking-[0.18em] uppercase px-9 py-5 rounded-full shadow-gold hover:scale-[1.02] transition-transform w-full sm:w-auto justify-center"
            >
              {activeBundle ? `Order Now — Rs. ${activeBundle.price.toLocaleString()}` : "Order — Cash on Delivery"}
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

      {p.reviews && p.reviews.length > 0 && <Reviews reviews={p.reviews} />}

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

// ---------- Eid components ----------

function EidBanner() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#7c2d12] via-[#9a3412] to-[#c2410c] text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 shadow-lg">
      <div className="min-w-0">
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] bg-yellow-400 text-black inline-block px-2 py-0.5 rounded">
          Eid ul Adha Special
        </div>
        <div className="mt-1.5 font-display text-base sm:text-xl font-bold leading-tight">
          🎁 BUY 1 GET 1 FREE — Limited Eid Stock!
        </div>
      </div>
      <div className="hidden sm:block text-right text-xs uppercase tracking-widest font-bold whitespace-nowrap">
        Shop Now ➜
      </div>
    </div>
  );
}

const SALE_EPOCH = new Date("2026-05-15T00:00:00Z").getTime();
const SALE_CYCLE_MS = 3 * 24 * 60 * 60 * 1000;

function useEidCountdown() {
  const [ms, setMs] = useState(() => {
    const elapsed = (Date.now() - SALE_EPOCH) % SALE_CYCLE_MS;
    return SALE_CYCLE_MS - elapsed;
  });
  useEffect(() => {
    const id = setInterval(() => {
      const elapsed = (Date.now() - SALE_EPOCH) % SALE_CYCLE_MS;
      setMs(SALE_CYCLE_MS - elapsed);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
}

function EidCountdown() {
  const { days, hours, minutes, seconds } = useEidCountdown();
  const cell = (n: number, label: string) => (
    <div className="flex flex-col items-center bg-charcoal text-white rounded-xl px-3 sm:px-5 py-2 sm:py-3 min-w-[58px]">
      <span className="font-display text-2xl sm:text-3xl tabular-nums leading-none">{String(n).padStart(2, "0")}</span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold mt-1">{label}</span>
    </div>
  );
  return (
    <div className="mt-3 rounded-2xl bg-ice/60 border border-gold/30 p-4 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-destructive font-bold">⏰ Sale Ends In</div>
        <div className="text-xs text-muted-foreground mt-0.5">After timer, offer auto-resets — order now!</div>
      </div>
      <div className="flex gap-1.5 sm:gap-2">
        {cell(days, "Days")}
        {cell(hours, "Hrs")}
        {cell(minutes, "Min")}
        {cell(seconds, "Sec")}
      </div>
    </div>
  );
}

function DeliveryInfo() {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-PK", { day: "numeric", month: "short" });
  const today = new Date();
  const min = new Date(today); min.setDate(today.getDate() + 3);
  const max = new Date(today); max.setDate(today.getDate() + 5);
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-3">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-ice flex items-center justify-center text-gold-deep flex-shrink-0">🚚</div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Delivery Estimate</div>
          <div className="font-display text-charcoal text-base sm:text-lg">
            {fmt(min)} – {fmt(max)} <span className="text-muted-foreground text-sm font-sans">(3–5 days)</span>
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">Flat Rs. 190 delivery · Cash on Delivery</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border text-[10px] sm:text-xs text-center text-muted-foreground">
        <div>✓ 7-Day Warranty</div>
        <div>✓ COD Pakistan-wide</div>
        <div>✓ Markaz Verified</div>
      </div>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "" : "opacity-25"}>★</span>
      ))}
    </div>
  );
}

function Reviews({ reviews }: { reviews: Review[] }) {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <section className="bg-ice/40 py-14 sm:py-20 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-6 sm:mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Customer Reviews</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl text-charcoal">
              <span className="text-gold">{avg}</span> / 5 from {reviews.length} verified buyers
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <Stars n={r.rating} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.date}</span>
              </div>
              <p className="mt-3 text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gold/40 to-ice flex items-center justify-center text-charcoal font-bold text-sm">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-charcoal">{r.name}</div>
                  <div className="text-[11px] text-muted-foreground">✓ Verified · {r.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
