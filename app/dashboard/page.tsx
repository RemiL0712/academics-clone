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

/* ----------------------------
   БЕЙДЖІ СТАТУСІВ
---------------------------- */

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending payment",
    className: "bg-amber-100 text-amber-700 ring-amber-200",
  },
  paid: {
    label: "Paid",
    className: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  },
  in_progress: {
    label: "In progress",
    className: "bg-sky-100 text-sky-700 ring-sky-200",
  },
  completed: {
    label: "Completed",
    className: "bg-zinc-100 text-zinc-800 ring-zinc-300",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-rose-100 text-rose-700 ring-rose-200",
  },
};

function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  const config =
    STATUS_CONFIG[key] ??
    ({
      label: status,
      className: "bg-zinc-100 text-zinc-700 ring-zinc-200",
    } as const);

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset",
        config.className,
      ].join(" ")}
    >
      {config.label}
    </span>
  );
}

type DashboardTab =
  | "dashboard"
  | "orders"
  | "downloads"
  | "addresses"
  | "payments"
  | "account";


/* ----------------------------
   DASHBOARD COMPONENT
---------------------------- */

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>("orders");


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

    const getNavItemClasses = (tab: DashboardTab) =>
    [
      "flex w-full items-center justify-between rounded-2xl px-4 py-2 text-left text-sm transition",
      activeTab === tab
        ? "bg-[var(--gs-primary)] text-white shadow-sm"
        : "bg-[var(--gs-surface-soft)] text-[var(--gs-primary-deep)] hover:bg-[var(--gs-primary-light)]",
    ].join(" ");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    router.push("/login");
  };
  

    if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-10 text-center text-sm text-zinc-600">
        Redirecting to login...
      </div>
    );
  }

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
                className={getNavItemClasses("dashboard")}
                onClick={() => setActiveTab("dashboard")}
              >
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                className={getNavItemClasses("orders")}
                onClick={() => setActiveTab("orders")}
              >
                <span>Orders</span>
              </button>

              <button
                type="button"
                className={getNavItemClasses("downloads")}
                onClick={() => setActiveTab("downloads")}
              >
                <span>Downloads</span>
              </button>

              <button
                type="button"
                className={getNavItemClasses("addresses")}
                onClick={() => setActiveTab("addresses")}
              >
                <span>Addresses</span>
              </button>

              <button
                type="button"
                className={getNavItemClasses("payments")}
                onClick={() => setActiveTab("payments")}
              >
                <span>Payment methods</span>
              </button>

              <button
                type="button"
                className={getNavItemClasses("account")}
                onClick={() => setActiveTab("account")}
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

          {/* ПРАВА ЧАСТИНА – те, що було */}
          <section>
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

            {/* ТАБ Orders */}
            {activeTab === "orders" && (
              <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 shadow-sm">
                <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
                  Your orders
                </h2>

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
            )}

            {activeTab === "dashboard" && (
              <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
                <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
                  Dashboard
                </h2>
                <p>Here will be a short overview of your activity.</p>
              </section>
            )}

            {activeTab === "downloads" && (
              <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
                <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
                  Downloads
                </h2>
                <p>No downloadable files yet.</p>
              </section>
            )}

            {activeTab === "addresses" && (
              <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
                <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
                  Addresses
                </h2>
                <p>Address management can be added later if needed.</p>
              </section>
            )}

            {activeTab === "payments" && (
              <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
                <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
                  Payment methods
                </h2>
                <p>You don&apos;t have any saved payment methods yet.</p>
              </section>
            )}

            {activeTab === "account" && (
              <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
                <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
                  Account details
                </h2>
                <p>Basic account editing can be added later.</p>
              </section>
            )}

          </section>
        </div>
      </div>
    </main>
  );
}

