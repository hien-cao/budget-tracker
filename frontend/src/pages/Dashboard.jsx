import { useStore } from "../store";
import { Navigate } from "react-router-dom";

export async function dashboardAction({ request }) {
  const data = Object.fromEntries(await request.formData());
}

export default function Dashboard() {
  const { isAuthenticated } = useStore((store) => store.user);
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return (
    <>
      <p>dashboard</p>
    </>
  );
}
