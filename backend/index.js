require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const url = "mongodb://localhost:27017/ExpenseTracker";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {Signup, Login} = require("./Controllers/User/AuthController");
const {userVerification} = require("./Middlewares/AuthMiddleware");
const Resource = require("./models/ResourceModel")

app.use(express.urlencoded({extended: true}));
app.use(express.json());  
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h2>Welcome, to Expense Tracker");
});

app.post("/signup", Signup);

app.post("/login", Login);

//  Create Route
app.post("/resource", userVerification, async (req, res) => {
  try {
    const resource = await Resource.create({
      ...req.body,
      createdBy: req.user._id,  // Link to logged-in user
    });
    
    res.status(201).json({ success: true, data: resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
})

// Index Route
app.get("/resource", userVerification, async (req, res) => {
  try {
    const resources = await Resource.find({ createdBy: req.user._id });
    if(!resources) {
      req.json({success: true, message: "Resources not found" })
    }
    res.json({ success: true, data: resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})

// Show Route
app.get("/resource/:id", userVerification, async (req, res) => {
  try {
    const resource = await Resource.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!resource)
      return res.status(404).json({ message: "Resource not found" });

    res.json({ success: true, data: resource });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
})

// Update Route
app.put("/resource/:id", userVerification, async (req, res) => {
  try {
    const resource = await Resource.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user._id,
      },
      req.body,
      { new: true }
    );
    if (!resource)
      return res.status(404).json({ message: "Resource not found" });

    res.json({ success: true, data: resource });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
)

// Destory Route
app.delete("/resource/:id", userVerification, async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!resource)
      return res.status(404).json({ message: "Resource not found" });

    res.json({ success: true, message: "Resource deleted successfully" });
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

