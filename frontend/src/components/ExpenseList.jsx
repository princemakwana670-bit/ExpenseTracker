export default function ExpenseList({ items, onDelete }) {
  if (!items.length) return <div className="empty">No expenses yet.</div>;

  return (
    <div>
      {items.map(it => (
        <div className="expense-item" key={it.id}>
          <div className="expense-left">
            <div className="expense-icon">{ it.category.includes("Food") ? "🍕" : "🚗" }</div>
            <div className="expense-meta">
              <div className="expense-title">{it.title}</div>
              <div className="expense-cat">{it.category}</div>
            </div>
          </div>
          <div className="expense-amount">-${it.amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
