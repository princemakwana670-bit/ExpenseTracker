import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage("expenses_v1", [
    // sample seed data
    { id: 1, title: "Groceries", amount: 650, category: "Food", date: "2025-11-28" },
    { id: 2, title: "Bus Pass", amount: 120, category: "Transport", date: "2025-12-01" },
    { id: 3, title: "Electricity Bill", amount: 980, category: "Bills", date: "2025-12-03" }
  ]);

  const addExpense = (payload) => {
    setExpenses(prev => [{ id: Date.now(), ...payload }, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // derived totals for today/week/month
  const totals = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Sunday as start
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const toDate = (d) => {
      // accept either yyyy-mm-dd or locale string - try to parse
      return new Date(d);
    };

    const filterAndSum = (startDate) => {
      const filtered = expenses.filter(e => toDate(e.date) >= startDate);
      const amount = filtered.reduce((s, x) => s + Number(x.amount || 0), 0);
      return { count: filtered.length, amount };
    };

    return {
      today: filterAndSum(startOfToday),
      week: filterAndSum(startOfWeek),
      month: filterAndSum(startOfMonth),
    };
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, totals }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
