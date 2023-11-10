import { Navigate, useLoaderData, Link } from "react-router-dom";
import { toast } from "react-toastify";
import BudgetForm from "../components/BudgetForm";
import ExpenseForm from "../components/ExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

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

export function dashboardAction({
  createBudget,
  createExpense,
  deleteExpense,
}) {
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

export default function Dashboard() {
  const { isAuthenticated, budgets, expenses } = useLoaderData();
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
                <h2>Existing Budgets</h2>
                <div className='budgets'>
                  {budgets.map((budget) => (
                    <BudgetItem
                      key={budget._id}
                      budget={budget}
                      expenses={expenses}
                    />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className='grid-md'>
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 4)}
                      budgets={budgets}
                    />
                    {expenses.length > 4 && (
                      <Link to='expenses' className='btn btn--dark'>
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
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
