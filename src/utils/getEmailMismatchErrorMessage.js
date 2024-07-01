import { ERROR_MESSAGES } from "../constants/forms";

export const getEmailMismatchErrorMessage = (email, retypeEmail) => {
  if (email !== retypeEmail) {
    return ERROR_MESSAGES.emailMismatch;
  } else {
    return "";
  }
};
