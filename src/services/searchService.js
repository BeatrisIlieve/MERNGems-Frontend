import { requestFactory } from "./requester";

import { HOST } from "../constants/host";

const baseUrl = `${HOST}/search`;

export const searchServiceFactory = (token) => {
  const request = requestFactory(token);

  const userId = localStorage.getItem("userUUID");

  return {
    findAll: (query) =>
      request.get(`${baseUrl}/find-all/${userId}?query=${query}`),
  };
};
