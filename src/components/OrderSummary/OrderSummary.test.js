import React from "react";
import { render, screen } from "@testing-library/react";
import { OrderSummary } from "./OrderSummary";

describe("OrderSummary Component", () => {
  test("renders with correct props", () => {
    const props = {
      firstImageUrl: "test-image-url.jpg",
      jewelryTitle: "Test Jewelry",
      totalPrice: 100,
      quantity: 2,
      size: "4.58",
    };

    render(
      <OrderSummary
        firstImageUrl={props.firstImageUrl}
        jewelryTitle={props.jewelryTitle}
        totalPrice={props.totalPrice}
        quantity={props.quantity}
        size={props.size}
      />
    );

    const imageElement = screen.getByTestId("image");
    const titleElement = screen.getByTestId("title");
    const sizeElement = screen.getByTestId("size");
    const priceElement = screen.getByTestId("price");
    const quantityElement = screen.getByTestId("quantity");

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(sizeElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(quantityElement).toBeInTheDocument();
  });
});
