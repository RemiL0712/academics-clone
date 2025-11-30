import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-[var(--gs-primary-deep)] text-[var(--gs-soft-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm">
        {/* Верхній блок */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Опис сервісу */}
          <div className="max-w-sm">
            <div className="mb-4 inline-flex items-center rounded-2xl bg-white/5 px-4 py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--gs-primary-soft)]">
                GenScript.online
              </span>
            </div>
            <p className="text-xs leading-relaxed text-white/70">
              Online service that helps students manage academic tasks,
              deadlines and assignments in one personal account.
            </p>
          </div>

          {/* Навігація */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--gs-primary-soft)]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link
                  href="/#how-it-works"
                  className="transition hover:text-[var(--gs-accent)]"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="transition hover:text-[var(--gs-accent)]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="transition hover:text-[var(--gs-accent)]"
                >
                  Create an order
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-[var(--gs-accent)]"
                >
                  My orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & contact */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--gs-primary-soft)]">
              Legal & contact
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-[var(--gs-accent)]"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-[var(--gs-accent)]"
                >
                  Terms of use
                </Link>
              </li>
              <li>
                <Link
                  href="/code-of-ethics"
                  className="transition hover:text-[var(--gs-accent)]"
                >
                  Code of ethics
                </Link>
              </li>
            </ul>

            <p className="mt-4 text-xs text-white/60">
              Email:{" "}
              <a
                href="mailto:info@genscript.online"
                className="underline-offset-2 hover:underline"
              >
                info@genscript.online
              </a>
            </p>
          </div>
        </div>

        {/* Нижній рядок */}
        <div className="mt-8 border-t border-white/10 pt-4 text-[11px] text-white/50 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span>© {year} GenScript.online — academic support service</span>

          <div className="flex items-center gap-3">
            <img src="/payments/visa.svg" alt="Visa" className="h-5" />
            <img src="/payments/mastercard.svg" alt="Mastercard" className="h-5" />
            <img src="/payments/paypal.svg" alt="PayPal" className="h-5" />
          </div>
        </div>

      </div>
    </footer>
  );
}
