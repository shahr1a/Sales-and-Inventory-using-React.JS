import ThemeReducer from "./ThemeReducer";
import AuthReducer from "./authReducer";
import { ProductListReducer, ProductDetailsReducer } from "./productReducers";
import { combineReducers } from "redux";
import { CartReducer } from "./cartReducer";
import {
	OrderCreateReducer,
	OrderPayReducer,
	SalesFromOrderReducer,
} from "./orderReducer";

const rootReducer = combineReducers({
	ThemeReducer,
	AuthReducer,
	ProductList: ProductListReducer,
	ProductDetails: ProductDetailsReducer,
	Cart: CartReducer,
	OrderCreate: OrderCreateReducer,
	OrderPay: OrderPayReducer,
	SalesFromOrder: SalesFromOrderReducer,
});

export default rootReducer;
