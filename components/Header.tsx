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
            src="/genscript-logo.jpeg"
            alt="GenScript.online"
            width={40}
            height={40}
            className="h-8 w-auto"
            priority
          />


          <span className="text-sm font-semibold tracking-wide">
            GenScript.online
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <Link href="/" className="text-[var(--gs-accent)]">
            Home
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-[var(--gs-accent)]"
          >
            How it works
          </Link>
          <Link
            href="/order"
            className="hover:text-[var(--gs-accent)]"
          >
            Order Now
          </Link>
          <Link
            href="/contact"
            className="hover:text-[var(--gs-accent)]"
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
                className="rounded-full border border-white px-5 py-1.5 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--gs-primary-deep)]"
            >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                href="/dashboard"
                className="hover:text-[var(--gs-accent)]"
              >
                My orders
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-[var(--gs-accent)]"
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
            <Link href="/contact" onClick={() => setMobileOpen(false)}>
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
