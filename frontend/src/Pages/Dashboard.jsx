import { useEffect, useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import SummaryCard from "../components/SummaryCard/SummaryCard";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import AddExpenseModal from "../components/AddExpenseModal/AddExpenseModal";
import ExpenseChart from "../components/Charts/ExpenseChart";

const Dashboard = () => {
  const { expenses, addExpense, deleteExpense, totals } = useExpenses();
  const [showModal, setShowModal] = useState(false);

  // open modal when navbar fires event
  useEffect(() => {
    const handler = () => setShowModal(true);
    window.addEventListener("open-add-modal", handler);
    return () => window.removeEventListener("open-add-modal", handler);
  }, []);

  // Produce chart data aggregated by category for last 30 days, simple example
  const chartData = (() => {
    const map = new Map();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);

    for (const e of expenses) {
      const d = new Date(e.date);
      if (d >= cutoff) {
        map.set(e.category, (map.get(e.category) || 0) + Number(e.amount || 0));
      }
    }

    if (map.size === 0) {
      // filler data
      return [
        { label: "Food", amount: 700 },
        { label: "Transport", amount: 200 },
        { label: "Bills", amount: 980 },
        { label: "Shopping", amount: 400 }
      ];
    }

    return Array.from(map.entries()).map(([label, amount]) => ({ label, amount }));
  })();

  return (
    <div className="container">
      {/* Summary */}
      <div className="summary-grid">
        <SummaryCard title="Today" amount={totals.today.amount} transactions={totals.today.count} />
        <SummaryCard title="This Week" amount={totals.week.amount} transactions={totals.week.count} />
        <SummaryCard title="This Month" amount={totals.month.amount} transactions={totals.month.count} />
      </div>

      {/* Main area */}
      <div className="expenses-area">
        <div>
          <h4 className="section-title">Recent Expenses</h4>
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>

        <div>
          <div style={{ marginBottom: 14 }}>
            <h4 className="section-title">Add Quick Expense</h4>
            <button className="btn-modern" onClick={() => setShowModal(true)}>+ Add New</button>
          </div>

          <h5 className="h5 muted">Spending Overview</h5>
          <ExpenseChart data={chartData} />
        </div>
      </div>

      <AddExpenseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={(payload) => {
          addExpense(payload);
        }}
      />
    </div>
  );
};

export default Dashboard;
