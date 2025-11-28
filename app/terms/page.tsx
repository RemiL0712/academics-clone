export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <h1 className="mb-4 text-2xl font-semibold text-[var(--gs-primary)]">
        Terms of use
      </h1>
      <p className="mb-4 text-sm text-zinc-700">
        These terms describe the basic conditions under which you may use
        GenScript.online.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        Use of the service
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        You agree to use the platform only for lawful purposes and in line
        with your institution&apos;s academic policies. You are
        responsible for how you use any materials received through the
        service.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        Accounts and access
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        You must keep your login details confidential and notify us if you
        suspect unauthorised access to your account. We may temporarily
        suspend or limit access if we detect misuse of the service.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        No guarantees of outcome
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        The platform is provided &quot;as is&quot;. While we aim to
        deliver high quality support, we cannot guarantee specific grades,
        academic outcomes or decisions made by your institution.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        Changes to the service
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        We may update the functionality, interface or these terms from
        time to time. Continued use of the platform after updates means
        you accept the revised terms.
      </p>

      <p className="mt-4 text-xs text-zinc-500">
        This document is a simplified demo version and does not replace a
        full legal agreement.
      </p>
    </main>
  );
}
