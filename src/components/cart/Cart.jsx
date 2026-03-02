import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal.jsx";
import { currenyFormatter } from "../../utils/formatter.js";
import CartItem from "./CartItem.jsx";
import Button from "../UI/Button.jsx";
import { uiAction } from "../../store/uiSlice.js";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const uiState = useSelector((state) => state.ui.modalType);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  function hideModal() {
    dispatch(uiAction.hideModal());
  }

  function showCheckout() {
    dispatch(uiAction.showCheckout());
  }

  return (
    <Modal
      open={uiState === "cart"}
      onClose={uiState === "cart" ? hideModal : null}
    >
      <h2 className="text-2xl font-bold mb-4 font-lato">Your Cart</h2>

      <ul className="flex flex-col gap-2 mb-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {cart.length > 0 ? (
          cart.map((meal) => <CartItem meal={meal} key={meal.id} />)
        ) : (
          <p className="text-stone-500 italic">Your cart is empty.</p>
        )}
      </ul>

      <p className="mb-4 text-xl font-lato text-right border-t pt-4 border-stone-200">
        Total Price: {currenyFormatter.format(totalPrice)}
      </p>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          textOnly
          onClick={hideModal}
          className="text-dark0 font-lato text-base hover:text-stone-600 transition-colors"
        >
          Close
        </Button>
        {cart.length > 0 && (
          <Button onClick={showCheckout} className="px-6">
            Checkout
          </Button>
        )}
      </div>
    </Modal>
  );
}
