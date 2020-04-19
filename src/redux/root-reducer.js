import { combineReducers } from "redux";

import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
  cart: cartReducer,
  user: userReducer,
});
