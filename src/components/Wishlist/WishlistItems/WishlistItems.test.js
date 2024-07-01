import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { WishlistItems } from "./WishlistItems";
import { useWishlistContext } from "../../../contexts/WishlistContext";
import { JewelryCard } from "../../JewelryCard/JewelryCard";
import { JewelryCardHovered } from "../../JewelryCardHovered/JewelryCardHovered";
import { slugify } from "../../../utils/slugify";

jest.mock("../../../contexts/WishlistContext");
jest.mock("../../JewelryCard/JewelryCard", () => ({
  JewelryCard: jest.fn(() => <div>JewelryCard Mock</div>),
}));
jest.mock("../../JewelryCardHovered/JewelryCardHovered", () => ({
  JewelryCardHovered: jest.fn(() => <div>JewelryCardHovered Mock</div>),
}));
jest.mock("../../../utils/slugify");

describe("WishlistItems Component", () => {
  const mockContextValue = {
    onRemoveFromWishlistClick: jest.fn(),
  };
  const mockProps = {
    _id: "1",
    firstImageUrl: "image-url",
    jewelryTitle: "Beautiful Jewelry",
    categoryTitle: "Necklace",
    isSoldOut: false,
    isHovered: false,
    mouseEnterHandler: jest.fn(),
    mouseLeaveHandler: jest.fn(),
    toggleLike: jest.fn(),
    price: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useWishlistContext.mockReturnValue(mockContextValue);
    slugify.mockImplementation((str) => str.toLowerCase().replace(/ /g, "-"));
  });

  test("renders JewelryCard by default", () => {
    render(<WishlistItems {...mockProps} />);

    expect(JewelryCard).toHaveBeenCalledWith(
      {
        firstImageUrl: mockProps.firstImageUrl,
        jewelryTitle: mockProps.jewelryTitle,
        isSoldOut: mockProps.isSoldOut,
      },
      {}
    );
  });

  test("renders JewelryCardHovered when isHovered is true", () => {
    render(<WishlistItems {...mockProps} isHovered={true} />);

    expect(JewelryCardHovered).toHaveBeenCalledWith(
      {
        _id: mockProps._id,
        firstImageUrl: mockProps.firstImageUrl,
        jewelryTitle: mockProps.jewelryTitle,
        handleLikeClick: expect.any(Function),
        slugifiedCategoryTitle: "necklace",
        slugifiedJewelryTitle: "beautiful-jewelry",
        isLikedByUser: true,
        price: mockProps.price,
      },
      {}
    );
  });

  test("handles mouse enter and leave events", () => {
    render(<WishlistItems {...mockProps} />);

    const article = screen.getByRole("article");

    fireEvent.mouseEnter(article);
    expect(mockProps.mouseEnterHandler).toHaveBeenCalledWith(mockProps._id);

    fireEvent.mouseLeave(article);
    expect(mockProps.mouseLeaveHandler).toHaveBeenCalledWith(mockProps._id);
  });

  test("handles like click", () => {
    render(<WishlistItems {...mockProps} isHovered={true} />);

    const likeClickHandler =
      JewelryCardHovered.mock.calls[0][0].handleLikeClick;
    likeClickHandler(mockProps._id);

    expect(mockContextValue.onRemoveFromWishlistClick).toHaveBeenCalledWith(
      mockProps._id
    );
    expect(mockProps.toggleLike).toHaveBeenCalledWith(mockProps._id);
  });
});
