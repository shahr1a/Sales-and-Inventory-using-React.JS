import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const initialState = {
	Cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
