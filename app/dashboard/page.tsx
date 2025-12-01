"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    router.push("/login"); // якщо в тебе інший шлях — заміни тут
  };

  if (loading) {
    return <p className="p-6 text-sm text-zinc-500">Loading…</p>;
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Personal cabinet
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Here you can manage your orders and account details.
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
        {/* Перша строка */}
        <p className="mb-2">
          Hello{" "}
          <span className="font-semibold">{user?.name || "dear customer"}</span>{" "}
          (not{" "}
          <span className="font-semibold">{user?.name || "you"}</span>?{" "}
          <button
            type="button"
            onClick={handleLogout}
            className="text-sky-600 hover:text-sky-800 underline-offset-2 hover:underline"
          >
            Log out
          </button>
          )
        </p>

        {/* Друга строка з посиланнями як у прикладі */}
        <p>
          From your account dashboard you can view your{" "}
          <Link
            href="/dashboard/orders"
            className="text-sky-600 hover:text-sky-800 underline-offset-2 hover:underline"
          >
            recent orders
          </Link>
          , manage your{" "}
          <Link
            href="/dashboard/addresses"
            className="text-sky-600 hover:text-sky-800 underline-offset-2 hover:underline"
          >
            billing address
          </Link>
          , and{" "}
          <Link
            href="/dashboard/account"
            className="text-sky-600 hover:text-sky-800 underline-offset-2 hover:underline"
          >
            edit your password and account details
          </Link>
          .
        </p>
      </section>

    </>
  );
}

