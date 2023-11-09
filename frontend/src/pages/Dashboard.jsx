import { useStore } from "../store";
import { Navigate, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import BudgetForm from "../components/BudgetForm";

export function dashboardLoader({ getUser }) {
  return () => {
    const isAuthenticated = getUser();
    return isAuthenticated;
  };
}

export function dashboardAction({ createBudget }) {
  return async ({ request }) => {
    try {
      const data = Object.fromEntries(await request.formData());
      await createBudget(data.newBudget, data.newBudgetAmount);
      return toast.success(`Budget created.`);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };
}

export default function Dashboard() {
  const isAuthenticated = useLoaderData();
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      {isAuthenticated && (
        <div className='dashboard'>
          <div className='grid-sm'>
            <div className='grid-lg'>
              <div className='flex-lg'>
                <BudgetForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
