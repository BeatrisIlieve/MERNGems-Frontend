import { requestFactory } from "./requester";
import { HOST } from "../constants/host";

const baseUrl = `${HOST}/stone`;

export const stoneServiceFactory = (token) => {
  const request = requestFactory(token);

  return {
    findStoneTypes: (serializedObject) =>
      request.get(
        `${baseUrl}/by-stone-types?data=${encodeURIComponent(serializedObject)}`
      ),

    findStoneColors: (serializedObject) =>
      request.get(
        `${baseUrl}/by-stone-colors?data=${encodeURIComponent(
          serializedObject
        )}`
      ),
  };
};
