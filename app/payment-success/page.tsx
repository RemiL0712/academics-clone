"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-center">
        <h1 className="mb-2 text-xl font-semibold text-zinc-900">
          Оплата пройшла успішно 🎉
        </h1>
        <p className="mb-4 text-sm text-zinc-600">
          {orderId ? (
            <>
              Замовлення <span className="font-semibold">#{orderId}</span>{" "}
              позначене як <span className="font-semibold">paid</span>.
            </>
          ) : (
            "Ваше замовлення позначене як paid."
          )}
        </p>
        <p className="mb-6 text-xs text-zinc-500">
          Ви можете переглянути статус і деталі у своєму особистому кабінеті.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-lg bg-[var(--gs-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          Перейти в особистий кабінет
        </Link>
      </div>
    </div>
  );
}
