const { BadRequestError } = require("../core/error.response");
const expenseSchema = require("../models/expense.model");
const { getInfoData } = require("../utils");
const { Types } = require("mongoose");

class ExpenseService {
  static addExpense = async ({ userId, budgetId, name, amount }) => {
    if (!name || !amount) {
      throw new BadRequestError("All fields are required");
    }
    if (amount <= 0) {
      throw new BadRequestError("Amount is invalid");
    }
    const expense = await expenseSchema.create({
      user: userId,
      budget: budgetId,
      name,
      amount,
    });
    return getInfoData({
      fields: ["_id", "budget", "name", "amount", "type"],
      object: expense,
    });
  };

  static getExpenses = async (userId) => {
    const expenses = await expenseSchema
      .find({ user: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean();
    return expenses.map((expense) =>
      getInfoData({
        fields: ["_id", "budget", "name", "amount", "type"],
        object: expense,
      })
    );
  };

  static deleteExpense = async (userId, id) => {
    //const expense = await expenseSchema.findByIdAndDelete(id).lean();
    const expense = await expenseSchema.findOneAndDelete({
      _id: new Types.ObjectId(id),
      user: new Types.ObjectId(userId),
    });
    return getInfoData({
      fields: ["_id", "budget", "name", "amount", "type"],
      object: expense,
    });
  };

  static deleteExpenses = async (budgetId) => {
    const expenses = await expenseSchema.deleteMany({
      budget: new Types.ObjectId(budgetId),
    });
    return expenses.map((expense) =>
      getInfoData({
        fields: ["_id", "budget", "name", "amount", "type"],
        object: expense,
      })
    );
  };
}

module.exports = ExpenseService;
