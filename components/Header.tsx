"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("user");
    if (!stored) return;
    try {
      setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
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
              <Link
                href="/login"
                className="hover:text-[var(--gs-accent)]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-[var(--gs-primary-deep)] px-5 py-1.5 text-sm font-semibold text-[var(--gs-primary-deep)] bg-white/90 transition hover:bg-[var(--gs-primary-deep)] hover:text-white"
            >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                href="/dashboard"
                className="rounded-full bg-[var(--gs-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--gs-primary-deep)] transition"
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
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[var(--gs-primary)] px-4 py-2 text-center text-white font-semibold shadow-sm"
                >
                  Dashboard
                </Link>
              </>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}
