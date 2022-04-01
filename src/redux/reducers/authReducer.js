import {
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
	VERIFY_USER,
} from "../constants/authConstants";

const initialState = {
	isAuthenticated: false,
	loading: true,
	user: null,
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_SUCCESS:
			return {
				isAuthenticated: true,
				user: payload,
				loading: false,
			};

		case VERIFY_USER:
			return {
				...state,
				user: { ...state.user, isVerified: true },
			};

		case LOGOUT_SUCCESS:
			return {
				isAuthenticated: false,
				user: null,
				loading: false,
			};
		default:
			return state;
	}
};

export default authReducer;
