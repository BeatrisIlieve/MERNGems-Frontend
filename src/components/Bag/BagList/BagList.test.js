import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BagList } from "./BagList";
import { BagContext } from "../../../contexts/BagContext";

describe("BagList Component", () => {
  it("renders with correct props and interacts with context functions", () => {
    const props = {
      _id: "1",
      firstImageUrl: "test-image.jpg",
      jewelryTitle: "Test Jewelry",
      totalPrice: 50,
      maxQuantity: 5,
      quantity: 2,
      size: "5.87",
    };

    const mockOnDecrement = jest.fn();
    const mockOnIncrement = jest.fn();
    const mockOnRemove = jest.fn();

    render(
      <BagContext.Provider
        value={{
          onDecrement: mockOnDecrement,
          onIncrement: mockOnIncrement,
          onRemove: mockOnRemove,
        }}
      >
        <BagList {...props} />
      </BagContext.Provider>
    );

    const titleElement = screen.getByTestId("title");
    const sizeElement = screen.getByTestId("size");
    const priceElement = screen.getByTestId("total-price");
    const quantityElement = screen.getByTestId("quantity");
    const imgElement = screen.getByTestId("image");
    const removeButton = screen.getByTestId("remove-button");
    const plusButton = screen.getByTestId("increment-button");
    const minusButton = screen.getByTestId("decrement-button");

    expect(titleElement).toBeInTheDocument();
    expect(sizeElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(quantityElement).toHaveTextContent(props.quantity.toString());
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", props.firstImageUrl);

    fireEvent.click(removeButton);
    expect(mockOnRemove).toHaveBeenCalledWith(props._id);

    fireEvent.click(plusButton);
    expect(mockOnIncrement).toHaveBeenCalledWith(props._id);

    fireEvent.click(minusButton);
    expect(mockOnDecrement).toHaveBeenCalledWith(props._id);
  });
});
