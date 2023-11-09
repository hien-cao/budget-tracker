const BudgetService = require("../services/budget.service");
const { Created, Ok } = require("../core/success.response");
const { HEADER } = require("../utils/authUtils");

class BudgetController {
  addBudget = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    new Created({
      message: "Budget added",
      metadata: await BudgetService.addBudget({
        userId,
        name: req.body.name,
        amount: req.body.amount,
      }),
    }).send(res);
  };

  getBudgets = async (req, res, next) => {
    const userId = req.headers[HEADER.CLIENT_ID];
    new Ok({
      message: "Get budgets",
      metadata: await BudgetService.getBudgets(userId),
    }).send(res);
  };

  deleteBudget = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.headers[HEADER.CLIENT_ID];
    new Ok({
      message: "Budget deleted successfully",
      metadata: await BudgetService.deleteBudget(userId, id),
    }).send(res);
  };
}

module.exports = new BudgetController();
