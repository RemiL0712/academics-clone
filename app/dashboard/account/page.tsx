"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function AccountDetailsPage() {
  const [user, setUser] = useState<User | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // ===== LOAD USER FROM localStorage =====
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as User;
      setUser(parsed);

      const fullName = parsed.name || "";
      const [fn, ...rest] = fullName.split(" ");
      const ln = rest.join(" ");

      setFirstName(fn || "");
      setLastName(ln || "");
      setDisplayName(fullName || "");
      setEmail(parsed.email || "");
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setSuccess(null);

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please fill in first name, last name and email.");
      return;
    }

    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        setError("Please enter your current password.");
        return;
      }
      if (!newPassword) {
        setError("Please enter a new password.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      }
    }

    setSaving(true);

    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          name: displayName || `${firstName} ${lastName}`.trim(),
          email,
          currentPassword: currentPassword || null,
          newPassword: newPassword || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to update account.");
      }

      const updated: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);

      setSuccess("Account details updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update account.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <main className="p-6 text-sm text-zinc-500">Loading account…</main>;
  }

  if (!user) {
    return (
      <main className="p-6 text-sm text-zinc-500">
        You need to log in to edit your account details.
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Account details
      </h1>
      <p className="mb-6 text-sm text-zinc-600">
        Here you can update your personal information.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-8 rounded-2xl border border-[var(--gs-light)] bg-white p-6 shadow-sm"
      >
        {/* MESSAGES */}
        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-md border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* First / Last name — 2 колонки */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--gs-primary)] focus:bg-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--gs-primary)] focus:bg-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Display name — на окремому рядку */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
            Display name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--gs-primary)] focus:bg-white"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <p className="mt-1 text-xs text-zinc-500">
            This will be how your name will be displayed in the account section
            and in reviews.
          </p>
        </div>

        {/* Email — окремий рядок, як у прикладі */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--gs-primary)] focus:bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD CHANGE — все в один стовпець */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[var(--gs-dark)]">
            Password change
          </h2>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              Current password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--gs-primary)] focus:bg-white"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              New password (leave blank to leave unchanged)
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--gs-primary)] focus:bg-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              Confirm new password
            </label>
            <input
              type="password"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm outline-none focus:border-[var(--gs-primary)] focus:bg-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[var(--gs-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--gs-primary-deep)] disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
