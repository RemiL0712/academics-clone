// app/page.tsx

import Link from "next/link";
import Reveal from "@/components/Reveal";
import StatCard from "@/components/StatCard";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="bg-[var(--gs-bg)] text-[var(--gs-dark)]">
      {/* HERO */}
      <section className="relative border-b bg-[var(--gs-hero-bg)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 py-16 lg:flex-row lg:items-center lg:py-20">
          {/* LEFT: текст + кнопки */}
          <Reveal>
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--gs-surface)] px-3 py-1 text-[11px] font-medium text-[var(--gs-primary-mid)] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gs-primary)]" />
                GenScript.online is available 24/7
              </div>

              <h1 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--gs-primary-deep)] md:text-4xl">
                111Struggling to keep up with all of your homework?
              </h1>

              <p className="mb-6 max-w-xl text-sm leading-relaxed text-[var(--gs-text-muted)] md:text-[15px]">
                GenScript.online helps you organise tasks, deadlines and files
                in one place, so you always know what needs your attention next
                instead of getting lost in endless assignments.
              </p>

              <div className="mb-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/order"
                  className="rounded-full bg-[var(--gs-primary)] px-7 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gs-primary-mid)] hover:shadow-md"
                >
                  Add task
                </Link>
                <Link
                  href="#how-it-works"
                  className="rounded-full border border-[var(--gs-primary-deep)] px-7 py-2.5 text-sm font-medium text-[var(--gs-primary-deep)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gs-primary-deep)] hover:text-white"
                >
                  Learn more
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--gs-text-muted)]">
                <span className="text-lg">😊</span>
                <span>
                  Thanks to GenScript.online, there are fewer missed deadlines
                  and more structured study days.
                </span>
              </div>
            </div>
          </Reveal>

          {/* RIGHT: ілюстрація / картка замовлення */}
          <Reveal delay={200}>
            <div className="flex-1">
              <div className="relative mx-auto max-w-md rounded-3xl border border-[var(--gs-border)] bg-[var(--gs-surface)] p-4 shadow-[0_24px_60px_rgba(15,23,42,0.2)]">
                {/* “екран” замовлення */}
                <div className="mb-3 flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[11px] font-medium text-[var(--gs-text-muted)]">
                    Example order — dashboard view
                  </span>
                </div>

                <div className="space-y-3 rounded-2xl bg-[var(--gs-bg)] p-4 text-xs text-[var(--gs-dark)]">
                  <div className="flex justify-between">
                    <span className="font-medium">Type of work</span>
                    <span>Essay</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Subject</span>
                    <span>Business &amp; Management</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Deadline</span>
                    <span>05.12.2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pages</span>
                    <span>8</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-medium">Status</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      in progress
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-[var(--gs-text-muted)]">
                  The personal cabinet shows each order with type, deadline,
                  pages and status, so you always know what is currently being
                  worked on.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-b bg-[var(--gs-surface-soft)]"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gs-primary-mid)]">
                Process
              </h2>
              <h3 className="text-3xl font-semibold text-[var(--gs-primary-deep)]">
                How GenScript.online works
              </h3>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "Step 1:",
                title: "Describe your assignment",
                text: "Choose the type of work, subject, topic, deadline and upload any instructions or files. This helps us understand exactly what you need.",
                icon: "📅",
              },
              {
                step: "Step 2:",
                title: "We review and start",
                text: "Our team checks your request, assigns the task and begins working. You can see the order and its status in your account at any time.",
                icon: "💬",
              },
              {
                step: "Step 3:",
                title: "Receive your result",
                text: "By the agreed deadline, the completed work appears in your dashboard. Download it, review the content and request changes if needed.",
                icon: "✅",
              },
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 150}>
                <div className="flex h-full flex-col rounded-[28px] border border-[var(--gs-border)] bg-[var(--gs-surface)] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  {/* ІКОНКА (можна замінити на свій svg) */}
                  <div className="mb-6 inline-flex items-center justify-center rounded-3xl bg-[var(--gs-surface-soft)] px-6 py-6">
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  <p className="mb-2 text-sm font-semibold text-[var(--gs-primary)]">
                    {item.step}
                  </p>
                  <h4 className="mb-3 text-lg font-semibold text-[var(--gs-primary-deep)]">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--gs-text-muted)]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SATISFACTION + STATS */}
      <section className="border-b bg-[var(--gs-hero-bg)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

            {/* LEFT TEXT BLOCK */}
            <Reveal>
              <div className="w-full max-w-xl">
                <div>
                  <h2 className="mb-6 text-4xl font-semibold text-[var(--gs-primary-deep)]">
                    100% study satisfaction in mind
                  </h2>

                  <p className="mb-4 text-[15px] leading-relaxed text-[var(--gs-text-muted)]">
                    We help you stay on top of your academic tasks and submit them on time
                    by keeping everything organised in one personal account.
                  </p>

                  <p className="mb-6 text-[15px] leading-relaxed text-[var(--gs-text-muted)]">
                    Our support is available around the clock to answer questions, clarify
                    requirements and make sure you are happy with the assistance you receive.
                  </p>

                  <div className="space-y-3 text-[15px] text-[var(--gs-text-muted)]">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">😊</span>
                      <span>We can help you manage your workload and keep deadlines under control.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">😊</span>
                      <span>Our team is ready to assist so you feel confident about every task.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/order"
                    className="inline-flex rounded-full bg-[var(--gs-primary)] px-8 py-3 text-[15px] font-medium text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--gs-primary-mid)] hover:shadow-md"
                  >
                    Add task
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* RIGHT: STATS */}
            <Reveal delay={150}>
              <div className="shrink-0">
                <div className="grid grid-cols-2 gap-6">
                <StatCard
                  title="WORDS WRITTEN"
                  subtitle="To date"
                  target={150}
                  suffix="M+"
                />
                <StatCard
                  title="COUNTRIES"
                  subtitle="Where we offer support"
                  target={15}
                  suffix="+"
                />
                <StatCard
                  title="CONTENT SERVED"
                  subtitle="Assignments processed"
                  target={12}
                  suffix="K+"
                />
                <StatCard
                  title="CLIENTS"
                  subtitle="Students we've worked with"
                  target={1.3}
                  suffix="K+"
                  decimals={1}
                />
              </div>

              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* WHY GENSCRIPT + FEATURES */}
      <section className="border-b bg-[var(--gs-bg-soft)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          {/* Heading */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gs-primary-mid)]">
              WHY GENSCRIPT.ONLINE
            </p>
            <h2 className="text-3xl font-semibold text-[var(--gs-primary-deep)] md:text-4xl">
              To succeed this semester, stay organised with us
            </h2>
          </div>

          <div className="space-y-6">
            {/* Card 1 */}
            <Reveal>
              <div className="flex flex-col items-center gap-8 rounded-3xl bg-[var(--gs-surface-soft)] px-8 py-10 shadow-sm md:flex-row md:justify-between">
                <div className="max-w-xl">
                  <h3 className="mb-3 text-2xl font-semibold text-[var(--gs-primary-deep)]">
                    Organise your homework
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[var(--gs-text-muted)]">
                    All subjects, topics, files and instructions are stored in one
                    structured account, so you always know what has been added and
                    what is coming next.
                  </p>
                </div>

                <div className="w-full max-w-xs md:max-w-sm">
                  <Image
                    src="/home/why-organise.svg"
                    alt="Organise your homework illustration"
                    width={480}
                    height={260}
                    className="mx-auto h-auto w-full"
                    priority={false}
                  />
                </div>
              </div>
            </Reveal>

            {/* Card 2 */}
            <Reveal delay={120}>
              <div className="flex flex-col items-center gap-8 rounded-3xl bg-[var(--gs-surface-soft)] px-8 py-10 shadow-sm md:flex-row-reverse md:justify-between">
                <div className="max-w-xl">
                  <h3 className="mb-3 text-2xl font-semibold text-[var(--gs-primary-deep)]">
                    Stay on top of deadlines
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[var(--gs-text-muted)]">
                    Clear due dates, reminders and task statuses help you plan your
                    time realistically and avoid last-minute rushes before submission.
                  </p>
                </div>

                <div className="w-full max-w-xs md:max-w-sm">
                  <Image
                    src="/home/why-deadlines.svg"
                    alt="Stay on top of deadlines illustration"
                    width={480}
                    height={260}
                    className="mx-auto h-auto w-full"
                  />
                </div>
              </div>
            </Reveal>

            {/* Card 3 */}
            <Reveal delay={180}>
              <div className="flex flex-col items-center gap-8 rounded-3xl bg-[var(--gs-surface-soft)] px-8 py-10 shadow-sm md:flex-row md:justify-between">
                <div className="max-w-xl">
                  <h3 className="mb-3 text-2xl font-semibold text-[var(--gs-primary-deep)]">
                    Get timely assistance
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[var(--gs-text-muted)]">
                    When you have questions about requirements or the progress of an
                    order, support is there to clarify details, keep you informed and
                    make sure everything runs smoothly.
                  </p>
                </div>

                <div className="w-full max-w-xs md:max-w-sm">
                  <Image
                    src="/home/why-assistance.svg"
                    alt="Get timely assistance illustration"
                    width={480}
                    height={260}
                    className="mx-auto h-auto w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICING / EXPENSES AND PAYMENTS */}
      <section className="border-b bg-[var(--gs-hero-bg)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          
          {/* Heading */}
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gs-primary-mid)]">
              Pricing
            </p>
            <h2 className="text-3xl font-semibold text-[var(--gs-primary-deep)] md:text-4xl">
              Expenses and payments
            </h2>
          </div>

          {/* Cards */}
          <div className="mt-10 rounded-[32px] bg-white/60 p-6 shadow-sm ring-1 ring-[var(--gs-border)] sm:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* ЛІВА КАРТКА – Free services */}
              <Reveal>
              <div className="rounded-[28px] bg-white p-8 shadow-sm">
                
                <h3 className="text-xl font-semibold text-[var(--gs-primary-deep)]">
                  Free services
                </h3>

                <ul className="mt-6 space-y-3 text-sm text-[var(--gs-text-muted)]">
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gs-primary-light)] text-[var(--gs-primary-deep)] text-xs">
                      ✓
                    </span>
                    <span>Creating and managing orders inside your account</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gs-primary-light)] text-[var(--gs-primary-deep)] text-xs">
                      ✓
                    </span>
                    <span>Secure upload and safe storage of all attached files</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gs-primary-light)] text-[var(--gs-primary-deep)] text-xs">
                      ✓
                    </span>
                    <span>Keeping the full order history in one place</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gs-primary-light)] text-[var(--gs-primary-deep)] text-xs">
                      ✓
                    </span>
                    <span>
                      Continuous communication and basic support at no extra cost
                    </span>
                  </li>
                </ul>
                
              </div>
              </Reveal>

              {/* ПРАВА КАРТКА – Starting cost + кнопка + іконки */}
              <Reveal>
              <div className="flex flex-col justify-between rounded-[28px] bg-[var(--gs-primary-deep)] p-8 text-white shadow-sm">
                
                <div>
                  <h3 className="text-xl font-semibold">Starting cost</h3>

                  <p className="mt-4 text-sm text-white/80">
                    Pricing depends on the deadline, subject area, complexity and word
                    count. Before confirming an order, you see an approximate total based
                    on these factors.
                  </p>

                  <p className="mt-6 text-sm text-white/80">
                    Our base rate starts at{" "}
                    <span className="font-semibold">$0.03 per word</span>. Final pricing
                    is always adjusted individually so you only pay for what you actually
                    need.
                  </p>

                  <p className="mt-6 text-3xl font-bold text-[var(--gs-accent)]">
                    $0.03 <span className="text-base font-semibold">/ per word</span>
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <a
                    href="/order"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--gs-primary-deep)] shadow-md transition hover:bg-[var(--gs-primary-light)]"
                  >
                    Create an order
                  </a>

                  <div className="flex items-center gap-3 opacity-90">
                    <img src="/payments/visa.svg" alt="Visa" className="h-5" />
                    <img src="/payments/mastercard.svg" alt="Mastercard" className="h-5" />
                    <img src="/payments/paypal.svg" alt="PayPal" className="h-5" />
                  </div>
                </div>
                
              </div>
              </Reveal>
            </div>
          </div>

        </div>
      </section>

      {/* DISCLAIMER */}
      
      <section className="py-24 bg-[var(--gs-page-bg)]">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--gs-primary-deep)] mb-6">
              Disclaimer and academic integrity
            </h2>

            <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--gs-text-muted)] mb-4">
              GenScript.online is designed as a learning support tool. The materials you receive
              are intended to help you better understand topics, structure your own work and
              prepare for classes.
            </p>

            <p className="text-[15px] md:text-[16px] leading-relaxed text-[var(--gs-text-muted)] mb-6">
              We respect institutional academic policies and do not encourage any use of our
              service that would violate your school or university rules.
            </p>

            <a
              href="/code-of-ethics"
              className="inline-flex text-[15px] font-medium text-[var(--gs-primary)] hover:text-[var(--gs-primary-mid)] underline decoration-[var(--gs-primary)] decoration-1 underline-offset-4"
            >
              View our code of ethics
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-[var(--gs-hero-bg)]">
        <div className="max-w-5xl mx-auto px-6">
          
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-sm tracking-widest text-[var(--gs-primary)] font-semibold">
                HELP
              </span>
              <h2 className="mt-2 text-4xl font-semibold text-[var(--gs-primary-deep)]">
                Frequently asked questions
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">

            {/* ITEM 1 */}
            <Reveal>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-[var(--gs-border)]">
                <summary className="cursor-pointer text-lg font-medium text-[var(--gs-primary-deep)] flex justify-between items-center">
                  How is the final price calculated?
                  <span className="transition-transform group-open:rotate-90 text-[var(--gs-primary)]">›</span>
                </summary>
                <p className="mt-3 text-[15px] text-[var(--gs-text-muted)]">
                  The total cost depends on the deadline, subject area, and number of words or pages.
                  You see the estimated price before confirming your order.
                </p>
              </details>
            </Reveal>

            {/* ITEM 2 */}
            <Reveal delay={100}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-[var(--gs-border)]">
                <summary className="cursor-pointer text-lg font-medium text-[var(--gs-primary-deep)] flex justify-between items-center">
                  How does your academic assistance service work?
                  <span className="transition-transform group-open:rotate-90 text-[var(--gs-primary)]">›</span>
                </summary>
                <p className="mt-3 text-[15px] text-[var(--gs-text-muted)]">
                  You submit your task details — topic, subject and instructions.  
                  Our team reviews the request and prepares a solution by the agreed deadline,
                  making it available inside your account.
                </p>
              </details>
            </Reveal>

            {/* ITEM 3 */}
            <Reveal delay={150}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-[var(--gs-border)]">
                <summary className="cursor-pointer text-lg font-medium text-[var(--gs-primary-deep)] flex justify-between items-center">
                  Are the people working on my tasks qualified?
                  <span className="transition-transform group-open:rotate-90 text-[var(--gs-primary)]">›</span>
                </summary>
                <p className="mt-3 text-[var(--gs-text-muted)] text-[15px]">
                  We collaborate with specialists who have relevant academic backgrounds and experience
                  with academic writing across different subjects and levels.
                </p>
              </details>
            </Reveal>

            {/* ITEM 4 */}
            <Reveal delay={200}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-[var(--gs-border)]">
                <summary className="cursor-pointer text-lg font-medium text-[var(--gs-primary-deep)] flex justify-between items-center">
                  Can I trust you with my personal data?
                  <span className="transition-transform group-open:rotate-90 text-[var(--gs-primary)]">›</span>
                </summary>
                <p className="mt-3 text-[var(--gs-text-muted)] text-[15px]">
                  All account information is processed securely according to our privacy policy 
                  and is never shared with third parties.
                </p>
              </details>
            </Reveal>

            {/* ITEM 5 */}
            <Reveal delay={250}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-[var(--gs-border)]">
                <summary className="cursor-pointer text-lg font-medium text-[var(--gs-primary-deep)] flex justify-between items-center">
                  What if I'm not happy with the result?
                  <span className="transition-transform group-open:rotate-90 text-[var(--gs-primary)]">›</span>
                </summary>
                <p className="mt-3 text-[var(--gs-text-muted)] text-[15px]">
                  If something does not match your initial requirements, you can request a revision.
                  We make corrections until your task fully aligns with what was agreed.
                </p>
              </details>
            </Reveal>

            {/* ITEM 6 */}
            <Reveal delay={300}>
              <details className="group bg-white rounded-xl p-6 shadow-sm border border-[var(--gs-border)]">
                <summary className="cursor-pointer text-lg font-medium text-[var(--gs-primary-deep)] flex justify-between items-center">
                  Do you handle urgent assignments?
                  <span className="transition-transform group-open:rotate-90 text-[var(--gs-primary)]">›</span>
                </summary>
                <p className="mt-3 text-[var(--gs-text-muted)] text-[15px]">
                  In many cases, yes — depending on the complexity and volume.  
                  Placing urgent orders early is always recommended.
                </p>
              </details>
            </Reveal>

          </div>
        </div>
      </section>

    </main>
  );
}
