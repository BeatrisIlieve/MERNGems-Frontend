import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/user-login-information`;

export const loginInformationServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    find: (userId) => request.get(`${baseUrl}/${userId}`),

    updateEmail: (userId, data) =>
      request.put(`${baseUrl}/update-email/${userId}`, data),

    updatePassword: (userId, data) =>
      request.put(`${baseUrl}/update-password/${userId}`, data),
  };
};
