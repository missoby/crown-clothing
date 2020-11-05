/*
  Utility functions allow us to keep our files clean and oranize 
  functions that we may neeed in multiple files in one location
*/

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  // find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la 
  //fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.

  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  //La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau 
  //d'origine qui remplissent une condition déterminée par la fonction callback.
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      cartItem => cartItem.id !== cartItemToRemove.id
    );
  }

  //La méthode map() crée un nouveau tableau avec les résultats de l'appel d'une fonction 
  //fournie sur chaque élément du tableau appelant.
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
}