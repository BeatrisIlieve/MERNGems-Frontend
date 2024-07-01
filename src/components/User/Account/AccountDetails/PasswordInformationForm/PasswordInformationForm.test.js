import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { PasswordInformationForm } from "./PasswordInformationForm";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "../../../../../constants/forms";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { loginInformationServiceFactory } from "../../../../../services/loginInformationService";

const userId = "user-id";

const mockAuthContextValue = {
  userId: userId,
};

jest.mock("../../../../../services/loginInformationService", () => ({
  loginInformationServiceFactory: jest.fn(),
}));

const mockFind = jest.fn();
const mockUpdate = jest.fn();

describe("PasswordInformationForm Component", () => {
  beforeEach(() => {
    loginInformationServiceFactory.mockReturnValue({
      find: mockFind,
      updatePassword: mockUpdate,
    });
  });

  test("Submits the form with valid values; Expect update function to be called; Expect success message", async () => {
    const mockUserInformation = {
      userId: userId,
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].validTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    const { password, newPassword } = submitData;

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(userId, {
        password,
        newPassword,
      });
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent("");
    });

    const successMessageContainer = screen.getByTestId(
      `${FORM_KEYS.NewPassword}-success`
    );

    expect(successMessageContainer).toHaveTextContent(
      SUCCESS_MESSAGES.newPassword
    );
  });

  test("Submits the form with invalid values; Expect update function not to be called; Expect errors", async () => {
    const mockUserInformation = {
      userId: userId,
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].invalidTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.invalidTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  test("Submits the form with empty values; Expect update function not to be called; Expect errors", async () => {
    const mockUserInformation = {
      userId: userId,
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: INITIAL_FORM_VALUES[inputKey].emptyTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.emptyTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  test("Submits the form with different newPassword and retypeNewPassword values; Expect update function not to be called; Expect errors", async () => {
    const mockUserInformation = {
      userId: userId,
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: {
          value: INITIAL_FORM_VALUES[inputKey].differentPasswordsTestData,
        },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.differentPasswordsTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    const newPasswordErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.NewPassword}-error`
    );

    expect(newPasswordErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.passwordMismatch
    );

    const retypeNewPasswordErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.RetypeNewPassword}-error`
    );

    expect(retypeNewPasswordErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.passwordMismatch
    );
  });

  test("Submits the form with different newPassword and retypeNewPassword values; Expect update function not to be called; Expect errors", async () => {
    const mockUserInformation = {
      userId: userId,
    };

    mockFind.mockResolvedValue(mockUserInformation);

    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <PasswordInformationForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: {
          value: INITIAL_FORM_VALUES[inputKey].differentPasswordsTestData,
        },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.differentPasswordsTestData;
    });

    await waitFor(() => {
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    const newPasswordErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.NewPassword}-error`
    );

    expect(newPasswordErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.passwordMismatch
    );

    const retypeNewPasswordErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.RetypeNewPassword}-error`
    );

    expect(retypeNewPasswordErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.passwordMismatch
    );
  });
});
