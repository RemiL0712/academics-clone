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
                className="text-[var(--gs-primary-deep)] hover:text-black"
              >
                My orders
              </Link>
              <button
                onClick={handleLogout}
                className="text-[var(--gs-primary-deep)] hover:text-black"
              >
                Logout ({user.name})
              </button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="inline-flex items-center justify-center rounded-full border border-white/40 p-1.5 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span className="block h-[2px] w-5 bg-white" />
          <span className="mt-1 block h-[2px] w-5 bg-white" />
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
                >
                  My orders
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="text-left text-zinc-200"
                >
                  Logout ({user.name})
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
