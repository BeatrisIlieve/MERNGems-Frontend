import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { Register } from "../Register/Register";
import { Login } from "./Login";

const mockOnRegisterSubmit = jest.fn();

const mockAuthContextValue = {
  onRegisterSubmit: mockOnRegisterSubmit,
};

describe("Login Component", () => {
  test("Should load image", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const imageElement = screen.getByTestId("image-element");
    expect(imageElement).toBeInTheDocument();
  });

  test("Should load sing in title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const singInTitleElement = screen.getByTestId("sign-in-title-element");
    expect(singInTitleElement).toBeInTheDocument();
  });

  test("Should load sing in sub-title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const singInSubTitleElement = screen.getByTestId(
      "sign-in-sub-title-element"
    );
    expect(singInSubTitleElement).toBeInTheDocument();
  });

  test("Should load sing-up in title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const singUpTitleElement = screen.getByTestId("sign-up-title-element");
    expect(singUpTitleElement).toBeInTheDocument();
  });

  test("Should load sing up sub-title", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    const singUpSubTitleElement = screen.getByTestId(
      "sign-up-sub-title-element"
    );
    expect(singUpSubTitleElement).toBeInTheDocument();
  });

  test("Should redirect to register", async () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={["/user/login"]}>
          <Routes>
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const signUpButton = screen.getByTestId("sign-up-button");
    expect(signUpButton).toBeInTheDocument();
    fireEvent.click(signUpButton);

    const signUpTitleElement = screen.getByTestId("sign-up-title-element");
    expect(signUpTitleElement).toBeInTheDocument();
  });
});
