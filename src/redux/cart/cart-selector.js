import { createSelector } from "reselect";

// 2 type de selecteur
/* input selecteur qui n'utilise pas createSelector
fct qui prend tous le State et retourne une partie du state*/

const SelectCart = (state) => state.cart;

/* output selector qui utilise createSelector
  prend deux argument:
    -- collection : array of input selector
        on peut avoir plusieur selecteur [SelectCart, SelectUser]
    -- fct qui retourne la valeur de dont on a besoin
    (cart, user) => 

    ===> memorize selector
*/

export const selectCartItems = createSelector(
  [SelectCart],
  (cart) => cart.cartItems
);

export const selectHidden = createSelector([SelectCart], (cart) => cart.hidden);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantitiy, cartItem) =>
        accumulatedQuantitiy + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedTotale, cartItem) =>
      accumulatedTotale + cartItem.quantity * cartItem.price,
    0
  )
);
