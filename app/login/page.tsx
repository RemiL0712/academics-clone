"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string | null)?.trim() ?? "";
    const password =
      (formData.get("password") as string | null)?.trim() ?? "";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", res.status, data);

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined" && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      }

      setLoading(false);
    } catch (err) {
      console.error("Login fetch error", err);
      setError("Server error");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10 bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <h1 className="mb-6 text-2xl font-semibold text-[var(--gs-primary)]">
        Login
      </h1>

      <form
        className="space-y-4 rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 shadow-sm text-sm"
        onSubmit={handleSubmit}
      >
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
          className="w-full rounded-full bg-[var(--gs-primary)] py-2 text-sm font-medium text-white hover:bg-[var(--gs-mid)] disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
