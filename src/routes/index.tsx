import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-mini-ac.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shahkar.store — Garmi ka Shahkar Hal | Premium Mini ACs Pakistan" },
      {
        name: "description",
        content:
          "Premium USB-powered Mini ACs delivered across Pakistan. Low electricity, high performance. Cash on Delivery via Markaz Partner Shipping.",
      },
      { property: "og:title", content: "Shahkar.store — Premium Cooling Solutions" },
      { property: "og:description", content: "Sukoon ab har jagah. USB Mini ACs, perfect for load-shedding & solar." },
    ],
  }),
});

function NoticeBar() {
  return (
    <div className="bg-charcoal text-frost text-xs sm:text-sm tracking-wide">
      <div className="mx-auto max-w-7xl px-4 py-2.5 text-center">
        <span className="opacity-90">Beat the Heat: </span>
        <span className="font-medium">Delivery in 3–5 Days across Pakistan via Markaz Partner Shipping.</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <NoticeBar />
      <div className="mx-auto max-w-7xl px-6 py-5 grid grid-cols-3 items-center">
        <nav className="hidden md:flex gap-7 text-sm font-medium text-foreground/80">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <a href="#collection" className="hover:text-gold transition-colors">Our Collection</a>
        </nav>

        <div className="text-center col-start-2">
          <a href="/" className="inline-block">
            <span className="block font-display text-3xl sm:text-4xl text-shimmer-gold font-semibold leading-none">
              Shahkar
            </span>
            <span className="block mt-1 text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
              .store
            </span>
          </a>
        </div>

        <nav className="hidden md:flex gap-7 text-sm font-medium text-foreground/80 justify-end">
          <a href="#track" className="hover:text-gold transition-colors">Track Order</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact Us</a>
        </nav>
      </div>
      <div className="gold-rule" />
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden gradient-radial-ice">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-ice blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 backdrop-blur px-4 py-1.5 text-xs tracking-widest uppercase text-gold-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            Summer Collection 2026
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-charcoal">
            Garmi ka{" "}
            <span className="italic text-shimmer-gold">Shahkar</span>
            <br />
            <span className="italic font-light text-foreground/80">hal.</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Experience instant cooling with our USB-powered Mini ACs. Low electricity,
            high performance — engineered for Pakistani summers.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">
            <a
              href="#collection"
              className="group relative inline-flex items-center gap-3 gradient-gold text-charcoal font-semibold text-sm tracking-[0.18em] uppercase px-9 py-5 rounded-full shadow-gold hover:scale-[1.02] transition-transform"
            >
              Shop the Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[0,1,2].map(i => (
                  <div key={i} className="h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br from-ice to-gold/30" />
                ))}
              </div>
              <span><span className="text-foreground font-semibold">2,400+</span> happy customers</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "3-5", v: "Days Delivery" },
              { k: "COD", v: "Cash on Delivery" },
              { k: "7", v: "Day Warranty" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-gold-deep">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-ice/50 blur-3xl rounded-full animate-mist" />
          <div className="relative animate-float">
            <img
              src={heroImg}
              alt="Shahkar Mini AC with cool mist and ice crystals"
              width={1536}
              height={1536}
              className="relative z-10 w-full max-w-xl mx-auto drop-shadow-2xl"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-3/4 bg-charcoal/20 blur-2xl rounded-full" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Bill Saver",
      desc: "Runs on less power than a lightbulb. Cool air without the cooling bill.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
      ),
    },
    {
      title: "UPS / Solar Ready",
      desc: "Perfect companion for load-shedding hours. Plugs into any USB power.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
    },
    {
      title: "Truly Portable",
      desc: "From your office desk to your bedside. Cooling that follows you everywhere.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7"><rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Why Shahkar</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-charcoal">
            Sukoon ab <span className="italic text-gold">har jagah</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three reasons our customers across Karachi, Lahore & Islamabad keep coming back.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-card rounded-3xl p-8 border border-border/60 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 shadow-ice"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ice text-gold-deep group-hover:bg-gold group-hover:text-charcoal transition-colors">
                {f.icon}
              </div>
              <h3 className="mt-6 font-display text-2xl text-charcoal">{f.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Product = {
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  img: string;
  badge?: string;
};

const products: Product[] = [
  { name: "Shahkar Cube Mini", tagline: "Compact desktop cooling", price: 3499, oldPrice: 4999, img: product1, badge: "Top Seller" },
  { name: "Shahkar Onyx Pro",  tagline: "Bedside power cooler",  price: 5299, oldPrice: 6999, img: product2, badge: "New" },
  { name: "Shahkar Tower One", tagline: "Room-scale freshness",  price: 7899, oldPrice: 9499, img: product3, badge: "Top Seller" },
];

function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group relative bg-card rounded-3xl overflow-hidden border border-border/60 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1.5 shadow-ice">
      {p.badge && (
        <div className="absolute top-5 left-5 z-10 gradient-gold text-charcoal text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shadow-gold">
          {p.badge}
        </div>
      )}
      <div className="relative aspect-square bg-ice/40 overflow-hidden">
        <img src={p.img} alt={p.name} loading="lazy" width={1024} height={1024}
             className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl text-charcoal">{p.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{p.tagline}</p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Cash on Delivery</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-charcoal">Rs. {p.price.toLocaleString()}</span>
              {p.oldPrice && <span className="text-sm text-muted-foreground line-through">Rs. {p.oldPrice.toLocaleString()}</span>}
            </div>
          </div>
          <button className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-charcoal text-frost hover:bg-gold hover:text-charcoal transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function Collection() {
  return (
    <section id="collection" className="relative py-24 gradient-ice">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">The Collection</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal max-w-xl">
              Engineered for the <em className="text-gold not-italic">Pakistani</em> summer.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Each piece is hand-tested, packaged with care, and delivered to your doorstep —
            no advance payment required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function Promise() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="gold-rule w-24 mx-auto mb-8" />
        <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">The Shahkar Promise</p>
        <blockquote className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight italic">
          "We don't sell plastic gadgets. We sell <span className="text-gold">cool sukoon</span> —
          delivered to every corner of Pakistan, with the trust of cash on delivery."
        </blockquote>
        <p className="mt-8 text-sm tracking-widest uppercase text-muted-foreground">— The Shahkar Team</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-frost">
      <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-display text-3xl text-shimmer-gold font-semibold">Shahkar</span>
          <p className="mt-4 text-frost/70 max-w-sm leading-relaxed">
            Premium cooling solutions for modern Pakistani homes. Engineered with care,
            delivered with trust.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-frost/70">
            <li><a href="#collection" className="hover:text-gold">Collection</a></li>
            <li><a href="#track" className="hover:text-gold">Track Order</a></li>
            <li><a href="#" className="hover:text-gold">Returns</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-frost/70">
            <li>WhatsApp: 0300-0000000</li>
            <li>care@shahkar.store</li>
            <li>Markaz Partner Shipping</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-frost/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-frost/50">
          <p>© 2026 Shahkar.store — All rights reserved.</p>
          <p className="italic font-display text-base text-frost/70">Sukoon ab har jagah.</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <Collection />
      <Promise />
      <Footer />
    </main>
  );
}
