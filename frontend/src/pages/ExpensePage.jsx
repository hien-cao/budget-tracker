import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";

export function expensesLoader({ getExpenses, getBudgets }) {
  return async function () {
    const expenses = await getExpenses();
    const budgets = await getBudgets();
    return { expenses, budgets };
  };
}
export function expensesAction({ deleteExpense }) {
  return async function ({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    if (_action === "deleteExpense") {
      try {
        await deleteExpense(values.expenseId);
        return toast.success("Expense deleted!");
      } catch (error) {
        return toast.error(error.response.data.message);
      }
    }
  };
}

const ExpensesPage = () => {
  const { expenses, budgets } = useLoaderData();

  return (
    <div className='grid-lg'>
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className='grid-md'>
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} budgets={budgets} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export default ExpensesPage;
