const express = require("express");
const incomeController = require("../controllers/income.controller");
const expenseController = require("../controllers/expense.controller");
const router = express.Router();
const { asyncHandler } = require("../utils");

router
  .post("/add-income", asyncHandler(incomeController.addIncome))
  .get("/get-incomes", asyncHandler(incomeController.getIncomes))
  .delete("/delete-income/:id", asyncHandler(incomeController.deleteIncome))
  .post("/add-expense", asyncHandler(expenseController.addExpense))
  .get("/get-expenses", asyncHandler(expenseController.getExpenses))
  .delete("/delete-expense/:id", asyncHandler(expenseController.deleteExpense));

module.exports = router;
