import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const UserUUIDContext = createContext();

export const UserUUIDProvider = ({ children }) => {
  let userUUID = localStorage.getItem("userUUID");

  if (!userUUID) {
    userUUID = uuidv4();
    localStorage.setItem("userUUID", userUUID);
  }

  const context = {
    userUUID,
  };

  return (
    <UserUUIDContext.Provider value={context}>
      {children}
    </UserUUIDContext.Provider>
  );
};

export const useUserUUIDContext = () => {
  const context = useContext(UserUUIDContext);

  return context;
};
