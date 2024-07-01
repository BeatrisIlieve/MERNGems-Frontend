import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/checkout`;

export const checkoutServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    update: (userId, data) => request.put(`${baseUrl}/update/${userId}`, data),
  };
};
