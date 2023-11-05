const { BadRequestError } = require("../core/error.response");
const incomeSchema = require("../models/income.model");
const { getInfoData } = require("../utils");

class IncomeService {
  static addIncome = async ({ title, amount, category, description, date }) => {
    if (!title || !amount || !category || !description || !date) {
      throw new BadRequestError("All fields are required");
    }
    if (amount <= 0) {
      throw new BadRequestError("Amount is invalid");
    }
    const income = await incomeSchema.create({
      title,
      amount,
      category,
      description,
      date,
    });
    return getInfoData({
      fields: ["title", "amount", "category", "description", "date"],
      object: income,
    });
  };

  static getIncomes = async () => {
    const incomes = await incomeSchema.find().sort({ createdAt: -1 }).lean();
    return incomes.map((income) =>
      getInfoData({
        fields: ["title", "amount", "category", "description", "date"],
        object: income,
      })
    );
  };

  static deleteIncome = async (id) => {
    const income = await incomeSchema.findByIdAndDelete(id);
    return getInfoData({
      fields: ["title", "amount", "category", "description", "date"],
      object: income,
    });
  };
}

module.exports = IncomeService;
