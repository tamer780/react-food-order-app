import { createContext, useState } from "react";

export const ModalContext = createContext({
  state: "",
  showCart: () => {},
  hideCart: () => {},
  closeCheckout: () => {},
  showCheckout: () => {},
});

export default function ModalProvider({ children }) {
  const [stateOfModal, setStateOfModal] = useState("");

  function showCart() {
    setStateOfModal("cart");
  }

  function hideModal() {
    setStateOfModal("");
  }

  function showCheckout() {
    setStateOfModal("checkout");
  }

  const value = {
    state: stateOfModal,
    showCart,
    showCheckout,
    hideModal,
  };
  return <ModalContext value={value}>{children}</ModalContext>;
}
