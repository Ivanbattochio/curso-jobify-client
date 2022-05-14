import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_ERROR,
	LOGIN_USER_SUCCESS,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	UPDATE_USER_SUCCESS,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
} from "./actions"

import { initialState } from "./appContext"

const reducer = (state, action) => {
	if (action.type === CLEAR_ALERT) {
		return { ...state, showAlert: false, alertText: "", alertType: "" }
	}
	if (action.type === DISPLAY_ALERT) {
		return {
			...state,
			showAlert: true,
			alertType: "danger",
			alertText: "Please provide all values!",
		}
	}

	if (action.type === REGISTER_USER_BEGIN) {
		return { ...state, isLoading: true }
	}

	if (action.type === REGISTER_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			isLoading: false,
			showAlert: true,
			alertType: "success",
			alertText: "User created! Redirecting...",
		}
	}

	if (action.type === REGISTER_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		}
	}

	if (action.type === LOGIN_USER_BEGIN) {
		return { ...state, isLoading: true }
	}

	if (action.type === LOGIN_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			isLoading: false,
			showAlert: true,
			alertType: "success",
			alertText: "Login successful! Redirecting...",
		}
	}

	if (action.type === LOGIN_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		}
	}

	if (action.type === UPDATE_USER_BEGIN) {
		return { ...state, isLoading: true }
	}

	if (action.type === UPDATE_USER_SUCCESS) {
		return {
			...state,
			user: action.payload.user,
			token: action.payload.token,
			userLocation: action.payload.location,
			jobLocation: action.payload.location,
			isLoading: false,
			showAlert: true,
			alertType: "success",
			alertText: "User Profile Updated!",
		}
	}

	if (action.type === UPDATE_USER_ERROR) {
		return {
			...state,
			isLoading: false,
			showAlert: true,
			alertType: "danger",
			alertText: action.payload.msg,
		}
	}

	if (action.type === TOGGLE_SIDEBAR) {
		return {
			...state,
			showSideBar: !state.showSideBar,
		}
	}

	if (action.type === LOGOUT_USER) {
		return {
			...initialState,
			user: null,
			token: null,
			jobLocation: "",
			userLocation: "",
		}
	}

	throw new Error(`no such action : ${action.type}`)
}

export default reducer
