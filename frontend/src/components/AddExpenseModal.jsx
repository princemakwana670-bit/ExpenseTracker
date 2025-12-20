import { useState } from "react";
import api from "../api/axios";

export default function AddExpenseModal({ onClose, onExpenseAdded }) {
  const [form, setForm] = useState({
    amount: "",
    category: "Food & Dining",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/expense", form);
      onExpenseAdded(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-card">
        <h5 className="mb-3">Add Expense</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            type="number"
            name="amount"
            placeholder="Amount"
            required
            onChange={handleChange}
          />

          <select
            className="form-select mb-2"
            name="category"
            onChange={handleChange}
          >
            <option>Food & Dining</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Bills & Utilliities</option>
            <option>Health</option>
            <option>Education</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>

          <input
            className="form-control mb-2"
            name="description"
            placeholder="Description"
            required
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
