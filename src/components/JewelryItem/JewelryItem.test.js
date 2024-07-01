import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { JewelryItem } from "./JewelryItem";
import { useService } from "../../hooks/useService";
import { useWishlistContext } from "../../contexts/WishlistContext";
import { useBagContext } from "../../contexts/BagContext";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));
jest.mock("../../hooks/useService");
jest.mock("../../contexts/WishlistContext");
jest.mock("../../contexts/BagContext");
jest.mock("../LoadingSpinner/LoadingSpinner", () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));
jest.mock("../Bag/MiniBag/MiniBag", () => ({
  MiniBag: ({ onClose, miniBagRef }) => (
    <div ref={miniBagRef} onClick={onClose}>
      MiniBag Component
    </div>
  ),
}));
jest.mock("../JewelrySuggestion/JewelrySuggestion", () => ({
  JewelrySuggestion: ({ jewelryId }) => (
    <div>JewelrySuggestion Component for ID: {jewelryId}</div>
  ),
}));
jest.mock("../HorizontalLine/HorizontalLine", () => ({
  HorizontalLine: () => <div>HorizontalLine Component</div>,
}));

describe("JewelryItem component", () => {
  const mockJewelryService = {
    findOne: jest.fn(),
  };
  const mockWishlistContext = {
    onAddToWishlistClick: jest.fn(),
    onRemoveFromWishlistClick: jest.fn(),
  };
  const mockBagContext = {
    onAddToBagClick: jest.fn(),
  };

  beforeEach(() => {
    useParams.mockReturnValue({ _id: "123" });
    useService.mockReturnValue(mockJewelryService);
    useWishlistContext.mockReturnValue(mockWishlistContext);
    useBagContext.mockReturnValue(mockBagContext);
    jest.clearAllMocks();
  });

  test("renders jewelry item details after loading", async () => {
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      secondImageUrl: "test-image-2.jpg",
      isSoldOut: false,
      price: 100,
      isLikedByUser: false,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();

      expect(screen.getByTestId("jewelry-title")).toBeInTheDocument();
      expect(screen.getByTestId("jewelry-title")).toHaveTextContent(
        "Test Jewelry"
      );

      expect(screen.getByTestId("first-image-url")).toBeInTheDocument();
      expect(screen.getByTestId("first-image-url")).toHaveAttribute(
        "src",
        "test-image-1.jpg"
      );

      expect(screen.getByTestId("size-1")).toBeInTheDocument();
      expect(screen.getByTestId("size-label-1")).toHaveTextContent("6.98");
    });
  });

  test("renders second image after clicking on first image", async () => {
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      secondImageUrl: "test-image-2.jpg",
      isSoldOut: false,
      price: 100,
      isLikedByUser: false,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("first-image-url")).toBeInTheDocument();
    });

    const firstImage = screen.getByTestId("first-image-url");
    fireEvent.click(firstImage);

    await waitFor(() => {
      expect(screen.getByTestId("second-image-url")).toBeInTheDocument();
      expect(screen.getByTestId("second-image-url")).toHaveAttribute(
        "src",
        "test-image-2.jpg"
      );
    });
  });

  test("adds item to wishlist on heart icon click", async () => {
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      isSoldOut: false,
      price: 100,
      isLikedByUser: false,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("jewelry-title")).toBeInTheDocument();
    });

    const heartIcon = screen.getByTestId("add-to-wishlist-button");
    fireEvent.click(heartIcon);

    await waitFor(() => {
      expect(mockWishlistContext.onAddToWishlistClick).toHaveBeenCalledWith(
        "123"
      );
    });
  });

  test("adds item to bag on 'Add to Bag' button click", async () => {
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      isSoldOut: false,
      price: 100,
      isLikedByUser: false,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("jewelry-title")).toBeInTheDocument();
    });

    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    fireEvent.click(addToBagButton);

    await waitFor(() => {
      expect(mockBagContext.onAddToBagClick).toHaveBeenCalled();
    });
  });

  test("renders loading spinner while fetching data", async () => {
    mockJewelryService.findOne.mockResolvedValueOnce({});

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();

      expect(mockJewelryService.findOne).toHaveBeenCalledTimes(2);
    });
  });

  test("disables 'Add to Bag' button and displays 'SOLD OUT' message for sold out items", async () => {
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      isSoldOut: true,
      price: 100,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("add-to-bag-button")).toBeDisabled();
      expect(screen.getByText("SOLD OUT")).toBeInTheDocument();
    });
  });

  test("displays error when adding to bag without selecting size for category not equal to 2", async () => {
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      isSoldOut: false,
      price: 100,
      category: 1,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("jewelry-title")).toBeInTheDocument();
    });

    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    fireEvent.click(addToBagButton);

    await waitFor(() => {
      expect(
        screen.getByText("Ensure you have selected the desired size")
      ).toBeInTheDocument();
      expect(mockBagContext.onAddToBagClick).not.toHaveBeenCalled();
    });
  });

  test("does not display error when adding to bag without selecting size for category equal to 2", async () => {
    const mockJewelryData = {
      _id: "123",
      title: "Test Jewelry",
      firstImageUrl: "test-image-1.jpg",
      isSoldOut: false,
      price: 100,
      category: 2,
      sizes: [{ _id: 1, measurement: "6.98", available: true }],
    };

    mockJewelryService.findOne.mockResolvedValueOnce(mockJewelryData);

    render(
      <Router>
        <JewelryItem />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByTestId("jewelry-title")).toBeInTheDocument();
    });

    const addToBagButton = screen.getByRole("button", { name: /add to bag/i });
    fireEvent.click(addToBagButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Ensure you have selected the desired size")
      ).not.toBeInTheDocument();
      expect(mockBagContext.onAddToBagClick).toHaveBeenCalled();
    });
  });
});
