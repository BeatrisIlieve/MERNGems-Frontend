import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/user-personal-information`;

export const personalInformationServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    find: (userId) => request.get(`${baseUrl}/${userId}`),
    
    update: (userId, data) => request.put(`${baseUrl}/${userId}`, data),
  };
};
