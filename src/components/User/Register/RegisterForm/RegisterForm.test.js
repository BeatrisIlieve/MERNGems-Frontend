import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "./RegisterForm";
import { AuthContext } from "../../../../contexts/AuthContext";
import {
  ERROR_MESSAGES,
  EMAIL_ALREADY_EXISTS_ERROR_MESSAGE,
} from "../../../../constants/forms";
import { FORM_KEYS, INITIAL_FORM_VALUES } from "./initialFormValues";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("RegisterForm Component", () => {
  test("Submits the form with valid values; Expect update function to be called", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
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

    const { firstName, lastName, email, password } = submitData;
    
    await waitFor(() => {
      expect(mockOnRegisterSubmit).toHaveBeenCalledWith({
        firstName,
        lastName,
        email,
        password,
      });
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent("");
    });
  });

  test("Submits the form with invalid values; Expect update function not to be called", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
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
      expect(mockOnRegisterSubmit).not.toHaveBeenCalled();
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  test("Submits the form with empty values; Expect update function not to be called", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
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
      expect(mockOnRegisterSubmit).not.toHaveBeenCalled();
    });

    Object.keys(INITIAL_FORM_VALUES).forEach((key) => {
      const errorMessageContainer = screen.getByTestId(`${key}-error`);
      expect(errorMessageContainer).toHaveTextContent(ERROR_MESSAGES[key]);
    });
  });

  test("Submits the form with different password and retypePassword values; Expect update function not to be called; Expect errors", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
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
      expect(mockOnRegisterSubmit).not.toHaveBeenCalled();
    });

    const passwordErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Password}-error`
    );

    expect(passwordErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.passwordMismatch
    );

    const retypePasswordErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.RetypePassword}-error`
    );

    expect(retypePasswordErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.passwordMismatch
    );
  });

  test("Submits the form with different email and retypeEmail values; Expect update function not to be called; Expect errors", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <RegisterForm />
      </AuthContext.Provider>
    );

    const inputs = {};

    Object.values(FORM_KEYS).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: {
          value: INITIAL_FORM_VALUES[inputKey].differentEmailsTestData,
        },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(INITIAL_FORM_VALUES).forEach(([key, value]) => {
      submitData[key] = value.differentEmailsTestData;
    });

    await waitFor(() => {
      expect(mockOnRegisterSubmit).not.toHaveBeenCalled();
    });

    const emailErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.Email}-error`
    );

    expect(emailErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.emailMismatch
    );

    const retypeEmailErrorMessageContainer = screen.getByTestId(
      `${FORM_KEYS.RetypeEmail}-error`
    );

    expect(retypeEmailErrorMessageContainer).toHaveTextContent(
      ERROR_MESSAGES.emailMismatch
    );
  });
});
