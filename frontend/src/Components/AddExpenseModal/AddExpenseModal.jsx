import { useState, useEffect } from "react";
import "./AddExpenseModal.css";

const overlayStyle = {
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(10,12,20,0.25)",
  zIndex: 1600
};

const AddExpenseModal = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");

  useEffect(() => {
    if (!show) {
      setTitle("");
      setAmount("");
      setCategory("General");
    }
  }, [show]);

  if (!show) return null;

  const submit = (e) => {
    e.preventDefault();
    if (!title || !amount) return alert("Enter title and amount");
    onAdd({
      title,
      amount: Number(amount),
      category,
      date: new Date().toISOString().slice(0,10) // yyyy-mm-dd
    });
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <form className="glass-card" style={{ width: 420 }} onSubmit={submit}>
        <h5 className="section-title">Add New Expense</h5>

        <label className="muted">Title</label>
        <input className="form-control mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="muted">Amount</label>
        <input className="form-control mb-2" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <label className="muted">Category</label>
        <input className="form-control mb-3" value={category} onChange={(e) => setCategory(e.target.value)} />

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-modern" type="submit">Add</button>
          <button className="btn btn-light" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseModal;
