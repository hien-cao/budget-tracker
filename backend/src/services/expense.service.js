const { BadRequestError } = require("../core/error.response");
const expenseSchema = require("../models/expense.model");
const { getInfoData } = require("../utils");

class ExpenseService {
  static addExpense = async ({ name, amount, date }) => {
    if (!name || !amount) {
      throw new BadRequestError("All fields are required");
    }
    if (amount <= 0) {
      throw new BadRequestError("Amount is invalid");
    }
    const expense = await expenseSchema.create({
      name,
      amount,
      date,
    });
    return getInfoData({
      fields: ["_id", "name", "amount", "type"],
      object: expense,
    });
  };

  static getExpenses = async () => {
    const expenses = await expenseSchema.find().sort({ createdAt: -1 }).lean();
    return expenses.map((expense) =>
      getInfoData({
        fields: ["_id", "name", "amount", "type"],
        object: expense,
      })
    );
  };

  static deleteExpense = async (id) => {
    const expense = await expenseSchema.findByIdAndDelete(id).lean();
    return getInfoData({
      fields: ["_id", "name", "amount", "type"],
      object: expense,
    });
  };
}

module.exports = ExpenseService;
