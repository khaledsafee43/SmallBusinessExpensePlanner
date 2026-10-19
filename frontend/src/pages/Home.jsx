import {
  ChartNoAxesCombinedIcon,
  PlusIcon,
  ReceiptIcon,
  WalletCardsIcon,
  WalletIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {NavLink} from "react-router-dom"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import HeroSection from "../components/hero";
export default function Home() {
  const [dashboard, setDashboard] = useState({
    totalExpenses: 0,
    categoryData: [],
    monthlyData: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/expenses/dashboard",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard");
        }

        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const { totalExpenses, categoryData, monthlyData } = dashboard;

  const categoryColors = [
    "#07845B",
    "#EF4444",
    "#3B82F6",
    "#F59E0B",
    "#8585C5",
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-8">
        <div className="pb-3">
          <h1 className="text-emerald-950 font-bold text-4xl p-2 mb-2">
            Small Business Expense Planner
          </h1>
          <p className="p-4 font-normal text-xl/normal">
            Track your income, manage your expenses, and stay within your
            budget.
          </p>
          <NavLink to="/expenses" className="flex rounded-lg bg-[#07845B] px-4 py-2 w-40 text-white hover:bg-[#066B4A]">
            <PlusIcon />
            Add Expense
          </NavLink>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-2">
          <div className="bg-[#F0FDF4] flex items-center gap-2 shadow-md p-6 rounded-md">
            <div className="bg-emerald-400/40 p-2 rounded-full">
              <WalletIcon className="text-emerald-950" size={24} />
            </div>
            <div>
              <span>Total Income</span>
              <h1>
                $
                {totalExpenses.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </div>
          </div>
          <div className="bg-[#FFF5F5] flex items-center gap-2 shadow-md p-6 rounded-md">
            <div className="bg-red-600/30 p-2 rounded-full">
              <ReceiptIcon className="text-red-950" size={24} />
            </div>
            <div>
              <span>Total Expenses</span>
              <h1>
                $
                {totalExpenses.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </div>
          </div>
          <div className="bg-[#EFF6FF] flex items-center gap-2 shadow-md p-6 rounded-md">
            <div className="bg-blue-600/30 p-2 rounded-full">
              <WalletCardsIcon className="text-blue-950" size={24} />
            </div>
            <div>
              <span>Remaining Balance</span>
              <h1>
                $
                {totalExpenses.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </div>
          </div>
          <div className="bg-[#FFFBEB] flex items-center gap-2 shadow-md p-6 rounded-md">
            <div className="bg-amber-600/30 p-2 rounded-full">
              <ChartNoAxesCombinedIcon className="text-amber-950" size={24} />
            </div>
            <div>
              <span>Budget Used</span>
              <h1>
                $
                {totalExpenses.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
        <div className="bg-white p-4 shadow-md rounded-xl">
          <div className="h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{ top: 12, right: 8, left: -12, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#07845B" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#07845B" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#E8EEF2" vertical />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  axisLine={{ stroke: "#CBD5E1" }}
                  tickLine={false}
                />

                <YAxis
                  domain={[0, 5000]}
                  ticks={[0, 1000, 2000, 3000, 4000, 5000]}
                  tickFormatter={(value) =>
                    value === 0 ? "0" : `${value / 1000}K`
                  }
                  tick={{ fontSize: 11, fill: "#64748B" }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid #E2E8F0",
                    fontSize: 12,
                  }}
                />

                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 11, paddingBottom: 12 }}
                />

                <Line
                  name="Income"
                  type="monotone"
                  dataKey="income"
                  stroke="#07845B"
                  strokeWidth={2.5}
                  dot={{
                    r: 3,
                    fill: "#07845B",
                    stroke: "#FFFFFF",
                    strokeWidth: 1.5,
                  }}
                  activeDot={{ r: 5 }}
                  fill="url(#incomeGradient)"
                />

                <Line
                  name="Expenses"
                  type="monotone"
                  dataKey="expenses"
                  stroke="#FF6B70"
                  strokeWidth={2.5}
                  dot={{
                    r: 3,
                    fill: "#FF6B70",
                    stroke: "#FFFFFF",
                    strokeWidth: 1.5,
                  }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-4 shadow-md rounded-xl">
          <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_1fr]">
            <div className="relative h-[210px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={43}
                    outerRadius={68}
                    paddingAngle={0}
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={categoryColors[index]} />
                    ))}
                  </Pie>

                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-[#16313A]">$2,350</span>
                <span className="text-xs text-slate-500">Total</span>
              </div>
            </div>

            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: categoryColors[index] }}
                    />
                    <span className="text-slate-600">{item.name}</span>
                  </div>

                  <span className="font-medium text-slate-600">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
