const IncomeService = require("../services/income.service");
const { Created, Ok } = require("../core/success.response");

class IncomeController {
  addIncome = async (req, res, next) => {
    new Created({
      message: "Income added",
      metadata: await IncomeService.addIncome(req.body),
    }).send(res);
  };

  getIncomes = async (req, res, next) => {
    new Ok({
      message: "Get incomes",
      metadata: await IncomeService.getIncomes(),
    }).send(res);
  };

  deleteIncome = async (req, res, next) => {
    const { id } = req.params;
    new Ok({
      message: "Income deleted successfully",
      metadata: await IncomeService.deleteIncome(id),
    }).send(res);
  };
}

module.exports = new IncomeController();
