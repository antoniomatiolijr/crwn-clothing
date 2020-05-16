import {
  addItem,
  clearCart,
  clearItemFromCart,
  removeItem,
  setCartItems,
  toggleCartHidden,
} from "./cart.actions";
import CartActionTypes from "./cart.types";

const mockItem = {
  id: 1,
  quantity: 3,
};

describe("CartItems Actions", () => {
  it("should create the toggleHidden action", () => {
    expect(toggleCartHidden().type).toBe(CartActionTypes.TOGGLE_CART_HIDDEN);
  });

  it("should create the addItem action", () => {
    const action = addItem(mockItem);
    expect(action.type).toBe(CartActionTypes.ADD_ITEM);
    expect(action.payload).toBe(mockItem);
  });

  it("should create the clear cart action", () => {
    expect(clearCart().type).toBe(CartActionTypes.CLEAR_CART);
  });

  it("should create the clearItemCart action", () => {
    const action = clearItemFromCart(mockItem);
    expect(action.type).toBe(CartActionTypes.CLEAR_ITEM_FROM_CART);
    expect(action.payload).toBe(mockItem);
  });

  it("should create the removeItem action", () => {
    const action = removeItem(mockItem);
    expect(action.type).toBe(CartActionTypes.REMOVE_ITEM);
    expect(action.payload).toBe(mockItem);
  });

  it("should create the setCartItems action", () => {
    const cartItems = [mockItem];

    const action = setCartItems(cartItems);
    expect(action.type).toBe(CartActionTypes.SET_CART_ITEMS);
    expect(action.payload).toEqual(cartItems);
  });
});
