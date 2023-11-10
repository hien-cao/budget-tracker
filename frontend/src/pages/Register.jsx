import { Navigate, useFetcher, Link } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useStore } from "../store";
import { useRef, useEffect } from "react";

export function registerAction(signup) {
  return async ({ request }) => {
    try {
      const data = Object.fromEntries(await request.formData());
      await signup(data.username, data.password);
      return toast.success(`Welcome ${data.username}!`);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };
}

export default function Register() {
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
      <h2>Master Your Money, Control Your Destiny!</h2>
      <fetcher.Form method='post' ref={formRef}>
        <h5>Register an account</h5>
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
              <span>Create account</span>
              <UserPlusIcon width={20} />
            </>
          )}
        </button>
        <Link to={"/login"}>{"Already have an account?"}</Link>
      </fetcher.Form>
    </div>
  );
}
