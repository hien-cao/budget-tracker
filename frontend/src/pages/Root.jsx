import { Outlet, useLoaderData } from "react-router-dom";
import Nav from "../components/Nav";

export function rootLoader() {
  const user = {
    userName: "Test user",
  };
  return user;
}

export default function Root() {
  const user = useLoaderData();
  return (
    <div className='main-layout'>
      <Nav userName={user.userName} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
