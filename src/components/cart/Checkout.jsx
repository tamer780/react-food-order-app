import { use } from "react";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import Modal from "../UI/Modal.jsx";
import Submit from "../UI/Submit.jsx";
import {
  isEmail,
  isMinLength,
  isNotEmpty,
  isPostalCode,
} from "../../utils/validations.js";

import { ModalContext } from "../../store/ModalContext.jsx";
import { CartContextApi } from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../utils/formatter.js";
import { useActionState } from "react";
import { sendMealRequest } from "../../utils/httpRequest.js";
import SuccessPage from "../UI/SuccessPage.jsx";

export default function Checkout() {
  const { state, hideModal } = use(ModalContext);

  const { cart, clearCart } = use(CartContextApi);

  const totalPrice = cart.reduce(
    (totalPrice, meal) => totalPrice + meal.quantity * meal.price,
    0,
  );

  async function handleFormAction(prev, formData) {
    const userData = Object.fromEntries(formData.entries());

    const { name, email, street, city, "postal-code": postalCode } = userData;

    const errors = [];

    if (!isEmail(email)) errors.push("Invalid email.");
    if (!isNotEmpty(name) || !isMinLength(name, 3))
      errors.push("Name too short.");
    if (!isNotEmpty(street)) errors.push("Street required.");
    if (!isNotEmpty(city)) errors.push("City required.");
    if (!isNotEmpty(postalCode) || !isPostalCode(postalCode))
      errors.push("Invalid Postal Code.");

    if (errors.length > 0) {
      return {
        userData,
        errors,
      };
    }
    try {
      await sendMealRequest(cart, userData);
      clearCart();
      return { success: true };
    } catch (error) {
      return {
        errors: ["Failed to post data" || error.message],
      };
    }
  }

  const [formState, formAction] = useActionState(handleFormAction, {
    userData: {},
    errors: null,
  });

  if (formState.success) {
    return (
      <Modal open={state === "checkout"} onClose={() => hideModal("")}>
        <SuccessPage onSuccess={() => hideModal("")} />
      </Modal>
    );
  }

  return (
    <Modal open={state === "checkout"} onClose={() => hideModal("")}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalPrice)}</p>
        <Input
          label="Full-name"
          id="name"
          type="text"
          defaultValue={formState.userData?.name}
        />
        <Input
          label="Email Adress"
          type="email"
          id="email"
          defaultValue={formState.userData?.email}
        />
        <Input
          label="Street"
          type="text"
          id="street"
          defaultValue={formState.userData?.street}
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
            defaultValue={formState.userData?.postalCode}
          />
          <Input
            label="City"
            type="text"
            id="city"
            defaultValue={formState.userData?.city}
          />
        </div>

        {formState.errors?.length > 0 && (
          <ul className="error">
            {formState.errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}

        <p className="modal-actions">
          <Button textOnly onClick={() => hideModal("")}>
            Close
          </Button>

          <Submit />
        </p>
      </form>
    </Modal>
  );
}
