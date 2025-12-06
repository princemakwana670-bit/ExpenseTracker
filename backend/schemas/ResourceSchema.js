const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    category: {
      type: String,
      enum: ["food", "travel", "shopping", "bills", "health", "other"],
      default: "other",
    },

    status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "paid",
    },

    amount: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
);


module.exports = {ResourceSchema};