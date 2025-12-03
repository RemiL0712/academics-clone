// app/account/payment-methods/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

type PaymentMethod = {
  id: number;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  holder: string;
  createdAt: string;
};

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // поля форми
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState(""); // MM/YY
  const [cvc, setCvc] = useState("");
  const [holder, setHolder] = useState("");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!stored) {
      router.push("/login");
      return;
    }

    const u = JSON.parse(stored) as User;
    setUser(u);

    const load = async () => {
      try {
        const res = await fetch(`/api/payment-methods?userId=${u.id}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load methods");
        setMethods(data.methods || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const detectBrand = (number: string) => {
    const n = number.replace(/\s+/g, "");
    if (/^4[0-9]{6,}$/.test(n)) return "Visa";
    if (/^5[1-5][0-9]{5,}$/.test(n)) return "Mastercard";
    if (/^3[47][0-9]{5,}$/.test(n)) return "American Express";
    return "Card";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);

    const digits = cardNumber.replace(/\s+/g, "");
    if (digits.length < 12) {
      setError("Please enter a valid card number.");
      return;
    }

    const last4 = digits.slice(-4);
    const brand = detectBrand(digits);

    const [mmStr, yyStr] = exp.split("/");
    const expMonth = Number(mmStr);
    const expYear = Number("20" + (yyStr || "").trim());

    if (!expMonth || !expYear) {
      setError("Please enter expiry in MM/YY format.");
      return;
    }

    try {
      const res = await fetch("/api/payment-methods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          brand,
          last4,
          expMonth,
          expYear,
          holder: holder.trim() || user.name,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to add method");

      setMethods((prev) => [data.method, ...prev]);
      setShowForm(false);

      // очищаємо форму
      setCardNumber("");
      setExp("");
      setCvc("");
      setHolder("");
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (loading) {
    return (
      <main className="p-6 text-sm text-zinc-500">Loading payment methods…</main>
    );
  }

  if (!user) return null;

  return (
    <main className="p-6">
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Payment methods
      </h1>
      <p className="mb-6 text-sm text-zinc-600">
        Here you can store your preferred payment options.
      </p>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Якщо немає методів */}
      {methods.length === 0 && !showForm && (
        <div className="mb-4 rounded-2xl border border-zinc-200 bg-white px-4 py-6 text-sm text-zinc-600">
          You don&apos;t have any saved payment methods yet.
        </div>
      )}

      {/* Кнопка додавання */}
      {!showForm && (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mb-6 rounded-md bg-[var(--gs-dark)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black"
        >
          Add payment method
        </button>
      )}

      {/* Форма додавання карти */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 md:p-6"
        >
          <h2 className="text-sm font-semibold text-zinc-800">
            Credit card details
          </h2>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Card Number *
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-lg border border-zinc-200 bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white outline-none"
              autoComplete="off"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Expiry (MM/YY) *
              </label>
              <input
                type="text"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                placeholder="12/28"
                className="w-full rounded-lg border border-zinc-200 bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">CVC *</label>
              <input
                type="password"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
                className="w-full rounded-lg border border-zinc-200 bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Card holder name
              </label>
              <input
                type="text"
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
                placeholder={user.name}
                className="w-full rounded-lg border border-zinc-200 bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-[var(--gs-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--gs-primary-deep)]"
            >
              Add payment method
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-zinc-500 hover:underline"
            >
              Cancel
            </button>
          </div>

          <p className="mt-2 text-xs text-zinc-500">
            For demo purposes we only store the last 4 digits and expiry date of
            your card. Full card details are not saved.
          </p>
        </form>
      )}

      {/* Список збережених методів */}
      {methods.length > 0 && (
        <div className="space-y-3">
          {methods.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm"
            >
              <div>
                <div className="font-semibold">
                  {m.brand} •••• {m.last4}
                </div>
                <div className="text-xs text-zinc-500">
                  Expires {m.expMonth.toString().padStart(2, "0")}/
                  {String(m.expYear).slice(-2)} • {m.holder}
                </div>
              </div>
              <span className="text-xs text-zinc-400">
                Added {new Date(m.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
