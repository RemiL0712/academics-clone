"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";

type OrderStatus = "NEW" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

type Order = {
  id: string;
  type: string;
  topic?: string | null;
  createdAt: string;
  deadline?: string | null;
  pages: number;
  status: OrderStatus;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as User;

      fetch(`/api/orders?userId=${parsed.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load orders");
          return res.json();
        })
        .then((data) => {
          setOrders(data.orders ?? data);
        })
        .catch((err) => {
          console.error("Fetch orders error", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.error("User parse error", err);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Your orders
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Here you can see your orders and their statuses.
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 shadow-sm">
        {loading && (
          <p className="text-sm text-zinc-600">Loading orders...</p>
        )}

        {!loading && orders.length === 0 && (
          <p className="text-sm text-zinc-600">You have no orders yet.</p>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-start justify-between rounded-xl border border-[var(--gs-light)] bg-[var(--gs-bg)] px-4 py-3 text-sm"
              >
                {/* Ліва частина */}
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
                    Created: {new Date(order.createdAt).toLocaleString()}
                  </div>

                  {order.deadline && (
                    <div className="text-[11px] text-zinc-500">
                      Deadline:{" "}
                      {new Date(order.deadline).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Права частина */}
                <div className="text-right text-[11px] text-zinc-600">
                  <div className="mb-1">Pages: {order.pages}</div>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
