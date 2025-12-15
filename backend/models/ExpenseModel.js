const {model} = require("mongoose");
const expenseSchema = require("../schemas/ExpenseSchema");

module.exports = model("Expense", expenseSchema);
