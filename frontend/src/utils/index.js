export const calculateSpentByBudget = (budgetId, expenses) => {
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budget !== budgetId) return acc;

    // add the current amount to my total
    return (acc += parseFloat(expense.amount));
  }, 0);
  return budgetSpent;
};

export const getAllMatchingItems = ({ data, key, value }) => {
  return data.filter((item) => item[key] === value);
};

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();
