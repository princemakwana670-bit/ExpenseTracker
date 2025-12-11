import ExpenseCard from "../ExpenseCard/ExpenseCard";

const ExpenseList = ({ expenses, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return <div className="empty glass-card">No expenses yet. Add your first expense!</div>;
  }

  return (
    <div className="expense-list">
      {expenses.map(e => (
        <ExpenseCard key={e.id} row={e} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ExpenseList;
