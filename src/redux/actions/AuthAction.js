import { createAPIEndpoint, setAuthToken, ENDPOINTS } from "../../api";
import {
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	VERIFY_USER,
} from "../constants/authConstants";

const login = (user) => {
	return {
		type: LOGIN_SUCCESS,
		payload: user,
	};
};

const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("uid");
	setAuthToken(null);
	return {
		type: LOGOUT_SUCCESS,
	};
};

const verifyUser = () => ({
	type: VERIFY_USER,
});

export const retrieveSession = () => async (dispatch) => {
	if (localStorage.getItem("token")) {
		const token = localStorage.getItem("token");
		setAuthToken(token);
		try {
			const usertype = localStorage.getItem("uType");
			const { data } = await createAPIEndpoint(
				usertype === "staff" ? ENDPOINTS.USERBYID : ENDPOINTS.DEALERBYID
			).fetchById(localStorage.getItem("uid"));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch(logout());
			console.log(error);
		}
	} else
		dispatch({
			type: LOGOUT_SUCCESS,
		});
};

const exportDefault = { login, logout, retrieveSession, verifyUser };

export default exportDefault;
