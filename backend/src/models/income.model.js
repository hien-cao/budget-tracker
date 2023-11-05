const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = 'Income'
const COLLECTION_NAME = 'Income'

// Declare the Schema of the Mongo model
const incomeSchema = new mongoose.Schema(
  {
    title: {
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
      default: "income",
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, incomeSchema);
