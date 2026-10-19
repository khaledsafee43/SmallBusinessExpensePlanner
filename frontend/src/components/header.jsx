import { NavLink } from "react-router-dom";
import {
  SearchIcon,
  User2Icon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Expenses", path: "/expenses" },
    { name: "Budget", path: "/budget" },
    { name: "Manage Expenses", path: "/manage-Expenses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkStyle = ({ isActive }) =>
    `block whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
      isActive
        ? "bg-emerald-600 text-white font-semibold"
        : "text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#063F3A] shadow-md">
      <div className="mx-auto flex min-h-16 w-full items-center justify-between gap-2 px-3 py-2 sm:px-5 lg:px-6">

        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="/BizPlanFinanceGrowthLogo.png"
            alt="BizPlan logo"
            className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11"
          />

          <h1 className="text-lg font-bold text-white sm:text-xl lg:text-2xl">
            Biz<span className="text-[#04926e]">Plan</span>
          </h1>
        </NavLink>

        {/* Desktop and Tablet Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Search, Profile and Mobile Menu */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">

          {/* Search */}
          <div className="flex items-center gap-1">
            {show && (
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search"
                className="w-24 rounded-lg bg-white px-2 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-emerald-500 sm:w-36 md:w-44"
              />
            )}

            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "Close search" : "Open search"}
              className="rounded-lg p-2 text-white transition hover:bg-emerald-800"
            >
              {show ? (
                <XIcon size={21} />
              ) : (
                <SearchIcon size={21} />
              )}
            </button>
          </div>

          {/* Profile */}
          <button
            type="button"
            aria-label="User profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-emerald-700 transition hover:bg-white sm:h-10 sm:w-10"
          >
            <User2Icon size={21} />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="rounded-lg p-2 text-white transition hover:bg-emerald-800 lg:hidden"
          >
            {menuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-emerald-800 bg-[#063F3A] px-3 py-3 lg:hidden sm:px-5">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

