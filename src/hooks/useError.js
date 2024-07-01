import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorContext";

export const useError = () => {
  const { error, setError } = useContext(ErrorContext);
  return { error, setError };
};
