const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Expense";
const COLLECTION_NAME = "Expense";

// Declare the Schema of the Mongo model
const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Budget",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    type: {
      type: String,
      default: "expense",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, expenseSchema);
