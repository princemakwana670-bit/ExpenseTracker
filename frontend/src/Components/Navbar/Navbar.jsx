import React from "react";
import "./Navbar.css";

const Navbar = ({ onAdd }) => {
  return (
    <header className="app-navbar container">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>💸 ExpenseTracker</div>
        <div className="muted" style={{ fontSize: 13 }}>Modern dashboard</div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-modern" onClick={() => {
          // emit DOM event for opening modal (handled inside Dashboard)
          const ev = new CustomEvent("open-add-modal");
          window.dispatchEvent(ev);
        }}>+ Add Expense</button>
      </div>
    </header>
  );
};

export default Navbar;
