import { Form, NavLink, useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.svg";
import { useStore } from "../store";

export default function Nav() {
  const { isAuthenticated, username } = useStore((store) => store.user);
  return (
    <nav>
      <NavLink to={"/"} aria-label='Navigate to home'>
        <img src={logo} alt='Budget tracker logo' height={30} />
        <span>Budget Tracker</span>
      </NavLink>
      {isAuthenticated && (
        <Form method='post' action='logout'>
          {`Welcome ${username}`}
          <button
            className='btn btn--warning'
            onClick={(event) => {
              if (!confirm("Do you want to logout?")) {
                event.preventDefault();
              }
            }}>
            Logout
            <ArrowRightOnRectangleIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
