require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Controllers & Middleware
const { Signup, Login } = require("./Controllers/User/AuthController");
const { userVerification } = require("./Middlewares/AuthMiddleware");

// Models
const ExpenseModel = require("./models/ExpenseModel");
const UserModel = require("./models/UsersModel");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/Expense-Tracker";

/* ---------- MIDDLEWARE ---------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ---------- AUTH ROUTES ---------- */
app.post("/signup", Signup);
app.post("/login", Login);

// ✅ LOGOUT ROUTE
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production (HTTPS)
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

/* ---------- EXPENSE ROUTES ---------- */

// Get logged-in user's expenses
app.get("/expense", userVerification, async (req, res) => {
  try {
    const expenses = await ExpenseModel.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

// Create expense
app.post("/expense", userVerification, async (req, res) => {
  try {
    const expense = await ExpenseModel.create({
      ...req.body,
      createdBy: req.user._id,
    });

    await UserModel.findByIdAndUpdate(req.user._id, {
      $push: { expenses: expense._id },
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

// Update expense
app.put("/expense/:id", userVerification, async (req, res) => {
  try {
    const expense = await ExpenseModel.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete expense
app.delete("/expense/:id", userVerification, async (req, res) => {
  try {
    const expense = await ExpenseModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await UserModel.findByIdAndUpdate(req.user._id, {
      $pull: { expenses: expense._id },
    });

    res.json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
});

/* ---------- SERVER ---------- */
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
