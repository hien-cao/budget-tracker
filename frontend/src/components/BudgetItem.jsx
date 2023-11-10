import { Form, Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";
import { calculateSpentByBudget } from "../utils";

const BudgetItem = ({ budget, expenses, showDelete = false }) => {
  const { _id: id, name, amount } = budget;
  const spent = calculateSpentByBudget(id, expenses);

  return (
    <div className='budget'>
      <h3>{name}</h3>
      <div className='budget-statictic'>
        <div>{`Budget: € ${amount}`}</div>
        <div>{`Spent: € ${spent}`}</div>
        <div>{`Remaining: € ${amount - spent}`}</div>
      </div>
      {showDelete ? (
        <div className='flex-sm'>
          <Form
            method='post'
            action='delete'
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}>
            <button type='submit' className='btn btn--dark'>
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className='flex-sm'>
          <Link to={`/budget/${id}`} className='btn btn--dark'>
            <span>View Details</span>
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
