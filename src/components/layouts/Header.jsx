import imageLogo from "../../assets/logo.jpg";
import Button from "../UI/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/uiSlice.js";

export default function Header() {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  function showCart() {
    dispatch(uiAction.showCart());
  }

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={imageLogo}
          alt="food_order_Logo"
          className="w-16 rounded-4xl border-2 border-primary object-contain"
        />
        <h2 className="text-primary uppercase text-2xl ml-4 tracking-widest font-['Lato'] font-bold">
          FoodOrder
        </h2>
      </div>
      <Button textOnly onClick={showCart} className="text-primary">
        Cart ({cartQuantity})
      </Button>
    </header>
  );
}
