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
  const response = await fetch(
    process.env.REACT_APP_SERVER + "/users/register",
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

export const createUser = async data => {
  const response = await fetch(
    process.env.REACT_APP_SERVER + "/users/createUser",
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
  const response = await fetch(process.env.REACT_APP_SERVER + "/users/login", {
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
    process.env.REACT_APP_SERVER + "/users/update",
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
    process.env.REACT_APP_SERVER + "/users",
    {
      credentials: "include"
    }
  );
  return responseData;
};

export const requestNewPassword = async data => {
  const response = await fetch(
    process.env.REACT_APP_SERVER + "/users/requestNewPassword",
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
    process.env.REACT_APP_SERVER + `/users/updatePassword`,
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
