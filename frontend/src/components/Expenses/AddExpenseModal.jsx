import { useState } from "react";
import api from "../../api/axios";

export default function AddExpense({ onExpenseAdded }) {
  const [form, setForm] = useState({
    amount: "",
    category: "Food & Dining",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/expense", form, {
        withCredentials: true,
      });

      if (res.data.success) {
        onExpenseAdded(res.data.data); // 🔥 THIS LINE
        setForm({
          amount: "",
          category: "Food & Dining",
          description: "",
          date: "",
        });
      }
    } catch (err) {
      console.error("Add expense failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        className="form-control mb-2"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        name="amount"
        type="number"
        className="form-control mb-2"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />

      <select
        name="category"
        className="form-select mb-2"
        value={form.category}
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
        name="date"
        type="date"
        className="form-control mb-3"
        value={form.date}
        onChange={handleChange}
      />

      <button className="btn btn-primary w-100">
        Add Expense
      </button>
    </form>
  );
}
