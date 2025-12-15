const {Schema} = require("mongoose");

const expenseSchema = new Schema({
    amount: {
        type: Number,
        require: true,
        min: 1
    },

    category: {
        type: String,
        require: true,
        enum: ["Food & Dining", "Transport", "Entertainment", "Shopping", "Bills & Utilliities", "Health", "Education", "Other"]
    },
    
    description: {
        type: String,
        require: true
    },

    date: {
        type: String,
        require: true
    }
});

module.exports = expenseSchema;