import { useMemo, useState } from "react";
import NavbarHeader from "../components/NavbarHeader";
import SummaryCard from "../components/SummaryCard";
import ExpenseList from "../components/ExpenseList";
import CategoryChart from "../components/CategoryChart";

/* sample/dummy data matching screenshot style */
const seedExpenses = [
  {
    id: 1,
    title: "Shoes",
    category: "Food & Dining",
    amount: 800,
    date: "2025-12-11",
  },
  {
    id: 2,
    title: "Vadapav",
    category: "Food & Dining",
    amount: 30,
    date: "2025-12-11",
  },
  {
    id: 3,
    title: "Samosa",
    category: "Food & Dining",
    amount: 50,
    date: "2025-12-11",
  },
  {
    id: 4,
    title: "Vacation",
    category: "Food & Dining",
    amount: 550,
    date: "2025-12-11",
  },
  {
    id: 5,
    title: "Dubai",
    category: "Transport",
    amount: 1000,
    date: "2025-12-01",
  },
  {
    id: 6,
    title: "Burger and Pizza",
    category: "Food & Dining",
    amount: 50,
    date: "2025-12-01",
  },
];

export default function Dashboard() {
  const [expenses, setExpenses] = useState(seedExpenses);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesQuery = e.title.toLowerCase().includes(query.toLowerCase());
      const matchesCat =
        categoryFilter === "All Categories" || e.category === categoryFilter;
      return matchesQuery && matchesCat;
    });
  }, [expenses, query, categoryFilter]);

  const totals = useMemo(() => {
    const monthTotal = expenses.reduce((s, e) => s + e.amount, 0);
    const weekTotal = 1430; // just placeholder like screenshot (or calculate by date)
    return {
      month: monthTotal,
      week: weekTotal,
      topCategory: "Food & Dining",
      topAmount: 1480,
    };
  }, [expenses]);

  // group by date (descending)
  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((e) => {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    });
    // convert to array and sort by date desc
    return Array.from(map.entries()).sort(
      (a, b) => new Date(b[0]) - new Date(a[0])
    );
  }, [filtered]);

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="app-container">
      <NavbarHeader />

      <div className="summary-row">
        <div className="summary-card">
          <small className="text-muted">This Month</small>
          <div className="stat-amount">
            $
            {totals.month.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="stat-sub">6 transactions</div>
        </div>

        <div className="summary-card">
          <small className="text-muted">This Week</small>
          <div className="stat-amount">
            $
            {totals.week.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="stat-sub">Daily avg: $204.29</div>
        </div>

        <div className="summary-card">
          <small className="text-muted">Top Category</small>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700 }}>Food & Dining</div>
              <div className="stat-sub">
                ${totals.topAmount.toFixed(2)} spent
              </div>
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                background: "#fff7e6",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 20 }}>🍕</span>
            </div>
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div>
          <div className="recent-header">
            <h5>Recent Expenses</h5> <br />

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div className="search-row">
                <input
                  className="form-control form-control-sm"
                  style={{ width: 320 }}
                  placeholder="Search expenses..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <select
                className="form-select form-select-sm"
                style={{ width: 160 }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All Categories</option>
                <option>Food & Dining</option>
                <option>Transport</option>
                <option>Bills</option>
                <option>Shopping</option>
              </select>
            </div>
          </div>

          {/* groups */}
          {grouped.map(([date, items]) => (
            <div key={date}>
              <div className="group-date">
                <div>
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="muted">
                  ${items.reduce((s, i) => s + i.amount, 0).toLocaleString()}
                </div>
              </div>

              {items.map((it) => (
                <div key={it.id} className="expense-item">
                  <div className="expense-left">
                    <div className="expense-icon">
                      {it.category.includes("Food") ? "🍕" : "🚗"}
                    </div>
                    <div className="expense-meta">
                      <div className="expense-title">{it.title}</div>
                      <div className="expense-cat">{it.category}</div>
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div className="expense-amount">
                      -${it.amount.toFixed(2)}
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => deleteExpense(it.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div>
          <div className="right-card">
            <h6 className="section-title">Spending by Category</h6>
            <CategoryChart expenses={expenses} />
          </div>
        </div>
      </div>

      <div className="footer">
        Built with care. Track wisely, spend smarter.
      </div>
    </div>
  );
}
