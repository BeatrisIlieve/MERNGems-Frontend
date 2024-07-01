import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBy } from "./FilterBy";

jest.mock("../../utils/getSerializedObject");
jest.mock("../../utils/getFilteredByStoneType");
jest.mock("../../utils/getFilteredByStoneColor");

describe("FilterBy Component", () => {
  const stoneTypesData = [
    { _id: "1", title: "Type 1", count: 10 },
    { _id: "2", title: "Type 2", count: 5 },
  ];
  const stoneColorsData = [
    { _id: "1", title: "Color 1", count: 8 },
    { _id: "2", title: "Color 2", count: 3 },
  ];
  const jewelries = [
    { id: 1, type: "Type 1", color: "Color 1" },
    { id: 2, type: "Type 2", color: "Color 2" },
  ];
  const selection = { stoneType: [], stoneColor: [] };
  const setFilteredJewelries = jest.fn();
  const setTotalCount = jest.fn();
  const setLoadMoreDisabled = jest.fn();
  const fetchStonesCountData = jest.fn();
  const setSelection = jest.fn();

  beforeEach(() => {
    render(
      <FilterBy
        stoneTypesData={stoneTypesData}
        stoneColorsData={stoneColorsData}
        setFilteredJewelries={setFilteredJewelries}
        filteredJewelries={jewelries}
        setTotalCount={setTotalCount}
        setLoadMoreDisabled={setLoadMoreDisabled}
        jewelries={jewelries}
        fetchStonesCountData={fetchStonesCountData}
        setSelection={setSelection}
        selection={selection}
        itemsPerPage={10}
      />
    );
  });

  test("renders filter labels correctly", () => {
    expect(screen.getByText("Filter By:")).toBeInTheDocument();
    expect(screen.getByText("Stone Type")).toBeInTheDocument();
    expect(screen.getByText("Stone Color")).toBeInTheDocument();
  });

  test("opens and closes the dropdowns correctly", () => {
    const stoneTypeToggle = screen.getByText("Stone Type");
    fireEvent.click(stoneTypeToggle);
    expect(screen.getByText("Type 1")).toBeInTheDocument();
    expect(screen.getByText("Type 2")).toBeInTheDocument();

    fireEvent.click(stoneTypeToggle);
    expect(screen.queryByText("Type 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Type 2")).not.toBeInTheDocument();
  });
});
