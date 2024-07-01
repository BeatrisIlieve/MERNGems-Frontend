const requester = async (method, token, url, data, setError) => {
  const userUUID = localStorage.getItem("userUUID");

  const options = {};

  options.method = method;

  options.headers = {
    "content-type": "application/json",
    "user-uuid": userUUID,
  };

  if (method !== "GET") {
    if (data) {
      options.body = JSON.stringify(data);
    }
  }

  if (token) {
    options.headers = {
      ...options.headers,
      "X-Authorization": token,
    };
  }

  const response = await fetch(url, options);

  if (response.status === 204) {
    return {};
  }

  if (response.status === 404) {
    setError({ code: 404, message: "Not Found" });
    return {};
  }

  const result = await response.json();

  if (!response.ok) {
    throw result;
  }

  return result;
};

export const requestFactory = (token) => {
  if (!token) {
    const serializedAuth = localStorage.getItem("auth");

    if (serializedAuth) {
      const auth = JSON.stringify(serializedAuth);
      token = auth.AccessToken;
    }
  }
  return {
    get: requester.bind(null, "GET", token),
    post: requester.bind(null, "POST", token),
    put: requester.bind(null, "PUT", token),
    patch: requester.bind(null, "PATCH", token),
    delete: requester.bind(null, "DELETE", token),
  };
};
