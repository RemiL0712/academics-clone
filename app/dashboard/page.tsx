"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  status: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("user")
        : null;

    if (!stored) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored) as User;
      setUser(parsed);

      fetch(`/api/orders?userId=${parsed.id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch orders error", err);
          setLoading(false);
        });
    } catch {
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-10 text-center text-sm text-zinc-600">
        Redirecting to login...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Personal cabinet
      </h1>
      <p className="mb-4 text-sm text-zinc-700">
        Hello, {user.name}. Here you can see your orders and their statuses.
      </p>

      <div className="mb-6">
        <Link
          href="/order"
          className="text-sm text-[var(--gs-primary)] underline underline-offset-4 hover:text-[var(--gs-mid)]"
        >
          Create new order
        </Link>
      </div>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
          Your orders
        </h2>

        {loading && (
          <p className="text-sm text-zinc-600">Loading orders...</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-sm text-zinc-600">
            You have no orders yet.
          </p>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-start justify-between rounded-xl border border-[var(--gs-light)] bg-[var(--gs-bg)] px-4 py-3 text-sm"
              >
                <div>
                  <div className="font-medium text-[var(--gs-dark)]">
                    {order.type}
                  </div>
                  {order.topic && (
                    <div className="text-xs text-zinc-700">
                      {order.topic}
                    </div>
                  )}
                  <div className="mt-1 text-[11px] text-zinc-500">
                    Created:{" "}
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                  {order.deadline && (
                    <div className="text-[11px] text-zinc-500">
                      Deadline:{" "}
                      {new Date(order.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>
                <div className="text-right text-[11px] text-zinc-600">
                  <div>Pages: {order.pages}</div>
                  <div>
                    Status:{" "}
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
