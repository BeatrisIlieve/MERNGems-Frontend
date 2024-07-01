import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Checkout } from "./Checkout";
import { useBagContext } from "../../contexts/BagContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { useService } from "../../hooks/useService";
import { addressInformationServiceFactory } from "../../services/addressInformationService";
import { authServiceFactory } from "../../services/authService";

jest.mock("../../contexts/BagContext");
jest.mock("../../contexts/AuthContext");
jest.mock("../../hooks/useService");
jest.mock("../DynamicForm/DynamicFormAuthUser", () => ({
  DynamicFormAuthUser: () => <div>DynamicFormAuthUser</div>,
}));
jest.mock("../OrderSummary/OrderSummary", () => ({
  OrderSummary: () => <div>OrderSummary Item</div>,
}));
jest.mock("../LoadingSpinner/LoadingSpinner", () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));

const mockBagItems = [
  {
    _id: "1",
    firstImageUrl: "https://example.com/image1.jpg",
    jewelryTitle: "Jewelry Item 1",
    totalPrice: 100,
    maxQuantity: 5,
    quantity: 2,
    size: "5.5",
  },
  {
    _id: "2",
    firstImageUrl: "https://example.com/image2.jpg",
    jewelryTitle: "Jewelry Item 2",
    totalPrice: 200,
    maxQuantity: 3,
    quantity: 1,
    size: "4.8",
  },
];

describe("Checkout Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    useBagContext.mockReturnValue({
      bagItems: mockBagItems,
      totalPrice: 300,
      loading: false,
    });

    useAuthContext.mockReturnValue({
      userId: "user-id",
    });

    useService.mockImplementation((factory) => {
      if (factory === authServiceFactory) {
        return {
          find: jest.fn().mockResolvedValue({
            email: "test@example.com",
          }),
        };
      } else if (factory === addressInformationServiceFactory) {
        return {
          find: jest.fn().mockResolvedValue([]),
          update: jest.fn(),
        };
      }
    });
  });

  test("renders correctly with user information and order summary", async () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(await screen.findByText("test@example.com")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Continue Checkout" })
    ).toBeInTheDocument();

    expect(screen.getAllByText("OrderSummary Item")).toHaveLength(
      mockBagItems.length
    );

    expect(screen.getAllByText("$300")).toHaveLength(2);
  });

  test("renders LoadingSpinner when loading", () => {
    useBagContext.mockReturnValue({
      bagItems: mockBagItems,
      totalPrice: 300,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
