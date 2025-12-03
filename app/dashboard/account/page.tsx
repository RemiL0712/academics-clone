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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
        className="h-5 w-5" fill="currentColor">
      <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
    </svg>

  );

  const EyeOff = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
        className="h-5 w-5" fill="currentColor">
      <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.69c-.42.94-10.55,23.37-33.36,43.8a8,8,0,1,1-10.67-11.92A132.77,132.77,0,0,0,231.05,128a133.15,133.15,0,0,0-23.12-30.77C185.67,75.19,158.78,64,128,64a118.37,118.37,0,0,0-19.36,1.57A8,8,0,1,1,106,49.79,134,134,0,0,1,128,48c34.88,0,66.57,13.26,91.66,38.35,18.83,18.83,27.3,37.62,27.65,38.41A8,8,0,0,1,247.31,131.26Z"></path>
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
