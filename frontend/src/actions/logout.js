import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function logoutAction(logout, clearState, clearTokens) {
  return async () => {
    const isLogouted = await logout();
    if (isLogouted) {
      clearState();
      clearTokens();
      toast.success("Logout successfully");
      return redirect("/");
    }
  };
}
