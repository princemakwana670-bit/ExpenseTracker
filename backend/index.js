require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const url = "mongodb://localhost:27017/Expense-Tracker";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {Signup, Login} = require("./Controllers/User/AuthController");
const {userVerification} = require("./Middlewares/AuthMiddleware");
const ExpenseModel = require("./models/ExpenseModel")
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());  
app.use(cookieParser());


app.post("/signup", Signup);

app.post("/login", Login);

app.get("/expense", async (req, res) => {
  let expenses = await ExpenseModel.find({});
  res.status(200).json(expenses);
})

//  Create Route
app.post("/expense", userVerification, async (req, res) => {
  try {
    const expense = await ExpenseModel.create({
      ...req.body,
      createdBy: req.user._id,  // Link to logged-in user
    });
    
    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
})

// Index Route
// app.get("/expense", userVerification, async (req, res) => {
//   try {
//     const expenses = await ExpenseModel.find({ createdBy: req.user._id });
//     if(!expenses) {
//       req.json({success: true, message: "expenses not found" })
//     }
//     res.json({ success: true, data: expenses });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// })

// Show Route
app.get("/expense/:id", userVerification, async (req, res) => {
  try {
    const expense = await ExpenseModel.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!expense)
      return res.status(404).json({ message: "expense not found" });

    res.json({ success: true, data: expense });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})

// Update Route
app.put("/expense/:id", userVerification, async (req, res) => {
  try {
    const expense = await ExpenseModel.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      req.body,
      { new: true }
    );
    if (!expense)
      return res.status(404).json({ message: "expense not found" });

    res.json({ success: true, data: expense });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
)

// Destory Route
app.delete("/expense/:id", userVerification, async (req, res) => {
  try {
    const expense = await ExpenseModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!expense)
      return res.status(404).json({ message: "expense not found" });

    res.json({ success: true, message: "expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
)

app.listen(PORT, () => {
  console.log("app is listening on port 3000");
  mongoose.connect(url).then(() => {
    console.log("Database connected");
  });
});

