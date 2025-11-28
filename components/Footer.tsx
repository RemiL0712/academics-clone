import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white/80">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-zinc-600">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--gs-mid)]">
              GenScript.online
            </h4>
            <p className="text-xs">
              Online service that helps students manage academic tasks,
              deadlines and assignments in one personal account.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--gs-mid)]">
              Navigation
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link href="/#how-it-works" className="hover:text-[var(--gs-primary)]">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[var(--gs-primary)]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-[var(--gs-primary)]">
                  Create an order
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[var(--gs-primary)]">
                  My orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--gs-mid)]">
              Legal & contact
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[var(--gs-primary)]"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[var(--gs-primary)]"
                >
                  Terms of use
                </Link>
              </li>
              <li>
                <Link
                  href="/code-of-ethics"
                  className="hover:text-[var(--gs-primary)]"
                >
                  Code of ethics
                </Link>
              </li>
              <li className="mt-2">
                <span className="block">Email: info@genscript.online</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-200 pt-4 text-[11px] text-zinc-500">
          © {year} GenScript.online — academic support service
        </div>
      </div>
    </footer>
  );
}
