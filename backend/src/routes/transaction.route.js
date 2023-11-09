const express = require("express");
const budgetController = require("../controllers/budget.controller");
const expenseController = require("../controllers/expense.controller");
const router = express.Router();
const { asyncHandler } = require("../utils");
const { checkAuthentication } = require("../utils/authUtils");

router
  .use(checkAuthentication)
  .post("/add-budget", asyncHandler(budgetController.addBudget))
  .get("/get-budgets", asyncHandler(budgetController.getBudgets))
  .delete("/delete-budget/:id", asyncHandler(budgetController.deleteBudget))
  .post("/add-expense", asyncHandler(expenseController.addExpense))
  .get("/get-expenses", asyncHandler(expenseController.getExpenses))
  .delete("/delete-expense/:id", asyncHandler(expenseController.deleteExpense));

module.exports = router;
