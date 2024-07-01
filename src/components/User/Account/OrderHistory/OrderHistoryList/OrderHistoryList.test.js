import React from "react";
import { render } from "@testing-library/react";
import { OrderHistoryList } from "./OrderHistoryList";

describe("OrderHistoryList Component", () => {
  test("renders correctly with mock data", () => {
    const mockProps = {
      _id: "order_123",
      status: "Delivered",
      createdAt: "2023-06-24T10:30:00.000Z",
      subTotal: 150,
      jewelries: [
        {
          _id: "jewelry_1",
          jewelryTitle: "Mock Jewelry 1",
          quantity: 2,
          price: 50,
          imageUrl: "mock_image_url_1",
        },
        {
          _id: "jewelry_2",
          jewelryTitle: "Mock Jewelry 2",
          quantity: 1,
          price: 100,
          imageUrl: "mock_image_url_2",
        },
      ],
    };

    const { getByText, getByRole } = render(
      <OrderHistoryList {...mockProps} />
    );

    expect(getByText("Status:")).toBeInTheDocument();
    expect(getByText("Delivered")).toBeInTheDocument();

    expect(getByText("Created At:")).toBeInTheDocument();
    expect(getByText("2023-06-24")).toBeInTheDocument();

    expect(getByText("Total:")).toBeInTheDocument();
    expect(getByText("$150")).toBeInTheDocument();

    const jewelryItems = getByRole("list").querySelectorAll("li");
    expect(jewelryItems.length).toBe(mockProps.jewelries.length);

    mockProps.jewelries.forEach((jewelry, index) => {
      const jewelryElement = jewelryItems[index];
      expect(jewelryElement).toBeInTheDocument();
      expect(jewelryElement).toHaveClass("jewelry-item");
    });
  });
});
