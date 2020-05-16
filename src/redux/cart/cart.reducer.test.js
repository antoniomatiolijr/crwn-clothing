import CartActionTypes from "./cart.types";
import cartReducer from "./cart.reducer";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const mockItem1 = {
  id: 2,
  quantity: 3,
};

const mockItem2 = {
  id: 9,
  quantity: 1,
};
const mockState = {
  hidden: true,
  cartItems: [
    mockItem2,
    {
      id: 3,
      quantity: 1,
    },
    {
      id: 4,
      quantity: 1,
    },
    mockItem1,
    {
      id: 5,
      quantity: 1,
    },
  ],
};

describe("cartReducer", () => {
  it("should return the initial state", () => {
    expect(cartReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should toggle show/hidden cart", () => {
    expect(
      cartReducer(INITIAL_STATE, { type: CartActionTypes.TOGGLE_CART_HIDDEN }).hidden
    ).toBe(false);
    expect(
      cartReducer(
        { hidden: false, cartItems: [] },
        { type: CartActionTypes.TOGGLE_CART_HIDDEN }
      ).hidden
    ).toBe(true);
  });

  it("should increase quantity of matching item by if addItem action fired with the same item payload", () => {
    expect(
      cartReducer(mockState, {
        type: CartActionTypes.ADD_ITEM,
        payload: mockItem1,
      }).cartItems.find((cartItem) => cartItem.id === mockItem1.id).quantity
    ).toBe(4);
  });

  it("should add cartItem to cartItems when add an item", () => {
    expect(
      cartReducer(INITIAL_STATE, { type: CartActionTypes.ADD_ITEM, payload: mockItem1 })
        .cartItems.length
    ).toBeGreaterThan(0);
  });

  it("should clear an item from cartItems", () => {
    expect(
      cartReducer(mockState, {
        type: CartActionTypes.CLEAR_ITEM_FROM_CART,
        payload: mockItem1,
      }).cartItems.find((cartItem) => cartItem.id === mockItem1.id)
    ).toBe(undefined);
  });

  it("should decrease item quantity when fire removeItem and remove item when quantity equals 1", () => {
    expect(
      cartReducer(mockState, {
        type: CartActionTypes.REMOVE_ITEM,
        payload: mockItem1,
      }).cartItems.find((cartItem) => cartItem.id === mockItem1.id).quantity
    ).toBe(2);

    expect(
      cartReducer(mockState, {
        type: CartActionTypes.REMOVE_ITEM,
        payload: mockItem2,
      }).cartItems.includes((cartItem) => cartItem.id === mockItem2.id)
    ).toBe(false);
  });

  it("should clear all cart items", () => {
    expect(
      cartReducer(mockState, { type: CartActionTypes.CLEAR_CART }).cartItems.length
    ).toBe(0);
  });

  it("should set the cart items", () => {
    expect(
      cartReducer(INITIAL_STATE, {
        type: CartActionTypes.SET_CART_ITEMS,
        payload: mockState,
      }).length
    ).toEqual(mockState.length);
  });
});
