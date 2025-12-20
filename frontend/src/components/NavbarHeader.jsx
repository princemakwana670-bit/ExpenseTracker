export default function NavbarHeader({ onAddExpense }) {
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="navbar-brand fw-bold">
        Expense Tracker
      </span>

      <button
        className="btn btn-primary"
        onClick={onAddExpense}
      >
        + Add Expense
      </button>
    </nav>
  );
}
