import { use, useMemo } from "react";
import foodImage from "../../assets/logo.jpg";
import { CartContextApi } from "../../store/CartContext.jsx";
import Button from "../UI/Button.jsx";
import { ModalContext } from "../../store/ModalContext.jsx";

export default function Header() {
  const { cart } = use(CartContextApi);
  const { showCart } = use(ModalContext);
  const totalCartItems = useMemo(
    () =>
      cart.reduce((totalMeals, meal) => {
        return totalMeals + meal.quantity;
      }, 0),
    [cart],
  );
  return (
    <header id="main-header">
      <div id="title">
        <img src={foodImage} alt="Image_Food_logo" />
        <h1>ReactFood</h1>
      </div>
      <Button textOnly onClick={() => showCart("cart")}>
        Cart ( {totalCartItems} )
      </Button>
    </header>
  );
}
