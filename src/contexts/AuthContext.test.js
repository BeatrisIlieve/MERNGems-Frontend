import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { authServiceFactory } from "../services/authService";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoginForm } from "../components/User/Login/LoginForm/LoginForm";
import { RegisterForm } from "../components/User/Register/RegisterForm/RegisterForm";
import { AccountDetails } from "../components/User/Account/AccountDetails/AccountDetails";
import {
  FORM_KEYS as loginFormKeys,
  INITIAL_FORM_VALUES as loginInitialFormValues,
} from "../components/User/Login/LoginForm/initialFormValues";
import {
  FORM_KEYS as registerFormKeys,
  INITIAL_FORM_VALUES as registerInitialFormValues,
} from "../components/User/Register/RegisterForm/initialFormValues";

jest.mock("../services/authService", () => ({
  authServiceFactory: jest.fn(),
}));

jest.mock("../hooks/useLocalStorage");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const userId = "user-id";
const token = "user-token";

const mockOnRegisterSubmit = jest.fn();
const mockOnLoginSubmit = jest.fn();
const mockOnLogout = jest.fn();
const mockOnDelete = jest.fn();
const mockSetAuth = jest.fn();

const mockNavigate = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
  onLoginSubmit: mockOnLoginSubmit,
  onLogout: mockOnLogout,
  onDelete: mockOnDelete,
  setAuth: mockSetAuth,
  userId,
};

describe("AuthContext", () => {
  beforeEach(() => {
    authServiceFactory.mockReturnValue({
      register: mockOnRegisterSubmit,
      login: mockOnLoginSubmit,
      logout: mockOnLogout,
      delete: mockOnDelete,
    });

    useLocalStorage.mockReturnValue([{}, mockSetAuth]);
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ state: { from: { pathname: "/" } } });
  });

  test("Should handle login submission, fill auth with userId and accessToken and redirect to home page", async () => {
    render(
      <Router>
        <AuthProvider value={mockAuthContextValue}>
          <LoginForm />
        </AuthProvider>
      </Router>
    );

    const mockUserInformation = {
      _id: userId,
      accessToken: token,
    };

    mockOnLoginSubmit.mockResolvedValue({ token: mockUserInformation });

    const inputs = {};

    Object.values(loginFormKeys).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: loginInitialFormValues[inputKey].validTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(loginInitialFormValues).forEach(([key, value]) => {
      submitData[key] = value.validTestData;
    });

    await waitFor(() => {
      expect(mockOnLoginSubmit).toHaveBeenCalledWith(submitData);
    });

    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith(mockUserInformation);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });

    const authSetArgument = mockSetAuth.mock.calls[0][0];
    expect(authSetArgument._id).toBe(userId);
    expect(authSetArgument.accessToken).toBe(token);
  });

  test("Should handle register submission, fill auth with userId and accessToken and redirect to home page", async () => {
    render(
      <Router>
        <AuthProvider value={mockAuthContextValue}>
          <RegisterForm />
        </AuthProvider>
      </Router>
    );

    const mockUserInformation = {
      _id: userId,
      accessToken: token,
    };

    mockOnRegisterSubmit.mockResolvedValue({ token: mockUserInformation });

    const inputs = {};

    Object.values(registerFormKeys).forEach((value) => {
      inputs[value] = screen.getByTestId(`${value}-input`);
    });

    Object.entries(inputs).forEach(([inputKey, inputValue]) => {
      fireEvent.change(inputValue, {
        target: { value: registerInitialFormValues[inputKey].validTestData },
      });
    });

    const submitButton = screen.getByTestId("submit");
    fireEvent.click(submitButton);

    const submitData = {};

    Object.entries(registerInitialFormValues).forEach(([key, value]) => {
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

    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith(mockUserInformation);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });

    const authSetArgument = mockSetAuth.mock.calls[0][0];
    expect(authSetArgument._id).toBe(userId);
    expect(authSetArgument.accessToken).toBe(token);
  });

  test("Should handle logout, clear auth and redirect to login page", async () => {
    render(
      <Router>
        <AuthProvider value={mockAuthContextValue}>
          <AccountDetails />
        </AuthProvider>
      </Router>
    );

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockOnLogout).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockSetAuth).toHaveBeenCalledWith({});
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/user/login");
    });

    const authSetArgument = mockSetAuth.mock.calls[0][0];
    expect(authSetArgument._id).not.toBe(userId);
    expect(authSetArgument.accessToken).not.toBe(token);
  });
});
