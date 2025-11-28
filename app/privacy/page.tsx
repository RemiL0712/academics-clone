export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      <h1 className="mb-4 text-2xl font-semibold text-[var(--gs-primary)]">
        Privacy policy
      </h1>
      <p className="mb-4 text-sm text-zinc-700">
        This page describes in general terms how GenScript.online
        handles basic account and order information.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        What data we collect
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        When you create an account, we store your name, email address and
        a hashed version of your password. When you place orders, we keep
        task details so that we can process and display them in your
        personal account.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        How we use this data
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        The information is used only to operate the service: create and
        manage your account, show your order history and communicate with
        you about your requests.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        Sharing of data
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        We do not sell your personal data. Information may be shared only
        with technical providers that help us run the platform (for
        example, hosting or payment systems), and only for the purpose of
        delivering the service.
      </p>

      <h2 className="mb-2 text-sm font-semibold text-[var(--gs-dark)]">
        Data security
      </h2>
      <p className="mb-3 text-sm text-zinc-700">
        We use standard technical and organisational measures to keep your
        account and order data reasonably protected. However, no system
        can be guaranteed to be 100% secure.
      </p>

      <p className="mt-4 text-xs text-zinc-500">
        This page is a simplified description intended for demonstration
        of the service structure.
      </p>
    </main>
  );
}
