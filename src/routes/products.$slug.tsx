import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getProduct, products, type Bundle, type Review } from "@/lib/products";
import { ProductImageMedia } from "@/components/carasoule";

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
    <main className="min-h-screen bg-background text-foreground pb-20 sm:pb-0">

      {/* ── Top announcement bar ── */}
      <div className="bg-charcoal text-frost text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center tracking-wide">
          Beat the Heat: Delivery in 3–5 Days across Pakistan.
        </div>
      </div>

      {/* ── Sticky header ── */}
      <header className="border-b border-border/60 bg-background/90 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-shimmer-gold font-semibold">Shahkar</Link>
          <nav className="flex gap-6 text-sm font-medium text-foreground/80">
            <Link to="/" className="hover:text-gold">Home</Link>
            <Link to="/" hash="collection" className="hover:text-gold">Collection</Link>
          </nav>
        </div>
        <div className="gold-rule" />
      </header>

      {/* ── Breadcrumb — hidden on mobile ── */}
      <div className="hidden sm:block mx-auto max-w-7xl px-6 pt-8">
        <nav className="text-xs tracking-widest uppercase text-muted-foreground">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/" hash="collection" className="hover:text-gold">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{p.name}</span>
        </nav>
      </div>

      {/* ── Eid Banner ── */}
      {p.eidSpecial && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-3 sm:pt-4">
          <EidBanner />
        </div>
      )}

      {/* ── Mobile full-bleed image (outside constrained section) ── */}
      <div className="sm:hidden overflow-hidden" style={{ width: "100vw", position: "relative", left: "50%", transform: "translateX(-50%)", height: "100vw" }}>
        <ProductImageMedia product={p} />
      </div>

      {/* ── Main product section ── */}
      <section className="mx-auto max-w-7xl sm:px-6 sm:py-12 sm:grid sm:grid-cols-2 sm:gap-16">

        {/* Product image — desktop only */}
        <div className="hidden sm:relative sm:block">
          <div className="relative sm:aspect-square overflow-hidden sm:rounded-3xl">
            <ProductImageMedia product={p} />
          </div>
        </div>

        {/* Product details */}
        <div className="flex flex-col px-4 pt-5 sm:px-0 sm:pt-0">

          {/* Tagline */}
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-semibold">{p.tagline}</p>

          {/* Product name */}
          <h1 className="mt-2 font-display text-3xl sm:text-5xl lg:text-6xl text-charcoal leading-snug">{p.name}</h1>

          {/* Stars + rating */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <Stars n={Math.round((p.reviews?.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) ?? 0) / (p.reviews?.length || 1))} />
            <span className="font-semibold text-charcoal text-sm">
              {(p.reviews && p.reviews.length > 0
                ? (p.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / p.reviews.length).toFixed(1)
                : "4.8")}/5
            </span>
            <span className="text-muted-foreground text-xs">({p.reviews?.length ?? 0} reviews)</span>
          </div>

          {/* Stock urgency */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs bg-red-50 border border-red-100 rounded-full px-3 py-1.5 self-start">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            <span className="font-semibold uppercase tracking-widest text-destructive">
              Only {p.stockLeft} left!
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl sm:text-4xl text-charcoal">Rs. {p.price.toLocaleString()}</span>
            {p.oldPrice && (
              <span className="text-base text-muted-foreground line-through">Rs. {p.oldPrice.toLocaleString()}</span>
            )}
            {p.oldPrice && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep bg-ice px-2 py-1 rounded">
                Save Rs. {(p.oldPrice - p.price).toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.description}</p>

          {/* Features */}
          <ul className="mt-5 space-y-2.5">
            {p.features.map((f: string) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ice text-gold-deep flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>

          {/* Bundle selector */}
          {p.bundles && p.bundles.length > 0 && (
            <div className="mt-7 space-y-2.5">
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

          {/* Delivery info */}
          <DeliveryInfo />

          {/* Desktop CTA */}
          <div className="mt-8 hidden sm:flex flex-wrap gap-4">
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

          {/* Specs grid */}
          <div className="mt-8 grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
            {p.specs.map((s: { label: string; value: string }) => (
              <div key={s.label} className="bg-card p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
                <div className="mt-1 font-display text-lg text-charcoal">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Trust badges — desktop */}
          <div className="mt-6 hidden sm:flex flex-wrap gap-6 text-xs text-muted-foreground border-t border-border pt-6">
            <div>✓ 7-Day Warranty</div>
            <div>✓ COD Across Pakistan</div>
            <div>✓ 3–5 Day Delivery</div>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      {p.reviews && p.reviews.length > 0 && <Reviews reviews={p.reviews} />}

      {/* ── Mobile sticky bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-background border-t border-border/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            to="/checkout/$slug"
            params={{ slug: p.slug }}
            search={checkoutSearch as any}
            className="flex-1 rounded-full bg-gold text-charcoal font-semibold uppercase tracking-[0.16em] px-4 py-3.5 text-sm text-center shadow-gold"
          >
            {activeBundle ? `Order — Rs. ${activeBundle.price.toLocaleString()}` : "Buy Now"}
          </Link>
          <a
            href={`https://wa.me/923332468178?text=${encodeURIComponent(`Hi Shahkar.store, I want to order ${p.name}`)}`}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg flex-shrink-0"
            aria-label="Chat on WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.149-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.672-1.612-.92-2.212-.242-.579-.487-.5-.672-.51l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor" />
              <path d="M20.52 3.48A11.77 11.77 0 0 0 12.01 0C5.383 0 .04 5.346.04 11.974c0 2.108.55 4.167 1.596 5.992L0 24l6.292-1.655A11.9 11.9 0 0 0 12.01 24c6.628 0 12.01-5.383 12.01-12.026 0-3.214-1.256-6.226-3.5-8.494zM12.01 21.59c-1.682 0-3.325-.454-4.758-1.312l-.34-.203-3.738.984.995-3.64-.222-.366A8.905 8.905 0 0 1 2.03 11.97c0-4.93 4.016-8.946 8.98-8.946 2.4 0 4.655.938 6.35 2.644a8.914 8.914 0 0 1 2.63 6.302c0 4.93-4.016 8.946-8.98 8.946z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Related products ── */}
      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">You may also like</p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl text-charcoal mb-8">More from the collection</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/products/$slug"
                params={{ slug: r.slug }}
                className="group flex flex-col bg-card rounded-2xl border border-border/60 hover:border-gold/40 overflow-hidden shadow-ice transition-all hover:-translate-y-0.5"
              >
                <div className="aspect-square overflow-hidden bg-ice">
                  <img src={r.img} alt={r.name} loading="lazy" width={400} height={400}
                       className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3 flex flex-col">
                  <h3 className="font-display text-base sm:text-xl text-charcoal leading-tight">{r.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{r.tagline}</p>
                  <p className="mt-2 font-display text-base sm:text-lg text-gold-deep">Rs. {r.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-charcoal text-frost py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-xs text-frost/60">
          © 2026 Shahkar.store — Sukoon ab har jagah.
        </div>
      </footer>
    </main>
  );
}

/* ─── Unchanged sub-components below ─── */

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

function EidBanner() {
  const { days, hours, minutes, seconds } = useEidCountdown();
  const cell = (n: number, label: string) => (
    <div className="flex flex-col items-center bg-charcoal text-white rounded-xl px-3 sm:px-5 py-2 sm:py-3 min-w-[52px]">
      <span className="font-display text-xl sm:text-3xl tabular-nums leading-none">{String(n).padStart(2, "0")}</span>
      <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gold mt-1">{label}</span>
    </div>
  );
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#7c2d12] via-[#9a3412] to-[#c2410c] text-white px-4 sm:px-6 py-3.5 sm:py-4 shadow-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] bg-yellow-400 text-black inline-block px-2 py-0.5 rounded">
            Eid ul Adha Special
          </div>
          <div className="mt-1.5 font-display text-sm sm:text-xl font-bold leading-snug">
            🎁 BUY 1 GET 1 FREE — Limited Eid Stock!
          </div>
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          {cell(days, "Days")}
          {cell(hours, "Hrs")}
          {cell(minutes, "Min")}
          {cell(seconds, "Sec")}
        </div>
      </div>
    </div>
  );
}

function DeliveryInfo() {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-PK", { day: "numeric", month: "short" });
  const today = new Date();
  const min = new Date(today); min.setDate(today.getDate() + 7);
  const max = new Date(today); max.setDate(today.getDate() + 13);
  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-ice flex items-center justify-center text-gold-deep flex-shrink-0 text-lg">🚚</div>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Delivery Estimate</div>
          <div className="font-display text-charcoal text-base">
            {fmt(min)} – {fmt(max)}
            <span className="text-muted-foreground text-xs font-sans ml-1">(7-14 days)</span>
          </div>
          <div className="text-xs text-muted-foreground">Free · Cash on Delivery</div>
        </div>
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
    <section className="bg-ice/40 py-12 sm:py-20 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 sm:mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Customer Reviews</p>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl text-charcoal">
            <span className="text-gold">{avg}</span> / 5 from {reviews.length} verified buyers
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <Stars n={r.rating} />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{r.date}</span>
                </div>
                <p className="mt-3 text-sm text-foreground/90 leading-relaxed">{r.text}</p>
                {r.image && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-border/60 max-w-[100px] aspect-square bg-muted">
                    <img
                      src={r.image}
                      alt={`Review by ${r.name}`}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-200 cursor-zoom-in"
                    />
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gold/40 to-ice flex items-center justify-center text-charcoal font-bold text-sm flex-shrink-0">
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