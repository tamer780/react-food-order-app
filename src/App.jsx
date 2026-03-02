import { useSelector } from "react-redux";
import Cart from "./components/cart/Cart.jsx";
import Checkout from "./components/cart/Checkout.jsx";
import Header from "./components/layouts/Header.jsx";
import Meals from "./components/meals/Meals.jsx";

function App() {
  const modalType = useSelector((state) => state.ui.modalType);
  return (
    <>
      <Header />
      <Meals />
      <Cart />
      <Checkout key={modalType} />
    </>
  );
}

export default App;
