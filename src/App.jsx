import { useMemo } from 'react'
import {
  FiBarChart2,
  FiBell,
  FiFileText,
  FiGrid,
  FiSearch,
  FiSettings,
  FiTrendingDown,
  FiTrendingUp,
  FiChevronRight,
} from 'react-icons/fi'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
)

const kpis = [
  {
    label: 'Total Revenue',
    value: '$48,295',
    change: '+12.4%',
    trend: 'up',
  },
  {
    label: 'Total Orders',
    value: '1,284',
    change: '+5.1%',
    trend: 'up',
  },
  {
    label: 'Active Customers',
    value: '892',
    change: '+3.6%',
    trend: 'up',
  },
  {
    label: 'Average Order Value',
    value: '$37.6',
    change: '-1.2%',
    trend: 'down',
  },
]

const recentOrders = [
  {
    id: 'INV-2048',
    date: '2026-02-25',
    customer: 'Acme Retail Co.',
    amount: 1298.5,
    status: 'Paid',
  },
  {
    id: 'INV-2047',
    date: '2026-02-24',
    customer: 'Northwind Traders',
    amount: 842.1,
    status: 'Pending',
  },
  {
    id: 'INV-2046',
    date: '2026-02-24',
    customer: 'Lighthouse Apparel',
    amount: 367.2,
    status: 'Cancelled',
  },
  {
    id: 'INV-2045',
    date: '2026-02-23',
    customer: 'Bluewater Foods',
    amount: 2154.0,
    status: 'Paid',
  },
  {
    id: 'INV-2044',
    date: '2026-02-22',
    customer: 'Summit Gear',
    amount: 654.75,
    status: 'Paid',
  },
  {
    id: 'INV-2043',
    date: '2026-02-21',
    customer: 'Urban Kitchen',
    amount: 489.9,
    status: 'Pending',
  },
]

const statusStyles = {
  Paid: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
  Pending: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
  Cancelled: 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20',
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1,
  }).format(value)
}

function App() {
  const todayLabel = useMemo(() => {
    const today = new Date()
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }, [])

  const dailyRevenueData = useMemo(() => {
    const labels = [
      '1',
      '3',
      '5',
      '7',
      '9',
      '11',
      '13',
      '15',
      '17',
      '19',
      '21',
      '23',
      '25',
      '27',
    ]

    const data = [
      1420, 1860, 1725, 2310, 1950, 2480, 2635, 2210, 2380, 2540, 2475, 2690,
      2830, 2915,
    ]

    return {
      labels,
      datasets: [
        {
          label: 'Daily revenue',
          data,
          backgroundColor: 'rgba(45, 106, 79, 0.9)',
          hoverBackgroundColor: 'rgba(45, 106, 79, 1)',
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    }
  }, [])

  const dailyRevenueOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#64748b',
          },
        },
        y: {
          grid: {
            color: '#e2e8f0',
          },
          ticks: {
            color: '#64748b',
            callback: (value) => `$${value / 1000}k`,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (ctx) => formatCurrency(ctx.parsed.y),
          },
        },
      },
    }),
    [],
  )

  const customersData = useMemo(() => {
    const labels = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']
    const data = [540, 620, 710, 790, 860, 940]

    return {
      labels,
      datasets: [
        {
          label: 'Active customers',
          data,
          borderColor: '#2D6A4F',
          backgroundColor: 'rgba(45, 106, 79, 0.12)',
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 5,
          tension: 0.4,
        },
      ],
    }
  }, [])

  const customersOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#64748b',
          },
        },
        y: {
          grid: {
            color: '#e2e8f0',
          },
          ticks: {
            color: '#64748b',
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    }),
    [],
  )

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="flex w-20 md:w-64 flex-col bg-[#1A2B2A] text-slate-100">
        <div className="flex items-center gap-2 px-4 md:px-6 pt-6 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2D6A4F] text-sm font-semibold">
            BF
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              BizFlow
            </span>
            <span className="text-xs text-emerald-100/70">
              Business Analytics
            </span>
          </div>
        </div>

        <nav className="mt-4 flex-1 space-y-1.5 px-2 md:px-4">
          <SidebarItem
            icon={FiGrid}
            label="Dashboard"
            active
          />
          <SidebarItem
            icon={FiBarChart2}
            label="Analytics"
          />
          <SidebarItem
            icon={FiFileText}
            label="Reports"
          />
          <SidebarItem
            icon={FiSettings}
            label="Settings"
          />
        </nav>

        <div className="mt-auto border-t border-white/10 px-4 md:px-6 py-4 text-xs text-emerald-100/60 hidden md:block">
          <div className="font-medium text-emerald-50">Workspace health</div>
          <p className="mt-1">
            Revenue and customer metrics are updated in real time.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex min-h-screen flex-1 flex-col bg-slate-50">
        {/* Top header */}
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 backdrop-blur">
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">
              Overview
            </span>
            <span className="mt-1 text-sm text-slate-500">{todayLabel}</span>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
            <div className="hidden md:flex flex-1 max-w-md items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 focus-within:ring-2 focus-within:ring-emerald-500/60">
              <FiSearch className="mr-2 h-4 w-4 text-slate-400" />
              <input
                type="search"
                placeholder="Search metrics, customers, or orders"
                className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-emerald-700 hover:border-emerald-200"
            >
              <FiBell className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1.5">
              <div className="h-8 w-8 rounded-full bg-[#2D6A4F] text-xs font-semibold text-white flex items-center justify-center">
                BJ
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-medium text-slate-900">
                  BizFlow Admin
                </span>
                <span className="text-[11px] text-slate-500">
                  admin@bizflow.io
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7 space-y-6">
          {/* Page title + quick filter */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                Business performance
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track revenue, order volume, and customer growth at a glance.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Last 30 days
              </button>
              <button
                type="button"
                className="hidden sm:inline-flex items-center rounded-full bg-[#2D6A4F] px-3.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-[#24533d]"
              >
                Export report
              </button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                      {kpi.label}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {kpi.value}
                    </p>
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      kpi.trend === 'up'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {kpi.trend === 'up' ? (
                      <FiTrendingUp className="mr-1.5 h-3.5 w-3.5" />
                    ) : (
                      <FiTrendingDown className="mr-1.5 h-3.5 w-3.5" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-slate-500">
                  vs. previous month
                </p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Daily revenue
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Performance for the current month
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  +18.3% vs last month
                </span>
              </div>
              <div className="h-60 sm:h-72">
                <Bar
                  data={dailyRevenueData}
                  options={dailyRevenueOptions}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm sm:px-5 sm:py-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Customer growth
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Active customers over the last 6 months
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  Steady upward trend
                </span>
              </div>
              <div className="h-60">
                <Line
                  data={customersData}
                  options={customersOptions}
                />
              </div>
            </div>
          </div>

          {/* Recent orders table */}
          <div className="rounded-2xl border border-slate-100 bg-white px-3 py-4 shadow-sm sm:px-5 sm:py-5">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Recent orders
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Latest transactions across your online channels
                </p>
              </div>
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#2D6A4F] hover:text-[#24533d]"
              >
                View all
                <FiChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.12em] text-slate-500">
                    <th className="py-2 pr-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Customer</th>
                    <th className="py-2 px-4 text-right">Amount</th>
                    <th className="py-2 pl-4 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/60"
                    >
                      <td className="whitespace-nowrap py-3 pr-4 text-xs text-slate-600">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="max-w-xs py-3 px-4 text-sm font-medium text-slate-900">
                        <div className="truncate">{order.customer}</div>
                        <div className="mt-0.5 text-xs text-slate-500">
                          {order.id}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-3 px-4 text-right text-sm font-medium text-slate-900">
                        {formatCurrency(order.amount)}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-4 pr-2 text-right">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            statusStyles[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function SidebarItem({ icon: Icon, label, active = false }) {
  return (
    <button
      type="button"
      className={`group flex w-full items-center justify-center md:justify-start gap-3 rounded-2xl px-3 py-2.5 text-xs md:text-sm font-medium transition-colors ${
        active
          ? 'bg-white/10 text-white'
          : 'text-emerald-100/80 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden md:inline">{label}</span>
    </button>
  )
}

export default App
