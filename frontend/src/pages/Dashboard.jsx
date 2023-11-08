import Login from "../components/Login";
import { useStore } from "../store";

export async function dashboardAction({ request }) {
  const data = Object.fromEntries(await request.formData());
  console.log("username", data);
  fetch(`http://localhost:3000/v1/api/get-incomes`, {
    method: "GET",
  })
    .then((response) => {
      console.log("response", response);
      if (response.ok) {
        return response.json();
        // Handle success
      } else {
        // Handle error
      }
    })
    .then((data) => console.log("data", data))
    .catch((error) => {
      // Handle error
    });
  return;
}

export default function Dashboard() {
  const user = useStore((store) => store.user);
  return <>{false ? <p>dashboard</p> : <Login />}</>;
}
