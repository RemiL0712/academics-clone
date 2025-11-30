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
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Personal cabinet
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Here you can manage your orders and account details.
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
        <h2 className="mb-3 text-sm font-medium text-[var(--gs-dark)]">
          Dashboard overview
        </h2>
        <p>
          Later here we can add a short summary: total orders, last order,
          deadlines and other helpful information.
        </p>
      </section>
    </>
  );
}


