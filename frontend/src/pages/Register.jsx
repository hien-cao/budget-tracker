import { Form, Navigate } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useStore } from "../store";

export function registerAction(signup) {
  return async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    const isAuthenticated = await signup(data.username, data.password);
    if (isAuthenticated) {
      return toast.success(`Welcome ${data.username}!`);
    }
    throw new Error();
  };
}

export default function Register() {
  const { isAuthenticated } = useStore((store) => store.user);
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <div className='login'>
      <h2>Budget Smarter, Live Better!</h2>
      <Form method='post'>
        <h5>Register an account</h5>
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
          Create Account
          <UserPlusIcon width={20} />
        </button>
      </Form>
    </div>
  );
}
