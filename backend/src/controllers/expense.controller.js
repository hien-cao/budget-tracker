const ExpenseService = require("../services/Expense.service");
const { Created, Ok } = require("../core/success.response");

class ExpenseController {
  addExpense = async (req, res, next) => {
    new Created({
      message: "Expense added",
      metadata: await ExpenseService.addExpense(req.body),
    }).send(res);
  };

  getExpenses = async (req, res, next) => {
    new Ok({
      message: "Get Expenses",
      metadata: await ExpenseService.getExpenses(),
    }).send(res);
  };

  deleteExpense = async (req, res, next) => {
    const { id } = req.params;
    new Ok({
      message: "Expense deleted successfully",
      metadata: await ExpenseService.deleteExpense(id),
    }).send(res);
  };
}

module.exports = new ExpenseController();
