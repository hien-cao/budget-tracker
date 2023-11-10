import { Link, Navigate, useFetcher } from "react-router-dom";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useStore } from "../store";
import { useRef, useEffect } from "react";

export function loginAction({ login }) {
  return async ({ request }) => {
    try {
      const data = Object.fromEntries(await request.formData());
      const isAuthenticated = await login(data.username, data.password);
      if (isAuthenticated) {
        return toast.success(`Welcome ${data.username}!`);
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };
}

export default function Login() {
  const { isAuthenticated } = useStore((store) => store.user);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      focusRef.current?.focus();
    }
  }, [isSubmitting]);

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <div className='login'>
      <h2>Budget Smarter, Live Better!</h2>
      <fetcher.Form method='post' ref={formRef}>
        <h5>Log in</h5>
        <input
          type='text'
          name='username'
          required
          placeholder='Your username'
          aria-label='Your username'
          ref={focusRef}
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Your password'
          aria-label='Your password'
        />
        <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Login</span>
              <ArrowLeftOnRectangleIcon width={20} />
            </>
          )}
        </button>
        <Link to={"/signup"}>{"Not yet registered?"}</Link>
      </fetcher.Form>
    </div>
  );
}
