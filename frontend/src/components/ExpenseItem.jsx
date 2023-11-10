import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { formatDateToLocaleString, getAllMatchingItems } from "../utils";

const ExpenseItem = ({ expense, showBudget, budgets }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    data: budgets,
    key: "_id",
    value: expense.budget,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{`€ ${expense.amount}`}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link to={`/budget/${budget._id}`}>{budget.name}</Link>
        </td>
      )}
      <td>
        <fetcher.Form method='post'>
          <input type='hidden' name='_action' value='deleteExpense' />
          <input type='hidden' name='expenseId' value={expense._id} />
          <button
            type='submit'
            className='btn btn--warning'
            aria-label={`Delete ${expense.name} expense`}>
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default ExpenseItem;
