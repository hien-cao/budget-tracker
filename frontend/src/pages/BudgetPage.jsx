import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import ExpenseForm from "../components/ExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

// helpers
import { getAllMatchingItems } from "../utils";

export function budgetLoader({ getBudgets, getExpenses }) {
  return async function budgetLoader({ params }) {
    const allBudgets = await getBudgets();
    const allExpenses = await getExpenses();
    const budget = getAllMatchingItems({
      data: allBudgets,
      key: "_id",
      value: params.id,
    })[0];

    const expenses = await getAllMatchingItems({
      data: allExpenses,
      key: "budget",
      value: params.id,
    });

    if (!budget) {
      throw new Error("The budget does not exist.");
    }

    return { budget, expenses, budgets: allBudgets };
  };
}

export function budgetAction({ createExpense, deleteExpense }) {
  return async function budgetAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "createExpense") {
      try {
        const expenseName = values.newExpense;
        await createExpense(
          values.newExpenseBudget,
          expenseName,
          values.newExpenseAmount
        );
        return toast.success(`Expense ${expenseName} created.`);
      } catch (error) {
        return toast.error(error.response.data.message);
      }
    }

    if (_action === "deleteExpense") {
      try {
        await deleteExpense(values.expenseId);
        return toast.success("Expense deleted.");
      } catch (error) {
        return toast.error(error.response.data.message);
      }
    }
  };
}

const BudgetPage = () => {
  const { budget, expenses, budgets } = useLoaderData();

  return (
    <div
      className='grid-lg'
      style={{
        "--accent": budget.color,
      }}>
      <h1 className='h2'>
        <span className='accent'>{budget.name}</span> Overview
      </h1>
      <div className='flex-lg'>
        <BudgetItem budget={budget} expenses={expenses} showDelete={true} />
        <ExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className='grid-md'>
          <h2>
            <span className='accent'>{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} budgets={budgets} showBudget={false} />
        </div>
      )}
    </div>
  );
};
export default BudgetPage;
