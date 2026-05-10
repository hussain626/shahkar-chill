import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/order-confirmed/$orderId")({
  component: OrderConfirmedPage,
  head: () => ({
    meta: [{ title: "Order Confirmed — Shahkar.store" }],
  }),
});

function OrderConfirmedPage() {
  const { orderId } = Route.useParams();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto h-20 w-20 rounded-full gradient-gold flex items-center justify-center shadow-gold">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-charcoal">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <p className="mt-8 text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Order Confirmed</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal leading-tight">
          Shukriya for your <span className="italic text-gold">order</span>.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Our team will call you shortly to confirm. Your Mini AC will arrive in 3–5 days via Partner Shipping.
        </p>

        <div className="mt-8 inline-flex flex-col items-center gap-1 bg-card border border-border rounded-2xl px-8 py-5 shadow-ice">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Order ID</span>
          <span className="font-display text-2xl text-charcoal">{orderId}</span>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 gradient-gold text-charcoal font-semibold text-sm tracking-[0.18em] uppercase px-7 py-4 rounded-full shadow-gold hover:scale-[1.02] transition-transform"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-10 font-display italic text-lg text-muted-foreground">Sukoon ab har jagah.</p>
      </div>
    </main>
  );
}
