export default function AccountPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Account details
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Here you will be able to update your personal information.
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
        <p>
          Basic account editing (name, email, password) can be implemented
          later if needed.
        </p>
      </section>
    </>
  );
}
