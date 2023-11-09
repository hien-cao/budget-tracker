const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Budget";
const COLLECTION_NAME = "Budgets";

// Declare the Schema of the Mongo model
const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
      default: "budget",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, budgetSchema);
