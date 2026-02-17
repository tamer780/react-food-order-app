import Modal from "../UI/Modal.jsx";
import { use } from "react";
import { CartContextApi } from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../utils/formatter.js";
import Button from "../UI/Button.jsx";
import { ModalContext } from "../../store/ModalContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  const { cart } = use(CartContextApi);
  const { state, hideModal, showCheckout } = use(ModalContext);
  const totalPrice = cart.reduce(
    (totalPrice, meal) => totalPrice + meal.quantity * meal.price,
    0,
  );

  return (
    <Modal
      className="cart"
      open={state === "cart"}
      onClose={state === "cart" ? () => hideModal("") : null}
    >
      <h2>The Cart</h2>
      <ul>
        {cart.map((meal) => {
          return <CartItem meal={meal} key={meal.id} />;
        })}
      </ul>
      <p className="cart-total">
        Total: {currencyFormatter.format(totalPrice)}
      </p>

      <p className="modal-actions">
        <Button textOnly onClick={() => hideModal("")}>
          Close
        </Button>
        {cart.length > 0 && (
          <Button onClick={() => showCheckout("checkout")}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
