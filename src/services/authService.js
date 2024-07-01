import { requestFactory } from "./requester";

import { HOST } from "../constants/host";

const baseUrl = `${HOST}/user-login-information`;

export const authServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    register: (data) => request.post(`${baseUrl}/register`, data),

    login: (data) => request.post(`${baseUrl}/login`, data),

    find: (userId) => request.get(`${baseUrl}/${userId}`),

    logout: () => request.get(`${baseUrl}/logout`),

    delete: (userId) => request.delete(`${baseUrl}/${userId}`),
  };
};
