
import {
  Sprout,
  Wallet,
  ShieldCheck,
  TrendingUp,
  Target,
  BarChart3,
  ChartNoAxesCombined,
  CheckCircle2,
  ArrowUpRight,
  Lightbulb,
  HandCoins,
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Wallet,
      title: "Simple Expense Tracking",
      description:
        "Record your daily business expenses, organize transactions, and keep your financial information in one convenient place.",
    },
    {
      icon: ShieldCheck,
      title: "Secure and Organized",
      description:
        "Keep your financial records structured and accessible, helping you manage your business information with greater confidence.",
    },
    {
      icon: BarChart3,
      title: "Clear Financial Insights",
      description:
        "Understand where your money goes through organized expense summaries, category breakdowns, and visual reports.",
    },
    {
      icon: TrendingUp,
      title: "Built for Business Growth",
      description:
        "Use your expense history to recognize spending patterns, improve budgeting decisions, and plan for future business needs.",
    },
  ];

  const benefits = [
    "Track expenses in one place",
    "Organize spending by category",
    "Review financial summaries",
    "Make informed budgeting decisions",
    "Identify spending patterns",
    "Plan business expenses more effectively",
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 px-6 py-14 text-white md:px-12 md:py-20">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-teal-300/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg">
              <Sprout size={34} className="text-emerald-300" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              About BizPlan
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Smarter Expense Management
              <span className="mt-2 block text-emerald-300">
                for Better Business Decisions
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-emerald-50/80 sm:text-base md:text-lg md:leading-8">
              BizPlan is a small business expense planning application
              designed to help business owners record expenses, organize
              financial information, monitor spending habits, and manage
              budgets more effectively. Our goal is to make everyday
              financial management clearer, simpler, and more accessible.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90">
                Expense Tracking
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90">
                Budget Planning
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90">
                Financial Insights
              </span>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Target size={25} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Our Mission
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Our mission is to simplify expense management for small
              businesses by providing a clear and practical way to
              organize financial records. We want business owners to
              spend less time dealing with scattered expense information
              and more time understanding their costs and planning ahead.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Lightbulb size={25} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Our Vision
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              We envision a future where small business owners can
              understand their spending, plan their budgets, and make
              financial decisions with greater confidence. BizPlan aims
              to make useful financial organization tools approachable
              for businesses at every stage of growth.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              What We Offer
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
              Everything You Need to Stay Organized
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 md:text-base">
              Explore the tools that help you maintain better control
              over your business expenses and financial planning.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="grid gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Why BizPlan?
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
              Take Control of Your Business Expenses
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
              Good financial management starts with knowing where your
              money goes. By keeping expense records organized and
              reviewing spending regularly, you can identify patterns,
              understand costs, and prepare more realistic budgets.
              BizPlan is designed to support that process with a
              straightforward and organized experience.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <span className="text-sm leading-6 text-slate-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 p-6 md:min-h-96">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/50 blur-2xl" />

            <div className="relative w-full max-w-sm rounded-2xl border border-white bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Expense Overview
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    Manage with Clarity
                  </h3>
                </div>

                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <ChartNoAxesCombined size={25} />
                </div>
              </div>

              <div className="mt-7 space-y-5">
                {[
                  { label: "Food & Supplies", width: "w-[75%]" },
                  { label: "Rent & Utilities", width: "w-[55%]" },
                  { label: "Transportation", width: "w-[40%]" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-xs text-slate-600">
                      <span>{item.label}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full bg-emerald-600 ${item.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
                <HandCoins size={25} className="shrink-0 text-emerald-700" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">
                    Plan Your Budget
                  </p>
                  <p className="mt-1 text-xs leading-5 text-emerald-800">
                    Build better spending habits with organized records.
                  </p>
                </div>
                <ArrowUpRight
                  size={19}
                  className="ml-auto shrink-0 text-emerald-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-10 text-center md:px-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Sprout size={25} />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
            Better Records. Better Planning.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
            Whether you are managing everyday purchases or planning
            future business costs, BizPlan helps you build a clearer
            picture of your expenses and take the next step toward
            more organized financial management.
          </p>
        </section>
      </div>
    </main>
  );
}
