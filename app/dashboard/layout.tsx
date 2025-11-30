"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const getClasses = (path: string) =>
    [
      "flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm transition",
      pathname === path
        ? "bg-[var(--gs-primary)] text-white shadow-sm"
        : "bg-[var(--gs-surface-soft)] text-[var(--gs-primary-deep)] hover:bg-[var(--gs-primary-light)]",
    ].join(" ");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    router.push("/login");
  };

  return (
    <main className="bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[260px,1fr]">
          {/* ЛІВЕ МЕНЮ */}
          <aside className="self-start rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[var(--gs-light)]">
            <nav className="space-y-2 text-sm">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--gs-text-muted)]">
                Account
              </div>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className={getClasses("/dashboard")}
              >
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/orders")}
                className={getClasses("/dashboard/orders")}
              >
                <span>Orders</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/downloads")}
                className={getClasses("/dashboard/downloads")}
              >
                <span>Downloads</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/addresses")}
                className={getClasses("/dashboard/addresses")}
              >
                <span>Addresses</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/payments")}
                className={getClasses("/dashboard/payments")}
              >
                <span>Payment methods</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard/account")}
                className={getClasses("/dashboard/account")}
              >
                <span>Account details</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex w-full items-center justify-between rounded-2xl bg-[var(--gs-surface-soft)] px-4 py-2 text-left text-red-600 hover:bg-red-50"
              >
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* ПРАВА ЧАСТИНА */}
          <section>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
