import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/collection`;

export const jewelryCollectionServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findAll: (collectionId) => request.get(`${baseUrl}/${collectionId}`),
  };
};
