import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import { createAPIEndpoint, ENDPOINTS } from "../../api";

export const AddToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await createAPIEndpoint(ENDPOINTS.INVENTORYBYID).fetchById(
		id
	);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			saleId: "SI - 10000",
			productId: data.productId,
			dealerId: 2,
			name: data.productName,
			image: data.image,
			sellingPrice: data.buyingPrice,
			isPaid: false,
			remainingBalance: 0,
			countInStock: data.stock,
			paymentMethod: "PayPal",
			quantity: qty,
			approval: true,
			orderId: 2,
		},
	});

	localStorage.setItem("cartItem", JSON.stringify(getState().Cart.cartItems));
};

export const RemoveFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem("cartItem", JSON.stringify(getState().Cart.cartItems));
};

export const SaveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem("shippingAddress", JSON.stringify(data));
};
