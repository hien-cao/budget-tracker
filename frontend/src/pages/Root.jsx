import { Outlet } from "react-router-dom";
import { useStore } from "../store";
import Nav from "../components/Nav";

export default function Root() {
  const { username } = useStore((store) => store.user);
  return (
    <div className='main-layout'>
      <Nav userName={username} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
