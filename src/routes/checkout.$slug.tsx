import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct } from "@/lib/products";
import { createClient } from '@supabase/supabase-js';

// --- Supabase Configuration ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const Route = createFileRoute("/checkout/$slug")({
  component: CheckoutPage,
  validateSearch: (s: Record<string, unknown>) => ({
    bundle: typeof s.bundle === "string" ? s.bundle : undefined,
  }),
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
  const shipping = 190;
  const total = subtotal + shipping;

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const orderId = `SHK-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await supabase
      .from('orders')
      .insert([{
        id: orderId,
        product_slug: product.slug,
        product_name: product.name,
        price_at_purchase: product.price,
        quantity: qty,
        customer_full_name: form.fullName,
        customer_phone: form.phone,
        customer_city: form.city,
        customer_address: form.address,
        customer_notes: form.notes
      }]);

    if (error) {
      console.error("Error placing order:", error.message);
      alert("Order failed. Please check your connection and try again.");
      setSubmitting(false);
    } else {
      // Small timeout to ensure DB consistency before navigation
      setTimeout(() => {
        navigate({ to: "/order-confirmed/$orderId", params: { orderId: orderId } });
      }, 300);
    }
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
          <Link to="/" className="font-display text-2xl text-shimmer-gold font-semibold uppercase tracking-tighter">Shahkar</Link>
          <Link to="/products/$slug" params={{ slug: product.slug }} className="text-sm text-muted-foreground hover:text-gold transition-colors">
            ← Back to product
          </Link>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <p className="text-xs tracking-[0.3em] uppercase text-gold font-medium">Step 1 of 1</p>
        <h1 className="mt-3 font-display text-3xl sm:text-5xl text-charcoal">Complete your order</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">Pay in cash when our courier delivers — no card needed.</p>

        <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-10">
          <div className="space-y-6 sm:space-y-8 min-w-0">
            <section className="bg-card border border-border/60 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
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

            <section className="bg-card border border-border/60 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
              <h2 className="font-display text-2xl text-charcoal">Payment Method</h2>
              <div className="mt-4 flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-2 border-gold bg-gold/5">
                <div className="h-10 w-10 rounded-full bg-gold flex items-center justify-center text-charcoal font-bold flex-shrink-0">₨</div>
                <div className="min-w-0">
                  <div className="font-semibold text-charcoal">Cash on Delivery</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pay Rs. {total.toLocaleString()} in cash upon delivery.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6 self-start space-y-6 min-w-0">
            <section className="bg-card border border-border/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
              <h2 className="font-display text-xl text-charcoal">Order Summary</h2>

              <div className="mt-5 flex gap-4">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-base text-charcoal truncate">{product.name}</div>
                  <div className="mt-2 inline-flex items-center border border-border rounded-full">
                    <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-7 w-7 hover:text-gold transition-colors">−</button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button type="button" onClick={() => setQty((q) => Math.min(product.stockLeft || 10, q + 1))} className="h-7 w-7 hover:text-gold transition-colors">+</button>
                  </div>
                </div>
                <div className="font-display text-charcoal">Rs. {subtotal.toLocaleString()}</div>
              </div>

              <div className="mt-6 space-y-2 text-sm border-t border-border pt-4">
                <Row label="Subtotal" value={`Rs. ${subtotal.toLocaleString()}`} />
                <Row label="Shipping" value={`Rs. ${shipping}`} />
                <div className="border-t border-border pt-3 flex justify-between items-baseline">
                  <span className="font-display text-lg">Total</span>
                  <span className="font-display text-2xl text-charcoal font-bold">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gold text-charcoal font-bold text-sm tracking-[0.1em] uppercase px-6 py-4 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? "Placing order..." : "Place Order Now"}
              </button>

              <div className="mt-4 text-[10px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                ✓ 7-Day Warranty <br /> ✓ Verified Markaz Supplier
              </div>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}

// --- Helper Components ---
const inputClass = "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all";

function Field({ label, children, required, className = "" }: { label: string; children: React.ReactNode; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}