import { useActionState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../UI/Input.jsx";
import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import Submit from "../UI/Submit.jsx";

import { currenyFormatter } from "../../utils/formatter.js";
import { isEmail, isNotEmpty, isPostalCode } from "../../utils/validation.js";
import { useFetch } from "../../hooks/useFetch.jsx";
import { cartActions } from "../../store/cartSlice.js";
import { uiAction } from "../../store/uiSlice.js";

const configObject = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.ui.modalType);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const { sendRequest } = useFetch(
    "http://localhost:3000/orders",
    null,
    configObject,
  );

  const [formState, formAction] = useActionState(handleFormAction, {
    userInfo: {},
    errors: null,
  });

  function handleClose() {
    dispatch(uiAction.hideModal());
  }

  function handleFinish() {
    dispatch(uiAction.hideModal());
    dispatch(cartActions.clearCart());
  }

  async function handleFormAction(prevFormState, formData) {
    const userInfo = Object.fromEntries(formData.entries());
    const { name, email, street, city, "postal-code": postalCode } = userInfo;

    let errors = {};

    if (!isNotEmpty(name)) errors.name = "Name is required.";
    if (!isEmail(email)) errors.email = "Invalid email address.";
    if (!isNotEmpty(street)) errors.street = "Street is required.";
    if (!isNotEmpty(city)) errors.city = "City is required.";
    if (!isPostalCode(postalCode))
      errors.postalCode = "Invalid postal code (5 digits).";

    if (Object.keys(errors).length > 0) return { errors, values: userInfo };

    try {
      await sendRequest({ order: { customer: userInfo, items: cartItems } });

      return { success: true };
    } catch (error) {
      return {
        errors: { error: error.message },
        values: userInfo,
      };
    }
  }

  if (formState?.success && modalType === "checkout") {
    return (
      <Modal open={modalType === "checkout"} onClose={handleFinish}>
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold text-primary mb-4">Success!</h2>
          <p className="text-stone-600 mb-6">
            Your order has been submitted successfully.
          </p>
          <div className="flex justify-end">
            <Button onClick={handleFinish}>Okay</Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={modalType === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-2xl font-lato">Checkout</h2>
          <p className="text-xl font-lato text-right">
            Total: {currenyFormatter.format(totalPrice)}
          </p>
        </div>

        <div className="space-y-2">
          <Input
            label="Full-Name"
            id="name"
            type="text"
            defaultValue={formState.values?.name}
            error={formState.errors?.name}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            error={formState.errors?.email}
            defaultValue={formState.values?.email}
          />
          <Input
            label="Street"
            id="street"
            type="text"
            error={formState.errors?.street}
            defaultValue={formState.values?.street}
          />
          <div className="flex gap-4">
            <Input
              label="City"
              id="city"
              type="text"
              error={formState.errors?.city}
              defaultValue={formState.values?.city}
            />
            <Input
              label="Postal-Code"
              id="postal-code"
              type="text"
              error={formState.errors?.postalCode}
              defaultValue={formState.values?.postalCode}
            />
          </div>
        </div>

        {formState.errors?.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-4 rounded">
            <p className="text-red-700 text-sm font-medium">
              {formState.errors.error || "Failed to send data!"}
            </p>
          </div>
        )}

        <p className="flex justify-end items-center gap-4 mt-8">
          <Button type="button" textOnly onClick={handleClose}>
            Cancel
          </Button>
          <Submit />
        </p>
      </form>
    </Modal>
  );
}
