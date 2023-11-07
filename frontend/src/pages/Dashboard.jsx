import Login from "../components/Login";
import { useStore } from "../store";

export async function dashboardAction({ request }) {
  const data = Object.fromEntries(await request.formData());
  return json({
    username: data.get("username"),
    password: data.get("password"),
  });
}

export default function Dashboard() {
  const user = useStore((store) => store.user);
  return <>{false ? <p>dashboard</p> : <Login />}</>;
}
