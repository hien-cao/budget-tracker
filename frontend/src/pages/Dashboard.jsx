import { useStore } from "../store";
import { Navigate, useLoaderData, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import BudgetForm from "../components/BudgetForm";
import ExpenseForm from "../components/ExpenseForm";

export function dashboardLoader({
  getUser,
  getBudgets,
  getExpenses,
  clearTokens,
}) {
  return async () => {
    try {
      const isAuthenticated = await getUser();
      const budgets = await getBudgets();
      const expenses = await getExpenses();
      return { isAuthenticated, budgets, expenses };
    } catch (error) {
      // To fix the issue of token is available but the data in DB is removed
      if (
        error?.config?.url?.indexOf("/user/get-user") >= 0 &&
        error?.response?.status === 404
      ) {
        clearTokens();
      }
      return { isAuthenticated: false, budgets: [], expenses: [] };
    }
  };
}

export function dashboardAction({ createBudget, createExpense }) {
  return async ({ request }) => {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    if (_action === "createBudget") {
      try {
        const budgetName = values.newBudget;
        await createBudget(budgetName, values.newBudgetAmount);
        return toast.success(`Budget ${budgetName} created.`);
      } catch (error) {
        return toast.error(error.response.data.message);
      }
    }
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
  };
}

export default function Dashboard() {
  const { isAuthenticated, budgets } = useLoaderData();
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      {isAuthenticated && (
        <div className='dashboard'>
          <div className='grid-sm'>
            {budgets?.length > 0 ? (
              <div className='grid-lg'>
                <div className='flex-lg'>
                  <BudgetForm />
                  <ExpenseForm budgets={budgets} />
                </div>
              </div>
            ) : (
              <div className='grid-lg'>
                <div className='flex-lg'>
                  <BudgetForm />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
