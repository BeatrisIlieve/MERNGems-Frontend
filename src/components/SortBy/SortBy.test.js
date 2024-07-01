import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SortBy } from "./SortBy";
import { getSortedByPriceAsc } from "../../utils/getSortedByPriceAsc";
import { getSortedByPriceDesc } from "../../utils/getSortedByPriceDesc";
import { getSortedByAvailabilityAsc } from "../../utils/getSortedByAvailabilityAsc";

jest.mock("../../utils/getSortedByPriceAsc");
jest.mock("../../utils/getSortedByPriceDesc");
jest.mock("../../utils/getSortedByAvailabilityAsc");

describe("SortBy Component", () => {
  const mockSetFilteredJewelries = jest.fn();
  const mockFilteredJewelries = [
    { id: 1, price: 100, isSoldOut: false },
    { id: 2, price: 50, isSoldOut: true },
    { id: 3, price: 150, isSoldOut: false },
  ];
  const mockSortedByPriceAsc = [
    { id: 2, price: 50, isSoldOut: true },
    { id: 1, price: 100, isSoldOut: false },
    { id: 3, price: 150, isSoldOut: false },
  ];
  const mockSortedByPriceDesc = [
    { id: 3, price: 150, isSoldOut: false },
    { id: 1, price: 100, isSoldOut: false },
    { id: 2, price: 50, isSoldOut: true },
  ];
  const mockSortedByAvailabilityAsc = [
    { id: 1, price: 100, isSoldOut: false },
    { id: 3, price: 150, isSoldOut: false },
    { id: 2, price: 50, isSoldOut: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    getSortedByPriceAsc.mockReturnValue(mockSortedByPriceAsc);
    getSortedByPriceDesc.mockReturnValue(mockSortedByPriceDesc);
    getSortedByAvailabilityAsc.mockReturnValue(mockSortedByAvailabilityAsc);
  });

  test("renders SortBy component with default state", () => {
    render(
      <SortBy
        entityId="1"
        entityTitle="Test Entity"
        filteredJewelries={mockFilteredJewelries}
        setFilteredJewelries={mockSetFilteredJewelries}
      />
    );

    expect(screen.getByText("Sort By:")).toBeInTheDocument();
    expect(screen.getByText("Available Now")).toBeInTheDocument();
  });

  test('calls getSortedByPriceAsc and updates state on "Price Low To High" click', () => {
    render(
      <SortBy
        entityId="1"
        entityTitle="Test Entity"
        filteredJewelries={mockFilteredJewelries}
        setFilteredJewelries={mockSetFilteredJewelries}
      />
    );

    fireEvent.click(screen.getByText("Sort By:"));

    const lowToHighButton = screen.getByText("Price Low To High");
    fireEvent.click(lowToHighButton);

    expect(getSortedByPriceAsc).toHaveBeenCalledWith(mockFilteredJewelries);
    expect(mockSetFilteredJewelries).toHaveBeenCalledWith(mockSortedByPriceAsc);
  });

  test('calls getSortedByPriceDesc and updates state on "Price High To Low" click', () => {
    render(
      <SortBy
        entityId="1"
        entityTitle="Test Entity"
        filteredJewelries={mockFilteredJewelries}
        setFilteredJewelries={mockSetFilteredJewelries}
      />
    );

    fireEvent.click(screen.getByText("Sort By:"));

    const highToLowButton = screen.getByText("Price High To Low");
    fireEvent.click(highToLowButton);

    expect(getSortedByPriceDesc).toHaveBeenCalledWith(mockFilteredJewelries);
    expect(mockSetFilteredJewelries).toHaveBeenCalledWith(
      mockSortedByPriceDesc
    );
  });
});
