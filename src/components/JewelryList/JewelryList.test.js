import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { JewelryList } from "./JewelryList";
import { useJewelryList } from "../../hooks/useJewelryList";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../hooks/useJewelryList");
jest.mock("./JewelryListItems/JewelryListItems", () => ({
  JewelryListItems: ({ jewelryTitle }) => <div>{jewelryTitle}</div>,
}));
jest.mock("../LoadingSpinner/LoadingSpinner", () => ({
  LoadingSpinner: () => <div>Loading...</div>,
}));
jest.mock("../LoadMoreButton/LoadMoreButton", () => ({
  LoadMoreButton: ({ loadMoreHandler, loadMoreDisabled }) => (
    <button
      onClick={loadMoreHandler}
      disabled={loadMoreDisabled}
      data-testid="load-more-button"
    >
      Load More
    </button>
  ),
}));
jest.mock("../SortBy/SortBy", () => ({
  SortBy: () => <div>SortBy Component</div>,
}));
jest.mock("../FilterBy/FilterBy", () => ({
  FilterBy: () => <div>FilterBy Component</div>,
}));
jest.mock("./HeroJewelryList/HeroJewelryList", () => ({
  HeroJewelryList: ({ entityTitle }) => <div>{entityTitle}</div>,
}));
jest.mock("../HorizontalLine/HorizontalLine", () => ({
  HorizontalLine: () => <div>HorizontalLine Component</div>,
}));
jest.mock("./FooterJewelryList/FooterJewelryList", () => ({
  FooterJewelryList: ({ entityTitle }) => <div>Footer: {entityTitle}</div>,
}));

describe("JewelryList component", () => {
  const mockUseJewelryList = {
    setJewelries: jest.fn(),
    jewelries: [],
    loading: false,
    mouseEnterHandler: jest.fn(),
    mouseLeaveHandler: jest.fn(),
    fetchData: jest.fn(),
    totalCount: 0,
    loadMoreDisabled: false,
    setLoadMoreDisabled: jest.fn(),
    stoneTypesData: [],
    stoneColorsData: [],
    setFilteredJewelries: jest.fn(),
    filteredJewelries: [],
    setTotalCount: jest.fn(),
    fetchStonesCountData: jest.fn(),
    toggleLike: jest.fn(),
  };

  beforeEach(() => {
    useJewelryList.mockReturnValue(mockUseJewelryList);
    jest.clearAllMocks();
  });

  const defaultProps = {
    entityId: "123",
    entityTitle: "Test Entity",
    serviceFactory: jest.fn(),
  };

  test("renders HeroJewelryList component", () => {
    render(
      <Router>
        <JewelryList {...defaultProps} />
      </Router>
    );

    expect(screen.getByText("Test Entity")).toBeInTheDocument();
  });

  test("fetches data on mount", () => {
    render(
      <Router>
        <JewelryList {...defaultProps} />
      </Router>
    );

    expect(mockUseJewelryList.fetchData).toHaveBeenCalled();
  });

  test("displays loading spinner when loading", () => {
    mockUseJewelryList.loading = true;

    render(
      <Router>
        <JewelryList {...defaultProps} />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("displays JewelryListItems when not loading", async () => {
    mockUseJewelryList.filteredJewelries = [
      { _id: "1", jewelryTitle: "Jewelry 1" },
      { _id: "2", jewelryTitle: "Jewelry 2" },
    ];
    mockUseJewelryList.totalCount = 2;

    render(
      <Router>
        <JewelryList {...defaultProps} />
      </Router>
    );

    expect(screen.getByText("Jewelry 1")).toBeInTheDocument();
    expect(screen.getByText("Jewelry 2")).toBeInTheDocument();
  });

  test("calls loadMoreHandler on Load More button click", async () => {
    mockUseJewelryList.totalCount = 4;
    mockUseJewelryList.loading = false;

    render(
      <Router>
        <JewelryList {...defaultProps} />
      </Router>
    );

    fireEvent.click(screen.getByTestId("load-more-button"));

    await waitFor(() => {
      expect(mockUseJewelryList.setLoadMoreDisabled).toHaveBeenCalled();
    });
  });

  test("displays FooterJewelryList component", () => {
    render(
      <Router>
        <JewelryList {...defaultProps} />
      </Router>
    );

    expect(screen.getByText("Footer: Test Entity")).toBeInTheDocument();
  });

  test("updates displayed items on load more", async () => {
    mockUseJewelryList.filteredJewelries = [
      { _id: "1", jewelryTitle: "Jewelry 1" },
      { _id: "2", jewelryTitle: "Jewelry 2" },
      { _id: "3", jewelryTitle: "Jewelry 3" },
      { _id: "4", jewelryTitle: "Jewelry 4" },
    ];
    mockUseJewelryList.totalCount = 4;
    mockUseJewelryList.loading = false;

    render(
      <Router>
        <JewelryList {...defaultProps} />
      </Router>
    );

    expect(screen.getByText("Jewelry 1")).toBeInTheDocument();
    expect(screen.getByText("Jewelry 2")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("load-more-button"));

    await waitFor(() => {
      expect(screen.getByText("Jewelry 3")).toBeInTheDocument();
      expect(screen.getByText("Jewelry 4")).toBeInTheDocument();
    });
  });
});
