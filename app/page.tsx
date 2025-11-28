// app/page.tsx

import Link from "next/link";
import Reveal from "@/components/Reveal";
import StatCard from "@/components/StatCard";

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
                Struggling to keep up with all of your homework?
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
      <section className="border-b bg-[var(--gs-bg)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-20 lg:flex-row lg:items-stretch">
          
          {/* LEFT TEXT BLOCK */}
          <Reveal>
            <div className="flex flex-1 flex-col justify-between rounded-3xl bg-[var(--gs-surface-soft)] px-10 py-12 shadow-sm">
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
            <div className="flex flex-1 items-center">
              <div className="grid w-full grid-cols-2 gap-6 lg:gap-8">
                <StatCard
                  title="WORDS WRITTEN"
                  subtitle="To date"
                  value={150}
                  suffix="M+"
                />
                <StatCard
                  title="COUNTRIES"
                  subtitle="Where we offer support"
                  value={15}
                  suffix="+"
                />
                <StatCard
                  title="CONTENT SERVED"
                  subtitle="Assignments processed"
                  value={12}
                  suffix="K+"
                />
                <StatCard
                  title="CLIENTS"
                  subtitle="Students we've worked with"
                  value={1.3}
                  suffix="K+"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-b bg-[var(--gs-bg)]">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gs-primary-mid)]">
                Why GenScript.online
              </h2>
              <h3 className="text-2xl font-semibold text-[var(--gs-primary-deep)]">
                To succeed this semester, stay organised with us
              </h3>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 text-sm">
            {[
              {
                title: "Organise your homework",
                text: "All subjects, topics, files and instructions are stored in one account. You always know what has been ordered and what is coming next.",
              },
              {
                title: "Stay on top of deadlines",
                text: "Clear due dates and task statuses help you plan your time realistically and avoid last-minute rush before submission.",
              },
              {
                title: "Get timely assistance",
                text: "When you have questions about requirements or the progress of an order, support is there to clarify and keep things moving smoothly.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 150}>
                <div className="group space-y-2 rounded-2xl border border-[var(--gs-border)] bg-[var(--gs-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gs-primary)] hover:shadow-md">
                  <h4 className="font-semibold text-[var(--gs-primary-deep)]">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-[var(--gs-text-muted)]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b bg-[var(--gs-surface-soft)]">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gs-primary-mid)]">
                Pricing
              </h2>
              <h3 className="text-2xl font-semibold text-[var(--gs-primary-deep)]">
                Expenses and payments
              </h3>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] text-sm">
            <Reveal>
              <div className="rounded-2xl border border-[var(--gs-border)] bg-[var(--gs-surface)] p-5 shadow-sm">
                <h4 className="mb-2 text-sm font-semibold text-[var(--gs-primary-deep)]">
                  Free services
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--gs-text-muted)]">
                  <li>• Creating and managing orders in your account</li>
                  <li>• Secure file upload and storage</li>
                  <li>• Keeping your order history in one place</li>
                  <li>• Continuous communication and basic support</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-2xl border border-[var(--gs-border)] bg-[var(--gs-surface)] p-5 shadow-sm">
                <h4 className="mb-2 text-sm font-semibold text-[var(--gs-primary-deep)]">
                  Starting cost
                </h4>
                <p className="mb-2 text-xs text-[var(--gs-text-muted)]">
                  Pricing depends on the deadline, subject area and word
                  count. Before confirming an order, you see an approximate
                  price calculated from these parameters.
                </p>
                <p className="mb-4 text-xs font-medium text-[var(--gs-dark)]">
                  Our base rate starts at around{" "}
                  <span className="font-semibold">$0.03</span> per word. Final
                  pricing is always calculated individually.
                </p>
                <Link
                  href="/order"
                  className="inline-flex rounded-full bg-[var(--gs-primary)] px-5 py-2 text-xs font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--gs-primary-mid)] hover:shadow-md"
                >
                  Create an order
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="border-b bg-[var(--gs-surface)]">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <Reveal>
            <div>
              <h2 className="mb-3 text-xl font-semibold text-[var(--gs-primary-deep)]">
                Disclaimer and academic integrity
              </h2>
              <p className="mb-3 text-sm text-[var(--gs-text-muted)]">
                GenScript.online is designed as a learning support tool. The
                materials you receive are intended to help you better understand
                topics, structure your own work and prepare for classes.
              </p>
              <p className="mb-4 text-sm text-[var(--gs-text-muted)]">
                We respect institutional academic policies and do not encourage
                any use of our service that would violate your school or
                university rules.
              </p>
              <Link
                href="/code-of-ethics"
                className="inline-flex text-sm font-medium text-[var(--gs-primary)] underline underline-offset-4 hover:text-[var(--gs-primary-mid)]"
              >
                View our code of ethics
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b bg-[var(--gs-bg)]">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--gs-primary-mid)]">
                Help
              </h2>
              <h3 className="text-2xl font-semibold text-[var(--gs-primary-deep)]">
                Frequently asked questions
              </h3>
            </div>
          </Reveal>

          <div className="space-y-5 text-sm">
            {[
              {
                q: "How is the final price calculated?",
                a: "The total cost depends on the deadline, subject area and the number of words or pages. An estimated price is shown before you confirm your order.",
              },
              {
                q: "How does your academic assistance service work?",
                a: "You submit task details such as topic, subject and instructions. Our team reviews the request and prepares a solution by the agreed deadline, making it available in your account.",
              },
              {
                q: "Are the people working on my tasks qualified?",
                a: "We collaborate with specialists who have relevant academic backgrounds and experience with academic writing, allowing us to handle tasks across different subjects and levels.",
              },
              {
                q: "Can I trust you with my personal data?",
                a: "Your account details and order information are processed according to our privacy policy and are not shared with unrelated third parties.",
              },
              {
                q: "What if I'm not happy with the result?",
                a: "If the delivered work does not match the initial requirements, you can request a revision. We aim to adjust the result so it aligns with what was agreed.",
              },
              {
                q: "Do you handle urgent assignments?",
                a: "Yes, in many cases we can work with tight deadlines. The feasibility depends on the complexity and volume, so placing urgent orders early is always recommended.",
              },
            ].map((item, index) => (
              <Reveal key={item.q} delay={index * 120}>
                <div className="rounded-2xl border border-[var(--gs-border)] bg-[var(--gs-surface)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <h4 className="mb-1 text-sm font-semibold text-[var(--gs-primary-deep)]">
                    {item.q}
                  </h4>
                  <p className="text-xs text-[var(--gs-text-muted)]">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
