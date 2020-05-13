import { all, call, takeLatest, put, select } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

import UserActionTypes from "../user/user.types";
import { selectCurrentUser } from "../user/user.selectors";

import CartActionTypes from "./cart.types";
import { clearCart, setCartItems } from "./cart.actions";
import { selectCartItems } from "./cart.selectors";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* retrieveCartItems({ payload: user }) {
  try {
    const cartRef = yield getUserCartRef(user.id);
    const cartSnapshot = yield cartRef.get();
    const { cartItems } = cartSnapshot.data();
    yield put(setCartItems(cartItems));
  } catch (error) {
    console.log(error);
  }
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, retrieveCartItems);
}

export function* updateCartItems() {
  const currentUser = yield select(selectCurrentUser);
  try {
    const cartRef = yield getUserCartRef(currentUser.id);
    const cartItems = yield select(selectCartItems);
    yield cartRef.update({ cartItems });
  } catch (error) {
    console.error(error);
  }
}

export function* onCartItemsUpdate() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART,
    ],
    updateCartItems
  );
}

export function* cartSagas() {
  yield all([call(onSignInSuccess), call(onSignOutSuccess), call(onCartItemsUpdate)]);
}
