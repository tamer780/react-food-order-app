import { useDispatch } from "react-redux";
import { currenyFormatter } from "../../utils/formatter";
import { cartActions } from "../../store/cartSlice";

export default function CartItem({ meal }) {
  const dispatch = useDispatch();

  function addMeal() {
    dispatch(cartActions.addItem(meal));
  }

  function removeMeal() {
    dispatch(cartActions.removeItem(meal.id));
  }

  const cssBtn =
    "bg-stone-900 text-primary w-6 h-6 rounded-full flex justify-center items-center border-none cursor-pointer hover:bg-stone-800 transition-colors text-sm font-bold";

  return (
    <li className="flex items-center justify-between py-2 border-b border-stone-100 last:border-none">
      <div className="flex flex-col sm:flex-row sm:gap-2">
        <span className="font-bold text-stone-700">{meal.name}</span>
        <span className="text-stone-500">
          : {meal.quantity} × {currenyFormatter.format(meal.price)}
        </span>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <button
          className={cssBtn}
          onClick={removeMeal}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="font-lato font-bold min-w-6 text-center">
          {meal.quantity}
        </span>
        <button
          className={cssBtn}
          onClick={addMeal}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </li>
  );
}
