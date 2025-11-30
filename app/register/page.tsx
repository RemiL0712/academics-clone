"use client";

import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string | null)?.trim() ?? "";
    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const password =
      (formData.get("password") as string | null)?.trim() ?? "";

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    window.location.href = "/login";
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10 bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <h1 className="mb-6 text-2xl font-semibold text-[var(--gs-primary)]">
        Sign up
      </h1>

      <form
        className="space-y-4 rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 shadow-sm text-sm"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="mb-1 block text-xs text-zinc-600">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="w-full rounded-md border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-600">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full rounded-md border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-zinc-600">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="w-full rounded-md border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[var(--gs-primary-deep)] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[var(--gs-primary)] hover:text-white disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

      </form>
    </main>
  );
}
