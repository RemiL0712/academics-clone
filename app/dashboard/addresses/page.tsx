export default function AddressesPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Addresses
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Here you can manage your billing or contact addresses (optional in this
        version).
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
        <p>Address management can be added later on request.</p>
      </section>
    </>
  );
}
