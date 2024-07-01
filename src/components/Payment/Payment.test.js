import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Payment } from "./Payment";
import { useAuthContext } from "../../contexts/AuthContext";
import { useBagContext } from "../../contexts/BagContext";
import { useService } from "../../hooks/useService";

jest.mock("../../contexts/AuthContext");
jest.mock("../../contexts/BagContext");
jest.mock("../../hooks/useService");

describe("Payment Component", () => {
  const mockUserId = "mockUserId";
  const mockUser = {
    email: "test@example.com",
  };
  const mockUserInformation = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123-456-7890",
    country: "USA",
    city: "New York",
    zipCode: "10001",
    street: "123 Test St",
    apartment: "Apt 1",
  };
  const mockBagItems = [
    { _id: "1", name: "Item 1", price: 10, quantity: 2 },
    { _id: "2", name: "Item 2", price: 15, quantity: 1 },
  ];
  const mockTotalPrice = 35;
  const mockTotalQuantity = 3;
  const mockLoading = false;

  beforeEach(() => {
    useAuthContext.mockReturnValue({
      isAuthenticated: true,
      userId: mockUserId,
    });

    useBagContext.mockReturnValue({
      bagItems: mockBagItems,
      totalPrice: mockTotalPrice,
      totalQuantity: mockTotalQuantity,
      loading: mockLoading,
    });

    useService.mockReturnValueOnce({
      find: jest.fn().mockResolvedValue(mockUser),
    });
    useService.mockReturnValueOnce({
      find: jest.fn().mockResolvedValue(mockUserInformation),
    });
  });

  it("displays login popup when not authenticated", async () => {
    useAuthContext.mockReturnValueOnce({
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <Payment />
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-popup")).toBeInTheDocument();
  });

  it("displays LoadingSpinner when loading is true", () => {
    useBagContext.mockReturnValueOnce({
      bagItems: [],
      totalPrice: 0,
      totalQuantity: 0,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Payment />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("does not display LoadingSpinner when loading is false", () => {
    render(
      <MemoryRouter>
        <Payment />
      </MemoryRouter>
    );

    expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
  });
});
