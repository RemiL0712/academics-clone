"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // 🔄 синхронізація user з localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncUser = () => {
      const stored = localStorage.getItem("user");
      if (!stored) {
        setUser(null);
        return;
      }
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    };

    // перший запуск
    syncUser();

    // оновлення при зміні localStorage з інших вкладок
    const onStorage = (e: StorageEvent) => {
      if (e.key === "user") {
        syncUser();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [pathname]); // 🟡 при кожній зміні маршруту перечитуємо user

  const handleLogout = () => {
    if (typeof window === "undefined") return;

    // повністю чистимо дані авторизації
    localStorage.removeItem("user");
    // якщо зберігатимеш токен/кошик — теж прибери тут
    // localStorage.removeItem("token");
    // localStorage.removeItem("cart");
    setUser(null);

    router.push("/login");
    router.refresh();
  };

  return (
    <header className="border-b border-black/5 bg-[var(--gs-hero-bg)] text-[var(--gs-primary-deep)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        {/* LOGO + BRAND */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.ico"
            alt="GenScript.online"
            width={120}
            height={120}
            priority
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 text-base font-semibold tracking-wide md:flex">
          <Link
            href="/"
            className="text-[var(--gs-primary-deep)] hover:text-black"
          >
            Home
          </Link>

          <Link
            href="/#how-it-works"
            className="text-[var(--gs-primary-deep)] hover:text-black"
          >
            How it works
          </Link>

          <Link
            href="/order"
            className="text-[var(--gs-primary-deep)] hover:text-black"
          >
            Order Now
          </Link>

          <Link
            href="/contact-us"
            className="text-[var(--gs-primary-deep)] hover:text-black"
          >
            Contact Us
          </Link>
        </nav>

        {/* DESKTOP AUTH */}
        <div className="hidden items-center gap-4 text-sm md:flex">
          {!user && (
            <>
              <Link href="/login" className="hover:text-[var(--gs-accent)]">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-[var(--gs-primary-deep)] bg-white/90 px-5 py-1.5 text-sm font-semibold text-[var(--gs-primary-deep)] transition hover:bg-[var(--gs-primary-deep)] hover:text-white"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                href="/cart"
                className="text-[var(--gs-primary-deep)] hover:text-black"
              >
                Your cart
              </Link>

              <Link
                href="/dashboard"
                className="rounded-full bg-[var(--gs-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--gs-primary-deep)]"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gs-primary)] text-white shadow-sm md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          <span className="relative block h-4 w-5">
            {/* верхня лінія */}
            <span
              className={
                "absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-transform duration-200 " +
                (mobileOpen ? "translate-y-1.5 rotate-45" : "")
              }
            />
            {/* середня лінія */}
            <span
              className={
                "absolute left-0 top-1.5 h-[2px] w-full rounded-full bg-current transition-opacity duration-200 " +
                (mobileOpen ? "opacity-0" : "opacity-100")
              }
            />
            {/* нижня лінія */}
            <span
              className={
                "absolute left-0 top-3 h-[2px] w-full rounded-full bg-current transition-transform duration-200 " +
                (mobileOpen ? "-translate-y-1.5 -rotate-45" : "")
              }
            />
          </span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="mx-auto max-w-5xl px-4 pb-4 text-sm md:hidden">
          <nav className="flex flex-col gap-3 border-t border-white/20 pt-3">
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileOpen(false)}
            >
              How it works
            </Link>
            <Link href="/order" onClick={() => setMobileOpen(false)}>
              Order Now
            </Link>
            <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>

            {!user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-white px-4 py-1.5 text-center"
                >
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                >
                  Your cart
                </Link>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[var(--gs-primary)] px-4 py-2 text-center font-semibold text-white shadow-sm"
                >
                  Dashboard
                </Link>

                {/* Якщо захочеш логаут прямо в мобільному меню */}
                {<button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="mt-2 text-left text-red-500"
                >
                  Logout
                </button>}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
