import { ERROR_MESSAGES } from "../constants/forms";

const isValid = (value, pattern) => {
  return pattern.test(value);
};

export const getPatternErrorMessage = (field, value, pattern) => {
  if (!isValid(value, pattern)) {
    return ERROR_MESSAGES[field];
  } else {
    return "";
  }
};