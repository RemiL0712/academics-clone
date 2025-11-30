export default function PaymentsPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Payment methods
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Here you will be able to store your preferred payment options.
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
        <p>You don&apos;t have any saved payment methods yet.</p>
      </section>
    </>
  );
}
