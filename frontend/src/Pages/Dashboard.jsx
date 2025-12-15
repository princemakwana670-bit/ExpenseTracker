import { useEffect, useMemo, useState } from "react";
import NavbarHeader from "../components/NavbarHeader";
import CategoryChart from "../components/CategoryChart";
import axios from "axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // 🔹 Fetch expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/expense");

        // Normalize backend data for frontend
        const formatted = res.data.map((item) => ({
          id: item._id,
          title: item.description,
          amount: item.amount,
          category: item.category,
          date: item.date || new Date().toISOString().split("T")[0],
        }));

        setExpenses(formatted);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  // 🔹 Filter logic
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchesQuery = e.title
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesCat =
        categoryFilter === "All Categories" ||
        e.category === categoryFilter;

      return matchesQuery && matchesCat;
    });
  }, [expenses, query, categoryFilter]);

  // 🔹 Totals
  const totals = useMemo(() => {
    const monthTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      month: monthTotal,
      week: Math.round(monthTotal / 4), // simple demo logic
      topCategory: "Food & Dining",
      topAmount: expenses
        .filter((e) => e.category === "Food & Dining")
        .reduce((s, e) => s + e.amount, 0),
    };
  }, [expenses]);

  // 🔹 Group by date
  const grouped = useMemo(() => {
    const map = new Map();

    filtered.forEach((e) => {
      if (!map.has(e.date)) map.set(e.date, []);
      map.get(e.date).push(e);
    });

    return Array.from(map.entries()).sort(
      (a, b) => new Date(b[0]) - new Date(a[0])
    );
  }, [filtered]);

  // 🔹 Delete (frontend only)
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="app-container">
      <NavbarHeader />

      {/* SUMMARY CARDS */}
      <div className="summary-row">
        <div className="summary-card">
          <small className="text-muted">This Month</small>
          <div className="stat-amount">₹{totals.month.toFixed(2)}</div>
          <div className="stat-sub">{expenses.length} transactions</div>
        </div>

        <div className="summary-card">
          <small className="text-muted">This Week</small>
          <div className="stat-amount">₹{totals.week.toFixed(2)}</div>
          <div className="stat-sub">Estimated</div>
        </div>

        <div className="summary-card">
          <small className="text-muted">Top Category</small>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{totals.topCategory}</strong>
              <div className="stat-sub">
                ₹{totals.topAmount.toFixed(2)} spent
              </div>
            </div>
            <div className="expense-icon">🍕</div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="main-grid">
        <div>
          <div className="recent-header">
            <h5>Recent Expenses</h5>

            <div className="d-flex gap-2">
              <input
                className="form-control form-control-sm"
                placeholder="Search expenses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <select
                className="form-select form-select-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option>All Categories</option>
                <option>Food & Dining</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Bills & Utilliities</option>
                <option>Health</option>
                <option>Education</option>
                <option>Entertainment</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* GROUPED EXPENSES */}
          {grouped.map(([date, items]) => (
            <div key={date}>
              <div className="group-date">
                <span>
                  {new Date(date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>
                  ₹{items.reduce((s, i) => s + i.amount, 0)}
                </span>
              </div>

              {items.map((it) => (
                <div key={it.id} className="expense-item">
                  <div className="expense-left">
                    <div className="expense-icon">
                      {it.category.includes("Food") ? "🍔" : "💳"}
                    </div>
                    <div className="expense-meta">
                      <div className="expense-title">{it.title}</div>
                      <div className="expense-cat">{it.category}</div>
                    </div>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <div className="expense-amount">-₹{it.amount}</div>
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
            <h6>Spending by Category</h6>
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
