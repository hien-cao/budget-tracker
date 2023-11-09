import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const BudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className='form-wrapper'>
      <h2 className='h3'>Create budget</h2>
      <fetcher.Form method='post' className='grid-sm' ref={formRef}>
        <div className='grid-xs'>
          <label htmlFor='newBudget'>Budget Name</label>
          <input
            type='text'
            name='newBudget'
            id='newBudget'
            placeholder='House'
            required
            ref={focusRef}
          />
        </div>
        <div className='grid-xs'>
          <label htmlFor='newBudgetAmount'>Amount</label>
          <input
            type='number'
            step='0.1'
            name='newBudgetAmount'
            id='newBudgetAmount'
            placeholder='€200000'
            required
            inputMode='decimal'
          />
        </div>
        <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Create budget</span>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
export default BudgetForm;