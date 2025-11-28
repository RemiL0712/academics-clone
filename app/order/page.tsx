"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function OrderPage() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(stored) as { id: number };

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        type: formData.get("type") || "Essay",
        topic: formData.get("topic") || null,
        deadline: formData.get("deadline") || null,
        pages: Number(formData.get("pages") || 1),
        details: formData.get("details") || null,
        status: "paid",
      }),
    });

    if (!res.ok) {
      alert("Сталася помилка при створенні замовлення");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <h1 className="mb-2 text-3xl font-semibold text-[var(--gs-primary)]">
        Place an order
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Заповніть деталі замовлення. Після відправки ви зможете
        відстежувати статус у особистому кабінеті.
      </p>

      <form className="space-y-5 rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 shadow-sm" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="type"
            className="block text-xs font-medium text-zinc-600 mb-1"
          >
            Type of work
          </label>
          <select
            id="type"
            name="type"
            defaultValue="Essay"
            className="w-full rounded-lg border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
          >
            <option value="Essay">Essay</option>
            <option value="Research paper">Research paper</option>
            <option value="Coursework">Coursework</option>
            <option value="Thesis">Thesis</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="topic"
            className="block text-xs font-medium text-zinc-600 mb-1"
          >
            Topic
          </label>
          <input
            id="topic"
            name="topic"
            type="text"
            className="w-full rounded-lg border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            placeholder="Topic of your paper"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="deadline"
              className="block text-xs font-medium text-zinc-600 mb-1"
            >
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pages"
              className="block text-xs font-medium text-zinc-600 mb-1"
            >
              Pages
            </label>
            <input
              id="pages"
              name="pages"
              type="number"
              min={1}
              defaultValue={5}
              className="w-full rounded-lg border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="details"
            className="block text-xs font-medium text-zinc-600 mb-1"
          >
            Details / instructions
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            className="w-full rounded-lg border border-[var(--gs-light)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            placeholder="Describe the assignment, formatting, sources, etc."
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[var(--gs-primary)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--gs-mid)]"
        >
          Submit order
        </button>
      </form>
    </section>
  );
}
