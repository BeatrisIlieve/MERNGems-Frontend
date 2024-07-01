import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MiniBag } from "./MiniBag";
import { useBagContext } from "../../../contexts/BagContext";

jest.mock("../../../contexts/BagContext");

const mockBagItems = [
  {
    _id: "1",
    firstImageUrl: "https://example.com/image1.jpg",
    jewelryTitle: "Jewelry Item 1",
    totalPrice: 100,
    maxQuantity: 5,
    quantity: 2,
    size: "5.98",
  },
  {
    _id: "2",
    firstImageUrl: "https://example.com/image2.jpg",
    jewelryTitle: "Jewelry Item 2",
    totalPrice: 200,
    maxQuantity: 3,
    quantity: 1,
    size: "16.4",
  },
];

const mockContextValue = {
  bagItems: mockBagItems,
  totalPrice: 300,
  totalQuantity: 3,
};

describe("MiniBag Component", () => {
  beforeEach(() => {
    useBagContext.mockReturnValue(mockContextValue);
  });

  it("renders correctly with bag items, total price, and total quantity", () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <MiniBag onClose={jest.fn()} miniBagRef={React.createRef()} />
      </MemoryRouter>
    );

    expect(getByText("Your Bag")).toBeInTheDocument();
    expect(getByText("3 items")).toBeInTheDocument();
    expect(getByText("Total:")).toBeInTheDocument();
    expect(getByText("$300")).toBeInTheDocument();

    const items = getAllByRole("listitem");
    expect(items.length).toBe(mockBagItems.length);
    expect(getByText("Jewelry Item 1")).toBeInTheDocument();
    expect(getByText("Jewelry Item 2")).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <MemoryRouter>
        <MiniBag onClose={onCloseMock} miniBagRef={React.createRef()} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("x-mark"));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("renders view bag and continue checkout buttons correctly", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <MiniBag onClose={jest.fn()} miniBagRef={React.createRef()} />
      </MemoryRouter>
    );

    expect(getByRole("button", { name: "View Bag" })).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Continue Checkout" })
    ).toBeInTheDocument();
  });
});
