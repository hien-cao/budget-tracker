const ExpenseService = require("../services/Expense.service");
const { Created, Ok } = require("../core/success.response");
const { HEADER } = require("../utils/authUtils");
const { getInfoData } = require("../utils");

class ExpenseController {
  addExpense = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    new Created({
      message: "Expense added",
      metadata: await ExpenseService.addExpense({
        userId,
        ...getInfoData({
          fields: ["budgetId", "name", "amount"],
          object: req.body,
        }),
      }),
    }).send(res);
  };

  getExpenses = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    new Ok({
      message: "Get Expenses",
      metadata: await ExpenseService.getExpenses(userId),
    }).send(res);
  };

  deleteExpense = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.headers[HEADER.CLIENT_ID];
    new Ok({
      message: "Expense deleted successfully",
      metadata: await ExpenseService.deleteExpense(userId, id),
    }).send(res);
  };
}

module.exports = new ExpenseController();
