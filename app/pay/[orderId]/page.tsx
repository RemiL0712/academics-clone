"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function PayPage() {
  const router = useRouter();
  const params = useParams<{ orderId: string }>();

  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;

  const [isPaying, setIsPaying] = useState(false);

  // Перевірка логіну
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
    }
  }, [router]);

  const handlePay = async () => {
    if (!orderId) {
      alert("Невірний ID замовлення");
      return;
    }

    setIsPaying(true);
    try {
      const res = await fetch("/api/orders/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });


      if (!res.ok) {
        let msg = "Помилка під час оплати";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
          console.error("Pay error", res.status, data);
        } catch (e) {
          console.error("Pay error", res.status);
        }
        alert(msg);
        return;
      }

      router.push(`/payment-success?orderId=${orderId}`);
    } catch (err) {
      console.error(err);
      alert("Сталася помилка під час оплати");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-xl font-semibold">Order Payment</h1>
        <p className="mb-6 text-sm text-zinc-600">
          You are making a payment for order{" "}
          <span className="font-semibold">#{orderId}</span>.
        </p>

        <button
          type="button"
          onClick={handlePay}
          disabled={isPaying}
          className="w-full rounded-lg bg-[var(--gs-primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {isPaying ? "Processing payment..." : "Pay for order"}
        </button>
      </div>
    </div>
  );
}
