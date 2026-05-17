import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { products, type Product } from "@/lib/products";
import { Snowflake, Laptop, Sparkles, ShieldCheck, Truck, Lightbulb, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shahkar — Har Maslay Ka Hal" },
      {
        name: "description",
        content:
          "Shahkar is your problem-solving store. Smart gadgets and clever solutions designed to make daily life easier, cooler, and better. Cash on Delivery across Pakistan.",
      },
      { property: "og:title", content: "Shahkar — Har Maslay Ka Hal" },
      { property: "og:description", content: "Smart gadgets & clever solutions for everyday life. Delivered across Pakistan, Cash on Delivery." },
    ],
    links: [{ rel: "icon", href: "/favicon.ico" }],
  }),
});

function NoticeBar() {
  return (
    <div className="bg-charcoal text-frost text-xs sm:text-sm tracking-wide">
      <div className="mx-auto max-w-7xl px-4 py-2.5 text-center">
        <span className="opacity-90">Trusted across Pakistan: </span>
        <span className="font-medium">Cash on Delivery • 3–5 Day Shipping • 7-Day Warranty</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <NoticeBar />
      <div className="mx-auto max-w-7xl px-6 py-4 grid grid-cols-3 items-center">
        <nav className="hidden md:flex gap-7 text-sm font-medium text-foreground/80">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <a href="#solutions" className="hover:text-gold transition-colors">Solutions</a>
        </nav>

        <div className="text-center col-start-2">
          <a href="/" className="inline-block">
            <img src={logo} alt="Shahkar" width={84} height={84} className="mx-auto" />
            <span className="block mt-1 text-[10px] tracking-[0.4em] text-muted-foreground uppercase">.store</span>
          </a>
        </div>

        <nav className="hidden md:flex gap-7 text-sm font-medium text-foreground/80 justify-end">
          <a href="#why" className="hover:text-gold transition-colors">Why Shahkar</a>
          <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
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

      <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-16 lg:pt-24 lg:pb-20 text-center animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/60 backdrop-blur px-4 py-1.5 text-xs tracking-widest uppercase text-gold-deep">
          <Lightbulb className="h-3.5 w-3.5" />
          Problem-Solving Store
        </div>

        <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-charcoal">
          Shahkar: <span className="italic text-shimmer-gold">Har Maslay</span>
          <br />
          <span className="italic font-light text-foreground/80">Ka Hal.</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Smart gadgets and clever solutions designed to make your daily life
          easier, cooler, and better.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 items-center justify-center">
          <a
            href="#solutions"
            className="group inline-flex items-center gap-3 gradient-gold text-charcoal font-semibold text-sm tracking-[0.18em] uppercase px-8 py-4 rounded-full shadow-gold hover:scale-[1.02] transition-transform"
          >
            Browse Solutions
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#featured"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-charcoal/80 hover:text-gold-deep px-4 py-4"
          >
            Featured Products →
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto">
          {[
            { k: "COD", v: "Across Pakistan" },
            { k: "3–5", v: "Day Delivery" },
            { k: "2,400+", v: "Happy Customers" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-2xl sm:text-3xl text-gold-deep">{s.k}</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Category = {
  title: string;
  tagline: string;
  problem: string;
  icon: React.ReactNode;
  cta: string;
  href: string;
  available: boolean;
};

const categories: Category[] = [
  {
    title: "Beat the Heat",
    tagline: "Coolers & Fans",
    problem: "Garmi & load-shedding got you down?",
    icon: <Snowflake className="h-7 w-7" />,
    cta: "Shop Coolers",
    href: "#featured",
    available: true,
  },
  {
    title: "Smart Home Office",
    tagline: "Work-from-home gear",
    problem: "Upgrade your desk, lighting & focus.",
    icon: <Laptop className="h-7 w-7" />,
    cta: "Coming Soon",
    href: "#",
    available: false,
  },
  {
    title: "Everyday Essentials",
    tagline: "Clever daily helpers",
    problem: "Little gadgets, big life upgrades.",
    icon: <Sparkles className="h-7 w-7" />,
    cta: "Coming Soon",
    href: "#",
    available: false,
  },
];

function Solutions() {
  return (
    <section id="solutions" className="relative py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Shop by Problem</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-charcoal">
            Find the <span className="italic text-gold">solution</span> you need.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every category is hand-picked to solve a real, everyday Pakistani problem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className={`group relative bg-card rounded-3xl p-7 border border-border/60 transition-all duration-500 shadow-ice ${
                c.available ? "hover:border-gold/50 hover:-translate-y-1" : "opacity-80"
              }`}
            >
              {!c.available && (
                <span className="absolute top-5 right-5 text-[10px] tracking-widest uppercase bg-ice text-gold-deep px-2.5 py-1 rounded-full font-semibold">
                  Soon
                </span>
              )}
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ice text-gold-deep group-hover:bg-gold group-hover:text-charcoal transition-colors">
                {c.icon}
              </div>
              <h3 className="mt-5 font-display text-2xl text-charcoal">{c.title}</h3>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{c.tagline}</p>
              <p className="mt-4 text-foreground/75 leading-relaxed">{c.problem}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-gold-deep">
                {c.cta}
                {c.available && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyShahkar() {
  const points = [
    {
      title: "Quality Selection",
      desc: "We test every product ourselves. Only the ones that actually work make it to the store.",
      icon: <ShieldCheck className="h-7 w-7" />,
    },
    {
      title: "Problem-Solving Focus",
      desc: "We don't sell gadgets — we sell solutions to the small frustrations of daily life.",
      icon: <Lightbulb className="h-7 w-7" />,
    },
    {
      title: "Cash on Delivery",
      desc: "Pay when it arrives. No advance, no risk. Trusted by thousands across Pakistan.",
      icon: <Truck className="h-7 w-7" />,
    },
  ];

  return (
    <section id="why" className="relative py-20 sm:py-24 gradient-ice">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Why Shahkar</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-charcoal">
            A store you can <span className="italic text-gold">actually trust</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {points.map((p) => (
            <div
              key={p.title}
              className="bg-card rounded-3xl p-8 border border-border/60 hover:border-gold/50 transition-all duration-500 hover:-translate-y-1 shadow-ice"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-ice text-gold-deep">
                {p.icon}
              </div>
              <h3 className="mt-5 font-display text-2xl text-charcoal">{p.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const lowStock = p.stockLeft <= 5;
  return (
    <Link
      to="/products/$slug"
      params={{ slug: p.slug }}
      className="group relative bg-card rounded-3xl overflow-hidden border border-border/60 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1.5 shadow-ice block"
    >
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

        {lowStock && (
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-destructive">
              Only {p.stockLeft} left!
            </span>
          </div>
        )}

        <div className="mt-5 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Cash on Delivery</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-2xl text-charcoal">Rs. {p.price.toLocaleString()}</span>
              {p.oldPrice && <span className="text-sm text-muted-foreground line-through">Rs. {p.oldPrice.toLocaleString()}</span>}
            </div>
          </div>
          <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-charcoal text-frost group-hover:bg-gold group-hover:text-charcoal transition-colors">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedSolutions() {
  return (
    <section id="featured" className="relative py-20 sm:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Featured Solutions</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal max-w-xl">
              Beat the heat <em className="text-gold not-italic">this summer</em>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Our most-loved category. Portable USB coolers & fans — perfect for load-shedding,
            solar setups, and personal cooling anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-frost">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-display text-3xl text-shimmer-gold font-semibold">Shahkar</span>
          <p className="mt-4 text-frost/70 max-w-sm leading-relaxed">
            Your problem-solving store. Smart gadgets and clever solutions, delivered with trust.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-frost/70">
            <li><a href="#solutions" className="hover:text-gold">Solutions</a></li>
            <li><a href="#featured" className="hover:text-gold">Featured</a></li>
            <li><a href="#why" className="hover:text-gold">Why Shahkar</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-frost/70">
            <li>WhatsApp: 03332468178</li>
            <li>shahkar@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-frost/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-frost/50">
          <p>© 2026 Shahkar.store — All rights reserved.</p>
          <p className="italic font-display text-base text-frost/70">Har maslay ka hal.</p>
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
      <Solutions />
      <WhyShahkar />
      <FeaturedSolutions />
      <Footer />
    </main>
  );
}
