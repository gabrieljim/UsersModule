import store from "../redux/store";
import { logout } from "../redux/authSlice";

export const fetchAndValidate = async (url, options = {}) => {
	const response = await fetch(url, { credentials: "include", ...options });
	const responseData = await response.json();
	if (responseData.error) {
		return store.dispatch(logout(responseData.error));
	}
	return responseData;
};

export const register = async data => {
	const response = await fetch("/users/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	const responseData = await response.json();
	return responseData;
};

export const createUser = async data => {
	const response = await fetch(
		"/users/createUser",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}
	);
	const responseData = await response.json();
	return responseData;
};

export const logUserIn = async data => {
	const response = await fetch("/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	const responseData = await response.json();
	return responseData;
};

export const updateUser = async data => {
	const responseData = await fetchAndValidate(
		"/users/update",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}
	);
	return responseData;
};

export const getUsers = async () => {
	const responseData = await fetchAndValidate(
		"/users",
		{
			credentials: "include"
		}
	);
	return responseData;
};

export const requestNewPassword = async data => {
	const response = await fetch(
		"/users/requestNewPassword",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}
	);
	const responseData = await response.json();
	return responseData;
};

export const updatePassword = async (data, id, token) => {
	const response = await fetch(
		`/users/updatePassword`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ password: data.password, id, token })
		}
	);
	const responseData = await response.json();
	return responseData;
};
