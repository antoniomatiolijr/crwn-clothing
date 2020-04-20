import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // we specify the chosen reducers, and this case user is handle by firestore
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
