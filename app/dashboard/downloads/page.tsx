export default function DownloadsPage() {
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold text-[var(--gs-primary)]">
        Downloads
      </h1>
      <p className="mb-6 text-sm text-zinc-700">
        Here you will find files available for download after order completion.
      </p>

      <section className="rounded-2xl border border-[var(--gs-light)] bg-white/90 p-5 text-sm text-zinc-700 shadow-sm">
        <p>No downloadable files yet.</p>
      </section>
    </>
  );
}
