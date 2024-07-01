import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/user-address-information`;

export const addressInformationServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    find: (userId) => request.get(`${baseUrl}/${userId}`),
    
    update: (userId, data) => request.put(`${baseUrl}/${userId}`, data),
  };
};
