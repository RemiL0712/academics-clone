// app/contact-us/page.tsx
"use client";

export default function ContactUsPage() {
  return (
    <main className="min-h-[60vh] bg-[var(--gs-bg)] px-4 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row">
        {/* Ліва колонка — текст + реквізити */}
        <section className="flex-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gs-text-muted)]">
            Contact us
          </p>

          <h1 className="mb-4 text-3xl font-bold text-[var(--gs-dark)] lg:text-4xl">
            We love getting feedback, questions, and hearing what you have to say!
          </h1>

          <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-[var(--gs-text-muted)]">
            Please do not hesitate to contact us. Our dedicated team will be at your
            service to provide guidance and address any concerns you may have.
          </p>

          <div className="mb-6 space-y-3">
            <h2 className="text-lg font-semibold text-[var(--gs-dark)]">Let&apos;s talk</h2>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--gs-text-muted)]">
                Email
              </p>
              <a
                href="mailto:info@scriptgpt.online"
                className="text-sm font-medium text-[var(--gs-primary-mid)] hover:underline"
              >
                info@scriptgpt.online
              </a>
            </div>
          </div>

          <div className="space-y-2 text-sm text-[var(--gs-dark)]">
            <h2 className="text-base font-semibold">Company info</h2>
            <p>Boros Agency OU</p>
            <p>Reg.nr 16927822</p>
            <p>
              <span className="font-semibold">Address: </span>
              Rännaku pst 12 Tallinn 10917
            </p>
            <p>
              <span className="font-semibold">Registed address: </span>
              Harju maakond, Tallinn, Nõmme linnaosa, Rännaku pst 12, 10917
            </p>
          </div>
        </section>

        {/* Права колонка — форма */}
        <section className="flex-1">
          <div className="rounded-2xl bg-[var(--gs-surface)] p-6 shadow-xl shadow-slate-900/5">
            <h2 className="mb-5 text-lg font-semibold text-[var(--gs-dark)]">
              Please feel free to contact us using form below
            </h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: підключити реальний API, наприклад /api/contact
              }}
            >
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-[var(--gs-dark)]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full rounded-xl border border-[var(--gs-border)] bg-[var(--gs-surface-soft)] px-3 py-2 text-sm outline-none transition focus:border-[var(--gs-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--gs-primary-light)]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[var(--gs-dark)]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full rounded-xl border border-[var(--gs-border)] bg-[var(--gs-surface-soft)] px-3 py-2 text-sm outline-none transition focus:border-[var(--gs-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--gs-primary-light)]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-[var(--gs-dark)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Message"
                  className="w-full resize-y rounded-xl border border-[var(--gs-border)] bg-[var(--gs-surface-soft)] px-3 py-2 text-sm outline-none transition focus:border-[var(--gs-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--gs-primary-light)]"
                />
              </div>

              {/* Плейсхолдер reCAPTCHA */}
              <div className="flex items-center gap-3 rounded-xl border border-[var(--gs-border)] bg-white px-4 py-3 text-xs text-[var(--gs-text-muted)] shadow-sm">
                <span className="inline-block h-4 w-4 rounded border-2 border-[var(--gs-border)]" />
                <span>I&apos;m not a robot (captcha placeholder)</span>
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-[var(--gs-accent)] px-5 py-2.5 text-sm font-semibold text-[var(--gs-dark)] shadow-md transition hover:shadow-lg hover:brightness-105 active:scale-[0.98]"
              >
                Submit Now
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
