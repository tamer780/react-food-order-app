import { use } from "react";
import { CartContextApi } from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../utils/formatter.js";

export default function CartItem({ meal }) {
  const { addMeal, removeMeal } = use(CartContextApi);

  return (
    <li className="cart-item">
      <p>
        {meal.name} : {meal.quantity} x {currencyFormatter.format(meal.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => removeMeal(meal.id)}>-</button>
        <span>{meal.quantity}</span>
        <button onClick={() => addMeal(meal)}>+</button>
      </p>
    </li>
  );
}
