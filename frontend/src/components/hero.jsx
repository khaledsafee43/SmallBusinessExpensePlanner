import {
  ChartNoAxesCombinedIcon,
  PlusIcon,
  ReceiptIcon,
  WalletCardsIcon,
  WalletIcon,
} from "lucide-react";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-b-2xl bg-gradient-to-br from-[#063F3A] via-[#075548] to-[#07845B] px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
            <ChartNoAxesCombinedIcon size={18} />
            Your Financial Journey Starts Here
          </span>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Take Control of Your Money,
            <span className="mt-2 block text-emerald-300">
              Build a Brighter Future.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-50/85 sm:text-lg">
            BizPlan helps you track your income, organize your expenses, and
            understand where your money goes. Keep your financial activities
            organized, monitor your spending habits, and make informed decisions
            with a clearer view of your finances.
          </p>

          <p className="mt-3 max-w-2xl text-base leading-8 text-emerald-50/75">
            Whether you are managing a small business or planning your personal
            budget, BizPlan gives you a simple way to stay organized, control
            unnecessary spending, plan for upcoming costs, and work toward your
            long-term financial goals.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/10 p-3 text-emerald-300">
                <ReceiptIcon size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Track Expenses</h3>
                <p className="mt-1 text-sm leading-6 text-emerald-50/75">
                  Record your spending and understand where your money goes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/10 p-3 text-emerald-300">
                <WalletCardsIcon size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Manage Your Budget</h3>
                <p className="mt-1 text-sm leading-6 text-emerald-50/75">
                  Keep your financial plans organized and spending under
                  control.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/10 p-3 text-emerald-300">
                <ChartNoAxesCombinedIcon size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-white">Analyze Insights</h3>
                <p className="mt-1 text-sm leading-6 text-emerald-50/75">
                  Explore spending patterns through clear charts and reports.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-white/10 p-3 text-emerald-300">
                <WalletIcon size={23} />
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  Build Better Habits
                </h3>
                <p className="mt-1 text-sm leading-6 text-emerald-50/75">
                  Make thoughtful financial choices and plan for the future.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:col-span-2 lg:flex lg:justify-center">
          <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-100/75">
                  Your financial overview
                </p>
                <h2 className="mt-1 text-2xl font-bold">Stay in control</h2>
              </div>
              <div className="rounded-2xl bg-emerald-300/15 p-3 text-emerald-300">
                <WalletIcon size={28} />
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#063F3A]/40 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/15 p-3 text-emerald-300">
                    <ReceiptIcon size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100/70">
                      Expense Tracking
                    </p>
                    <p className="mt-1 font-semibold">Every expense matters</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#063F3A]/40 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-400/15 p-3 text-emerald-300">
                    <ChartNoAxesCombinedIcon size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100/70">
                      Financial Insights
                    </p>
                    <p className="mt-1 font-semibold">
                      Understand your spending
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200/15 bg-emerald-300/10 p-4">
                <p className="text-sm leading-6 text-emerald-50">
                  Small, consistent financial decisions can help you build a
                  stronger and more organized future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
