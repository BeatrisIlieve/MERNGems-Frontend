import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  NAME_PATTERN,
} from "../../../../constants/forms";

const FORM_KEYS = {
  FirstName: "firstName",
  LastName: "lastName",
  Email: "email",
  RetypeEmail: "retypeEmail",
  Password: "password",
  RetypePassword: "retypePassword",
};

export const INITIAL_FORM_VALUES = {
  [FORM_KEYS.Email]: {
    fieldLabel: "Email Address",
    fieldValue: "",
    regexPattern: EMAIL_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "email",
    validTestData: "test@email.com",
    invalidTestData: "t@e.c",
    emptyTestData: "",
    differentPasswordsTestData: "test@email.com",
    differentEmailsTestData: "test@email.com",
  },

  [FORM_KEYS.RetypeEmail]: {
    fieldLabel: "Retype Email Address",
    fieldValue: "",
    regexPattern: EMAIL_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "email",
    validTestData: "test@email.com",
    invalidTestData: "t@e.c",
    emptyTestData: "",
    differentPasswordsTestData: "test@email.com",
    differentEmailsTestData: "test1@email.com",
  },

  [FORM_KEYS.Password]: {
    fieldLabel: "Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "password",
    validTestData: "123456Tt",
    invalidTestData: "12345678",
    emptyTestData: "",
    differentPasswordsTestData: "123456Tt",
    differentEmailsTestData: "123456Tt",
  },

  [FORM_KEYS.RetypePassword]: {
    fieldLabel: "Retype Password",
    fieldValue: "",
    regexPattern: PASSWORD_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "password",
    validTestData: "123456Tt",
    invalidTestData: "12345678",
    emptyTestData: "",
    differentPasswordsTestData: "123456Ty",
    differentEmailsTestData: "123456Tt",
  },

  [FORM_KEYS.FirstName]: {
    fieldLabel: "First Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "Test",
    invalidTestData: "Test1",
    emptyTestData: "",
    differentPasswordsTestData: "Test",
    differentEmailsTestData: "Test",
  },

  [FORM_KEYS.LastName]: {
    fieldLabel: "Last Name",
    fieldValue: "",
    regexPattern: NAME_PATTERN,
    errorMessage: "",
    isFocused: false,
    fieldType: "text",
    validTestData: "Test",
    invalidTestData: "Test1",
    emptyTestData: "",
    differentPasswordsTestData: "Test",
    differentEmailsTestData: "Test",
  },
};

export { FORM_KEYS };
