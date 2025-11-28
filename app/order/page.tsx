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

    // 🔹 дані з форми
    const type = (formData.get("type") || "Essay") as string;
    const topic = (formData.get("topic") || "") as string;

    const wordCount = Number(formData.get("wordCount") || 0);
    const pagesRaw = Number(formData.get("pages") || 1);

    // якщо є wordCount — рахуємо сторінки з нього, інакше беремо pages
    const pages =
      wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 275)) : Math.max(1, pagesRaw);

    const deadlineOption = (formData.get("deadlineOption") || "rush") as string;
    const quality = (formData.get("quality") || "standard") as string;

    // рахуємо дату дедлайну відносно сьогодні
    const deadlineMap: Record<string, number> = {
      rush: 1,
      express: 2,
      standard: 5,
      economy: 7,
    };
    const daysToAdd = deadlineMap[deadlineOption] ?? 5;
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + daysToAdd);

    // решта полів зберігаємо у details
    const baseDetails = String(formData.get("details") || "").trim();

    const extraDetailsParts = [
      wordCount ? `Word count: ${wordCount}` : "",
      formData.get("images") ? `Images: ${formData.get("images")}` : "",
      formData.get("subject") ? `Subject: ${formData.get("subject")}` : "",
      formData.get("educationLevel")
        ? `Education level: ${formData.get("educationLevel")}`
        : "",
      formData.get("paperType")
        ? `Paper type: ${formData.get("paperType")}`
        : "",
      deadlineOption ? `Deadline option: ${deadlineOption}` : "",
      quality ? `Quality: ${quality}` : "",
      formData.get("reference")
        ? `Reference link: ${formData.get("reference")}`
        : "",
    ].filter(Boolean);

    const combinedDetails = [baseDetails, ...extraDetailsParts]
      .filter((p) => p && p.length > 0)
      .join("\n");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          type,
          topic: topic || null,
          deadline: deadlineDate.toISOString(),
          pages,
          details: combinedDetails || null,
          status: "paid",
        }),
      });

      if (!res.ok) {
        alert("Сталася помилка при створенні замовлення");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Сталася помилка при створенні замовлення");
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-10 bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <h1 className="mb-2 text-3xl font-semibold text-[var(--gs-primary)]">
        Place an order
      </h1>
      <p className="mb-6 text-sm text-[var(--gs-text-muted)]">
        Заповніть деталі замовлення. Після відправки ви зможете відстежувати
        статус у особистому кабінеті.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-[var(--gs-border)] bg-[var(--gs-surface)] p-6 shadow-sm"
      >
        {/* Type + Topic */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="type"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Type of work
            </label>
            <select
              id="type"
              name="type"
              defaultValue="Essay"
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            >
              <option value="Essay">Essay</option>
              <option value="Research paper">Research paper</option>
              <option value="Coursework">Coursework</option>
              <option value="Thesis">Thesis</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="topic"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              placeholder="Topic of your paper"
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Word count + Images */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="wordCount"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Word count
            </label>
            <input
              id="wordCount"
              name="wordCount"
              type="number"
              min={0}
              defaultValue={500}
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="images"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Images
            </label>
            <input
              id="images"
              name="images"
              type="number"
              min={0}
              defaultValue={0}
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Subject / Education / Paper type */}
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="subject"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            >
              <option>English</option>
              <option>Business</option>
              <option>IT</option>
              <option>History</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="educationLevel"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Education level
            </label>
            <select
              id="educationLevel"
              name="educationLevel"
              defaultValue="Graduate"
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            >
              <option value="Graduate">Graduate</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="College">College</option>
              <option value="High school">High school</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="paperType"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Paper type
            </label>
            <select
              id="paperType"
              name="paperType"
              defaultValue="Assignment"
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            >
              <option value="Assignment">Assignment</option>
              <option value="Essay">Essay</option>
              <option value="Report">Report</option>
              <option value="Presentation">Presentation</option>
            </select>
          </div>
        </div>

        {/* Deadline options + Quality */}
        <div className="grid gap-6 md:grid-cols-2">
          <fieldset>
            <legend className="mb-2 text-xs font-medium text-zinc-600">
              Deadline
            </legend>
            <div className="space-y-2 text-sm text-zinc-700">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="deadlineOption"
                  value="rush"
                  defaultChecked
                />
                <span>Rush – 1 day</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="deadlineOption" value="express" />
                <span>Express – 2 days</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="deadlineOption" value="standard" />
                <span>Standard – 5 days</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="deadlineOption" value="economy" />
                <span>Economy – 7 days</span>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-xs font-medium text-zinc-600">
              Quality
            </legend>
            <div className="space-y-2 text-sm text-zinc-700">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="quality"
                  value="standard"
                  defaultChecked
                />
                <span>Standard</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="quality" value="premium" />
                <span>Premium</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="quality" value="expert" />
                <span>Expert</span>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Details */}
        <div>
          <label
            htmlFor="details"
            className="mb-1 block text-xs font-medium text-zinc-600"
          >
            Details / instructions
          </label>
          <textarea
            id="details"
            name="details"
            rows={5}
            placeholder="Describe the assignment, formatting, sources, etc."
            className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
          />
        </div>

        {/* Attach + Reference */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-600">
              Attach files
            </label>
            <input
              type="file"
              name="file"
              className="block w-full text-sm text-zinc-700 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[var(--gs-surface-soft)] file:px-3 file:py-2 file:text-[var(--gs-primary)] hover:file:bg-[var(--gs-surface-strong)]"
            />
            <p className="mt-1 text-xs text-[var(--gs-text-muted)]">
              Max file size 1 GB (файл поки що не зберігається в базу, це можна
              доробити окремо)
            </p>
          </div>

          <div>
            <label
              htmlFor="reference"
              className="mb-1 block text-xs font-medium text-zinc-600"
            >
              Reference link (if any)
            </label>
            <input
              id="reference"
              name="reference"
              type="url"
              placeholder="ex: www.example.com"
              className="w-full rounded-lg border border-[var(--gs-border)] bg-white px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:outline-none"
            />
          </div>
        </div>

        {/* Кнопка */}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-[var(--gs-primary)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--gs-mid)] transition"
        >
          Submit order
        </button>
      </form>
    </section>
  );
}
