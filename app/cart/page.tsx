"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

type Order = {
  id: number;
  type: string;
  topic: string | null;
  deadline: string | null;
  pages: number;
  total: number;
  status: string;
  details?: string | null;
  createdAt: string;
};

export default function CartPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // завантаження користувача + ордерів
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!stored) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(stored) as User;
    setUser(parsed);

    const loadOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${parsed.id}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to load orders");
        }

        const pending: Order[] = (data.orders || []).filter(
          (o: Order) => o.status === "pending"
        );
        setOrders(pending);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [router]);

  const handleRemove = async (orderId: number) => {
    setActionError(null);
    try {
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to remove order");
      }

      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err: any) {
      console.error(err);
      setActionError(err.message || "Failed to remove order");
    }
  };

  const handleCheckout = () => {
    if (!orders.length) return;
    const order = orders[0]; // поки що платимо за перший ордер
    router.push(`/pay/${order.id}`);
  };

  const subtotal = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const total = subtotal; // якщо будуть збори/знижки — змінемо тут

  const formatMoney = (value: number) =>
    `€${value.toFixed(2)}`;

  const formatDeadline = (iso: string | null) => {
    if (!iso) return "Not set";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString();
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-[var(--gs-bg)] px-4 py-10 text-sm text-zinc-600">
        <div className="mx-auto max-w-5xl">Loading your cart…</div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-[60vh] bg-[var(--gs-bg)] px-4 py-10 text-[var(--gs-dark)]">
      <section className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm md:p-10">
        <h1 className="mb-2 text-2xl font-semibold">It&apos;s time to review the task</h1>
        <p className="mb-8 text-sm text-zinc-500">Your Task Info</p>

        {error && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {actionError && (
          <div className="mb-4 rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800">
            {actionError}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-sm text-zinc-600">
            Your cart is empty.{" "}
            <button
              type="button"
              onClick={() => router.push("/order")}
              className="font-semibold text-[var(--gs-primary)] hover:underline"
            >
              Place a new order
            </button>
            .
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-[2fr,1fr]">
            {/* LEFT: ORDERS */}
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border-b border-zinc-200 pb-6 last:border-0 last:pb-0"
                >
                  <div className="mb-2 text-sm font-semibold text-zinc-500">
                    Your Task #{order.id}
                  </div>

                  <div className="grid grid-cols-[minmax(0,3fr)_auto_auto_auto] items-start gap-4 text-sm">
                    <div className="space-y-1">
                      <div>
                        <span className="font-semibold">Type:</span>{" "}
                        {order.type || "Essay"}
                      </div>
                      {order.topic && (
                        <div>
                          <span className="font-semibold">Topic:</span>{" "}
                          {order.topic}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold">Pages:</span>{" "}
                        {order.pages}
                      </div>
                      <div>
                        <span className="font-semibold">Deadline:</span>{" "}
                        {formatDeadline(order.deadline)}
                      </div>
                      {order.details && (
                        <div className="mt-2 whitespace-pre-line text-zinc-600">
                          {order.details}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-1 text-sm font-semibold text-[var(--gs-primary)]">
                      {formatMoney(order.total || 0)}
                    </div>

                    {/* Quantity (поки що завжди 1, як у прикладі) */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-zinc-200 text-xs text-zinc-400"
                        disabled
                      >
                        –
                      </button>
                      <div className="flex h-7 w-10 items-center justify-center rounded border border-zinc-200 text-xs">
                        1
                      </div>
                      <button
                        type="button"
                        className="h-7 w-7 rounded border border-zinc-200 text-xs text-zinc-400"
                        disabled
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => handleRemove(order.id)}
                      className="mt-1 text-lg leading-none text-zinc-500 hover:text-red-500"
                      aria-label="Remove from cart"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: SUMMARY */}
            <aside className="rounded-3xl bg-[var(--gs-hero-bg)] p-6 shadow-inner">
              <h2 className="mb-4 text-lg font-semibold">Task Summary</h2>

              <dl className="mb-6 space-y-2 text-sm">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <dt className="text-zinc-500">Subtotal</dt>
                  <dd className="font-semibold text-[var(--gs-primary)]">
                    {formatMoney(subtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Total</dt>
                  <dd className="font-semibold text-[var(--gs-primary)]">
                    {formatMoney(total)}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                disabled={!orders.length}
                onClick={handleCheckout}
                className="w-full rounded-full bg-[var(--gs-primary)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--gs-primary-deep)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Proceed to checkout
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
