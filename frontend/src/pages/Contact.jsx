
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  Sprout,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@bizplan.com",
    description: "Send us your questions anytime.",
    href: "mailto:support@bizplan.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    description: "We're happy to assist you.",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Kabul, Afghanistan",
    description: "Supporting small business owners.",
    href: null,
  },
];

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // The form is UI-only until a backend or email service is connected.
    setStatus(
      "The contact form is ready, but message delivery has not been configured yet."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <MessageCircle size={28} />
          </div>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Contact BizPlan
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Let's Start a Conversation
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Have a question about managing your business expenses or using
            BizPlan? Send us a message. We're here to help you get the most
            out of your financial planning experience.
          </p>
        </header>

        {/* Main Contact Layout */}
        <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact Information */}
          <aside className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800 p-7 text-white md:p-10 lg:p-12">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-teal-300/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                  <Sprout size={25} className="text-emerald-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">BizPlan</h2>
                  <p className="text-xs text-emerald-100/70">
                    Expense Planner
                  </p>
                </div>
              </div>

              <h2 className="mt-10 text-2xl font-bold leading-snug md:text-3xl">
                We'd Love to Hear From You
              </h2>

              <p className="mt-4 text-sm leading-7 text-emerald-50/80">
                Your questions, ideas, and feedback help us improve. Reach
                out to learn more about BizPlan or share your experience
                with our expense management tools.
              </p>

              <div className="mt-9 space-y-6">
                {contactDetails.map(
                  ({ icon: Icon, title, value, description, href }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-emerald-200">
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {title}
                        </p>

                        {href ? (
                          <a
                            href={href}
                            className="mt-1 inline-flex items-center gap-1 break-all text-sm text-emerald-200 transition hover:text-white"
                          >
                            {value}
                            <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <p className="mt-1 text-sm text-emerald-200">
                            {value}
                          </p>
                        )}

                        <p className="mt-1 text-xs leading-5 text-emerald-50/60">
                          {description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.07] p-5">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-emerald-300" />
                  <h3 className="font-semibold">We're Here to Help</h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                  Send us your questions or feedback using the form.
                  We'll be glad to hear from you.
                </p>
              </div>
            </div>
          </aside>

          {/* Contact Form */}
          <section className="p-6 md:p-10 lg:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-emerald-700">
                GET IN TOUCH
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Send Us a Message
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Fill out the form below with your details and message.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Full Name
                    <input
                      required
                      minLength={2}
                      maxLength={100}
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={inputClass}
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Email Address
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </label>
                </div>

                <label className="block text-sm font-semibold text-slate-700">
                  Subject
                  <input
                    required
                    maxLength={150}
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className={inputClass}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Your Message
                  <textarea
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={6}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your question or feedback..."
                    className={`${inputClass} resize-y`}
                  />

                  <span className="mt-2 block text-right text-xs font-normal text-slate-400">
                    {form.message.length}/2000 characters
                  </span>
                </label>

                {status && (
                  <div
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800"
                  >
                    <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                    <p>{status}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
                >
                  <Send
                    size={18}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                  Send Message
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Please avoid including passwords or other sensitive
                  account information in your message.
                </p>
              </form>
            </div>
          </section>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
          <Sprout size={17} className="text-emerald-700" />
          <p className="text-sm text-slate-500">
            BizPlan — Helping small businesses manage expenses with clarity.
          </p>
        </div>
      </div>
    </main>
  );
}
