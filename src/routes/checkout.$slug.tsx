import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/checkout/$slug")({
  component: CheckoutPage,
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Checkout — ${loaderData?.name ?? "Order"} | Shahkar.store` }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <Link to="/" className="text-gold underline">Back to home</Link>
    </div>
  ),
});

export type Order = {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  createdAt: string;
};

const ORDERS_KEY = "shahkar_orders";

export const saveOrder = (order: Order) => {
  if (typeof window === "undefined") return;
  const existing: Order[] = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]");
  existing.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(existing));
};

function CheckoutPage() {
  const product = Route.useLoaderData();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const subtotal = product.price * qty;
  const shipping = 250;
  const total = subtotal + shipping;

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const order: Order = {
      id: `SHK-${Date.now().toString(36).toUpperCase()}`,
      productId: product.slug,
      productName: product.name,
      price: product.price,
      quantity: qty,
      customer: { ...form },
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);
    setTimeout(() => {
      navigate({ to: "/order-confirmed/$orderId", params: { orderId: order.id } });
    }, 400);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-charcoal text-frost text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2.5 text-center">
          Secure Checkout — Cash on Delivery, no advance payment.
        </div>
      </div>

      <header className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl text-shimmer-gold font-semibold">Shahkar</Link>
          <Link to="/products/$slug" params={{ slug: product.slug }} className="text-sm text-muted-foreground hover:text-gold">
            ← Back to product
          </Link>
        </div>
        <div className="gold-rule" />
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="text-xs tracking-[0.3em] uppercase text-gold-deep font-medium">Step 1 of 1</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl text-charcoal">Complete your order</h1>
        <p className="mt-2 text-muted-foreground">Pay in cash when our courier delivers — no card needed.</p>

        <form onSubmit={handleSubmit} className="mt-10 grid lg:grid-cols-[1fr_400px] gap-10">
          <div className="space-y-8">
            <section className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-ice">
              <h2 className="font-display text-2xl text-charcoal">Delivery Details</h2>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" required>
                  <input required value={form.fullName} onChange={update("fullName")} className={inputClass} placeholder="Ali Khan" />
                </Field>
                <Field label="Phone Number" required>
                  <input required type="tel" value={form.phone} onChange={update("phone")} className={inputClass} placeholder="03XX-XXXXXXX" />
                </Field>
                <Field label="City" required>
                  <input required value={form.city} onChange={update("city")} className={inputClass} placeholder="Karachi" />
                </Field>
                <Field label="Complete Address" required className="sm:col-span-2">
                  <input required value={form.address} onChange={update("address")} className={inputClass} placeholder="House #, Street, Area" />
                </Field>
                <Field label="Order Notes (Optional)" className="sm:col-span-2">
                  <textarea value={form.notes} onChange={update("notes")} rows={3} className={inputClass} placeholder="Landmark, instructions..." />
                </Field>
              </div>
            </section>

            <section className="bg-card border border-border/60 rounded-3xl p-6 sm:p-8 shadow-ice">
              <h2 className="font-display text-2xl text-charcoal">Payment Method</h2>
              <div className="mt-4 flex items-start gap-4 p-5 rounded-2xl border-2 border-gold bg-ice/40">
                <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-charcoal font-bold">₨</div>
                <div>
                  <div className="font-semibold text-charcoal">Cash on Delivery</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pay Rs. {total.toLocaleString()} in cash when your order arrives. Delivery in 3–5 days.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6 self-start space-y-6">
            <section className="bg-card border border-border/60 rounded-3xl p-6 shadow-ice">
              <h2 className="font-display text-xl text-charcoal">Order Summary</h2>

              <div className="mt-5 flex gap-4">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-ice flex-shrink-0">
                  <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-base text-charcoal truncate">{product.name}</div>
                  <div className="text-xs text-muted-foreground">{product.tagline}</div>
                  <div className="mt-2 inline-flex items-center border border-border rounded-full">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-7 w-7 hover:text-gold">−</button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(product.stockLeft, q + 1))} className="h-7 w-7 hover:text-gold">+</button>
                  </div>
                </div>
                <div className="font-display text-charcoal">Rs. {subtotal.toLocaleString()}</div>
              </div>

              <div className="mt-6 space-y-2 text-sm border-t border-border pt-4">
                <Row label="Subtotal" value={`Rs. ${subtotal.toLocaleString()}`} />
                <Row label="Shipping (Markaz)" value={`Rs. ${shipping}`} />
                <div className="border-t border-border pt-3 flex justify-between items-baseline">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-2xl text-charcoal">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 gradient-gold text-charcoal font-semibold text-sm tracking-[0.18em] uppercase px-6 py-4 rounded-full shadow-gold hover:scale-[1.01] transition-transform disabled:opacity-60"
              >
                {submitting ? "Placing order..." : "Place Order"}
              </button>

              <div className="mt-4 text-[11px] text-center text-muted-foreground uppercase tracking-widest">
                ✓ 7-Day Warranty · ✓ COD · ✓ 3–5 Day Delivery
              </div>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}

const inputClass =
  "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition";

function Field({
  label, children, required, className = "",
}: { label: string; children: React.ReactNode; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
