import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/order-history`;

export const orderHistoryServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (userId) => request.get(`${baseUrl}/display/${userId}`),
  };
};
