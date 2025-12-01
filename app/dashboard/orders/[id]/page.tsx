"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Order } from "@prisma/client";
import { StatusBadge } from "@/components/StatusBadge";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string | string[] }>();

  // коректно витягуємо id з params (рядок або перший елемент масиву)
  const idParam = params.id;
  const idStr = Array.isArray(idParam) ? idParam[0] : idParam;
  const id = Number(idStr);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ===== LOAD ORDER =====
  useEffect(() => {
    // якщо id некоректний – одразу показуємо помилку
    if (!idStr || !id || Number.isNaN(id)) {
      setError("Invalid order id");
      setLoading(false);
      return;
    }

    const loadOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Failed to load order");
        }

        const data = await res.json();
        setOrder(data.order ?? null);
      } catch (err: any) {
        console.error("Failed to load order", err);
        setError(err?.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, idStr]);

  // ===== RENDERING =====

  if (loading) {
    return <main className="p-6">Loading order…</main>;
  }

  if (error) {
    return (
      <main className="p-6 text-sm font-medium text-red-600">
        {error}
      </main>
    );
  }

  if (!order) {
    return <main className="p-6">Order not found.</main>;
  }

  const total = order.total ?? 0;

  return (
    <main className="p-6">
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-dark)]">
        Order details
      </h1>

      <p className="mb-6 text-sm text-zinc-700">
        Order <span className="font-semibold">#{order.id}</span> was placed on{" "}
        <span className="font-semibold">
          {order.createdAt
            ? new Date(order.createdAt as any).toLocaleDateString()
            : "—"}
        </span>{" "}
        and is currently{" "}
        <span className="inline-flex items-center">
          <StatusBadge status={order.status} />
        </span>
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white p-5 text-sm text-zinc-800 shadow-sm">
        {/* Верхній рядок заголовків */}
        <div className="mb-4 flex items-center justify-between border-b border-[var(--gs-light)] pb-3">
          <h2 className="text-base font-semibold text-[var(--gs-dark)]">
            Product
          </h2>
          <span className="text-xs font-semibold text-[var(--gs-dark)]">
            Total
          </span>
        </div>

        {/* Основний блок товару */}
        <div className="flex items-start justify-between pb-3">
          <div className="text-sm">
            <div className="mb-1 font-medium text-[var(--gs-dark)]">
              Your Task × 1
            </div>

            {order.type && (
              <div>
                <span className="font-semibold">Type: </span>
                {order.type}
              </div>
            )}

            {order.topic && (
              <div>
                <span className="font-semibold">Topic: </span>
                {order.topic}
              </div>
            )}

            {order.pages != null && (
              <div>
                <span className="font-semibold">Pages: </span>
                {order.pages}
              </div>
            )}

            {order.deadline && (
              <div>
                <span className="font-semibold">Deadline: </span>
                {new Date(order.deadline as any).toLocaleDateString()}
              </div>
            )}

            {order.details && (
              <div className="mt-2 whitespace-pre-line text-xs text-zinc-700">
                <span className="font-semibold">Details: </span>
                {order.details}
              </div>
            )}
          </div>

          <div className="text-sm font-semibold text-[var(--gs-dark)]">
            €{total.toFixed(2)}
          </div>
        </div>

        {/* Підсумки */}
        <div className="mt-4 border-t border-[var(--gs-light)] pt-3 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">Subtotal:</span>
            <span>€{total.toFixed(2)}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span className="font-semibold">Payment method:</span>
            <span className="text-zinc-700">
              Pay with your debit/credit card.
            </span>
          </div>

          <div className="mt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span>€{total.toFixed(2)}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
