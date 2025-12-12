import AddExpenseModal from "./Expenses/AddExpenseModal";

function Navbar() {
  return (
    <nav className="navbar bg-light px-3">
      <h3 className="navbar-brand text-primary">Expense Tracker</h3>

      <AddExpenseModal />
    </nav>
  );
}

export default Navbar;
