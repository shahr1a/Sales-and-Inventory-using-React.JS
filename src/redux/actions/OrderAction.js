import { createAPIEndpoint, ENDPOINTS } from "../../api";

import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	SALE_BYORDER_DETAILS_REQUEST,
	SALE_BYORDER_DETAILS_SUCCESS,
	SALE_BYORDER_DETAILS_FAIL,
} from "../constants/orderConstants";

export const CreateOrder = (order) => async (dispatch) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		const { data } = await createAPIEndpoint(ENDPOINTS.ORDERPOST).create(order);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.order.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const GetOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST });

		const { data } = await createAPIEndpoint(ENDPOINTS.ORDERGET).fetchById(id);

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.order.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const PayOrder = (payment) => async (dispatch) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST });

		const { data } = await createAPIEndpoint(ENDPOINTS.PAYMENTPOST).create(
			payment
		);

		dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				error.response && error.response.order.detail
					? error.response.data.detail
					: error.message,
		});
	}
};

export const GetSaleOnOrder = (id) => async (dispatch) => {
	try {
		dispatch({ type: SALE_BYORDER_DETAILS_REQUEST });

		const { data } = await createAPIEndpoint(
			ENDPOINTS.GETSALEONORDER
		).fetchById(id);

		dispatch({
			type: SALE_BYORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SALE_BYORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
