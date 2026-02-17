import Cart from "./components/cart/Cart.jsx";
import Checkout from "./components/cart/Checkout.jsx";
import Header from "./components/layouts/Header.jsx";
import Meals from "./components/meals/Meals.jsx";
import CartContext from "./store/CartContext.jsx";
import ModalProvider from "./store/ModalContext.jsx";

function App() {
  return (
    <ModalProvider>
      <CartContext>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContext>
    </ModalProvider>
  );
}

export default App;
