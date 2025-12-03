"use client";

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  displayName?: string;
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

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordStrength = (pwd: string) => {
    if (!pwd) return "";
    if (pwd.length < 6) return "Weak";
    if (pwd.length < 10) return "Medium";
    return "Strong";
  };

  // ===== LOAD USER =====
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

      const fullName = (parsed.name || "").trim();
      const [fn, ...rest] = fullName.split(" ");
      const ln = rest.join(" ");

      setFirstName(fn || "");
      setLastName(ln || "");
      setDisplayName(parsed.displayName || fullName || "");
      setEmail(parsed.email || "");
    } catch (err) {
      console.error("Failed to parse user", err);
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

    const fullNameToSave = `${firstName} ${lastName}`.trim();

    try {
      const res = await fetch("/api/account/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          name: fullNameToSave,
          email,
          currentPassword: currentPassword || null,
          newPassword: newPassword || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to update account.");

      const updated: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        displayName: displayName || data.user.name,
      };

      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setSuccess("Account details updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Failed to update account.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <main className="p-6 text-sm text-zinc-500">Loading…</main>;

  if (!user)
    return (
      <main className="p-6 text-sm text-zinc-500">You need to log in.</main>
    );

  // SVG-іконки
  const EyeOn = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );

  const EyeOff = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 011.478-5.195m3.296-.894A9.982 9.982 0 0112 3c5.523 0 10 4.477 10 10 0 2.083-.636 4.015-1.722 5.613M3 3l18 18"
      />
    </svg>
  );

  return (
    <main className="p-6">
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Account details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-8 rounded-2xl border border-[var(--gs-light)] bg-white p-6 shadow-sm"
      >
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

        {/* FIRST / LAST NAME */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              First name *
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              Last name *
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* DISPLAY NAME */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
            Display name *
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
            Email *
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD CHANGE */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[var(--gs-dark)]">
            Password change
          </h2>

          {/* CURRENT PASSWORD */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              Current password (leave blank to leave unchanged)
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 pr-12 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-zinc-600 hover:text-zinc-800"
                onClick={() => setShowCurrent((v) => !v)}
              >
                {showCurrent ? EyeOn : EyeOff}
              </button>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              New password (leave blank to leave unchanged)
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                className="w-full rounded-lg border border-[var(--gs-light)] bg-[var(--gs-bg)] px-3 pr-12 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-zinc-600 hover:text-zinc-800"
                onClick={() => setShowNew((v) => !v)}
              >
                {showNew ? EyeOn : EyeOff}
              </button>
            </div>
            {newPassword && (
              <p className="mt-1 text-xs text-zinc-500">
                Strength: {passwordStrength(newPassword)}
              </p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--gs-dark)]">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className={`w-full rounded-lg border px-3 pr-12 py-2 text-sm focus:border-[var(--gs-primary)] focus:bg-white ${
                  confirmPassword && newPassword !== confirmPassword
                    ? "border-red-400 bg-red-50"
                    : "border-[var(--gs-light)] bg-[var(--gs-bg)]"
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-zinc-600 hover:text-zinc-800"
                onClick={() => setShowConfirm((v) => !v)}
              >
                {showConfirm ? EyeOn : EyeOff}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-[var(--gs-primary)] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--gs-primary-deep)] disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </main>
  );
}
