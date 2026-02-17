import { createContext, useCallback, useMemo, useReducer } from "react";

export const CartContextApi = createContext({
  cart: { items: [] },
  addMeal: (meal) => {},
  ramoveMeal: (id) => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD-MEAL":
      const existingMealIndex = state.items.findIndex(
        (meal) => meal.id === action.meal.id,
      );

      const existingMeal = state.items[existingMealIndex];
      let updateMeals = [...state.items];
      if (existingMeal) {
        const updateMeal = {
          ...existingMeal,
          quantity: existingMeal.quantity + 1,
        };

        updateMeals[existingMealIndex] = updateMeal;
      } else {
        updateMeals = [...state.items, { ...action.meal, quantity: 1 }];
      }

      return { ...state, items: updateMeals };

    case "REMOVE-MEAL":
      const indexOfMeal = state.items.findIndex(
        (meal) => meal.id === action.id,
      );
      if (indexOfMeal === -1) return state;
      const meal = state.items[indexOfMeal];
      let newMeals;
      if (meal.quantity === 1) {
        newMeals = state.items.filter((meal) => meal.id !== action.id);
      } else {
        const updateMeal = {
          ...meal,
          quantity: meal.quantity - 1,
        };
        newMeals = [...state.items];
        newMeals[indexOfMeal] = updateMeal;
      }
      return { ...state, items: newMeals };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}
const initialValue = { items: [] };
function CartContext({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialValue);

  const addMeal = useCallback(function addMeal(meal) {
    cartDispatch({ type: "ADD-MEAL", meal });
  }, []);

  const removeMeal = useCallback(function removeMeal(id) {
    cartDispatch({ type: "REMOVE-MEAL", id });
  }, []);

  const clearCart = useCallback(function clearCart() {
    cartDispatch({ type: "CLEAR_CART" });
  }, []);

  const cartValue = useMemo(
    () => ({
      cart: cartState.items,
      addMeal,
      removeMeal,
      clearCart,
    }),
    [cartState.items, addMeal, removeMeal, clearCart],
  );

  return <CartContextApi value={cartValue}>{children}</CartContextApi>;
}

export default CartContext;
