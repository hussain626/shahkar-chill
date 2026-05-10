import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
});

function AdminPanel() {
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'delivered'>('current');
  
  // Separate loading states
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) console.error("Fetch error:", error.message);
    setOrders(data || []);
    setIsPageLoading(false);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoginLoading(true); // Only trigger login button loading
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      alert("Access Denied: " + error.message);
      setIsLoginLoading(false);
    } else {
      setUser(data.user);
      // fetchOrders will be triggered by the useEffect observing [user]
    }
  }

  async function updateStatus(id: string, status: string) {
    setIsActionLoading(true);
    const { error } = await supabase
      .from("orders")
      .update({ admin_status: status })
      .eq("id", id);
    
    if (!error) await fetchOrders();
    setIsActionLoading(false);
  }

  // Check auth on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
      } else {
        setIsPageLoading(false); // Stop loading so login screen shows
      }
    });
  }, []);

  // Fetch orders when user logs in
  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const currentOrders = orders.filter(o => o.admin_status !== 'delivered');
  const deliveredOrders = orders.filter(o => o.admin_status === 'delivered');
  const displayOrders = activeTab === 'current' ? currentOrders : deliveredOrders;

  // 1. Initial Page Load
  if (isPageLoading && !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A68B4C]"></div>
      </div>
    );
  }

  // 2. Login Screen
  if (!user) return (
    <div className="flex h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">Shahkar Admin</h1>
        <p className="text-sm text-slate-500 mb-8 text-center">Secure Access Only</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Email Address</label>
            <input name="email" type="email" required className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#A68B4C]/20 focus:outline-none" placeholder="admin@shahkar.store" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Password</label>
            <input name="password" type="password" required className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#A68B4C]/20 focus:outline-none" placeholder="••••••••" />
          </div>
          <button 
            type="submit" 
            disabled={isLoginLoading} 
            className="w-full bg-[#A68B4C] text-white py-4 rounded-xl font-bold shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {isLoginLoading ? "Verifying..." : "Unlock Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );

  // 3. Main Dashboard
  return (
    <div className="p-4 sm:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Order Manager</h1>
            <div className="flex gap-6 mt-4">
              <button onClick={() => setActiveTab('current')} className={`pb-2 text-sm font-bold transition-all ${activeTab === 'current' ? 'border-b-2 border-[#A68B4C] text-[#A68B4C]' : 'text-slate-400'}`}>
                Current ({currentOrders.length})
              </button>
              <button onClick={() => setActiveTab('delivered')} className={`pb-2 text-sm font-bold transition-all ${activeTab === 'delivered' ? 'border-b-2 border-[#A68B4C] text-[#A68B4C]' : 'text-slate-400'}`}>
                Delivered ({deliveredOrders.length})
              </button>
            </div>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => setUser(null))} className="px-4 py-2 text-xs font-bold uppercase border border-slate-300 rounded-lg hover:bg-slate-900 hover:text-white transition-colors">Logout</button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-400">
              <tr>
                <th className="p-5">Customer</th>
                <th className="p-5">Product</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayOrders.length === 0 ? (
                <tr><td colSpan={4} className="p-10 text-center text-slate-400">No orders found.</td></tr>
              ) : displayOrders.map((order) => (
                <tr key={order.id} className={`transition-opacity duration-300 ${order.admin_status === 'placed_on_markaz' ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}>
                  <td className="p-5">
                    <div className="font-bold text-slate-900">{order.customer_full_name}</div>
                    <div className="text-sm text-slate-500">{order.customer_phone}</div>
                    <div className="text-xs italic text-slate-400">{order.customer_city}</div>
                  </td>
                  <td className="p-5">
                    <div className="text-sm font-medium text-slate-900">{order.product_name}</div>
                    <div className="text-xs text-slate-500">Qty: {order.quantity}</div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${order.admin_status === 'placed_on_markaz' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100'}`}>
                      {order.admin_status || 'New'}
                    </span>
                  </td>
                  <td className="p-5 text-right space-x-2">
                    {activeTab === 'current' && (
                      <>
                        <button disabled={isActionLoading} onClick={() => updateStatus(order.id, 'placed_on_markaz')} className="text-[10px] bg-[#A68B4C] text-white px-3 py-1 rounded-md hover:brightness-110 disabled:opacity-50">Markaz</button>
                        <button disabled={isActionLoading} onClick={() => updateStatus(order.id, 'delivered')} className="text-[10px] bg-slate-800 text-white px-3 py-1 rounded-md disabled:opacity-50">Delivered</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}