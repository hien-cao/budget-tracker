import { Form, NavLink } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import logo from "../assets/logo.svg";

export default function Nav({ userName }) {
  return (
    <nav>
      <NavLink to={"/"} aria-label='Navigate to home'>
        <img src={logo} alt='Budget tracker logo' height={30} />
        <span>Budget Tracker</span>
      </NavLink>
      {userName && (
        <Form
          method='post'
          action='/logout'
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}>
          <button type='submit' className='btn btn--warning'>
            Logout
            <ArrowRightOnRectangleIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
