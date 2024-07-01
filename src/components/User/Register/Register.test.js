import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Register } from "./Register";
import { Login } from "../Login/Login";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("Register Component", () => {
  test("Should load image", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const imageElement = screen.getByTestId("image-element");
    expect(imageElement).toBeInTheDocument();
  });

  test("Should load title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const titleElement = screen.getByTestId("sign-up-title-element");
    expect(titleElement).toBeInTheDocument();
  });

  test("Should load sub-title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const subTitleElement = screen.getByTestId("sign-up-sub-title-element");
    expect(subTitleElement).toBeInTheDocument();
  });

  test("Should load password requirements", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const passwordRequirementsElement = screen.getByTestId(
      "password-requirements-element"
    );
    expect(passwordRequirementsElement).toBeInTheDocument();
  });

  test("Should redirect to login", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={["/user/register"]}>
          <Routes>
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const signInButton = screen.getByTestId("sign-in-button");
    expect(signInButton).toBeInTheDocument();
    fireEvent.click(signInButton);

    const signInTitleElement = screen.getByTestId("sign-in-title-element");
    expect(signInTitleElement).toBeInTheDocument();
  });
});
