import React from "react";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, useAuthContext } from "../../contexts/AuthContext";
import { BagContext, useBagContext } from "../../contexts/BagContext";
import {
  WishlistContext,
  useWishlistContext,
} from "../../contexts/WishlistContext";

const mockAuthContextValue = {
  isAuthenticated: true,
  onRegisterSubmit: jest.fn(),
};

const mockWishlistContextValue = {
  wishlistCount: 2,
  wishlistCountGreaterThanZero: true,
};

const mockBagContextValue = {
  totalQuantity: 1,
};

jest.mock("../../contexts/AuthContext", () => {
  const actual = jest.requireActual("../../contexts/AuthContext");
  return {
    ...actual,
    useAuthContext: jest.fn(),
  };
});

jest.mock("../../contexts/WishlistContext", () => {
  const actual = jest.requireActual("../../contexts/WishlistContext");
  return {
    ...actual,
    useWishlistContext: jest.fn(),
  };
});

jest.mock("../../contexts/BagContext", () => {
  const actual = jest.requireActual("../../contexts/BagContext");
  return {
    ...actual,
    useBagContext: jest.fn(),
  };
});

test("renders Header with correct context values", () => {
  useAuthContext.mockReturnValue(mockAuthContextValue);
  useWishlistContext.mockReturnValue(mockWishlistContextValue);
  useBagContext.mockReturnValue(mockBagContextValue);

  render(
    <AuthContext.Provider value={mockAuthContextValue}>
      <WishlistContext.Provider value={mockWishlistContextValue}>
        <BagContext.Provider value={mockBagContextValue}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </BagContext.Provider>
      </WishlistContext.Provider>
    </AuthContext.Provider>
  );

  expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Account/i)).toBeInTheDocument();
  expect(screen.getByText(/\(1\)/)).toBeInTheDocument();
  expect(screen.getByText(/\(2\)/)).toBeInTheDocument();
});
