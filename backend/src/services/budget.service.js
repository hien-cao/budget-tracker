const { BadRequestError } = require("../core/error.response");
const budgetSchema = require("../models/budget.model");
const { getInfoData } = require("../utils");
const { Types } = require("mongoose");
const ExpenseService = require("../services/expense.service");

class BudgetService {
  static addBudget = async ({ userId, name, amount }) => {
    if (!userId || !name || !amount) {
      throw new BadRequestError("All fields are required");
    }
    if (amount <= 0) {
      throw new BadRequestError("Amount is invalid");
    }
    const budget = await budgetSchema.create({
      user: userId,
      name,
      amount,
    });
    return getInfoData({
      fields: ["_id", "name", "amount", "type"],
      object: budget,
    });
  };

  static getBudgets = async (userId) => {
    const budgets = await budgetSchema
      .find({ user: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean();

    return budgets.map((budget) =>
      getInfoData({
        fields: ["_id", "name", "amount", "type"],
        object: budget,
      })
    );
  };

  static deleteBudget = async (userId, id) => {
    // const budget = await budgetSchema.findByIdAndDelete(id);
    const budget = await budgetSchema.findOneAndDelete({
      _id: id,
      user: userId,
    });
    // Delete all expenses created with this budget
    await ExpenseService.deleteExpenses(id);
    return getInfoData({
      fields: ["_id", "name", "amount", "type"],
      object: budget,
    });
  };
}

module.exports = BudgetService;
