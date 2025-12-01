"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};


export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ===== LOAD ORDERS =====
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!stored) {
      setLoading(false);
      return;
    }

    let user: User;

    try {
      user = JSON.parse(stored) as User;
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      setLoading(false);
      return;
    }

    const loadOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${user.id}`);
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);


  // ===== PAY ORDER =====
  const handlePay = async (orderId: number) => {
    try {
      const res = await fetch("/api/orders/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) throw new Error("Failed to pay order");

      const data = await res.json();
      const updated = data.order;

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating payment status.");
    }
  };

  // ===== VIEW ORDER =====
  const handleView = (order: Order) => {
  router.push(`/dashboard/orders/${order.id}`);
};

  // ===== CANCEL ORDER =====
  const handleCancel = async (orderId: number) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) throw new Error("Failed to cancel order");

      const data = await res.json();
      const updated = data.order;

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );
    } catch (err) {
      console.error(err);
      alert("Error cancelling order.");
    }
  };

  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-[var(--gs-dark)]">
        My Orders
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-sm text-zinc-500">Loading orders...</p>
      )}

      {/* No orders */}
      {!loading && orders.length === 0 && (
        <p className="text-sm text-zinc-500">You have no orders yet.</p>
      )}

      {/* Orders table */}
      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-[var(--gs-bg)] text-xs font-semibold uppercase tracking-wide text-[var(--gs-text-muted)]">
                <th className="px-6 py-3 text-left">Order</th>
                <th className="px-6 py-3 text-left">Created</th>
                <th className="px-6 py-3 text-left">Deadline</th>
                <th className="px-6 py-3 text-left">Pages</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-[var(--gs-light)] bg-white hover:bg-[var(--gs-bg)]/60 transition-colors"
                >
                  {/* Order */}
                  <td className="px-6 py-4 font-medium text-[var(--gs-dark)]">
                    #{order.id}
                    {order.type && (
                      <div className="text-xs text-[var(--gs-text-muted)]">
                        {order.type}
                      </div>
                    )}
                    {order.topic && (
                      <div className="text-xs text-zinc-600">
                        {order.topic}
                      </div>
                    )}
                  </td>

                  {/* Created */}
                  <td className="px-6 py-4 text-xs text-zinc-700">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Deadline */}
                  <td className="px-6 py-4 text-xs text-zinc-700">
                    {order.deadline
                      ? new Date(order.deadline).toLocaleDateString()
                      : "—"}
                  </td>

                  {/* Pages */}
                  <td className="px-6 py-4 text-xs text-zinc-700">
                    {order.pages ?? "—"}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right text-xs">
                    <div className="inline-flex gap-2">
                      <button
                        type="button"
                        onClick={() => handlePay(order.id)}
                        className="rounded-full bg-[var(--gs-primary)] px-3 py-1 font-medium text-white hover:bg-[var(--gs-primary-deep)]"
                      >
                        Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => handleView(order)}
                        className="rounded-full border border-[var(--gs-primary)] px-3 py-1 font-medium text-[var(--gs-primary)] hover:bg-[var(--gs-primary)] hover:text-white"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCancel(order.id)}
                        className="rounded-full border border-zinc-300 px-3 py-1 font-medium text-zinc-700 hover:bg-zinc-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
