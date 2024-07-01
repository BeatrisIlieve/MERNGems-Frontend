import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/suggestion`;

export const jewelrySuggestionServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (jewelryId) => request.get(`${baseUrl}/${jewelryId}`),
  };
};
