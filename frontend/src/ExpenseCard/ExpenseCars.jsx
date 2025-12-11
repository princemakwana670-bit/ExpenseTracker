import "./ExpenseCard.css";

const ExpenseCard = ({ row, onDelete }) => {
  return (
    <div className="expense-row">
      <div>
        <div className="expense-title">{row.title}</div>
        <div className="muted" style={{ fontSize: 12 }}>{row.category} • {row.date}</div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="expense-amount">-₹{row.amount}</div>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(row.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ExpenseCard;
