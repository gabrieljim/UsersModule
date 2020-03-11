export const createUser = async (data) => {
	const response = await fetch(
		process.env.REACT_APP_SERVER + "/users/newUser",
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
}
