import CartActionTypes from "./cart-types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (currentStateCart = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...currentStateCart,
        hidden: !currentStateCart.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...currentStateCart,
        cartItems: addItemToCart(currentStateCart.cartItems, action.payload),
      };
    default:
      return currentStateCart;
  }
};

export default cartReducer;
