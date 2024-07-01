import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { JewelryCardHovered } from "./JewelryCardHovered";

describe("JewelryCardHovered", () => {
  const jewelryData = {
    _id: "123",
    firstImageUrl: "image.jpg",
    jewelryTitle: "Test Jewelry",
    handleLikeClick: jest.fn(),
    slugifiedCategoryTitle: "test-category",
    slugifiedJewelryTitle: "test-jewelry",
    isLikedByUser: false,
    price: 50,
  };

  test("renders jewelry card correctly", () => {
    render(
      <MemoryRouter>
        <JewelryCardHovered {...jewelryData} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Jewelry")).toBeInTheDocument();
    expect(screen.getByText("$50")).toBeInTheDocument();

    const heartIcon = screen.getByTestId("heart-icon");
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).toHaveClass("fa-heart");

    const jewelryImage = screen.getByAltText("Test Jewelry");
    expect(jewelryImage).toBeInTheDocument();
    expect(jewelryImage.parentElement.tagName.toLowerCase()).toBe("a");
    expect(jewelryImage).toHaveAttribute("src", "image.jpg");
  });

  test("calls handleLikeClick when heart icon is clicked", () => {
    render(
      <MemoryRouter>
        <JewelryCardHovered {...jewelryData} />
      </MemoryRouter>
    );

    const heartIcon = screen.getByTestId("heart-icon");
    fireEvent.click(heartIcon);

    expect(jewelryData.handleLikeClick).toHaveBeenCalledTimes(1);
    expect(jewelryData.handleLikeClick).toHaveBeenCalledWith("123");
  });
});
