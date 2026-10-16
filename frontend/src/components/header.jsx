import { NavLink } from "react-router-dom";
import { SearchIcon, User2Icon } from "lucide-react";
import { useState } from "react";
export default function Header() {
  const [show, setShow] = useState(false);
  return (
    <header className="bg-[#063F3A] sticky top-0 left-0 right-0 z-10 flex items-center justify-between px-3.5">
      <div className="flex items-center gap-1 p-2">
        <img
          src="BizPlanFinanceGrowthLogo.png"
          className="w-12 h-12 rounded-full"
          alt="logo png"
        />
        <h1 className="text-white font-bold text-2xl">
          Biz<span className="text-[#04926e]">Plane</span>
        </h1>
      </div>
      <nav className="flex gap-2 items-center text-white">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-emerald-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-emerald-700 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Expenses
        </NavLink>
        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-emerald-700 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Budget
        </NavLink>
        <NavLink
          to="/manage-Expenses"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-emerald-700 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Manage Expenses
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-emerald-700 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-emerald-700 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-emerald-50 hover:text-emerald-700"
            }`
          }
        >
          Contact
        </NavLink>
      </nav>
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          {show && (
            <input
              type="search"
              className="bg-slate-300 py-1 outline-none border-none rounded-2xl px-2"
            />
          )}
          <button
            onClick={() => setShow(!show)}
            className="text-slate-300 font-bold text-2xl cursor-pointer"
          >
            <SearchIcon />
          </button>
        </div>
        <User2Icon className="bg-slate-200 h-10 w-10 rounded-full text-emerald-600 font-bold p-3" />
      </div>
    </header>
  );
}
