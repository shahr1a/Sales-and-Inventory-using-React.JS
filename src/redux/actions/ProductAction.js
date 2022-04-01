import {
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_REQUEST,
} from "../constants/productConstant";

import { createAPIEndpoint, ENDPOINTS } from "../../api";

export const ListProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await createAPIEndpoint(ENDPOINTS.INVENTORY).fetchAll();

		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const ListProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await createAPIEndpoint(ENDPOINTS.INVENTORYBYID).fetchById(
			id
		);

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
