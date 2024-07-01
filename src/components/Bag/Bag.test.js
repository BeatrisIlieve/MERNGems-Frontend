import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Bag } from "./Bag";
import { useBagContext } from "../../contexts/BagContext";

jest.mock("../../contexts/BagContext");

jest.mock("../LoadingSpinner/LoadingSpinner", () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));

jest.mock("./EmptyBag/EmptyBag", () => ({
  EmptyBag: () => <div>Your Shopping Bag is Empty.</div>,
}));

const mockBagItems = [
  {
    _id: "1",
    firstImageUrl: "https://example.com/image1.jpg",
    jewelryTitle: "Jewelry Item 1",
    totalPrice: 100,
    maxQuantity: 5,
    quantity: 2,
    size: "19.6",
  },
  {
    _id: "2",
    firstImageUrl: "https://example.com/image2.jpg",
    jewelryTitle: "Jewelry Item 2",
    totalPrice: 200,
    maxQuantity: 3,
    quantity: 1,
    size: "7.9",
  },
];

describe("Bag Component", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders correctly with bag items, total price, and total quantity", () => {
    useBagContext.mockReturnValue({
      bagItems: mockBagItems,
      totalPrice: 300,
      totalQuantity: 3,
      isEmpty: false,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Bag />
      </MemoryRouter>
    );
    expect(screen.getByText("Your Bag")).toBeInTheDocument();
    expect(screen.getByText("Delivery")).toBeInTheDocument();
    expect(screen.getByText("(3 items)")).toBeInTheDocument();
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getAllByText("$300")).toHaveLength(2);
    expect(screen.getByText("Complimentary")).toBeInTheDocument();

    expect(screen.getByText("Jewelry Item 1")).toBeInTheDocument();
    expect(screen.getByText("Jewelry Item 2")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Continue Checkout" })
    ).toBeInTheDocument();
  });

  test("renders the EmptyBag component when the bag is empty", () => {
    useBagContext.mockReturnValue({
      bagItems: [],
      totalPrice: 0,
      totalQuantity: 0,
      isEmpty: true,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Bag />
      </MemoryRouter>
    );
    expect(screen.getByText("Your Shopping Bag is Empty.")).toBeInTheDocument();
  });

  test("renders the LoadingSpinner component when loading", () => {
    useBagContext.mockReturnValue({
      bagItems: mockBagItems,
      totalPrice: 300,
      totalQuantity: 3,
      isEmpty: false,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Bag />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
