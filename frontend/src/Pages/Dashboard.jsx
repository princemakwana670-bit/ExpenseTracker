import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHeader from "../components/NavbarHeader";
import AddExpenseModal from "../components/AddExpenseModal";
import CategoryChart from "../components/CategoryChart";
import api from "../api/axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH EXPENSES ================= */
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data } = await api.get("/expense");

        const formatted = data.map((item) => ({
          id: item._id,
          title: item.description,
          amount: item.amount,
          category: item.category,
          date: item.date,
        }));

        setExpenses(formatted);
      } catch (err) {
        console.error("Failed to fetch expenses", err);
        navigate("/login");
      }
    };

    fetchExpenses();
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  /* ================= ADD EXPENSE ================= */
  const handleExpenseAdded = (expense) => {
    const formatted = {
      id: expense._id,
      title: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    };

    setExpenses((prev) => [formatted, ...prev]);
    setShowAddModal(false);
  };

  /* ================= DELETE ================= */
  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expense/${id}`);
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* ================= FILTER ================= */
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

  /* ================= TOTALS ================= */
  const totals = useMemo(() => {
    const monthTotal = expenses.reduce((s, e) => s + e.amount, 0);

    return {
      month: monthTotal,
      week: Math.round(monthTotal / 4),
      count: expenses.length,
    };
  }, [expenses]);

  /* ================= GROUP BY DATE ================= */
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

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <NavbarHeader onAddExpense={() => setShowAddModal(true)} />

      {/* LOGOUT BUTTON */}
      <div className="d-flex justify-content-end p-2">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>

      {/* ADD EXPENSE MODAL */}
      {showAddModal && (
        <AddExpenseModal
          onClose={() => setShowAddModal(false)}
          onExpenseAdded={handleExpenseAdded}
        />
      )}

      {/* SUMMARY */}
      <div className="summary-row">
        <div className="summary-card">
          <small>This Month</small>
          <div className="stat-amount">₹{totals.month}</div>
          <div className="stat-sub">{totals.count} transactions</div>
        </div>

        <div className="summary-card">
          <small>This Week</small>
          <div className="stat-amount">₹{totals.week}</div>
          <div className="stat-sub">Estimated</div>
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
                placeholder="Search..."
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

          {grouped.map(([date, items]) => (
            <div key={date}>
              <div className="group-date">
                <span>{new Date(date).toDateString()}</span>
                <span>₹{items.reduce((s, i) => s + i.amount, 0)}</span>
              </div>

              {items.map((it) => (
                <div key={it.id} className="expense-item">
                  <div>
                    <strong>{it.title}</strong>
                    <div className="text-muted">{it.category}</div>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <div>-₹{it.amount}</div>
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
