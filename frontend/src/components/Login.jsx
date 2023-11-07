import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function Login() {
  return (
    <div className='login'>
      <h2>Budget Smarter, Live Better!</h2>
      <Form method='post'>
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
