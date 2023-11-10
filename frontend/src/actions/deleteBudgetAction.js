import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export function deleteBudgetAction({ deleteBudget }) {
  return async function ({ params }) {
    try {
      await deleteBudget(params.id);
      toast.success("Budget deleted.");
    } catch (error) {
      return toast.error(error.response.data.message);
    }
    return redirect("/");
  };
}
