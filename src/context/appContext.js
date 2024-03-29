import React, { useReducer, useContext } from "react"
import reducer from "./reducer"
import axios from "axios"
import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	LOGIN_USER_BEGIN,
	LOGIN_USER_ERROR,
	LOGIN_USER_SUCCESS,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_ERROR,
	UPDATE_USER_SUCCESS,
} from "./actions"

const user = localStorage.getItem("user")
const token = localStorage.getItem("token")
const userLocation = localStorage.getItem("location")

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token: token || "",
	userLocation: userLocation || "",
	jobLocation: userLocation || "",
	showSideBar: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	const authFetch = axios.create({
		baseURL: "/api/v1",
	})

	authFetch.interceptors.request.use(
		(config) => {
			//config.headers.common["Authorization"] = `Bearer ${state.token}`
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	authFetch.interceptors.response.use(
		(response) => {
			return response
		},
		(error) => {
			console.log(error.response)
			if (error.response.status === 401) logoutUser()
			return Promise.reject(error)
		}
	)

	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT })
		clearAlert()
	}
	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT })
		}, 3000)
	}
	const addUserToLocalStorage = ({ user, token, location }) => {
		localStorage.setItem("user", JSON.stringify(user))
		localStorage.setItem("token", token)
		localStorage.setItem("location", location)
	}

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("user")
		localStorage.removeItem("token")
		localStorage.removeItem("location")
	}

	const registerUser = async (currentUser) => {
		dispatch({ type: REGISTER_USER_BEGIN })
		try {
			const data = await axios.post("/api/v1/auth/register", currentUser)

			const { user, token, location } = data

			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: { user, token, location },
			})
			addUserToLocalStorage({ user, token, location })
		} catch (error) {
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const loginUser = async (currentUser) => {
		dispatch({ type: LOGIN_USER_BEGIN })
		try {
			const response = await axios.post("/api/v1/auth/login", currentUser)
			//console.log(response);
			const { user, token, location } = response.data

			dispatch({
				type: LOGIN_USER_SUCCESS,
				payload: { user, token, location },
			})
			addUserToLocalStorage({ user, token, location })
		} catch (error) {
			//console.log(error.response);
			dispatch({
				type: LOGIN_USER_ERROR,
				payload: { msg: error.response.data.msg },
			})
		}
		clearAlert()
	}

	const toggleSideBar = () => {
		dispatch({ type: TOGGLE_SIDEBAR })
	}

	const logoutUser = () => {
		dispatch({ type: LOGOUT_USER })
		removeUserFromLocalStorage()
	}

	const updateUser = async (currentUser) => {
		dispatch({ type: UPDATE_USER_BEGIN })
		console.log(state.token, currentUser)
		try {
			const { data } = await authFetch.patch(
				"/auth/updateUser",
				currentUser
			)
			const { user, token, location } = data

			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: { user, location, token },
			})
			addUserToLocalStorage({ user, location, token })
		} catch (error) {
			if (!error.response.status === 401) {
				dispatch({
					type: UPDATE_USER_ERROR,
					payload: { msg: error.response.data.msg },
				})
			}
		}
		clearAlert()
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
				loginUser,
				toggleSideBar,
				logoutUser,
				updateUser,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

const useAppContext = () => {
	return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
