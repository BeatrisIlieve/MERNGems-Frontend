import React from "react";
import { render, screen } from "@testing-library/react";
import { Wishlist } from "./Wishlist";
import { useJewelryList } from "../../hooks/useJewelryList";

jest.mock("../../hooks/useJewelryList");
jest.mock("../../contexts/WishlistContext", () => ({
  useWishlistContext: jest.fn(),
}));

describe("Wishlist", () => {
  beforeEach(() => {
    useJewelryList.mockReturnValue({
      setJewelries: jest.fn(),
      filteredJewelries: [],
      loading: false,
      mouseEnterHandler: jest.fn(),
      mouseLeaveHandler: jest.fn(),
      fetchData: jest.fn(),
      totalCount: 0,
      loadMoreDisabled: false,
      setLoadMoreDisabled: jest.fn(),
    });

    const mockUseWishlistContext = jest.fn();
    mockUseWishlistContext.mockReturnValue({
      wishlistCount: 0,
      wishlistCountGreaterThanZero: false,
    });
    require("../../contexts/WishlistContext").useWishlistContext =
      mockUseWishlistContext;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders "Your Wish List (0)" when wishlistCount is zero', () => {
    render(<Wishlist serviceFactory={() => {}} />);

    expect(screen.getByText("Your Wish List (0)")).toBeInTheDocument();
    expect(
      screen.queryByText("Your favorite item(s) are below.")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Wishes can come true, especially when you dream.")
    ).not.toBeInTheDocument();
  });
});
