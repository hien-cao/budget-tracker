import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function logoutAction(logout, clearState, clearTokens) {
  return async () => {
    try {
      await logout();
      clearState();
      clearTokens();
      toast.success("Logout successfully");
      return redirect("/");
    } catch (error) {
      return toast.error("Failed to logout");
    }
  };
}
