
import {
  ChartNoAxesCombinedIcon,
  WalletIcon,
  ShieldCheck,
  Mail,
  Github,
  Linkedin,
  ArrowUp,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#063F3A] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#07845B] p-3">
                <ChartNoAxesCombinedIcon size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">
                  BizPlan
                </h2>
                <p className="text-sm text-emerald-200">
                  Small Business Expense Planner
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-emerald-50/75">
              Take control of your finances with a clearer view of your income
              and expenses. BizPlan helps you organize spending, understand
              financial patterns, and make smarter decisions for a better
              financial future.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-200">
              <ShieldCheck size={18} />
              <span>Your financial organization starts here.</span>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-5 text-base font-bold">Explore BizPlan</h3>
            <ul className="space-y-4 text-sm text-emerald-50/75">
              <li className="flex items-center gap-2">
                <WalletIcon size={17} className="text-emerald-300" />
                Expense Tracking
              </li>
              <li className="flex items-center gap-2">
                <ChartNoAxesCombinedIcon
                  size={17}
                  className="text-emerald-300"
                />
                Financial Overview
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-emerald-300" />
                Budget Management
              </li>
            </ul>
          </div>

          {/* Project */}
          <div>
            <h3 className="mb-5 text-base font-bold">Project</h3>
            <p className="text-sm leading-7 text-emerald-50/75">
              Built to make everyday financial management simpler, more
              organized, and easier to understand.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-xl border border-white/15 bg-white/5 p-3 transition hover:bg-[#07845B]"
              >
                <Github size={19} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-xl border border-white/15 bg-white/5 p-3 transition hover:bg-[#07845B]"
              >
                <Linkedin size={19} />
              </a>

              <a
                href="mailto:hello@example.com"
                aria-label="Email"
                className="rounded-xl border border-white/15 bg-white/5 p-3 transition hover:bg-[#07845B]"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-emerald-50/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} BizPlan. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5">
            Made with <Heart size={15} className="fill-emerald-400 text-emerald-400" /> for smarter financial planning.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex w-fit items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-white/10 hover:text-white"
          >
            Back to top
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
}
