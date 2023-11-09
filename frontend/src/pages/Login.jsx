import { Form, Link, Navigate } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useStore } from "../store";

export function loginAction({ login }) {
  return async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    const isAuthenticated = await login(data.username, data.password);
    if (isAuthenticated) {
      return toast.success(`Welcome ${data.username}!`);
    }
  };
}

export default function Login() {
  const { isAuthenticated } = useStore((store) => store.user);
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <div className='login'>
      <h2>Budget Smarter, Live Better!</h2>
      <Form method='post'>
        <h5>Log in</h5>
        <input
          type='text'
          name='username'
          required
          placeholder='Your username'
          aria-label='Your username'
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Your password'
          aria-label='Your password'
        />
        <button type='submit' className='btn btn--dark'>
          Login
          <ArrowLeftOnRectangleIcon width={20} />
        </button>
        <Link to={"/signup"}>{"Not yet registered?"}</Link>
      </Form>
    </div>
  );
}
