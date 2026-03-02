import { currenyFormatter } from "../../utils/formatter.js";
import Button from "../UI/Button.jsx";
import { cartActions } from "../../store/cartSlice.js";
import { useDispatch } from "react-redux";
export default function MealItem({ meal }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(cartActions.addItem(meal));
  }

  return (
    <li className="flex flex-col h-full bg-dark0 rounded-2xl overflow-hidden text-center shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
      <img
        src={`http://localhost:3000/${meal.image}`}
        alt={meal.name}
        className="object-cover h-64 "
      />
      <div className="flex flex-col  flex-1 p-2">
        <h3 className="my-2 font-bold text-xl">{meal.name}</h3>
        <p className="bg-dark w-fit mx-auto px-8 py-2 rounded-full text-primary font-semibold ">
          {currenyFormatter.format(meal.price)}
        </p>
        <p className="m-4 leading-relaxed text-sm">{meal.description}</p>
      </div>
      <Button
        onClick={handleAddToCart}
        className="mb-4 mx-auto w-fit transition-transform active:scale-95 active:opacity-70"
      >
        Add To Cart
      </Button>
    </li>
  );
}
