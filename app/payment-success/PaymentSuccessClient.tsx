// app/payment-success/PaymentSuccessClient.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); // або твій параметр

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-[var(--gs-primary-deep)]">
        Payment successful
      </h1>

      <p className="mt-4 text-sm text-[var(--gs-text-muted)]">
        Thank you for your payment.
      </p>

      {orderId && (
        <p className="mt-2 text-sm">
          Your order ID: <span className="font-mono">{orderId}</span>
        </p>
      )}
    </div>
  );
}
